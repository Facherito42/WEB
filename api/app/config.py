"""Configuración cargada desde api/.env (o /opt/rinex-api/.env en el servidor)."""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

# --- Fuente 1: FTP interno (datos recientes) ---
FTP_HOST = os.environ.get("FTP_HOST", "192.168.100.96")
FTP_USER = os.environ.get("FTP_USER", "anonymous")
FTP_PASS = os.environ.get("FTP_PASS", "rinex@igm.gub.uy")
FTP_ROOT = os.environ.get("FTP_ROOT", "/regna").rstrip("/")
FTP_SUBDIR = os.environ.get("FTP_SUBDIR", "Diario")

# --- Fuente 2: SFTP histórico (2018+). Vacío HIST_HOST = deshabilitado. ---
HIST_HOST = os.environ.get("HIST_HOST", "").strip()
HIST_PORT = int(os.environ.get("HIST_PORT", "2222"))
HIST_USER = os.environ.get("HIST_USER", "regna")
HIST_PASS = os.environ.get("HIST_PASS", "")
HIST_ROOT = os.environ.get("HIST_ROOT", "/sftpserver").rstrip("/")
HIST_ENABLED = bool(HIST_HOST and HIST_PASS)

# Estaciones que NO se publican (internas / de prueba). Coma-separado, en el .env.
EXCLUDE_STATIONS = {
    s.strip().upper()
    for s in os.environ.get("EXCLUDE_STATIONS", "IM03,IM13,IM17,IM35,SNM1").split(",")
    if s.strip()
}

# --- Rutas locales ---
DATA_DIR = Path(os.environ.get("DATA_DIR", "/var/lib/rinex-api/data"))
CACHE_DIR = Path(os.environ.get("CACHE_DIR", "/var/lib/rinex-api/cache"))
CACHE_MAX = int(float(os.environ.get("CACHE_MAX_GB", "8")) * 1024**3)

# --- Red / API ---
ALLOW_ORIGIN = os.environ.get("ALLOW_ORIGIN", "").strip()
PORT = int(os.environ.get("PORT", "8000"))
# Confiar en X-Forwarded-For solo si el proxy (Nginx) está en localhost.
TRUST_PROXY = os.environ.get("TRUST_PROXY", "1") == "1"

# --- Límites de abuso ---
RATE_DOWNLOAD = int(os.environ.get("RATE_DOWNLOAD", "30"))   # descargas por IP y por minuto
RATE_MANIFEST = int(os.environ.get("RATE_MANIFEST", "120"))  # pedidos de índice por IP y por minuto
MAX_FILE_MB = int(os.environ.get("MAX_FILE_MB", "200"))      # corta la descarga si un archivo supera esto
MAX_CONCURRENT_FTP = int(os.environ.get("MAX_CONCURRENT_FTP", "4"))  # descargas simultáneas de las fuentes

# Índice partido por año:
#   DATA_DIR/index.json       -> { "years": [...], "updated": "..." }
#   DATA_DIR/y/<AAAA>.json     -> [ {year,month,day,station,filename,size,path,src}, ... ]
INDEX_FILE = DATA_DIR / "index.json"
YEAR_DIR = DATA_DIR / "y"

DATA_DIR.mkdir(parents=True, exist_ok=True)
YEAR_DIR.mkdir(parents=True, exist_ok=True)
CACHE_DIR.mkdir(parents=True, exist_ok=True)
