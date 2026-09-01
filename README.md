<p align="center">
  <img src="./logo.svg" alt="maxime.dev" height="40" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-+_Stryker-6E9F18?logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-+_axe-2EAD33?logo=playwright&logoColor=white" />
  <img src="https://github.com/miramo/portfolio/actions/workflows/ci.yml/badge.svg" />
</p>

<p align="center">
  <i>A personal portfolio. Because apparently LinkedIn isn't enough anymore.</i>
</p>

---

## Architecture

```mermaid
flowchart LR
    subgraph outer ["presentation and content"]
        direction TB
        app["<b>src/app</b><br/>routes · metadata · OG"]
        components["<b>src/components</b><br/>layout · sections · ui"]
        data["<b>src/data</b><br/>content, no JSX"]
        lib["<b>src/lib</b><br/>app glue"]
    end

    domain["<b>src/packages/cv</b><br/>the only place with rules"]

    app ==> domain
    components ==> domain
    data ==> domain
    lib ==> domain

    classDef plain fill:#3f3f46,stroke:#71717a,stroke-width:1px,color:#fafafa
    classDef core fill:#b45309,stroke:#f59e0b,stroke-width:2px,color:#ffffff
    class app,components,data,lib plain
    class domain core
    style outer fill:transparent,stroke:#a1a1aa,stroke-width:1px,stroke-dasharray:6 6,color:#8b8b96
```

Dependencies point inward, and `pnpm lint:boundaries` fails CI the day one doesn't. Architecture
diagrams should be executable, not aspirational.

No ports, no adapters, no repositories: it's a static site whose database is a TypeScript array.
There is nothing to decouple from, and a hexagon with one side is just a line.

## Structure

```
src/
├── app/           # routes, layout, OG image, SEO
├── components/    # layout · sections · ui
├── data/          # all content. no JSX allowed.
├── lib/           # glue between the content and the domain
└── packages/      # the domain. entry point at the root, internals private
```

## Commands

```bash
pnpm dev        # → http://localhost:3000
pnpm build      # → out/  (static, deploy anywhere)
pnpm verify     # what CI runs: lint, boundaries, types, unit, browser, a11y
pnpm lint:fix   # because the linter is always right
```

Conventions for humans and agents live in `AGENTS.md` and `.claude/rules/`.
