import PageBanner from '../components/PageBanner'

const sectores = [
  ['1', 'Arroyo Chuy', 'Álveo', '13'],
  ['2', 'Línea recta (Chuy)', 'Línea recta convencional', '8,7'],
  ['3', 'Arroyo San Miguel', 'Línea de medias distancias', '13'],
  ['4', 'Laguna Merín', 'Línea convencional', '140,1'],
  ['4.1', 'Laguna Merín', 'Líneas rectas que unen puntos', '86,8'],
  ['4.2', 'Laguna Merín', 'Línea convencional quebrada', '20,6'],
  ['4.3', 'Laguna Merín', 'Talweg', '19'],
  ['4.4', 'Laguna Merín', 'Línea recta convencional', '13,7'],
  ['5', 'Río Yaguarón', 'Talweg', '32,4'],
  ['6', 'Río Yaguarón', 'Línea de medias distancias', '120'],
  ['7', 'Río Yaguarón Chico', 'Línea de medias distancias', '18,5'],
  ['8', 'Arroyo de la Mina', 'Álveo', '20,4'],
  ['9', 'Recta Aceguá', 'Línea recta convencional', '37,2'],
  ['10', 'Arroyo San Luis', 'Álveo', '25,5'],
  ['11', 'Arroyo San Luis', 'Línea recta convencional', '1,3'],
  ['12', 'Arroyo San Luis', 'Álveo', '4,5'],
  ['13', 'Gajo norte del Arroyo San Luis', 'Álveo', '0,2'],
  ['14', 'Gajo norte del Arroyo San Luis', 'Línea recta convencional', '1,2'],
  ['15', 'Gajo norte del Arroyo San Luis', 'Álveo', '2,2'],
  ['16', 'Línea recta', 'Línea recta convencional', '8'],
  ['17', 'Cañada del Cementerio', 'Álveo', '4'],
  ['18', 'Líneas rectas', 'Línea recta convencional', '0,6'],
  ['19', 'Cuchilla Santa Ana SE', 'Línea divisoria de aguas', '168,5'],
  ['20', 'Rivera – Livramento', 'Línea convencional quebrada', '4,8'],
  ['21', 'Cuchilla Santa Ana NW', 'Línea divisoria de aguas', '20,8'],
  ['22', 'Cuchilla Negra', 'Línea divisoria de aguas', '41,3'],
  ['23', 'Arroyo de la Invernada', 'Contestado', '28,0'],
  ['24', 'Arroyo de la Invernada', 'Álveo', '9,8'],
  ['24', 'Río Cuareim', 'Álveo', '313,4'],
]

export default function LimitesBrasil() {
  return (
    <>
      <PageBanner title="Límites con Brasil" crumbs={['Información Territorial', 'Límites con Brasil']} />
      <section className="content-page">
        <p>
          El límite entre la República Oriental del Uruguay y la República Federativa del Brasil se compone de una sucesión de tramos con
          distinto régimen jurídico (álveo, línea de medias distancias, línea divisoria de aguas, talweg y líneas rectas convencionales),
          detallados a continuación:
        </p>

        <table className="info-table limites-table">
          <thead>
            <tr>
              <th>Sector</th>
              <th>Descripción</th>
              <th>Régimen</th>
              <th>Distancia (km)</th>
            </tr>
          </thead>
          <tbody>
            {sectores.map(([sector, desc, regimen, km], i) => (
              <tr key={`${sector}-${i}`}>
                <td>{sector}</td>
                <td>{desc}</td>
                <td>{regimen}</td>
                <td className="num">{km}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
