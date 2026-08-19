import { Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PageStub from './pages/PageStub'
import Historia from './pages/Historia'
import MisionYVision from './pages/MisionYVision'
import SaludoDirector from './pages/SaludoDirector'
import MarcoJuridico from './pages/MarcoJuridico'
import Capacitacion from './pages/Capacitacion'
import MapasAntiguos from './pages/MapasAntiguos'
import Productos from './pages/Productos'
import Visaciones from './pages/Visaciones'
import Autoridades from './pages/Autoridades'
import Organizacion from './pages/Organizacion'
import NoticiasActividades from './pages/NoticiasActividades'
import FormularioContacto from './pages/FormularioContacto'
import Ubicacion from './pages/Ubicacion'
import LevantamientoGeodesico from './pages/LevantamientoGeodesico'
import DescargaRinex from './pages/DescargaRinex'
import NoticiaDetalle from './pages/NoticiaDetalle'
import { nav } from './data/nav'
import { noticias } from './data/noticias'

// Real pages ported from the static site. Paths without a `.jsx` above
// (limites-brasil-igm, publicaciones-igm, geoportal-igm, enlaces-igm, etc.)
// didn't exist as files in the original static site either — they're
// dead links there too, so they fall back to the "not migrated" stub.
const realPages = {
  '/historia-igm': <Historia />,
  '/mision-y-vision-igm': <MisionYVision />,
  '/saludo-director-igm': <SaludoDirector />,
  '/marco-juridico-igm': <MarcoJuridico />,
  '/capacitacion-igm': <Capacitacion />,
  '/mapas-antiguos-igm': <MapasAntiguos />,
  '/productos-igm': <Productos />,
  '/visaciones-igm': <Visaciones />,
  '/autoridades': <Autoridades />,
  '/organizacion-igm': <Organizacion />,
  '/noticias-actividades-igm2': <NoticiasActividades />,
  '/formulario-de-contacto': <FormularioContacto />,
  '/ubicacion-igm': <Ubicacion />,
  '/levantamiento-geodesico': <LevantamientoGeodesico />,
  '/descarga-rinex': <DescargaRinex />,
}

function leafDestinations(items) {
  const flat = []
  for (const item of items) {
    if (!item.children && item.to && item.to !== '/') {
      flat.push({ path: item.to, label: item.label })
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.to) flat.push({ path: child.to, label: child.label })
      }
    }
  }
  return flat
}

const dynamicRoutes = leafDestinations(nav).map(({ path, label }) => ({
  path: path.replace(/^\//, ''),
  element: realPages[path] ?? <PageStub title={label} />,
}))

const noticiaRoutes = noticias.map(({ slug }) => ({
  path: `noticias-actividades-igm2/${slug}`,
  element: <NoticiaDetalle slug={slug} />,
}))

export const routes = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      ...dynamicRoutes,
      ...noticiaRoutes,
    ],
  },
]
