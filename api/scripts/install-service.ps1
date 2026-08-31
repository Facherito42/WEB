# Registra la API como servicio de Windows con NSSM (https://nssm.cc).
# Ejecutar como administrador desde la carpeta api\ ya instalada (con venv creado).
param(
    [string]$Root = "C:\rinex-api",
    [string]$Nssm = "nssm"
)

$py = Join-Path $Root "venv\Scripts\python.exe"
if (-not (Test-Path $py)) { throw "No existe $py. Creá el venv primero." }

$args = "-m uvicorn app.main:app --host 127.0.0.1 --port 8000 " +
        "--no-server-header --proxy-headers --forwarded-allow-ips 127.0.0.1"
& $Nssm install rinex-api $py $args
& $Nssm set rinex-api AppDirectory $Root
& $Nssm set rinex-api AppStdout (Join-Path $Root "logs\api.log")
& $Nssm set rinex-api AppStderr (Join-Path $Root "logs\api.log")
& $Nssm set rinex-api AppRotateFiles 1
& $Nssm set rinex-api Start SERVICE_AUTO_START
& $Nssm start rinex-api

Write-Host "Servicio 'rinex-api' instalado. Probar: curl http://127.0.0.1:8000/healthz"
