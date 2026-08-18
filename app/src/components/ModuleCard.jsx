import { Link } from "react-router-dom";

export default function ModuleCard({
  icon,
  iconOnly = true,
  title,
  description,
  to,
  href,
}) {
  const cta = href ? (
    <a href={href} className="btn-entrar">
      Entrar
    </a>
  ) : (
    <Link to={to} className="btn-entrar">
      Entrar
    </Link>
  );

  return (
    <div className="module-card">
      <div className="thumb">
        <img src={icon} alt={title} className={iconOnly ? "icon" : undefined} />
      </div>
      <div className="body">
        <h3>{title}</h3>
        <p>{description}</p>
        {cta}
      </div>
    </div>
  );
}
