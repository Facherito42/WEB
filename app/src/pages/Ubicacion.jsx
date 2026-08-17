import { lazy, Suspense } from 'react'
import PageBanner from '../components/PageBanner'
import InfoTable from '../components/InfoTable'
import ClientOnly from '../components/ClientOnly'

const UbicacionMap = lazy(() => import('../components/UbicacionMap'))
const mapFallback = (
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Cargando mapa…</div>
)

export default function Ubicacion() {
  return (
    <>
      <PageBanner title="Ubicación" crumbs={['Institución', 'Ubicación']} />
      <section className="content-page">
        <h2>Sede del Instituto Geográfico Militar</h2>
        <p>El Instituto Geográfico Militar del Uruguay se encuentra en el barrio Unión de Montevideo, sobre Avenida 8 de Octubre esquina Agustín Abreu.</p>

        <div style={{ width: '100%', height: 420, border: '1px solid #ddd', borderRadius: 6, margin: '20px 0' }}>
          <ClientOnly fallback={mapFallback}>
            <Suspense fallback={mapFallback}>
              <UbicacionMap />
            </Suspense>
          </ClientOnly>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>Ubicación aproximada sobre Av. 8 de Octubre y Agustín Abreu, barrio Unión.</p>

        <div style={{ marginTop: 30, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h3 style={{ marginTop: 0 }}>Cómo llegar</h3>
            <p>Ómnibus con parada en Av. 8 de Octubre y Agustín Abreu: líneas 2, 105, 145, 174, 181 y 300, entre otras.</p>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h3 style={{ marginTop: 0 }}>Horarios de atención</h3>
            <InfoTable
              style={{ width: '100%' }}
              rows={[
                ['Oficina comercial', 'Lunes a viernes, 8:00 a 13:00 hs.'],
                ['Mapoteca', 'Lunes a viernes, 9:00 a 12:00 hs.'],
              ]}
            />
          </div>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Avenida+8+de+Octubre+3255,+Montevideo"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          style={{ marginTop: 20, display: 'inline-block' }}
        >
          Abrir en Google Maps
        </a>
      </section>
    </>
  )
}
