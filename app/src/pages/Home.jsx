import { Link } from 'react-router-dom'
import NewsModal from '../components/NewsModal'
import ModuleCard from '../components/ModuleCard'
import CircularGallery from '../components/CircularGallery'
import ServicioCard from '../components/ServicioCard'
import InfoTable from '../components/InfoTable'
import { InfiniteSlider } from '../components/InfiniteSlider'
import StatsSection from '../components/StatsSection'
import { noticias as noticiasData } from '../data/noticias'

const modules = [
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/geoportal_igm.svg`,
    iconOnly: false,
    title: 'Geoportal IGM',
    description: 'Un portal geográfico con visores, geoservicios y cobertura nacional vectorial (WFS) del territorio uruguayo.',
    href: 'https://igm.gub.uy/geoportal/',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/servicios_regna_rou.svg`,
    title: 'Servicios REGNA-ROU',
    description: 'La Red Geodésica Nacional Activa (REGNA-ROU) ofrece mediciones de precisión mediante estaciones de referencia distribuidas en todo el país.',
    to: '/levantamiento-geodesico',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/sirgas_uruguay.svg`,
    title: 'SIRGAS Uruguay',
    description: 'El Instituto Geográfico Militar, a través de la División Geodesia, se encarga de establecer la referencia geodésica oficial del país.',
    href: 'https://www.sirgas.org',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/productos_igm.svg`,
    title: 'Productos IGM',
    description: 'Cartografía oficial, mapas antiguos y publicaciones del Instituto Geográfico Militar del Uruguay disponibles para su adquisición.',
    to: '/productos-igm',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/visaciones.svg`,
    title: 'Visaciones',
    description: 'Trámite de visación de planos y documentos cartográficos ante el Instituto Geográfico Militar.',
    to: '/visaciones-igm',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/organizacion.svg`,
    title: 'Organización',
    description: 'La estructura administrativa del Instituto Geográfico Militar se encuentra conformada por la Dirección, Subdirección y las distintas Divisiones.',
    to: '/organizacion-igm',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/mapas_antiguos.svg`,
    title: 'Mapas Antiguos',
    description: 'Consulta el acervo histórico cartográfico del IGM, incluyendo mapas antiguos digitalizados de todo el territorio nacional.',
    to: '/mapas-antiguos-igm',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/capacitacion.svg`,
    title: 'Capacitación',
    description: 'Cursos y capacitaciones en geomática, geodesia y cartografía dictados por el Instituto Geográfico Militar.',
    to: '/capacitacion-igm',
  },
]

const featuredNoticia = noticiasData[0]

const noticias = noticiasData
  .filter((n) => n.images.length > 0)
  .slice(0, 6)
  .map((n) => ({
    image: n.images[0],
    fecha: n.fecha,
    title: n.title,
    to: `/noticias-actividades-igm2/${n.slug}`,
  }))

const servicios = [
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/servicios_regna_rou.svg`,
    title: 'Servicios REGNA-ROU',
    description: 'La Red Geodésica Nacional Activa del Uruguay (REGNA-ROU) brinda mediciones de precisión mediante un servicio de posicionamiento en tiempo real, sin costo, previo registro.',
    to: '/levantamiento-geodesico',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/geoportal_igm.svg`,
    title: 'Geoportal',
    description: 'Un portal geográfico con visores interactivos, geoservicios WFS y cobertura vectorial nacional para consulta pública.',
    to: '/geoportal-igm',
  },
  {
    icon: `${import.meta.env.BASE_URL}img/modulos/capacitacion.svg`,
    title: 'Capacitación',
    description: 'Cursos de geomática, geodesia y cartografía dictados por especialistas del Instituto Geográfico Militar.',
    to: '/capacitacion-igm',
  },
]

const links = [
  { image: `${import.meta.env.BASE_URL}img/links/ejercito.jpg`, label: 'Ejército Nacional' },
  { image: `${import.meta.env.BASE_URL}img/links/ipgh.jpg`, label: 'IPGH' },
  { image: `${import.meta.env.BASE_URL}img/links/inumet.jpg`, label: 'INUMET' },
  { image: `${import.meta.env.BASE_URL}img/links/sirgas.png`, label: 'SIRGAS' },
  { image: `${import.meta.env.BASE_URL}img/links/ide.png`, label: 'IDE Uruguay' },
  { image: `${import.meta.env.BASE_URL}img/links/gub.jpg`, label: 'gub.uy' },
]

export default function Home() {
  return (
    <>
      <NewsModal />

      <div className="hero">
        <video autoPlay muted loop playsInline>
          <source src={`${import.meta.env.BASE_URL}videos/Hailuo_Video_Keep the original video exactl_545775233654001671.mp4`} type="video/mp4" />
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
          <img src={featuredNoticia.images[0]} alt={featuredNoticia.title} />
          <div>
            <div className="fecha">Publicado: {featuredNoticia.fecha}</div>
            <h3>{featuredNoticia.title}</h3>
            <Link to={`/noticias-actividades-igm2/${featuredNoticia.slug}`} className="btn-entrar">
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
