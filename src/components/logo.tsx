import Image from 'next/image'
import { cn } from '@/lib/cn'

/*
 * Official Talixora logo assets (public/images/brand/talixora):
 *   mark.png              300×192  — the "T" mark (works on light and dark)
 *   wordmark.png          757×96   — navy TALIXORA wordmark, for light backgrounds
 *   wordmark-light.png    757×96   — white wordmark, for dark backgrounds
 *   logo-full(.png|-light.png) 1200×245 — full lockup with tagline
 *   logo-original.png     — the original artwork as supplied
 */

const MARK_RATIO = 300 / 192
const WORD_RATIO = 757 / 96
const FULL_RATIO = 1200 / 245

/** The "T" mark on its own. */
export function LogoMark({ className, height = 32 }: { className?: string; height?: number }) {
  return (
    <Image
      src="/images/brand/talixora/mark.png"
      alt=""
      width={Math.round(height * MARK_RATIO)}
      height={height}
      priority
      className={cn('h-auto w-auto shrink-0', className)}
      style={{ height }}
    />
  )
}

/** Mark + wordmark lockup used in the header and compact places. */
export function Logo({
  className,
  tone = 'dark',
  size = 'md',
}: {
  className?: string
  /** dark = navy wordmark for light backgrounds; light = white wordmark for dark backgrounds */
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}) {
  const markH = size === 'lg' ? 40 : size === 'sm' ? 26 : 32
  const wordH = Math.round(markH * 0.5)
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark height={markH} />
      <Image
        src={tone === 'light' ? '/images/brand/talixora/wordmark-light.png' : '/images/brand/talixora/wordmark.png'}
        alt="Talixora"
        width={Math.round(wordH * WORD_RATIO)}
        height={wordH}
        priority
        className="h-auto w-auto"
        style={{ height: wordH }}
      />
    </span>
  )
}

/** Full logo with the "Building Ideas. Shaping Tomorrow." tagline. */
export function LogoFull({ className, tone = 'dark', width = 260 }: { className?: string; tone?: 'dark' | 'light'; width?: number }) {
  return (
    <Image
      src={tone === 'light' ? '/images/brand/talixora/logo-full-light.png' : '/images/brand/talixora/logo-full.png'}
      alt="Talixora — Building Ideas. Shaping Tomorrow."
      width={width}
      height={Math.round(width / FULL_RATIO)}
      className={cn('h-auto', className)}
      style={{ width }}
    />
  )
}
