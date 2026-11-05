import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'light' | 'ghost-dark'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-ink-900 text-white hover:bg-ink-800 shadow-[0_1px_0_rgba(255,255,255,.12)_inset,0_8px_20px_-8px_rgba(11,16,32,.6)]',
  secondary: 'bg-white text-ink-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300',
  light: 'bg-white text-ink-900 hover:bg-brand-50',
  'ghost-dark': 'text-white ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:ring-white/30',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[.98]',
    variants[variant],
    sizes[size],
    className,
  )
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
}) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
      {arrow && (
        <ArrowRightIcon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  )
}
