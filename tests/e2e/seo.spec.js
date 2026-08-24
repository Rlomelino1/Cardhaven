import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

const ORIGIN = "https://cardhavenapp.com/";
const OG_IMAGE = "https://cardhavenapp.com/og-image.png";

test.describe("head metadata", () => {
  test("the description is present and not empty", async ({ page }) => {
    await openApp(page);
    const desc = page.locator('head meta[name="description"]');
    await expect(desc).toHaveCount(1);
    const content = await desc.getAttribute("content");
    expect(content.trim().length).toBeGreaterThan(0);
  });

  test("the canonical URL is the apex origin", async ({ page }) => {
    await openApp(page);
    const canonical = page.locator('head link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", ORIGIN);
  });

  test("the Open Graph tags are complete", async ({ page }) => {
    await openApp(page);
    const og = await page.evaluate(() => {
      const get = (prop) => document
        .querySelector(`head meta[property="${prop}"]`)?.getAttribute("content") ?? null;
      return {
        title: get("og:title"),
        description: get("og:description"),
        url: get("og:url"),
        image: get("og:image"),
      };
    });
    expect(og.title).toBeTruthy();
    expect(og.description).toBeTruthy();
    expect(og.url).toBeTruthy();
    expect(og.image).toBe(OG_IMAGE);
  });

  test("the Twitter card is a large summary image", async ({ page }) => {
    await openApp(page);
    await expect(page.locator('head meta[name="twitter:card"]'))
      .toHaveAttribute("content", "summary_large_image");
  });
});

test.describe("crawler files", () => {
  test("robots.txt points at the sitemap", async ({ page }) => {
    const res = await page.request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    expect(await res.text()).toContain("Sitemap: https://cardhavenapp.com/sitemap.xml");
  });

  test("sitemap.xml lists the apex origin", async ({ page }) => {
    const res = await page.request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    expect(await res.text()).toContain("<loc>https://cardhavenapp.com/</loc>");
  });

  test("the Open Graph image is served as PNG", async ({ page }) => {
    const res = await page.request.get("/og-image.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("structured data", () => {
  test("the JSON-LD block parses and describes a WebApplication", async ({ page }) => {
    await openApp(page);
    const blocks = page.locator('head script[type="application/ld+json"]');
    await expect(blocks).toHaveCount(1);
    const parsed = JSON.parse(await blocks.textContent());
    expect(parsed["@type"]).toBe("WebApplication");
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed.url).toBe(ORIGIN);
  });
});

test.describe("indexable prose", () => {
  test("the footer describes the site without running a game switch",
    async ({ page }) => {
      await openApp(page);
      await expect(page.locator("footer"))
        .toContainText("free online deck builder and collection tracker");
    });

  test("the description is in the served HTML, not injected by script",
    async ({ page }) => {
      const res = await page.request.get("/");
      expect(res.status()).toBe(200);
      expect(await res.text())
        .toContain("free online deck builder and collection tracker");
    });
});
