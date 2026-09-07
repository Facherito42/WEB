"""Recorre las fuentes (FTP + SFTP histórico) y reescribe el índice partido por año.

    DATA_DIR/index.json     -> { "years": [...], "updated": "...", "sources": {...} }
    DATA_DIR/y/<AAAA>.json   -> [ {year,month,day,station,filename,size,path,src}, ... ]

Modos:
    python -m app.indexer          incremental: re-scan completo del FTP 'regna' +
                                   solo el año actual del SFTP histórico. Rápido.
                                   Lo corre rinex-indexer.timer cada 3 h.
    python -m app.indexer --full   re-scan completo de todo (incluido el histórico
                                   2018+). Tarda; correr a mano la primera vez o
                                   cuando cambie el histórico.
"""
import json
import sys
import time
from datetime import date, datetime, timezone

from . import config, sources


def _atomic_write(path, text: str):
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(text, encoding="utf-8")
    tmp.replace(path)


def build(full: bool = False) -> dict:
    t0 = time.time()
    cur_year = date.today().year

    # 1. cargar el índice existente en memoria: by_year[año] = {path: entry}
    by_year: dict[int, dict[str, dict]] = {}
    for f in config.YEAR_DIR.glob("*.json"):
        try:
            yr = int(f.stem)
        except ValueError:
            continue
        try:
            by_year[yr] = {e["path"]: e for e in json.loads(f.read_text("utf-8"))}
        except (json.JSONDecodeError, OSError):
            pass

    # primera corrida (sin índice previo) -> forzar full
    if not by_year:
        full = True

    # 2. qué años re-scanea el histórico
    hist_years = None if full else {cur_year, cur_year - 1}

    # 3. limpiar entradas de las fuentes que vamos a re-scanear
    for yr, entries in by_year.items():
        for path in list(entries):
            src = entries[path].get("src")
            if src == "regna":
                del entries[path]
            elif src == "hist" and (full or (hist_years and yr in hist_years)):
                del entries[path]

    # 4. re-scan
    stats: dict[str, int] = {}
    for source in sources.all_sources():
        yrs = None if source.name == "regna" else hist_years
        n = 0
        for e in source.entries(years=yrs):
            slot = by_year.setdefault(e["year"], {})
            prev = slot.get(e["path"])
            # 'regna' (datos vivos) gana sobre 'hist' para la misma fecha/archivo
            if prev and prev.get("src") == "regna" and e["src"] == "hist":
                continue
            slot[e["path"]] = e
            n += 1
        stats[source.name] = n

    # 5. escribir archivos por año + index.json
    years_written = []
    total = 0
    for yr in sorted(by_year):
        entries = list(by_year[yr].values())
        year_file = config.YEAR_DIR / f"{yr}.json"
        if not entries:
            year_file.unlink(missing_ok=True)
            continue
        entries.sort(key=lambda e: (e["month"], e["day"], e["station"], e["filename"]))
        _atomic_write(year_file, json.dumps(entries, ensure_ascii=False))
        years_written.append(yr)
        total += len(entries)

    _atomic_write(
        config.INDEX_FILE,
        json.dumps(
            {
                "years": years_written,
                "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                "sources": stats,
            },
            ensure_ascii=False,
        ),
    )

    dt = time.time() - t0
    print(
        f"{'FULL' if full else 'incremental'}: {total} archivos en "
        f"{len(years_written)} años ({dt:.0f}s). Fuentes: {stats}"
    )
    return {"total": total, "years": years_written, "sources": stats}


if __name__ == "__main__":
    try:
        build(full="--full" in sys.argv)
    except Exception as exc:  # noqa: BLE001
        print("ERROR:", exc, file=sys.stderr)
        sys.exit(1)
