import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

const ENDPOINT = "https://rlomelino.goatcounter.com/count";
const HOST = /^https:\/\/rlomelino\.goatcounter\.com\//;

const cspOf = (page) => page.evaluate(() =>
  document.querySelector('meta[http-equiv="Content-Security-Policy"]').content);

test.describe("GoatCounter page counts", () => {
  test("the counter is served from our own origin and names the endpoint", async ({ page }) => {
    await openApp(page);
    const tag = page.locator("script[data-goatcounter]");
    await expect(tag).toHaveCount(1);
    await expect(tag).toHaveAttribute("src", "/vendor/goatcounter/count.js");
    await expect(tag).toHaveAttribute("data-goatcounter", ENDPOINT);
    const res = await page.request.get("/vendor/goatcounter/count.js");
    expect(res.status()).toBe(200);
  });

  test("the CSP lets the beacon out, and nothing else of GoatCounter's in", async ({ page }) => {
    await openApp(page);
    const csp = await cspOf(page);
    const dir = (name) => new RegExp(`${name} ([^;]*)`).exec(csp)[1].split(/\s+/);
    expect(dir("connect-src")).toContain("https://rlomelino.goatcounter.com");
    expect(dir("img-src").join(" ")).not.toContain("goatcounter");
    expect(dir("script-src").join(" ")).not.toContain("goatcounter");
  });

  test("local runs and the test suite are never counted", async ({ page }) => {
    const hits = [];
    await page.route(HOST, (route) => { hits.push(route.request().url()); route.fulfill({ status: 204 }); });
    await openApp(page);
    await page.waitForFunction(() => typeof window.goatcounter?.filter === "function");
    expect(await page.evaluate(() => window.goatcounter.filter())).toBe("localhost");
    await page.waitForTimeout(300);
    expect(hits).toEqual([]);
  });

  test("when counting is allowed, the hit reaches the endpoint without a CSP violation",
    async ({ page }) => {
      const violations = [];
      page.on("console", (m) => {
        if (/Content Security Policy/i.test(m.text())) violations.push(m.text());
      });
      const hits = [];
      await page.route(HOST, (route) => { hits.push(route.request().url()); route.fulfill({ status: 204 }); });
      await page.addInitScript(() => { window.goatcounter = { allow_local: true }; });
      await openApp(page);
      await expect.poll(() => hits.length).toBeGreaterThan(0);
      const url = new URL(hits[0]);
      expect(url.pathname).toBe("/count");
      expect(url.searchParams.get("p")).toBe("/");
      expect(violations).toEqual([]);
    });
});

test.describe("GoatCounter feature counts", () => {
  // Counting is allowed here so the hits are visible; real local runs send nothing.
  const counted = async (page) => {
    const hits = [];
    await page.route(HOST, (route) => { hits.push(new URL(route.request().url())); route.fulfill({ status: 204 }); });
    await page.addInitScript(() => { window.goatcounter = { allow_local: true }; });
    await openApp(page);
    await page.waitForFunction(() => typeof window.goatcounter?.count === "function");
    const events = () => hits.filter((u) => u.searchParams.get("e") === "true")
      .map((u) => u.searchParams.get("p"));
    return { hits, events };
  };

  test("a feature is counted as an event, once per visit", async ({ page }) => {
    const { events } = await counted(page);
    await page.click('.vtab[data-goview="collection"]');
    await page.click('.vtab[data-goview="deck"]');
    await page.click('.vtab[data-goview="collection"]');
    await expect.poll(events).toEqual(["view-collection", "view-deck"]);
  });

  test("a search is counted without what was typed", async ({ page }) => {
    const { hits, events } = await counted(page);
    await page.fill("#q", "secret words");
    await page.fill("#q", "more secret words");
    await expect.poll(events).toEqual(["search"]);
    expect(hits.map(String).join(" ")).not.toContain("secret");
  });

  test("nothing is counted when GoatCounter is not loaded", async ({ page }) => {
    await page.route(/\/vendor\/goatcounter\/count\.js$/, (route) => route.abort());
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await openApp(page);
    await page.fill("#q", "x");
    await page.click('.vtab[data-goview="collection"]');
    await expect(page.locator('.vtab[data-goview="collection"]')).toHaveClass(/on/);
    expect(errors).toEqual([]);
  });
});

test.describe("the privacy page", () => {
  test("the footer links to it", async ({ page }) => {
    await openApp(page);
    await expect(page.locator("footer a#privacyLink")).toHaveAttribute("href", "/privacy.html");
  });

  test("it is served, and covers accounts and visit counts", async ({ page }) => {
    const violations = [];
    page.on("console", (m) => {
      if (/Content Security Policy/i.test(m.text())) violations.push(m.text());
    });
    const res = await page.goto("/privacy.html");
    expect(res.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Privacy");
    await expect(page.locator("main")).toContainText("GoatCounter");
    await expect(page.locator("main")).toContainText("Your email address");
    await expect(page.locator("main")).toContainText("never sells or shares your data");
    await expect(page.locator('a[href="/"]').first()).toBeVisible();
    expect(violations).toEqual([]);
  });

  test("it follows the Paper theme the app saved", async ({ page }) => {
    await page.goto("/privacy.html");
    await expect(page.locator("html")).not.toHaveClass(/paper/);
    await page.evaluate(() => localStorage.setItem("rb.theme", "paper"));
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/paper/);
  });

  test("the sitemap lists it", async ({ page }) => {
    const res = await page.request.get("/sitemap.xml");
    expect(await res.text()).toContain("<loc>https://cardhavenapp.com/privacy.html</loc>");
  });
});
