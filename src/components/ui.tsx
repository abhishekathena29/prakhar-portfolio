import type { CSSProperties, ReactNode } from 'react'
import { go } from '../router'
import { CountUp } from './CountUp'
import { Icon } from './Icons'

export function Panel({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`panel ${className}`} style={style}>{children}</div>
}

export function IconChip({ children }: { children: ReactNode }) {
  return <span className="icon-chip">{children}</span>
}

/** Segmented progress bar like the "7 / 30 questions" meter. */
export function SegBar({ filled, total, segments = total }: { filled: number; total: number; segments?: number }) {
  const lit = Math.round((filled / total) * segments)
  return (
    <div className="segbar" role="img" aria-label={`${filled} of ${total}`}>
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={i < lit ? 'on' : ''} style={{ animationDelay: `${i * 18}ms` }} />
      ))}
    </div>
  )
}

/** Solid track bar like the timer meter. Overflow past 100% is drawn in signal orange. */
export function TrackBar({ value, max, overflow }: { value: number; max: number; overflow?: boolean }) {
  const pct = Math.min(100, (value / max) * 100)
  const over = overflow && value > max ? ((value - max) / value) * 100 : 0
  return (
    <div className="trackbar" role="img" aria-label={`${value} of ${max}`}>
      <span className="fill" style={{ width: `${pct}%` }}>
        {over > 0 && <span className="over" style={{ width: `${over}%` }} />}
      </span>
    </div>
  )
}

export function Stat({ value, unit, label, icon, children }: { value: string; unit?: string; label: string; icon?: ReactNode; children?: ReactNode }) {
  return (
    <Panel className="stat">
      <div className="stat-top">
        <CountUp className="pixel stat-value" value={value} />
        {unit && <span className="stat-unit">{unit}</span>}
        {icon && <IconChip>{icon}</IconChip>}
      </div>
      {children}
      <span className="stat-label">{label}</span>
    </Panel>
  )
}

type ButtonProps = {
  children: ReactNode
  variant?: 'dark' | 'light'
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

/** Top row of three cards mirroring the quiz header: title, counter, meter. */
export function PageTop({ title, intro, counter, meter }: { title: string; intro: string; counter: ReactNode; meter: ReactNode }) {
  return (
    <div className="page-top">
      <Panel className="title-card">
        <button type="button" className="back" onClick={() => go('about')} aria-label="Back to About">
          <Icon.ChevronLeft />
        </button>
        <h1 className="title-card-h">{title}</h1>
        <p className="muted">{intro}</p>
      </Panel>
      <Panel className="meter-card">{counter}</Panel>
      <Panel className="meter-card">{meter}</Panel>
    </div>
  )
}

export function MeterHead({ value, unit, icon }: { value: string; unit: string; icon: ReactNode }) {
  return (
    <div className="meter-head">
      <CountUp className="pixel meter-value" value={value} />
      <span className="meter-unit">{unit}</span>
      <IconChip>{icon}</IconChip>
    </div>
  )
}

export function Option({ letter, children, onClick, selected }: { letter: string; children: ReactNode; onClick?: () => void; selected?: boolean }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag type={onClick ? 'button' : undefined} className={`option ${selected ? 'selected' : ''} ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      <span className="option-letter">{letter}</span>
      {selected && (
        <span className="option-check"><Icon.Check /></span>
      )}
      <span className="option-body">{children}</span>
    </Tag>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>
}
