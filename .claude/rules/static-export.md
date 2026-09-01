---
paths:
  - "src/app/**"
  - "next.config.ts"
---

# Static export constraints

`output: "export"` — the site is fully prerendered and no server runs. Violating any of
these breaks `next build` or ships a broken deployment.

- **No server actions.** `"use server"` is forbidden.
- **No middleware.** No `middleware.ts`.
- **All data is fetched at build time.** No runtime fetching, no runtime `revalidate`.
- **Route Handlers are allowed only as prerendered `GET`s.** `route.ts` needs
  `export const dynamic = "force-static"` and a `GET` export; anything else has no server to
  run on. `src/app/og.png/route.tsx` is the working example — it exists so scrapers get a
  real `.png` rather than an extensionless route.
- **Every metadata route must `export const dynamic = "force-static"`** — `sitemap.ts`,
  `robots.ts`, `opengraph-image.tsx`, and any future equivalent.
- **`next/image` is globally `unoptimized: true`.** No custom loaders, no remote
  `placeholder="blur"` — both need the optimizer, which needs a server.
- The OG image reads fonts and the avatar from disk with
  `fs.readFileSync(join(process.cwd(), "public", ...))`.

Route files stay lowercase (`page.tsx`, `layout.tsx`, `error.tsx`): Next requires it. Default
exports only where Next requires them; named exports everywhere else.

**Never** put `"use client"` on `layout.tsx`, `page.tsx`, or `cv/page.tsx`.
