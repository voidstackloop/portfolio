import { Mail } from 'lucide-react'

import { CopyEmail } from '@/components/copy-email'
import { GithubIcon } from '@/components/icons/github'
import { Hero } from '@/components/hero'
import { ProjectCard } from '@/components/project-card'
import { SiteHeader } from '@/components/site-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { principles, profile, projects, stack } from '@/data/site'

function SectionHead({ id, title, aside }: { id: string; title: string; aside?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b pb-3">
      <h2 id={id} className="text-3xl font-bold tracking-tight">
        {title}
      </h2>
      {aside && <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{aside}</span>}
    </div>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg focus:ring-[3px] focus:ring-ring/50"
      >
        Skip to projects
      </a>
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 pb-24 sm:px-6">
        <Hero />

        <section aria-labelledby="projects-title" id="projects" className="flex scroll-mt-20 flex-col gap-6">
          <SectionHead id="projects-title" title="Selected projects" aside={`${projects.length} repos · all public on GitHub`} />
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section aria-labelledby="how-title" id="how-i-work" className="flex scroll-mt-20 flex-col gap-6">
          <SectionHead id="how-title" title="How I work" />
          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 border-t-2 border-foreground pt-4">
                <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="stack-title" id="stack" className="flex scroll-mt-20 flex-col gap-6">
          <SectionHead id="stack-title" title="Stack" />
          <div className="grid gap-8 md:grid-cols-3">
            {stack.map((group) => (
              <div key={group.group} className="flex flex-col gap-3">
                <h3 className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary" className="font-mono font-medium">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="contact-title" id="contact" className="flex scroll-mt-20 flex-col gap-6">
          <SectionHead id="contact-title" title="Get in touch" />
          <div className="flex flex-col gap-5">
            <p className="max-w-[52ch] text-lg text-muted-foreground">
              I'm looking for a remote backend role in Rust, Java or Python. The fastest way to reach me is email;
              the code is all on GitHub.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${profile.email}`}>
                  <Mail />
                  {profile.email}
                </a>
              </Button>
              <CopyEmail email={profile.email} />
              <Button asChild size="lg" variant="outline">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-4" />
                  {profile.githubLabel}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Separator />
        <div className="mx-auto flex max-w-5xl flex-wrap gap-x-4 gap-y-1 px-4 py-6 text-sm text-muted-foreground sm:px-6">
          <span>{profile.name}</span>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            {profile.githubLabel}
          </a>
          <a href={`mailto:${profile.email}`} className="underline-offset-4 hover:underline">
            {profile.email}
          </a>
        </div>
      </footer>
    </>
  )
}
