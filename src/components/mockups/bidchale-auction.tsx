'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ClockIcon, ShieldCheckIcon, EyeIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/cn'

const bidders = ['kwame_a', 'esi.collects', 'yaw-motors', 'ama_k', 'kofi.b', 'abena_d']

type Bid = { id: number; who: string; amount: number; ago: string }

function fmt(n: number) {
  return 'GH₵ ' + n.toLocaleString('en-US')
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Illustrative live auction card in Bidchale's brand (black + yellow). */
export function BidchaleAuction({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [seconds, setSeconds] = useState(4 * 60 + 32)
  const [bids, setBids] = useState<Bid[]>([
    { id: 3, who: 'esi.collects', amount: 2450, ago: 'just now' },
    { id: 2, who: 'yaw-motors', amount: 2400, ago: '18s ago' },
    { id: 1, who: 'kwame_a', amount: 2350, ago: '41s ago' },
  ])

  useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => (s <= 1 ? 4 * 60 + 59 : s - 1)), 1000)
    const bid = setInterval(() => {
      setBids((prev) => {
        const top = prev[0]
        const next: Bid = {
          id: top.id + 1,
          who: bidders[(top.id * 7) % bidders.length],
          amount: top.amount + 50,
          ago: 'just now',
        }
        return [next, ...prev.slice(0, 2).map((b, i) => ({ ...b, ago: `${(i + 1) * 9}s ago` }))]
      })
    }, 3800)
    return () => {
      clearInterval(tick)
      clearInterval(bid)
    }
  }, [])

  const top = bids[0]
  const urgent = seconds < 60

  return (
    <div className={cn('overflow-hidden rounded-2xl bg-white text-left text-bidchale-black shadow-lift ring-1 ring-black/10', className)}>
      {/* Item visual */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src="/images/bidchale/electronics.png"
          alt="Wireless headphones up for auction"
          fill
          sizes="(min-width: 768px) 28rem, 100vw"
          className="object-contain p-6"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-bidchale-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-bidchale-yellow" /> Live
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-neutral-700 shadow-sm">
            <EyeIcon className="h-3 w-3" aria-hidden="true" /> 214 watching
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-neutral-500">Electronics · Ending soon</p>
            <h3 className="truncate font-display text-base font-semibold">Wireless Over-Ear Headphones</h3>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
              <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Escrow-protected
            </p>
          </div>
          <div
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-sm font-semibold tabular-nums',
              urgent ? 'bg-rose-50 text-rose-600' : 'bg-neutral-100 text-bidchale-black',
            )}
            aria-label="Time remaining"
          >
            <ClockIcon className="h-4 w-4" aria-hidden="true" />
            {pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between rounded-xl bg-bidchale-50 p-3 ring-1 ring-bidchale-yellow/40">
          <div>
            <p className="text-[11px] text-neutral-500">Current bid</p>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={top.amount}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                className="font-display text-2xl font-bold tabular-nums"
              >
                {fmt(top.amount)}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="text-[11px] text-neutral-500">{top.id + 23} bids</p>
        </div>

        {!compact && (
          <ul className="mt-3 space-y-1" aria-label="Recent bids">
            <AnimatePresence initial={false}>
              {bids.map((b, i) => (
                <motion.li
                  key={b.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[11px]"
                >
                  <span className="flex items-center gap-2 text-neutral-700">
                    <span
                      className={cn(
                        'grid h-5 w-5 place-items-center rounded-full text-[9px] font-semibold uppercase',
                        i === 0 ? 'bg-bidchale-yellow text-bidchale-black' : 'bg-neutral-100 text-neutral-500',
                      )}
                    >
                      {b.who[0]}
                    </span>
                    {b.who}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-neutral-400">{b.ago}</span>
                    <span className="font-semibold tabular-nums">{fmt(b.amount)}</span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <div className="flex h-10 items-center rounded-lg border border-neutral-200 px-4 text-sm tabular-nums text-neutral-600">
            {fmt(top.amount + 50)}
          </div>
          <span className="inline-flex h-10 items-center rounded-lg bg-bidchale-black px-5 text-sm font-semibold text-white">
            Place bid
          </span>
        </div>
        {!compact && (
          <p className="mt-3 text-center text-[10px] text-neutral-400">Pay with MoMo, Vodafone Cash, AirtelTigo Money or bank transfer</p>
        )}
      </div>
    </div>
  )
}
