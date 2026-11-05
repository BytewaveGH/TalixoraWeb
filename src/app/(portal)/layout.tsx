import type { Metadata } from 'next'
import 'devextreme/dist/css/dx.light.css'
import PortalShell from '@/components/portal/portal-shell'

export const metadata: Metadata = {
  title: 'Portal',
  robots: { index: false, follow: false },
}

/** Internal Talixora portal (sign-in + admin dashboard). Kept separate from the marketing site. */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>
}
