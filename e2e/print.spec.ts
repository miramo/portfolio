import { expect, type Page, test } from "@playwright/test";

// Some browsers lay a printout out at the width of the screen and then scale the result to the
// paper — Safari on iOS among them — so a printout must not depend on the screen it starts from.
async function printedCvBox(page: Page, screenWidth: number) {
  await page.setViewportSize({ width: screenWidth, height: 900 });
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });

  return page.getByTestId("cv-sheet").evaluate((sheet) => {
    const { width, height } = sheet.getBoundingClientRect();
    return { width: Math.round(width), height: Math.round(height) };
  });
}

const pageCount = (pdf: Buffer) => pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length;

test.describe("Printed CV", () => {
  test.describe("Given a visitor who prints the CV from a phone", () => {
    test("gets the same layout as from a desktop", async ({ page }) => {
      const fromDesktop = await printedCvBox(page, 1280);
      const fromPhone = await printedCvBox(page, 393);

      expect(fromPhone).toEqual(fromDesktop);
    });
  });

  test.describe("Given a visitor who prints the CV on A4 paper", () => {
    test("gets a single page", async ({ page, browserName }) => {
      test.skip(browserName !== "chromium", "only Chromium can print to PDF headless");
      await page.goto("/cv");

      const pdf = await page.pdf({ format: "A4", preferCSSPageSize: true, printBackground: true });

      expect(pageCount(pdf)).toBe(1);
    });
  });
});
