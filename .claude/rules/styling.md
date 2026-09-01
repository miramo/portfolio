---
paths:
  - "src/app/globals.css"
  - "src/components/**"
  - "src/app/cv/**"
---

# Styling — Tailwind v4, CSS-first

There is no `tailwind.config.*` and there must not be one. Tokens, dark-mode overrides and
custom utilities all live in `src/app/globals.css`.

- Tokens are `oklch()` values declared in `@theme inline` plus `:root` (light) and `.dark`.
- Use semantic tokens: `bg-background`, `text-foreground`, `text-primary`, `border-border`,
  `text-muted-foreground`, `bg-muted`, `text-accent-foreground`. Reach for a raw colour only on
  the CV page, which is print-oriented and always on white.
- Reuse `.glass`, `.glass-amber`, `.text-gradient`. Extend under `@layer utilities`.

## Dark mode

Class-based (`.dark` on `<html>`), managed by the handwritten `Providers` context and a
blocking inline `<script>` in `layout.tsx`. **Dark is the default and `prefers-color-scheme` is
deliberately not consulted**: the site looks the same to every first-time visitor, and only an
explicit choice stored in `localStorage.theme` changes it. Do not "improve" this by following
the OS — that was the behaviour before, and it contradicted the `Providers` default of
`isDark: true`. Do not replace this with `next-themes`.

## Contrast

Colour choices are gated: axe fails the build's e2e job on any serious violation, in both
themes. Check a pair before shipping it rather than after — WCAG AA wants 4.5:1 for body text
and 3:1 for large text.
