import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ClientOnly from '../components/ClientOnly'

const RegnaMap = lazy(() => import('../components/RegnaMap'))
const mapFallback = (
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Cargando mapa…</div>
)

export default function LevantamientoGeodesico() {
  return (
    <>
      <PageBanner title="Servicios REGNA-ROU" crumbs={['Servicios', 'Servicios REGNA-ROU']} />
      <section className="content-page">
        <img className="content-img" src="/img/servicios/regna-rou-estacion.jpg" alt="Servicios REGNA-ROU" />
        <h2>Red Geodésica Nacional Activa (REGNA-ROU)</h2>
        <p>
          La Red Geodésica Nacional Activa del Uruguay (REGNA-ROU) es un conjunto de estaciones de referencia de operación continua (CORS)
          distribuidas estratégicamente en todo el territorio nacional, que brindan un servicio de posicionamiento satelital de precisión en
          tiempo real.
        </p>
        <p>
          Los levantamientos geodésicos y topográficos vinculados a la REGNA-ROU quedan georreferenciados al marco de referencia oficial del
          país, permaneciendo así legalmente emplazados dentro del territorio nacional.
        </p>
        <p>El servicio de tiempo real se utiliza en aplicaciones como:</p>
        <ul>
          <li>Aplicaciones municipales y catastrales.</li>
          <li>Planificación y ordenamiento del terreno.</li>
          <li>Estudios de factibilidad de proyectos de ingeniería.</li>
          <li>Minería, construcción, caminería y agrimensura, entre otros.</li>
        </ul>
        <p>El servicio no tiene costo. Para acceder, es necesario registrarse y crear las credenciales correspondientes en el Servicio de Tiempo Real de la Red:</p>
        <a href="http://rtk.igm.gub.uy/SBC/Account/Register" className="btn-outline">
          Registro de usuarios REGNA-ROU
        </a>

        <h2 style={{ marginTop: 40 }}>Mapa de estaciones REGNA-ROU</h2>
        <p>
          La REGNA-ROU integra la red regional <strong>SIRGAS</strong> (Sistema de Referencia Geocéntrico para las Américas). El siguiente mapa
          muestra las estaciones de la red uruguaya que forman parte de SIRGAS-CON, identificadas por su código de estación y localidad:
        </p>

        <div style={{ width: '100%', height: 480, border: '1px solid #ddd', borderRadius: 6, margin: '20px 0' }}>
          <ClientOnly fallback={mapFallback}>
            <Suspense fallback={mapFallback}>
              <RegnaMap />
            </Suspense>
          </ClientOnly>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>
          Ubicaciones aproximadas por localidad, en base a información pública de estaciones REGNA-ROU integradas a la red SIRGAS-CON.
        </p>

        <br />
        <Link to="/formulario-de-contacto" className="btn-outline">
          Solicitar información
        </Link>
      </section>
    </>
  )
}
