import { DotArt } from '../components/DotArt'
import { Icon } from '../components/Icons'
import { Button, MeterHead, Option, PageTop, Panel, SegBar, TrackBar } from '../components/ui'
import { research, researchIntro } from '../data'

export function Research() {
  return (
    <>
      <PageTop
        title="Research"
        intro={researchIntro}
        counter={
          <>
            <MeterHead value={String(research.length)} unit="/ projects" icon={<Icon.Question />} />
            <SegBar filled={research.length} total={research.length} segments={25} />
          </>
        }
        meter={
          <>
            <MeterHead value="$4,700" unit="in grants and scholarships" icon={<Icon.Gem />} />
            <TrackBar value={4700} max={4700} />
          </>
        }
      />

      <div className="stack">
        {research.map((r, i) => (
          <Panel key={r.title} className="work">
            <div className="work-art">
              <DotArt variant={r.art} />
              <span className="work-index pixel">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="work-body">
              <div className="meta">
                <span>{r.role}</span>
                <span className="dot" />
                <span>{r.date}</span>
              </div>
              <h2 className="pixel work-title">{r.title}</h2>
              {r.body.map((p) => <p key={p}>{p}</p>)}
              {r.points && (
                <div className="options options-3">
                  {r.points.map((pt, j) => (
                    <Option key={pt.label} letter={pt.label} selected={j === r.points!.length - 1}>
                      <span>{pt.text}</span>
                    </Option>
                  ))}
                </div>
              )}
              {r.notes?.map((n) => <p key={n} className="muted">{n}</p>)}
              {r.link && (
                <div className="work-actions">
                  <Button variant="light" href={r.link.href} trailing={<Icon.External />}>{r.link.label}</Button>
                </div>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </>
  )
}
