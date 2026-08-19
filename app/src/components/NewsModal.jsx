import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { noticias } from '../data/noticias'

const STORAGE_KEY = 'igmNoticiaModalCerrado'
const featured = noticias[0]

export default function NewsModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let alreadyClosed = false
    try {
      alreadyClosed = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      /* private mode, etc. */
    }
    if (alreadyClosed) return
    const timer = setTimeout(() => setOpen(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  function close() {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode, etc. */
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="igm-modal-titulo"
      className={`igm-modal-overlay${open ? ' is-open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="igm-modal">
        <button type="button" aria-label="Cerrar" onClick={close} className="igm-modal-close">
          &times;
        </button>
        <img src={featured.images[0]} alt={featured.title} />
        <div className="igm-modal-body">
          <div className="igm-modal-fecha">Publicado: {featured.fecha}</div>
          <h3 id="igm-modal-titulo">{featured.title}</h3>
          <Link to={`/noticias-actividades-igm2/${featured.slug}`} className="btn-entrar">
            Ver noticia
          </Link>
        </div>
      </div>
    </div>
  )
}
