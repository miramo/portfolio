<!-- BEGIN:nextjs-agent-rules -->

Personal portfolio — Next.js 16 App Router, fully static-exported to GitHub Pages at `maximemiramond.com`.

> ⚠️ **This is NOT the Next.js you know.** Next 16 has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next-related code. Heed deprecation notices.

## Stack snapshot

- Next.js 16 App Router — `output: "export"` (full static, no server required)
- React 19, TypeScript strict + `noUnusedLocals` + `noUnusedParameters`
- Node 24, pnpm 10 — see `.node-version` and `package.json` for exact versions
- Tailwind v4 — CSS-first config, no `tailwind.config.*`
- shadcn/ui `base-nova` / neutral / `rsc: true`, `lucide-react`, `@base-ui/react`, `framer-motion` 12
- Path alias: `@/*` → `./src/*`

## Static export constraints

> ⚠️ Violating any of these breaks `next build` or produces a broken deployment.

- **No server actions** — `"use server"` is forbidden.
- **No Route Handlers** — no `route.ts` files.
- **No middleware** — no `middleware.ts`.
- **All data must be fetched at build time** — no runtime data fetching, no `revalidate` at runtime.
- **`next/image` is globally `unoptimized: true`** — do not use custom loaders or remote `placeholder="blur"`.
- **Every metadata route must `export const dynamic = "force-static"`** — applies to `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, and any future equivalents.
- OG image reads font/avatar files via `fs.readFileSync(join(process.cwd(), "public", ...))`.

## Project layout

```
src/
  app/             layout.tsx  page.tsx  globals.css  favicon.ico
                   opengraph-image.tsx  sitemap.ts  robots.ts
                   not-found.tsx  error.tsx ("use client")
                   cv/page.tsx   (robots: index false, print stylesheet)
  components/
    layout/        Navbar.tsx  Footer.tsx                 ← PascalCase
    sections/      Hero  About  Experience  Contact  ContactCta  ← PascalCase
    ui/            badge  glass-card  interactive-grid    ← kebab-case (shadcn)
                   print-button  scroll-progress  section-header
                   social-icons  theme-toggle
    providers.tsx  (client — exports Providers + useThemeContext)
  data/            constants.ts  hero.ts  about.ts  experience.ts
  lib/             utils.ts   (cn = twMerge(clsx(...)))
public/            avatar.webp  avatar-og.png
                   fonts/inter-bold.woff  fonts/jetbrains-mono.woff
```

- Route files (`page.tsx`, `layout.tsx`, `error.tsx`, …) stay lowercase — Next.js requires it.
- `components/layout/` and `components/sections/`: PascalCase filenames.
- `components/ui/`: kebab-case (shadcn convention).
- Named exports everywhere (`export function Hero()`). Default export only when Next requires it (`page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`, and metadata routes).
- `src/data/*.ts`: plain TypeScript only (`as const` objects/arrays, no JSX). All user-facing copy lives here — components import labels, they don't hard-code strings.

## Client vs server boundaries

- Default = server component. Only add `"use client"` when the component actually needs: React state, effects, event handlers, `window`, `localStorage`, `framer-motion`, or `useReducedMotion`.
- **Never** put `"use client"` on `layout.tsx`, `page.tsx`, or `cv/page.tsx`.

## Styling — Tailwind v4 CSS-first

- There is no `tailwind.config.*`. Tokens, dark mode overrides, and custom utilities all live in `src/app/globals.css`.
- Tokens are expressed in `oklch()` and defined in `@theme inline` (mapped to CSS variables) + `:root` (light) + `.dark` (dark overrides).
- Use semantic tokens: `bg-background`, `text-foreground`, `text-primary`, `border-border`, `text-muted-foreground`, `bg-muted`, `text-accent-foreground`.
- Reuse existing utilities: `.glass`, `.glass-amber`, `.text-gradient`. Extend in `@layer utilities` if needed.
- **Dark mode** is class-based (`.dark` on `<html>`). It is managed by the handwritten `Providers` context (`src/components/providers.tsx`) and a blocking inline `<script>` in `layout.tsx` that reads `localStorage.theme` (default `"dark"`) before first paint. Do not replace this with `next-themes`.
- Focus rings: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` on every interactive element.

## Animation

- `framer-motion` 12 is the only animation library — do not add another.
- **Always gate animation behavior on `useReducedMotion()`**: set motion props to `undefined` or `false` when `reducedMotion` is true. The `globals.css` `prefers-reduced-motion` reset is a backstop, not a replacement.
- Reuse the established easing curves: `[0.25, 0.1, 0.25, 1]` for entrance/generic, `[0.22, 1, 0.36, 1]` for button interactions.
- Enter-on-view pattern: `useInView(ref, { once: true, margin: "-80px" })` or `whileInView` + `viewport={{ once: true }}`.
- Canonical animation reference: `src/components/sections/Hero.tsx` (the variants block at the top of the file — `container`, `item`, button hover/tap, easing constants).
- `AnimatePresence mode="wait"` for toggled elements.

## Imports & TypeScript

- Use `@/…` path alias for everything — no relative `../../` deep imports.
- Inline type imports: `import { type Foo, bar } from "@/…"` (`@typescript-eslint/consistent-type-imports` with `fixStyle: "inline-type-imports"` is enforced).
- Let `simple-import-sort` order imports — don't manually fight it.
- `no-console` and `@typescript-eslint/no-explicit-any` are ESLint warnings. Treat both as blocking before shipping — fix them, don't suppress.

## Accessibility baseline

- Keep the skip-link in `layout.tsx`.
- Preserve the `role="status"` / `aria-live="polite"` / `aria-atomic="true"` live region in the Hero word cycler.
- Every interactive element must have a visible focus ring (see Styling section).
- Mark decorative motion elements with `aria-hidden="true"`.
- Respect reduced motion (see Animation section).

## Craft rules

- **No useless comments.** Only write a comment when the WHY is non-obvious: a hidden constraint, a workaround for a specific bug, a subtle invariant. Never explain what the code does. Never reference the current task or callers.
- Don't add error handling, fallbacks, or validation for scenarios that can't happen. Trust the framework and TypeScript.
- Don't add features, refactors, or abstractions beyond the task. Three similar lines beat a premature abstraction. No half-finished implementations.
- Prefer editing existing files to creating new ones. Don't create documentation unless explicitly asked.
- No emojis in code or UI unless explicitly requested.
- No backwards-compat hacks: no `_unused` renames, no `// removed` comments for deleted code, no dead re-exports.

## Anti-patterns

- Adding `"use client"` "just in case" to a server-capable component.
- Using `next/image` features that require the image optimizer (custom loaders, remote `placeholder="blur"`).
- Adding server actions, Route Handlers, or middleware — they break `output: "export"`.
- Creating or editing a `tailwind.config.*` — there is none; configure everything in `globals.css`.
- Relative deep imports (`../../components/...`).
- Hard-coding copy in JSX when `src/data/*.ts` would do.
- Using `framer-motion` without gating on `useReducedMotion`.
- Leaving `console.log` in committed code.
- Replacing the custom theme provider with `next-themes`.

## Commits

Format: `<gitmoji> <type>(<scope>): <subject>`

No Commitizen or commitlint is configured — follow the convention manually. `🎉` is reserved for the initial commit only (already used: `🎉 feat(app): initial release`).

| Emoji | Type       | When                       |
| ----- | ---------- | -------------------------- |
| ✨    | `feat`     | New user-facing feature    |
| 🐛    | `fix`      | Bug fix                    |
| ♻️    | `refactor` | Behavior-preserving change |
| ⚡    | `perf`     | Performance improvement    |
| 💄    | `style`    | Visual / CSS-only change   |
| 🔧    | `chore`    | Tooling, deps, config      |
| 📝    | `docs`     | Documentation only         |
| 💥    | `breaking` | Breaking change            |

Suggested scopes: `app`, `hero`, `about`, `experience`, `contact`, `cv`, `ui`, `layout`, `data`, `deps`.

## Before marking a task DONE

Run in order — stop and fix if anything fails:

1. `pnpm lint` (or `pnpm lint:fix`) — zero errors, no new warnings.
2. `pnpm format:check` (or `pnpm format`).
3. `pnpm build` — must produce `out/` cleanly. Any build-time error is blocking.
4. **UI change** → `pnpm preview` (or `pnpm dev`) and verify in a browser: golden path, dark + light theme, reduced-motion (toggle via OS setting), mobile viewport.
5. **OG image / sitemap / metadata touched** → open `/opengraph-image`, `/sitemap.xml`, `/robots.txt` against the local build and confirm they generate correctly.

## CI

GitHub Actions (`.github/workflows/ci.yml`): `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm build`.
Pages deploy on push to `main`. A CI failure means no deployment.

## Reference

- `node_modules/next/dist/docs/` — Next 16 source of truth for all Next APIs
- `src/app/globals.css` — design tokens, dark mode tokens, semantic utilities
- `src/data/*.ts` — all editable content
- `.github/workflows/ci.yml` — CI + Pages deploy pipeline
- `components.json` — shadcn config (`base-nova`, neutral, path aliases)
- `eslint.config.mjs`, `next.config.ts`, `tsconfig.json` — wired-in rules; change with care

## Keeping this file up to date

If during a session you establish something general — a new pattern, a naming decision, a constraint — propose an update to this file at the end. Don't modify it automatically. The decision and the commit belong to the user.

<!-- END:nextjs-agent-rules -->
