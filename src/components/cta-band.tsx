import Image from 'next/image'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'

export function CtaBand({
  title = 'Let’s build what your business runs on.',
  body = 'Book a Sellix demo, get selling on Bidchale, or bring Talixora engineers onto your next project.',
  primary = { label: 'Book a demo', href: '/contact' },
  secondary = { label: 'Hire a developer', href: '/contact?topic=developer' },
}: {
  title?: string
  body?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-16 sm:px-16 sm:py-20">
            <Image
              src="/images/photos/team-boardroom.jpg"
              alt=""
              fill
              sizes="(min-width: 1240px) 1240px, 100vw"
              className="-z-20 object-cover opacity-25"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/40" />
            <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 h-72 w-[560px] rounded-full bg-brand-500/40 blur-[100px]" />
            <div className="max-w-2xl">
              <h2 className="h-display text-3xl leading-tight text-white sm:text-5xl">{title}</h2>
              <p className="mt-5 max-w-xl text-lg text-slate-300">{body}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={primary.href} variant="light" size="lg" arrow>
                  {primary.label}
                </ButtonLink>
                <ButtonLink href={secondary.href} variant="ghost-dark" size="lg">
                  {secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
