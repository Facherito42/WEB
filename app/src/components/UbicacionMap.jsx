import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../leafletIconFix'

const IGM_LAT = -34.8595
const IGM_LNG = -56.1548

export default function UbicacionMap() {
  return (
    <MapContainer center={[IGM_LAT, IGM_LNG]} zoom={16} style={{ width: '100%', height: '100%', borderRadius: 6 }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
      <Marker position={[IGM_LAT, IGM_LNG]}>
        <Popup>
          <strong>Instituto Geográfico Militar</strong>
          <br />
          Av. 8 de Octubre 3255, Montevideo
        </Popup>
      </Marker>
    </MapContainer>
  )
}
