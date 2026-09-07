"""API de descarga de archivos RINEX (modelo proxy, índice partido por año).

- GET /rinex-data/index.json        -> { years:[...], updated, sources }
- GET /rinex-data/y/<AAAA>.json     -> archivos de ese año
- GET /rinex-data/rinex.json        -> (compat) el año más nuevo
- GET /rinex-data/raw/<path>        -> trae el archivo de la fuente que corresponda

El path debe existir en el índice del año: la API nunca abre rutas arbitrarias.
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

from . import config, sources

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
    if "server" in resp.headers:
        del resp.headers["server"]
    return resp


_PATH_RE = re.compile(r"[A-Za-z0-9]{3,9}/\d{4}/\d{2}/\d{2}/[A-Za-z0-9._-]+")
_ftp_slots = threading.Semaphore(config.MAX_CONCURRENT_FTP)
_locks_guard = threading.Lock()
_locks: dict[str, threading.Lock] = {}
_year_cache: dict[int, tuple[float, dict[str, dict]]] = {}
_year_cache_lock = threading.Lock()


def _path_lock(rel: str) -> threading.Lock:
    with _locks_guard:
        return _locks.setdefault(rel, threading.Lock())


def _valid(rel: str) -> bool:
    return bool(_PATH_RE.fullmatch(rel)) and ".." not in rel


def _year_entries(year: int) -> dict[str, dict]:
    """{path: entry} del archivo del año, cacheado por mtime."""
    yf = config.YEAR_DIR / f"{year}.json"
    try:
        mt = yf.stat().st_mtime
    except FileNotFoundError:
        return {}
    with _year_cache_lock:
        hit = _year_cache.get(year)
        if hit and hit[0] == mt:
            return hit[1]
    try:
        data = {e["path"]: e for e in json.loads(yf.read_text("utf-8"))}
    except (json.JSONDecodeError, OSError):
        return {}
    with _year_cache_lock:
        _year_cache[year] = (mt, data)
    return data


def _cache_evict() -> None:
    files = [f for f in config.CACHE_DIR.glob("**/*") if f.is_file()]
    files.sort(key=lambda f: f.stat().st_atime)
    total = sum(f.stat().st_size for f in files)
    for f in files:
        if total <= config.CACHE_MAX:
            break
        total -= f.stat().st_size
        f.unlink(missing_ok=True)


def _fetch(entry: dict, dest) -> None:
    source = sources.get_source(entry.get("src", "regna"))
    if source is None:
        raise HTTPException(502, "Fuente de datos no disponible.")

    limit = config.MAX_FILE_MB * 1024 * 1024
    written = 0
    tmp = dest.with_suffix(dest.suffix + ".part")
    dest.parent.mkdir(parents=True, exist_ok=True)

    if not _ftp_slots.acquire(timeout=60):
        raise HTTPException(503, "Servidor ocupado, probá en unos segundos.")
    try:
        with open(tmp, "wb") as fh:
            def _write(chunk: bytes):
                nonlocal written
                written += len(chunk)
                if written > limit:
                    raise ValueError("archivo demasiado grande")
                fh.write(chunk)

            source.fetch(entry["path"], _write, limit)
    except HTTPException:
        raise
    except Exception:
        tmp.unlink(missing_ok=True)
        raise HTTPException(502, "No se pudo obtener el archivo del servidor de datos.")
    finally:
        _ftp_slots.release()

    tmp.replace(dest)
    _cache_evict()


# --------------------------------------------------------------------------- #
# Índice
# --------------------------------------------------------------------------- #
@app.get("/rinex-data/index.json")
def index_json(request: Request):
    if not _rate_ok(_client_ip(request), config.RATE_MANIFEST):
        raise HTTPException(429, "Demasiadas peticiones. Probá en un minuto.")
    if not config.INDEX_FILE.exists():
        raise HTTPException(503, "El índice todavía no se generó.")
    return FileResponse(config.INDEX_FILE, media_type="application/json")


@app.get("/rinex-data/y/{year}.json")
def year_json(request: Request, year: int):
    if not _rate_ok(_client_ip(request), config.RATE_MANIFEST):
        raise HTTPException(429, "Demasiadas peticiones. Probá en un minuto.")
    if not 2000 <= year <= 2100:
        raise HTTPException(404, "Año inválido.")
    yf = config.YEAR_DIR / f"{year}.json"
    if not yf.exists():
        raise HTTPException(404, "No hay datos para ese año.")
    return FileResponse(yf, media_type="application/json")


@app.get("/rinex-data/rinex.json")
def legacy_manifest(request: Request):
    """Compat: devuelve el año más nuevo disponible."""
    if not _rate_ok(_client_ip(request), config.RATE_MANIFEST):
        raise HTTPException(429, "Demasiadas peticiones. Probá en un minuto.")
    try:
        idx = json.loads(config.INDEX_FILE.read_text("utf-8"))
        newest = max(idx["years"])
    except Exception:
        raise HTTPException(503, "El índice todavía no se generó.")
    yf = config.YEAR_DIR / f"{newest}.json"
    if not yf.exists():
        raise HTTPException(503, "El índice todavía no se generó.")
    return FileResponse(yf, media_type="application/json")


# --------------------------------------------------------------------------- #
# Descarga
# --------------------------------------------------------------------------- #
@app.get("/rinex-data/raw/{rel:path}")
def download(request: Request, rel: str):
    if not _rate_ok(_client_ip(request), config.RATE_DOWNLOAD):
        raise HTTPException(429, "Demasiadas descargas. Probá en un minuto.")
    if not _valid(rel):
        raise HTTPException(400, "Ruta inválida.")

    year = int(rel.split("/")[1])
    entry = _year_entries(year).get(rel)
    if entry is None:
        raise HTTPException(404, "Archivo no encontrado en el índice.")

    local = config.CACHE_DIR / rel
    if not local.exists():
        with _path_lock(rel):
            if not local.exists():
                _fetch(entry, local)

    return FileResponse(
        local,
        filename=PurePosixPath(rel).name,
        media_type="application/octet-stream",
    )


@app.get("/healthz")
def health():
    try:
        idx = json.loads(config.INDEX_FILE.read_text("utf-8"))
        return JSONResponse(
            {
                "ok": True,
                "years": idx.get("years", []),
                "updated": idx.get("updated"),
                "sources": idx.get("sources", {}),
            }
        )
    except Exception:
        return JSONResponse({"ok": False, "years": []}, status_code=503)
