"""Fuentes de archivos RINEX.

Cada fuente sabe:
  - recorrerse (entries) para armar el índice
  - traer un archivo puntual (fetch) dado "EST/AAAA/MM/DD/archivo"

Fuente 'regna': FTP interno anónimo, layout  /regna/<EST>/<AAAA>/<MM>/<DD>/Diario/<fn>
Fuente 'hist' : SFTP histórico,        layout  /sftpserver/<AAAA>/<MM>/<DD>/<EST>/<fn>
"""
import ftplib
import stat as statmod
from contextlib import contextmanager

from . import config
from .ftputil import ftp_conn, listdir

_SKIP_EXT = (".md5", ".sha1", ".txt", ".log", ".lnk")


def human(n: float) -> str:
    if n < 1024:
        return f"{int(n)} B"
    for unit in ("KB", "MB", "GB"):
        n /= 1024
        if n < 1024 or unit == "GB":
            return f"{n:.1f} {unit}"
    return f"{n:.1f} GB"


def _entry(src, year, month, day, station, filename, size):
    return {
        "year": int(year),
        "month": int(month),
        "day": int(day),
        "station": station.upper(),
        "filename": filename,
        "size": human(size),
        "path": f"{station.upper()}/{int(year):04d}/{int(month):02d}/{int(day):02d}/{filename}",
        "src": src,
    }


# --------------------------------------------------------------------------- #
# Fuente 'regna'  (FTP anónimo)
# --------------------------------------------------------------------------- #
class RegnaFTP:
    name = "regna"

    def entries(self, years=None):
        with ftp_conn() as ftp:
            for est, est_dir, _ in listdir(ftp, config.FTP_ROOT):
                if not est_dir or est.upper() in config.EXCLUDE_STATIONS:
                    continue
                est_path = f"{config.FTP_ROOT}/{est}"
                for yr, yr_dir, _ in listdir(ftp, est_path):
                    if not (yr_dir and yr.isdigit() and len(yr) == 4):
                        continue
                    if years and int(yr) not in years:
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
                                yield _entry("regna", yr, mo, dy, est, fn, size)

    def fetch(self, rel: str, write, limit: int):
        est, yr, mo, dy, fn = rel.split("/")
        remote = f"{config.FTP_ROOT}/{est}/{yr}/{mo}/{dy}/{config.FTP_SUBDIR}/{fn}"
        with ftp_conn() as ftp:
            ftp.retrbinary(f"RETR {remote}", write, blocksize=1 << 16)


# --------------------------------------------------------------------------- #
# Fuente 'hist'  (SFTP histórico, vía paramiko)
# --------------------------------------------------------------------------- #
@contextmanager
def _sftp_conn():
    import paramiko  # import perezoso: solo si la fuente está habilitada

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        config.HIST_HOST,
        port=config.HIST_PORT,
        username=config.HIST_USER,
        password=config.HIST_PASS,
        timeout=30,
        allow_agent=False,
        look_for_keys=False,
    )
    try:
        yield client.open_sftp()
    finally:
        client.close()


class HistSFTP:
    name = "hist"

    def _stations_dirs(self, sftp, day_path):
        """Subcarpetas de un día que son estaciones (no las carpetas de hora)."""
        out = []
        for attr in sftp.listdir_attr(day_path):
            name = attr.filename
            if not statmod.S_ISDIR(attr.st_mode):
                continue
            if name.isdigit():          # carpeta de hora -> archivos horarios, se ignoran
                continue
            if name.lower().startswith("respaldo"):
                continue
            if name.upper() in config.EXCLUDE_STATIONS:
                continue
            out.append(name)
        return out

    def entries(self, years=None):
        with _sftp_conn() as sftp:
            for yr in sorted(sftp.listdir(config.HIST_ROOT)):
                if not (yr.isdigit() and len(yr) == 4):
                    continue
                if years and int(yr) not in years:
                    continue
                ypath = f"{config.HIST_ROOT}/{yr}"
                for mo in sorted(sftp.listdir(ypath)):
                    if not mo.isdigit():
                        continue
                    mpath = f"{ypath}/{mo}"
                    for dy in sorted(sftp.listdir(mpath)):
                        if not dy.isdigit():
                            continue
                        dpath = f"{mpath}/{dy}"
                        try:
                            stations = self._stations_dirs(sftp, dpath)
                        except OSError:
                            continue
                        for est in stations:
                            spath = f"{dpath}/{est}"
                            try:
                                for attr in sftp.listdir_attr(spath):
                                    fn = attr.filename
                                    if statmod.S_ISDIR(attr.st_mode):
                                        continue
                                    if fn.lower().endswith(_SKIP_EXT):
                                        continue
                                    yield _entry("hist", yr, mo, dy, est, fn, attr.st_size or 0)
                            except OSError:
                                continue

    def fetch(self, rel: str, write, limit: int):
        est, yr, mo, dy, fn = rel.split("/")
        remote = f"{config.HIST_ROOT}/{yr}/{mo}/{dy}/{est}/{fn}"
        with _sftp_conn() as sftp, sftp.open(remote, "rb") as fh:
            fh.prefetch()
            while True:
                chunk = fh.read(1 << 16)
                if not chunk:
                    break
                write(chunk)


# --------------------------------------------------------------------------- #

def all_sources():
    src = [RegnaFTP()]
    if config.HIST_ENABLED:
        src.append(HistSFTP())
    return src


def get_source(name: str):
    for s in all_sources():
        if s.name == name:
            return s
    return None
