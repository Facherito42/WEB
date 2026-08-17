import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

export default function Capacitacion() {
  return (
    <>
      <PageBanner title="Capacitación" crumbs={['Servicios', 'Capacitación']} />
      <section className="content-page">
        <p>
          En esta sección se puede acceder al listado de cursos de capacitación dictados por el Instituto Geográfico Militar, así como al
          material educativo entregado en cada instancia.
        </p>

        <h2>Material de cursos anteriores</h2>
        <div className="curso-card">
          <h3>Taller de Metadatos</h3>
          <ul>
            <li>
              <a href="https://igm.gub.uy/wp-content/uploads/2016/12/conceptos-_v2.rar" target="_blank" rel="noopener">
                Conceptos de metadatos
              </a>
            </li>
            <li>Instalación Geonetwork</li>
            <li>
              <a href="https://igm.gub.uy/wp-content/uploads/2016/12/herramientas_geonetwork_v2.rar" target="_blank" rel="noopener">
                Herramientas Geonetwork
              </a>
            </li>
            <li>
              <a href="https://igm.gub.uy/wp-content/uploads/2016/12/iso_v2.rar" target="_blank" rel="noopener">
                ISO 19.115
              </a>
            </li>
            <li>
              <a href="https://igm.gub.uy/wp-content/uploads/2016/12/rcaa2.rar" target="_blank" rel="noopener">
                RCAA2
              </a>
            </li>
          </ul>
        </div>

        <h2 style={{ marginTop: 32 }}>Próximos cursos</h2>
        <div className="curso-card">
          <h3>Curso Básico de Geomática</h3>
          <p style={{ margin: 0 }}>
            Inscripciones abiertas. Consultá fecha, cupos y requisitos en la sección de <Link to="/noticias-actividades-igm2">Actividades del IGM</Link>.
          </p>
        </div>

        <div className="curso-aviso">
          <strong>Consultas:</strong> para inscribirte a un curso o solicitar información sobre próximas ediciones, escribinos a{' '}
          <strong>comercial@igm.gub.uy</strong> o completá el <Link to="/formulario-de-contacto">formulario de contacto</Link>.
        </div>
      </section>
    </>
  )
}
