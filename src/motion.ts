import { useEffect, useRef, useState } from 'react'

const REVEAL = '.view .card, .view .statement, .view .feature, .view .upcoming, .view .page-head, .view .hero-copy > *, .view .hero-board > *, .view .section-side'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Page-level motion: reveals cards as they scroll into view, staggered among siblings.
 */
export function usePageMotion(page: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL))
    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('in'))
      return
    }

    els.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
      el.style.setProperty('--i', String(Math.min(siblings.indexOf(el), 8)))
      el.classList.add('reveal')
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [page])
}

export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}
