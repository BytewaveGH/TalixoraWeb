import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRightIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ButtonLink } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/reveal'
import { SellixDashboard } from '@/components/mockups/sellix-dashboard'
import { SellixLogo } from '@/components/product-logos'
import { Faq } from '@/components/faq'
import { CtaBand } from '@/components/cta-band'
import { contactHref, faqs, links, sellixCore, sellixModules } from '@/content/site'

export const metadata: Metadata = {
  title: 'Sellix — ERPs for real estate, eateries and enterprise POS',
  description:
    'Sellix by Talixora: industry ERPs for real estate, eateries and high-volume retail POS, sharing inventory, accounting and multi-branch control.',
}

const moduleTopic = { 'real-estate': 'sellix-real-estate', eatery: 'sellix-eatery', pos: 'sellix-pos' } as const

export default function SellixPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-900 pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-dark bg-[size:56px_56px] mask-radial opacity-60" />
        <div aria-hidden="true" className="absolute -left-32 -top-32 -z-10 h-[480px] w-[480px] rounded-full bg-sellix-purple/40 blur-[120px]" />
        <div aria-hidden="true" className="absolute -right-32 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-sellix-blue/30 blur-[120px]" />
        <div className="container relative grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <SellixLogo size="lg" />
            <h1 className="h-display mt-8 text-[2.6rem] leading-[1.04] sm:text-6xl">
              One ERP.{' '}
              <span className="bg-gradient-to-r from-sellix-purple via-brand-300 to-sellix-blue bg-clip-text text-transparent">
                Built for your industry.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 text-pretty">
              Sellix brings sales, stock, staff and finances into one system — with dedicated modules for real estate,
              eateries and high-volume retail, and a secure workspace for every business.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref('sellix-pos')} variant="light" size="lg" arrow>
                Book a Sellix demo
              </ButtonLink>
              <a
                href={links.sellixApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/10"
              >
                Sign in to your business <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} y={30}>
            <SellixDashboard />
            <p className="mt-3 text-center text-xs text-slate-500">Interactive preview — switch modules in the sidebar.</p>
          </Reveal>
        </div>
      </section>

      {/* Module tabs strip */}
      <nav aria-label="Sellix modules" className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur lg:top-[72px]">
        <div className="container flex gap-1 overflow-x-auto py-3">
          {sellixModules.map((m) => (
            <a key={m.key} href={`#${m.key}`} className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-sellix-50 hover:text-sellix-purple">
              {m.name}
            </a>
          ))}
          <a href="#core" className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-sellix-50 hover:text-sellix-purple">
            Shared core
          </a>
        </div>
      </nav>

      {/* Modules */}
      {sellixModules.map((m, i) => (
        <section key={m.key} id={m.key} className={`scroll-mt-32 py-20 sm:py-24 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
          <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={i % 2 === 1 ? 'lg:order-last' : ''}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
                <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink-900 shadow backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-sellix-gradient" />
                  {m.name}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="eyebrow text-sellix-purple">0{i + 1} · {m.tagline}</p>
              <h2 className="h-display mt-4 text-3xl leading-[1.1] sm:text-[2.6rem]">{m.name}</h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">{m.summary}</p>
              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                {m.features.map((f) => (
                  <div key={f.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sellix-50 text-sellix-purple">
                      <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="font-semibold text-ink-900">{f.title}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-slate-600">{f.body}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <ButtonLink href={contactHref(moduleTopic[m.key])} arrow>
                  Book a {m.short} demo
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* Core */}
      <Section id="core" tone="dark" className="scroll-mt-32 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-dark bg-[size:56px_56px] mask-radial opacity-40" />
        <div aria-hidden="true" className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-sellix-purple/30 blur-[120px]" />
        <div className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="The Sellix core"
            title="Every module runs on the same strong foundation."
            description="Whatever module you start with, these capabilities come built in."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sellixCore.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05} className="card-dark h-full p-7">
                <span className="bg-gradient-to-r from-sellix-purple to-sellix-blue bg-clip-text font-display text-sm font-bold text-transparent">0{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{c.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl border border-dashed border-white/20 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10">
                  <PlusIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">More industries on the way</h3>
                  <p className="mt-1 text-slate-400">Don’t see your industry? Tell us how you operate — new Sellix modules start with conversations like that.</p>
                </div>
              </div>
              <ButtonLink href={contactHref('project')} variant="light" arrow>
                Suggest a module
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Questions about Sellix" />
          <Reveal delay={0.06}>
            <Faq items={[...faqs[0].items.slice(0, 2), ...faqs[2].items]} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="See Sellix running your business."
        body="Get a guided demo of the module that fits your industry, using examples from your own operation."
        primary={{ label: 'Book a Sellix demo', href: contactHref('sellix-pos') }}
        secondary={{ label: 'Sign in to Sellix', href: links.sellixApp }}
      />
    </>
  )
}
