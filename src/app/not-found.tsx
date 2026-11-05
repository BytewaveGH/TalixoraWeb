import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light bg-[size:56px_56px] mask-radial" />
      <header className="container relative flex h-16 items-center lg:h-[72px]">
        <Link href="/" aria-label="Talixora home">
          <Logo />
        </Link>
      </header>
      <main className="relative grid flex-1 place-items-center px-5 pb-24 text-center">
        <div>
          <p className="font-display text-8xl font-semibold tracking-tighter text-brand-500/20 sm:text-9xl">404</p>
          <h1 className="h-display mt-2 text-3xl sm:text-4xl">This page doesn’t exist.</h1>
          <p className="mx-auto mt-4 max-w-md text-slate-600">The link may be old, or the page may have moved. Let’s get you back on track.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" arrow>
              Go home
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </main>
    </div>
  )
}
