import { ArrowUpRight } from 'lucide-react'

import { BarChart } from '@/components/bar-chart'
import { FlowView } from '@/components/flow'
import { InlineCode } from '@/components/inline-code'
import { ServiceMap } from '@/components/service-map'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Project } from '@/data/site'
import { cn } from '@/lib/utils'

export function ProjectCard({ project }: { project: Project }) {
  const aside = project.services ? (
    <ServiceMap services={project.services} />
  ) : project.chart ? (
    <BarChart title={project.chart.title} caption={project.chart.caption} bars={project.chart.bars} />
  ) : null

  return (
    <Card id={project.slug} className="scroll-mt-20 gap-0 p-0" aria-labelledby={`${project.slug}-title`}>
      <div className={cn('grid gap-8 p-6 sm:p-7', aside && 'lg:grid-cols-[1.15fr_1fr] lg:gap-10')}>
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{project.kicker}</p>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 font-mono text-[0.8125rem] font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              View repo
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">for {project.name} on GitHub (opens in a new tab)</span>
            </a>
          </div>
          <h3 id={`${project.slug}-title`} className="text-4xl font-bold tracking-tight sm:text-[2.5rem]">
            {project.name}
          </h3>
          <p className="max-w-[60ch] text-muted-foreground">{project.summary}</p>
          <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-primary">
            {project.highlights.map((item) => (
              <li key={item} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
          {project.stats && (
            <dl className="flex flex-wrap gap-x-8 gap-y-3">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="font-display text-3xl leading-none font-bold tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {project.note && (
            <p className="border-l-2 pl-3 text-[0.8125rem] text-muted-foreground">
              <InlineCode text={project.note} />
            </p>
          )}
          <ul className="flex flex-wrap gap-1.5" aria-label={`${project.name} technologies`}>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline" className="font-mono font-medium">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>

      <div className="flex flex-col gap-8 border-t bg-muted/40 p-6 sm:p-7">
        <section aria-labelledby={`${project.slug}-arch`} className="flex flex-col gap-5">
          <h4 id={`${project.slug}-arch`} className="font-display text-xl font-bold tracking-tight">
            How it&rsquo;s built
          </h4>
          <div
            className={cn(
              'grid gap-8',
              project.flows.length > 1 && 'md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {project.flows.map((flow) => (
              <FlowView key={flow.title} flow={flow} />
            ))}
          </div>
        </section>
        <section aria-labelledby={`${project.slug}-decisions`} className="flex flex-col gap-5">
          <h4 id={`${project.slug}-decisions`} className="font-display text-xl font-bold tracking-tight">
            Design decisions
          </h4>
          <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
            {project.decisions.map((decision) => (
              <div key={decision.title} className="flex flex-col gap-1.5">
                <dt className="font-semibold">{decision.title}</dt>
                <dd className="text-sm text-muted-foreground">{decision.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </Card>
  )
}
