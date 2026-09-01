# RINEX API

API de descarga de archivos RINEX de la red REGNA-ROU. Modelo **proxy**: no
replica el histórico; ante cada pedido trae el archivo del FTP interno
`192.168.100.96` (login anónimo) y lo sirve, con un caché local acotado.

**Runbook de despliegue completo:** [`../docs/plan-descarga-rinex.md`](../docs/plan-descarga-rinex.md).

## Estructura

```
api/
  app/
    config.py     configuración desde .env
    ftputil.py    conexión y listado FTP (anónimo, MLSD con fallback)
    indexer.py    recorre el FTP y escribe data/rinex.json
    main.py       FastAPI: /rinex-data/rinex.json y /rinex-data/raw/<path>
  deploy/
    install.sh              instala/actualiza todo en Ubuntu (systemd + venv)
    rinex-api.service       servicio de la API (uvicorn)
    rinex-indexer.service   job del indexador (oneshot)
    rinex-indexer.timer     lo dispara cada 3 h
    nginx-sirgas-uy.conf    vhost: sitio estático + reverse proxy a la API
  requirements.txt
  .env.example
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/rinex-data/rinex.json` | Índice de archivos disponibles (lo genera `indexer.py`). |
| GET | `/rinex-data/raw/<EST>/<AAAA>/<MM>/<DD>/<archivo>` | Descarga el archivo. Debe existir en el índice. |
| GET | `/healthz` | Estado del índice. |

## Instalación rápida (Ubuntu)

```bash
# en el servidor, con el repo subido en ~/WEB
sudo bash api/deploy/install.sh
sudo -u rinex /opt/rinex-api/venv/bin/python -m app.indexer   # primera indexación
curl -s http://127.0.0.1:8000/healthz
```

Después: instalar Nginx con `deploy/nginx-sirgas-uy.conf` (ver runbook, sección 4).

## Actualizar

Volvé a subir `api/` y corré `sudo bash api/deploy/install.sh` de nuevo
(hace `rsync` del código y reinicia el servicio; conserva `.env`).

## Desarrollo local

```bash
python -m venv venv && venv/bin/pip install -r requirements.txt
cp .env.example .env            # ajustar DATA_DIR/CACHE_DIR a rutas locales
venv/bin/python -m app.indexer  # necesita alcance al FTP
venv/bin/uvicorn app.main:app --port 8000
```

Sin FTP: crear a mano `data/rinex.json` y archivos en `cache/<path>`; la API
los sirve del caché sin tocar el FTP.
