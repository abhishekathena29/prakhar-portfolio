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

  // keep the active tab visible when the tab row scrolls on small screens
  useEffect(() => {
    tabsRef.current?.querySelector('.active')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
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
