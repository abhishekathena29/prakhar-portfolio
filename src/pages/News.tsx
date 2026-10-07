import { Icon } from '../components/Icons'
import { Eyebrow, IconChip, Panel } from '../components/ui'
import { forthcoming, news } from '../data'

export function News() {
  return (
    <>
      <Panel className="hero hero-compact">
        <p className="hero-sub">Newest first.</p>
        <h1 className="pixel hero-title">News</h1>
      </Panel>

      <Panel className="upcoming">
        <IconChip><Icon.Clock /></IconChip>
        <div>
          <Eyebrow>Forthcoming</Eyebrow>
          <p>{forthcoming}</p>
        </div>
      </Panel>

      <Panel className="block">
        <ol className="timeline">
          {news.map((n, i) => (
            <li key={n.text} className={i === 0 ? 'latest' : ''}>
              <span className="pixel timeline-date">{n.date}</span>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-text">
                {i === 0 && <span className="new-tag">New</span>}
                <p>{n.text}</p>
                {n.link && (
                  <a className="text-link" href={n.link}>
                    Read on arXiv <Icon.External />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  )
}
