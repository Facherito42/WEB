import PageBanner from '../components/PageBanner'

export default function SaludoDirector() {
  return (
    <>
      <PageBanner title="Saludo del Director" crumbs={['Quiénes Somos', 'Saludo del Director']} />
      <section className="content-page">
        <h2>Palabras del Director</h2>
        <p>
          Bienvenidos al sitio institucional del Instituto Geográfico Militar del Uruguay. Desde nuestra fundación, hemos asumido con orgullo
          la responsabilidad de proveer la cartografía y la información geoespacial oficial del país, al servicio del Estado, de las Fuerzas
          Armadas y de la comunidad civil.
        </p>
        <p>
          Nuestra labor se sustenta en más de ocho décadas de experiencia geodésica y cartográfica, y en el compromiso permanente de nuestro
          personal con la excelencia técnica, la innovación tecnológica y la vocación de servicio público.
        </p>
        <p>
          Hoy enfrentamos el desafío de modernizar nuestros procesos productivos, incorporando tecnologías satelitales, sensores remotos y
          sistemas de información geográfica de última generación, sin perder de vista la misión que nos dio origen: representar fielmente el
          territorio nacional.
        </p>
        <p>
          Los invito a conocer más sobre nuestra institución, nuestros servicios y productos, y a sumarse a este esfuerzo permanente por poner
          la geografía al servicio del Uruguay.
        </p>
        <div className="notice-box">Cnel. Gustavo Caubarrere — Director del Instituto Geográfico Militar del Uruguay</div>
      </section>
    </>
  )
}
