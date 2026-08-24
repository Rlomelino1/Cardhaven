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
});
