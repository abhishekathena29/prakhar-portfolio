import { useEffect, useRef, useState } from 'react'
import { LABELS, PAGES, type PageId } from '../router'
import { Icon } from './Icons'

function useJaipurTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 15_000)
    return () => clearInterval(t)
  }, [])
  return time
}

export function Nav({ page }: { page: PageId }) {
  const time = useJaipurTime()
  const tabsRef = useRef<HTMLDivElement>(null)

  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)

  // slide the white pill under the active tab, and keep it visible when the row scrolls on small screens
  useEffect(() => {
    const tabs = tabsRef.current
    if (!tabs) return
    const place = () => {
      const active = tabs.querySelector<HTMLElement>('.tab.active')
      if (active) setPill({ x: active.offsetLeft, w: active.offsetWidth })
    }
    place()
    tabs.querySelector('.active')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    const ro = new ResizeObserver(place)
    ro.observe(tabs)
    document.fonts?.ready.then(place)
    return () => ro.disconnect()
  }, [page])

  return (
    <header className="nav panel">
      <a className="brand" href="#/about" aria-label="Prakhar Singhvi, home">
        <span className="brand-mark" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => <i key={i} />)}
        </span>
        <span className="pixel brand-name">Prakhar Singhvi</span>
      </a>

      <nav className="tabs" ref={tabsRef} aria-label="Sections">
        {pill && <span className="tab-pill" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} aria-hidden="true" />}
        {PAGES.map((id) => (
          <a key={id} href={`#/${id}`} className={`tab ${page === id ? 'active' : ''}`} aria-current={page === id ? 'page' : undefined}>
            {LABELS[id]}
            {id === 'news' && <span className="badge" aria-label="1 new">1</span>}
          </a>
        ))}
      </nav>

      <div className="nav-right">
        <span className="nav-chip" title="Local time in Jaipur">
          <Icon.Clock />
          <span className="pixel">{time}</span>
          <span className="nav-chip-unit">IST</span>
        </span>
        <span className="avatar pixel" aria-hidden="true">PS</span>
      </div>
    </header>
  )
}
