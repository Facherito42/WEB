# RINEX API

API de descarga de archivos RINEX de la red REGNA-ROU. Modelo **proxy**: no
replica el histórico; ante cada pedido trae el archivo del FTP interno
`192.168.100.96` y lo sirve, con un caché local acotado.

Diseño completo y pasos de infraestructura: [`../docs/plan-descarga-rinex.md`](../docs/plan-descarga-rinex.md).

## Estructura

```
api/
  app/
    config.py     configuración desde .env
    ftputil.py    conexión y listado FTP
    indexer.py    recorre el FTP y escribe data/rinex.json
    main.py       FastAPI: /rinex-data/rinex.json y /rinex-data/raw/<path>
  iis/web.config  reverse proxy IIS (URL Rewrite + ARR) + fallback SPA
  scripts/install-service.ps1   registra la API como servicio con NSSM
  run-indexer.cmd               lo llama la tarea programada cada 3 h
  requirements.txt
  .env.example
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/rinex-data/rinex.json` | Índice de archivos disponibles (cacheado, lo genera `indexer.py`). |
| GET | `/rinex-data/raw/<EST>/<AAAA>/<MM>/<DD>/<archivo>` | Descarga el archivo. La ruta debe existir en el índice. |
| GET | `/healthz` | Estado del índice (existe / antigüedad en minutos). |

## Puesta en marcha (VM Windows)

```powershell
# 1. Copiar la carpeta api\ a C:\rinex-api\  (o clonar el repo y usar esa subcarpeta)
cd C:\rinex-api
py -3.12 -m venv venv
.\venv\Scripts\pip install -r requirements.txt

# 2. Configurar
copy .env.example .env
notepad .env                     # completar FTP_PASS, CACHE_MAX_GB, etc.
icacls .env /inheritance:r /grant:r "Administrators:F" "%USERNAME%:R"

# 3. Primera generación del índice (puede tardar varios minutos)
.\venv\Scripts\python.exe -m app.indexer

# 4. Probar la API a mano
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
#   en otra consola:
curl http://127.0.0.1:8000/healthz
curl -OJ http://127.0.0.1:8000/rinex-data/raw/UYAG/2026/08/30/uyag2420.rnx.zip

# 5. Servicio permanente
.\scripts\install-service.ps1    # como administrador (necesita nssm en el PATH)

# 6. Tarea programada -> run-indexer.cmd cada 3 h
#    (ver docs/plan-descarga-rinex.md, sección 6)

# 7. IIS: copiar iis\web.config a la raíz del sitio y ajustar bindings/TLS
```

## Desarrollo local (sin FTP real)

`indexer.py` necesita el FTP. Para probar solo la API podés crear a mano un
`data/rinex.json` con unos pocos registros y archivos correspondientes en
`cache/<path>`; la API los servirá desde el caché sin tocar el FTP.
