#!/usr/bin/env bash
# Instala/actualiza la API RINEX en un Ubuntu.
# Uso:  sudo bash api/deploy/install.sh
set -euo pipefail

APP_DIR=/opt/rinex-api
STATE_DIR=/var/lib/rinex-api
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"   # la carpeta api/

echo ">> Fuente: $SRC_DIR"
[ -f "$SRC_DIR/requirements.txt" ] || { echo "No encuentro api/requirements.txt"; exit 1; }

echo ">> Paquetes del sistema"
apt-get update -qq
apt-get install -y -qq python3-venv rsync

echo ">> Usuario de servicio 'rinex'"
id rinex &>/dev/null || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin rinex

echo ">> Carpetas"
mkdir -p "$APP_DIR" "$STATE_DIR/data" "$STATE_DIR/cache"

echo ">> Copiando código a $APP_DIR"
rsync -a --delete --exclude venv --exclude .env --exclude __pycache__ "$SRC_DIR"/ "$APP_DIR"/

echo ">> Entorno virtual + dependencias"
[ -d "$APP_DIR/venv" ] || python3 -m venv "$APP_DIR/venv"
"$APP_DIR/venv/bin/pip" install -q --upgrade pip
"$APP_DIR/venv/bin/pip" install -q -r "$APP_DIR/requirements.txt"

echo ">> Configuración"
if [ ! -f "$APP_DIR/.env" ]; then
    cp "$APP_DIR/.env.example" "$APP_DIR/.env"
    echo "   Creado $APP_DIR/.env desde el ejemplo — revisalo si hace falta."
fi

chown -R rinex:rinex "$APP_DIR" "$STATE_DIR"
chmod 600 "$APP_DIR/.env"

echo ">> Servicios systemd"
cp "$APP_DIR/deploy/rinex-api.service"      /etc/systemd/system/
cp "$APP_DIR/deploy/rinex-indexer.service"  /etc/systemd/system/
cp "$APP_DIR/deploy/rinex-indexer.timer"    /etc/systemd/system/
systemctl daemon-reload
systemctl enable rinex-api.service
systemctl restart rinex-api.service     # 'enable --now' no reinicia si ya estaba corriendo
systemctl enable --now rinex-indexer.timer

echo
echo "OK. Estado:"
systemctl --no-pager --lines=0 status rinex-api.service || true
echo
echo "Siguiente paso — primera indexación (tarda con el histórico grande):"
echo "  sudo -u rinex $APP_DIR/venv/bin/python -m app.indexer"
echo
echo "Probar la API:"
echo "  curl -s http://127.0.0.1:8000/healthz"
