import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

export default function Visaciones() {
  return (
    <>
      <PageBanner title="Visaciones" crumbs={['Servicios', 'Visaciones']} />
      <section className="content-page">
        <h2>Guía para el cliente</h2>
        <p>
          Acorde a las normas vigentes, todos los organismos públicos y privados, así como particulares, que deseen publicar mapas, cartas o
          croquis (en papel o formato digital) de la República Oriental del Uruguay, deberán requerir la aprobación del Instituto Geográfico
          Militar.
        </p>

        <div className="visa-faq">
          <details open>
            <summary>¿Qué debo hacer si necesito publicar un mapa o carta?</summary>
            <p>Presentar el material ante el Instituto para su visación, cumpliendo con los requisitos y aranceles vigentes que se detallan a continuación.</p>
          </details>
          <details>
            <summary>¿Dónde y cuándo me pueden atender?</summary>
            <p>
              Dirección: Av. 8 de Octubre 3255, Montevideo
              <br />
              Teléfono: 2487 1810 int. 263/264
              <br />
              Correo: comercial@igm.gub.uy
            </p>
          </details>
          <details>
            <summary>¿Qué debo presentar?</summary>
            <p>Completar los formularios correspondientes y entregar dos copias del material a visar.</p>
            <p>
              <a href="https://igm.gub.uy/wp-content/uploads/2024/01/formulario_visa.pdf" target="_blank" rel="noopener" className="btn-outline">
                Descargar formulario de visación
              </a>
            </p>
          </details>
          <details>
            <summary>¿Cuánto demora el trámite?</summary>
            <p>El trámite lleva un tiempo acorde a los requerimientos del cliente y a la calidad de la información presentada.</p>
          </details>
          <details>
            <summary>¿Qué pasa con los mapas digitales?</summary>
            <p>Se aplican las mismas condiciones que para el material en papel; el interesado debe traer el ploteo en las dimensiones de publicación.</p>
          </details>
          <details>
            <summary>¿Por qué es necesario hacerlo?</summary>
            <p>
              La finalidad es que los agentes compiladores o productores, públicos o privados, compartan un criterio común para representar
              ciertos objetos o accidentes geográficos, fundamentalmente en lo que concierne a los límites con los países vecinos y a los
              nombres geográficos, evitando así inconvenientes. El IGM revisa además si existen errores importantes en la representación del
              territorio, aunque no evalúa la calidad general del producto ni se hace responsable por la misma.
            </p>
          </details>
        </div>

        <h2 style={{ marginTop: 40 }}>Aranceles vigentes</h2>
        <table className="tarifas">
          <thead>
            <tr>
              <th>Tamaño del documento</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hasta 22 × 22.5 cm</td>
              <td>1 UR</td>
            </tr>
            <tr>
              <td>Desde 22 × 22.5 cm hasta 66 × 50 cm</td>
              <td>3 UR</td>
            </tr>
            <tr>
              <td>Desde 66 × 50 cm en adelante</td>
              <td>5 UR</td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>Valores expresados en Unidades Reajustables (UR).</p>

        <Link to="/formulario-de-contacto" className="btn-outline" style={{ marginTop: 20, display: 'inline-block' }}>
          Consultar por una visación
        </Link>
      </section>
    </>
  )
}
