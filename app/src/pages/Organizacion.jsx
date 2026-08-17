import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const funciones = [
  {
    title: 'Geodesia y Topografía',
    items: [
      'Asesorar en materia de procedimientos y equipamiento geodésico, geofísico y topográfico.',
      'Establecer, mantener y archivar la información correspondiente al Sistema Geodésico Nacional (Redes y Estaciones Permanentes de Control Horizontal y Vertical, Geofísico etc.).',
      'Determinar y perfeccionar la forma y dimensiones del geoide en toda el área territorio nacional y eventualmente en proyectos internacionales.',
      'Determinar los puntos de control necesarios para la explotación fotogramétrica.',
      'Realizar el control de calidad de los productos fotogramétricos y cartográficos.',
      'Realizar todo tipo de procedimiento geodésico o topográfico necesario para el cumplimiento de las funciones del Servicio.',
      'Mantener y archivar relevamientos de datos geográficos y toponímicos para el apoyo cartográfico.',
      'Realizar la actualización de mapas y cartas mediante el uso adecuado de la tecnología disponible a tal efecto.',
      'Apoyar la implementación y mantenimiento del Sistema de Información Geográfica.',
    ],
  },
  {
    title: 'Fotogrametría y Teledetección',
    items: [
      'Asesorar en materia de procedimientos técnicos, material y equipo fotogramétrico.',
      'Planificar y ejecutar los procesos fotogramétricos necesarios a los fines cartográficos sean correspondientes a los planes como a otros provenientes de convenios o trabajos especiales.',
      'Apoyar la implementación y mantenimiento del Sistema de Información Geográfica.',
    ],
  },
  {
    title: 'Cartografía y SIG',
    items: [
      'Asesorar en materia de procedimientos técnicos, material y equipo de producción cartográfica.',
      'Planificar y ejecutar las etapas de pre-impresión de todo documento cartográfico o de aquellos que determinen el empleo de una técnica especializada de dibujo.',
      'Mantener y archivar los originales del proceso cartográfico realizados por métodos analógicos.',
      'Desarrollar, mantener y gestionar el Sistema de Información Geográfica con vistas a la implementación de una Infraestructura de Datos Espaciales a nivel Nacional en coordinación con la Divisiones técnicas u otras Instituciones.',
    ],
  },
  {
    title: 'Informática',
    items: [
      'Asegurar la integridad, confidencialidad y disponibilidad de los sistemas de información.',
      'Asesorar en materia de tecnología de la información y comunicaciones.',
      'Asegurar la adquisición, desarrollo y mantenimiento de los sistemas de información.',
      'Realizar el desarrollo y mantenimiento de la web del Servicio.',
      'Coordinar las tareas investigación y desarrollo en las ciencias y tecnologías de la información geográfica.',
    ],
  },
  {
    title: 'Comercial',
    items: [
      'Asesorar en materia de procedimientos técnicos, material y equipos de los trabajos de impresión de documentos cartográficos así como en las políticas de comercialización y marketing.',
      'Asesorar, ejecutar y administrar la comercialización de los productos generados por el Servicio así como el mantenimiento de toda la información que dicho proceso implica.',
      'Ejecutar y controlar los trabajos de impresión realizados o encargados al Servicio.',
      'Administrar y mantener la fototeca del Servicio.',
      'Realizar las tareas correspondientes al laboratorio fotográfico y fotomecánica.',
    ],
  },
  {
    title: 'Administración y Logística',
    items: [
      'Ejecutar la Administración y Gobierno en lo relativo a Personal.',
      'Elaborar y ejecutar los presupuestos correspondientes de acuerdo a las normas legales vigentes.',
      'Tomar a su cargo la Habilitación del Servicio.',
      'Proporcionar apoyo de personal y logístico a las Divisiones.',
      'Realizar mantenimiento de medios, equipos y locales necesarios para el normal desarrollo de las actividades de Servicio.',
    ],
  },
]

export default function Organizacion() {
  return (
    <>
      <PageBanner title="Organización" crumbs={['Institución', 'Organización']} />
      <section className="content-page">
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2>Organigrama</h2>
          <p>
            La estructura administrativa del Instituto Geográfico Militar se organiza a partir de la Dirección y la Subdirección, de las que
            dependen cinco divisiones técnicas y de apoyo.
          </p>

          <nav className="orgchart" aria-label="Organigrama del Instituto Geográfico Militar">
            <ul>
              <li>
                <span className="org-card top">
                  <span className="name">Cnel. Gustavo Caubarrere</span>
                  <span className="role">Director</span>
                </span>
                <ul>
                  <li>
                    <span className="org-card top">
                      <span className="name">Cnel. Edison Viera</span>
                      <span className="role">Subdirector</span>
                    </span>
                    <ul>
                      <li>
                        <span className="org-card">
                          <span className="name">Tte. Cnel. Bruno Canosa</span>
                          <span className="rank">Jefe</span>
                          <span className="role">División Geodesia y Topografía</span>
                        </span>
                      </li>
                      <li>
                        <span className="org-card">
                          <span className="name">Tte. Cnel. Adrian Martinez</span>
                          <span className="rank">Jefe</span>
                          <span className="role">División Secretaría</span>
                        </span>
                      </li>
                      <li>
                        <span className="org-card">
                          <span className="name">Tte. Cnel. Federico Grosso</span>
                          <span className="rank">Jefe</span>
                          <span className="role">División Cartografía y SIG</span>
                        </span>
                      </li>
                      <li>
                        <span className="org-card">
                          <span className="name">Tte. Cnel. Bruno Canosa</span>
                          <span className="rank">Jefe</span>
                          <span className="role">División Fotogrametría</span>
                        </span>
                      </li>
                      <li>
                        <span className="org-card">
                          <span className="name">Tte. Cnel. Pablo Camera</span>
                          <span className="rank">Jefe</span>
                          <span className="role">División Administración y Logística</span>
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', marginTop: -30 }}>
            Ver el detalle de cada autoridad en <Link to="/autoridades">Autoridades</Link>.
          </p>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ marginTop: 50 }}>Funciones por División</h2>
          {funciones.map((f) => (
            <div key={f.title}>
              <h2>{f.title}</h2>
              <ul>
                {f.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
