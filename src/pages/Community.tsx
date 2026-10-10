import { Closing } from '../components/blocks'
import { CountUp } from '../components/CountUp'
import { Icon } from '../components/Icons'
import { Card, PageHead, Tag } from '../components/ui'
import { community, communityIntro } from '../data'

export function Community() {
  return (
    <>
      <PageHead title="Community" intro={communityIntro} />

      <section className="statement statement-stats">
        {[
          { value: '10', label: 'students selected from 280+ for Super 10' },
          { value: '2,500', label: 'students elected me School Captain' },
          { value: '350+', label: 'LogiLeague participants in year two' },
          { value: '123%', label: 'of the Cuddles Foundation goal in 27 days' },
        ].map((s) => (
          <div key={s.label} className="statement-stat">
            <CountUp className="statement-num" value={s.value} />
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <div className="grid-2 masonry">
        {community.map((c, i) => (
          <Card key={c.title} className="org">
            <div className="org-top">
              <div className="tags">
                <Tag tone="teal">{c.role}</Tag>
                {c.date && <Tag>{c.date}</Tag>}
              </div>
              <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h2 className="h3">{c.title}</h2>
            {c.body.map((p) => <p key={p} className="muted">{p}</p>)}
            {c.list && (
              <>
                {c.listLabel && <p className="list-label">{c.listLabel}</p>}
                <ul className="ticks">
                  {c.list.map((l) => <li key={l}><Icon.Check />{l}</li>)}
                </ul>
              </>
            )}
            {c.stat && (
              <div className="org-stat">
                <CountUp className="stat-num" value={c.stat.value} />
                {c.stat.unit && <span className="stat-unit">{c.stat.unit}</span>}
                <span className="stat-label">{c.stat.label}</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Closing />
    </>
  )
}
