import { Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PageStub from './pages/PageStub'
import { nav } from './data/nav'

// Generate a placeholder route for every real (non-dropdown-trigger) nav
// destination that hasn't been ported yet, so Phase A nav is fully
// clickable/keyboard-testable without 404s. Replaced page-by-page in
// later phases.
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

const stubRoutes = leafDestinations(nav).map(({ path, label }) => ({
  path: path.replace(/^\//, ''),
  element: <PageStub title={label} />,
}))

export const routes = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [{ index: true, element: <Home /> }, ...stubRoutes],
  },
]
