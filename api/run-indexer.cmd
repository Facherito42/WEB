@echo off
REM Regenera data\rinex.json. Lo llama la tarea programada de Windows cada 3 h.
cd /d "%~dp0"
if not exist logs mkdir logs
venv\Scripts\python.exe -m app.indexer >> logs\indexer.log 2>&1
