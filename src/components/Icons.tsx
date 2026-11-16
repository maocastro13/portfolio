import type { SVGProps } from 'react'

const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const
const stroke = { ...base, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

type P = SVGProps<SVGSVGElement>

export const GitHubIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

export const LinkedInIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

export const PlayIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
  </svg>
)

export const DownloadIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 20h16" />
  </svg>
)

export const ArrowIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </svg>
)

export const MenuIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

/** Site mark: an "M" on the accent gradient. Same artwork as public/favicon.svg. */
export const Logo = (p: P) => (
  <svg width={32} height={32} viewBox="0 0 64 64" aria-hidden {...p}>
    <defs>
      <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#a78bfa" />
        <stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#logo-g)" />
    <path d="M18 45V20l14 16 14-16v25" fill="none" stroke="#09090f" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
