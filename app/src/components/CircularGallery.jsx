import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

// items: [{ to, image, fecha, title }]
// Auto-rotates continuously (no scroll-jacking — this sits inside a normal
// page section, not a dedicated full-viewport hero), pauses on hover/focus
// so a card can actually be read, and respects prefers-reduced-motion.
export default function CircularGallery({ items, radius: maxRadius = 320, autoRotateSpeed = 0.06, className }) {
  const [rotation, setRotation] = useState(0)
  const [paused, setPaused] = useState(false)
  const [radius, setRadius] = useState(maxRadius)
  const reducedMotionRef = useRef(false)
  const frameRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mq.matches
    const onChange = (e) => (reducedMotionRef.current = e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    function updateRadius() {
      const w = window.innerWidth
      setRadius(w < 640 ? 130 : w < 1024 ? 220 : maxRadius)
    }
    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [maxRadius])

  useEffect(() => {
    function tick() {
      if (!paused && !reducedMotionRef.current) {
        setRotation((prev) => prev + autoRotateSpeed)
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [paused, autoRotateSpeed])

  const anglePerItem = 360 / items.length

  return (
    <div
      role="region"
      aria-label="Galería de actividades recientes"
      className={clsx('relative w-full h-[320px] sm:h-[420px] flex items-center justify-center', className)}
      style={{ perspective: '1600px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative w-full h-full" style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}>
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem
          const relativeAngle = (((itemAngle + rotation) % 360) + 360) % 360
          const normalizedAngle = relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
          const opacity = Math.max(0.35, 1 - normalizedAngle / 180)

          return (
            <Link
              key={item.to + i}
              to={item.to}
              className="absolute w-[170px] h-[220px] sm:w-[210px] sm:h-[260px] rounded-md shadow-xl overflow-hidden border border-[#e4e4e0] block"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                left: '50%',
                top: '50%',
                marginLeft: '-85px',
                marginTop: '-110px',
                opacity,
                transition: 'opacity 0.3s linear',
              }}
            >
              <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
                <div className="text-[0.7rem] uppercase font-bold text-dorado-claro">{item.fecha}</div>
                <p className="text-[0.82rem] leading-snug mt-1">{item.title}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
