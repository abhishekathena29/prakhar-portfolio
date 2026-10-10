import { Art } from '../components/Art'
import { Closing } from '../components/blocks'
import { CountUp } from '../components/CountUp'
import { Icon } from '../components/Icons'
import { Button, Card, PageHead, Tag } from '../components/ui'
import { research, researchIntro } from '../data'

export function Research() {
  return (
    <>
      <PageHead title="Research" intro={researchIntro}>
        <div className="head-stats">
          <div><CountUp className="stat-num" value={String(research.length)} /><span>projects</span></div>
          <div><CountUp className="stat-num" value="$4,700" /><span>in grants and scholarships</span></div>
        </div>
      </PageHead>

      <div className="stack">
        {research.map((r, i) => (
          <Card key={r.title} className="study">
            <div className="study-body">
              <div className="study-top">
                <span className="wordmark">{r.org}</span>
                <span className="study-num">0{i + 1}</span>
              </div>
              <h2 className="h2">{r.title}</h2>
              <div className="tags">
                <Tag tone="teal">{r.role}</Tag>
                <Tag>{r.date}</Tag>
              </div>
              {r.body.map((p) => <p key={p}>{p}</p>)}
              {r.points && (
                <ol className="steps">
                  {r.points.map((pt) => (
                    <li key={pt.label}>
                      <span className="step-num">{pt.label}</span>
                      <span>{pt.text}</span>
                    </li>
                  ))}
                </ol>
              )}
              {r.notes?.map((n) => <p key={n} className="muted">{n}</p>)}
              {r.link && (
                <div className="btn-row">
                  <Button href={r.link.href} trailing={<Icon.External />}>{r.link.label}</Button>
                </div>
              )}
            </div>
            <div className="study-art">
              <Art variant={r.art} />
            </div>
          </Card>
        ))}
      </div>

      <Closing />
    </>
  )
}
