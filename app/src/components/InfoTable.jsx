export default function InfoTable({ caption, rows }) {
  return (
    <table className="w-full border-collapse mb-7.5 text-[0.85rem]">
      {caption && (
        <thead>
          <tr>
            <th colSpan={2} className="border border-[#ddd] p-2.5 text-left align-top bg-verde-igm text-white">
              {caption}
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td className="border border-[#ddd] p-2.5 text-left align-top">{label}</td>
            <td className="border border-[#ddd] p-2.5 text-left align-top">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
