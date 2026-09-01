import { expect, test } from "@playwright/test";

// Both OS preferences are pinned: a suite that inherits the runner's preference
// tests the runner, not the code.
test.describe("Theme", () => {
  test.describe("Given a visitor whose OS is set to dark", () => {
    test.use({ colorScheme: "dark" });

    test("starts dark, and remembers a switch to light across a reload", async ({ page }) => {
      await page.goto("/");
      const html = page.locator("html");
      await expect(html).toHaveClass(/dark/);

      await page.getByRole("button", { name: "Switch to light mode" }).click();
      await expect(html).not.toHaveClass(/dark/);

      await page.reload();
      await expect(html).not.toHaveClass(/dark/);
      await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
    });
  });

  test.describe("Given a visitor whose OS is set to light", () => {
    test.use({ colorScheme: "light" });

    test("still starts dark, because the OS preference is deliberately not consulted", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.locator("html")).toHaveClass(/dark/);
    });
  });
});
