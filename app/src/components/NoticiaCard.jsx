import { Link } from 'react-router-dom'

export default function NoticiaCard({ image, fecha, title, to }) {
  return (
    <div className="noticia-card">
      <Link to={to}>
        <img src={image} alt="" />
        <div className="info">
          <div className="fecha">{fecha}</div>
          <p>{title}</p>
        </div>
      </Link>
    </div>
  )
}
