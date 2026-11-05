import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRightIcon,
  BoltIcon,
  CheckIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { DarkBackdrop } from '@/components/dark-backdrop'
import { ButtonLink } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/reveal'
import { SellixDashboard } from '@/components/mockups/sellix-dashboard'
import { BidchaleAuction } from '@/components/mockups/bidchale-auction'
import { BidchaleLogo, SellixLogo } from '@/components/product-logos'
import { TeamGrid } from '@/components/team-grid'
import { CtaBand } from '@/components/cta-band'
import { bidchale, contactHref, developerRoles, engagementModels, links, sellixModules, values, workflow } from '@/content/site'

const pillars = [
  {
    icon: CubeTransparentIcon,
    title: 'Products',
    body: 'Sellix and Bidchale — software businesses and shoppers across Ghana use every day.',
    href: '/#products',
  },
  {
    icon: LightBulbIcon,
    title: 'Software consultancy',
    body: 'Advice, architecture and delivery — for the whole project or just the part you need.',
    href: '/services#consultancy',
  },
  {
    icon: UserGroupIcon,
    title: 'Dedicated developers',
    body: 'Experienced Talixora engineers released to work inside your team, on request.',
    href: '/services#developers',
  },
]

const valueIcons = [CpuChipIcon, BoltIcon, UserGroupIcon, ShieldCheckIcon]

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <DarkBackdrop />
        <div className="container relative">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
              Software company · Accra, Ghana
            </p>
            <h1 className="h-display mt-8 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
              We build the software <span className="text-gradient">serious businesses run on.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 text-pretty sm:text-xl">
              Talixora builds <strong className="font-semibold text-white">Sellix</strong> ERPs and the{' '}
              <strong className="font-semibold text-white">Bidchale</strong> marketplace — and is the engineering
              partner companies call for consultancy and dedicated developers.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/#products" variant="light" size="lg" arrow>
                Explore our products
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost-dark" size="lg">
                Work with our engineers
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.15} y={40} className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
            <SellixDashboard />
            <div className="absolute -bottom-12 -right-4 hidden w-[290px] rotate-[2deg] lg:-right-16 lg:block">
              <BidchaleAuction compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ Pillars */}
      <section aria-label="What we do" className="border-b border-slate-200 bg-white">
        <div className="container grid divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <Link href={p.href} className="group flex h-full gap-4 py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-center gap-1 font-display font-semibold text-ink-900">
                    {p.title}
                    <ArrowUpRightIcon className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">{p.body}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ Products */}
      <Section id="products" className="scroll-mt-16">
        <SectionHeading
          eyebrow="Our products"
          title="Two products. One standard of craft."
          description="From the till at a busy supermarket to an auction ending in sixty seconds — Talixora products are built to be fast, dependable and simple to use."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Sellix */}
          <Reveal className="h-full">
            <Link
              href="/products/sellix"
              className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-ink-900 p-8 text-white sm:p-10"
            >
              <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-sellix-purple/50 blur-[100px]" />
              <div aria-hidden="true" className="absolute -bottom-24 left-10 -z-10 h-64 w-64 rounded-full bg-sellix-blue/30 blur-[100px]" />
              <div className="flex items-start justify-between gap-4">
                <SellixLogo size="lg" />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-colors group-hover:bg-white group-hover:text-ink-900">
                  <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-sellix-blue">Industry ERP suite</p>
              <p className="mt-6 max-w-md leading-relaxed text-slate-300">
                One platform with purpose-built modules for real estate, eateries and enterprise point of sale — every business in its own secure workspace.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {sellixModules.map((m) => (
                  <div key={m.key} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <div className="relative aspect-[4/3]">
                      <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 1024px) 180px, 30vw" className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <p className="px-3 py-2 text-xs font-semibold">{m.short}</p>
                  </div>
                ))}
              </div>
            </Link>
          </Reveal>

          {/* Bidchale */}
          <Reveal delay={0.08} className="h-full">
            <Link
              href="/products/bidchale"
              className="group relative isolate flex h-full min-h-[30rem] flex-col overflow-hidden rounded-3xl bg-bidchale-black p-8 text-white sm:p-10"
            >
              <Image
                src="/images/bidchale/landing.png"
                alt="Happy Bidchale shoppers holding their won items"
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="-z-20 object-cover object-top opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/10" />
              <div className="flex items-start justify-between gap-4">
                <BidchaleLogo tone="light" height={40} />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 backdrop-blur transition-colors group-hover:bg-bidchale-yellow group-hover:text-black">
                  <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-bidchale-yellow">Ghana’s online bidding marketplace</p>
                <p className="mt-3 max-w-md text-xl font-semibold leading-snug">
                  Bid smart, win big and shop with confidence — with escrow-protected payments and mobile money.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {['Live auctions', 'Buy Now', 'MoMo payments', 'Doorstep delivery'].map((p) => (
                    <li key={p} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Sellix modules */}
      <Section tone="muted">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Inside Sellix"
            title="An ERP for every kind of busy."
            description="Pick the module built for your industry. Add more as you grow — they all share the same core for inventory, accounting and branches."
          />
          <Reveal>
            <ButtonLink href="/products/sellix" variant="secondary" arrow>
              Explore Sellix
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {sellixModules.map((m, i) => (
            <Reveal key={m.key} delay={i * 0.06} className="h-full">
              <Link
                href={`/products/sellix#${m.key}`}
                className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sellix-purple">{m.tagline}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-slate-600">{m.summary}</p>
                  <ul className="mt-6 space-y-2 border-t border-slate-100 pt-6 text-sm text-slate-600">
                    {m.features.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex gap-2">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" aria-hidden="true" />
                        {f.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Bidchale spotlight */}
      <section className="relative isolate overflow-hidden bg-bidchale-black py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-dark bg-[size:56px_56px] mask-radial opacity-40" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-bidchale-yellow/15 blur-[120px]" />
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/bidchale/landing.png"
                alt="Shoppers celebrating items won on Bidchale"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 right-4 hidden w-[270px] sm:block lg:-right-8">
              <BidchaleAuction compact />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <BidchaleLogo tone="light" height={36} />
              <h2 className="h-display mt-6 text-3xl leading-[1.1] sm:text-[2.75rem]">
                Discover amazing deals. <span className="text-bidchale-yellow">Bid smart, win big.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">{bidchale.summary}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <ol className="mt-10 grid gap-5 sm:grid-cols-2">
                {bidchale.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bidchale-yellow font-display text-sm font-bold text-black">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{s.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-400">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={links.bidchale}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bidchale-yellow px-6 font-semibold text-black transition hover:brightness-95"
                >
                  Start bidding on bidchale.com <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <ButtonLink href="/products/bidchale" variant="ghost-dark" size="lg">
                  How Bidchale works
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Consultancy & developers */}
      <section id="services" className="relative scroll-mt-16 overflow-hidden bg-white py-20 sm:py-28">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <Reveal>
              <p className="eyebrow">Consultancy & developers</p>
              <h2 className="h-display mt-4 text-4xl leading-[1.05] sm:text-6xl">
                Your project.
                <br />
                <span className="text-slate-400">Our engineers.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lg leading-relaxed text-slate-600">
                We don’t only build our own products. Companies bring the team behind Sellix and Bidchale in to advise,
                to deliver their software — the whole project or just a part of it — or to work inside their team as
                dedicated developers.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactHref('developer')} arrow>
                  Request a developer
                </ButtonLink>
                <ButtonLink href={contactHref('consultancy')} variant="secondary">
                  Book a consultation
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Bento */}
          <div className="mt-14 grid gap-4 md:grid-cols-6">
            {/* Dedicated developers — hero tile */}
            <Reveal className="md:col-span-4 md:row-span-2">
              <Link
                href="/services#developers"
                className="group relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink-900 p-7 text-white sm:p-10"
              >
                <Image
                  src="/images/photos/team-coding.jpg"
                  alt="Talixora developers collaborating on code"
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/0" />
                <span className="absolute left-7 top-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:left-10 sm:top-10">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-400" />
                  Developers available on request
                </span>
                <h3 className="h-display max-w-lg text-3xl sm:text-4xl">Add a dedicated Talixora engineer to your team.</h3>
                <p className="mt-3 max-w-lg text-slate-300">
                  Part-time, full-time or for a fixed engagement — on your tools, in your stand-ups, shipping with your team.
                </p>
                <div className="mask-fade-x relative mt-8 overflow-hidden">
                  <ul className="flex w-max animate-marquee gap-2 group-hover:[animation-play-state:paused]">
                    {[...developerRoles, ...developerRoles].map((r, i) => (
                      <li
                        key={i}
                        aria-hidden={i >= developerRoles.length}
                        className="whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm backdrop-blur"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-mint-300">
                  See roles we place
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>

            {/* Consultancy tile */}
            <Reveal delay={0.06} className="md:col-span-2">
              <Link
                href="/services#consultancy"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-lift"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src="/images/photos/consulting.jpg" alt="Consultancy workshop with a client" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <LightBulbIcon className="h-6 w-6 text-brand-500" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">Software consultancy</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">Architecture, technology choices, roadmaps and project rescue.</p>
                </div>
              </Link>
            </Reveal>

            {/* Custom development tile */}
            <Reveal delay={0.1} className="md:col-span-2">
              <Link
                href="/services#development"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand-600 p-6 text-white transition hover:bg-brand-700"
              >
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <CodeBracketSquareIcon className="h-6 w-6 text-brand-100" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">Custom development</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-100">Web platforms, mobile apps, integrations and full ERPs — built around your process.</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold">
                  All services <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>

            {/* Engagement models strip */}
            <Reveal delay={0.06} className="md:col-span-6">
              <div className="grid divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 md:grid-cols-3 md:divide-x md:divide-y-0">
                {engagementModels.map((m, i) => (
                  <div key={m.title} className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Option {i + 1}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink-900">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Why Talixora */}
      <section className="relative bg-slate-50 py-20 sm:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Sticky intro */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">Why Talixora</p>
                <h2 className="h-display mt-4 text-4xl leading-[1.05] sm:text-5xl">
                  We sweat the details so your team doesn’t have to.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
                  Great business software disappears into the work. That’s the bar we hold every product and every client project to.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="mt-10 hidden lg:block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image src="/images/photos/team-meeting.jpg" alt="Talixora team planning session" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
                    <p className="text-sm font-semibold text-ink-900">You talk to engineers, not account managers.</p>
                    <p className="mt-0.5 text-xs text-slate-500">Replies within one business day · NDA on request</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Values list */}
            <ol className="divide-y divide-slate-200 border-y border-slate-200">
              {values.map((v, i) => {
                const Icon = valueIcons[i]
                return (
                  <li key={v.title}>
                    <Reveal delay={i * 0.05} className="group grid grid-cols-[auto_1fr] gap-6 py-8 sm:gap-10 sm:py-10">
                      <span className="font-display text-5xl font-semibold leading-none tracking-tighter text-slate-300 transition-colors group-hover:text-brand-500 sm:text-6xl">
                        0{i + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
                          <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{v.title}</h3>
                        </div>
                        <p className="mt-3 max-w-lg leading-relaxed text-slate-600">{v.body}</p>
                      </div>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Process timeline */}
          <div className="mt-20 rounded-3xl bg-ink-900 p-8 text-white sm:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-mint-300">How we work</p>
                <h3 className="h-display mt-3 text-2xl sm:text-3xl">From first call to go-live — and beyond.</h3>
              </div>
              <ButtonLink href="/contact" variant="light" size="sm" arrow>
                Start a conversation
              </ButtonLink>
            </div>
            <div className="relative mt-12">
              <div aria-hidden="true" className="absolute left-0 right-0 top-[11px] hidden h-px bg-gradient-to-r from-mint-400/60 via-brand-400/60 to-transparent md:block" />
              <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
                {workflow.map((p, i) => (
                  <li key={p.step}>
                    <Reveal delay={i * 0.08}>
                      <span className="relative grid h-6 w-6 place-items-center rounded-full bg-ink-900 ring-2 ring-mint-400">
                        <span className="h-2 w-2 rounded-full bg-mint-400" />
                      </span>
                      <p className="mt-5 font-display text-sm font-semibold text-mint-300">{p.step}</p>
                      <h4 className="mt-1 font-display text-xl font-semibold">{p.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Team */}
      <Section>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The team"
            title="The people behind Talixora."
            description="A focused team building dependable software for the businesses around us — and the partners who help us take it further."
          />
          <Reveal>
            <ButtonLink href="/about" variant="secondary" arrow>
              About us
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-14">
          <TeamGrid />
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
