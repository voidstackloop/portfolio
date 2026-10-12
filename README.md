# portfolio

Voidstackloop's portfolio site, built with Vite, React 19, TypeScript, Tailwind CSS v4 and shadcn/ui.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then writes dist/
npm run lint
```

## Edit the content

All copy lives in `src/data/site.ts`: the profile, the projects (with their charts and the escld service map), the principles and the stack. Components in `src/components` only render that data, so adding or removing a project is a change to one file.

Every claim on the page has to match the public repos. In particular, escld was designed and tested locally and has never been deployed, so it must not be described as running in production.

## Deploy on Vercel

1. Import this repository in Vercel (Add New > Project).
2. Leave the framework preset on **Vite**. `vercel.json` already sets the build command (`npm run build`) and the output directory (`dist`).
3. Deploy. Every push to `main` redeploys automatically.

## Theme

The light and dark themes are shadcn CSS variables in `src/index.css` (oklch). The theme toggle in the header stores the choice in `localStorage`; with no saved choice the page follows the system setting, and an inline script in `index.html` applies it before first paint so the page never flashes.
