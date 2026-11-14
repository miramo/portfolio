import { expect, test } from "@playwright/test";

import { openTheHydratedPage } from "./support";

test.describe("Navigation", () => {
  test.describe("Given a keyboard user on a phone, inside the open menu", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("closes the menu with Escape and lands back on the menu button", async ({ page }) => {
      await openTheHydratedPage(page);
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.keyboard.press("Tab");
      await expect(page.locator("#mobile-menu a").first()).toBeFocused();

      await page.keyboard.press("Escape");

      await expect(page.locator("#mobile-menu")).toHaveCount(0);
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    });
  });

  test.describe("Given a screen reader user on a phone, who scrolled to a section", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("hears which section the opened menu points at", async ({ page }) => {
      await openTheHydratedPage(page);
      await page.locator("#experience").scrollIntoViewIfNeeded();

      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.locator("#mobile-menu");

      await expect(menu.getByRole("link", { name: "Experience" })).toHaveAttribute(
        "aria-current",
        "location"
      );
      await expect(menu.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
    });
  });

  test.describe("Given a screen reader user scrolling the home page", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("hears which section the menu points at", async ({ page }) => {
      await openTheHydratedPage(page);
      const menu = page.getByRole("navigation", { name: "Main navigation" });

      await page.locator("#experience").scrollIntoViewIfNeeded();

      await expect(menu.getByRole("link", { name: "Experience" })).toHaveAttribute(
        "aria-current",
        "location"
      );
      await expect(menu.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
    });
  });
});
