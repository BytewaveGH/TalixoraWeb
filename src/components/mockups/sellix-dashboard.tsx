'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  BellAlertIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  CubeIcon,
  FireIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { WindowFrame } from './window-frame'
import { cn } from '@/lib/cn'

type ScreenKey = 'pos' | 'eats' | 'homes'

const SCREENS: { key: ScreenKey; label: string; icon: typeof FireIcon }[] = [
  { key: 'pos', label: 'Counter POS', icon: ShoppingCartIcon },
  { key: 'eats', label: 'Sellix Eats', icon: FireIcon },
  { key: 'homes', label: 'Sellix Homes', icon: BuildingOffice2Icon },
]

const CYCLE_MS = 6000

const toasts: Record<ScreenKey, { icon: typeof FireIcon; title: string; body: string; tone: string }[]> = {
  pos: [
    { icon: CheckCircleIcon, title: 'Sale complete', body: 'Till 04 · Osu Mall · GH₵ 1,240.00', tone: 'text-mint-300' },
    { icon: BellAlertIcon, title: 'Low stock', body: 'Cooking oil 5L — reorder soon', tone: 'text-amber-400' },
  ],
  eats: [
    { icon: ShoppingBagIcon, title: 'New pickup order', body: '#2046 · 2 × Shawarma, 1 × Iced coffee', tone: 'text-sellix-blue' },
    { icon: TruckIcon, title: 'Out for delivery', body: '#2043 · Jollof & chicken', tone: 'text-mint-300' },
  ],
  homes: [
    { icon: CheckCircleIcon, title: 'Rent paid', body: 'Room B-4 · East Legon · GH₵ 1,800', tone: 'text-mint-300' },
    { icon: ChatBubbleLeftRightIcon, title: 'New WhatsApp enquiry', body: '2-bed apartment · Spintex', tone: 'text-sellix-blue' },
  ],
}

/** Number that counts up to `value` when it first comes into view. */
function CountUp({ value, prefix = '', decimals = 0 }: { value: number; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

const posSales = [
  { branch: 'Osu Mall', till: 'Till 04', total: 'GH₵ 1,240.00' },
  { branch: 'Kumasi Central', till: 'Till 11', total: 'GH₵ 386.50' },
  { branch: 'Spintex', till: 'Till 02', total: 'GH₵ 2,018.75' },
  { branch: 'Takoradi', till: 'Till 07', total: 'GH₵ 642.00' },
  { branch: 'Tema Comm. 1', till: 'Till 03', total: 'GH₵ 412.00' },
  { branch: 'Achimota', till: 'Till 09', total: 'GH₵ 1,105.20' },
]

function PosScreen() {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setOffset((o) => (o + 1) % posSales.length), 1800)
    return () => clearInterval(t)
  }, [])
  const rows = [0, 1, 2, 3].map((i) => posSales[(offset + i) % posSales.length])
  const bars = [38, 52, 46, 70, 64, 88, 76, 92, 68, 80, 96, 72]

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: 'Sales today', node: <CountUp value={84210} prefix="GH₵ " />, delta: '+12.4%' },
          { label: 'Transactions', node: <CountUp value={1932} />, delta: '+8.1%' },
          { label: 'Active tills', node: <>24 / 26</>, delta: '6 branches' },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3">
            <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">{k.label}</p>
            <p className="mt-1 truncate font-display text-xs font-semibold text-white sm:text-base">{k.node}</p>
            <p className="mt-0.5 truncate text-[10px] text-mint-300">{k.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="flex h-24 items-end gap-1.5 sm:h-28">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={cn('flex-1 rounded-t-[4px]', i === bars.length - 2 ? 'bg-sellix-blue' : 'bg-gradient-to-t from-sellix-purple/70 to-sellix-blue/60')}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.04] px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
          <span>Branch</span>
          <span>Till</span>
          <span>Total</span>
        </div>
        <ul className="relative">
          <AnimatePresence initial={false} mode="popLayout">
            {rows.map((r, i) => (
              <motion.li
                key={r.branch}
                layout
                initial={{ opacity: 0, y: -16, backgroundColor: 'rgba(22,165,240,0.18)' }}
                animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(22,165,240,0)' }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], backgroundColor: { duration: 1.4 } }}
                className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 border-t border-white/5 px-3 py-2 text-[11px]"
              >
                <span className="truncate text-slate-200">{r.branch}</span>
                <span className="truncate text-slate-400">{r.till}</span>
                <span className={cn('w-fit truncate rounded-full px-2 py-0.5 text-[10px]', i === 0 ? 'bg-sellix-blue/20 text-sellix-blue' : 'bg-mint-400/15 text-mint-300')}>
                  {r.total}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}

type Ticket = { id: number; items: string; mode: 'Pickup' | 'Delivery' | 'Dine-in'; stage: 0 | 1 | 2 }

const ticketPool: Omit<Ticket, 'id' | 'stage'>[] = [
  { items: '2 × Jollof & chicken', mode: 'Delivery' },
  { items: '1 × Shawarma, 1 × Smoothie', mode: 'Pickup' },
  { items: '2 × Iced coffee, 1 × Croissant', mode: 'Dine-in' },
  { items: '1 × Pizza, 2 × Sobolo', mode: 'Delivery' },
  { items: '3 × Waakye special', mode: 'Pickup' },
  { items: '2 × Cocktails', mode: 'Dine-in' },
]

const modeStyle = {
  Pickup: 'bg-sellix-blue/20 text-sellix-blue',
  Delivery: 'bg-mint-400/15 text-mint-300',
  'Dine-in': 'bg-[#C58CFF]/20 text-[#C58CFF]',
}

function EatsScreen() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 2041, ...ticketPool[0], stage: 2 },
    { id: 2042, ...ticketPool[1], stage: 1 },
    { id: 2043, ...ticketPool[2], stage: 1 },
    { id: 2044, ...ticketPool[3], stage: 0 },
  ])

  // Orders flow naturally: one ticket moves per beat, new orders arrive, old "ready" orders are collected.
  useEffect(() => {
    let beat = 0
    const t = setInterval(() => {
      beat += 1
      setTickets((prev) => {
        let next = [...prev]
        if (beat % 2 === 0) {
          // A preparing order becomes ready.
          const i = next.findIndex((tk) => tk.stage === 1)
          if (i >= 0) next[i] = { ...next[i], stage: 2 }
          // Collected: keep at most one ready ticket on screen.
          const ready = next.filter((tk) => tk.stage === 2)
          if (ready.length > 1) next = next.filter((tk) => tk.id !== ready[0].id)
        } else {
          // Kitchen accepts the oldest new order, and a fresh order arrives.
          const i = next.findIndex((tk) => tk.stage === 0)
          if (i >= 0) next[i] = { ...next[i], stage: 1 }
          const newest = Math.max(...next.map((p) => p.id)) + 1
          next.push({ id: newest, ...ticketPool[newest % ticketPool.length], stage: 0 })
        }
        return next.slice(-6)
      })
    }, 1500)
    return () => clearInterval(t)
  }, [])

  const columns = ['New', 'Preparing', 'Ready'] as const

  return (
    <div>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-slate-500">
        <MagnifyingGlassIcon className="h-3.5 w-3.5" aria-hidden="true" /> Search places and dishes
      </div>
      <div className="mt-2 flex gap-1.5 overflow-hidden">
        {['Jollof', 'Shawarma', 'Coffee', 'Pizza', 'Smoothie', 'Cocktails'].map((c) => (
          <span key={c} className="whitespace-nowrap rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-slate-300">
            {c}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {columns.map((col, ci) => (
          <div key={col} className="min-h-[13rem] rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:min-h-[19.5rem]">
            <p className="flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {col}
              <span className="rounded-full bg-white/10 px-1.5 text-slate-300">{tickets.filter((t) => t.stage === ci).length}</span>
            </p>
            <ul className="mt-2 space-y-1.5">
              <AnimatePresence initial={false} mode="popLayout">
                {tickets
                  .filter((t) => t.stage === ci)
                  .map((t) => (
                    <motion.li
                      key={t.id}
                      layoutId={`ticket-${t.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className={cn('rounded-lg border p-2', ci === 2 ? 'border-mint-400/40 bg-mint-400/10' : 'border-white/10 bg-ink-800')}
                    >
                      <p className="flex items-center justify-between text-[10px] font-semibold text-white">
                        #{t.id}
                        <span className={cn('rounded-full px-1.5 py-px text-[9px] font-medium', modeStyle[t.mode])}>{t.mode}</span>
                      </p>
                      <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-400">{t.items}</p>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const homes = [
  { title: 'Single room · Madina', price: 'GH₵ 650', img: '/images/photos/real-estate.jpg', badge: 'Free now' },
  { title: '2-bed apartment · Spintex', price: 'GH₵ 2,400', img: '/images/photos/real-estate-2.jpg', badge: 'Free 1 Dec' },
  { title: 'Studio · East Legon', price: 'GH₵ 1,800', img: '/images/photos/accra.jpg', badge: 'Short stay' },
]

function HomesScreen() {
  const [paid, setPaid] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setPaid(94), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        {['All', 'Monthly rent', 'Short stays'].map((t, i) => (
          <span key={t} className={cn('rounded-full px-2.5 py-1 text-[10px]', i === 0 ? 'bg-white text-ink-900' : 'bg-white/5 text-slate-300')}>
            {t}
          </span>
        ))}
        <span className="ml-auto rounded-full bg-mint-400/15 px-2.5 py-1 text-[10px] font-medium text-mint-300">● Free now</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {homes.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
          >
            <div className="relative aspect-[4/3]">
              <Image src={h.img} alt="" fill sizes="160px" className="object-cover" />
              <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-px text-[9px] font-semibold text-ink-900">{h.badge}</span>
            </div>
            <div className="p-2">
              <p className="truncate text-[10px] font-semibold text-white">{h.title}</p>
              <p className="text-[10px] text-slate-400">{h.price} / month</p>
              <p className="mt-1.5 flex items-center justify-center gap-1 rounded-md bg-[#25D366]/15 py-1 text-[9px] font-semibold text-[#5BE38D]">
                <ChatBubbleLeftRightIcon className="h-3 w-3" aria-hidden="true" /> WhatsApp owner
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div>
          <p className="text-[10px] text-slate-500">Rent tracking · November</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-sellix-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${paid}%` }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-slate-400">29 of 31 tenants paid · 2 due this week</p>
        </div>
        <p className="font-display text-lg font-semibold text-white sm:text-xl">
          <CountUp value={94} />%
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Showcase                                                            */
/* ------------------------------------------------------------------ */

/**
 * Animated Sellix product showcase. Auto-cycles between Counter POS, Sellix Eats and Sellix Homes,
 * pauses on hover, and can be driven manually from the sidebar / tabs.
 */
export function SellixDashboard({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { margin: '-80px' })
  const [active, setActive] = useState<ScreenKey>('pos')
  const [paused, setPaused] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [toastIndex, setToastIndex] = useState(0)

  const running = inView && !paused && !reduce

  // Auto-advance screens.
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => {
      setActive((a) => SCREENS[(SCREENS.findIndex((s) => s.key === a) + 1) % SCREENS.length].key)
      setCycle((c) => c + 1)
    }, CYCLE_MS)
    return () => clearTimeout(t)
  }, [running, active, cycle])

  // Rotate notifications within a screen.
  useEffect(() => {
    setToastIndex(0)
    if (reduce) return
    const t = setInterval(() => setToastIndex((i) => i + 1), 2800)
    return () => clearInterval(t)
  }, [active, reduce])

  const select = (key: ScreenKey) => {
    setActive(key)
    setCycle((c) => c + 1)
  }

  const screen = SCREENS.find((s) => s.key === active)!
  const toastList = toasts[active]
  const toast = toastList[toastIndex % toastList.length]

  return (
    <div ref={rootRef} className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <WindowFrame url={`sellix.bidchale.com/${active === 'eats' ? 'en/eat' : active === 'homes' ? 'en/rentals' : 'pos'}`} className={className}>
        <div className="grid grid-cols-[auto_1fr] text-left">
          {/* Sidebar */}
          <aside className="hidden w-44 flex-col gap-1 border-r border-white/10 p-3 sm:flex">
            <div className="mb-3 flex items-center gap-2 px-2 pt-1">
              <Image src="/images/brand/sellix-mark-96.png" alt="" width={22} height={22} unoptimized />
              <span className="bg-gradient-to-r from-sellix-purple to-sellix-blue bg-clip-text font-display text-sm font-bold text-transparent">sellix</span>
            </div>
            <p className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Apps</p>
            {SCREENS.map((s) => {
              const on = s.key === active
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => select(s.key)}
                  aria-pressed={on}
                  className={cn(
                    'relative flex items-center gap-2 overflow-hidden rounded-lg px-2 py-1.5 text-xs font-medium transition-colors',
                    on ? 'bg-gradient-to-r from-sellix-purple/40 to-sellix-blue/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                  {s.label}
                  {on && running && (
                    <motion.span
                      key={`${s.key}-${cycle}`}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[2px] bg-sellix-blue"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
            <p className="px-2 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Core</p>
            {[
              { label: 'Reports', icon: ChartBarIcon },
              { label: 'Inventory', icon: CubeIcon },
              { label: 'Settings', icon: Cog6ToothIcon },
            ].map((s) => (
              <span key={s.label} className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-500">
                <s.icon className="h-4 w-4" aria-hidden="true" />
                {s.label}
              </span>
            ))}
          </aside>

          {/* Main */}
          <div className="relative min-w-0 p-4 sm:p-5">
            {/* Mobile tabs */}
            <div className="mb-4 flex gap-1 rounded-lg bg-white/5 p-1 sm:hidden">
              {SCREENS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => select(s.key)}
                  aria-pressed={active === s.key}
                  className={cn('flex-1 rounded-md py-1.5 text-[11px] font-medium', active === s.key ? 'bg-sellix-purple/40 text-white' : 'text-slate-400')}
                >
                  {s.label.replace('Sellix ', '')}
                </button>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-500">Sellix · {screen.label}</p>
                <p className="font-display text-sm font-semibold text-white">
                  {active === 'pos' ? 'Today’s overview' : active === 'eats' ? 'Live orders' : 'Rooms & apartments'}
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-mint-400/10 px-2 py-1 text-[10px] font-medium text-mint-300">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-400" />
                Live
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[22rem] sm:min-h-[26.5rem]"
              >
                {active === 'pos' && <PosScreen />}
                {active === 'eats' && <EatsScreen />}
                {active === 'homes' && <HomesScreen />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </WindowFrame>

      {/* Floating notification */}
      <div className="pointer-events-none absolute -top-5 right-4 z-10 hidden sm:block lg:-right-6" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${toastIndex}`}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-64 items-start gap-3 rounded-2xl border border-white/10 bg-ink-800/95 p-3 shadow-glow backdrop-blur"
          >
            <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10', toast.tone)}>
              <toast.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-white">{toast.title}</span>
              <span className="block truncate text-[11px] text-slate-400">{toast.body}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
