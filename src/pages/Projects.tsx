import { DotArt } from '../components/DotArt'
import { Icon } from '../components/Icons'
import { Button, Eyebrow, MeterHead, PageTop, Panel, SegBar } from '../components/ui'
import { pathfinder, projects } from '../data'
import { LABELS, go } from '../router'

export function Projects() {
  return (
    <>
      <PageTop
        title="Projects"
        intro="Things I have built, written and run, from a theorem to a book to a tournament."
        counter={
          <>
            <MeterHead value={String(projects.length + 1)} unit="/ projects" icon={<Icon.Question />} />
            <SegBar filled={projects.length + 1} total={projects.length + 1} segments={25} />
          </>
        }
        meter={
          <>
            <MeterHead value="4" unit="/ olympiad subjects in one book" icon={<Icon.Book />} />
            <SegBar filled={4} total={4} segments={4} />
          </>
        }
      />

      <Panel className="work feature">
        <div className="work-art">
          <DotArt variant="pages" />
          <span className="work-index pixel">Book</span>
        </div>
        <div className="work-body">
          <div className="meta"><span>{pathfinder.role}</span><span className="dot" /><span>Adopted by Narayana Prodigy</span></div>
          <h2 className="pixel work-title">{pathfinder.title}</h2>
          {pathfinder.body.map((p) => <p key={p}>{p}</p>)}
          <div className="chips">
            <span className="chips-label">Covers</span>
            {pathfinder.topics.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <div className="chips">
            <span className="chips-label">Prepares for</span>
            {pathfinder.prepares.map((t) => <span key={t} className="chip chip-solid">{t}</span>)}
          </div>
        </div>
      </Panel>

      <div className="grid-3">
        {projects.map((p) => (
          <Panel key={p.title} className="project">
            <div className="project-art"><DotArt variant={p.art} /></div>
            <div className="project-body">
              <Eyebrow>{p.kind}</Eyebrow>
              <h3 className="pixel project-title">{p.title}</h3>
              <p>{p.summary}</p>
              <div className="chips">
                {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
              <Button className="btn-sm" onClick={() => go(p.page)} trailing={<Icon.ArrowRight />}>
                More in {LABELS[p.page]}
              </Button>
            </div>
          </Panel>
        ))}
      </div>
    </>
  )
}
