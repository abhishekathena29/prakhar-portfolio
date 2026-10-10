import { useEffect, useRef, useState } from 'react'
import { LABELS, PAGES, type PageId } from '../router'
import { Logo } from './Logo'

const TABS = PAGES.filter((p) => p !== 'resume')

export function Nav({ page }: { page: PageId }) {
  const tabsRef = useRef<HTMLElement>(null)
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)

  // slide the grey pill under the active tab, and keep it visible when the row scrolls on small screens
  useEffect(() => {
    const tabs = tabsRef.current
    if (!tabs) return
    const place = () => {
      const active = tabs.querySelector<HTMLElement>('.tab.active')
      setPill(active ? { x: active.offsetLeft, w: active.offsetWidth } : null)
    }
    place()
    tabs.querySelector('.active')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    const ro = new ResizeObserver(place)
    ro.observe(tabs)
    document.fonts?.ready.then(place)
    return () => ro.disconnect()
  }, [page])

  return (
    <header className="nav">
      <a className="brand" href="#/about" aria-label="Prakhar Singhvi, home">
        <Logo />
        <span className="brand-name">PRAKHAR SINGHVI</span>
      </a>

      <nav className="tabs" ref={tabsRef} aria-label="Sections">
        {pill && <span className="tab-pill" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} aria-hidden="true" />}
        {TABS.map((id) => (
          <a key={id} href={`#/${id}`} className={`tab ${page === id ? 'active' : ''}`} aria-current={page === id ? 'page' : undefined}>
            {LABELS[id]}
            {id === 'news' && <span className="badge" aria-label="new" />}
          </a>
        ))}
      </nav>

      <a href="#/resume" className={`btn btn-dark btn-nav ${page === 'resume' ? 'is-current' : ''}`} aria-current={page === 'resume' ? 'page' : undefined}>
        Resume
      </a>
    </header>
  )
}
