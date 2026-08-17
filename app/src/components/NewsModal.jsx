import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'igmNoticiaModalCerrado'

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
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(10,20,30,0.6)] p-5 transition-opacity duration-250 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className={`bg-white rounded-[10px] max-w-[460px] w-full overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-transform duration-250 ${open ? 'translate-y-0' : 'translate-y-2.5'}`}>
        <button
          type="button"
          aria-label="Cerrar"
          onClick={close}
          className="absolute top-2.5 right-3 bg-black/45 hover:bg-black/70 text-white border-none w-[30px] h-[30px] rounded-full text-[1.1rem] leading-none cursor-pointer"
        >
          &times;
        </button>
        <img src="/img/noticias/jornadas-ipgh-2026.jpg" alt="Jornadas de IPGH 2026" className="w-full max-h-[240px] object-cover" />
        <div className="p-[18px_22px_22px] relative">
          <div className="text-[0.82rem] text-[#777] mt-3.5 mb-1">Publicado: 17 de Julio 2026</div>
          <h3 id="igm-modal-titulo" className="mt-0 mb-3 text-verde-igm-osc">
            Jornadas de IPGH 2026
          </h3>
          <Link to="/articulos-igm" className="inline-block bg-dorado hover:bg-verde-igm text-[#1c1c1c] hover:text-white px-[18px] py-2 rounded-[3px] text-[0.8rem] font-bold uppercase">
            Ver noticia
          </Link>
        </div>
      </div>
    </div>
  )
}
