import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { noticias } from '../data/noticias'

export default function NoticiasActividades() {
  return (
    <>
      <PageBanner title="Actividades del IGM" crumbs={['Actualidad IGM', 'Actividades del IGM']} />
      <section>
        <h2 className="section-title">Actividades del IGM</h2>
        <p className="section-sub">Historial completo de actividades publicadas por nuestro Instituto</p>
        <div className="noticias-scroll">
          {noticias.map((n) => (
            <div className="noticia-card" key={n.slug}>
              <Link to={`/noticias-actividades-igm2/${n.slug}`}>
                {n.images.length > 0 && <img src={n.images[0]} alt={n.title} />}
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
