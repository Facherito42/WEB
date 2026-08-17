import { Link } from 'react-router-dom'

export default function ServicioCard({ icon, title, description, to }) {
  return (
    <div className="bg-white/[0.06] rounded-md p-5">
      <img src={icon} alt="" className="h-[60px] mb-3" />
      <h3 className="m-0 mb-2 text-white text-[1.05rem]">{title}</h3>
      <p className="text-[0.85rem] text-[#dcdcdc] leading-snug">{description}</p>
      <Link to={to} className="text-dorado-claro font-bold text-[0.82rem] inline-block mt-2.5">
        Ver más »
      </Link>
    </div>
  )
}
