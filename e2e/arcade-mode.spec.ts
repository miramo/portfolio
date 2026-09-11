import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

// Keydown listeners only exist once React has hydrated; a code typed before that is lost.
async function openTheSite(page: Page) {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
}

async function typeTheKonamiCode(page: Page) {
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("b");
  await page.keyboard.press("a");
}

test.describe("Arcade mode", () => {
  test.describe("Given a visitor who knows the Konami code", () => {
    test("turns the site into an arcade and says so out loud", async ({ page }) => {
      await openTheSite(page);
      await typeTheKonamiCode(page);

      await expect(page.locator("html")).toHaveClass(/arcade/);
      // The live region is a permanent, zero-sized wrapper, so the assertion targets the
      // banner inside it rather than the region itself.
      const liveRegion = page.locator("[role=status][aria-live=polite]", {
        hasText: "Achievement unlocked",
      });
      await expect(liveRegion.getByText("Achievement unlocked")).toBeVisible();
    });

    test("leaves the arcade behind on the next reload", async ({ page }) => {
      await openTheSite(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);

      await page.reload();

      await expect(page.locator("html")).not.toHaveClass(/arcade/);
    });
  });

  test.describe("Given a visitor already in arcade mode", () => {
    test("gets the ordinary site back by typing the code a second time", async ({ page }) => {
      await openTheSite(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);

      await typeTheKonamiCode(page);

      await expect(page.locator("html")).not.toHaveClass(/arcade/);
    });

    test("gets the ordinary site back by pressing Escape", async ({ page }) => {
      await openTheSite(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);

      await page.keyboard.press("Escape");

      await expect(page.locator("html")).not.toHaveClass(/arcade/);
    });

    test("raises no serious or critical accessibility violation", async ({ page }) => {
      // axe reads composited colours, and the CRT layer sits over the whole page: with the
      // flicker running, every run measures a different composite. Reduced motion freezes it.
      // `test.use({ reducedMotion })` does not reach the page here — emulateMedia does.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await openTheSite(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);
      // The arrow keys scroll the page and the vignette is fixed to the viewport.
      await page.evaluate(() => window.scrollTo(0, 0));

      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const blocking = violations.filter(
        ({ impact }) => impact === "critical" || impact === "serious"
      );

      expect(blocking.map(({ id, nodes }) => `${id} (${nodes.length})`)).toEqual([]);
    });
  });
});
