---
paths:
  - "src/packages/**"
---

# Domain packages

Each directory under `src/packages/` is a **deep module**: a lot of behaviour behind a small
interface.

- The **entry points** are the files at the package root. Everything in a subfolder is private.
- `lib/` holds the implementation. Any subfolder is private, so a new one never needs a config
  change.
- **Tests sit beside the entry point they exercise** — `index.test.ts` next to `index.ts` — and go
  through it. `lib/` has no test files, and that is the design, not an omission: a test that needs
  to see inside means the seam is in the wrong place.
- Outside code imports entry points only, and nothing imports a `*.test.ts`. `dependency-cruiser`
  enforces all of it as an error via `pnpm lint:boundaries`, in CI. Cycles are refused too.

## What belongs here

Behaviour with invariants: rules, state transitions, calculations. Not presentation, not
configuration, not constants. `src/data/*.ts` stays plain facts — anything derivable from those
facts is computed here instead of being stored and maintained by hand.

## Value objects, and deliberately nothing else

The rules live **on the objects**, not in helper functions beside them. `YearMonth` and `Period`
are value objects: immutable, compared by value, built through a factory that refuses an invalid
one. `Period.of("2017-06", "2016-01")` throws, and a private constructor means no caller can
assemble a period that ends before it starts. An invariant enforced by the type cannot be
forgotten at a call site.

**There is no entity, no aggregate and no repository here, and that is a decision.** An entity
needs identity and a lifecycle; a career entry is never mutated, re-identified or persisted. An
aggregate is a transactional consistency boundary; there is no write model and no transaction. A
repository loads from somewhere; `src/data/*.ts` is a literal. Adding those patterns would add
ceremony that carries no rule. Do not "complete the pattern".

## Discipline

Follow the `agentic-tdd` skill. In short: the seam is agreed before a test exists, one
behaviour per cycle, clean code on the first pass but only the behaviour the current test
demands, and no double for a collaborator we own.

## Mutation score

`pnpm test:mutation` runs Stryker over this directory only. It stands at **100% (41 mutants)**
and the build threshold is 90: that is a line to hold, not a target to chase. It runs weekly in
its own workflow, never in CI — it is slow, and it must not gate a deployment.

When a mutant survives, decide which kind it is before writing anything. A **real gap** means a
behaviour nothing asserts: add the test. An **equivalent mutant** cannot change observable
behaviour: writing a test for it is writing a test for nothing. If a value can be mutated
without any observable effect, the value carries no information — remove the variation rather
than cover it.

Reference: `cv/` stores start dates, optional end dates and an internship marker, and derives
the period label, the ordering and the total years of experience. A stored string that could
have been computed is the defect this package exists to prevent.

`date-fns` is imported by `lib/year-month.ts` and nowhere else, so the calendar library stays an
implementation detail of the `YearMonth` value object. Dates are **local** calendar dates
throughout: `parse` and `format` work in local time, and mixing them with a UTC-parsed
`new Date("2026-09-01")` shifts the month west of Greenwich.

The clock enters the domain at exactly one point, `YearMonth.from(date)`. Everything else speaks
`YearMonth`, including `totalYearsOfExperience`, which takes the month to count up to rather than
a timestamp it would have to reduce. A `Date` is a moment; the question here is a month.
