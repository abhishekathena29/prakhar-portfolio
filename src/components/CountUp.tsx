import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '../motion'

/** Counts the numeric part of a value like "$4,700", "123%" or "350+" up from zero once visible. */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/)
  const ok = match !== null
  const target = ok ? Number(match[2].replace(/,/g, '')) : 0
  const [ref, seen] = useInView<HTMLSpanElement>()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!seen || !ok || prefersReducedMotion()) return
    const duration = 900 + Math.min(target, 400)
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, target, ok])

  if (!match) return <span className={className}>{value}</span>
  const v = prefersReducedMotion() ? target : n
  const shown = match[2].includes(',') ? v.toLocaleString('en-US') : String(v)
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{match[1]}{shown}{match[3]}</span>
    </span>
  )
}
