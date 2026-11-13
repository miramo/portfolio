import { expect, type Page, test } from "@playwright/test";

test.describe("Home page", () => {
  test("renders every section a visitor scrolls through", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#experience")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("shows the career periods derived from the stored dates", async ({ page }) => {
    await page.goto("/");

    // The period is written twice, once per breakpoint; only one of the two is ever displayed.
    await expect(page.getByText("2017 — Present").filter({ visible: true }).first()).toBeVisible();
    await expect(page.getByText(/Senior engineer with \d+\+ years/)).toBeVisible();
  });

  test("marks no span of years as if it were a single date", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("time")).toHaveCount(0);
  });
});

test.describe("Printable CV", () => {
  test("renders, and stays out of search results", async ({ page }) => {
    await page.goto("/cv");

    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});

test.describe("Seniority", () => {
  const expectAResolvedNumber = async (page: Page, path: string) => {
    await page.goto(path);

    await expect(page.getByText(/\{years\}/)).toHaveCount(0);
    await expect(page.getByText(/\d+\+ years of experience/).first()).toBeVisible();
  };

  test("the home page states a number, never the raw placeholder", async ({ page }) => {
    await expectAResolvedNumber(page, "/");
  });

  test("the printable CV states a number, never the raw placeholder", async ({ page }) => {
    await expectAResolvedNumber(page, "/cv");
  });
});
