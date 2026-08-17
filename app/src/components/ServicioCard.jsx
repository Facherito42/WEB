import { Link } from 'react-router-dom'

export default function ServicioCard({ icon, title, description, to }) {
  return (
    <div className="servicio-card">
      <img src={icon} alt={title} />
      <h3 style={{ margin: '0 0 8px' }}>{title}</h3>
      <p>{description}</p>
      <Link to={to} className="ver-mas">
        Ver más »
      </Link>
    </div>
  )
}
