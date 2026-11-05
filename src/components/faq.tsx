import { PlusIcon } from '@heroicons/react/24/outline'

/** Accessible, no-JS FAQ accordion built on <details>/<summary>. */
export function Faq({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, i) => (
        <details key={item.q} className="group py-1" open={i === defaultOpen}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold tracking-tight text-ink-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:text-brand-600">
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
