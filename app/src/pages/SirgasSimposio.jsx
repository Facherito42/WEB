import PageBanner from '../components/PageBanner'

const ejesTematicos = [
  {
    title: 'Estudios atmosféricos y monitoreo geodinámico',
    text: 'Monitoreo geodinámico, estudios atmosféricos, determinación de cambios en el nivel medio del mar y estudios geofísicos basados en la infraestructura SIRGAS.',
  },
  {
    title: 'Desarrollo y mantenimiento del marco SIRGAS',
    text: 'Reportes de los Centros de Análisis SIRGAS, revisión y actualización de las estrategias de procesamiento y combinación, análisis y modelado de las deformaciones del marco de referencia, y procesamiento de observaciones GNSS.',
  },
  {
    title: 'Aplicaciones prácticas del marco SIRGAS',
    text: 'Aplicaciones prácticas encaminadas a la adopción de SIRGAS a nivel subregional y nacional: reportes de los países miembros, avances en la adopción de SIRGAS, y uso y disponibilidad de los productos SIRGAS.',
  },
  {
    title: 'Modelado del campo de gravedad terrestre',
    text: 'Geoide, gravimetría y sistema de referencia internacional de alturas. Avances y actividades necesarias para apoyar el desarrollo del sistema de referencia vertical unificado, el modelado del campo de gravedad terrestre y la gravedad absoluta en los países de SIRGAS.',
  },
]

const fechasClave = [
  { fecha: '25 may 2026', evento: 'Apertura de inscripciones' },
  { fecha: '28 ago 2026', evento: 'Cierre de inscripción y envío de resúmenes' },
  { fecha: '12 sep 2026', evento: 'Comunicación de trabajos aceptados' },
  { fecha: '19 oct 2026', evento: 'Distribución del programa' },
  { fecha: '3–6 nov 2026', evento: 'Simposio en Montevideo' },
]

export default function SirgasSimposio() {
  return (
    <>
      <PageBanner title="Simposio SIRGAS 2026" crumbs={['SIRGAS', 'Simposio']} />
      <section className="content-page">
        <p>
          Montevideo será sede del Simposio SIRGAS 2026, organizado por el Comité Ejecutivo de SIRGAS junto con el Instituto Geográfico
          Militar del Uruguay. El evento busca reforzar la adopción del marco geodésico SIRGAS y la colaboración regional, en línea con las
          metas conjuntas de IPGH, UN-GGIM Américas, AmeriGEO y la Agenda 2030.
        </p>

        <h2>Ejes temáticos</h2>
        <div className="faq">
          {ejesTematicos.map((eje, i) => (
            <details key={eje.title}>
              <summary>{String(i + 1).padStart(2, '0')} · {eje.title}</summary>
              <p>{eje.text}</p>
            </details>
          ))}
        </div>

        <h2>Fechas clave</h2>
        <table className="info-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hito</th>
            </tr>
          </thead>
          <tbody>
            {fechasClave.map((f) => (
              <tr key={f.fecha}>
                <td>{f.fecha}</td>
                <td>{f.evento}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 20 }}>
          <a
            className="btn-outline"
            href="https://sirgas.ipgh.org/bienvenido-a-nuestra-seccion-de-eventos/simposio-2026/"
            target="_blank"
            rel="noopener"
          >
            Ver información e inscripción oficial
          </a>
          <a className="btn-outline" href="mailto:sirgasipgh@gmail.com">
            sirgasipgh@gmail.com
          </a>
        </div>

        {/* <div className="notice-box" style={{ marginTop: 30 }}>
          Espacio informativo sobre el evento. Para la inscripción y el envío de trabajos, dirigite al sitio oficial de SIRGAS.
        </div> */}
      </section>
    </>
  )
}
