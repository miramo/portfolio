import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

/** Scrolls to the end: entrance animations hold what is below the fold at opacity 0, and axe skips it. */
async function revealEverything(page: Page) {
  await page.waitForLoadState("networkidle");
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let scrolled = 0; scrolled < height; scrolled += 300) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(1000);
}

async function expectNoBlockingViolation(page: Page, path: string, theme: "dark" | "light") {
  await page.addInitScript((value) => window.localStorage.setItem("theme", value), theme);
  await page.goto(path);
  await revealEverything(page);

  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const blocking = violations.filter(({ impact }) => impact === "critical" || impact === "serious");

  expect(blocking.map(({ id, nodes }) => `${id} (${nodes.length})`)).toEqual([]);
}

test.describe("Accessibility", () => {
  test("the home page raises no serious or critical violation in dark mode", async ({ page }) => {
    await expectNoBlockingViolation(page, "/", "dark");
  });

  test("the home page raises no serious or critical violation in light mode", async ({ page }) => {
    await expectNoBlockingViolation(page, "/", "light");
  });

  test("the printable CV raises no serious or critical violation in dark mode", async ({
    page,
  }) => {
    await expectNoBlockingViolation(page, "/cv", "dark");
  });

  test("the printable CV raises no serious or critical violation in light mode", async ({
    page,
  }) => {
    await expectNoBlockingViolation(page, "/cv", "light");
  });
});
