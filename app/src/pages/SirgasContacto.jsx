import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

export default function SirgasContacto() {
  return (
    <>
      <PageBanner title="Contacto SIRGAS" crumbs={['SIRGAS', 'Contacto']} />
      <section className="content-page">
        <p>
          Este es un espacio informativo y educativo sobre SIRGAS y su implementación en Uruguay a través de la REGNA-ROU. Para gestiones
          oficiales sobre redes geodésicas, coordenadas o servicios de corrección en tiempo real, dirigite al Instituto Geográfico Militar.
        </p>

        <ul>
          <li><strong>Referencia técnica de SIRGAS:</strong> <a href="https://sirgas.ipgh.org" target="_blank" rel="noopener">sirgas.ipgh.org</a></li>
          <li><strong>Consultas sobre el Simposio SIRGAS 2026:</strong> <a href="mailto:sirgasipgh@gmail.com">sirgasipgh@gmail.com</a></li>
          <li><strong>Servicio REGNA-ROU (Uruguay):</strong> <Link to="/levantamiento-geodesico">Servicios REGNA-ROU</Link></li>
        </ul>

        <p>
          Para consultas dirigidas al Instituto Geográfico Militar del Uruguay, utilizá el{' '}
          <Link to="/formulario-de-contacto">formulario de contacto</Link> institucional.
        </p>

        
      </section>
    </>
  )
}
