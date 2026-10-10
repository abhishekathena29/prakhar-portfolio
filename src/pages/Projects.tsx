import { Art } from '../components/Art'
import { Closing, ProjectCard } from '../components/blocks'
import { PageHead, Tag } from '../components/ui'
import { pathfinder, projects } from '../data'

export function Projects() {
  return (
    <>
      <PageHead title={<>Selected<br />work</>} intro="Things I have built, written and run, from a theorem to a book to a tournament." />

      <section className="feature">
        <div className="feature-copy">
          <Tag tone="white">{pathfinder.role} · Adopted by Narayana Prodigy</Tag>
          <h2 className="feature-title">{pathfinder.title}</h2>
          {pathfinder.body.map((p) => <p key={p}>{p}</p>)}
          <div className="feature-lists">
            <div>
              <span className="eyebrow">Covers</span>
              <div className="tags">{pathfinder.topics.map((t) => <Tag key={t} tone="white">{t}</Tag>)}</div>
            </div>
            <div>
              <span className="eyebrow">Prepares for</span>
              <div className="tags">{pathfinder.prepares.map((t) => <Tag key={t} tone="white">{t}</Tag>)}</div>
            </div>
          </div>
        </div>
        <div className="feature-art">
          <Art variant="pages" />
        </div>
      </section>

      <div className="grid-2">
        {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>

      <Closing />
    </>
  )
}
