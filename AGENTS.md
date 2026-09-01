Personal portfolio — Next.js 16 App Router, fully static-exported to GitHub Pages at
`maximemiramond.com`. It is also the CV: the repository is public and the code is part of what
it argues.

> ⚠️ **This is NOT the Next.js you know.** Next 16 has breaking changes — APIs, conventions and
> file structure may all differ from your training data. Read the relevant guide in
> `node_modules/next/dist/docs/` before writing any Next-related code. Heed deprecation notices.

Detailed rules load on demand from `.claude/rules/` when you touch the files they cover:
static export, components, styling, domain packages, testing. This file holds only what is true
everywhere.

## Stack

Next 16 (`output: "export"`) · React 19 · TypeScript strict with `noUnusedLocals` and
`noUnusedParameters` · Tailwind v4, CSS-first · shadcn/ui `base-nova` · `framer-motion` 12 ·
Vitest · Playwright + axe · Node 24, pnpm 10. Path alias `@/*` → `./src/*`.

## Architecture

One rule, enforced rather than described: **dependencies point inward.** `src/packages/*` is the
domain — behaviour with invariants, expressed as value objects that refuse an illegal state. It
imports nothing from `src/app`, `src/components`, `src/data` or `src/lib`, and outside code may
only reach it through a package's entry points. `pnpm lint:boundaries` fails on either violation,
in CI.

There are deliberately **no ports and no adapters**. Hexagonal architecture decouples a domain
from its I/O; this site has none — it is statically exported, and its data layer is a TypeScript
literal compiled into the bundle. A repository interface with one in-memory implementation would
be an adapter for a boundary that does not exist. The same reasoning rules out entities and
aggregates: see `.claude/rules/domain.md`.

Third-party date handling is confined to `src/packages/cv/lib/year-month.ts`, behind the
`YearMonth` value object. Nothing else imports `date-fns`.

## Imports and TypeScript

- Use `@/…` everywhere. No relative deep imports (`../../components/...`).
- Inline type imports: `import { type Foo, bar } from "@/…"` — enforced.
- Let `simple-import-sort` order imports; don't fight it.
- `no-console` and `@typescript-eslint/no-explicit-any` are warnings. Treat both as blocking —
  fix them, don't suppress them.

## Craft

- **No useless comments.** Write one only when the _why_ is non-obvious: a hidden constraint, a
  workaround for a specific bug, a subtle invariant. Never explain what the code does. A comment
  that explains a badly named field is a modelling problem — fix the model, not the prose.
- Don't add error handling, fallbacks or validation for cases that cannot happen. Trust the
  framework and the type system.
- Don't add features, refactors or abstractions beyond the task. Three similar lines beat a
  premature abstraction. No half-finished implementations.
- Prefer editing an existing file to creating one. Don't write documentation unless asked.
- No emojis in code or UI unless asked.
- No backwards-compat hacks: no `_unused` renames, no `// removed` comments, no dead re-exports.
- All user-facing copy lives in `src/data/*.ts` — plain TypeScript, no JSX. Components import
  labels; they never hard-code strings.

## Commits

Format: `<gitmoji> <type>(<scope>): <subject>`. No Commitizen or commitlint — follow it by hand.
`🎉` is reserved for the initial commit, already used.

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

Scopes: `app`, `hero`, `about`, `experience`, `contact`, `cv`, `ui`, `layout`, `data`, `deps`.

**Never push without explicit approval.**

## Before marking a task DONE

`pnpm verify` runs the whole chain: `lint`, `format:check`, `lint:boundaries`, `typecheck`,
`test`, `test:e2e`. Stop and fix at the first failure.

A commit also runs `lint-staged` and `typecheck` through a Husky hook. That hook resolves `fnm`
itself, because git hooks do not inherit the shell environment that puts `node` on the PATH.

**UI change** → look at it in a browser: golden path, both themes, reduced motion, mobile
viewport. **OG image, sitemap or metadata touched** → check `/og.png`, `/sitemap.xml` and
`/robots.txt` against the local build.

## CI

`.github/workflows/ci.yml`. The `build` job runs lint, boundaries, typecheck, unit tests and the
build, then uploads the Pages artifact; `deploy` depends on it. The `e2e` job runs the browser
and accessibility suite **outside** that chain, so a browser failure blocks a pull request but
never the publication of `main`.

## Reference

- `node_modules/next/dist/docs/` — Next 16 source of truth
- `.claude/rules/` — the path-scoped detail
- `src/app/globals.css` — design tokens
- `src/data/*.ts` — editable content
- `eslint.config.mjs`, `next.config.ts`, `tsconfig.json`, `.dependency-cruiser.cjs`

## Keeping this file up to date

If a session establishes something general — a new pattern, a naming decision, a constraint —
propose an update here or in the matching rule. Don't modify it silently.
