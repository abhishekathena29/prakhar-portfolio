import { Closing } from '../components/blocks'
import { Icon } from '../components/Icons'
import { Card, IconBubble, PageHead, Tag } from '../components/ui'
import { forthcoming, news } from '../data'

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
