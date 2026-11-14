import { expect, test } from "@playwright/test";

import { emulateReducedMotion } from "./support";

test.describe("Reduced motion", () => {
  test.describe("Given a visitor whose OS asks for reduced motion", () => {
    test("jumps to a section instead of gliding to it", async ({ page }) => {
      await emulateReducedMotion(page);
      await page.goto("/");

      await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
    });
  });

  test.describe("Given a visitor with no such preference", () => {
    test("glides to a section", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto("/");

      await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
    });
  });
});
