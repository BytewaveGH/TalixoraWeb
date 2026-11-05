import Link from 'next/link'
import { Logo } from '@/components/logo'
import { links, site } from '@/content/site'

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Sellix', href: '/products/sellix' },
      { label: 'Sellix Real Estate', href: '/products/sellix#real-estate' },
      { label: 'Sellix Eatery', href: '/products/sellix#eatery' },
      { label: 'Sellix POS', href: '/products/sellix#pos' },
      { label: 'Bidchale', href: '/products/bidchale' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Software consultancy', href: '/services#consultancy' },
      { label: 'Dedicated developers', href: '/services#developers' },
      { label: 'Custom development', href: '/services#development' },
      { label: 'Technologies', href: '/services#technologies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our team', href: '/about#team' },
      { label: 'FAQs', href: '/about#faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Sign in',
    links: [
      { label: 'Sellix workspace', href: links.sellixApp },
      { label: 'Bidchale', href: links.bidchale },
      { label: 'Talixora portal', href: '/signIn' },
    ],
  },
]

const socials = [
  { label: 'LinkedIn', href: site.socials.linkedin },
  { label: 'X', href: site.socials.x },
  { label: 'Instagram', href: site.socials.instagram },
  { label: 'GitHub', href: site.socials.github },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-slate-400">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed">
              Business software, online marketplaces and engineering talent — built in {site.location}.
            </p>
            <a href={`mailto:${site.email}`} className="mt-5 inline-block text-sm font-medium text-white hover:text-mint-300">
              {site.email}
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l) => {
                  const external = l.href.startsWith('http')
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="transition-colors hover:text-white"
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {l.label}
                        {external && <span aria-hidden="true"> ↗</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved. Sellix and Bidchale are products of {site.name}.
          </p>
          <ul className="flex gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-5 pb-2 text-center font-display text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.03]"
      >
        Talixora
      </div>
    </footer>
  )
}
