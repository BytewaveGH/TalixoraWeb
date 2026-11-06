import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ClockIcon,
  EnvelopeIcon,
  LightBulbIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { DarkBackdrop } from '@/components/dark-backdrop'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact-form'
import { Faq } from '@/components/faq'
import { contactHref, faqs, links, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Book a Sellix demo, request software consultancy or hire a dedicated developer from ${site.name}.`,
}

const routes = [
  {
    title: 'Book a Sellix demo',
    body: 'See the module for your industry.',
    href: `${contactHref('sellix-pos')}#form`,
    mark: '/images/brand/sellix-mark-96.png',
    markBg: 'bg-sellix-50',
  },
  {
    title: 'Hire a developer',
    body: 'A Talixora engineer for your team.',
    href: `${contactHref('developer')}#form`,
    icon: UserGroupIcon,
  },
  {
    title: 'Software consultancy',
    body: 'Advice, scoping and project rescue.',
    href: `${contactHref('consultancy')}#form`,
    icon: LightBulbIcon,
  },
  {
    title: 'Bidchale support',
    body: 'Buying, selling or a payment question.',
    href: `mailto:${links.bidchaleEmail}`,
    mark: '/images/brand/bidchale-icon-96.png',
    markBg: 'bg-bidchale-yellow',
    external: true,
  },
]

const details = [
  { icon: EnvelopeIcon, label: 'Email us', value: site.email, href: `mailto:${site.email}` },
  { icon: MapPinIcon, label: 'Based in', value: site.location },
  { icon: ClockIcon, label: 'Response time', value: 'Within one business day' },
]

const nextSteps = [
  { title: 'We reply within a day', body: 'A product or engineering lead reads every message.' },
  { title: 'A short discovery call', body: 'We learn how your business works today. NDA on request.' },
  { title: 'A clear proposal', body: 'A demo, a scope and a price — or the right developer for your team.' },
]

export default function ContactPage() {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative isolate overflow-hidden pb-40 pt-32 text-white sm:pb-48 sm:pt-40">
        <DarkBackdrop />
        <div className="container relative">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-mint-300">Contact</p>
            <h1 className="h-display mt-5 text-[2.6rem] leading-[1.03] sm:text-6xl">
              Let’s talk about <span className="text-gradient">your business.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Tell us what you need and a real person from our team will get back to you within one business day.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((r, i) => (
              <li key={r.title}>
                <Reveal delay={i * 0.05} className="h-full">
                  <Link
                    href={r.href}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.08]"
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${r.markBg ?? 'bg-white/10 text-mint-300'}`}>
                      {r.mark ? (
                        <Image src={r.mark} alt="" width={24} height={24} unoptimized className="h-6 w-6 object-contain" />
                      ) : r.icon ? (
                        <r.icon className="h-5 w-5" aria-hidden="true" />
                      ) : null}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 font-semibold">
                        {r.title}
                        {r.external ? (
                          <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                        ) : (
                          <ArrowRightIcon className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        )}
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-400">{r.body}</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ Form + info */}
      <section className="relative z-10 -mt-28 pb-20 sm:-mt-32 sm:pb-28">
        <div className="container grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          {/* Form */}
          <Reveal className="order-1">
            <div id="form" className="scroll-mt-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_32px_80px_-24px_rgba(16,24,40,.35)] sm:p-10">
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="h-display text-2xl sm:text-3xl">Send us a message</h2>
                <p className="mt-2 text-slate-500">Tell us a little about what you need — it only takes a minute.</p>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-100">
                  <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" /> NDA available on request
                </p>
              </div>
              <Suspense fallback={<div className="h-[640px]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>

          {/* Info panel */}
          <div className="order-2 space-y-6 lg:pt-0">
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
                <div className="relative aspect-[16/9]">
                  <Image src="/images/photos/team-meeting.jpg" alt="The Talixora team in Accra" fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                  <p className="absolute bottom-4 left-5 right-5 font-display text-lg font-semibold text-white">You’ll talk to engineers, not account managers.</p>
                </div>
                <dl className="divide-y divide-slate-100">
                  {details.map((d) => (
                    <div key={d.label} className="flex items-center gap-4 px-6 py-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                        <d.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs text-slate-500">{d.label}</dt>
                        <dd className="font-medium text-ink-900">
                          {d.href ? (
                            <a href={d.href} className="hover:text-brand-600">
                              {d.value}
                            </a>
                          ) : (
                            d.value
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-[2rem] bg-ink-900 p-6 text-white sm:p-8">
                <h2 className="font-display text-lg font-semibold">What happens next</h2>
                <ol className="relative mt-6 space-y-6 border-l border-white/15 pl-6">
                  {nextSteps.map((s, i) => (
                    <li key={s.title} className="relative">
                      <span className="absolute -left-[2.15rem] top-0 grid h-7 w-7 place-items-center rounded-full bg-mint-400 font-display text-xs font-bold text-ink-900">
                        {i + 1}
                      </span>
                      <p className="font-semibold">{s.title}</p>
                      <p className="mt-0.5 text-sm text-slate-400">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-ink-900">Already a customer?</p>
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {[
                    { label: 'Sellix Eatery', href: links.sellixEatery },
                    { label: 'Sellix Real Estate', href: links.sellixRealEstate },
                    { label: 'Sellix sign-in', href: links.sellixApp },
                    { label: 'bidchale.com', href: links.bidchale },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 font-medium text-ink-900 ring-1 ring-slate-200 transition hover:ring-brand-300"
                    >
                      {l.label} <ArrowUpRightIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Before you get in touch</h2>
            <p className="mt-4 text-slate-600">
              More answers on our{' '}
              <Link href="/about#faq" className="font-medium text-brand-600 underline-offset-4 hover:underline">
                About page
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Faq items={[...faqs[2].items, faqs[1].items[2]]} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
