import { useEffect, useState } from 'react'

// Server render (vite-react-ssg) always sees `mounted === false`, since
// useEffect never runs on the server — so children are only ever imported
// and rendered in the browser. Needed for Leaflet, which touches `window`
// at module load time and crashes Node's prerender otherwise.
export default function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? children : fallback
}
