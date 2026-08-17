import { Link } from 'react-router-dom'

export default function NoticiaCard({ image, fecha, title, to }) {
  return (
    <div className="border border-[#eee] rounded-md overflow-hidden">
      <Link to={to}>
        <img src={image} alt="" className="h-[130px] w-full object-cover" />
        <div className="p-3">
          <div className="text-[0.72rem] text-dorado uppercase font-bold">{fecha}</div>
          <p className="text-[0.82rem] leading-snug text-[#333] mt-1.5">{title}</p>
        </div>
      </Link>
    </div>
  )
}
