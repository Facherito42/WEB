import PageBanner from '../components/PageBanner'

export default function LimitesArgentina() {
  return (
    <>
      <PageBanner title="Límites con Argentina" crumbs={['Información Territorial', 'Límites con Argentina']} />
      <section className="content-page">
        <h2>En el Río Uruguay</h2>
        <p>
          <strong>Sector 1:</strong> Línea media desde la línea que pasa por las proximidades de la punta suroeste de la Isla Brasileña,
          hasta la zona del Ayuí (Represa de Salto Grande).
        </p>
        <p>
          <strong>Sector 2:</strong> Canal principal de navegación desde el Ayuí (Represa de Salto Grande) hasta el punto de bifurcación
          de los canales La Filomena y del Medio.
        </p>
        <p>
          <strong>Sector 3:</strong> Régimen diferenciado: para las aguas, canal principal de navegación; para las islas, canal del
          Medio.
        </p>
        <p>
          <strong>Sector 4:</strong> Canal principal de navegación desde el punto en que confluyen los canales La Filomena y del Medio,
          hasta el paralelo de Punta Gorda.
        </p>

        <h2>En el Río de la Plata</h2>
        <p>
          Se rige por el Tratado del Río de la Plata y su Frente Marítimo. El límite comienza en el paralelo de Punta Gorda y se extiende
          hasta la línea imaginaria que une Punta del Este (Uruguay) con Punta Rasa del Cabo San Antonio (Argentina).
        </p>
        <p>
          Se establece una franja de jurisdicción exclusiva adyacente a las costas, de siete millas marinas de ancho entre el límite
          exterior del río y una línea que une Colonia con Punta Lara, reducida a dos millas marinas desde esa línea hasta Punta Gorda.
        </p>
        <p>
          Las islas pertenecen al país en cuyo lado se encuentran respecto de la línea de Lecho y Subsuelo, con excepción de la Isla
          Martín García, que pertenece a la República Argentina.
        </p>

        <h2>En el Océano Atlántico</h2>
        <p>Regulado por el Tratado del Río de la Plata y su Frente Marítimo (1973) y la Ley Nº 17.033 (1998).</p>
        <p>
          La soberanía de la República se extiende al mar territorial, incluidos su lecho, subsuelo y espacio aéreo correspondientes, con
          un ancho de doce millas marinas (22,224 km).
        </p>
        <p>
          El límite lateral marítimo se determina mediante la línea de equidistancia de costas, según el método de costas adyacentes, a
          partir del punto medio entre Punta del Este y Punta Rasa.
        </p>
        <p>
          <strong>Zona Común de Pesca:</strong> establecida más allá de las doce millas marinas para embarcaciones de ambos países,
          determinada por dos arcos de circunferencia de doscientas millas marinas de radio.
        </p>
        <p>
          <strong>Zona Económica Exclusiva:</strong> área marítima situada más allá del mar territorial y adyacente a este, que se
          extiende hasta las 200 millas marinas contadas desde las líneas de base.
        </p>
        <p>Existe libertad de navegación y sobrevuelo en los mares más allá de la faja de 12 millas náuticas.</p>
      </section>
    </>
  )
}
