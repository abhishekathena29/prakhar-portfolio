import { useId, useMemo } from 'react'
import type { ArtVariant } from '../data'

// A line illustration on a soft pastel card, drawn on a COLS x ROWS grid. Each
// variant is a set of line segments plus a few accent points.

const COLS = 32
const ROWS = 20
const CELL = 10

type Seg = [number, number, number, number]
type Pt = [number, number]

function polyline(points: Pt[]): Seg[] {
  const segs: Seg[] = []
  for (let i = 1; i < points.length; i++) segs.push([...points[i - 1], ...points[i]])
  return segs
}

function shape(variant: ArtVariant): { segs: Seg[]; accents: Pt[]; lit?: Set<string>; faint?: Seg[] } {
  switch (variant) {
    case 'network': {
      const c: Pt = [15.5, 9.5]
      const nodes: Pt[] = Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2 - Math.PI / 2
        return [c[0] + Math.cos(a) * 12, c[1] + Math.sin(a) * 7.5]
      })
      const spokes = nodes.map((n) => [...n, ...c] as Seg)
      const ring = polyline([...nodes, nodes[0]])
      return { segs: [...spokes, ...ring], accents: [nodes[2], c] }
    }
    case 'triangle': {
      const A: Pt = [3, 18], B: Pt = [28, 18], C: Pt = [15.5, 1.5]
      const P = (a: number, b: number, c: number): Pt => [a * A[0] + b * B[0] + c * C[0], a * A[1] + b * B[1] + c * C[1]]
      const n = 4
      const segs: Seg[] = polyline([A, B, C, A])
      for (let i = 1; i < n; i++) {
        const t = i / n
        segs.push([...P(1 - t, 0, t), ...P(0, 1 - t, t)])
        segs.push([...P(t, 1 - t, 0), ...P(t, 0, 1 - t)])
        segs.push([...P(1 - t, t, 0), ...P(0, t, 1 - t)])
      }
      // centroid of one small cell: the "fully labelled" triangle Sperner guarantees
      return { segs, accents: [P(0.42, 0.33, 0.25)] }
    }
    case 'curve': {
      const pts: Pt[] = []
      for (let x = 0; x <= 31; x += 0.25) {
        const u = (x - 15.5) / 15.5
        pts.push([x, 9.5 - (1.4 * u ** 3 - 0.9 * u + 0.25 * u ** 2) * 9])
      }
      const axes: Seg[] = [[0, 9.5, 31, 9.5], [15.5, 0, 15.5, 19]]
      const k = 27
      const uk = (k - 15.5) / 15.5
      return { segs: polyline(pts), faint: axes, accents: [[k, 9.5 - (1.4 * uk ** 3 - 0.9 * uk + 0.25 * uk ** 2) * 9]] }
    }
    case 'tree': {
      const segs: Seg[] = []
      const walk = (x: number, y: number, dx: number, depth: number) => {
        if (depth === 0) return
        for (const s of [-1, 1]) {
          segs.push([x, y, x + s * dx, y + 5])
          walk(x + s * dx, y + 5, dx / 2, depth - 1)
        }
      }
      walk(15.5, 2, 8, 3)
      return { segs, accents: [[15.5, 2], [11.5, 12], [9.5, 17]] }
    }
    case 'rising': {
      const pts: Pt[] = []
      for (let x = 3; x <= 30; x += 0.25) {
        pts.push([x, 17 - 14 * (1 - Math.exp(-(x - 3) / 6)) + Math.sin(x * 1.7) * 0.9 * Math.exp(-(x - 3) / 10)])
      }
      const axes: Seg[] = [[2, 1, 2, 18], [2, 18, 31, 18]]
      return { segs: polyline(pts), faint: axes, accents: [pts[pts.length - 1]] }
    }
    case 'select': {
      // 280 applicants as a 20 x 14 field, 10 of them chosen
      const lit = new Set<string>()
      const chosen: Pt[] = [[8, 5], [11, 4], [14, 6], [17, 3], [20, 8], [23, 5], [10, 11], [15, 13], [19, 12], [22, 15]]
      for (let y = 3; y < 17; y++) for (let x = 6; x < 26; x++) lit.add(`${x},${y}`)
      return { segs: [], accents: chosen, lit }
    }
    case 'pages': {
      const segs: Seg[] = [[4, 3, 15, 4], [15, 4, 15, 18], [15, 18, 4, 17], [4, 17, 4, 3], [27, 3, 16, 4], [16, 4, 16, 18], [16, 18, 27, 17], [27, 17, 27, 3]]
      for (let y = 7; y <= 14; y += 2.5) segs.push([6.5, y, 12.5, y + 0.3], [18.5, y + 0.3, 24.5, y])
      return { segs, accents: [[24.5, 14.5]] }
    }
    case 'bars': {
      const heights = [6, 9, 7, 12, 10, 14, 16]
      const segs: Seg[] = heights.map((h, i) => [5 + i * 3.7, 18, 5 + i * 3.7, 18 - h])
      return { segs, accents: [[5 + 6 * 3.7, 2]] }
    }
  }
}

const PALETTES: Record<ArtVariant, [string, string, string]> = {
  network: ['#d7eef2', '#8ccbd6', '#127f90'],
  triangle: ['#e6e4fb', '#b3aff3', '#5b55d6'],
  curve: ['#e3ece2', '#a9c6a8', '#3f6d44'],
  tree: ['#efece6', '#cfc6b6', '#7a6a4f'],
  rising: ['#e9e7fb', '#bdb9f4', '#5b55d6'],
  select: ['#d9eff2', '#97d0da', '#127f90'],
  pages: ['#e3ece2', '#b2cdb0', '#3f6d44'],
  bars: ['#e8ebf0', '#b9c3d1', '#3d4b60'],
}

const px = (v: number) => v * CELL + CELL / 2

export function Art({ variant, className = '' }: { variant: ArtVariant; className?: string }) {
  const id = useId()
  const [light, mid, ink] = PALETTES[variant]
  const { segs, accents, lit, faint = [] } = useMemo(() => shape(variant), [variant])
  const joints = useMemo(() => {
    const seen = new Map<string, [number, number]>()
    if (variant === 'curve' || variant === 'rising') return []
    for (const [x1, y1, x2, y2] of segs) {
      seen.set(`${x1.toFixed(1)},${y1.toFixed(1)}`, [x1, y1])
      seen.set(`${x2.toFixed(1)},${y2.toFixed(1)}`, [x2, y2])
    }
    return [...seen.values()]
  }, [segs, variant])

  return (
    <svg className={`art ${className}`} viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} />
        </linearGradient>
        <filter id={`${id}soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor={ink} floodOpacity="0.25" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}bg)`} />
      <g opacity="0.35">
        {Array.from({ length: (COLS / 2) * (ROWS / 2) }, (_, i) => (
          <circle key={i} cx={px((i % (COLS / 2)) * 2)} cy={px(Math.floor(i / (COLS / 2)) * 2)} r="0.9" fill="#fff" />
        ))}
      </g>
      {faint.map((s, i) => (
        <line key={`f${i}`} x1={px(s[0])} y1={px(s[1])} x2={px(s[2])} y2={px(s[3])} stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="3 4" />
      ))}
      <g className="art-lines" filter={`url(#${id}soft)`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        {segs.map((s, i) => (
          <line key={i} x1={px(s[0])} y1={px(s[1])} x2={px(s[2])} y2={px(s[3])} pathLength={1} />
        ))}
        {joints.map(([x, y], i) => (
          <circle key={`j${i}`} cx={px(x)} cy={px(y)} r="3.2" fill="#fff" stroke="none" />
        ))}
        {lit &&
          [...lit].map((k) => {
            const [x, y] = k.split(',').map(Number)
            return <circle key={k} cx={px(x)} cy={px(y)} r="2.4" fill="#fff" stroke="none" opacity="0.9" />
          })}
      </g>
      {accents.map(([x, y], i) => (
        <g key={`a${i}`} className="art-accent" style={{ animationDelay: `${i * 120}ms` }}>
          <circle cx={px(x)} cy={px(y)} r="9" fill={ink} opacity="0.14" />
          <circle cx={px(x)} cy={px(y)} r="4.6" fill={ink} />
        </g>
      ))}
    </svg>
  )
}
