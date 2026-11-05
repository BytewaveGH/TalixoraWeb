import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowUpRightIcon,
  BanknotesIcon,
  BoltIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  LockClosedIcon,
  MapPinIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SignalIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/reveal'
import { BidchaleAuction } from '@/components/mockups/bidchale-auction'
import { BidchaleLogo } from '@/components/product-logos'
import { Faq } from '@/components/faq'
import { bidchale, links } from '@/content/site'

export const metadata: Metadata = {
  title: 'Bidchale — Ghana’s online bidding marketplace',
  description:
    'Bidchale by Talixora: bid in real time or buy now on electronics, phones, home goods and more. Pay with MoMo, escrow-protected, delivered to your door across Ghana.',
}

const wayIcons = [BoltIcon, BuildingStorefrontIcon, ScaleIcon, SignalIcon]
const protectionIcons = [LockClosedIcon, ShieldCheckIcon, ClockIcon, ScaleIcon]

const bidchaleFaq = [
  {
    q: 'How long do I have to pay after winning?',
    a: 'Winners typically have 24–48 hours to complete payment. If payment isn’t made in time, the item may be offered to the next highest bidder.',
  },
  {
    q: 'How is my payment protected?',
    a: 'Payments are held in escrow until you confirm you’ve received your item — so the vendor is only paid once you have it.',
  },
  {
    q: 'Which payment methods are accepted?',
    a: 'MTN Mobile Money, Vodafone Cash, AirtelTigo Money and major bank transfers, all in Ghana Cedis (GHS).',
  },
  {
    q: 'Can I sell on Bidchale?',
    a: 'Yes. Vendors can list items for auction or Buy Now. Every listing is reviewed by the Bidchale team before it goes live.',
  },
]

function YellowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bidchale-yellow px-6 font-semibold text-black transition hover:brightness-95"
    >
      {children} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

export default function BidchalePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-bidchale-black pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <Image
          src="/images/bidchale/landing.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-top opacity-45"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="container relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <BidchaleLogo tone="light" height={44} />
            <h1 className="h-display mt-8 text-[2.6rem] leading-[1.04] sm:text-6xl">
              Bid smart. Win big. <span className="text-bidchale-yellow">Shop with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200 text-pretty">{bidchale.summary}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <YellowLink href={links.bidchale}>Start bidding</YellowLink>
              <a
                href={`mailto:${links.bidchaleEmail}?subject=${encodeURIComponent('Selling on Bidchale')}`}
                className="inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/25 transition hover:bg-white/10"
              >
                Become a vendor
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><LockClosedIcon className="h-4 w-4 text-bidchale-yellow" /> Escrow-protected</li>
              <li className="flex items-center gap-2"><BanknotesIcon className="h-4 w-4 text-bidchale-yellow" /> Pay with MoMo</li>
              <li className="flex items-center gap-2"><TruckIcon className="h-4 w-4 text-bidchale-yellow" /> Doorstep delivery</li>
            </ul>
          </Reveal>
          <Reveal delay={0.12} y={30} className="mx-auto w-full max-w-md">
            <BidchaleAuction />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <Section>
        <SectionHeading align="center" eyebrow="How it works" title="Simple, transparent and secure." />
        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent md:block" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {bidchale.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.08} className="text-center">
                  <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-full bg-bidchale-black font-display text-sm font-bold text-bidchale-yellow ring-8 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-600">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Ways to shop */}
      <Section tone="muted">
        <SectionHeading eyebrow="Ways to shop" title="Bid live — or buy it now." description="Bidchale gives you more than one way to land a great deal." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bidchale.ways.map((w, i) => {
            const Icon = wayIcons[i]
            return (
              <Reveal key={w.title} delay={i * 0.05} className="card h-full p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-bidchale-yellow text-black">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{w.body}</p>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Categories */}
      <Section>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Shop by category" title="Thousands of items, every day." />
          <Reveal>
            <YellowLink href={links.bidchale}>Browse all items</YellowLink>
          </Reveal>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {bidchale.categories.map((c, i) => (
            <li key={c.name}>
              <Reveal delay={i * 0.04}>
                <a
                  href={links.bidchale}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-square bg-neutral-100">
                    <Image src={c.image} alt={c.name} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-contain p-5 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-ink-900">{c.name}</p>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Payments & protection */}
      <section className="relative isolate overflow-hidden bg-bidchale-black py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-96 w-96 rounded-full bg-bidchale-yellow/15 blur-[120px]" />
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Buyer protection"
              title="Your money is safe until your item arrives."
              description="Bidchale holds every payment in escrow and only releases it to the vendor once you confirm receipt."
            />
            <Reveal delay={0.08}>
              <p className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-bidchale-yellow">Pay your way · GHS</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {bidchale.payments.map((p) => (
                  <li key={p} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-10 flex items-center gap-2 text-sm text-slate-400">
                <MapPinIcon className="h-4 w-4 text-bidchale-yellow" aria-hidden="true" />
                Serving {bidchale.cities.join(', ')}.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {bidchale.protection.map((p, i) => {
              const Icon = protectionIcons[i]
              return (
                <Reveal key={p.title} delay={i * 0.05} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                  <Icon className="h-7 w-7 text-bidchale-yellow" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vendors + FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-bidchale-50 p-8 ring-1 ring-bidchale-yellow/40 sm:p-10">
              <Image src="/images/bidchale/person.png" alt="" width={220} height={287} className="pointer-events-none absolute -bottom-2 right-0 hidden w-44 sm:block" />
              <p className="eyebrow text-black">For vendors</p>
              <h2 className="h-display mt-4 max-w-sm text-3xl">Reach buyers who are ready to pay.</h2>
              <ul className="mt-6 max-w-sm space-y-3 text-slate-700">
                <li>• List items for auction or Buy Now</li>
                <li>• Let competition set the true market price</li>
                <li>• Get paid securely once the buyer confirms receipt</li>
              </ul>
              <a
                href={`mailto:${links.bidchaleEmail}?subject=${encodeURIComponent('Selling on Bidchale')}`}
                className="mt-8 inline-flex h-12 items-center rounded-full bg-black px-6 font-semibold text-white transition hover:bg-neutral-800"
              >
                Start selling
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="h-display text-3xl">Questions, answered</h2>
            <div className="mt-6">
              <Faq items={bidchaleFaq} />
            </div>
            <p className="mt-6 text-sm text-slate-500">
              More help:{' '}
              <a href={`mailto:${links.bidchaleEmail}`} className="font-medium text-ink-900 underline-offset-4 hover:underline">
                {links.bidchaleEmail}
              </a>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-bidchale-yellow px-6 py-16 text-center sm:px-16 sm:py-20">
              <h2 className="h-display mx-auto max-w-2xl text-3xl leading-tight text-black sm:text-5xl">Your next great deal is one bid away.</h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-black/70">Create a free account and start bidding on bidchale.com.</p>
              <a
                href={links.bidchale}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 font-semibold text-white transition hover:bg-neutral-800"
              >
                Go to Bidchale <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
