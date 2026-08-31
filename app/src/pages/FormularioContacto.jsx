import PageBanner from '../components/PageBanner'

const EMAIL = 'comercial@igm.gub.uy'
const TEL = '(+598) 2487 1810'
const DIRECCION = 'Avenida 8 de Octubre 3255, Montevideo'

export default function FormularioContacto() {
  return (
    <>
      <PageBanner title="Contáctenos" crumbs={['Contáctenos', 'Datos de contacto']} />
      <section className="content-page form-page">
        <h2>Datos de contacto</h2>
        <p>
          Para consultas sobre productos, servicios REGNA-ROU, geoportal, visaciones, capacitación o mapoteca, escribinos por
          correo electrónico o llamanos en horario de oficina. Te respondemos a la brevedad.
        </p>

        <ul className="contact-list">
          <li>
            <strong>Correo electrónico:</strong>{' '}
            <a href={`mailto:${EMAIL}?subject=Consulta%20desde%20el%20sitio%20web`}>{EMAIL}</a>
          </li>
          <li>
            <strong>Teléfono:</strong> {TEL}
          </li>
          <li>
            <strong>Dirección:</strong> {DIRECCION}
          </li>
        </ul>

        <p>
          <a className="btn-download" href={`mailto:${EMAIL}?subject=Consulta%20desde%20el%20sitio%20web`}>
            Escribir un correo
          </a>
        </p>
      </section>
    </>
  )
}
