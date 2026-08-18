import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const items = [
  { img: `${import.meta.env.BASE_URL}img/noticias/jornadas-ipgh-2026.jpg`, fecha: '17 de Julio 2026', title: 'Jornadas de IPGH 2026' },
  { img: `${import.meta.env.BASE_URL}img/noticias/curso-geomatica-2026.jpg`, fecha: '12 de Mayo 2026', title: 'Curso Básico de Geomática: Inscripciones Abiertas' },
  { img: `${import.meta.env.BASE_URL}img/noticias/lavalleja-2026.jpg`, fecha: '23 de Marzo 2026', title: 'Trabajos de Campo en el Departamento de Lavalleja' },
  { img: `${import.meta.env.BASE_URL}img/noticias/receptores-gnss-regna-rou.jpg`, fecha: '16 de Diciembre 2025', title: 'Adquisición de nuevos Receptores GNSS para la REGNA-ROU' },
  { img: `${import.meta.env.BASE_URL}img/noticias/relevamiento-pirajara.jpg`, fecha: '13 de Noviembre 2025', title: 'Relevamiento Geodésico - Topográfico en Pirarajá' },
  { img: `${import.meta.env.BASE_URL}img/noticias/jornadas-ipgh-2025.jpg`, fecha: '18 de Setiembre 2025', title: 'Jornadas del IPGH 2025' },
  { img: `${import.meta.env.BASE_URL}img/noticias/visita-nga.jpg`, fecha: '18 de Setiembre 2025', title: 'Visita delegación NGA' },
  { img: `${import.meta.env.BASE_URL}img/noticias/workshop-setiembre-2025.jpg`, fecha: '19 de Agosto 2025', title: 'Workshop 15 y 16 de setiembre de 2025' },
  { img: `${import.meta.env.BASE_URL}img/noticias/marco-referencia-alturas-sirgas.jpg`, fecha: '04 de Junio 2024', title: 'Proyecto Marco de Referencia Internacional de las Alturas - SIRGAS' },
  { img: `${import.meta.env.BASE_URL}img/noticias/convocatoria-pat-2024.jpg`, fecha: '25 de Abril 2024', title: 'Convocatoria PAT 2024 - 2025' },
  { img: `${import.meta.env.BASE_URL}img/noticias/campana-antartica-2024.jpg`, fecha: '08 de Marzo 2024', title: 'Campaña Antártica 2024' },
  { img: `${import.meta.env.BASE_URL}img/noticias/red-gravimetrica-nacional.jpg`, fecha: '09 de Febrero 2024', title: 'Ajuste de la Red Gravimétrica Nacional del Uruguay' },
]

export default function NoticiasActividades() {
  return (
    <>
      <PageBanner title="Actividades del IGM" crumbs={['Actualidad IGM', 'Actividades del IGM']} />
      <section>
        <h2 className="section-title">Actividades del IGM</h2>
        <p className="section-sub">Historial completo de actividades publicadas por nuestro Instituto</p>
        <div className="noticias-scroll">
          {items.map((n) => (
            <div className="noticia-card" key={n.title}>
              <Link to="/articulos-igm">
                <img src={n.img} alt={n.title} />
                <div className="info">
                  <div className="fecha">{n.fecha}</div>
                  <p>{n.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
