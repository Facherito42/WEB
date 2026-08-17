export default function InfoTable({ headers, rows, style }) {
  return (
    <table className="info-table" style={style}>
      <tbody>
        {headers && (
          <tr>
            {headers.length === 1 ? <th colSpan={2}>{headers[0]}</th> : headers.map((h) => <th key={h}>{h}</th>)}
          </tr>
        )}
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
