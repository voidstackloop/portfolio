import type { Service } from '@/data/site'
import { cn } from '@/lib/utils'

const accent: Record<Service['lang'], string> = {
  rust: 'border-l-rust',
  java: 'border-l-primary',
  ts: 'border-l-border',
}

const legend: { lang: Service['lang']; label: string; swatch: string }[] = [
  { lang: 'java', label: 'Java', swatch: 'bg-primary' },
  { lang: 'rust', label: 'Rust', swatch: 'bg-rust' },
  { lang: 'ts', label: 'TypeScript', swatch: 'bg-border' },
]

export function ServiceMap({ services }: { services: Service[] }) {
  return (
    <figure className="flex flex-col gap-3" aria-label="escld services, coloured by language">
      <figcaption className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Services</figcaption>
      <ul className="grid grid-cols-2 gap-2">
        {services.map((service) => (
          <li
            key={service.name}
            className={cn('rounded-lg border border-l-[3px] bg-background px-3 py-2.5', accent[service.lang])}
          >
            <span className="block font-mono text-[0.8125rem] font-medium">{service.name}</span>
            <span className="text-xs text-muted-foreground">{service.detail}</span>
          </li>
        ))}
      </ul>
      <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {legend.map((item) => (
          <span key={item.lang} className="inline-flex items-center gap-1.5">
            <i aria-hidden="true" className={cn('inline-block size-2.5 rounded-[2px]', item.swatch)} />
            {item.label}
          </span>
        ))}
      </p>
    </figure>
  )
}
