import Image from 'next/image'
import { cn } from '@/lib/cn'

/** Sellix logo: official mark + gradient wordmark (matches sellix.bidchale.com). */
export function SellixLogo({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const mark = size === 'lg' ? 44 : size === 'sm' ? 24 : 32
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Image src="/images/brand/sellix-mark-96.png" alt="" width={mark} height={mark} className="shrink-0" />
      <span
        className={cn(
          'bg-gradient-to-r from-sellix-purple to-sellix-blue bg-clip-text font-display font-bold tracking-tight text-transparent',
          size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-lg' : 'text-2xl',
        )}
      >
        sellix
      </span>
      <span className="sr-only">Sellix</span>
    </span>
  )
}

/** Bidchale logo (official artwork from bidchale.com). */
export function BidchaleLogo({
  className,
  tone = 'dark',
  height = 28,
}: {
  className?: string
  tone?: 'dark' | 'light'
  height?: number
}) {
  // Source artwork is 2376×1022 (≈2.32:1).
  return (
    <Image
      src={tone === 'light' ? '/images/brand/bidchale-logo-white.png' : '/images/brand/bidchale-logo-black.png'}
      alt="Bidchale"
      width={Math.round(height * 2.325)}
      height={height}
      className={cn('h-auto w-auto object-contain', className)}
      style={{ height }}
    />
  )
}
