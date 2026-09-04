import { expect, test } from "@playwright/test";

test.describe("Metadata for crawlers and social previews", () => {
  test("serves the social image as a real png, so scrapers render it", async ({ request }) => {
    const response = await request.get("/og.png");

    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("serves the favicon as a real image at the root", async ({ request }) => {
    const response = await request.get("/favicon.ico");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/image\//);
  });

  test("declares every icon at a stable url, so Google can key the favicon", async ({
    request,
  }) => {
    const html = await (await request.get("/")).text();
    const hrefs = [...html.matchAll(/<link[^>]+rel="(?:icon|apple-touch-icon)"[^>]*>/g)].map(
      ([tag]) => /href="([^"]+)"/.exec(tag)?.[1]
    );

    expect(hrefs).toContain("/favicon.ico");
    expect(hrefs.every((href) => href !== undefined && !href.includes("?"))).toBe(true);
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
