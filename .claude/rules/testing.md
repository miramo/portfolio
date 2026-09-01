---
paths:
  - "e2e/**"
  - "src/packages/**/*.test.ts"
  - "playwright.config.ts"
  - "vitest.config.mts"
---

# Testing in this repo

| Kind              | Where                      | Run with                     |
| ----------------- | -------------------------- | ---------------------------- |
| Unit, domain only | `src/packages/*/*.test.ts` | `pnpm test` (Vitest)         |
| Browser + a11y    | `e2e/*.spec.ts`            | `pnpm test:e2e` (Playwright) |
| Everything        | —                          | `pnpm verify`                |

There are **no unit tests for components**. This is deliberate: outside `src/packages/`, the
code is presentation with no invariants, and unit-testing it would assert the markup back at
itself. Characterisation e2e tests are the safety net there.

## How a test reads

The suite is a specification. The runner concatenates the nesting, so the nesting is the
sentence, and a product manager must recognise the product in it.

- **Given-When-Then in nested `describe`s**, the `it` carrying the Then. Reference:
  `Career timeline` › `Given a role that has already ended` › `When a recruiter reads the
experience section` › `shows the role running from its first month to its last`.
- **`describe` starts with a capital, `it` starts lowercase.** The `it` finishes the sentence its
  parents began; it never repeats them.
- **Name the persona when the behaviour belongs to someone** — a recruiter, a visitor, a keyboard
  user. Drop it when the actor is the system, as in a validation that refuses impossible input.
- **No loops.** A loop hides the cases and stops you replaying one on its own. Write them out;
  Vitest's `it.each` is the only acceptable parameterised form and Playwright has no equivalent.
- Small named builders (`aRole`, `anOngoingRole`, `anInternship`) and shared assertion helpers are
  welcome when they shorten the body. `beforeEach` is not used here: nothing needs setting up, and
  a `beforeEach` that assigns one constant just adds a hop.

## Rules that bite

- A test sits beside the entry point it exercises and imports it through that entry point,
  never `./lib/...`. Nothing imports a test file. `pnpm lint:boundaries` fails on both.
- The Playwright config **always rebuilds**: `serve` publishes `out/` without building it, so a
  suite pointed at an existing `out/` silently tests the previous build.
- `@axe-core/playwright` is pinned exactly. Its rules tighten between minor versions, and a
  lockfile refresh would otherwise turn CI red with no code change.
- The e2e job is deliberately **not** in `deploy`'s `needs`. It blocks pull requests, never the
  publication of `main`.
- Pin anything environmental a test depends on — `test.use({ colorScheme })` rather than
  inheriting whatever the runner has. A test that reads the environment tests the environment.
- The domain takes a `YearMonth`, never a `Date`, so a test builds a month with
  `YearMonth.parse("2026-09")` and constructs no `Date` at all. The single exception is the test
  covering the clock boundary, which uses the ISO **date-time** form
  `new Date("2026-09-30T23:00:00")`: that form is local in every timezone, while the date-only
  form is UTC and lands in the previous month west of Greenwich. `TZ=America/Los_Angeles pnpm test`
  is the check, and the last evening of a month is the only input that discriminates.

## Seeing a test fail — once, at the right moment

Every test has to be seen failing for the right reason. **When** depends on how it was written,
and the three mechanisms here do not overlap.

- **Test-first** gets it for free: the red step of the cycle _is_ the evidence. Breaking the code
  again afterwards proves nothing new, and re-running a green test is not a substitute.
- **Written after the code** has no red of its own. The e2e suite is in that position — it
  characterises behaviour that already shipped — so the red must be manufactured: break what it
  covers, watch it fail for the expected reason, restore. That is how the contrast gate and the
  theme default were confirmed.
- **`pnpm test:mutation`** is the standing, automated form of the same question over the domain,
  which is why nothing in `src/packages/` needs the manual ritual.
