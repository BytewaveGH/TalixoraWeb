'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layout } from 'antd'
import AdminShell from './admin-shell'
import { Logo } from '@/components/logo'

/** Admin routes get the dashboard shell; other portal pages (sign-in) get a minimal frame. */
export default function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''

  if (pathname.startsWith('/admin')) {
    return (
      <Layout className="h-screen w-full">
        <AdminShell child={children} />
      </Layout>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="Talixora home">
          <Logo />
        </Link>
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-ink-900">
          ← Back to website
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-10">{children}</main>
    </div>
  )
}
