'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BuildingOffice2Icon,
  ShoppingCartIcon,
  CakeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CubeIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { WindowFrame } from './window-frame'
import { cn } from '@/lib/cn'
import type { ModuleKey } from '@/content/site'

type View = {
  key: ModuleKey
  label: string
  icon: typeof ChartBarIcon
  kpis: { label: string; value: string; delta: string }[]
  bars: number[]
  rows: { a: string; b: string; c: string; status: 'ok' | 'pending' | 'alert' }[]
  cols: [string, string, string]
}

const views: View[] = [
  {
    key: 'pos',
    label: 'POS',
    icon: ShoppingCartIcon,
    kpis: [
      { label: 'Sales today', value: 'GH₵ 84,210', delta: '+12.4%' },
      { label: 'Transactions', value: '1,932', delta: '+8.1%' },
      { label: 'Active tills', value: '24 / 26', delta: '6 branches' },
    ],
    bars: [38, 52, 46, 70, 64, 88, 76, 92, 68, 80, 96, 72],
    cols: ['Branch', 'Till', 'Total'],
    rows: [
      { a: 'Osu Mall', b: 'Till 04', c: 'GH₵ 1,240.00', status: 'ok' },
      { a: 'Kumasi Central', b: 'Till 11', c: 'GH₵ 386.50', status: 'ok' },
      { a: 'Spintex', b: 'Till 02', c: 'GH₵ 2,018.75', status: 'pending' },
      { a: 'Takoradi', b: 'Till 07', c: 'Low stock: 3 SKUs', status: 'alert' },
    ],
  },
  {
    key: 'eatery',
    label: 'Eatery',
    icon: CakeIcon,
    kpis: [
      { label: 'Open orders', value: '37', delta: '9 in kitchen' },
      { label: 'Tables seated', value: '18 / 24', delta: '75% full' },
      { label: 'Avg. ticket', value: 'GH₵ 142', delta: '+5.3%' },
    ],
    bars: [20, 24, 30, 58, 82, 64, 40, 36, 62, 90, 94, 70],
    cols: ['Order', 'Table', 'Status'],
    rows: [
      { a: '#2041 · Jollof x3', b: 'T-12', c: 'Served', status: 'ok' },
      { a: '#2042 · Banku & Tilapia', b: 'T-05', c: 'In kitchen', status: 'pending' },
      { a: '#2043 · Takeaway', b: 'Rider', c: 'Out for delivery', status: 'ok' },
      { a: 'Rice · 4kg left', b: 'Store', c: 'Reorder', status: 'alert' },
    ],
  },
  {
    key: 'real-estate',
    label: 'Real Estate',
    icon: BuildingOffice2Icon,
    kpis: [
      { label: 'Occupancy', value: '94.2%', delta: '312 units' },
      { label: 'Rent collected', value: 'GH₵ 612k', delta: 'this month' },
      { label: 'Open requests', value: '14', delta: '3 urgent' },
    ],
    bars: [72, 74, 78, 80, 79, 84, 86, 88, 90, 91, 93, 94],
    cols: ['Unit', 'Tenant', 'Status'],
    rows: [
      { a: 'Cantonments B-4', b: 'A. Mensah', c: 'Paid', status: 'ok' },
      { a: 'East Legon 12', b: 'K. Boateng', c: 'Due in 3 days', status: 'pending' },
      { a: 'Airport Res. 7A', b: 'Vacant', c: 'Listed', status: 'pending' },
      { a: 'Labone C-2', b: 'Plumbing', c: 'Urgent', status: 'alert' },
    ],
  },
]

const sidebar = [
  { label: 'Overview', icon: ChartBarIcon },
  { label: 'Inventory', icon: CubeIcon },
  { label: 'Settings', icon: Cog6ToothIcon },
]

const statusStyle = {
  ok: 'bg-mint-400/15 text-mint-300',
  pending: 'bg-amber-400/15 text-amber-400',
  alert: 'bg-rose-400/15 text-rose-300',
}

export function SellixDashboard({ className }: { className?: string }) {
  const [active, setActive] = useState<ModuleKey>('pos')
  const view = views.find((v) => v.key === active)!

  return (
    <WindowFrame url="sellix.bidchale.com" className={className}>
      <div className="grid grid-cols-[auto_1fr] text-left">
        {/* Sidebar */}
        <aside className="hidden w-44 flex-col gap-1 border-r border-white/10 p-3 sm:flex">
          <div className="mb-3 flex items-center gap-2 px-2 pt-1">
            <Image src="/images/brand/sellix-mark.png" alt="" width={22} height={22} />
            <span className="bg-gradient-to-r from-sellix-purple to-sellix-blue bg-clip-text font-display text-sm font-bold text-transparent">sellix</span>
          </div>
          <p className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Modules</p>
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setActive(v.key)}
              aria-pressed={active === v.key}
              className={cn(
                'flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors',
                active === v.key ? 'bg-gradient-to-r from-sellix-purple/40 to-sellix-blue/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white',
              )}
            >
              <v.icon className="h-4 w-4" aria-hidden="true" />
              {v.label}
            </button>
          ))}
          <p className="px-2 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Core</p>
          {sidebar.map((s) => (
            <span key={s.label} className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-500">
              <s.icon className="h-4 w-4" aria-hidden="true" />
              {s.label}
            </span>
          ))}
        </aside>

        {/* Main */}
        <div className="min-w-0 p-4 sm:p-5">
          {/* Mobile tabs */}
          <div className="mb-4 flex gap-1 rounded-lg bg-white/5 p-1 sm:hidden">
            {views.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setActive(v.key)}
                aria-pressed={active === v.key}
                className={cn(
                  'flex-1 rounded-md py-1.5 text-[11px] font-medium',
                  active === v.key ? 'bg-sellix-purple/40 text-white' : 'text-slate-400',
                )}
              >
                {v.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-500">Sellix · {view.label}</p>
                  <p className="font-display text-sm font-semibold text-white">Today’s overview</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-mint-400/10 px-2 py-1 text-[10px] font-medium text-mint-300">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-400" />
                  Live
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {view.kpis.map((k) => (
                  <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3">
                    <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">{k.label}</p>
                    <p className="mt-1 truncate font-display text-xs font-semibold text-white sm:text-base">{k.value}</p>
                    <p className="mt-0.5 truncate text-[10px] text-mint-300">{k.delta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex h-24 items-end gap-1.5 sm:h-28">
                  {view.bars.map((h, i) => (
                    <motion.span
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        'flex-1 rounded-t-[4px]',
                        i === view.bars.length - 2 ? 'bg-sellix-blue' : 'bg-gradient-to-t from-sellix-purple/70 to-sellix-blue/60',
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.04] px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  {view.cols.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                {view.rows.map((r) => (
                  <div
                    key={r.a}
                    className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 border-t border-white/5 px-3 py-2 text-[11px]"
                  >
                    <span className="truncate text-slate-200">{r.a}</span>
                    <span className="truncate text-slate-400">{r.b}</span>
                    <span className={cn('w-fit max-w-full truncate rounded-full px-2 py-0.5 text-[10px]', statusStyle[r.status])}>
                      {r.c}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </WindowFrame>
  )
}
