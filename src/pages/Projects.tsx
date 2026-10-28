import { Art } from '../components/Art'
import { Closing, ProjectCard } from '../components/blocks'
import { PageHead, Tag } from '../components/ui'
import { book, projects } from '../data'

export function Projects() {
  return (
    <>
      <PageHead title={<>Selected<br />work</>} intro="Things I have built, written and run, from a theorem to a book to a tournament." />

      <section className="feature">
        <div className="feature-copy">
          <Tag tone="white">{book.role} · Adopted by Narayana Prodigy</Tag>
          <h2 className="feature-title">{book.title}</h2>
          {book.body.map((p) => <p key={p}>{p}</p>)}
          <div className="feature-lists">
            <div>
              <span className="eyebrow">Covers</span>
              <div className="tags">{book.topics.map((t) => <Tag key={t} tone="white">{t}</Tag>)}</div>
            </div>
            <div>
              <span className="eyebrow">Prepares for</span>
              <div className="tags">{book.prepares.map((t) => <Tag key={t} tone="white">{t}</Tag>)}</div>
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
