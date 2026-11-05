import { cn } from '@/lib/cn'
import { Reveal } from '@/components/reveal'

export function Section({
  id,
  className,
  children,
  tone = 'light',
}: {
  id?: string
  className?: string
  children: React.ReactNode
  tone?: 'light' | 'muted' | 'dark'
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 sm:py-28',
        tone === 'muted' && 'bg-slate-50',
        tone === 'dark' && 'bg-ink-900 text-white',
        className,
      )}
    >
      <div className="container">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow', tone === 'dark' && 'text-mint-300')}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          'h-display mt-4 text-3xl leading-[1.1] sm:text-[2.75rem]',
          tone === 'dark' ? 'text-white' : 'text-ink-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed text-pretty',
            tone === 'dark' ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
