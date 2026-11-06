import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  BanknotesIcon,
  BellAlertIcon,
  BoltIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  TagIcon,
  UserGroupIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { ButtonLink } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/reveal'
import { SellixDashboard } from '@/components/mockups/sellix-dashboard'
import { SellixLogo } from '@/components/product-logos'
import { SellixModuleNav } from '@/components/sellix-module-nav'
import { ModuleIcon } from '@/components/module-icon'
import { Faq } from '@/components/faq'
import { contactHref, faqs, links, sellixModules, type ModuleKey } from '@/content/site'
import { cn } from '@/lib/cn'

export const metadata: Metadata = {
  title: 'Sellix — ERPs for real estate, eateries and enterprise POS',
  description:
    'Sellix by Talixora: industry ERPs for real estate, eateries and high-volume retail POS — one platform with inventory, accounting and multi-branch control built in.',
}

const moduleTopic = { 'real-estate': 'sellix-real-estate', eatery: 'sellix-eatery', pos: 'sellix-pos' } as const

const featureIcons: Record<ModuleKey, (typeof BoltIcon)[]> = {
  'real-estate': [UserGroupIcon, BanknotesIcon, BuildingOffice2Icon, ChatBubbleLeftRightIcon],
  eatery: [DevicePhoneMobileIcon, TruckIcon, ClipboardDocumentListIcon, ChartBarIcon],
  pos: [BoltIcon, QrCodeIcon, TagIcon, ShieldCheckIcon],
}

const roles = [
  { icon: BriefcaseIcon, title: 'Owners', body: 'Every branch, till and property in one view — decisions made on today’s numbers.' },
  { icon: BuildingStorefrontIcon, title: 'Managers', body: 'Stock, staff, shifts and pricing under control, without chasing spreadsheets.' },
  { icon: UserIcon, title: 'Front-line staff', body: 'Fast, simple screens for cashiers, waiters and property officers.' },
  { icon: ChartPieIcon, title: 'Accountants', body: 'Clean sales, expense and arrears reports, ready to export at month-end.' },
]

const onboarding = [
  { title: 'Book a demo', body: 'See the module for your industry, using examples from your own operation.' },
  { title: 'We set up your workspace', body: 'Your business gets its own secure Sellix workspace, configured around your workflows.' },
  { title: 'Import & train', body: 'We bring in your products, units or menu and train your team on site or remotely.' },
  { title: 'Go live, supported', body: 'Launch with the Talixora team close at hand — and keep improving as you grow.' },
]

const appLinks = [
  { label: 'Sellix Eatery', href: links.sellixEatery, module: 'eatery' as const },
  { label: 'Sellix Real Estate', href: links.sellixRealEstate, module: 'real-estate' as const },
  { label: 'Sellix POS & workspace', href: links.sellixApp, module: 'pos' as const },
]

function article(word: string) {
  return /^[aeiou]/i.test(word) ? 'an' : 'a'
}

/** Small floating product screen shown on each module's photo collage. */
function ModuleCard({ module }: { module: ModuleKey }) {
  if (module === 'real-estate') {
    return (
      <div className="w-64 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-black/5">
        <div className="flex items-center justify-between px-4 pt-4">
          <p className="text-xs font-semibold text-slate-500">Sellix Homes · listing</p>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">Free now</span>
        </div>
        <div className="px-4 pb-4 pt-2">
          <p className="font-display text-base font-semibold text-ink-900">2-bed apartment · Spintex</p>
          <p className="text-sm text-slate-500">GH₵ 2,400 / month · short stays on request</p>
          <p className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366]/15 py-2 text-xs font-semibold text-[#128C4B]">
            <ChatBubbleLeftRightIcon className="h-4 w-4" aria-hidden="true" /> WhatsApp the owner
          </p>
        </div>
      </div>
    )
  }
  if (module === 'eatery') {
    return (
      <div className="w-64 rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500">Sellix Eats · #2042 · Pickup</p>
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-amber-500" /> Cooking
          </span>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-900">
          <li className="flex justify-between"><span>2 × Jollof & chicken</span><span className="text-slate-500">GH₵ 160</span></li>
          <li className="flex justify-between"><span>1 × Waakye special</span><span className="text-slate-500">GH₵ 65</span></li>
          <li className="flex justify-between"><span>3 × Sobolo</span><span className="text-slate-500">GH₵ 45</span></li>
        </ul>
        <div className="mt-3 flex justify-between border-t border-slate-100 pt-2 text-sm font-semibold">
          <span>Total</span><span>GH₵ 270</span>
        </div>
      </div>
    )
  }
  return (
    <div className="w-64 rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">Till 04 · Osu Mall</p>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">Sale complete</span>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-ink-900">GH₵ 1,240.00</p>
      <p className="text-xs text-slate-500">14 items · receipt #88213</p>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
        <BellAlertIcon className="h-4 w-4" aria-hidden="true" /> Cooking oil 5L — reorder soon
      </div>
    </div>
  )
}

export default function SellixPage() {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950 pb-40 pt-32 text-white sm:pb-48 sm:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-dark bg-[size:56px_56px] mask-radial opacity-50" />
        <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-sellix-purple/40 blur-[140px]" />
        <div aria-hidden="true" className="absolute -right-40 top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-sellix-blue/30 blur-[130px]" />

        <div className="container grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <SellixLogo size="lg" />
            <h1 className="h-display mt-8 text-[2.6rem] leading-[1.03] sm:text-6xl">
              The ERP built for how your{' '}
              <span className="bg-gradient-to-r from-[#C58CFF] via-brand-300 to-sellix-blue bg-clip-text text-transparent">
                business actually runs.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 text-pretty">
              Sales, stock, staff and finances in one system — with dedicated modules for real estate, eateries and
              high-volume retail, and a secure workspace for every business.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref('sellix-pos')} variant="light" size="lg" arrow>
                Book a Sellix demo
              </ButtonLink>
              <a
                href="#real-estate"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/10"
              >
                See the modules <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                ['3', 'industry modules'],
                ['1', 'shared core'],
                ['Accra', 'built & supported'],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-slate-400">{l}</dt>
                  <dd className="font-display text-3xl font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.12} y={30}>
            <SellixDashboard />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ Module index (overlaps hero) */}
      <section aria-label="Sellix modules overview" className="relative z-10 -mt-28 sm:-mt-32">
        <div className="container">
          <ul className="grid gap-4 md:grid-cols-3">
            {sellixModules.map((m, i) => (
              <li key={m.key}>
                <Reveal delay={i * 0.06} className="h-full">
                  <a
                    href={`#${m.key}`}
                    className="group relative isolate flex h-60 flex-col justify-end overflow-hidden rounded-3xl p-6 text-white shadow-lift"
                  >
                    <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent" />
                    <span className="absolute left-6 top-6 font-display text-sm font-bold text-white/80">0{i + 1}</span>
                    <span className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-white group-hover:text-ink-900">
                      <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="flex items-center gap-2 font-display text-xl font-semibold">
                      <ModuleIcon module={m.key} className="h-5 w-5 text-[#C58CFF]" />
                      {m.name}
                    </span>
                    <span className="mt-1 text-sm text-slate-300">{m.tagline}</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-16 sm:h-20" />
      <SellixModuleNav />

      {/* ------------------------------------------------------------ Modules, spread out */}
      {sellixModules.map((m, i) => {
        const flip = i % 2 === 1
        const icons = featureIcons[m.key]
        return (
          <section
            key={m.key}
            id={m.key}
            className={cn('relative scroll-mt-32 overflow-hidden py-20 sm:py-28', flip ? 'bg-slate-50' : 'bg-white')}
          >
            <div aria-hidden="true" className={cn('absolute top-20 h-80 w-80 rounded-full bg-sellix-purple/10 blur-[100px]', flip ? '-left-20' : '-right-20')} />
            <div className="container relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              {/* Collage */}
              <Reveal className={cn('relative', flip && 'lg:order-last')}>
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] shadow-lift">
                  <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                </div>
                {m.gallery?.[0] && (
                  <div
                    className={cn(
                      'absolute -bottom-8 hidden aspect-[4/3] w-44 overflow-hidden rounded-2xl shadow-lift ring-4 ring-white sm:block',
                      flip ? '-right-6' : '-left-6',
                    )}
                  >
                    <Image src={m.gallery[0].src} alt={m.gallery[0].alt} fill sizes="176px" className="object-cover" />
                  </div>
                )}
                <div className={cn('absolute -top-6 hidden sm:block', flip ? '-left-6' : '-right-6')} aria-hidden="true">
                  <ModuleCard module={m.key} />
                </div>
              </Reveal>

              {/* Copy */}
              <Reveal delay={0.08}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-6xl font-semibold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_#CBD5E1]">
                    0{i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sellix-gradient text-white shadow-glow">
                    <ModuleIcon module={m.key} className="h-6 w-6" />
                  </span>
                </div>
                <p className="eyebrow mt-8 text-sellix-purple">{m.tagline}</p>
                <h2 className="h-display mt-3 text-3xl leading-[1.08] sm:text-5xl">{m.name}</h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{m.summary}</p>

                <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                  {m.features.map((f, fi) => {
                    const Icon = icons[fi] ?? BoltIcon
                    return (
                      <div key={f.title} className="flex gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-sellix-purple shadow-soft ring-1 ring-slate-200">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <dt className="font-semibold text-ink-900">{f.title}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-slate-600">{f.body}</dd>
                        </div>
                      </div>
                    )
                  })}
                </dl>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={contactHref(moduleTopic[m.key])} arrow>
                    Book {article(m.short)} {m.short} demo
                  </ButtonLink>
                  <a
                    href={m.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-[0.95rem] font-semibold text-ink-900 ring-1 ring-inset ring-slate-200 transition hover:bg-sellix-50 hover:ring-sellix-purple/40"
                  >
                    {m.key === 'pos' ? 'Sign in to Sellix' : `Open ${m.name}`}
                    <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        )
      })}

      {/* ------------------------------------------------------------ Core bento */}
      <section id="core" className="relative isolate scroll-mt-32 overflow-hidden bg-ink-900 py-20 text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-dark bg-[size:56px_56px] mask-radial opacity-40" />
        <div aria-hidden="true" className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-sellix-purple/30 blur-[120px]" />
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <SectionHeading tone="dark" eyebrow="The Sellix core" title="Every module runs on the same strong foundation." />
            <Reveal delay={0.06}>
              <p className="text-lg leading-relaxed text-slate-300">
                Whichever module you start with, these come built in — so adding a branch or a second module never means starting again.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-6 [&>*]:min-w-0">
            <Reveal className="md:col-span-3">
              <div className="card-dark flex h-full flex-col p-7">
                <BanknotesIcon className="h-6 w-6 text-[#C58CFF]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold">Accounting & reports</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Sales, expenses and profit roll up into clear, exportable reports for owners and accountants.</p>
                <div className="mt-auto flex h-28 items-end gap-2 pt-8" aria-hidden="true">
                  {[40, 55, 48, 70, 62, 85, 78, 92].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-sellix-purple/60 to-sellix-blue/70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05} className="md:col-span-3">
              <div className="card-dark flex h-full flex-col p-7">
                <CubeIcon className="h-6 w-6 text-[#C58CFF]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold">Inventory & procurement</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">One stock ledger across stores and warehouses, with transfers, purchase orders and reorder alerts.</p>
                <ul className="mt-auto space-y-2 pt-8 text-sm" aria-hidden="true">
                  {[
                    ['Rice · 50kg bags', '18 in stock', 'text-mint-300'],
                    ['Cooking oil · 5L', 'Reorder soon', 'text-amber-400'],
                    ['Mineral water · 24pk', '142 in stock', 'text-mint-300'],
                  ].map(([n, s, c]) => (
                    <li key={n} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5">
                      <span className="text-slate-200">{n}</span>
                      <span className={`text-xs font-semibold ${c}`}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-2">
              <div className="card-dark flex h-full flex-col p-7">
                <MapPinIcon className="h-6 w-6 text-[#C58CFF]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold">Multi-branch control</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Add locations as you grow and see each one — or the whole business — at once.</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8 text-xs" aria-hidden="true">
                  {['Accra', 'Kumasi', 'Takoradi', 'Tamale', '+ Add branch'].map((b, i) => (
                    <li key={b} className={`rounded-full px-3 py-1.5 ${i === 4 ? 'border border-dashed border-white/25 text-slate-400' : 'bg-white/10 text-slate-200'}`}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-4">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-sellix-gradient p-7 sm:flex-row sm:items-center sm:gap-10">
                <div className="sm:max-w-xs">
                  <h3 className="font-display text-xl font-semibold">Your own business workspace</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">Each business gets its own secure Sellix workspace, with users, roles and a full audit trail.</p>
                </div>
                <div className="mt-8 flex-1 rounded-2xl bg-white p-5 text-ink-900 shadow-lift sm:mt-0" aria-hidden="true">
                  <div className="flex items-center gap-2">
                    <Image src="/images/brand/sellix-mark-96.png" alt="" width={22} height={22} unoptimized />
                    <span className="font-display text-sm font-semibold text-sellix-deep">Find your business</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Enter the name of the business you want to access</p>
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400">
                    <MagnifyingGlassIcon className="h-4 w-4" /> e.g. Acme Retail
                  </div>
                  <div className="mt-3 rounded-lg bg-sellix-deep py-2.5 text-center text-sm font-semibold text-white">Continue</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Roles + onboarding */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Built for every role" title="Everyone gets the screen they need." />
            <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {roles.map((r, i) => (
                <li key={r.title}>
                  <Reveal delay={i * 0.05} className="flex gap-5 py-6">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sellix-50 text-sellix-purple">
                      <r.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold text-ink-900">{r.title}</span>
                      <span className="mt-1 block leading-relaxed text-slate-600">{r.body}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Getting started" title="From first demo to go-live, we’re with you." />
            <ol className="relative ml-4 mt-10 space-y-8 border-l border-dashed border-sellix-purple/40 pl-10">
              {onboarding.map((s, i) => (
                <li key={s.title} className="relative">
                  <Reveal delay={i * 0.06}>
                    <span className="absolute -left-[3.6rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-sellix-gradient font-display text-sm font-bold text-white ring-4 ring-white">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink-900">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-slate-600">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Existing customers + FAQ */}
      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="FAQ" title="Questions about Sellix" />
            <Reveal delay={0.06} className="mt-10 rounded-3xl bg-ink-900 p-6 text-white sm:p-8">
              <p className="font-display text-lg font-semibold">Already on Sellix?</p>
              <p className="mt-1 text-sm text-slate-400">Jump straight into your app.</p>
              <ul className="mt-6 space-y-2">
                {appLinks.map((a) => (
                  <li key={a.label}>
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 transition hover:bg-white/10"
                    >
                      <ModuleIcon module={a.module} className="h-5 w-5 text-[#C58CFF]" />
                      <span className="text-sm font-semibold">{a.label}</span>
                      <ArrowUpRightIcon className="ml-auto h-4 w-4 text-slate-400 transition group-hover:text-white" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.06}>
            <Faq items={[...faqs[0].items.slice(0, 2), ...faqs[2].items]} />
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="py-20 sm:py-24">
        <div className="container">
          <Reveal>
            <div className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2rem] bg-sellix-gradient px-6 py-14 text-white sm:px-14 lg:grid-cols-[1.4fr_1fr]">
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-dark bg-[size:44px_44px] opacity-30 mask-radial" />
              <div>
                <h2 className="h-display text-3xl leading-tight sm:text-5xl">See Sellix running your business.</h2>
                <p className="mt-5 max-w-xl text-lg text-white/85">
                  Get a guided demo of the module that fits your industry, using examples from your own operation.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={contactHref('sellix-pos')} variant="light" size="lg" arrow>
                    Book a Sellix demo
                  </ButtonLink>
                  <ButtonLink href={contactHref('project')} variant="ghost-dark" size="lg">
                    Suggest a new module
                  </ButtonLink>
                </div>
              </div>
              <ul className="grid gap-3">
                {sellixModules.map((m) => (
                  <li key={m.key}>
                    <a href={`#${m.key}`} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur transition hover:bg-white/25">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sellix-purple">
                        <ModuleIcon module={m.key} className="h-5 w-5" />
                      </span>
                      <span className="font-semibold">{m.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
