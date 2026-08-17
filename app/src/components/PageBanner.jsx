import { Link } from 'react-router-dom'

export default function PageBanner({ title, crumbs }) {
  return (
    <div className="page-banner">
      <div className="inner">
        <div className="eyebrow">Instituto Geográfico Militar</div>
        <h1>{title}</h1>
        <div className="breadcrumb">
          <Link to="/">Inicio</Link>
          {crumbs.map((c) => (
            <span key={c}> / {c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
