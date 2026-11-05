import type { Metadata } from 'next'
import Image from 'next/image'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/reveal'
import { TeamGrid } from '@/components/team-grid'
import { Faq } from '@/components/faq'
import { CtaBand } from '@/components/cta-band'
import { BidchaleLogo, SellixLogo } from '@/components/product-logos'
import { faqs, site, values } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${site.name} is a software company in ${site.location} — makers of Sellix and Bidchale, and a consultancy and engineering partner to growing companies.`,
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pb-16 pt-32 sm:pb-20 sm:pt-44">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light bg-[size:56px_56px] mask-radial" />
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-brand-200/50 blur-[100px]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">About Talixora</p>
            <h1 className="h-display mt-5 text-[2.6rem] leading-[1.04] sm:text-6xl">
              Software for the counter, the kitchen and the auction floor.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 text-pretty">
              We’re a product and engineering company in {site.location}, building business software for the way growing
              companies actually operate — busy, multi-branch and always moving.
            </p>
          </Reveal>
          <Reveal delay={0.12} y={30} className="mx-auto mt-14 max-w-6xl">
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-lift">
              <Image src="/images/photos/accra.jpg" alt="View over a busy market district in Ghana" fill priority sizes="(min-width: 1240px) 1152px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Our story" title="Two sides, one standard." />
          <Reveal delay={0.08} className="space-y-6 text-lg leading-relaxed text-slate-600">
            <p>
              Too many businesses run on spreadsheets, notebooks and tools never designed for them. Stock goes missing
              between branches. Rent collection lives in someone’s phone. Tills slow down at exactly the wrong moment.
            </p>
            <p>
              So we build products. <strong className="font-semibold text-ink-900">Sellix</strong> gives real estate
              firms, eateries and high-volume retailers an ERP built for their industry.{' '}
              <strong className="font-semibold text-ink-900">Bidchale</strong> gives Ghana a fair, transparent and
              escrow-protected way to buy and sell through live online auctions.
            </p>
            <p>
              And we partner with other companies. As a <strong className="font-semibold text-ink-900">software consultancy</strong>,
              we advise, deliver whole projects or parts of them, and release dedicated developers into client teams.
            </p>
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <SellixLogo />
              <BidchaleLogo height={30} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What we value" title="The principles behind every release." />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.05} className="card h-full p-6">
                  <span className="font-display text-sm font-semibold text-brand-500">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src="/images/photos/team-meeting.jpg" alt="The Talixora team in a planning session" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Team */}
      <Section id="team" className="scroll-mt-16">
        <SectionHeading
          eyebrow="The team"
          title="Meet the people building Talixora."
          description="A focused team of builders, backed by partners who know what it takes to run a business."
        />
        <div className="mt-14">
          <TeamGrid />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="muted" className="scroll-mt-16">
        <SectionHeading align="center" eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-12">
          {faqs.map((group) => (
            <Reveal key={group.title}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">{group.title}</h3>
              <Faq items={group.items} defaultOpen={-1} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand title="Let’s build something that lasts." />
    </>
  )
}
