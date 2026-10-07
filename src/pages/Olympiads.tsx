import { Icon } from '../components/Icons'
import { Button, Eyebrow, IconChip, MeterHead, PageTop, Panel, SegBar } from '../components/ui'
import { highlights, moreResults, olympiadIntro, pathfinder, training } from '../data'
import { go } from '../router'

export function Olympiads() {
  return (
    <>
      <PageTop
        title="Olympiads"
        intro={olympiadIntro}
        counter={
          <>
            <MeterHead value="34" unit="/ competitions won" icon={<Icon.Trophy />} />
            <SegBar filled={34} total={34} segments={34} />
          </>
        }
        meter={
          <>
            <MeterHead value="3" unit="/ perfect AMC & AIME scores" icon={<Icon.Star />} />
            <SegBar filled={3} total={3} segments={3} />
          </>
        }
      />

      <Panel className="block">
        <Eyebrow>Highlights</Eyebrow>
        <div className="results">
          {highlights.map((h) => (
            <div key={h.competition} className={`result ${h.score ? 'has-score' : ''}`}>
              <div className="result-name">{h.competition}</div>
              {h.score ? (
                <div className="result-score">
                  <div className="result-score-head">
                    <span className="pixel meter-value">{h.score[0]}</span>
                    <span className="meter-unit">/ {h.score[1]}</span>
                    {h.score[0] === h.score[1] && <IconChip><Icon.Check /></IconChip>}
                  </div>
                  <SegBar filled={h.score[0]} total={h.score[1]} segments={h.score[1] > 30 ? 30 : h.score[1]} />
                  {h.result.includes(';') && <p className="muted small">{h.result}</p>}
                </div>
              ) : (
                <div className="result-text">{h.result}</div>
              )}
            </div>
          ))}
        </div>
      </Panel>

      <section className="split">
        <Panel className="block">
          <Eyebrow>More international results</Eyebrow>
          {moreResults.map((g) => (
            <div key={g.label} className="chips chips-group">
              <span className="chips-label">{g.label}</span>
              {g.items.map((i) => <span key={i} className="chip">{i}</span>)}
            </div>
          ))}
          <p className="muted">In total, I have won 34 domestic and international competitions.</p>
        </Panel>

        <div className="col">
          <Panel className="block">
            <Eyebrow>How I train</Eyebrow>
            <h2 className="pixel h2">5–6 hours on one problem.</h2>
            <p>{training}</p>
          </Panel>
          <Panel className="block">
            <Eyebrow>{pathfinder.role}</Eyebrow>
            <h2 className="pixel h2">{pathfinder.title}</h2>
            <p>{pathfinder.body[0]}</p>
            <Button variant="light" onClick={() => go('projects')} trailing={<Icon.ChevronRight />}>About the book</Button>
          </Panel>
        </div>
      </section>
    </>
  )
}
