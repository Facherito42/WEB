import L from 'leaflet'

// react-leaflet's default marker icon URLs are relative paths that break
// under Vite's bundler. Serve the images from our own /public/leaflet/ folder
// instead of a third-party CDN (one less external origin / supply-chain risk,
// and lets the CSP stay strict).
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: `${import.meta.env.BASE_URL}leaflet/marker-icon-2x.png`,
  iconUrl: `${import.meta.env.BASE_URL}leaflet/marker-icon.png`,
  shadowUrl: `${import.meta.env.BASE_URL}leaflet/marker-shadow.png`,
})
