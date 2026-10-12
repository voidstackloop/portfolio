import { ArrowRight } from 'lucide-react'

import type { Flow } from '@/data/site'

export function FlowView({ flow }: { flow: Flow }) {
  const chips = flow.kind === 'chips'

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <h4 className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">{flow.title}</h4>
      {chips ? (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {flow.steps.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-lg border bg-background px-3 py-1.5 text-sm">{step}</span>
              {index < flow.steps.length - 1 && (
                <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
              )}
            </li>
          ))}
        </ol>
      ) : (
        <ol className="flex flex-col">
          {flow.steps.map((step, index) => (
            <li key={step} className="relative flex gap-3 pb-4 last:pb-0">
              {index < flow.steps.length - 1 && (
                <span aria-hidden="true" className="absolute top-7 bottom-0 left-[0.8125rem] w-px bg-border" />
              )}
              <span
                aria-hidden="true"
                className="relative grid size-[1.625rem] shrink-0 place-items-center rounded-full border bg-background font-mono text-xs text-muted-foreground"
              >
                {index + 1}
              </span>
              <span className="pt-0.5 text-sm">{step}</span>
            </li>
          ))}
        </ol>
      )}
      {flow.note && <p className="text-[0.8125rem] text-muted-foreground">{flow.note}</p>}
    </div>
  )
}
