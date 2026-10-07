import { useId, useMemo } from 'react'
import type { ArtVariant } from '../data'

// A dot-matrix illustration drawn on a COLS x ROWS grid. Each variant is a set of
// line segments; dots close to a segment light up, a few accent points glow orange.

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

function dist(px: number, py: number, [x1, y1, x2, y2]: Seg) {
  const dx = x2 - x1, dy = y2 - y1
  const len = dx * dx + dy * dy
  const t = len === 0 ? 0 : Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len))
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
}

export function DotArt({ variant, className }: { variant: ArtVariant; className?: string }) {
  const id = useId()
  const dots = useMemo(() => {
    const { segs, accents, lit, faint = [] } = shape(variant)
    const out: { x: number; y: number; level: 0 | 1 | 2 | 3 }[] = []
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (accents.some(([ax, ay]) => Math.hypot(ax - x, ay - y) < 0.75)) {
          out.push({ x, y, level: 3 })
          continue
        }
        const d = lit ? (lit.has(`${x},${y}`) ? 0.8 : 9) : Math.min(...segs.map((s) => dist(x, y, s)))
        const level = d < 0.55 ? 2 : d < 1.05 ? 1 : faint.some((s) => dist(x, y, s) < 0.5) ? 1 : 0
        out.push({ x, y, level })
      }
    }
    return out
  }, [variant])

  return (
    <svg className={`dotart ${className ?? ''}`} viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9DB2D6" />
          <stop offset="0.55" stopColor="#6F86AC" />
          <stop offset="1" stopColor="#3F5779" />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx="0.72" cy="0.95" r="0.7">
          <stop offset="0" stopColor="#FF5C3F" stopOpacity="0.75" />
          <stop offset="0.45" stopColor="#FF8A5C" stopOpacity="0.25" />
          <stop offset="1" stopColor="#FF8A5C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}sky)`} />
      <rect width="100%" height="100%" fill={`url(#${id}glow)`} />
      {dots.map(({ x, y, level }) => (
        <circle
          key={`${x}-${y}`}
          cx={x * CELL + CELL / 2}
          cy={y * CELL + CELL / 2}
          className={level === 3 ? 'accent' : level === 2 ? 'lit' : undefined}
          style={level >= 2 ? { animationDelay: `${(x + y) * 35}ms` } : undefined}
          r={level === 3 ? 3.6 : level === 2 ? 3.1 : level === 1 ? 2 : 1.1}
          fill={level === 3 ? '#FF5C3F' : '#F2F3F5'}
          opacity={level === 3 ? 1 : level === 2 ? 0.95 : level === 1 ? 0.4 : 0.16}
        />
      ))}
    </svg>
  )
}
