"""Recorre el FTP interno y reescribe data/rinex.json.

Lo ejecuta la tarea programada de Windows cada 3 h (ver api/run-indexer.cmd).
Primera corrida a mano recomendada: puede tardar varios minutos.

    python -m app.indexer
"""
import ftplib
import json
import sys
import time

from . import config
from .ftputil import ftp_conn, listdir

_SKIP_EXT = (".md5", ".sha1", ".txt", ".log")


def human(n: float) -> str:
    if n < 1024:
        return f"{int(n)} B"
    for unit in ("KB", "MB", "GB"):
        n /= 1024
        if n < 1024 or unit == "GB":
            return f"{n:.1f} {unit}"
    return f"{n:.1f} GB"


def build() -> int:
    items = []
    t0 = time.time()
    with ftp_conn() as ftp:
        for est, est_dir, _ in listdir(ftp, config.FTP_ROOT):
            if not est_dir:
                continue
            est_path = f"{config.FTP_ROOT}/{est}"
            for yr, yr_dir, _ in listdir(ftp, est_path):
                if not (yr_dir and yr.isdigit() and len(yr) == 4):
                    continue
                for mo, mo_dir, _ in listdir(ftp, f"{est_path}/{yr}"):
                    if not (mo_dir and mo.isdigit()):
                        continue
                    for dy, dy_dir, _ in listdir(ftp, f"{est_path}/{yr}/{mo}"):
                        if not (dy_dir and dy.isdigit()):
                            continue
                        sub = f"{est_path}/{yr}/{mo}/{dy}/{config.FTP_SUBDIR}"
                        try:
                            files = listdir(ftp, sub)
                        except ftplib.error_perm:
                            continue
                        for fn, is_dir, size in files:
                            if is_dir or fn.lower().endswith(_SKIP_EXT):
                                continue
                            items.append(
                                {
                                    "year": int(yr),
                                    "month": int(mo),
                                    "day": int(dy),
                                    "station": est.upper(),
                                    "filename": fn,
                                    "size": human(size),
                                    "path": f"{est.upper()}/{yr}/{mo.zfill(2)}/{dy.zfill(2)}/{fn}",
                                }
                            )

    tmp = config.MANIFEST.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(items, ensure_ascii=False), encoding="utf-8")
    tmp.replace(config.MANIFEST)
    print(
        f"{len(items)} archivos indexados en {time.time() - t0:.0f}s "
        f"-> {config.MANIFEST}"
    )
    return len(items)


if __name__ == "__main__":
    try:
        build()
    except Exception as exc:  # noqa: BLE001
        print("ERROR:", exc, file=sys.stderr)
        sys.exit(1)
