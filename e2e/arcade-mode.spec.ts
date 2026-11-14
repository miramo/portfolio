import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

import { emulateReducedMotion, openTheHydratedPage } from "./support";

async function stopTheClock(page: Page) {
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1_000));
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

/**
 * Drives the mouse directly: `Locator.click()` re-runs its actionability checks on every tap,
 * which alone eats the 600 ms the streak allows between two taps.
 */
async function tapTheAvatar(page: Page, times: number, everyMs = 0) {
  const box = await page.getByAltText(/Maxime/i).boundingBox();
  if (!box) throw new Error("the avatar is not on screen");

  for (let i = 0; i < times; i++) {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    if (everyMs > 0) await page.waitForTimeout(everyMs);
  }
}

test.describe("Arcade mode", () => {
  test.describe("Given a visitor who knows the Konami code", () => {
    test("turns the site into an arcade and says so out loud", async ({ page }) => {
      await openTheHydratedPage(page);
      await typeTheKonamiCode(page);

      await expect(page.locator("html")).toHaveClass(/arcade/);
      const liveRegion = page.locator("[role=status][aria-live=polite]", {
        hasText: "Achievement unlocked",
      });
      await expect(liveRegion.getByText("Achievement unlocked")).toBeVisible();
    });

    test("hides the announcement after five seconds, and stays in the arcade", async ({ page }) => {
      await page.clock.install();
      await emulateReducedMotion(page);
      await openTheHydratedPage(page);
      await stopTheClock(page);
      await typeTheKonamiCode(page);
      const banner = page.getByText("Achievement unlocked");
      await expect(banner).toBeVisible();

      await page.clock.runFor(4_900);
      await expect(banner).toBeVisible();
      await page.clock.runFor(200);

      await expect(banner).toBeHidden();
      await expect(page.locator("html")).toHaveClass(/arcade/);
    });

    test("leaves the arcade behind on the next reload", async ({ page }) => {
      await openTheHydratedPage(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);

      await page.reload();

      await expect(page.locator("html")).not.toHaveClass(/arcade/);
    });
  });

  test.describe("Given a visitor already in arcade mode", () => {
    test("gets the ordinary site back by typing the code a second time", async ({ page }) => {
      await openTheHydratedPage(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);

      await typeTheKonamiCode(page);

      await expect(page.locator("html")).not.toHaveClass(/arcade/);
    });

    test("gets the ordinary site back by pressing Escape", async ({ page }) => {
      await openTheHydratedPage(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);

      await page.keyboard.press("Escape");

      await expect(page.locator("html")).not.toHaveClass(/arcade/);
    });

    test("raises no serious or critical accessibility violation", async ({ page }) => {
      await emulateReducedMotion(page);
      await openTheHydratedPage(page);
      await typeTheKonamiCode(page);
      await expect(page.locator("html")).toHaveClass(/arcade/);
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

  test.describe("Given a visitor with no keyboard at hand", () => {
    test("unlocks the arcade by tapping the avatar seven times in a row", async ({ page }) => {
      await openTheHydratedPage(page);

      await tapTheAvatar(page, 7);

      await expect(page.locator("html")).toHaveClass(/arcade/);
    });

    test("unlocks nothing when the taps are spaced out", async ({ page }) => {
      await openTheHydratedPage(page);

      await tapTheAvatar(page, 7, 700);

      await expect(page.locator("html")).not.toHaveClass(/arcade/);
    });
  });
});
