/** Decorative background for dark hero sections: grid, glow and noise-free gradients. */
export function DarkBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-ink-900" />
      <div className="absolute inset-0 bg-grid-dark bg-[size:56px_56px] mask-radial opacity-70" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[120px]" />
      <div className="absolute -right-40 top-40 h-[380px] w-[380px] rounded-full bg-mint-400/15 blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-900" />
    </div>
  )
}
