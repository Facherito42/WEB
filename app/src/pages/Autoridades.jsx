import PageBanner from '../components/PageBanner'

const groups = [
  {
    title: 'Dirección',
    people: [
      { img: '/img/Cnel.-Gustavo-Caubarrere.jpg', name: 'Gustavo Caubarrere', rank: 'Coronel', role: 'Director del Instituto Geográfico Militar.', cv: 'https://igm.gub.uy/wp-content/uploads/2025/05/CV_Gustavo-Caubarrere-2025.pdf' },
      { img: '/img/Cnel.-Edison-viera.jpeg', name: 'Edison Viera', rank: 'Coronel', role: 'Subdirector del Instituto Geográfico Militar.', cv: 'https://igm.gub.uy/wp-content/uploads/2026/02/CV-Cnel-Viera.pdf' },
    ],
  },
  {
    title: 'División Geodesia y Topografía',
    people: [
      { img: '/img/Tte.Cnel.-Bruno-Canosa.jpeg', name: 'Bruno Canosa', rank: 'Tte. Cnel.', role: 'Jefe de División Geodesia y Topografía.', cv: 'https://igm.gub.uy/wp-content/uploads/2026/03/CURRICULUM-VITAE-IGM-19-03-2026.pdf' },
      { img: '/img/Tte.1°.-Anibal-Pintos.jpg', name: 'Anibal Pintos', rank: 'Cap. (Apy. SyC)', role: 'Integrante de la División Geodesia y Topografía.', cv: 'https://igm.gub.uy/wp-content/uploads/2025/04/curriculum-Tte-Pintos.pdf' },
    ],
  },
  {
    title: 'División Secretaría',
    people: [{ img: '/img/Tte.Cnel.-Adrian-Martinez.jpg', name: 'Adrian Martinez', rank: 'Tte. Cnel.', role: 'Jefe de División Secretaría.', cv: 'https://igm.gub.uy/wp-content/uploads/2025/04/TENIENTE-CORONEL-ADRIAN-MARTIN-MARTINEZ-TORRADO.pdf' }],
  },
  {
    title: 'División Cartografía y SIG',
    people: [{ img: '/img/Tte.Cnel.-Federico-Grosso.jpg', name: 'Federico Grosso', rank: 'Tte. Cnel.', role: 'Jefe de División Cartografía y SIG.', cv: 'https://igm.gub.uy/wp-content/uploads/2024/09/CV-F-Grosso-2.pdf' }],
  },
  {
    title: 'División Fotogrametría',
    people: [
      { img: '/img/Tte.Cnel.-Bruno-Canosa.jpeg', name: 'Bruno Canosa', rank: 'Tte. Cnel.', role: 'Jefe de División Fotogrametría.', cv: 'https://igm.gub.uy/wp-content/uploads/2026/03/CURRICULUM-VITAE-IGM-19-03-2026.pdf' },
      { img: '/img/Tte.1°.-Fernando-Pereira.jpg', name: 'Fernando Pereira', rank: 'Tte. 1° (Apy. SyC)', role: 'Integrante de la División Fotogrametría.', cv: '#' },
    ],
  },
  {
    title: 'División Administración y Logística',
    people: [
      { img: '/img/Tte.Cnel.-Pablo-Camera.jpeg', name: 'Pablo Camera', rank: 'Tte. Cnel.', role: 'Jefe de División Administración y Logística.', cv: 'https://igm.gub.uy/wp-content/uploads/2026/06/Curriculum_Tte._Cnel._Camera_2026.pdf' },
      { img: '/img/Cap.-Isabel-Arocena.jpg', name: 'Isabel Arocena', rank: 'Capitán', role: 'Comandante de Compañía.', cv: 'https://igm.gub.uy/wp-content/uploads/2024/04/CV-Capitan-Isabel-Arocena.pdf' },
      { img: '/img/Tte.1°-Carolina-Perna.jpg', name: 'Carolina Perna', rank: 'Tte. 1º (Apy – Arq)', role: 'Jefe de Sección Adquisiciones.', cv: 'https://igm.gub.uy/wp-content/uploads/2022/06/CV-C-Perna.pdf' },
    ],
  },
]

export default function Autoridades() {
  return (
    <>
      <PageBanner title="Autoridades" crumbs={['Institución', 'Autoridades']} />
      <section className="content-page" style={{ maxWidth: 1100 }}>
        {groups.map((g) => (
          <div key={g.title}>
            <h2>{g.title}</h2>
            <div className="authorities-row">
              {g.people.map((p) => (
                <div className="authority-card" key={p.name}>
                  <img src={p.img} alt={p.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <span className="badge">{p.rank}</span>
                    <p className="card-text">{p.role}</p>
                    <a href={p.cv} className="btn-outline btn" style={{ textAlign: 'center' }}>
                      Ver Curriculum
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
