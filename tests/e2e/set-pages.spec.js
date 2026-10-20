import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { openApp, RB_SETS } from "./helpers.js";

const repo = (f) => new URL(`../../${f}`, import.meta.url);
const PK_SETS = JSON.parse(readFileSync(repo("data/pokemon/sets.json"), "utf8"));
const pkPool = (id) => JSON.parse(readFileSync(repo(`data/pokemon/${id}-pool.json`), "utf8"));

// Card art is hotlinked; keep the suite off the network.
const noImages = (page) =>
  page.route(/cmsassets\.rgpub\.io|images\.pokemontcg\.io|images\.scrydex\.com/, (r) => r.abort());
const watchCsp = (page) => {
  const v = [];
  page.on("console", (m) => { if (/Content Security Policy/i.test(m.text())) v.push(m.text()); });
  return v;
};

test.describe("set pages", () => {
  test("every set has a page, and the sitemap lists it", async () => {
    const sitemap = readFileSync(repo("sitemap.xml"), "utf8");
    const paths = [
      ...RB_SETS.map((s) => `sets/riftbound/${s.code.toLowerCase()}/`),
      ...PK_SETS.map((s) => `sets/pokemon/${s.id}/`),
    ];
    for (const p of paths) {
      expect(existsSync(repo(`${p}index.html`)), p).toBe(true);
      expect(sitemap, p).toContain(`<loc>https://cardhavenapp.com/${p}</loc>`);
    }
    expect(sitemap).toContain("<loc>https://cardhavenapp.com/sets/</loc>");
  });

  test("the index links to both games' sets", async ({ page }) => {
    await noImages(page);
    const csp = watchCsp(page);
    await page.goto("/sets/");
    await expect(page.locator("h1")).toHaveText("Card sets");
    await expect(page.locator("h2#riftbound")).toBeVisible();
    await expect(page.locator("h2#pokemon")).toBeVisible();
    await expect(page.locator('a[href="/sets/riftbound/ogn/"]')).toHaveText("Origins");
    await expect(page.locator(`a[href="/sets/pokemon/${PK_SETS[0].id}/"]`)).toHaveText(PK_SETS[0].name);
    expect(csp).toEqual([]);
  });

  test("a Pokémon set page lists every card and opens the set in the app", async ({ page }) => {
    const set = PK_SETS.find((s) => s.id === "base1");
    await noImages(page);
    const csp = watchCsp(page);
    await page.goto("/sets/pokemon/base1/");
    await expect(page.locator("h1")).toHaveText(`${set.name} card list`);
    await expect(page).toHaveTitle(/Base card list \(Pokémon TCG\)/);
    await expect(page.locator('link[rel="canonical"]'))
      .toHaveAttribute("href", "https://cardhavenapp.com/sets/pokemon/base1/");
    await expect(page.locator(".cards li")).toHaveCount(pkPool("base1").length);
    await expect(page.locator(".cards li").first()).toContainText("Alakazam");
    expect(csp).toEqual([]);

    await page.route(/(^|\/\/)esm\.sh\//, (r) => r.abort());
    await page.click("a.go");
    await page.waitForFunction(() => typeof S !== "undefined" && S.openSet === "base1", null,
      { timeout: 15_000 });
    expect(await page.evaluate(() => ACTIVE_GAME)).toBe("pokemon");
    expect(new URL(page.url()).search).toBe("");
  });

  test("a Riftbound set page opens the app scoped to that set", async ({ page }) => {
    await noImages(page);
    await page.goto("/sets/riftbound/sfd/");
    await expect(page.locator("h1")).toHaveText("Spiritforged card list");
    await expect(page.locator(".cards li")).toHaveCount(RB_SETS.find((s) => s.code === "SFD").n);
    await page.route(/(^|\/\/)esm\.sh\//, (r) => r.abort());
    await page.click("a.go");
    await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null,
      { timeout: 15_000 });
    expect(await page.evaluate(() => [ACTIVE_GAME, S.setScopeAll, S.setScope]))
      .toEqual(["riftbound", false, ["SFD"]]);
  });

  test("a link with an unknown game or set still opens the app normally", async ({ page }) => {
    await openApp(page, { hash: "?game=nope&set=<x>" });
    expect(await page.evaluate(() => ACTIVE_GAME)).toBe("riftbound");
    expect(new URL(page.url()).search).toBe("");
  });

  test("the app footer links to the set lists", async ({ page }) => {
    await openApp(page);
    await expect(page.locator('footer a[href="/sets/"]')).toBeVisible();
  });
});
