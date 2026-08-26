import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const hitosRegna = [
  { year: '2006', text: 'Se instala la primera estación de la red, UYTA, en el marco del Proyecto CAP junto a la Universidad de Memphis.' },
  { year: '2007', text: 'Inauguración oficial de la REGNA-ROU con tres estaciones (UYTA, UYMO, UYRO), integradas a la red continental SIRGAS-CON.' },
  { year: '2009', text: 'El Servicio Geográfico Militar se incorpora a SIRGAS como Centro Experimental de Procesamiento.' },
  { year: '2010', text: 'Entra en funcionamiento el Centro Local de Procesamiento SIRGAS (SGM-UY); la red alcanza 7 estaciones con distribución homogénea en el territorio.' },
  { year: '2011–2016', text: 'Se implementa el servicio de corrección diferencial DGNSS/RTK mediante caster NTRIP, con cientos de usuarios activos.' },
  { year: 'Actualidad', text: 'La red opera con 23 estaciones distribuidas en todo el territorio, integradas a SIRGAS-CON.' },
]

const publicaciones = [
  {
    year: '2011',
    title: 'Red Geodésica Nacional Activa de Uruguay (REGNA-ROU)',
    meta: 'Suárez · Boletín SIRGAS 16',
    href: 'https://www.sirgas.org/fileadmin/docs/Boletines/Bol16/Suarez_Reporte_Uruguay_2011.pdf',
  },
  {
    year: '2014',
    title: 'Red Geodésica Nacional Activa de la República Oriental del Uruguay (REGNA-ROU)',
    meta: 'Suárez · Boletín SIRGAS 19',
    href: 'https://www.sirgas.org/fileadmin/docs/Boletines/Bol19/49_Suarez_2014_RedGeodesicaUruguay.pdf',
  },
  {
    year: '2017',
    title: 'Servicio Uruguayo REGNA-ROU RTK',
    meta: 'Boletín SIRGAS 22',
    href: 'https://sirgas.ipgh.org/docs/Boletines/Bol22/02-ServicioUruguayo-REGNA-ROU_RTK.pdf',
  },
  {
    year: '2019',
    title: 'REGNA-ROU Uruguay — IGM',
    meta: 'Caubarrere · Boletín SIRGAS 24',
    href: 'https://www.sirgas.org/fileadmin/docs/Boletines/Bol24/22_Caubarrere_2019_Regna_Rou_Uruguay.pdf',
  },
]

export default function SirgasQueEs() {
  return (
    <>
      <PageBanner title="¿Qué es SIRGAS?" crumbs={['SIRGAS', '¿Qué es?']} />
      <section className="content-page">
        <h2>Marco continental</h2>
        <p>
          SIRGAS —Sistema de Referencia Geocéntrico para las Américas— es la organización panamericana que define y mantiene el marco de
          referencia geodésico oficial del continente americano, dentro del marco técnico de la Asociación Internacional de Geodesia (IAG).
        </p>
        <p>
          Adoptado en 1993 como densificación continental del Marco Internacional de Referencia Terrestre (ITRF), en 2001 amplió su alcance
          para incluir el sistema de referencia vertical, un modelo de geoide gravimétrico y una red continental de gravedad absoluta.
        </p>
        <p>
          Su columna vertebral es la red SIRGAS-CON: cerca de 500 estaciones GNSS de funcionamiento continuo distribuidas por toda América,
          cuyas soluciones semanales de coordenadas y velocidades materializan el sistema de referencia usado por los países miembros.
        </p>

        <div className="stats-grid" style={{ margin: '30px 0 10px' }}>
          <div className="stat-item">
            <div className="stat-number">1993</div>
            <div className="stat-label">Año de creación de SIRGAS</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">~500</div>
            <div className="stat-label">Estaciones GNSS continentales</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">23</div>
            <div className="stat-label">Estaciones activas en Uruguay</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2007</div>
            <div className="stat-label">Inauguración de la red uruguaya</div>
          </div>
        </div>

        <h2>Estructura organizativa</h2>
        <ul>
          <li><strong>Órgano de gobierno:</strong> Consejo Directivo.</li>
          <li><strong>Gestión:</strong> Comité Ejecutivo.</li>
          <li><strong>Asesoría técnica:</strong> Consejo Científico.</li>
          <li><strong>Grupos de trabajo:</strong> Sistema de Referencia · Datum Vertical · Geoide.</li>
        </ul>

        <h2>SIRGAS en Uruguay: la REGNA-ROU</h2>
        <p>
          En Uruguay, SIRGAS se materializa a través de la Red Geodésica Nacional Activa (REGNA-ROU), desarrollada y administrada por el
          Instituto Geográfico Militar (IGM), que sostiene el marco de referencia nacional SIRGAS-ROU98.
        </p>

        <div className="timeline">
          {hitosRegna.map((h) => (
            <div className="timeline-item" key={h.year}>
              <div className="timeline-year">{h.year}</div>
              <p>{h.text}</p>
            </div>
          ))}
        </div>

        <p>
          El detalle de las estaciones y el servicio de corrección en tiempo real está disponible en{' '}
          <Link to="/levantamiento-geodesico">Servicios REGNA-ROU</Link>, incluyendo el mapa de estaciones integradas a SIRGAS-CON.
        </p>

        <h2>Publicaciones y boletines técnicos</h2>
        <p>Reportes sobre la REGNA-ROU presentados en los simposios SIRGAS a lo largo de los años.</p>
        <div className="rinex-wrap">
          <table className="rinex-table">
            <thead>
              <tr>
                <th>Año</th>
                <th>Documento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {publicaciones.map((p) => (
                <tr key={p.href}>
                  <td>{p.year}</td>
                  <td>
                    {p.title}
                    <div style={{ fontSize: '0.82rem', color: '#777', marginTop: 4 }}>{p.meta}</div>
                  </td>
                  <td>
                    <a className="btn-download" href={p.href} target="_blank" rel="noopener">
                      Ver PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  
      </section>
    </>
  )
}
