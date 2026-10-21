import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test.describe("favicon assets are served", () => {
  test("/favicon.ico is served as an icon", async ({ page }) => {
    const res = await page.request.get("/favicon.ico");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"])
      .toMatch(/image\/(x-icon|vnd\.microsoft\.icon)/);
  });

  test("/favicon.svg is served as SVG", async ({ page }) => {
    const res = await page.request.get("/favicon.svg");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/svg+xml");
  });

  test("/apple-touch-icon.png is served as PNG", async ({ page }) => {
    const res = await page.request.get("/apple-touch-icon.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("/icon-192.png is served as PNG", async ({ page }) => {
    const res = await page.request.get("/icon-192.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("favicon links in the head", () => {
  test("exactly one SVG icon link, pointing at /favicon.svg", async ({ page }) => {
    await openApp(page);
    const svg = page.locator('head link[rel="icon"][type="image/svg+xml"]');
    await expect(svg).toHaveCount(1);
    await expect(svg).toHaveAttribute("href", "/favicon.svg");
  });

  test("the apple-touch-icon link points at /apple-touch-icon.png", async ({ page }) => {
    await openApp(page);
    const apple = page.locator('head link[rel="apple-touch-icon"]');
    await expect(apple).toHaveCount(1);
    await expect(apple).toHaveAttribute("href", "/apple-touch-icon.png");
  });

  test("the 32x32 icon link points at /favicon.ico", async ({ page }) => {
    await openApp(page);
    const ico = page.locator('head link[rel="icon"][sizes="32x32"]');
    await expect(ico).toHaveCount(1);
    await expect(ico).toHaveAttribute("href", "/favicon.ico");
  });

  test("the 192x192 icon link points at /icon-192.png", async ({ page }) => {
    await openApp(page);
    const png192 = page.locator('head link[rel="icon"][sizes="192x192"]');
    await expect(png192).toHaveCount(1);
    await expect(png192).toHaveAttribute("href", "/icon-192.png");
  });
});

// Installing as an app needs only the manifest and its icons. There is deliberately no
// service worker, so the website behaves exactly the same for everyone else.
test.describe("installable as an app", () => {
  test("the manifest is linked, allowed by the CSP, and lists icons that exist", async ({ page }) => {
    const blocked = [];
    page.on("console", m => /manifest/i.test(m.text()) && m.type() === "error" && blocked.push(m.text()));
    await openApp(page);
    await expect(page.locator('head link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
    const res = await page.request.get("/manifest.webmanifest");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/manifest+json");
    const m = await res.json();
    expect(m).toMatchObject({ name: "Card Haven", start_url: "/", display: "standalone" });
    const sizes = m.icons.map(i => `${i.sizes} ${i.purpose}`);
    expect(sizes).toEqual(expect.arrayContaining(["192x192 any", "512x512 any", "512x512 maskable"]));
    for (const i of m.icons) {
      const r = await page.request.get(i.src);
      expect(r.status(), i.src).toBe(200);
      expect(r.headers()["content-type"]).toContain("image/png");
    }
    expect(blocked).toEqual([]);
  });

  test("no service worker is registered", async ({ page }) => {
    await openApp(page);
    expect(await page.evaluate(() => navigator.serviceWorker.getRegistrations().then(r => r.length))).toBe(0);
  });
});
