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

  test.describe("Given a visitor who chose the light theme on an earlier visit", () => {
    test("is offered the dark theme before any script of the page has run", async ({ page }) => {
      // Aborting the bundles keeps React from ever taking over: what remains is the server markup
      // and the inline theme script.
      await page.route("**/_next/static/chunks/*.js", (route) => route.abort());
      await page.addInitScript(() => window.localStorage.setItem("theme", "light"));
      await page.goto("/");

      await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
    });
  });

  test.describe("Given a visitor whose OS asks for reduced motion", () => {
    test("keeps the dark theme once the page has come alive", async ({ page }) => {
      // A markup that differs between server and client makes React throw, then re-render the
      // whole document — which drops the `dark` class the inline script had set.
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      // `test.use({ reducedMotion })` does not reach the page — emulateMedia does.
      await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      expect(errors).toEqual([]);
      await expect(page.locator("html")).toHaveClass(/dark/);
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
