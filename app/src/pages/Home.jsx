import { Link } from 'react-router-dom'
import NewsModal from '../components/NewsModal'
import ModuleCard from '../components/ModuleCard'
import CircularGallery from '../components/CircularGallery'
import ServicioCard from '../components/ServicioCard'
import InfoTable from '../components/InfoTable'
import { InfiniteSlider } from '../components/InfiniteSlider'
import StatsSection from '../components/StatsSection'

const modules = [
  {
    icon: '/img/modulos/geoportal_igm.svg',
    iconOnly: false,
    title: 'Geoportal IGM',
    description: 'Un portal geográfico con visores, geoservicios y cobertura nacional vectorial (WFS) del territorio uruguayo.',
    href: 'https://igm.gub.uy/geoportal/',
  },
  {
    icon: '/img/modulos/servicios_regna_rou.svg',
    title: 'Servicios REGNA-ROU',
    description: 'La Red Geodésica Nacional Activa (REGNA-ROU) ofrece mediciones de precisión mediante estaciones de referencia distribuidas en todo el país.',
    to: '/levantamiento-geodesico',
  },
  {
    icon: '/img/modulos/sirgas_uruguay.svg',
    title: 'SIRGAS Uruguay',
    description: 'El Instituto Geográfico Militar, a través de la División Geodesia, se encarga de establecer la referencia geodésica oficial del país.',
    href: 'https://www.sirgas.org',
  },
  {
    icon: '/img/modulos/productos_igm.svg',
    title: 'Productos IGM',
    description: 'Cartografía oficial, mapas antiguos y publicaciones del Instituto Geográfico Militar del Uruguay disponibles para su adquisición.',
    to: '/productos-igm',
  },
  {
    icon: '/img/modulos/visaciones.svg',
    title: 'Visaciones',
    description: 'Trámite de visación de planos y documentos cartográficos ante el Instituto Geográfico Militar.',
    to: '/visaciones-igm',
  },
  {
    icon: '/img/modulos/organizacion.svg',
    title: 'Organización',
    description: 'La estructura administrativa del Instituto Geográfico Militar se encuentra conformada por la Dirección, Subdirección y las distintas Divisiones.',
    to: '/organizacion-igm',
  },
  {
    icon: '/img/modulos/mapas_antiguos.svg',
    title: 'Mapas Antiguos',
    description: 'Consulta el acervo histórico cartográfico del IGM, incluyendo mapas antiguos digitalizados de todo el territorio nacional.',
    to: '/mapas-antiguos-igm',
  },
  {
    icon: '/img/modulos/capacitacion.svg',
    title: 'Capacitación',
    description: 'Cursos y capacitaciones en geomática, geodesia y cartografía dictados por el Instituto Geográfico Militar.',
    to: '/capacitacion-igm',
  },
]

const noticias = [
  { image: '/img/noticias/CursoBasicoGeomatica.jpg', fecha: '12 de Mayo 2026', title: 'Curso Básico de Geomática: Inscripciones Abiertas', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/trabajos-campo-lavalleja.jpg', fecha: '23 de Marzo 2026', title: 'Trabajos de Campo en el Departamento de Lavalleja', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/adquisicion-nuevos-gnss.jpeg', fecha: '16 de Diciembre 2025', title: 'Adquisición de nuevos Receptores GNSS para la REGNA-ROU', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/relevamiento-piraraja.jpg', fecha: '13 de Noviembre 2025', title: 'Relevamiento Geodésico - Topográfico en Pirarajá', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/jornadas-ipgh-2026.jpg', fecha: '18 de Setiembre 2025', title: 'Jornadas del IPGH 2025', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/visita-nga.jpg', fecha: '18 de Setiembre 2025', title: 'Visita delegación NGA', to: '/noticias-actividades-igm2' },
]

const servicios = [
  {
    icon: '/img/modulos/servicios_regna_rou.svg',
    title: 'Servicios REGNA-ROU',
    description: 'La Red Geodésica Nacional Activa del Uruguay (REGNA-ROU) brinda mediciones de precisión mediante un servicio de posicionamiento en tiempo real, sin costo, previo registro.',
    to: '/levantamiento-geodesico',
  },
  {
    icon: '/img/modulos/geoportal_igm.svg',
    title: 'Geoportal',
    description: 'Un portal geográfico con visores interactivos, geoservicios WFS y cobertura vectorial nacional para consulta pública.',
    to: '/geoportal-igm',
  },
  {
    icon: '/img/modulos/capacitacion.svg',
    title: 'Capacitación',
    description: 'Cursos de geomática, geodesia y cartografía dictados por especialistas del Instituto Geográfico Militar.',
    to: '/capacitacion-igm',
  },
]

const links = [
  { image: '/img/links/ejercito.jpg', label: 'Ejército Nacional' },
  { image: '/img/links/ipgh.jpg', label: 'IPGH' },
  { image: '/img/links/inumet.jpg', label: 'INUMET' },
  { image: '/img/links/sirgas.png', label: 'SIRGAS' },
  { image: '/img/links/ide.png', label: 'IDE Uruguay' },
  { image: '/img/links/gub.jpg', label: 'gub.uy' },
]

export default function Home() {
  return (
    <>
      <NewsModal />

      <div className="hero">
        <video autoPlay muted loop playsInline>
          <source src="/videos/Hailuo_Video_Keep the original video exactl_545775233654001671.mp4" type="video/mp4" />
        </video>
        <div className="hero-caption">
          <span>Instituto Geográfico Militar</span>
          <h1>Cartografía y Geografía oficial de Uruguay</h1>
        </div>
      </div>

      <section id="modulos">
        <h2 className="section-title">Módulos IGM</h2>
        <p className="section-sub">Instituto Geográfico Militar</p>
        <div className="modules-grid">
          {modules.map((m) => (
            <ModuleCard key={m.title} {...m} />
          ))}
        </div>
      </section>

      <StatsSection />

      <section id="actualidad">
        <h2 className="section-title">Actividades IGM</h2>
        <p className="section-sub">Instituto Geográfico Militar</p>

        <div className="destacada">
          <img src="/img/noticias/jornadas-ipgh-2026.jpg" alt="Jornadas de IPGH 2026" />
          <div>
            <div className="fecha">Publicado: 17 de Julio 2026</div>
            <h3>Jornadas de IPGH 2026</h3>
            <Link to="/articulos-igm" className="btn-entrar">
              Ver noticia
            </Link>
          </div>
        </div>

        <h2 className="section-title" style={{ fontSize: '1.2rem' }}>
          Actividades Recientes IGM
        </h2>
        <p className="section-sub">Galería de actividades publicadas por nuestro Instituto</p>
        <CircularGallery items={noticias} />
        <div className="ver-historial">
          <Link to="/noticias-actividades-igm2">Historial de noticias</Link>
        </div>
      </section>

      <section className="servicios">
        <h2 className="section-title">Servicios IGM</h2>
        <p className="section-sub">Instituto Geográfico Militar</p>
        <div className="servicios-grid">
          {servicios.map((s) => (
            <ServicioCard key={s.title} {...s} />
          ))}
        </div>
      </section>


      <section id="links">
        <h2 className="section-title">Enlaces de Interés IGM</h2>
        <p className="section-sub">Instituto Geográfico Militar</p>
        <InfiniteSlider gap={40} duration={30} durationOnHover={75}>
          {links.map((l) => (
            <div className="item" key={l.label} style={{ width: 120 }}>
              <img src={l.image} alt="" style={{ height: 60, width: '100%', objectFit: 'contain' }} />
              <span>{l.label}</span>
            </div>
          ))}
        </InfiniteSlider>
      </section>

      <section id="informaciones">
        <h2 className="section-title">Información IGM</h2>
        <p className="section-sub">Instituto Geográfico Militar</p>
        <InfoTable
          headers={['Informaciones', 'Dirección / Teléfono / Contactos']}
          rows={[
            ['Dirección', 'Avenida 8 de Octubre 3255, Montevideo'],
            ['Central', '(+598) 2487 1810'],
            ['Comercial', 'comercial@igm.gub.uy'],
          ]}
        />
        <InfoTable
          headers={['Horario de Atención']}
          rows={[
            ['Comercial', 'Lunes a viernes 8:00 a 13:00 hrs.'],
            ['Mapoteca', 'Lunes a viernes 9:00 a 12:00 hrs.'],
          ]}
        />
      </section>
    </>
  )
}
