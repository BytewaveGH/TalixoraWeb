import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRightIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  LightBulbIcon,
  PaintBrushIcon,
  ServerStackIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { DarkBackdrop } from '@/components/dark-backdrop'
import { ButtonLink } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/reveal'
import { Faq } from '@/components/faq'
import { CtaBand } from '@/components/cta-band'
import { contactHref, developerRoles, engagementModels, faqs, services, techStack, workflow } from '@/content/site'

export const metadata: Metadata = {
  title: 'Services — software consultancy & dedicated developers',
  description:
    'Talixora provides software consultancy, custom development and dedicated developers — for the whole project, a part of it, or a developer released to your team.',
}

const serviceIcons: Record<(typeof services)[number]['key'], typeof LightBulbIcon> = {
  consultancy: LightBulbIcon,
  developers: UserGroupIcon,
  development: CodeBracketIcon,
  apps: DevicePhoneMobileIcon,
  design: PaintBrushIcon,
  support: ServerStackIcon,
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <DarkBackdrop />
        <div className="container relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-mint-300">Services</p>
            <h1 className="h-display mt-5 text-[2.6rem] leading-[1.04] sm:text-6xl">
              Engineering talent, <span className="text-gradient">on your terms.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 text-pretty">
              The team behind Sellix and Bidchale works for other companies too. Hire us for the whole project, bring us
              in for a part of it, or request a dedicated Talixora developer to join your team.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref('developer')} variant="light" size="lg" arrow>
                Request a developer
              </ButtonLink>
              <ButtonLink href={contactHref('consultancy')} variant="ghost-dark" size="lg">
                Book a consultation
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10">
              <Image src="/images/photos/consulting.jpg" alt="Talixora consultants in a client workshop" fill priority sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-white p-4 text-ink-900 shadow-lift sm:block">
              <p className="text-xs text-slate-500">You talk to</p>
              <p className="font-display font-semibold">Engineers, not account managers</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <Section>
        <SectionHeading eyebrow="What we do" title="Everything you need to ship great software." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.key]
            return (
              <Reveal key={s.key} delay={(i % 3) * 0.05} className="h-full">
                <div id={s.key === 'consultancy' || s.key === 'development' ? s.key : undefined} className="card h-full scroll-mt-28 p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.name}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Engagement models */}
      <Section tone="muted">
        <SectionHeading
          align="center"
          eyebrow="How we engage"
          title="The whole project, a part of it — or a developer on request."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {engagementModels.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06} className="h-full">
              <div className={`flex h-full flex-col rounded-3xl p-8 ${i === 2 ? 'bg-ink-900 text-white' : 'border border-slate-200 bg-white'}`}>
                <span className={`font-display text-sm font-semibold ${i === 2 ? 'text-mint-300' : 'text-brand-500'}`}>0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{m.title}</h3>
                <p className={`mt-3 flex-1 leading-relaxed ${i === 2 ? 'text-slate-300' : 'text-slate-600'}`}>{m.body}</p>
                <div className="mt-8">
                  <ButtonLink
                    href={contactHref(i === 2 ? 'developer' : 'project')}
                    variant={i === 2 ? 'light' : 'secondary'}
                    arrow
                  >
                    {i === 2 ? 'Request a developer' : 'Discuss your project'}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Dedicated developers */}
      <Section id="developers" className="scroll-mt-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-last lg:order-first">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src="/images/photos/developer.jpg" alt="Talixora developer at work" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src="/images/photos/developer-2.jpg" alt="Talixora engineer reviewing a project" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Dedicated developers"
              title="Add a Talixora engineer to your team."
              description="Tell us the role and how long you need them. We match you with an experienced developer who works with your tools, joins your stand-ups and ships alongside your team."
            />
            <Reveal delay={0.08}>
              <p className="mt-8 text-sm font-semibold text-ink-900">Choose a role to get started</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {developerRoles.map((r) => (
                  <li key={r}>
                    <Link
                      href={contactHref('developer', { role: r })}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {r}
                      <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Tech stack */}
      <Section id="technologies" tone="dark" className="scroll-mt-16 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-dark bg-[size:56px_56px] mask-radial opacity-40" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            tone="dark"
            eyebrow="Technologies"
            title="Fluent in the stacks you already use."
            description="Web, mobile, backend, data and design — our engineers adapt to your codebase, not the other way round."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {techStack.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.05} className="card-dark p-6">
                <h3 className="font-display font-semibold text-mint-300">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-200">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="How we work" title="A clear process, from first call to go-live." />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((p, i) => (
            <li key={p.step}>
              <Reveal delay={i * 0.06} className="h-full rounded-2xl border border-slate-200 bg-white p-7">
                <span className="font-display text-sm font-semibold text-brand-500">{p.step}</span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Working with Talixora" />
          <Reveal delay={0.06}>
            <Faq items={faqs[1].items} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Tell us what you’re building."
        body="Share your project or the role you need. We’ll reply within one business day — and sign an NDA if you need one."
        primary={{ label: 'Request a developer', href: contactHref('developer') }}
        secondary={{ label: 'Discuss a project', href: contactHref('project') }}
      />
    </>
  )
}
