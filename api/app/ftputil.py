"""Helpers de conexión y listado FTP contra el servidor interno de datos."""
import ftplib
from contextlib import contextmanager

from . import config


@contextmanager
def ftp_conn():
    ftp = ftplib.FTP()
    ftp.connect(config.FTP_HOST, 21, timeout=30)
    user = (config.FTP_USER or "anonymous").strip()
    if user.lower() == "anonymous":
        ftp.login("anonymous", config.FTP_PASS or "rinex@igm.gub.uy")
    else:
        ftp.login(user, config.FTP_PASS)
    ftp.set_pasv(True)
    try:
        yield ftp
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()


def listdir(ftp, path):
    """Devuelve [(nombre, es_dir, size)] de `path`.

    Usa MLSD si el servidor lo soporta; si no, cae a NLST + comprobación
    carpeta/archivo una por una.
    """
    try:
        out = []
        for name, facts in ftp.mlsd(path):
            if name in (".", ".."):
                continue
            is_dir = facts.get("type") == "dir"
            size = int(facts.get("size", 0) or 0)
            out.append((name, is_dir, size))
        if out:
            return out
    except ftplib.error_perm:
        pass
    except ftplib.error_proto:
        pass

    out = []
    for entry in ftp.nlst(path):
        name = entry.split("/")[-1]
        if name in (".", ".."):
            continue
        full = f"{path}/{name}"
        try:
            ftp.cwd(full)
            out.append((name, True, 0))
        except ftplib.error_perm:
            try:
                size = ftp.size(full) or 0
            except Exception:
                size = 0
            out.append((name, False, size))
    return out
