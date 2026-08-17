import PageBanner from '../components/PageBanner'

export default function FormularioContacto() {
  return (
    <>
      <PageBanner title="Formulario de Contacto" crumbs={['Contáctenos', 'Formulario de contacto']} />
      <section className="content-page form-page">
        <h2>Formulario de Contacto</h2>
        <p>
          Completa el siguiente formulario y nuestro equipo se pondrá en contacto contigo a la brevedad. También puedes escribirnos a{' '}
          <strong>comercial@igm.gub.uy</strong> o llamarnos al <strong>(+598) 2487 1810</strong>, en Avenida 8 de Octubre 3255, Montevideo.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Formulario de demostración: en el sitio real esto enviaría tu consulta al IGM.')
          }}
        >
          <div>
            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono</label>
            <input type="tel" id="telefono" name="telefono" />
          </div>
          <div>
            <label htmlFor="asunto">Asunto</label>
            <select id="asunto" name="asunto">
              <option>Consulta general</option>
              <option>Productos</option>
              <option>Servicios REGNA-ROU</option>
              <option>Geoportal</option>
              <option>Visaciones</option>
              <option>Capacitación</option>
              <option>Mapoteca</option>
            </select>
          </div>
          <div>
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" required />
          </div>
          <button type="submit">Enviar consulta</button>
        </form>
      </section>
    </>
  )
}
