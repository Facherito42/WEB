import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { noticiaBySlug } from '../data/noticias'

export default function NoticiaDetalle({ slug }) {
  const noticia = noticiaBySlug(slug)
  if (!noticia) return null

  return (
    <>
      <PageBanner title={noticia.title} crumbs={['Actualidad IGM', 'Actividades del IGM', noticia.title]} />
      <section className="content-page">
        <div className="noticia-detalle-fecha">{noticia.fecha}</div>

        {noticia.images.length > 0 && (
          <div className="noticia-detalle-galeria">
            {noticia.images.map((src) =>
              /\.mp4$/i.test(src) ? (
                <video key={src} className="content-img" src={src} controls playsInline />
              ) : (
                <img key={src} className="content-img" src={src} alt={noticia.title} />
              ),
            )}
          </div>
        )}

        {noticia.text.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        <div className="ver-historial" style={{ marginTop: 40 }}>
          <Link to="/noticias-actividades-igm2">Ver todas las noticias</Link>
        </div>
      </section>
    </>
  )
}
