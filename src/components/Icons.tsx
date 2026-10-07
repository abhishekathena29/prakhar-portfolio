import type { ReactNode, SVGProps } from 'react'

function Svg({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const Icon = {
  Star: () => (
    <Svg><path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z" /></Svg>
  ),
  Gem: () => (
    <Svg><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l-1.5 5L12 20l4.5-11L15 4" /></Svg>
  ),
  Check: () => (
    <Svg><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>
  ),
  CheckSquare: () => (
    <Svg><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8.5 12.2l2.4 2.4 4.6-5" /></Svg>
  ),
  Clock: () => (
    <Svg><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>
  ),
  Printer: () => (
    <Svg><path d="M7 9V4h10v5" /><rect x="3.5" y="9" width="17" height="8" rx="2" /><path d="M7 14h10v6H7z" /></Svg>
  ),
  Download: () => (
    <Svg><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" /></Svg>
  ),
  ArrowRight: () => (
    <Svg><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
  ),
  ChevronRight: () => (
    <Svg><path d="M9.5 6l6 6-6 6" /></Svg>
  ),
  ChevronLeft: () => (
    <Svg><path d="M14.5 6l-6 6 6 6" /></Svg>
  ),
  External: () => (
    <Svg><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>
  ),
  Question: () => (
    <Svg><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9.8 9.6a2.3 2.3 0 1 1 3.3 2.1c-.7.4-1.1.9-1.1 1.7M12 16.3v.1" /></Svg>
  ),
  Users: () => (
    <Svg><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.8a3 3 0 0 1 0 5.4M17.5 14.2A5.5 5.5 0 0 1 20.5 19" /></Svg>
  ),
  Book: () => (
    <Svg><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" /></Svg>
  ),
  Flask: () => (
    <Svg><path d="M9.5 4h5M10 4v5.5L5 18a1.5 1.5 0 0 0 1.3 2.2h11.4A1.5 1.5 0 0 0 19 18l-5-8.5V4M7.5 14.5h9" /></Svg>
  ),
  Trophy: () => (
    <Svg><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4.5a3 3 0 0 0 3.5 4M16 6h3.5a3 3 0 0 1-3.5 4M12 13v4M8.5 20h7M9.5 17h5v3h-5z" /></Svg>
  ),
  Heart: () => (
    <Svg><path d="M12 19.5s-7.5-4.4-7.5-10A4 4 0 0 1 12 7a4 4 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10z" /></Svg>
  ),
  Pin: () => (
    <Svg><path d="M12 21s6.5-5.8 6.5-11a6.5 6.5 0 0 0-13 0c0 5.2 6.5 11 6.5 11z" /><circle cx="12" cy="10" r="2.3" /></Svg>
  ),
  Spark: () => (
    <Svg><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></Svg>
  ),
  Menu: () => (
    <Svg><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
  ),
}
