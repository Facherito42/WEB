// Documentos técnicos migrados desde igm.gub.uy/documentos/ (WP Download
// Manager en el sitio original). Los archivos livianos viven en
// app/public/docs/; el catálogo de objetos geográficos (265 MB) todavía no
// tiene un lugar de hosting definitivo por su tamaño.
const BASE = import.meta.env.BASE_URL

export const publicacionCategorias = [
  {
    title: 'Sistemas de referencia y proyecciones cartográficas',
    items: [
      {
        title: 'Recomendación de la IDEuy sobre Sistemas de Referencias y Proyecciones a utilizar',
        file: `${BASE}docs/recomendacion-ideuy-sistemas-referencia.pdf`,
        size: '188 KB',
        date: '05/08/2013',
      },
      {
        title: 'SIRGAS Uruguayo — Trabajando con NTRIP',
        file: `${BASE}docs/sirgas-uy.pdf`,
        size: '342 KB',
        date: null,
      },
      {
        title: 'Nuevo marco de referencia',
        file: `${BASE}docs/nuevo-marco-de-referencia.pdf`,
        size: '1.1 MB',
        date: '20/07/2006',
      },
    ],
  },
  {
    title: 'Redes geodésicas',
    items: [
      {
        title: 'Red de Nivelación del Uruguay',
        file: `${BASE}docs/nivelacion.pdf`,
        size: '232 KB',
        date: '29/07/2021',
      },
      {
        title: 'Ajuste de la Red Gravimétrica Nacional',
        file: `${BASE}docs/ajuste-red-gravimetrica.pdf`,
        size: '230 KB',
        date: null,
      },
      {
        title: 'REGNA-ROU — Red Geodésica Nacional Activa',
        file: `${BASE}docs/regna-rou.pdf`,
        size: '371 KB',
        date: '17/05/2013',
      },
    ],
  },
  {
    title: 'Geoportales y datos espaciales',
    items: [
      {
        title: 'Diseño efectivo de Geoportales',
        file: `${BASE}docs/diseno-efectivo-geoportales.pps`,
        size: '36.9 MB',
        date: null,
      },
      {
        title: 'Infraestructura de Datos Espaciales del Uruguay',
        file: `${BASE}docs/datos-espaciales-uruguay.pdf`,
        size: '469 KB',
        date: null,
      },
    ],
  },
  {
    title: 'Metadatos y catálogos geográficos',
    items: [
      {
        title: 'Estudio de un perfil de metadatos',
        file: `${BASE}docs/estudio-perfil-metadatos.pdf`,
        size: '909 KB',
        date: null,
      },
      {
        title: 'Catálogo de objetos geográficos v1',
        file: null,
        size: '265 MB',
        date: null,
        note: 'Archivo de gran tamaño, disponible a pedido. Contactar a comercial@igm.gub.uy.',
      },
    ],
  },
  {
    title: 'Calidad y precisión cartográfica',
    items: [
      {
        title: 'Cálculo del modelo geoidal 2023',
        file: `${BASE}docs/calculo-modelo-geoidal.pdf`,
        size: '2.2 MB',
        date: '21/06/2024',
      },
      {
        title: 'Cálculo del modelo geoidal 2023 (English)',
        file: `${BASE}docs/calculo-modelo-geoidal-2023-en.pdf`,
        size: '2.3 MB',
        date: '21/06/2024',
      },
      {
        title: 'Cálculo NSSDA sobre imagen de Google Earth',
        file: `${BASE}docs/calculo-nssda.pdf`,
        size: '16 KB',
        date: '18/12/2009',
      },
      {
        title: 'Aplicación de mejoras geométricas sistemáticas a la cartografía del IGM',
        file: `${BASE}docs/mejoras-geometricas-cartografia.pdf`,
        size: '843 KB',
        date: '07/03/2013',
      },
      {
        title: 'Estrategia permanente de actualización futura de la cartografía 1:25.000',
        file: `${BASE}docs/estrategia-actualizacion-cartografia.pps`,
        size: '4.5 MB',
        date: null,
      },
    ],
  },
]
