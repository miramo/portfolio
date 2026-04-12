<p align="center">
  <img src="./logo.svg" alt="maxime.dev" height="40" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-ff0055?logo=framer&logoColor=white" />
  <img src="https://github.com/miramo/portfolio/actions/workflows/ci.yml/badge.svg" />
</p>

<p align="center">
  <i>A personal portfolio. Because apparently LinkedIn isn't enough anymore.</i>
</p>

---

## Stack

- **[Next.js 16](https://nextjs.org)** — `output: "export"`, fully static, no server required
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first, dark/light theming via CSS custom properties
- **[Framer Motion](https://www.framer.com/motion/)** — animations with `useReducedMotion` support
- **TypeScript strict** — because `any` is a cry for help

## Commands

```bash
pnpm dev        # → http://localhost:3000
pnpm build      # → out/  (static, deploy anywhere)
pnpm preview    # serve the build locally
pnpm lint:fix   # because the linter is always right
```

## Structure

```
src/
├── app/           # routes, layout, OG image, SEO
├── components/    # layout · sections · ui
└── data/          # all content. no JSX allowed.
```

