import PageBanner from '../components/PageBanner'

// Placeholder for pages that don't have real content yet — matches pages
// that were already dead links on the original static site (e.g.
// publicaciones-igm.html, geoportal-igm.html were referenced in nav but
// never existed as files there either).
export default function PageStub({ title }) {
  return (
    <>
      <PageBanner title={title} crumbs={[]} />
      <section className="content-page">
        <p>Esta página todavía no fue migrada a la nueva versión del sitio.</p>
      </section>
    </>
  )
}
