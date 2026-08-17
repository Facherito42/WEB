import PageBanner from '../components/PageBanner'

export default function MisionYVision() {
  return (
    <>
      <PageBanner title="Nuestra Misión y Visión" crumbs={['Quiénes Somos', 'Misión y Visión']} />
      <section className="content-page">
        <h2>Misión</h2>
        <p>
          Asegurar la preparación, actualización, conservación, distribución y evaluación de material cartográfico, necesario para el
          cumplimiento de su misión fundamental asignada al Ejército por la Ley Nº 15.688 de fecha 30 de Noviembre de 1984 y en apoyo a la
          planificación integral de las actividades de Seguridad y Desarrollo Nacional.
          <br />
          <br />
          Supervisar, controlar y aprobar todas las publicaciones realizadas por Organismos del Estado o Privados, de su especialidad sin
          prejuicio de la competencia asignada Ley No. 10.808 del 16 de octubre de 1946 y Decreto-Ley No. 14.747 de fecha 28 de Diciembre de
          1977.
          <br />
          <br />
          Establecer, conservar y ampliar la red geodésica nacional de triangulación, nivelación, gravimetría y magnetismo terrestre.
          <br />
          <br />
          Integrar comisiones de estudio y caracterización de nuestros límites internacionales y participar de la representación del país en
          todas las actividades de su especialidad y derivadas de compromisos internacionales.
          <br />
          <br />
          Establecer, mantener y operar un Sistema de Información Geográfica (SIG) para el apoyo a la gestión y toma de decisiones.
        </p>
        <h2>Visión</h2>
        <p>Ser un referente de calidad en la producción de Información Geográfica (IG) de Uruguay con reconocimiento nacional e internacional.</p>
        <h2>Valores</h2>
        <ul>
          <li>Servicio a la Patria y a la comunidad.</li>
          <li>Rigor técnico y mejora continua.</li>
          <li>Integridad y probidad institucional.</li>
          <li>Trabajo en equipo y desarrollo profesional del personal.</li>
        </ul>
      </section>
    </>
  )
}
