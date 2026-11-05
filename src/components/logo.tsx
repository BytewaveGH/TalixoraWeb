import { cn } from '@/lib/cn'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('h-8 w-8', className)}>
      <defs>
        <linearGradient id="tx-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A7CFB" />
          <stop offset="1" stopColor="#4B42DE" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#tx-g)" />
      <path d="M9 10.5h14" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M16 10.5v12" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="23" cy="22.5" r="2.4" fill="#3EDDC0" />
    </svg>
  )
}

export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span
        className={cn(
          'font-display text-[1.2rem] font-semibold tracking-[-0.02em]',
          tone === 'light' ? 'text-white' : 'text-ink-900',
        )}
      >
        Talixora
      </span>
    </span>
  )
}
