'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Logo } from '@/components/logo'
import { ButtonLink } from '@/components/ui/button'
import { nav } from '@/content/site'
import { cn } from '@/lib/cn'

/** Routes whose hero is dark, so the header starts transparent with light text. */
const DARK_HERO_ROUTES = ['/', '/products/sellix', '/products/bidchale', '/services']

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation.
  useEffect(() => {
    setOpen(false)
    setMenu(null)
  }, [pathname])

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setMenu(null), setOpen(false))
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onDark = DARK_HERO_ROUTES.includes(pathname) && !scrolled && !open && !menu

  const isActive = (href: string) => {
    const path = href.split('#')[0]
    return path !== '/' && (pathname === path || pathname.startsWith(path + '/'))
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        onDark
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-slate-200/70 bg-white/85 backdrop-blur-xl',
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-[72px]">
        <Link href="/" aria-label="Talixora home" className="rounded-lg">
          <Logo tone={onDark ? 'light' : 'dark'} />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((group) =>
            group.items ? (
              <div key={group.label} className="relative" onMouseLeave={() => setMenu(null)}>
                <button
                  type="button"
                  aria-expanded={menu === group.label}
                  aria-haspopup="true"
                  onClick={() => setMenu((m) => (m === group.label ? null : group.label))}
                  onMouseEnter={() => setMenu(group.label)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    onDark ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-ink-900',
                    (isActive(group.href) || group.items.some((i) => isActive(i.href))) && (onDark ? 'text-white' : 'text-ink-900'),
                  )}
                >
                  {group.label}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={cn('h-3.5 w-3.5 transition-transform', menu === group.label && 'rotate-180')}
                  />
                </button>
                <AnimatePresence>
                  {menu === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lift">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenu(null)}
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-slate-50"
                          >
                            <span className="block text-sm font-semibold text-ink-900">{item.label}</span>
                            {item.description && <span className="mt-0.5 block text-sm text-slate-500">{item.description}</span>}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={group.href}
                href={group.href}
                aria-current={isActive(group.href) ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  onDark ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-ink-900',
                  isActive(group.href) && (onDark ? 'text-white' : 'text-ink-900'),
                )}
              >
                {group.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/contact?topic=developer" size="sm" variant={onDark ? 'ghost-dark' : 'secondary'}>
            Hire a developer
          </ButtonLink>
          <ButtonLink href="/contact" size="sm" variant={onDark ? 'light' : 'primary'}>
            Book a demo
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden',
            onDark ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-slate-100',
          )}
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 64px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-slate-200 bg-white md:hidden"
          >
            <nav aria-label="Mobile" className="container flex flex-col gap-6 py-6">
              {nav.map((group) => (
                <div key={group.label}>
                  <Link href={group.href} className="font-display text-2xl font-semibold tracking-tight text-ink-900">
                    {group.label}
                  </Link>
                  {group.items && (
                    <ul className="mt-2 space-y-1 border-l border-slate-200 pl-4">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block py-1.5 text-slate-600 hover:text-ink-900">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="mt-2 grid gap-3">
                <ButtonLink href="/contact" className="w-full">
                  Book a demo
                </ButtonLink>
                <ButtonLink href="/contact?topic=developer" variant="secondary" className="w-full">
                  Hire a developer
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
