import { gzipSync } from "node:zlib";

import { expect, type Page, test } from "@playwright/test";

import { openTheHydratedPage } from "./support";

const homePageScriptBudgetInKilobytes = 216;

async function compressedScriptKilobytes(page: Page, path: string) {
  const scripts: Promise<Buffer>[] = [];
  page.on("response", (response) => {
    if (response.request().resourceType() === "script") scripts.push(response.body());
  });
  await openTheHydratedPage(page, path);
  const bodies = await Promise.all(scripts);
  return bodies.reduce((total, body) => total + gzipSync(body, { level: 9 }).length, 0) / 1000;
}

test.describe("Page weight", () => {
  test.describe("Given a visitor opening the home page", () => {
    test("downloads no more JavaScript than the budget allows", async ({ page }) => {
      const kilobytes = await compressedScriptKilobytes(page, "/");

      expect(kilobytes).toBeLessThanOrEqual(homePageScriptBudgetInKilobytes);
    });
  });
});
