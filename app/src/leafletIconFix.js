import L from 'leaflet'

// react-leaflet's default marker icon URLs are relative paths that break
// under Vite's bundler. Point them at the same unpkg CDN the original
// static site's <script> tag loaded Leaflet from, so the marker pin looks
// identical to before.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})
