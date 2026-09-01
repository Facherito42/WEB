# Descarga de archivos RINEX — despliegue (Ubuntu 24.04)

Runbook para dejar andando la descarga que consume
[`app/src/pages/DescargaRinex.jsx`](../app/src/pages/DescargaRinex.jsx).

> **Modelo:** API "proxy". Una API FastAPI en el servidor Linux del IGM recibe
> los pedidos, trae el archivo del FTP interno `192.168.100.96` (login anónimo)
> y lo reenvía, con un caché local acotado. **No se replica el histórico.**

---

## 0. Situación (confirmada)

| Dato | Valor |
|---|---|
| Servidor | Ubuntu 24.04, IP interna `192.168.100.134`, usuario `administrador` con `sudo` |
| Web root | `/var/www/sirgas-uy/html` (sin servidor web instalado todavía) |
| Python | 3.12.3, `venv` disponible |
| FTP datos | `192.168.100.96`, **anónimo**, estaciones en `/regna/<EST>/<AAAA>/<MM>/<DD>/Diario/` |
| Nombre archivo | ej. `uyag2420.rnx.zip` (fecha se toma de la carpeta, no del nombre) |
| Exposición | El sitio debe ser **público** → falta que IT dé dominio + NAT 443 + TLS |

Se puede instalar y probar **ahora** por la IP interna; el HTTPS se agrega
cuando IT publique el dominio.

### Contrato con el frontend (ya implementado, no tocar)

- `GET /rinex-data/rinex.json` → `[{year,month,day,station,filename,size,path}, …]`
- `GET /rinex-data/raw/<EST>/<AAAA>/<MM>/<DD>/<archivo>` → el archivo, como descarga.

---

## 1. Preparar el build del sitio (en tu PC)

Subiste el proyecto entero por WinSCP; el servidor web solo sirve el **build**.

```bash
cd app
npm ci
npm run build          # genera app/dist/
```

Subí por WinSCP **el contenido de `app/dist/`** (no la carpeta, su contenido)
a `/var/www/sirgas-uy/html/`. Debe quedar `…/html/index.html`, `…/html/assets/`, etc.

> El código de la API (`api/`) subilo a la home del usuario, ej.
> `/home/administrador/WEB/api/` — desde ahí lo instala el script.

---

## 2. Instalar la API (en el servidor, por la terminal de WinSCP)

```bash
cd ~/WEB           # donde quedó el repo subido
sudo bash api/deploy/install.sh
```

El script ([`api/deploy/install.sh`](../api/deploy/install.sh)):

- instala `python3-venv` y `rsync`
- crea el usuario de servicio `rinex`
- copia el código a `/opt/rinex-api/`, crea el venv e instala dependencias
- crea `/opt/rinex-api/.env` desde el ejemplo (revisalo)
- instala y arranca los servicios `rinex-api.service` y `rinex-indexer.timer`

Verificá:

```bash
systemctl status rinex-api.service        # debe decir active (running)
curl -s http://127.0.0.1:8000/healthz     # {"manifest": false, ...} al principio
```

### Ajustar la config si hace falta

```bash
sudo nano /opt/rinex-api/.env
```

Valores por defecto (ya deberían servir): `FTP_HOST=192.168.100.96`,
`FTP_USER=anonymous`, `FTP_ROOT=/regna`, `FTP_SUBDIR=Diario`, `CACHE_MAX_GB=8`.
Después de editar: `sudo systemctl restart rinex-api`.

---

## 3. Primera indexación

Recorre el FTP y genera `/var/lib/rinex-api/data/rinex.json`. Con el histórico
grande puede tardar **varios minutos** (miles de carpetas).

```bash
sudo -u rinex /opt/rinex-api/venv/bin/python -m app.indexer
```

Salida esperada: `NNNN archivos indexados en Ns -> /var/lib/rinex-api/data/rinex.json`

```bash
curl -s http://127.0.0.1:8000/rinex-data/rinex.json | head -c 400
```

De ahí en más, el `rinex-indexer.timer` lo regenera solo cada 3 h. Ver:
`systemctl list-timers rinex-indexer`.

---

## 4. Instalar y configurar Nginx

```bash
sudo apt install -y nginx
sudo cp ~/WEB/api/deploy/nginx-sirgas-uy.conf /etc/nginx/sites-available/sirgas-uy
sudo ln -s /etc/nginx/sites-available/sirgas-uy /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Config: [`api/deploy/nginx-sirgas-uy.conf`](../api/deploy/nginx-sirgas-uy.conf)
— sirve `/var/www/sirgas-uy/html`, hace de reverse proxy de `/rinex-data/` a la
API, y agrega las cabeceras de seguridad.

Probá desde una PC en la red del IGM: `http://192.168.100.134/`

---

## 5. HTTPS (cuando IT dé el dominio)

```bash
# 1. IT: DNS del dominio -> 192.168.100.134 (o su NAT/proxy) + puerto 443 abierto
# 2. En el server:
sudo sed -i 's/server_name _;/server_name sirgas.igm.gub.uy;/' /etc/nginx/sites-available/sirgas-uy
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d sirgas.igm.gub.uy
# 3. Descomentar la línea Strict-Transport-Security en el .conf y recargar nginx
```

Si el sitio queda detrás del proxy de IT (no expuesto directo), el certificado
lo maneja ese proxy y este paso se salta.

---

## 6. Pruebas

```bash
# índice
curl -s http://192.168.100.134/rinex-data/rinex.json | python3 -m json.tool | head

# descarga real (usar un path que aparezca en el índice)
curl -OJ http://192.168.100.134/rinex-data/raw/UYAG/2026/08/30/uyag2420.rnx.zip

# segunda vez: sale del caché (más rápido)
# ruta inválida -> 400 / 404
curl -s -o /dev/null -w "%{http_code}\n" "http://192.168.100.134/rinex-data/raw/../etc/passwd"

# no lista directorios
curl -s -o /dev/null -w "%{http_code}\n" http://192.168.100.134/rinex-data/raw/
```

En el navegador: `http://192.168.100.134/descarga-rinex` — filtros y botón Descargar.

---

## 7. Operación

| Acción | Comando |
|---|---|
| Ver estado API | `systemctl status rinex-api` |
| Logs API | `journalctl -u rinex-api -f` |
| Logs indexador | `journalctl -u rinex-indexer -f` |
| Forzar reindexado | `sudo systemctl start rinex-indexer` |
| Reiniciar API | `sudo systemctl restart rinex-api` |
| Actualizar código | volver a subir `api/` y correr `sudo bash api/deploy/install.sh` |
| Ver caché | `du -sh /var/lib/rinex-api/cache` |

---

## 8. Pendientes de IT

1. **Dominio** público (ej. `sirgas.igm.gub.uy` o `rinex.igm.gub.uy`) → `192.168.100.134`.
2. **NAT / publicación**: puerto 443 de internet hacia el servidor (o detrás del proxy del IGM).
3. **Certificado TLS** (o permitir `certbot`).
4. Confirmar que **todo el histórico** del FTP usa la estructura `EST/AAAA/MM/DD/Diario/`
   (estaciones o años viejos podrían diferir).
5. Definir `CACHE_MAX_GB` según el disco del servidor (`df -h /`).

---

## 9. Notas de diseño

- El indexador re-recorre todo el FTP cada 3 h. Si resulta pesado para el FTP,
  subir el intervalo del timer a 6 h o implementar indexado incremental (solo
  días nuevos). Empezar simple.
- La API solo entrega archivos que están en `rinex.json` → no expone rutas
  arbitrarias del FTP. Más validación de path contra `..`.
- Servir desde el caché da soporte de **reanudar descarga** (HTTP Range) gratis.
- Seguridad detallada en [`seguridad.md`](seguridad.md).
