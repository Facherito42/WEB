import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../leafletIconFix'

const regnaStations = [
  { code: 'UYMO', city: 'Montevideo', lat: -34.9011, lng: -56.1645 },
  { code: 'UYPA', city: 'Paysandú', lat: -32.3214, lng: -58.0756 },
  { code: 'UYSA', city: 'Salto', lat: -31.3833, lng: -57.9667 },
  { code: 'UYAR', city: 'Artigas', lat: -30.403, lng: -56.4635 },
  { code: 'UYRV', city: 'Vichadero (Rivera)', lat: -31.7833, lng: -54.6833 },
  { code: 'UYCO', city: 'Colonia del Sacramento', lat: -34.4626, lng: -57.84 },
  { code: 'UYFD', city: 'Florida', lat: -34.0996, lng: -56.2153 },
  { code: 'UYFS', city: 'Trinidad (Flores)', lat: -33.5186, lng: -56.8987 },
  { code: 'UYLA', city: 'Minas (Lavalleja)', lat: -34.3743, lng: -55.2385 },
  { code: 'UYPT', city: 'Paso de los Toros', lat: -32.8167, lng: -56.5167 },
  { code: 'UYSG', city: 'San Gregorio de Polanco', lat: -32.5667, lng: -55.5833 },
  { code: 'UYSJ', city: 'San José de Mayo', lat: -34.3389, lng: -56.7125 },
  { code: 'UYTT', city: 'Treinta y Tres', lat: -33.2333, lng: -54.3833 },
  { code: 'UYDU', city: 'Sarandí del Yí (Durazno)', lat: -33.3333, lng: -55.6333 },
  { code: 'UYTA', city: 'Tacuarembó', lat: -31.7333, lng: -55.9833 },
  { code: 'UYRO', city: 'Rocha', lat: -34.4833, lng: -54.3333 },
]

export default function RegnaMap() {
  return (
    <MapContainer center={[-32.8, -56.0]} zoom={7} style={{ width: '100%', height: '100%', borderRadius: 6 }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={18} />
      {regnaStations.map((s) => (
        <Marker key={s.code} position={[s.lat, s.lng]}>
          <Popup>
            <strong>{s.code}</strong>
            <br />
            {s.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
