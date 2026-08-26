import PageBanner from '../components/PageBanner'
import { enlacesCategorias } from '../data/enlaces'

export default function Enlaces() {
  return (
    <>
      <PageBanner title="Enlaces de Interés" crumbs={['Enlaces']} />
      <section className="content-page">
        <p>Instituciones y organismos vinculados a la actividad del Instituto Geográfico Militar.</p>

        {enlacesCategorias.map((cat) => (
          <div key={cat.title} style={{ marginTop: 32 }}>
            <h2>{cat.title}</h2>
            <div className="links-grid">
              {cat.items.map((item) => (
                <a className="item" key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  <img src={item.image} alt="" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
