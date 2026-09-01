import { expect, test } from "@playwright/test";

test.describe("Metadata for crawlers and social previews", () => {
  test("serves the social image as a real png, so scrapers render it", async ({ request }) => {
    const response = await request.get("/og.png");

    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("lists the home page in the sitemap", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();

    expect(body).toContain("<urlset");
    expect(body).toContain("maximemiramond.com");
  });

  test("points robots.txt at the sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();

    expect(body).toMatch(/sitemap:/i);
  });
});
