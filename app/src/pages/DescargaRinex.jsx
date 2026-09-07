import { useEffect, useMemo, useRef, useState } from 'react'
import PageBanner from '../components/PageBanner'

// Índice partido por año, generado server-side por la API RINEX:
//   /rinex-data/index.json   -> { years: [...] }
//   /rinex-data/y/<AAAA>.json -> archivos de ese año
//   /rinex-data/raw/<path>    -> descarga
const INDEX_URL = '/rinex-data/index.json'
const yearUrl = (y) => `/rinex-data/y/${y}.json`
const DOWNLOAD_BASE = '/rinex-data/raw'

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function uniqueSorted(arr) {
  return [...new Set(arr)].sort((a, b) => a - b)
}

function matches(file, f) {
  return (!f.month || file.month === f.month) && (!f.day || file.day === f.day) && (!f.station || file.station === f.station)
}

export default function DescargaRinex() {
  const [years, setYears] = useState([])
  const [year, setYear] = useState('')
  const [yearData, setYearData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingYear, setLoadingYear] = useState(false)
  const [statusNote, setStatusNote] = useState('')
  const [filters, setFilters] = useState({ month: '', day: '', station: '' })
  const cache = useRef({})

  // 1. Cargar el índice de años
  useEffect(() => {
    let cancelled = false
    async function loadIndex() {
      setLoading(true)
      try {
        const resp = await fetch(INDEX_URL, { cache: 'no-store' })
        if (!resp.ok) throw new Error('HTTP ' + resp.status)
        const data = await resp.json()
        if (cancelled) return
        const ys = Array.isArray(data.years) ? [...data.years].sort((a, b) => b - a) : []
        if (ys.length === 0) {
          setStatusNote('No se encontraron archivos en este momento. Puede que el último sincronismo con el servidor RINEX no haya generado datos todavía.')
          setYears([])
        } else {
          setYears(ys)
          setYear(String(ys[0]))
        }
      } catch (err) {
        if (cancelled) return
        setYears([])
        setStatusNote('No se pudo cargar el listado de años (' + err.message + '). Intentá nuevamente en unos minutos o contactá al equipo técnico.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadIndex()
    return () => {
      cancelled = true
    }
  }, [])

  // 2. Cargar los archivos del año seleccionado (con caché en memoria)
  useEffect(() => {
    if (!year) return
    let cancelled = false
    async function loadYear() {
      if (cache.current[year]) {
        setYearData(cache.current[year])
        return
      }
      setLoadingYear(true)
      try {
        const resp = await fetch(yearUrl(year), { cache: 'no-store' })
        if (!resp.ok) throw new Error('HTTP ' + resp.status)
        const data = await resp.json()
        if (cancelled) return
        cache.current[year] = data
        setYearData(data)
        setStatusNote('')
      } catch (err) {
        if (cancelled) return
        setYearData([])
        setStatusNote('No se pudieron cargar los archivos de ' + year + ' (' + err.message + ').')
      } finally {
        if (!cancelled) setLoadingYear(false)
      }
    }
    loadYear()
    return () => {
      cancelled = true
    }
  }, [year])

  const activeFilters = useMemo(
    () => ({
      month: filters.month ? parseInt(filters.month) : null,
      day: filters.day ? parseInt(filters.day) : null,
      station: filters.station || null,
    }),
    [filters],
  )

  const months = useMemo(() => uniqueSorted(yearData.filter((x) => matches(x, { ...activeFilters, month: null })).map((x) => x.month)), [yearData, activeFilters])
  const days = useMemo(() => uniqueSorted(yearData.filter((x) => matches(x, { ...activeFilters, day: null })).map((x) => x.day)), [yearData, activeFilters])
  const stations = useMemo(() => [...new Set(yearData.filter((x) => matches(x, { ...activeFilters, station: null })).map((x) => x.station))].sort(), [yearData, activeFilters])

  const matched = useMemo(() => {
    const list = yearData.filter((x) => matches(x, activeFilters))
    list.sort((a, b) => b.month - a.month || b.day - a.day || a.station.localeCompare(b.station))
    return list
  }, [yearData, activeFilters])

  const pathParts = [year]
  if (activeFilters.month) pathParts.push(monthNames[activeFilters.month - 1])
  if (activeFilters.day) pathParts.push(String(activeFilters.day).padStart(2, '0'))
  if (activeFilters.station) pathParts.push(activeFilters.station)

  function onYearChange(e) {
    setYear(e.target.value)
    setFilters({ month: '', day: '', station: '' })
  }

  function onFilterChange(field) {
    return (e) => setFilters((f) => ({ ...f, [field]: e.target.value }))
  }

  return (
    <>
      <PageBanner title="Descarga de Archivos RINEX" crumbs={['Servicios', 'Descarga de archivos RINEX']} />
      <section className="content-page">
        <div className="rinex-wrap">
          <p>Descargá los archivos RINEX de las estaciones de la red REGNA-ROU, organizados por año, mes, día y estación. Elegí el año y luego afiná con los demás filtros.</p>

          <div className="rinex-filters">
            <div className="field">
              <label htmlFor="f-year">Año</label>
              <select id="f-year" value={year} onChange={onYearChange} disabled={loading || years.length === 0}>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-month">Mes</label>
              <select id="f-month" value={filters.month} onChange={onFilterChange('month')} disabled={loadingYear}>
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
              <select id="f-day" value={filters.day} onChange={onFilterChange('day')} disabled={loadingYear}>
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
              <select id="f-station" value={filters.station} onChange={onFilterChange('station')} disabled={loadingYear}>
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
            Mostrando: <span>{pathParts.join(' / ')}</span> · <span>{matched.length + (matched.length === 1 ? ' archivo' : ' archivos')}</span>
          </div>

          <div>
            {loading ? (
              <div className="rinex-empty">Cargando…</div>
            ) : loadingYear ? (
              <div className="rinex-empty">Cargando archivos de {year}…</div>
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
