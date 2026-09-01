import { expect, test } from "@playwright/test";

test.describe("Keyboard navigation", () => {
  test.describe("Given a visitor who navigates with the keyboard", () => {
    test("reaches a skip link on the very first Tab, pointing at the main landmark", async ({
      page,
    }) => {
      await page.goto("/");
      await page.keyboard.press("Tab");

      const focused = page.locator(":focus");
      await expect(focused).toHaveText(/Skip to content/i);
      await expect(focused).toHaveAttribute("href", "#main-content");
      await expect(page.locator("#main-content")).toHaveCount(1);
    });
  });
});
