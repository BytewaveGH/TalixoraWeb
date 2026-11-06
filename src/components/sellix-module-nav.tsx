'use client'

import { useEffect, useState } from 'react'
import { ModuleIcon } from '@/components/module-icon'
import { sellixModules, type ModuleKey } from '@/content/site'
import { cn } from '@/lib/cn'

/** Sticky module bar for the Sellix page — highlights the module currently in view. */
export function SellixModuleNav() {
  const [active, setActive] = useState<ModuleKey | 'core' | null>(null)

  useEffect(() => {
    const ids = [...sellixModules.map((m) => m.key), 'core'] as const
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id as ModuleKey | 'core')
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const items = [
    ...sellixModules.map((m) => ({ id: m.key as string, label: m.name, module: m.key as ModuleKey | null })),
    { id: 'core', label: 'Shared core', module: null },
  ]

  return (
    <nav aria-label="Sellix modules" className="sticky top-16 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl lg:top-[72px]">
      <div className="container flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none]">
        <span className="mr-3 hidden shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 md:inline">On this page</span>
        {items.map((it, i) => {
          const isActive = active === it.id
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                isActive ? 'bg-ink-900 text-white shadow-soft' : 'text-slate-600 hover:bg-sellix-50 hover:text-sellix-purple',
              )}
            >
              {it.module ? (
                <ModuleIcon module={it.module} className={cn('h-4 w-4', isActive ? 'text-[#C58CFF]' : 'text-sellix-purple')} />
              ) : (
                <span className={cn('font-display text-xs font-bold', isActive ? 'text-[#C58CFF]' : 'text-sellix-purple')}>+</span>
              )}
              <span className="hidden sm:inline">{it.label}</span>
              <span className="sm:hidden">{it.module ? `0${i + 1}` : 'Core'}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
