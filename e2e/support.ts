import { type Page } from "@playwright/test";

/** Opens a page and waits for React to hydrate it: handlers and listeners only exist from then. */
export async function openTheHydratedPage(page: Page, path = "/") {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
}

/** Emulates `prefers-reduced-motion: reduce`, which `test.use({ reducedMotion })` does not reach. */
export async function emulateReducedMotion(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
}
