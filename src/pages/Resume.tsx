import { Icon } from '../components/Icons'
import { Button, Eyebrow, Panel } from '../components/ui'
import { RESUME_URL, community, highlights, pathfinder, profile, research } from '../data'

export function Resume() {
  return (
    <>
      <Panel className="hero hero-compact">
        <div className="hero-mark" aria-hidden="true"><Icon.Check /></div>
        <p className="hero-sub">{profile.name} · {profile.location}</p>
        <h1 className="pixel hero-title">Resume</h1>
        <p className="hero-text">A one-page summary. The full PDF has every detail.</p>
      </Panel>

      <div className="action-row no-print">
        <Button onClick={() => window.print()} icon={<Icon.Printer />}>Print this page</Button>
        <Button href="#/about" icon={<Icon.ChevronLeft />}>Back to About</Button>
        <Button variant="light" href={RESUME_URL} download icon={<Icon.Download />}>Download PDF</Button>
      </div>

      <Panel className="block resume">
        <section>
          <Eyebrow>Education</Eyebrow>
          <div className="resume-row">
            <strong>Jayshree Periwal International School</strong>
            <span>Grade 12, IB Diploma Programme</span>
          </div>
          <div className="resume-row">
            <strong>Offered the RIT High School Award</strong>
            <span>$116,000 merit scholarship</span>
          </div>
        </section>

        <section>
          <Eyebrow>Research</Eyebrow>
          {research.map((r) => (
            <div key={r.title} className="resume-row">
              <strong>{r.title}</strong>
              <span>{r.role} · {r.date}</span>
            </div>
          ))}
        </section>

        <section>
          <Eyebrow>Teaching and writing</Eyebrow>
          <div className="resume-row">
            <strong>{pathfinder.title}</strong>
            <span>Author · adopted by Narayana Prodigy</span>
          </div>
        </section>

        <section>
          <Eyebrow>Leadership and community</Eyebrow>
          {community.map((c) => (
            <div key={c.title} className="resume-row">
              <strong>{c.title}</strong>
              <span>{c.role}{c.date ? ` · ${c.date}` : ''}</span>
            </div>
          ))}
        </section>

        <section>
          <Eyebrow>Selected honours</Eyebrow>
          {highlights.map((h) => (
            <div key={h.competition} className="resume-row">
              <strong>{h.competition}</strong>
              <span>{h.result}</span>
            </div>
          ))}
        </section>
      </Panel>
    </>
  )
}
