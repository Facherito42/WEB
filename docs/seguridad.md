# Seguridad del sitio y la API RINEX

Contexto: sitio **estático** (React pre-renderizado) + **API de solo lectura**
que sirve archivos RINEX. **Sin logins, sin base de datos, sin datos personales,
sin formularios que guarden nada.** Eso reduce muchísimo el riesgo: los ataques
clásicos (robo de credenciales, inyección SQL, secuestro de sesión) casi no
aplican. Lo que queda a cuidar:

| Amenaza | Qué significa | Dónde se mitiga |
|---|---|---|
| **Defacement / integridad** | Que alguien altere el sitio o sirva malware desde él | Servidor endurecido + acceso restringido (IT) |
| **Disponibilidad (DDoS)** | Que tiren el sitio con tráfico masivo | CDN/WAF + rate limiting |
| **Abuso de la API** | Martillar el FTP interno a través del proxy, llenar disco | Límites en la API (ya implementados) |
| **Compromiso del servidor** | Entrar a la VM por un servicio expuesto o sin parches | Firewall, parches, RDP con MFA (IT) |
| **Cadena de suministro** | Una dependencia (npm/pip) con código malicioso | Versiones fijadas + `npm audit` / revisión |
| **Fuga de información** | Cabeceras, listados de directorio, mensajes de error, source maps | Config de IIS + build de producción |
| **Transporte** | Tráfico sin cifrar o TLS mal configurado | HTTPS obligatorio + config TLS (IT) |
| **Credenciales FTP en la VM** | El `.env` con la clave de `geodesia` | Permisos NTFS + no commitear |

---

## 1. Qué se hizo ahora (en este repo)

### 1.1 Cabeceras de seguridad en IIS — [`api/iis/web.config`](../api/iis/web.config)

Cada respuesta del sitio manda:

| Cabecera | Para qué |
|---|---|
| `Strict-Transport-Security` | Obliga al navegador a usar siempre HTTPS. **Activar solo cuando el dominio ya sirva 100 % por HTTPS** (si no, deja el sitio inaccesible por 2 años en ese navegador). |
| `Content-Security-Policy` | Lista blanca de orígenes: el navegador solo ejecuta/carga JS, CSS, fuentes e imágenes de sitios permitidos (propio + Google Fonts + tiles OpenStreetMap). Frena la mayoría de los XSS. |
| `X-Content-Type-Options: nosniff` | El navegador no "adivina" tipos de archivo (evita que un .txt se ejecute como JS). |
| `X-Frame-Options: DENY` | Nadie puede meter el sitio en un `<iframe>` (anti *clickjacking*). |
| `Referrer-Policy` | Limita qué URL de origen se filtra al navegar a otros sitios. |
| `Permissions-Policy` | Apaga cámara, micrófono, geolocalización, etc. que el sitio no usa. |
| `removeServerHeader` + quitar `X-Powered-By` | No revelar versión de IIS/ASP.NET. |

> **Nota sobre la CSP:** `script-src` incluye `'unsafe-inline'` porque
> vite-react-ssg embebe un `<script>` chico de hidratación en cada página.
> Como el sitio no tiene entradas de usuario ni contenido dinámico, el riesgo
> es bajo. Para endurecerlo habría que post-procesar el build con hashes/nonce.

**Cómo probar:** tras desplegar, abrir el sitio con la consola del navegador
(F12) y revisar que no haya errores rojos de CSP, sobre todo en la página del
**mapa** (`/ubicacion-igm`, `/situacion-geografica`) y en el peso de las fuentes.
Escáner online: <https://securityheaders.com> y <https://observatory.mozilla.org>.

### 1.2 Menos dependencias externas

- Los íconos de marcador de Leaflet se servían desde `unpkg.com` (CDN de
  terceros). Ahora están en [`app/public/leaflet/`](../app/public/leaflet/) y se
  sirven desde el propio dominio → un origen externo menos y la CSP puede ser
  más estricta.
- Quedan **dos** orígenes externos, ambos de bajo riesgo y estándar:
  Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) y los *tiles* del
  mapa (`*.tile.openstreetmap.org`).

### 1.3 Endurecimiento de la API — [`api/app/main.py`](../api/app/main.py)

| Medida | Detalle | Config |
|---|---|---|
| **Rate limiting por IP** | 30 descargas/min y 60 al índice/min por IP. Devuelve 429 si se pasa. | `RATE_LIMIT` en `.env` |
| **Validación de ruta** | Solo `EST/AAAA/MM/DD/archivo`; rechaza `..` y caracteres raros. | — |
| **Lista blanca por índice** | La API solo entrega archivos que están en `rinex.json`. Nunca abre rutas arbitrarias del FTP. | — |
| **Tope de tamaño** | Corta la descarga del FTP si un archivo supera 200 MB. | `MAX_FILE_MB` |
| **Límite de concurrencia al FTP** | Máx. 4 descargas simultáneas desde el FTP interno (lo protege de sobrecarga). | `MAX_CONCURRENT_FTP` |
| **Lock por archivo** | Dos pedidos del mismo archivo → una sola descarga, no dos. | — |
| **Caché acotado** | `cache/` se limpia por antigüedad cuando supera `CACHE_MAX_GB`. | `CACHE_MAX_GB` |
| **Cabeceras de seguridad** | También en las respuestas directas de la API. | — |
| **Sin docs públicas** | `/docs`, `/redoc`, `/openapi.json` deshabilitados. | — |
| **Server header oculto** | uvicorn con `--no-server-header`. | `install-service.ps1` |
| **X-Forwarded-For** | Solo se confía si viene de `127.0.0.1` (IIS/ARR local). | `TRUST_PROXY`, `--forwarded-allow-ips` |

### 1.4 Formulario de contacto

Era un formulario de demostración que solo mostraba un `alert()`. Se reemplazó
por una página con los **datos de contacto reales** y un botón `mailto:`
([`app/src/pages/FormularioContacto.jsx`](../app/src/pages/FormularioContacto.jsx)).
Así no hay backend de email que proteger contra spam/abuso. Si en el futuro se
quiere un formulario real, hace falta: captcha (hCaptcha/Turnstile), rate
limiting, validación server-side y un relay de correo — documentar aparte.

### 1.5 Configuraciones básicas adicionales

- **Cabeceras de seguridad en el sitio actual (Vercel)** —
  [`app/vercel.json`](../app/vercel.json): las mismas cabeceras que el
  `web.config` de IIS, para que el sitio **ya publicado hoy** esté protegido sin
  esperar a la migración. (GitHub Pages no permite cabeceras propias; ese destino
  queda sin ellas.)
- **`.gitignore` en la raíz** — [`/.gitignore`](../.gitignore): bloquea commitear
  `.env`, claves (`*.pem`, `*.key`), `secrets.*` y `.vercel`.
- **`robots.txt`** — [`app/public/robots.txt`](../app/public/robots.txt): permite
  indexar el sitio, excluye `/rinex-data/`.
- **Dependabot** — [`.github/dependabot.yml`](../.github/dependabot.yml): revisa
  semanalmente dependencias de `app/` (npm) y `api/` (pip) y abre PRs cuando hay
  actualizaciones o vulnerabilidades.

### 1.6 Revisión de secretos y source maps

- **Secretos:** se escaneó el historial de git — no hay claves, tokens ni
  archivos privados commiteados. `api/.gitignore` excluye `.env`.
- **Source maps:** el build de producción (`vite-react-ssg build`) **no** genera
  archivos `.map`, así que el código fuente no queda expuesto. (Si algún día se
  activa `build.sourcemap`, volver a desactivarlo para producción.)

---

## 2. Qué falta hacer — y quién

### 2.1 Nuestro equipo (código / despliegue)

- [ ] Al desplegar en IIS: copiar [`api/iis/web.config`](../api/iis/web.config)
      a la raíz del sitio y **probar la CSP** (consola del navegador, página del mapa).
- [ ] Activar `Strict-Transport-Security` **solo** cuando el dominio sirva 100 % HTTPS.
- [ ] `cd app && npm audit` antes de cada despliegue; actualizar dependencias con
      vulnerabilidades altas/críticas. (En la red del IGM `npm audit` puede fallar
      por el proxy con certificado propio; correrlo desde otra red o revisar los
      PRs de Dependabot.)
- [ ] Fijar versiones de las dependencias de la API (ya está en
      [`api/requirements.txt`](../api/requirements.txt)); revisar `pip-audit` de vez en cuando.
- [ ] `.env` de la API: `icacls` restringido a la cuenta de servicio (ver README).
- [ ] Publicar un archivo `/.well-known/security.txt` con un contacto para
      reportar vulnerabilidades (lo pide el marco de CERTuy).

### 2.2 Área de IT del IGM (infraestructura)

Pasale esta lista:

- [ ] **HTTPS obligatorio**: redirección 80→443, certificado válido, TLS 1.2+
      solamente, sin SSLv3/TLS 1.0/1.1. Verificar en <https://www.ssllabs.com/ssltest/>.
- [ ] **Firewall de la VM**: exponer a internet **solo el 443**. RDP (3389)
      **nunca** hacia internet — solo por VPN o red de administración.
- [ ] **RDP con MFA** y contraseñas fuertes; renombrar/deshabilitar la cuenta
      Administrador por defecto.
- [ ] **Parches automáticos** de Windows Server e IIS.
- [ ] **Antivirus/EDR** en la VM (Defender alcanza).
- [ ] **Backups** del sitio y de la config (`web.config`, `.env`, scripts) y
      prueba de restauración.
- [ ] **Segmentación de red**: la VM necesita llegar a `192.168.100.96:21` y a
      los puertos pasivos del FTP, nada más hacia la LAN interna.
- [ ] **Logs**: guardar logs de IIS y de la API; idealmente enviarlos a un
      recolector central. Revisar picos de 404 / 429.
- [ ] **Cuenta de servicio** dedicada (no Administrador) para el servicio de la
      API y la tarea programada, con permisos mínimos.
- [ ] Evaluar un **WAF / CDN** delante (ver sección 3).
- [ ] Registrar el sistema ante **CERTuy** si corresponde y conocer el canal de
      reporte de incidentes.

### 2.3 Normativa (dominio `.gub.uy`)

Al ser un servicio del Estado uruguayo aplica el **Marco de Ciberseguridad de
AGESIC** y las políticas de **CERTuy**. No hace falta que lo domines vos: el
área de IT del IGM debería conocerlo. Referencias:

- Marco de Ciberseguridad AGESIC: <https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/ciberseguridad>
- CERTuy (respuesta a incidentes): <https://www.gub.uy/certuy>
- Ley 18.331 de Protección de Datos Personales — **relevante solo si** la API
  llega a **loguear IPs de quien descarga** con fines de estadística: en ese
  caso hay que informarlo en una política de privacidad. Hoy la API no guarda
  esa relación de forma identificable.

---

## 3. WAF / CDN — qué es y conviene o no

- **CDN** (*Content Delivery Network*): una red de servidores caché repartidos
  por el mundo que se ponen **delante** de tu sitio. El visitante pega contra el
  CDN, no contra tu servidor. Acelera la carga y **absorbe picos de tráfico**.
- **WAF** (*Web Application Firewall*): un filtro que inspecciona cada petición
  y bloquea patrones de ataque conocidos (inyecciones, escaneos, bots) **antes**
  de que lleguen a tu servidor.
- **Cloudflare** (plan gratuito) es el ejemplo típico: da CDN + WAF básico +
  HTTPS + mitigación de DDoS + oculta la IP real del servidor. Se activa
  cambiando los *nameservers* del dominio.

**Para este caso:**

| A favor | En contra |
|---|---|
| Sitio 99 % estático → se cachea perfecto, muy rápido | Depender de un tercero (EE.UU.) para un sitio del Estado — puede chocar con políticas de AGESIC |
| Protección DDoS sin costo | El dominio `.gub.uy` lo gestiona AGESIC/ANTEL; cambiar nameservers requiere trámite |
| Oculta la IP y la ubicación del servidor | El endpoint `/rinex-data/raw/` sirve archivos grandes: el plan gratuito de Cloudflare desaconseja tráfico de archivos pesado |

**Recomendación:** planteárselo a IT del IGM como opción. Si ya tienen un WAF
perimetral propio (muchos organismos lo tienen), con eso alcanza y no hace falta
Cloudflare. Si no tienen nada, un CDN/WAF gratuito delante del **sitio** (no
necesariamente del endpoint de descargas) es una mejora barata.

---

## 4. Checklist de verificación post-despliegue

- [ ] `https://rinex.igm.gub.uy` carga y **redirige** desde `http://`
- [ ] <https://securityheaders.com> da nota **A** o superior
- [ ] <https://www.ssllabs.com/ssltest/> da nota **A** o superior
- [ ] La consola del navegador no muestra errores de CSP (probar mapa + fuentes)
- [ ] `https://rinex.igm.gub.uy/rinex-data/raw/` → **no** lista el directorio
- [ ] Pedir 40 veces seguidas un archivo → a partir de ~30 devuelve **429**
- [ ] `.../raw/../../etc/passwd` y similares → **400 / 404**
- [ ] `curl -I` al sitio: no aparece `Server: Microsoft-IIS/...` ni `X-Powered-By`
- [ ] RDP no responde desde fuera de la red de administración
- [ ] Existe `/.well-known/security.txt` con un contacto
