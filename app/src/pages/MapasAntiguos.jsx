import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import InfoTable from '../components/InfoTable'

export default function MapasAntiguos() {
  return (
    <>
      <PageBanner title="Mapas Antiguos" crumbs={['Servicios', 'Mapas Antiguos']} />
      <section className="content-page">
        <h2>Mapoteca del Instituto Geográfico Militar</h2>
        <p>
          La Mapoteca del Instituto Geográfico Militar cuenta con más de <strong>4.000 documentos cartográficos</strong>, entre los cuales se
          destaca una selección de <strong>400 documentos históricos</strong>.
        </p>
        <p>
          Estos documentos se componen de originales y reproducciones de Sudamérica, y muy especialmente de la región de nuestro país, desde
          el año <strong>1613</strong> hasta las primeras ediciones de las cartas editadas por el Instituto.
        </p>
        <p>Los documentos se encuentran a disposición de los usuarios para su consulta en sala, permitiéndose además realizar reprografía de los mismos.</p>

        <h2 style={{ marginTop: 36 }}>Consultas y horario</h2>
        <InfoTable
          style={{ maxWidth: 520 }}
          rows={[
            ['Horario de sala', 'Lunes a viernes, 9:00 a 12:00 hs.'],
            ['Dirección', 'Avenida 8 de Octubre 3255, Montevideo'],
            ['Contacto', 'comercial@igm.gub.uy'],
          ]}
        />

        <Link to="/formulario-de-contacto" className="btn-outline" style={{ marginTop: 24, display: 'inline-block' }}>
          Consultar por un documento
        </Link>
      </section>
    </>
  )
}
