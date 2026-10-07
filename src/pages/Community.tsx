import { Icon } from '../components/Icons'
import { IconChip, MeterHead, PageTop, Panel, SegBar, TrackBar } from '../components/ui'
import { community, communityIntro } from '../data'

export function Community() {
  return (
    <>
      <PageTop
        title="Community"
        intro={communityIntro}
        counter={
          <>
            <MeterHead value="10" unit="/ 280+ applicants" icon={<Icon.Users />} />
            <SegBar filled={10} total={280} segments={28} />
          </>
        }
        meter={
          <>
            <MeterHead value="123%" unit="of fundraising goal" icon={<Icon.Heart />} />
            <TrackBar value={123} max={100} overflow />
          </>
        }
      />

      <div className="grid-2">
        {community.map((c) => (
          <Panel key={c.title} className={`card ${c.stat ? '' : 'card-plain'}`}>
            {c.stat && (
              <div className="card-stat">
                <div className="meter-head">
                  <span className="pixel meter-value">{c.stat.value}</span>
                  {c.stat.unit && <span className="meter-unit">{c.stat.unit}</span>}
                  <IconChip><Icon.Spark /></IconChip>
                </div>
                {c.stat.progress &&
                  (c.stat.progress.overflow ? (
                    <TrackBar value={c.stat.progress.filled} max={c.stat.progress.total} overflow />
                  ) : (
                    <SegBar filled={c.stat.progress.filled} total={c.stat.progress.total} segments={20} />
                  ))}
                <span className="stat-label">{c.stat.label}</span>
              </div>
            )}
            <div className="meta">
              <span>{c.role}</span>
              {c.date && <><span className="dot" /><span>{c.date}</span></>}
            </div>
            <h2 className="pixel card-title">{c.title}</h2>
            {c.body.map((p) => <p key={p}>{p}</p>)}
            {c.list && (
              <>
                {c.listLabel && <p className="muted">{c.listLabel}</p>}
                <ul className="ticks">
                  {c.list.map((l) => <li key={l}><Icon.Check />{l}</li>)}
                </ul>
              </>
            )}
          </Panel>
        ))}
      </div>
    </>
  )
}
