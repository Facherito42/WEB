"""Configuración cargada desde api/.env"""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

FTP_HOST = os.environ.get("FTP_HOST", "192.168.100.96")
FTP_USER = os.environ.get("FTP_USER", "geodesia")
FTP_PASS = os.environ.get("FTP_PASS", "")
FTP_ROOT = os.environ.get("FTP_ROOT", "/home/igmrou/ftp/regna").rstrip("/")
FTP_SUBDIR = os.environ.get("FTP_SUBDIR", "Diario")

DATA_DIR = Path(os.environ.get("DATA_DIR", "data"))
CACHE_DIR = Path(os.environ.get("CACHE_DIR", "cache"))
CACHE_MAX = int(float(os.environ.get("CACHE_MAX_GB", "8")) * 1024**3)

ALLOW_ORIGIN = os.environ.get("ALLOW_ORIGIN", "").strip()
PORT = int(os.environ.get("PORT", "8000"))

# --- Límites de seguridad / abuso ---
# Peticiones por IP y por minuto a cada endpoint de descarga.
RATE_LIMIT = os.environ.get("RATE_LIMIT", "30/minute")
# Corta la descarga desde el FTP si un archivo supera este tamaño (MB).
MAX_FILE_MB = int(os.environ.get("MAX_FILE_MB", "200"))
# Descargas simultáneas que la API baja del FTP a la vez (protege al FTP interno).
MAX_CONCURRENT_FTP = int(os.environ.get("MAX_CONCURRENT_FTP", "4"))
# Confiar en X-Forwarded-For solo si el proxy (IIS/ARR) está en localhost.
TRUST_PROXY = os.environ.get("TRUST_PROXY", "1") == "1"

MANIFEST = DATA_DIR / "rinex.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)
CACHE_DIR.mkdir(parents=True, exist_ok=True)
