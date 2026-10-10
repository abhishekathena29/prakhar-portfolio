import { Icon } from '../components/Icons'
import { Button, Card, PageHead } from '../components/ui'
import { RESUME_URL, community, highlights, pathfinder, profile, research } from '../data'

export function Resume() {
  const sections: { title: string; rows: [string, string][] }[] = [
    {
      title: 'Education',
      rows: [
        ['Jayshree Periwal International School', 'Grade 12, IB Diploma Programme'],
        ['Offered the RIT High School Award', '$116,000 merit scholarship'],
      ],
    },
    { title: 'Research', rows: research.map((r) => [r.title, `${r.role} · ${r.date}`]) },
    { title: 'Teaching and writing', rows: [[pathfinder.title, 'Author · adopted by Narayana Prodigy']] },
    { title: 'Leadership and community', rows: community.map((c) => [c.title, c.role + (c.date ? ` · ${c.date}` : '')]) },
    { title: 'Selected honours', rows: highlights.map((h) => [h.competition, h.result]) },
  ]

  return (
    <>
      <PageHead title="Resume" intro={`${profile.name} · ${profile.location}. A one-page summary; the PDF has every detail.`}>
        <div className="btn-row no-print">
          <Button href={RESUME_URL} download icon={<Icon.Download />}>Download PDF</Button>
          <Button variant="ghost" onClick={() => window.print()} icon={<Icon.Printer />}>Print</Button>
        </div>
      </PageHead>

      <div className="stack">
        {sections.map((s) => (
          <Card key={s.title} className="resume">
            <h2 className="h3">{s.title}</h2>
            <div className="resume-rows">
              {s.rows.map(([a, b]) => (
                <div key={a} className="resume-row">
                  <strong>{a}</strong>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
