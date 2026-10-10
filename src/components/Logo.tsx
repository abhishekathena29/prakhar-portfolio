/** Thick open ring with a soft offset shadow. */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M30 11.5A12.5 12.5 0 1 0 30 28.5" fill="none" stroke="#c9c9cc" strokeWidth="7" strokeLinecap="round" transform="translate(1.6 1.6)" />
      <path d="M30 11.5A12.5 12.5 0 1 0 30 28.5" fill="none" stroke="#1d1d1f" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}
