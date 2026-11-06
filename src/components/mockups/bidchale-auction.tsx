'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRightIcon, ClockIcon, ShieldCheckIcon, TruckIcon, BuildingStorefrontIcon } from '@heroicons/react/20/solid'
import type { BidchaleLot } from '@/lib/bidchale'
import { cn } from '@/lib/cn'

const LISTINGS_URL = 'https://www.bidchale.com/bidder/all-items'
const LOT_MS = 9000

/**
 * Fallback samples — real Bidchale listing photos stored with the site — used only when the
 * live API is unreachable or has no active auctions. Prices here are illustrative.
 */
const SAMPLE_LOTS: BidchaleLot[] = [
  { id: 's1', title: 'Gold Heart Pendant Necklace', category: 'Jewellery', image: '/images/bidchale/lots/heart-pendant.jpg', currentBid: 180, bidIncrement: 5, bidCount: 12, buyNowPrice: 220, startsAt: null, endsAt: null, pickup: true, delivery: true, url: LISTINGS_URL, live: false },
  { id: 's2', title: 'Gold Mesh Cuff Bracelet', category: 'Jewellery', image: '/images/bidchale/lots/mesh-cuff.jpg', currentBid: 75, bidIncrement: 1, bidCount: 8, buyNowPrice: 80, startsAt: null, endsAt: null, pickup: true, delivery: true, url: LISTINGS_URL, live: false },
  { id: 's3', title: 'Vintage Oval Ladies’ Watch', category: 'Watches', image: '/images/bidchale/lots/ladies-watch.jpg', currentBid: 140, bidIncrement: 0.5, bidCount: 5, buyNowPrice: 150, startsAt: null, endsAt: null, pickup: true, delivery: true, url: LISTINGS_URL, live: false },
]

function fmt(n: number) {
  return 'GH₵ ' + n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** "HH:MM:SS" or "Nd HH:MM" for longer spans. */
function formatSpan(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const d = Math.floor(total / 86400)
  const h = Math.floor((total % 86400) / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return d > 0 ? `${d}d ${pad(h)}:${pad(m)}` : `${pad(h)}:${pad(m)}:${pad(s)}`
}

/** Auction card in Bidchale's brand (black + yellow). Shows live listings when provided. */
export function BidchaleAuction({
  className,
  compact = false,
  float = false,
  lots,
}: {
  className?: string
  compact?: boolean
  /** Gentle floating motion when used as an overlay. */
  float?: boolean
  /** Live listings from the Bidchale API (falls back to bundled samples). */
  lots?: BidchaleLot[]
}) {
  const items = useMemo(() => (lots && lots.length ? lots : SAMPLE_LOTS), [lots])
  const live = items[0]?.live ?? false

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [now, setNow] = useState<number | null>(null)

  const running = inView && !reduce

  // Clock for countdowns (client-only to avoid hydration mismatch).
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  // Rotate through listings.
  useEffect(() => {
    if (!running || items.length < 2) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), LOT_MS)
    return () => clearTimeout(t)
  }, [running, index, items.length])

  const lot = items[index % items.length]

  let timerLabel = 'Ends in'
  let timerValue = '—'
  let urgent = false
  if (now !== null && lot.endsAt) {
    const start = lot.startsAt ? new Date(lot.startsAt).getTime() : null
    const end = new Date(lot.endsAt).getTime()
    if (start && start > now) {
      timerLabel = 'Starts in'
      timerValue = formatSpan(start - now)
    } else {
      timerValue = formatSpan(end - now)
      urgent = end - now < 60 * 60 * 1000
    }
  } else if (!lot.live) {
    timerLabel = 'Ending soon'
    timerValue = 'Live'
  }

  return (
    <motion.div
      ref={ref}
      animate={float && !reduce ? { y: [0, -10, 0] } : undefined}
      transition={float ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
      className={cn('overflow-hidden rounded-2xl bg-white text-left text-bidchale-black shadow-lift ring-1 ring-black/10', className)}
    >
      {/* Item visual */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <AnimatePresence initial={false}>
          <motion.div
            key={lot.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={lot.image} alt={`${lot.title} on Bidchale`} fill sizes="(min-width: 768px) 28rem, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-bidchale-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-bidchale-yellow" /> {timerLabel === 'Starts in' ? 'Upcoming' : 'Live'}
          </span>
          {live && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-neutral-700 shadow-sm">Live on bidchale.com</span>
          )}
        </div>
        {items.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
            {items.map((l, i) => (
              <span key={l.id} className={cn('h-1.5 rounded-full transition-all duration-500', i === index % items.length ? 'w-5 bg-bidchale-yellow' : 'w-1.5 bg-white/70')} />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={lot.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="min-w-0"
            >
              <p className="text-[11px] text-neutral-500">{lot.category}</p>
              <h3 className="truncate font-display text-base font-semibold">{lot.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
                <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Escrow-protected
              </p>
            </motion.div>
          </AnimatePresence>
          <div
            className={cn(
              'flex shrink-0 flex-col items-end rounded-lg px-2.5 py-1.5 transition-colors',
              urgent ? 'bg-rose-50 text-rose-600' : 'bg-neutral-100 text-bidchale-black',
            )}
            aria-label={`${timerLabel} ${timerValue}`}
          >
            <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-500">{timerLabel}</span>
            <span className="flex items-center gap-1 font-mono text-sm font-semibold tabular-nums">
              <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {timerValue}
            </span>
          </div>
        </div>

        {/* Current bid — flashes when the listing changes */}
        <motion.div
          key={lot.id}
          initial={{ boxShadow: '0 0 0 3px rgba(251,202,8,0.9)' }}
          animate={{ boxShadow: '0 0 0 0px rgba(251,202,8,0)' }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="mt-4 flex items-end justify-between rounded-xl bg-bidchale-50 p-3 ring-1 ring-bidchale-yellow/40"
        >
          <div>
            <p className="text-[11px] text-neutral-500">{lot.bidCount > 0 ? 'Current bid' : 'Starting bid'}</p>
            <p className="font-display text-2xl font-bold tabular-nums">{fmt(lot.currentBid)}</p>
          </div>
          <p className="text-[11px] text-neutral-500">
            {lot.bidCount} {lot.bidCount === 1 ? 'bid' : 'bids'}
          </p>
        </motion.div>

        {!compact && (
          <dl className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-lg bg-neutral-50 px-3 py-2">
              <dt className="text-neutral-500">Buy now</dt>
              <dd className="font-semibold tabular-nums">{lot.buyNowPrice ? fmt(lot.buyNowPrice) : '—'}</dd>
            </div>
            <div className="rounded-lg bg-neutral-50 px-3 py-2">
              <dt className="text-neutral-500">Next bid from</dt>
              <dd className="font-semibold tabular-nums">{fmt(lot.currentBid + lot.bidIncrement)}</dd>
            </div>
            <div className="col-span-2 flex flex-wrap gap-3 px-1 pt-1 text-neutral-600">
              {lot.pickup && (
                <span className="flex items-center gap-1">
                  <BuildingStorefrontIcon className="h-3.5 w-3.5" aria-hidden="true" /> Pickup
                </span>
              )}
              {lot.delivery && (
                <span className="flex items-center gap-1">
                  <TruckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Delivery
                </span>
              )}
            </div>
          </dl>
        )}

        <a
          href={lot.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex h-10 items-center justify-center gap-1.5 rounded-lg bg-bidchale-black text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Bid on Bidchale <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
        </a>
        {!compact && (
          <p className="mt-3 text-center text-[10px] text-neutral-400">Pay with MoMo, Vodafone Cash, AirtelTigo Money or bank transfer</p>
        )}
      </div>
    </motion.div>
  )
}
