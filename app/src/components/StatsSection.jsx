import { useEffect, useRef, useState } from 'react'

// Easy to customize: edit value/suffix/label here.
const stats = [
  { value: 19, suffix: '', label: 'Departamentos cubiertos' },
  { value: 30, suffix: '+', label: 'Estaciones REGNA-ROU' },
  { value: 110, suffix: '+', label: 'Años de trayectoria' },
  { value: 50, suffix: '+', label: 'Publicaciones y mapas' },
]

const DURATION = 1800

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function StatItem({ value, suffix, label, animate }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!animate) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1)
      setDisplay(Math.round(easeOutCubic(progress) * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animate, value])

  return (
    <div className="stat-item">
      <span className="stat-number">
        {display}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-grid">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} animate={visible} />
        ))}
      </div>
    </section>
  )
}
