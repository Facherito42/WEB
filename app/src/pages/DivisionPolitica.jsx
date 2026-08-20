import PageBanner from '../components/PageBanner'

const departamentos = [
  'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado',
  'Montevideo', 'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto', 'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres',
]

export default function DivisionPolitica() {
  return (
    <>
      <PageBanner title="División Política" crumbs={['Información Territorial', 'División Política']} />
      <section className="content-page">
        <h2>División Política de la República Oriental del Uruguay</h2>
        <p>
          El territorio nacional se encuentra dividido en 19 departamentos, cada uno administrado por un gobierno departamental. A
          continuación se presenta el mapa oficial de la división política del país.
        </p>

        <img
          className="content-img"
          src={`${import.meta.env.BASE_URL}img/territorial/division-politica.png`}
          alt="Mapa de división política de Uruguay"
        />

        <h2>Departamentos</h2>
        <ul className="catalogo-list">
          {departamentos.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>
    </>
  )
}
