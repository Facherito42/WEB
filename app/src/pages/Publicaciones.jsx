import PageBanner from '../components/PageBanner'
import { publicacionCategorias } from '../data/publicaciones'

export default function Publicaciones() {
  return (
    <>
      <PageBanner title="Publicaciones" crumbs={['Publicaciones']} />
      <section className="content-page">
        <p>
          Documentos técnicos y científicos elaborados por el Instituto Geográfico Militar sobre geodesia, cartografía e infraestructura de
          datos espaciales, disponibles para su descarga.
        </p>

        {publicacionCategorias.map((cat) => (
          <div key={cat.title} className="rinex-wrap" style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: '1.15rem' }}>{cat.title}</h2>
            <table className="rinex-table">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Fecha de publicación</th>
                  <th>Tamaño</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item) => (
                  <tr key={item.title}>
                    <td>
                      {item.title}
                      {item.note && (
                        <div style={{ fontSize: '0.82rem', color: '#777', marginTop: 4 }}>{item.note}</div>
                      )}
                    </td>
                    <td>{item.date || 'No especificada'}</td>
                    <td>{item.size}</td>
                    <td>
                      {item.file ? (
                        <a className="btn-download" href={item.file} download>
                          Descargar
                        </a>
                      ) : (
                        <span style={{ color: '#999', fontSize: '0.85rem' }}>No disponible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </>
  )
}
