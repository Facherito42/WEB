import { Link } from 'react-router-dom'
import { footerColumns } from '../data/nav'

function FooterLink({ item }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-dorado-claro">
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.to} className="hover:text-dorado-claro">
      {item.label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-verde-igm-osc text-[#cfd6da] px-5 pt-10 pb-2.5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7.5 border-b border-white/10 pb-7.5">
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h4 className="text-white uppercase text-[0.85rem] tracking-wide mb-3.5">{col.heading}</h4>
            <ul>
              {col.text
                ? col.text.map((line) => (
                    <li key={line} className="text-white text-[0.85rem] mb-2">
                      {line}
                    </li>
                  ))
                : col.links.map((item) => (
                    <li key={item.label} className="text-white text-[0.85rem] mb-2">
                      <FooterLink item={item} />
                    </li>
                  ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-[1200px] mx-auto pt-3.5 text-[0.78rem] text-[#a9bac1] flex justify-between flex-wrap gap-2.5">
        <span>© 2026 Instituto Geográfico Militar del Uruguay - Todos los derechos reservados</span>
      </div>
    </footer>
  )
}
