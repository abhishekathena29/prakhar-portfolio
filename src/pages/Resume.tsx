import { Icon } from '../components/Icons'
import { Button, Card, PageHead } from '../components/ui'
import { RESUME_URL, book, community, highlights, internships, media, profile, research } from '../data'

export function Resume() {
  const sections: { title: string; rows: [string, string][] }[] = [
    {
      title: 'Education',
      rows: [
        ['Jayshree Periwal International School', 'Grade 12, IB Diploma Programme'],
        ['Offered the RIT High School Award', '$116,000 merit scholarship'],
      ],
    },
    { title: 'Research', rows: research.map((r) => [r.title, r.role + (r.date ? ` · ${r.date}` : '')]) },
    { title: 'Internships', rows: internships.map((n) => [n.title, n.role + (n.date ? ` · ${n.date}` : '')]) },
    { title: 'Teaching and writing', rows: [[book.title, 'Author · adopted by Narayana Prodigy']] },
    { title: 'In the media', rows: media.map((m) => [m.title, `${m.outlet} · ${m.date}`]) },
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
        {sections.filter((s) => s.rows.length > 0).map((s) => (
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
