import { team } from '@/content/site'
import { Reveal } from '@/components/reveal'

const palettes = [
  'from-brand-400 to-brand-700',
  'from-mint-400 to-brand-500',
  'from-violet-400 to-brand-700',
  'from-amber-400 to-rose-500',
  'from-sky-400 to-brand-600',
  'from-ink-600 to-brand-400',
]

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function TeamGrid() {
  return (
    <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((person, i) => (
        <li key={person.name}>
          <Reveal delay={i * 0.05} className="h-full">
            <article className="card flex h-full items-center gap-5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              <div
                aria-hidden="true"
                className={`relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${palettes[i % palettes.length]} font-display text-lg font-semibold text-white`}
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.35),transparent_60%)]" />
                <span className="relative">{initials(person.name)}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">{person.name}</h3>
                <p className="text-sm font-medium text-brand-600">{person.role}</p>
                {person.note && <p className="mt-0.5 text-sm text-slate-500">{person.note}</p>}
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
