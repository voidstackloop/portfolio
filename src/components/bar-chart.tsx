import type { Bar } from '@/data/site'

type Props = {
  title: string
  caption: string
  bars: Bar[]
}

// Bars are drawn relative to the largest value. The numbers are real text, so the
// chart reads the same to a screen reader as it does on screen.
export function BarChart({ title, caption, bars }: Props) {
  const max = Math.max(...bars.map((bar) => bar.value))

  return (
    <figure className="flex flex-col gap-3" aria-label={caption}>
      <figcaption className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{title}</figcaption>
      <ul className="flex flex-col gap-2.5">
        {bars.map((bar) => (
          <li
            key={bar.label}
            className="grid grid-cols-[5.5rem_1fr_4.25rem] items-center gap-3 font-mono text-[0.8125rem] tabular-nums"
          >
            <span className="truncate text-muted-foreground">{bar.label}</span>
            <span aria-hidden="true" className="h-3 overflow-hidden rounded-sm bg-muted">
              <span
                className="bar-fill block h-full rounded-sm bg-primary"
                style={{ width: `${Math.max((bar.value / max) * 100, 1.5)}%` }}
              />
            </span>
            <span className="text-right text-foreground">{bar.display}</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
