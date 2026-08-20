import PageBanner from '../components/PageBanner'

export default function SituacionGeografica() {
  return (
    <>
      <PageBanner title="Situación Geográfica" crumbs={['Información Territorial', 'Situación Geográfica']} />
      <section className="content-page">
        <h2>República Oriental del Uruguay</h2>
        <p>El país toma su nombre de la ubicación de su territorio, situado al oriente del Río Uruguay.</p>

        <h2>Ubicación</h2>
        <p>
          Uruguay está situado en América del Sur, entre los paralelos 30º y 35º de latitud Sur y los meridianos 53º y 58º de longitud
          Oeste, ubicándose en la zona templada del Hemisferio Sur.
        </p>

        <img
          className="content-img"
          src={`${import.meta.env.BASE_URL}img/territorial/situacion-geografica.jpg`}
          alt="Mapa de situación geográfica de Uruguay"
        />

        <h2>Límites</h2>
        <p>
          Limita por el Norte y el Noreste con la República Federativa del Brasil, por el Oeste con la República Argentina a través del
          Río Uruguay, por el Sur con el Río de la Plata y por el Este con el Océano Atlántico.
        </p>

        <h2>Posición estratégica</h2>
        <p>
          Uruguay tiene una privilegiada posición estratégica en el Cono Sur del continente americano, lo que favorece sustancialmente su
          integración regional.
        </p>

        <h2>Relieve</h2>
        <p>
          El territorio se caracteriza por ser suavemente ondulado, sin presentar altas montañas ni dilatadas llanuras, dominando la
          "penillanura", lo que permite su total recorrido sin ofrecer mayores obstáculos. Cerros y serranías se destacan y embellecen el
          paisaje, siendo el Cerro Catedral, con 513,6 metros de altura, el punto más alto del territorio nacional, seguido por el Cerro
          de las Ánimas con 501 metros.
        </p>
        <p>
          La extensa red hidrográfica del país se organiza en cuatro grandes cuencas: la del Río de la Plata, la del Río Uruguay, la de la
          Laguna Merín y la del Río Negro.
        </p>
      </section>
    </>
  )
}
