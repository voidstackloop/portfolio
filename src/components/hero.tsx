import { Mail } from 'lucide-react'

import { CopyEmail } from '@/components/copy-email'
import { GithubIcon } from '@/components/icons/github'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { profile, projects } from '@/data/site'

const proof = [
  { value: '44.8k', label: 'lines of code in escld, an 8-service system', project: 'escld' },
  { value: '47.85 s → 8.14 s', label: 'formwatch on 35 forms, 1 worker to 8', project: 'formwatch' },
  { value: '+8.14 pts', label: 'average accuracy recovered by buffdata', project: 'buffdata' },
]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-14 pb-4 sm:pt-20">
      <div className="flex flex-col gap-6">
        <Badge variant="outline" className="gap-2 rounded-full px-3 py-1 font-mono text-xs font-medium">
          <span aria-hidden="true" className="size-2 rounded-full bg-emerald-500" />
          {profile.availability}
        </Badge>
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{profile.kicker}</p>
          <h1
            id="hero-title"
            className="text-[clamp(3.25rem,11vw,6.5rem)] leading-[0.95] font-extrabold tracking-tight"
          >
            {profile.name}
            <span className="text-primary">.</span>
          </h1>
          <p className="max-w-[40ch] text-xl text-muted-foreground sm:text-2xl">
            <span className="font-semibold text-foreground">{profile.role}.</span> {profile.summary}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="size-4" />
              {profile.githubLabel}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${profile.email}`}>
              <Mail />
              {profile.email}
            </a>
          </Button>
          <CopyEmail email={profile.email} />
        </div>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-3" aria-label="Highlights">
        {proof.map((item) => (
          <li key={item.project}>
            <Card className="h-full gap-2 p-5">
              <p className="font-display text-3xl leading-none font-bold tracking-tight tabular-nums">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <a
                href={`#${item.project}`}
                className="mt-auto pt-2 font-mono text-xs text-primary underline-offset-4 hover:underline"
              >
                See {projects.find((p) => p.slug === item.project)?.name}
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
