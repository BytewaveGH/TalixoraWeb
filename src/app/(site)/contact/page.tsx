import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ArrowUpRightIcon, ClockIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact-form'
import { links, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Book a Sellix demo, request software consultancy or hire a dedicated developer from ${site.name}.`,
}

const details = [
  { icon: EnvelopeIcon, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: MapPinIcon, label: 'Based in', value: site.location },
  { icon: ClockIcon, label: 'Response time', value: 'Within one business day' },
]

const nextSteps = [
  'We reply within one business day.',
  'We sign an NDA if you need one.',
  'You talk to product and engineering experts — not account managers.',
]

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-32 sm:pt-44">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[520px] bg-grid-light bg-[size:56px_56px] mask-radial" />
      <div aria-hidden="true" className="absolute -top-32 right-0 h-80 w-[620px] rounded-full bg-brand-200/50 blur-[100px]" />
      <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="h-display mt-5 text-[2.6rem] leading-[1.04] sm:text-6xl">Let’s talk about your business.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            Book a Sellix demo, ask about consultancy, or tell us the developer you need. A real person from our team will reply.
          </p>

          <dl className="mt-12 space-y-6">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <d.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-slate-500">{d.label}</dt>
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

          <div className="mt-12 rounded-2xl border border-slate-200 p-6">
            <h2 className="font-display text-lg font-semibold">What happens next</h2>
            <ol className="mt-4 space-y-3">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex gap-3 text-slate-600">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-900 text-xs font-semibold text-white">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <a href={links.sellixApp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 font-medium text-ink-900 hover:bg-slate-100">
              Sellix customer sign-in <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={`mailto:${links.bidchaleEmail}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 font-medium text-ink-900 hover:bg-slate-100">
              Bidchale support <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-6 shadow-lift sm:p-10">
            <Suspense fallback={<div className="h-[640px]" />}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
