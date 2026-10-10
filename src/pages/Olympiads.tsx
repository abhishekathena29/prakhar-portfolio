import { Closing, Statement } from '../components/blocks'
import { CountUp } from '../components/CountUp'
import { Icon } from '../components/Icons'
import { Button, Card, PageHead, Section, Tag } from '../components/ui'
import { arenas, highlights, moreResults, olympiadIntro, pathfinder, training } from '../data'

export function Olympiads() {
  const scored = highlights.filter((h) => h.score)
  const ranked = highlights.filter((h) => !h.score)

  return (
    <>
      <PageHead title="Olympiads" intro={olympiadIntro}>
        <div className="head-stats">
          <div><CountUp className="stat-num" value="34" /><span>competitions won</span></div>
          <div><CountUp className="stat-num" value="3" /><span>perfect AMC and AIME scores</span></div>
        </div>
      </PageHead>

      <div className="grid-3">
        {scored.map((h) => {
          const [got, max] = h.score!
          const perfect = got === max
          return (
            <Card key={h.competition} className="score">
              <div className="score-top">
                <span className="score-name">{h.competition}</span>
                {perfect && <Tag tone="teal">Perfect</Tag>}
              </div>
              <div className="score-value">
                <CountUp className="stat-num" value={String(got)} />
                <span className="stat-unit">/ {max}</span>
              </div>
              <div className="score-bar" aria-hidden="true">
                <span style={{ width: `${(got / max) * 100}%` }} />
              </div>
              {h.result.includes(';') && <p className="muted small">{h.result.split('; ')[1]}</p>}
            </Card>
          )
        })}
      </div>

      <div className="grid-2">
        {ranked.map((h) => (
          <Card key={h.competition} className="experience">
            <span className="wordmark wordmark-sm">{h.competition}</span>
            <h3 className="experience-title">{h.result}</h3>
          </Card>
        ))}
      </div>

      <Statement className="statement-sm" marks={arenas}>{training}</Statement>

      <Section title={<>More<br />results</>} aside={<p className="muted">In total, I have won 34 domestic and international competitions.</p>}>
        <div className="grid-2">
          {moreResults.map((g) => (
            <Card key={g.label} className="note">
              <span className="eyebrow">{g.label}</span>
              <div className="tags">
                {g.items.map((i) => <Tag key={i}>{i}</Tag>)}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Card className="experience experience-cta wide">
        <span className="wordmark">{pathfinder.role}</span>
        <h2 className="h2">{pathfinder.title}</h2>
        <p className="muted">{pathfinder.body[0]}</p>
        <Button href="#/projects" trailing={<Icon.ArrowRight />}>About the book</Button>
      </Card>

      <Closing />
    </>
  )
}
