---
paths:
  - "src/components/**"
---

# Component rules

## Client vs server

Default to a server component. Add `"use client"` only when the component actually needs React
state, effects, event handlers, `window`, `localStorage`, `framer-motion`, or
`useReducedMotion`. Adding it "just in case" costs bundle size for nothing.

## Animation

`framer-motion` is the only animation library — do not add another.

- **Reduced motion is handled once**, by `<MotionConfig reducedMotion="user">` in `providers.tsx`:
  transforms are dropped, fades stay. Write motion props unconditionally.
- **Never branch markup or motion props on `useReducedMotion()`.** It is `false` on the server and
  `true` on the first client render, so the two trees differ, hydration fails, and React re-renders
  the document without the `dark` class. Read it inside an effect only; hide a decorative element
  with `motion-reduce:hidden`. `e2e/theme.spec.ts` holds the regression.
- Easing: `[0.25, 0.1, 0.25, 1]` for entrances, `[0.22, 1, 0.36, 1]` for button interactions.
- Enter on view: `useInView(ref, { once: true, margin: "-80px" })` or `whileInView` with
  `viewport={{ once: true }}`.
- `AnimatePresence mode="wait"` for toggled elements.
- Canonical reference: the variants block at the top of `sections/Hero.tsx`.

## Accessibility

- Preserve the `role="status"` / `aria-live="polite"` / `aria-atomic="true"` live region in the
  Hero word cycler.
- Every interactive element needs a visible focus ring:
  `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- Mark decorative motion elements `aria-hidden="true"`.
- The skip link lives in `src/app/page.tsx` and targets `#main-content`. Keep both.
- `e2e/a11y.spec.ts` scrolls each page to its end, then runs axe in both themes and fails on any
  serious or critical violation.

## Naming

`components/layout/` and `components/sections/` are PascalCase. `components/ui/` is kebab-case
(shadcn convention). Named exports everywhere.
