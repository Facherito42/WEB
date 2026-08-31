# API de descarga de archivos RINEX — plan de implementación

Servicio que consume la página
[`app/src/pages/DescargaRinex.jsx`](../app/src/pages/DescargaRinex.jsx).

> **Modelo elegido:** API "proxy". Una VM Windows dentro de la red del IGM
> corre una API FastAPI que, ante cada pedido, se conecta al FTP interno
> `192.168.100.96`, trae el archivo y lo reenvía al usuario (con un caché
> local chico). **No se replica el histórico de 100 GB.**

---

## 1. Arquitectura

```
                        Internet
                           │  https://rinex.igm.gub.uy
                           ▼
┌─────────────────────────────────────────────────────────┐
│  VM Windows Server  (dentro de la LAN del IGM)           │
│                                                         │
│   IIS  (443, TLS, reverse proxy)                         │
│     ├─ /                → sitio React (build estático)   │
│     └─ /rinex-data/*    → http://127.0.0.1:8000          │
│                              │                          │
│   FastAPI + uvicorn  (127.0.0.1:8000, servicio Windows)  │
│     ├─ GET /rinex-data/rinex.json   → manifiesto cacheado│
│     └─ GET /rinex-data/raw/<path>   → trae del FTP + cache│
│                              │                          │
│   Tarea programada (cada 3 h): indexer.py               │
│     recorre el FTP y reescribe rinex.json               │
└──────────────────────────────┼──────────────────────────┘
                               │ FTP (21, pasivo)
                               ▼
                    192.168.100.96  usuario: geodesia
        /home/igmrou/ftp/regna/<EST>/<AAAA>/<MM>/<DD>/Diario/<archivo>
```

### Contrato con el frontend (ya implementado en la página, no tocar)

- `GET /rinex-data/rinex.json` → array:
  ```json
  [
    { "year":2026, "month":8, "day":30, "station":"UYAG",
      "filename":"uyag2420.rnx.zip", "size":"1.2 MB",
      "path":"UYAG/2026/08/30/uyag2420.rnx.zip" }
  ]
  ```
- `GET /rinex-data/raw/<path>` → el archivo, como descarga (`Content-Disposition: attachment`).

### Datos del entorno (confirmados)

| Dato | Valor |
|---|---|
| FTP host | `192.168.100.96` (IP de LAN → la VM debe estar en la red del IGM) |
| FTP usuario | `geodesia` (clave: la pone IT en el archivo de config) |
| Ruta FTP | `/home/igmrou/ftp/regna/<EST>/<AAAA>/<MM>/<DD>/{Diario,Hora}/` |
| Nombre archivo | ej. `uyag2420.rnx.zip` — el año/fecha salen de la **carpeta**, no del nombre |
| Histórico | >100 GB (por eso NO se replica) |
| A publicar | Solo `Diario/` por ahora; `Hora/` después |
| Acceso | Público, sin login |

---

## 2. Lo que hay que pedirle a IT del IGM

1. **VM Windows Server** en la LAN, con:
   - salida hacia `192.168.100.96:21` (y rango de puertos pasivos del FTP),
   - Python 3.12+, IIS con módulos **URL Rewrite** + **Application Request Routing (ARR)**.
2. **DNS público** `rinex.igm.gub.uy` → IP pública de la VM.
3. **NAT / firewall**: puerto **443** de internet hacia la VM.
4. **Certificado TLS** para ese dominio (o permitir `win-acme` / Let's Encrypt).
5. La **clave** del usuario `geodesia` del FTP.
6. Confirmar el **rango de puertos pasivos** que usa el FTP (para el firewall).

---

## 3. Instalación en la VM

```
C:\rinex-api\
  ├─ app\           código (main.py, indexer.py, config.py)
  ├─ venv\          entorno virtual de Python
  ├─ data\
  │   └─ rinex.json manifiesto generado
  ├─ cache\         archivos traídos del FTP (LRU, tope de tamaño)
  ├─ logs\
  └─ .env           configuración (FTP, clave, CORS) — permisos restringidos
```

```powershell
# Copiar la carpeta api\ del repo a C:\rinex-api\
cd C:\rinex-api
py -3.12 -m venv venv
.\venv\Scripts\pip install -r requirements.txt
copy .env.example .env
notepad .env    # completar FTP_PASS y CACHE_MAX_GB
```

Plantilla de configuración: [`api/.env.example`](../api/.env.example).

> Restringir el `.env` a la cuenta de servicio:
> `icacls C:\rinex-api\.env /inheritance:r /grant:r "NT SERVICE\rinex-api:R" "Administrators:F"`

---

## 4. Código

El código vive en la carpeta [`api/`](../api/) del repo, listo para copiar a
`C:\rinex-api\` en la VM:

| Archivo | Rol |
|---|---|
| [`api/app/config.py`](../api/app/config.py) | Lee `api/.env` |
| [`api/app/ftputil.py`](../api/app/ftputil.py) | Conexión FTP + `listdir` (MLSD con fallback a NLST) |
| [`api/app/indexer.py`](../api/app/indexer.py) | Recorre el FTP → `data/rinex.json` |
| [`api/app/main.py`](../api/app/main.py) | FastAPI: `/rinex-data/rinex.json`, `/rinex-data/raw/<path>`, `/healthz` |
| [`api/iis/web.config`](../api/iis/web.config) | Reverse proxy IIS + fallback SPA |
| [`api/scripts/install-service.ps1`](../api/scripts/install-service.ps1) | Registra el servicio con NSSM |
| [`api/run-indexer.cmd`](../api/run-indexer.cmd) | Lo llama la tarea programada |
| [`api/.env.example`](../api/.env.example) | Plantilla de configuración |

Pasos de instalación resumidos en [`api/README.md`](../api/README.md).

**Puntos de diseño:**

- La API solo entrega archivos **presentes en el índice** (`data/rinex.json`);
  nunca abre rutas arbitrarias del FTP. Más `valid_path()` contra `..` y
  caracteres raros.
- Patrón *traer al caché y después servir*: `FileResponse` de Starlette soporta
  **HTTP Range**, así que "reanudar descarga" sale gratis desde el caché.
- El caché (`cache/`) se limpia por antigüedad de acceso (LRU) cuando supera
  `CACHE_MAX_GB`.
- El año/mes/día de cada archivo salen de la **ruta de carpetas**
  (`UYAG/2026/08/30/`), no del nombre `uyag2420.rnx.zip`.

---


## 5. Correr la API como servicio de Windows

Con **NSSM** (<https://nssm.cc>):

```powershell
nssm install rinex-api "C:\rinex-api\venv\Scripts\python.exe" ^
  "-m uvicorn app.main:app --host 127.0.0.1 --port 8000"
nssm set rinex-api AppDirectory C:\rinex-api
nssm set rinex-api AppStdout C:\rinex-api\logs\api.log
nssm set rinex-api AppStderr C:\rinex-api\logs\api.log
nssm set rinex-api Start SERVICE_AUTO_START
nssm start rinex-api
```

Probar local: `curl http://127.0.0.1:8000/healthz`

---

## 6. Tarea programada — índice cada 3 h

`C:\rinex-api\run-indexer.cmd`:

```bat
@echo off
cd /d C:\rinex-api
venv\Scripts\python.exe -m app.indexer >> logs\indexer.log 2>&1
```

Programador de tareas:
- Desencadenador: al inicio + repetir cada **3 horas**.
- Acción: `C:\rinex-api\run-indexer.cmd`.
- "Ejecutar aunque el usuario no haya iniciado sesión".
- Detener si dura más de 2 h.
- **Primera corrida a mano** (`run-indexer.cmd`) — con >100 GB y miles de
  carpetas puede tardar varios minutos; verificá que `data\rinex.json` quede bien.

---

## 7. IIS como reverse proxy + TLS

1. Instalar **URL Rewrite** y **ARR**. En ARR: *Server Proxy Settings* →
   *Enable proxy*.
2. Sitio en IIS con la carpeta del build de React como raíz física
   (`C:\inetpub\rinex\`), binding `https` para `rinex.igm.gub.uy` con el
   certificado.
3. `web.config` en la raíz del sitio:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <!-- /rinex-data/* va a la API -->
        <rule name="api-proxy" stopProcessing="true">
          <match url="^rinex-data/(.*)" />
          <action type="Rewrite" url="http://127.0.0.1:8000/rinex-data/{R:1}" />
        </rule>
        <!-- fallback SPA para el resto -->
        <rule name="spa" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering><requestLimits maxAllowedContentLength="4294967295" /></requestFiltering>
    </security>
  </system.webServer>
</configuration>
```

Como sitio y API quedan bajo el mismo dominio, **no hace falta CORS**
(dejar `ALLOW_ORIGIN=` vacío).

> Si el sitio siguiera en Vercel: poné `ALLOW_ORIGIN=https://tu-dominio.vercel.app`
> y en [`DescargaRinex.jsx`](../app/src/pages/DescargaRinex.jsx) cambiá
> `MANIFEST_URL`/`DOWNLOAD_BASE` a `https://rinex.igm.gub.uy/rinex-data/...`.

---

## 8. Frontend

La página **no requiere cambios**: `MANIFEST_URL = '/rinex-data/rinex.json'` y
`DOWNLOAD_BASE = '/rinex-data/raw'` ya coinciden con la API detrás del proxy.

Cuando se agreguen los **horarios**: en `indexer.py` recorrer también `Hora/`,
agregar `"tipo": "diario" | "hora"` a cada item y un filtro en la página.

---

## 9. Seguridad

- **Path traversal:** `valid_path()` + verificación contra el manifiesto →
  la API solo entrega archivos que ya están indexados, no rutas arbitrarias del FTP.
- **Clave FTP:** solo en `.env` con ACL restringida a la cuenta de servicio.
- **FTP en claro:** el tráfico VM↔`192.168.100.96` es LAN; si se puede, pedir
  FTPS al área que administra `igmrou`.
- **Rate limiting / tamaño de descarga:** configurable en IIS (ARR) o agregando
  `slowapi` a FastAPI si aparece abuso.
- **Solo GET** expuesto; `docs_url` de FastAPI deshabilitado.

---

## 10. Pruebas (checklist)

- [ ] `python -m app.indexer` genera `data\rinex.json` con fechas/estaciones correctas
- [ ] `curl http://127.0.0.1:8000/rinex-data/rinex.json` devuelve el JSON
- [ ] `curl -OJ http://127.0.0.1:8000/rinex-data/raw/UYAG/2026/08/30/uyag2420.rnx.zip` descarga el archivo
- [ ] Segundo pedido del mismo archivo sale del caché (más rápido, log lo indica)
- [ ] Ruta con `..` o no indexada → 400 / 404
- [ ] `https://rinex.igm.gub.uy/rinex-data/rinex.json` funciona desde afuera
- [ ] La página de descarga lista, filtra y el botón Descargar baja el archivo
- [ ] `cache\` no supera `CACHE_MAX_GB` tras varias descargas
- [ ] Tarea programada corre sola y actualiza el `mtime` de `rinex.json` (ver `/healthz`)

---

## 11. Pendientes de IT / decisiones

1. Clave del usuario `geodesia` del FTP + rango de puertos pasivos.
2. VM Windows con Python 3.12 + IIS (URL Rewrite + ARR).
3. DNS `rinex.igm.gub.uy` + NAT 443 + certificado TLS.
4. Confirmar que todas las estaciones/años usan la misma estructura de carpetas
   `EST/AAAA/MM/DD/Diario/` (histórico viejo podría diferir).
5. Cuenta de servicio para el servicio NSSM y la tarea programada.
6. Definir `CACHE_MAX_GB` según disco de la VM.
```
