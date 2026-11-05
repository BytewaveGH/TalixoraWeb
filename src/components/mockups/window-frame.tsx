import { cn } from '@/lib/cn'

export function WindowFrame({
  url,
  children,
  className,
}: {
  url: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-ink-800/80 shadow-glow backdrop-blur',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto w-full max-w-xs truncate rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-slate-400">
          {url}
        </div>
        <div className="w-10" aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}
