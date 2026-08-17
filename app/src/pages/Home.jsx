import { Link } from 'react-router-dom'
import NewsModal from '../components/NewsModal'
import ModuleCard from '../components/ModuleCard'
import CircularGallery from '../components/CircularGallery'
import ServicioCard from '../components/ServicioCard'
import InfoTable from '../components/InfoTable'

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
  { image: '/img/noticias/CursoBasicoGeomatica.jpg', fecha: '12 de Mayo 2026', title: 'Curso Básico de Geomática: Inscripciones Abiertas', to: '/articulos/curso-basico-geomatica' },
  { image: '/img/noticias/trabajos-campo-lavalleja.jpg', fecha: '23 de Marzo 2026', title: 'Trabajos de Campo en el Departamento de Lavalleja', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/adquisicion-nuevos-gnss.jpeg', fecha: '16 de Diciembre 2025', title: 'Adquisición de nuevos Receptores GNSS para la REGNA-ROU', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/relevamiento-piraraja.jpg', fecha: '13 de Noviembre 2025', title: 'Relevamiento Geodésico - Topográfico en Pirarajá', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/jornadas-ipgh-2026.jpg', fecha: '18 de Setiembre 2025', title: 'Jornadas del IPGH 2025', to: '/noticias-actividades-igm2' },
  { image: '/img/noticias/visita-nga.jpg', fecha: '18 de Setiembre 2025', title: 'Visita delegación NGA', to: '/noticias-actividades-igm2' },
]

const servicios = [
  {
    icon: '/img/servicios/regna-rou.png',
    title: 'Servicios REGNA-ROU',
    description: 'La Red Geodésica Nacional Activa del Uruguay (REGNA-ROU) brinda mediciones de precisión mediante un servicio de posicionamiento en tiempo real, sin costo, previo registro.',
    to: '/levantamiento-geodesico',
  },
  {
    icon: '/img/servicios/geoportal.png',
    title: 'Geoportal',
    description: 'Un portal geográfico con visores interactivos, geoservicios WFS y cobertura vectorial nacional para consulta pública.',
    to: '/geoportal-igm',
  },
  {
    icon: '/img/servicios/capacitacion.png',
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

      <div className="relative bg-gradient-to-br from-verde-igm-osc to-verde-igm text-white overflow-hidden">
        <video autoPlay muted loop playsInline poster="/img/edificio-igm.png" className="w-full block opacity-55">
          <source src="/videos2/video-logoigm-2025.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col justify-center px-[8%] max-w-[700px]">
          <span className="text-dorado-claro font-bold tracking-wide uppercase text-[0.85rem]">Instituto Geográfico Militar</span>
          <h1 className="text-[2.2rem] my-2 leading-tight">Cartografía y Geografía oficial de Uruguay</h1>
        </div>
      </div>

      <section className="py-12.5 px-5 max-w-[1200px] mx-auto">
        <h2 className="text-center text-verde-igm uppercase tracking-wide text-2xl mb-1.5">Módulos IGM</h2>
        <p className="text-center text-[#888] text-[0.85rem] mb-7.5 uppercase tracking-wider">Instituto Geográfico Militar</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
          {modules.map((m) => (
            <ModuleCard key={m.title} {...m} />
          ))}
        </div>
      </section>

      <section className="py-12.5 px-5 max-w-[1200px] mx-auto">
        <h2 className="text-center text-verde-igm uppercase tracking-wide text-2xl mb-1.5">Actividades IGM</h2>
        <p className="text-center text-[#888] text-[0.85rem] mb-7.5 uppercase tracking-wider">Instituto Geográfico Militar</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5 items-center bg-gris-claro rounded-lg p-7.5 mb-10">
          <img src="/img/noticias/jornadas-ipgh-2026.jpg" alt="Jornadas de IPGH 2026" className="rounded-md" />
          <div>
            <div className="text-dorado text-[0.8rem] font-bold uppercase">Publicado: 17 de Julio 2026</div>
            <h3 className="text-verde-igm-osc leading-snug text-[1.15rem]">Jornadas de IPGH 2026</h3>
            <Link to="/articulos-igm" className="inline-block mt-3 bg-dorado hover:bg-verde-igm text-[#1c1c1c] hover:text-white px-[18px] py-2.5 rounded-[3px] text-[0.8rem] font-bold uppercase min-h-11 items-center">
              Ver noticia
            </Link>
          </div>
        </div>

        <h2 className="text-center text-verde-igm uppercase tracking-wide text-[1.2rem] mb-1.5">Actividades Recientes IGM</h2>
        <p className="text-center text-[#888] text-[0.85rem] mb-7.5 uppercase tracking-wider">Galería de actividades publicadas por nuestro Instituto</p>
        <CircularGallery items={noticias} />
        <div className="text-center mt-7.5">
          <Link to="/noticias-actividades-igm2" className="inline-block border-2 border-verde-igm hover:bg-verde-igm text-verde-igm hover:text-white px-6.5 py-2.5 rounded font-bold uppercase text-[0.85rem] min-h-11 items-center">
            Historial de noticias
          </Link>
        </div>
      </section>

      <section className="bg-verde-igm-osc text-white py-12.5 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-white uppercase tracking-wide text-2xl mb-1.5">Servicios IGM</h2>
          <p className="text-center text-white/70 text-[0.85rem] mb-7.5 uppercase tracking-wider">Instituto Geográfico Militar</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {servicios.map((s) => (
              <ServicioCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12.5 px-5 max-w-[1200px] mx-auto">
        <h2 className="text-center text-verde-igm uppercase tracking-wide text-2xl mb-1.5">Enlaces de Interés IGM</h2>
        <p className="text-center text-[#888] text-[0.85rem] mb-7.5 uppercase tracking-wider">Instituto Geográfico Militar</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4.5 text-center">
          {links.map((l) => (
            <div key={l.label} className="flex flex-col items-center gap-2">
              <img src={l.image} alt="" className="h-[60px] object-contain" />
              <span className="text-[0.78rem] font-semibold text-verde-igm-osc">{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12.5 px-5 max-w-[1200px] mx-auto">
        <h2 className="text-center text-verde-igm uppercase tracking-wide text-2xl mb-1.5">Informaciones IGM</h2>
        <p className="text-center text-[#888] text-[0.85rem] mb-7.5 uppercase tracking-wider">Instituto Geográfico Militar</p>
        <InfoTable
          caption="Informaciones"
          rows={[
            ['Dirección', 'Avenida 8 de Octubre 3255, Montevideo'],
            ['Central', '(+598) 2487 1810'],
            ['Comercial', 'comercial@igm.gub.uy'],
          ]}
        />
        <InfoTable
          caption="Horario de Atención"
          rows={[
            ['Comercial', 'Lunes a viernes 8:00 a 13:00 hrs.'],
            ['Mapoteca', 'Lunes a viernes 9:00 a 12:00 hrs.'],
          ]}
        />
      </section>
    </>
  )
}
