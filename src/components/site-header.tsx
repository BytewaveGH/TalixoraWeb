'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  ChevronDownIcon,
  CodeBracketIcon,
  LightBulbIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Logo } from '@/components/logo'
import { ButtonLink } from '@/components/ui/button'
import { links } from '@/content/site'
import { cn } from '@/lib/cn'

/** Routes whose hero is dark, so the header starts transparent with light text. */
const DARK_HERO_ROUTES = ['/', '/products/sellix', '/products/bidchale', '/services', '/contact']

type MenuKey = 'products' | 'services'

const products = [
  {
    name: 'Sellix',
    href: '/products/sellix',
    mark: '/images/brand/sellix-mark-96.png',
    markBg: 'bg-sellix-50',
    description: 'ERPs for real estate, eateries and enterprise point of sale.',
    quick: [
      { label: 'Real Estate', href: '/products/sellix#real-estate' },
      { label: 'Eatery', href: '/products/sellix#eatery' },
      { label: 'POS', href: '/products/sellix#pos' },
    ],
  },
  {
    name: 'Bidchale',
    href: '/products/bidchale',
    mark: '/images/brand/bidchale-icon-96.png',
    markBg: 'bg-bidchale-yellow',
    description: 'Ghana’s online bidding marketplace — bid live or buy now.',
    quick: [
      { label: 'How it works', href: '/products/bidchale#how-it-works' },
      { label: 'Categories', href: '/products/bidchale#categories' },
      { label: 'Buyer protection', href: '/products/bidchale#protection' },
    ],
  },
]

const serviceItems = [
  {
    icon: LightBulbIcon,
    name: 'Software consultancy',
    href: '/services#consultancy',
    description: 'Architecture, technology choices, roadmaps and project rescue.',
  },
  {
    icon: CodeBracketIcon,
    name: 'Custom development',
    href: '/services#development',
    description: 'The whole project — or just the part you need help with.',
  },
  {
    icon: UserGroupIcon,
    name: 'Dedicated developers',
    href: '/services#developers',
    description: 'Talixora engineers released to work inside your team.',
  },
]

const simpleLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menu, setMenu] = useState<MenuKey | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()

  const openMenu = useCallback((key: MenuKey) => {
    clearTimeout(closeTimer.current)
    setMenu(key)
  }, [])
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenu(null), 140)
  }, [])
  const closeNow = useCallback(() => {
    clearTimeout(closeTimer.current)
    setMenu(null)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false)
    closeNow()
  }, [pathname, closeNow])

  // Outside click / Escape.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeNow()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeNow()
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [closeNow])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const onDark = DARK_HERO_ROUTES.includes(pathname) && !scrolled && !mobileOpen && !menu

  const sectionActive = (key: MenuKey) =>
    key === 'products' ? pathname.startsWith('/products') : pathname.startsWith('/services')

  const triggerClass = (active: boolean, open: boolean) =>
    cn(
      'relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
      onDark ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-ink-900',
      (active || open) && (onDark ? 'text-white' : 'text-ink-900'),
      open && !onDark && 'bg-slate-100',
    )

  return (
    <header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        onDark ? 'border-b border-transparent bg-transparent' : 'border-b border-slate-200/70 bg-white/90 backdrop-blur-xl',
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-[72px]">
        <Link href="/" aria-label="Talixora home" className="rounded-lg" onMouseEnter={scheduleClose}>
          <Logo tone={onDark ? 'light' : 'dark'} />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {(['products', 'services'] as MenuKey[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-expanded={menu === key}
              aria-controls={`menu-${key}`}
              onMouseEnter={() => openMenu(key)}
              onClick={() => (menu === key ? closeNow() : openMenu(key))}
              className={triggerClass(sectionActive(key), menu === key)}
            >
              {key === 'products' ? 'Products' : 'Services'}
              <ChevronDownIcon
                aria-hidden="true"
                className={cn('h-3.5 w-3.5 transition-transform duration-200', menu === key && 'rotate-180')}
              />
            </button>
          ))}
          {simpleLinks.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={scheduleClose}
                aria-current={active ? 'page' : undefined}
                className={triggerClass(active, false)}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex" onMouseEnter={scheduleClose}>
          <ButtonLink href="/contact?topic=developer" size="sm" variant={onDark ? 'ghost-dark' : 'secondary'}>
            Hire a developer
          </ButtonLink>
          <ButtonLink href="/contact" size="sm" variant={onDark ? 'light' : 'primary'}>
            Book a demo
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden',
            onDark ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-slate-100',
          )}
        >
          {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop mega-menu panel */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full hidden md:block"
            onMouseEnter={() => clearTimeout(closeTimer.current)}
          >
            <div className="container pt-2">
              <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_64px_-16px_rgba(16,24,40,.25)]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={menu}
                    id={`menu-${menu}`}
                    initial={{ opacity: 0, x: menu === 'services' ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: menu === 'services' ? -12 : 12 }}
                    transition={{ duration: 0.16 }}
                  >
                    {menu === 'products' ? <ProductsPanel onNavigate={closeNow} /> : <ServicesPanel onNavigate={closeNow} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 64px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-slate-200 bg-white md:hidden"
          >
            <MobileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Panels                                                              */
/* ------------------------------------------------------------------ */

function ProductsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[1.6fr_1fr]">
      <div className="p-3">
        <p className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Our products</p>
        <ul>
          {products.map((p) => (
            <li key={p.name} className="group/row rounded-2xl p-4 transition-colors hover:bg-slate-50">
              <Link href={p.href} onClick={onNavigate} className="flex items-start gap-4">
                <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 ring-black/5', p.markBg)}>
                  <Image src={p.mark} alt="" width={28} height={28} unoptimized className="h-7 w-7 object-contain" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-display text-base font-semibold text-ink-900">
                    {p.name}
                    <ArrowRightIcon className="h-3.5 w-3.5 -translate-x-1 text-brand-600 opacity-0 transition-all group-hover/row:translate-x-0 group-hover/row:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-slate-500">{p.description}</span>
                </span>
              </Link>
              <div className="ml-16 mt-3 flex flex-wrap gap-1.5">
                {p.quick.map((q) => (
                  <Link
                    key={q.label}
                    href={q.href}
                    onClick={onNavigate}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
                  >
                    {q.label}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex flex-col justify-between overflow-hidden bg-ink-900 p-7 text-white">
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sellix-purple/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-bidchale-yellow/20 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-300">Already a customer?</p>
          <p className="mt-3 font-display text-lg font-semibold leading-snug">Jump straight into your product.</p>
        </div>
        <div className="relative mt-6 space-y-2">
          {[
            { label: 'Sellix Eatery', href: links.sellixEatery },
            { label: 'Sellix Real Estate', href: links.sellixRealEstate },
            { label: 'Sellix sign-in', href: links.sellixApp },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium transition hover:bg-white/15"
            >
              {l.label} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
          <a
            href={links.bidchale}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-bidchale-yellow px-4 py-3 text-sm font-semibold text-black transition hover:brightness-95"
          >
            Visit bidchale.com <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[1.6fr_1fr]">
      <div className="p-3">
        <p className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">How we help</p>
        <ul>
          {serviceItems.map((s) => (
            <li key={s.name}>
              <Link href={s.href} onClick={onNavigate} className="group/row flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-slate-50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover/row:bg-brand-500 group-hover/row:text-white">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-display text-base font-semibold text-ink-900">
                    {s.name}
                    <ArrowRightIcon className="h-3.5 w-3.5 -translate-x-1 text-brand-600 opacity-0 transition-all group-hover/row:translate-x-0 group-hover/row:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-slate-500">{s.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/services"
          onClick={onNavigate}
          className="mx-4 mb-3 mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          All services & technologies <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <Link href="/contact?topic=developer" onClick={onNavigate} className="group/feat relative isolate flex flex-col justify-end overflow-hidden p-7 text-white">
        <Image
          src="/images/photos/developer.jpg"
          alt=""
          fill
          sizes="320px"
          className="-z-20 object-cover transition-transform duration-700 group-hover/feat:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/10" />
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-400" /> Available on request
        </span>
        <p className="mt-3 font-display text-lg font-semibold leading-snug">Hire a dedicated developer</p>
        <p className="mt-1 text-sm text-slate-300">Part-time, full-time or fixed-term.</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-mint-300">
          Request a developer <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover/feat:translate-x-0.5" />
        </span>
      </Link>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile                                                              */
/* ------------------------------------------------------------------ */

function MobileMenu() {
  const [open, setOpen] = useState<MenuKey | null>('products')

  return (
    <nav aria-label="Mobile" className="container flex min-h-full flex-col py-4">
      <MobileGroup k="products" label="Products" open={open} setOpen={setOpen}>
        {products.map((p) => (
          <Link key={p.name} href={p.href} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50">
            <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-lg ring-1 ring-black/5', p.markBg)}>
              <Image src={p.mark} alt="" width={22} height={22} unoptimized className="h-[22px] w-[22px] object-contain" />
            </span>
            <span>
              <span className="block font-semibold text-ink-900">{p.name}</span>
              <span className="block text-sm text-slate-500">{p.description}</span>
            </span>
          </Link>
        ))}
      </MobileGroup>
      <MobileGroup k="services" label="Services" open={open} setOpen={setOpen}>
        {serviceItems.map((s) => (
          <Link key={s.name} href={s.href} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <s.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold text-ink-900">{s.name}</span>
              <span className="block text-sm text-slate-500">{s.description}</span>
            </span>
          </Link>
        ))}
      </MobileGroup>
      {simpleLinks.map((l) => (
        <Link key={l.href} href={l.href} className="border-b border-slate-100 py-4 font-display text-xl font-semibold tracking-tight text-ink-900">
          {l.label}
        </Link>
      ))}

      <div className="mt-auto grid gap-3 pt-8">
        <ButtonLink href="/contact" className="w-full">
          Book a demo
        </ButtonLink>
        <ButtonLink href="/contact?topic=developer" variant="secondary" className="w-full">
          Hire a developer
        </ButtonLink>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <a href={links.sellixApp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 rounded-xl bg-slate-50 py-3 font-medium text-ink-900">
            Sellix sign-in <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
          <a href={links.bidchale} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 rounded-xl bg-bidchale-yellow py-3 font-semibold text-black">
            Bidchale <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </nav>
  )
}

function MobileGroup({
  k,
  label,
  open,
  setOpen,
  children,
}: {
  k: MenuKey
  label: string
  open: MenuKey | null
  setOpen: React.Dispatch<React.SetStateAction<MenuKey | null>>
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        aria-expanded={open === k}
        onClick={() => setOpen((o) => (o === k ? null : k))}
        className="flex w-full items-center justify-between py-4 text-left font-display text-xl font-semibold tracking-tight text-ink-900"
      >
        {label}
        <ChevronDownIcon className={cn('h-5 w-5 text-slate-400 transition-transform', open === k && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open === k && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
