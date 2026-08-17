import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const faqs = [
  { q: '¿Cuál es el horario de atención al público?', a: 'De lunes a viernes, de 8:00 a 13:00 hs.' },
  { q: '¿Dónde puedo informarme sobre los productos y servicios del IGM?', a: 'Personalmente en el local de ventas, por teléfono, consultando el catálogo en este sitio web, o por e-mail.' },
  { q: '¿Cómo compro sin concurrir personalmente al local de ventas?', a: 'Haciendo el pedido por teléfono, fax o e-mail; luego se indica la forma de pago y la modalidad de envío.' },
  { q: '¿De qué años son las fotografías aéreas disponibles?', a: 'Hay vuelos de 1943 (Trimetrogón, escala 1:40.000) y de 1966/67 (escalas 1:40.000 y 1:20.000), que cubren todo el país.' },
  { q: '¿Se venden copias fotográficas?', a: 'El Instituto ya no realiza copias fotográficas tradicionales, pero sí se hacen fotocopias láser de las fotografías.' },
  { q: '¿Cómo pido la fotocopia correspondiente a un padrón determinado?', a: 'Hay que consultar el padrón en el sistema de RENARE, que indica la foto índice y el número de fotografía correspondiente.' },
  { q: '¿En qué escalas está disponible la cartografía?', a: 'En papel: 1:5.000.000, 1:1.000.000, 1:750.000, 1:250.000, 1:50.000 y 1:25.000. En formato digital: 1:500.000, 1:50.000, 1:25.000, 1:20.000 y 1:10.000.' },
  { q: '¿Qué otros productos ofrece el IGM?', a: 'Coordenadas, altitudes, altitudes medias, monografías y ploteos, entre los más solicitados.' },
  { q: '¿Hay cartas actualizadas de Montevideo con calles?', a: 'Sí, la Carta Policromática del Departamento de Montevideo, con hidrografía, fisiografía, vegetación, caminos, áreas urbanas y sitios de interés (edición 2014).' },
  { q: '¿Existe una carta del país completo a escala 1:500.000?', a: 'Sí, la Carta Política que cubre todo el territorio nacional, con hidrografía, transporte, hipsografía, centros poblados, límites y áreas protegidas (edición 2013).' },
  { q: '¿Existen mapas antiguos para consultar?', a: 'Sí, en la Mapoteca del Instituto, de lunes a viernes de 8:00 a 11:00 hs.' },
]

export default function Productos() {
  return (
    <>
      <PageBanner title="Productos" crumbs={['Productos']} />
      <section className="content-page">
        <h2>Catálogo de Productos</h2>
        <ul className="catalogo-list">
          <li>Cartografía a diversas escalas, en formato papel o digital (JPG, TIFF y GeoTIFF) y vectorial.</li>
          <li>Determinación de coordenadas, altitudes y trazado de perfiles.</li>
          <li>Asesoramiento sobre coordenadas y navegación (GPS).</li>
          <li>Datos gravimétricos y magnéticos.</li>
          <li>Reproducción y ampliación de fotografías aéreas, en papel fotográfico o fotocopia láser.</li>
          <li>Levantamientos aerofotogramétricos a diversas escalas.</li>
          <li>Visación de documentos cartográficos.</li>
          <li>Asesoramiento técnico en geodesia, topografía, fotogrametría y geomática.</li>
        </ul>

        <h2 style={{ marginTop: 40 }}>¿Cómo Comprar?</h2>
        <p>Podés adquirir los productos y servicios del Instituto de estas formas:</p>
        <ul className="compra-list">
          <li>En la oficina comercial, Avenida 8 de Octubre 3255 esquina Agustín Abreu, en el horario de 8:00 a 13:00 hs.</li>
          <li>Vía fax al (+598) 2487 0868.</li>
          <li>
            Vía e-mail a <strong>comercial@igm.gub.uy</strong>.
          </li>
        </ul>
        <p>
          Para pedidos sin concurrir personalmente, se puede consultar telefónicamente, por fax o por e-mail, y luego se coordina la forma de
          pago y el envío. El pago se realiza al contado, en efectivo o cheque, en moneda nacional.
        </p>

        <h2 style={{ marginTop: 40 }}>Preguntas Frecuentes</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <Link to="/formulario-de-contacto" className="btn-outline" style={{ marginTop: 30, display: 'inline-block' }}>
          Consultar por un producto
        </Link>
      </section>
    </>
  )
}
