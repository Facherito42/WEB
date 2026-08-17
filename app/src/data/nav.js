// Single source of truth for site navigation, shared by Header and Footer.
// Previously this list was hand-copied into every static page (and had
// already drifted — e.g. formulario-de-contacto.html was missing "Ubicación").
export const nav = [
  { label: 'Inicio', to: '/' },
  {
    label: 'Institución',
    to: '/institucion',
    children: [
      { label: 'Saludo del Director', to: '/saludo-director-igm' },
      { label: 'Misión y Visión', to: '/mision-y-vision-igm' },
      { label: 'Autoridades', to: '/autoridades' },
      { label: 'Organización', to: '/organizacion-igm' },
      { label: 'Ubicación', to: '/ubicacion-igm' },
      { label: 'Historia', to: '/historia-igm' },
      { label: 'Marco Jurídico', to: '/marco-juridico-igm' },
      { label: 'Contáctenos', to: '/formulario-de-contacto' },
    ],
  },
  {
    label: 'Información Territorial',
    to: '/informacion-territorial',
    children: [
      { label: 'Límites con Brasil', to: '/limites-brasil-igm' },
      { label: 'Límites con Argentina', to: '/limites-argentina-igm' },
      { label: 'Puntos Extremos', to: '/puntos-extremos-igm' },
      { label: 'Situación Geográfica', to: '/situacion-geografica-igm' },
      { label: 'División Política', to: '/division-politica-igm' },
    ],
  },
  { label: 'Productos', to: '/productos-igm' },
  {
    label: 'Servicios',
    to: '/servicios',
    children: [
      { label: 'Geoportal', href: 'https://igm.gub.uy/geoportal/' },
      { label: 'Visaciones', to: '/visaciones-igm' },
      { label: 'Capacitación', to: '/capacitacion-igm' },
      { label: 'Mapas Antiguos', to: '/mapas-antiguos-igm' },
      { label: 'Servicios REGNA-ROU', to: '/levantamiento-geodesico' },
      { label: 'Descarga de archivos RINEX', to: '/descarga-rinex' },
    ],
  },
  { label: 'Publicaciones', to: '/publicaciones-igm' },
  {
    label: 'Actualidad IGM',
    to: '/actualidad',
    children: [{ label: 'Noticias', to: '/noticias-actividades-igm2' }],
  },
  { label: 'Enlaces', to: '/enlaces-igm' },
]

export const footerColumns = [
  {
    heading: 'Institución',
    links: nav.find((i) => i.label === 'Institución').children,
  },
  {
    heading: 'Servicios',
    links: nav.find((i) => i.label === 'Servicios').children.filter((c) => c.to),
  },
  {
    heading: 'Informaciones',
    text: [
      'Avenida 8 de Octubre 3255, Montevideo',
      'Central: (+598) 2487 1810',
      'comercial@igm.gub.uy',
      'Horario Comercial: Lun. a Vie. 8:00 a 13:00 hrs.',
    ],
  },
  {
    heading: 'Redes Sociales',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/IGMUruguay/' },
      { label: 'Twitter (X)', href: 'https://twitter.com/igmuruguay' },
    ],
  },
]
