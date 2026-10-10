import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>
}

type ButtonProps = {
  children: ReactNode
  variant?: 'dark' | 'light' | 'ghost'
  icon?: ReactNode
  trailing?: ReactNode
  href?: string
  onClick?: () => void
  download?: boolean
  className?: string
}

export function Button({ children, variant = 'dark', icon, trailing, href, onClick, download, className = '' }: ButtonProps) {
  const cls = `btn btn-${variant} ${trailing ? 'has-trailing' : ''} ${className}`
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {trailing}
    </>
  )
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a className={cls} href={href} download={download || undefined} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {inner}
      </a>
    )
  }
  return <button type="button" className={cls} onClick={onClick}>{inner}</button>
}

/** Small uppercase pill, teal for the primary tag and grey for the rest. */
export function Tag({ children, tone = 'grey' }: { children: ReactNode; tone?: 'teal' | 'grey' | 'blue' | 'white' }) {
  return <span className={`tag tag-${tone}`}>{children}</span>
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t, i) => <Tag key={t} tone={i === 0 ? 'teal' : 'grey'}>{t}</Tag>)}
    </div>
  )
}

/** The "● AVAILABLE FOR WORK" pill. */
export function Status({ children }: { children: ReactNode }) {
  return (
    <span className="status">
      <i aria-hidden="true" />
      {children}
    </span>
  )
}

export function IconBubble({ children }: { children: ReactNode }) {
  return <span className="icon-bubble">{children}</span>
}

/** Page opener: big tight headline on the left, intro and optional actions on the right. */
export function PageHead({ title, intro, children }: { title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-head">
      <h1 className="display">{title}</h1>
      <div className="page-head-side">
        {intro && <p className="lead">{intro}</p>}
        {children}
      </div>
    </header>
  )
}

/** Section with the heading in a narrow left column, like "How Can I Assist You?". */
export function Section({ title, aside, children, className = '' }: { title: ReactNode; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`section ${className}`}>
      <div className="section-side">
        <h2 className="h2">{title}</h2>
        {aside}
      </div>
      <div className="section-main">{children}</div>
    </section>
  )
}
