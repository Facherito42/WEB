import { Link } from 'react-router-dom'

export default function ModuleCard({ icon, iconOnly = true, title, description, to, href }) {
  const cta = href ? (
    <a href={href} className="mt-3 self-start bg-dorado hover:bg-verde-igm text-[#1c1c1c] hover:text-white px-[18px] py-2.5 rounded-[3px] text-[0.8rem] font-bold uppercase min-h-11 inline-flex items-center">
      Entrar
    </a>
  ) : (
    <Link to={to} className="mt-3 self-start bg-dorado hover:bg-verde-igm text-[#1c1c1c] hover:text-white px-[18px] py-2.5 rounded-[3px] text-[0.8rem] font-bold uppercase min-h-11 inline-flex items-center">
      Entrar
    </Link>
  )

  return (
    <div className="border border-[#e4e4e0] rounded-md overflow-hidden bg-white shadow-[0_2px_6px_rgba(0,0,0,0.05)] flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)] motion-reduce:hover:translate-y-0">
      <div className="h-[150px] bg-gris-claro flex items-center justify-center overflow-hidden">
        <img src={icon} alt={title} className={iconOnly ? 'h-[70px] w-auto object-contain' : 'h-full w-full object-cover'} />
      </div>
      <div className="p-4.5 flex-1 flex flex-col">
        <h3 className="text-verde-igm text-[1.05rem] mt-0 mb-2">{title}</h3>
        <p className="text-[0.85rem] text-[#555] flex-1 leading-snug">{description}</p>
        {cta}
      </div>
    </div>
  )
}
