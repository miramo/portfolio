import { expect, type Page, test } from "@playwright/test";

const MINIMUM_PX = 24;

const targetsTooSmallToTap = (page: Page) =>
  page.evaluate(
    (minimum) =>
      [...document.querySelectorAll<HTMLElement>("a, button, summary")]
        .filter((element) => element.getClientRects().length > 0)
        .filter((element) => !element.classList.contains("sr-only"))
        .map((element) => ({ element, box: element.getBoundingClientRect() }))
        .filter(({ box }) => box.width < minimum || box.height < minimum)
        .map(
          ({ element, box }) =>
            `${element.getAttribute("aria-label") ?? element.textContent.trim()} (${Math.round(box.width)}×${Math.round(box.height)})`
        ),
    MINIMUM_PX
  );

test.describe("Touch targets", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.describe("Given a visitor on a phone", () => {
    test("offers every link and button of the home page at least 24 px to tap", async ({
      page,
    }) => {
      await page.goto("/");

      expect(await targetsTooSmallToTap(page)).toEqual([]);
    });

    test("offers every link of the open menu at least 24 px to tap", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();

      expect(await targetsTooSmallToTap(page)).toEqual([]);
    });

    test("offers every link and button of the printable CV at least 24 px to tap", async ({
      page,
    }) => {
      await page.goto("/cv");

      expect(await targetsTooSmallToTap(page)).toEqual([]);
    });
  });
});
