import PageBanner from '../components/PageBanner'

const puntos = [
  {
    titulo: 'Norte',
    desc: 'Codo del Cuareim, próximo a la desembocadura del Arroyo Yacaré (Departamento de Artigas), 4 km al NE de Paso León.',
    coords: "Latitud: 30º05'08'' S — Longitud: 57º04'00'' W (Precisión ± 2'').",
  },
  {
    titulo: 'Sur',
    desc: 'Punta de la Salina, en el extremo Sur de la Península de Punta del Este (Departamento de Maldonado).',
    coords: "Latitud: 34º58'27'' S — Longitud: 54º57'08'' W.",
  },
  {
    titulo: 'Este',
    desc: 'Desembocadura del Río Yaguarón en la Laguna Merín (Departamento de Cerro Largo).',
    coords: "Latitud: 32º39'18'' S — Longitud: 53º11'07'' W.",
  },
  {
    titulo: 'Oeste',
    desc: 'Punta del Arenal, en el Río Uruguay, 5 km al norte de la desembocadura del Arroyo de la Agraciada (Departamento de Soriano).',
    coords: "Latitud: 33º41'00'' S — Longitud: 58º26'21'' W.",
  },
]

export default function PuntosExtremos() {
  return (
    <>
      <PageBanner title="Puntos Extremos" crumbs={['Información Territorial', 'Puntos Extremos']} />
      <section className="content-page">
        <p>Los puntos extremos del territorio continental de la República Oriental del Uruguay son los siguientes:</p>

        <img
          className="content-img"
          src={`${import.meta.env.BASE_URL}img/territorial/puntos-extremos.png`}
          alt="Mapa de puntos extremos de Uruguay"
        />

        {puntos.map((p) => (
          <div key={p.titulo}>
            <h2>{p.titulo}</h2>
            <p>
              {p.desc}
              <br />
              {p.coords}
            </p>
          </div>
        ))}
      </section>
    </>
  )
}
