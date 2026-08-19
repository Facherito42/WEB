// Single source of truth for news/activity items — shared by the home
// carousel, the "Actividades del IGM" list, the news popup, and each
// individual noticia detail page. Ordered newest first.

const BASE = import.meta.env.BASE_URL

const GENERIC_TEXT =
  'Información detallada sobre esta actividad será publicada próximamente por el Instituto Geográfico Militar.'

export const noticias = [
  {
    slug: 'reconocimiento-mediciones-gnss-abra-castellanos',
    title: 'Reconocimiento y Mediciones GNSS en Abra de Castellanos',
    fecha: '18 de Agosto 2026',
    dateSort: '2026-08-18',
    images: [
      `${BASE}img/noticias/AbraCastellanos/AbraCastellanos.jpg`,
      `${BASE}img/noticias/AbraCastellanos/AbraCastellanos1.jpg`,
    ],
    text: [
      'En la jornada de ayer se realizaron trabajos de reconocimiento y mediciones GNSS en el Campo Militar N.º 6, Abra de Castellanos, como parte de las actividades conjuntas desarrolladas por el Instituto Geográfico Militar, Latingeo y FING.',
      'Los datos obtenidos permitirán generar una base de información para próximas etapas de trabajo y futuras evaluaciones de calidad posicional.',
      'Continuamos avanzando en el desarrollo de actividades técnicas en el territorio nacional.',
    ],
  },
  {
    slug: 'jornadas-ipgh-2026',
    title: 'Jornadas de IPGH 2026',
    fecha: '17 de Julio 2026',
    dateSort: '2026-07-17',
    images: [`${BASE}img/noticias/jornadas-ipgh-2026.jpg`],
    text: [ 
      'La Sección Nacional del Instituto Panamericano de Geografía e Historia (IPGH) se complace en comunicarles que los días 24 y 25 de setiembre del presente año se desarrollarán las “Jornadas Anuales 2026”, en la Sala de Actos “Ministro Reinaldo Gargano” del Ministerio de Relaciones Exteriores (Colonia 1206).',
      'En esta oportunidad se llevarán a cabo la “X Jornada de Cartografía”, la “IX Jornada de Geofísica”, la “VI Jornada de Geografía” y la “IV Jornada de Historia”.',
      'Estas jornadas, constituyen un espacio de encuentro e intercambio académico destinado a la difusión y discusión de proyectos, investigaciones y experiencias desarrolladas por investigadores, profesionales, docentes, estudiantes e instituciones nacionales e internacionales.',
      'El evento tiene como propósito promover la generación, actualización y transferencia de conocimientos en las áreas de geografía, cartografía, geofísica e historia, favoreciendo el diálogo interdisciplinario y la cooperación entre actores vinculados a estas disciplinas. De esta manera, se busca contribuir al fortalecimiento de la investigación científica y a su proyección como herramienta para el desarrollo y bienestar de la sociedad.'],
  },
  {
    slug: 'curso-basico-geomatica-2026',
    title: 'Curso Básico de Geomática: Inscripciones Abiertas',
    fecha: '12 de Mayo 2026',
    dateSort: '2026-05-12',
    images: [
      `${BASE}img/noticias/CursoBasicoGeomatica.jpg`],
    text: [
      '¡Ya están abiertas las inscripciones para el Curso Básico de Geomática!',
      'Del 1º al 22 de junio de 2026, en el Instituto Geográfico Militar, se llevará adelante esta capacitación orientada al uso de Sistemas de Información Geográfica y Cartografía Digital, brindando herramientas y conocimientos aplicados al área geoespacial.',
      'La actividad está dirigida a personal de las Fuerzas Armadas, Ministerio del Interior, IDEuy y países extranjeros.',
      'Una excelente oportunidad para seguir aprendiendo y fortaleciendo capacidades!'
    ],
  },
  {
    slug: 'trabajos-campo-lavalleja-2026',
    title: 'Trabajos de Campo en el Departamento de Lavalleja',
    fecha: '23 de Marzo 2026',
    dateSort: '2026-03-23',
    images: [
      `${BASE}img/noticias/trabajos-campo-lavalleja.jpg`,
      `${BASE}img/noticias/Piraraja/piraraja2.jpeg`,
      `${BASE}img/noticias/Piraraja/piraraja3.jpeg`,
      `${BASE}img/noticias/Piraraja/piraraja4.jpeg`
    ],
    text: [
      'La División Geodesia y Topografía del Instituto Geográfico Militar (IGM) se encuentra realizando trabajos técnicos en la zona de Pirarajá, consolidando una nueva etapa de relevamientos de alta precisión en el departamento de Lavalleja.',
      'Estas actividades forman parte de los permanentes esfuerzos del Instituto por la actualización del Marco de Referencia Geodésico Nacional, asegurando la precisión de los datos espaciales acorde a estándares regionales e internacionales.',
      'La actual campaña consiste en la ejecución de relevamientos que integran observaciones GNSS de alta precisión, y gravimetría integrada a nuestra Red Nacional de Gravimetría (REDGRAV).',
      'Este tipo de levantamientos contribuye directamente al perfeccionamiento tanto de las capacidades técnicas, como de la fiabilidad de datos y modelos generados por el IGM.'
    ],
  },
  {
    slug: 'adquisicion-nuevos-receptores-gnss-regna-rou',
    title: 'Adquisición de nuevos Receptores GNSS para la REGNA-ROU',
    fecha: '16 de Diciembre 2025',
    dateSort: '2025-12-16',
    images: [
      `${BASE}img/noticias/adquisicion-nuevos-gnss.jpeg`,
      `${BASE}img/noticias/AdquisicionesReceptoresSino/Receptores1.jpeg`,
      `${BASE}img/noticias/AdquisicionesReceptoresSino/Receptores2.jpeg`,
      `${BASE}img/noticias/AdquisicionesReceptoresSino/Receptores3.mp4`,
    ],
    text: [
      'El Instituto Geográfico Militar (IGM) ha adquirido recientemente nuevos receptores GNSS de alta precisión, destinados a fortalecer la Red Geodésica Nacional Activa del Uruguay (REGNA-ROU).',
      'En el día de hoy recibimos en nuestra sede de manos de personal de la empresa KPN METIOR, las últimas estaciones de referencia de operación continua (CORS, por sus siglas en inglés). La entrega corresponde a la adquisición de 8 (ocho) CORS multiconstelación, marca COMNAV, modelo SinoGNSS M300 Pro, con antena SinoGNSS AT600.',
      'El Instituto Geográfico Militar continúa de esta manera en sus esfuerzos por mejorar los servicios brindados a través de la Red Geodésica Nacional Activa de la República Oriental del Uruguay (REGNA-ROU), densificando la misma con equipos de última generación, en el marco de su política de gestión de datos geográficos y de las directrices internacionales, tales como las emanadas del Sistema de Referencia Geodésico para las Américas (SIRGAS) y del Servicio Internacional GNSS (IGS), en beneficio directo de más de un millar de usuarios a nivel nacional e internacional, en diversas áreas (ingeniería, topografía, agricultura inteligente, navegación, seguridad, etc.)'
    ],
  },
  {
    slug: 'relevamiento-geodesico-topografico-pirajara',
    title: 'Relevamiento Geodésico - Topográfico en Pirarajá',
    fecha: '13 de Noviembre 2025',
    dateSort: '2025-11-13',
    images: [`${BASE}img/noticias/relevamiento-piraraja.jpg`],
    text: [GENERIC_TEXT],
  },
  // {
  //   slug: 'jornadas-ipgh-2025',
  //   title: 'Jornadas del IPGH 2025',
  //   fecha: '18 de Setiembre 2025',
  //   dateSort: '2025-09-18',
  //   images: [],
  //   text: [GENERIC_TEXT],
  // },
  {
    slug: 'visita-delegacion-nga',
    title: 'Visita delegación NGA',
    fecha: '18 de Setiembre 2025',
    dateSort: '2025-09-18',
    images: [`${BASE}img/noticias/visita-nga.jpg`],
    text: [GENERIC_TEXT],
  },
  // {
  //   slug: 'workshop-setiembre-2025',
  //   title: 'Workshop 15 y 16 de setiembre de 2025',
  //   fecha: '19 de Agosto 2025',
  //   dateSort: '2025-08-19',
  //   images: [],
  //   text: [GENERIC_TEXT],
  // },
  // {
  //   slug: 'marco-referencia-alturas-sirgas',
  //   title: 'Proyecto Marco de Referencia Internacional de las Alturas - SIRGAS',
  //   fecha: '04 de Junio 2024',
  //   dateSort: '2024-06-04',
  //   images: [],
  //   text: [GENERIC_TEXT],
  // },
  // {
  //   slug: 'convocatoria-pat-2024',
  //   title: 'Convocatoria PAT 2024 - 2025',
  //   fecha: '25 de Abril 2024',
  //   dateSort: '2024-04-25',
  //   images: [],
  //   text: [GENERIC_TEXT],
  // },
  // {
  //   slug: 'campana-antartica-2024',
  //   title: 'Campaña Antártica 2024',
  //   fecha: '08 de Marzo 2024',
  //   dateSort: '2024-03-08',
  //   images: [],
  //   text: [GENERIC_TEXT],
  // },
  // {
  //   slug: 'ajuste-red-gravimetrica-nacional',
  //   title: 'Ajuste de la Red Gravimétrica Nacional del Uruguay',
  //   fecha: '09 de Febrero 2024',
  //   dateSort: '2024-02-09',
  //   images: [],
  //   text: [GENERIC_TEXT],
  // },
]

export function noticiaBySlug(slug) {
  return noticias.find((n) => n.slug === slug)
}
