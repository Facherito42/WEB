import { Link } from 'react-router-dom'
import { footerColumns } from '../data/nav'

function FooterLink({ item }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    )
  }
  return <Link to={item.to}>{item.label}</Link>
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.text
                ? col.text.map((line) => <li key={line}>{line}</li>)
                : col.links.map((item) => (
                    <li key={item.label}>
                      <FooterLink item={item} />
                    </li>
                  ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 Instituto Geográfico Militar del Uruguay - Todos los derechos reservados</span>
      </div>
    </footer>
  )
}
