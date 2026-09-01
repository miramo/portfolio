import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

async function expectNoBlockingViolation(page: Page, path: string, theme: "dark" | "light") {
  await page.addInitScript((value) => window.localStorage.setItem("theme", value), theme);
  await page.goto(path);

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
