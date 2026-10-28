import { Closing } from '../components/blocks'
import { Icon } from '../components/Icons'
import { Card, IconBubble, PageHead, Section, Tag } from '../components/ui'
import { forthcoming, media, news } from '../data'

export function News() {
  return (
    <>
      <PageHead title="News" intro="Newest first." />

      <section className="upcoming">
        <IconBubble><Icon.Clock /></IconBubble>
        <div>
          <span className="eyebrow">Forthcoming</span>
          <p>{forthcoming}</p>
        </div>
      </section>

      {media.length > 0 && (
        <Section title={<>In the<br />media</>}>
          <div className="stack stack-tight">
            {media.map((m) => (
              <Card key={m.title} className="news-row">
                <span className="news-date">{m.date}</span>
                <div className="news-text">
                  <span className="eyebrow">{m.outlet}</span>
                  <p>{m.title}</p>
                  {m.href && (
                    <a className="text-link" href={m.href} target="_blank" rel="noreferrer">
                      Read the article <Icon.External />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <div className="stack stack-tight">
        {news.map((n, i) => (
          <Card key={n.text} className="news-row">
            <span className="news-date">{n.date}</span>
            <div className="news-text">
              <p>{n.text}</p>
              {n.link && (
                <a className="text-link" href={n.link}>
                  Read on arXiv <Icon.External />
                </a>
              )}
            </div>
            {i === 0 && <Tag tone="teal">New</Tag>}
          </Card>
        ))}
      </div>

      <Closing />
    </>
  )
}
