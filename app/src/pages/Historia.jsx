import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const hitos = [
  { year: '1913', text: 'La Ley Nº 4.344, del 30 de mayo, crea la sección Servicio Geográfico Militar dentro del Estado Mayor, origen institucional de lo que hoy es el IGM.' },
  { year: '1928', text: 'La Ley Nº 8.241 declara de utilidad pública la permanencia de las señales geodésicas y topográficas en todo el territorio, y establece sanciones por su deterioro.' },
  { year: '1941', text: 'La Ley Nº 10.050 (artículo 142) consolida las competencias del Servicio Geográfico: la Carta Topográfica del país, la Carta Provisoria y la Carta al Millonésimo, los trabajos de geodesia y los estudios sobre fronteras terrestres y límites con los países vecinos.' },
  { year: '1984', text: 'La Ley Nº 15.688 (artículo 45) amplía la misión: actualización y distribución del material cartográfico, control de publicaciones cartográficas de organismos públicos y privados, ampliación de la red geodésica nacional, y participación en comisiones de límites internacionales.' },
  { year: '1990', text: 'La Ley Nº 16.170 (artículo 98) crea la tasa de asesoramiento técnico y visación de documentos cartográficos, y establece que toda publicación cartográfica debe ser visada por el Servicio.' },
  { year: '2002', text: 'La Ley Nº 17.556 (artículo 96) suma a la misión establecer, mantener y operar un Sistema de Información Geográfica (SIG) para apoyar la gestión y la toma de decisiones del Estado.' },
  { year: 'Actualidad', text: 'El IGM opera hoy la Red Geodésica Nacional Activa (REGNA-ROU), integrada a SIRGAS, y mantiene un Geoportal con cobertura vectorial nacional, sosteniendo la misma misión de origen: representar fielmente el territorio uruguayo.' },
]

export default function Historia() {
  return (
    <>
      <PageBanner title="Historia" crumbs={['Institución', 'Historia']} />
      <section className="content-page">
        <p>Más de un siglo de trabajo geodésico y cartográfico respalda al Instituto Geográfico Militar del Uruguay. Este es un repaso de los hitos legales que fueron dando forma a su misión, siguiendo el marco jurídico vigente.</p>

        <div className="timeline">
          {hitos.map((h) => (
            <div className="timeline-item" key={h.year}>
              <div className="timeline-year">{h.year}</div>
              <p>{h.text}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 30 }}>
          Para el detalle completo de cada norma, consultá el <Link to="/marco-juridico-igm">Marco Jurídico</Link>.
        </p>
      </section>
    </>
  )
}
