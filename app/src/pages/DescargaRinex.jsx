import { useEffect, useMemo, useState } from 'react'
import PageBanner from '../components/PageBanner'

// Files are synced from a manifest generated server-side by
// sync-rinex.sh + build_manifest.py (outside this repo). Adjust these two
// paths to wherever the web server publishes them.
const MANIFEST_URL = '/rinex-data/rinex.json'
const DOWNLOAD_BASE = '/rinex-data/raw'

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function uniqueSorted(arr) {
  return [...new Set(arr)].sort((a, b) => a - b)
}

function matches(file, f) {
  return (!f.year || file.year === f.year) && (!f.month || file.month === f.month) && (!f.day || file.day === f.day) && (!f.station || file.station === f.station)
}

export default function DescargaRinex() {
  const [rinexFiles, setRinexFiles] = useState([])
  const [statusNote, setStatusNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ year: '', month: '', day: '', station: '' })

  useEffect(() => {
    let cancelled = false
    async function loadManifest() {
      setLoading(true)
      try {
        const resp = await fetch(MANIFEST_URL, { cache: 'no-store' })
        if (!resp.ok) throw new Error('HTTP ' + resp.status)
        const data = await resp.json()
        if (cancelled) return
        if (!Array.isArray(data) || data.length === 0) {
          setStatusNote('No se encontraron archivos en este momento. Puede que el último sincronismo con el servidor RINEX no haya generado datos todavía.')
          setRinexFiles([])
        } else {
          setRinexFiles(data)
        }
      } catch (err) {
        if (cancelled) return
        setRinexFiles([])
        setStatusNote('No se pudo cargar el listado de archivos (' + err.message + '). Intentá nuevamente en unos minutos o contactá al equipo técnico.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadManifest()
    return () => {
      cancelled = true
    }
  }, [])

  const activeFilters = useMemo(
    () => ({
      year: filters.year ? parseInt(filters.year) : null,
      month: filters.month ? parseInt(filters.month) : null,
      day: filters.day ? parseInt(filters.day) : null,
      station: filters.station || null,
    }),
    [filters],
  )

  const years = useMemo(() => uniqueSorted(rinexFiles.filter((x) => matches(x, { ...activeFilters, year: null })).map((x) => x.year)).reverse(), [rinexFiles, activeFilters])
  const months = useMemo(() => uniqueSorted(rinexFiles.filter((x) => matches(x, { ...activeFilters, month: null })).map((x) => x.month)), [rinexFiles, activeFilters])
  const days = useMemo(() => uniqueSorted(rinexFiles.filter((x) => matches(x, { ...activeFilters, day: null })).map((x) => x.day)), [rinexFiles, activeFilters])
  const stations = useMemo(() => [...new Set(rinexFiles.filter((x) => matches(x, { ...activeFilters, station: null })).map((x) => x.station))].sort(), [rinexFiles, activeFilters])

  const matched = useMemo(() => {
    const list = rinexFiles.filter((x) => matches(x, activeFilters))
    list.sort((a, b) => b.year - a.year || b.month - a.month || b.day - a.day || a.station.localeCompare(b.station))
    return list
  }, [rinexFiles, activeFilters])

  const pathParts = []
  if (activeFilters.year) pathParts.push(activeFilters.year)
  if (activeFilters.month) pathParts.push(monthNames[activeFilters.month - 1])
  if (activeFilters.day) pathParts.push(String(activeFilters.day).padStart(2, '0'))
  if (activeFilters.station) pathParts.push(activeFilters.station)

  function onFilterChange(field) {
    return (e) => setFilters((f) => ({ ...f, [field]: e.target.value }))
  }

  return (
    <>
      <PageBanner title="Descarga de Archivos RINEX" crumbs={['Servicios', 'Descarga de archivos RINEX']} />
      <section className="content-page">
        <div className="rinex-wrap">
          <p>Descargá los archivos RINEX de las estaciones de la red REGNA-ROU, organizados por año, mes, día y estación. Seleccioná los filtros para ubicar el archivo que necesitás.</p>

          <div className="rinex-filters">
            <div className="field">
              <label htmlFor="f-year">Año</label>
              <select id="f-year" value={filters.year} onChange={onFilterChange('year')}>
                <option value="">Todos</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-month">Mes</label>
              <select id="f-month" value={filters.month} onChange={onFilterChange('month')}>
                <option value="">Todos</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {monthNames[m - 1]}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-day">Día</label>
              <select id="f-day" value={filters.day} onChange={onFilterChange('day')}>
                <option value="">Todos</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {String(d).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-station">Estación</label>
              <select id="f-station" value={filters.station} onChange={onFilterChange('station')}>
                <option value="">Todas</option>
                {stations.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rinex-breadcrumb">
            Mostrando: <span>{pathParts.length ? pathParts.join(' / ') : 'todos los archivos'}</span> · <span>{matched.length + (matched.length === 1 ? ' archivo' : ' archivos')}</span>
          </div>

          <div>
            {loading ? (
              <div className="rinex-empty">Cargando archivos…</div>
            ) : matched.length === 0 ? (
              <div className="rinex-empty">No hay archivos que coincidan con ese filtro.</div>
            ) : (
              <table className="rinex-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Estación</th>
                    <th>Archivo</th>
                    <th>Tamaño</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {matched.map((x) => (
                    <tr key={x.path}>
                      <td>
                        {String(x.day).padStart(2, '0')}/{String(x.month).padStart(2, '0')}/{x.year}
                      </td>
                      <td>{x.station}</td>
                      <td>{x.filename}</td>
                      <td>{x.size}</td>
                      <td>
                        <a className="btn-download" href={`${DOWNLOAD_BASE}/${x.path}`} download>
                          Descargar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {statusNote && (
            <div className="rinex-note">
              <strong>Aviso:</strong> <span>{statusNote}</span>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
