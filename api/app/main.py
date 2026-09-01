"""API de descarga de archivos RINEX (modelo proxy).

- GET /rinex-data/rinex.json      -> índice cacheado (generado por indexer.py)
- GET /rinex-data/raw/<path>      -> trae el archivo del FTP interno y lo sirve

El path debe existir en el índice: la API nunca abre rutas arbitrarias del FTP.
"""
import json
import re
import threading
import time
from collections import defaultdict, deque
from pathlib import PurePosixPath

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from . import config
from .ftputil import ftp_conn

app = FastAPI(title="RINEX API", docs_url=None, redoc_url=None, openapi_url=None)

if config.ALLOW_ORIGIN:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[config.ALLOW_ORIGIN],
        allow_methods=["GET"],
        allow_headers=["*"],
    )


# --- Rate limiting simple, en memoria (sin dependencias externas) -------------
_hits: dict[str, deque] = defaultdict(deque)
_hits_lock = threading.Lock()


def _client_ip(request: Request) -> str:
    if config.TRUST_PROXY:
        fwd = request.headers.get("x-forwarded-for")
        if fwd:
            return fwd.split(",")[0].strip()
    return request.client.host if request.client else "?"


def _rate_ok(ip: str, limit: int, window: int = 60) -> bool:
    now = time.time()
    with _hits_lock:
        dq = _hits[ip]
        while dq and dq[0] <= now - window:
            dq.popleft()
        if len(dq) >= limit:
            return False
        dq.append(now)
        return True


@app.middleware("http")
async def security_headers(request: Request, call_next):
    resp = await call_next(request)
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    resp.headers.setdefault("X-Frame-Options", "DENY")
    resp.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    resp.headers.setdefault("Content-Security-Policy", "default-src 'none'")
    resp.headers.pop("server", None)
    return resp


_PATH_RE = re.compile(r"[A-Za-z0-9]{3,9}/\d{4}/\d{2}/\d{2}/[A-Za-z0-9._-]+")
_ftp_slots = threading.Semaphore(config.MAX_CONCURRENT_FTP)
_locks_guard = threading.Lock()
_locks: dict[str, threading.Lock] = {}


def _path_lock(rel: str) -> threading.Lock:
    with _locks_guard:
        return _locks.setdefault(rel, threading.Lock())


def _valid(rel: str) -> bool:
    return bool(_PATH_RE.fullmatch(rel)) and ".." not in rel


def _manifest_paths() -> set[str]:
    try:
        data = json.loads(config.MANIFEST.read_text("utf-8"))
    except FileNotFoundError:
        return set()
    return {e["path"] for e in data}


def _cache_evict() -> None:
    files = [f for f in config.CACHE_DIR.glob("**/*") if f.is_file()]
    files.sort(key=lambda f: f.stat().st_atime)
    total = sum(f.stat().st_size for f in files)
    for f in files:
        if total <= config.CACHE_MAX:
            break
        total -= f.stat().st_size
        f.unlink(missing_ok=True)


def _fetch_from_ftp(rel: str, dest) -> None:
    est, yr, mo, dy, fn = rel.split("/")
    remote = f"{config.FTP_ROOT}/{est}/{yr}/{mo}/{dy}/{config.FTP_SUBDIR}/{fn}"
    limit = config.MAX_FILE_MB * 1024 * 1024
    written = 0
    tmp = dest.with_suffix(dest.suffix + ".part")
    dest.parent.mkdir(parents=True, exist_ok=True)

    if not _ftp_slots.acquire(timeout=60):
        raise HTTPException(503, "Servidor ocupado, probá en unos segundos.")
    try:
        with ftp_conn() as ftp, open(tmp, "wb") as fh:
            def _write(chunk: bytes):
                nonlocal written
                written += len(chunk)
                if written > limit:
                    raise ValueError("archivo demasiado grande")
                fh.write(chunk)

            ftp.retrbinary(f"RETR {remote}", _write, blocksize=1 << 16)
    except HTTPException:
        raise
    except Exception:
        tmp.unlink(missing_ok=True)
        raise HTTPException(502, "No se pudo obtener el archivo del servidor de datos.")
    finally:
        _ftp_slots.release()

    tmp.replace(dest)
    _cache_evict()


@app.get("/rinex-data/rinex.json")
def manifest(request: Request):
    if not _rate_ok(_client_ip(request), config.RATE_MANIFEST):
        raise HTTPException(429, "Demasiadas peticiones. Probá en un minuto.")
    if not config.MANIFEST.exists():
        raise HTTPException(503, "El índice todavía no se generó.")
    return FileResponse(config.MANIFEST, media_type="application/json")


@app.get("/rinex-data/raw/{rel:path}")
def download(request: Request, rel: str):
    if not _rate_ok(_client_ip(request), config.RATE_DOWNLOAD):
        raise HTTPException(429, "Demasiadas descargas. Probá en un minuto.")
    if not _valid(rel):
        raise HTTPException(400, "Ruta inválida.")
    if rel not in _manifest_paths():
        raise HTTPException(404, "Archivo no encontrado en el índice.")

    local = config.CACHE_DIR / rel
    if not local.exists():
        with _path_lock(rel):  # dos requests del mismo archivo -> una sola descarga
            if not local.exists():
                _fetch_from_ftp(rel, local)

    return FileResponse(
        local,
        filename=PurePosixPath(rel).name,
        media_type="application/octet-stream",
    )


@app.get("/healthz")
def health():
    m = config.MANIFEST
    return JSONResponse(
        {
            "manifest": m.exists(),
            "age_min": round((time.time() - m.stat().st_mtime) / 60) if m.exists() else None,
        }
    )
