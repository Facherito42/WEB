// Enlaces de interés — instituciones nacionales e internacionales
// relacionadas con la actividad del IGM. URLs verificadas manualmente.
const BASE = import.meta.env.BASE_URL

export const enlacesCategorias = [
  {
    title: 'Instituciones nacionales',
    items: [
      {
        label: 'Ejército Nacional',
        href: 'https://www.ejercito.mil.uy/',
        image: `${BASE}img/links/ejercito.jpg`,
      },
      {
        label: 'INUMET — Instituto Uruguayo de Meteorología',
        href: 'https://www.inumet.gub.uy/',
        image: `${BASE}img/links/inumet.jpg`,
      },
      {
        label: 'IDE Uruguay — Infraestructura de Datos Espaciales',
        href: 'https://www.gub.uy/infraestructura-datos-espaciales/',
        image: `${BASE}img/links/ide.png`,
      },
      {
        label: 'gub.uy',
        href: 'https://www.gub.uy/',
        image: `${BASE}img/links/gub.jpg`,
      },
    ],
  },
  {
    title: 'Organismos regionales e internacionales',
    items: [
      {
        label: 'IPGH — Instituto Panamericano de Geografía e Historia',
        href: 'https://www.ipgh.org/mx/',
        image: `${BASE}img/links/ipgh.jpg`,
      },
      {
        label: 'SIRGAS — Sistema de Referencia Geocéntrico para las Américas',
        href: 'https://www.sirgas.org',
        image: `${BASE}img/links/sirgas.png`,
      },
    ],
  },
]
