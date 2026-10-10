import type { ReactNode } from 'react'
import { RESUME_URL, type Project, type Research } from '../data'
import { Art } from './Art'
import { Icon } from './Icons'
import { Logo } from './Logo'
import { Button, Card, Tags } from './ui'

/** "Selected work" tile: illustration, uppercase name and year, tag row. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <a className="card project" href={`#/${project.page}`}>
      <div className="project-art">
        <Art variant={project.art} />
      </div>
      <div className="project-meta">
        <span className="project-name">{project.title}</span>
        {project.year && <span className="project-year">{project.year}</span>}
      </div>
      <p className="project-summary">{project.summary}</p>
      <Tags items={project.tags} />
    </a>
  )
}

/** "Full-time UI designer at Google" style card. */
export function ExperienceCard({ item }: { item: Research }) {
  return (
    <a className="card experience" href="#/research">
      <span className="wordmark">{item.org}</span>
      <h3 className="experience-title">{item.title}</h3>
      <span className="experience-date">{item.date}</span>
    </a>
  )
}

/** Teal mission block with a wordmark row underneath. */
export function Statement({ children, marks, footnote, className = '' }: { children: ReactNode; marks?: readonly string[]; footnote?: ReactNode; className?: string }) {
  return (
    <section className={`statement ${className}`}>
      <p className="statement-text">{children}</p>
      {footnote && <p className="statement-foot">{footnote}</p>}
      {marks && (
        <div className="statement-marks">
          {marks.map((m) => <span key={m}>{m}</span>)}
        </div>
      )}
    </section>
  )
}

/** Closing "Let's connect" card. */
export function Closing() {
  return (
    <Card className="closing">
      <h2 className="closing-title">
        Let’s talk
        <br />
        mathematics.
      </h2>
      <div className="closing-side">
        <p className="lead">Research, teaching, olympiad training or a problem that refuses to stay small.</p>
        <div className="btn-row">
          <Button href={RESUME_URL} download icon={<Icon.Download />}>Download resume</Button>
          <Button variant="light" href="#/news" trailing={<Icon.ArrowRight />}>Latest news</Button>
        </div>
      </div>
    </Card>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="#/about">
        <Logo size={28} />
        <span className="brand-name">PRAKHAR SINGHVI</span>
      </a>
      <span className="footer-note">Jaipur, India · © 2026</span>
    </footer>
  )
}
