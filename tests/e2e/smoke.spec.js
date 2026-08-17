import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test.describe("boot and browse", () => {
  test("app boots, pool loads, cards render", async ({ page }) => {
    await openApp(page);
    await expect(page.locator("#onboard")).toBeHidden();
    await expect(page.locator("#browser")).toBeVisible();
    await expect(page.locator("#resultCount")).toHaveText(/352 cards/);
    expect(await page.locator("#results .tile").count()).toBeGreaterThan(0);
    // The pool has all 352 cards with art.
    expect(await page.evaluate(() => S.pool.length)).toBe(352);
  });

  test("search narrows the grid", async ({ page }) => {
    await openApp(page);
    await page.fill("#q", "kai");
    await expect(page.locator("#resultCount")).not.toHaveText(/352 cards/);
    const n = await page.evaluate(() => S.pool.filter(c => c.name.toLowerCase().includes("kai")).length);
    await expect(page.locator("#resultCount")).toHaveText(new RegExp(`${n} cards?`));
  });

  test("a domain filter changes the result count", async ({ page }) => {
    await openApp(page);
    const before = await page.evaluate(() => Number(document.getElementById("resultCount").textContent.match(/\d+/)[0]));
    await page.locator("#domainRow .chip", { hasText: "Fury" }).click();
    const after = await page.evaluate(() => Number(document.getElementById("resultCount").textContent.match(/\d+/)[0]));
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0);
  });
});

test.describe("deck building", () => {
  test("adding a card wires through, and the 3-copy cap holds", async ({ page }) => {
    await openApp(page);
    // Click a real "+ Main" button to prove the wiring.
    await page.locator("#results .btn", { hasText: "+ Main" }).first().click();
    expect(await page.evaluate(() => zoneCount("main"))).toBe(1);

    // The copy limit: five adds of one card cap at 3.
    const capped = await page.evaluate(() => {
      const id = refOf(S.zones.main[0]);
      for (let i = 0; i < 5; i++) addCard(id, "main");
      return S.zones.main.find(c => refOf(c) === id).qty;
    });
    expect(capped).toBe(3);

    // Removing past zero drops the entry.
    const gone = await page.evaluate(() => {
      const c = S.zones.main[0], id = c.id;
      for (let i = 0; i < 5; i++) bump("main", id, -1);
      return S.zones.main.some(x => x.id === id);
    });
    expect(gone).toBe(false);
  });
});

test.describe("collection", () => {
  test("steppers cap at 3 and clear at 0", async ({ page }) => {
    await openApp(page, { hash: "#collection" });
    await expect(page.locator("#collectionView")).toBeVisible();
    const result = await page.evaluate(() => {
      const ref = refOf(S.pool[0]);
      for (let i = 0; i < 5; i++) colBump(ref, 1);
      const hi = qtyOf(ref);
      for (let i = 0; i < 5; i++) colBump(ref, -1);
      return { hi, lo: qtyOf(ref) };
    });
    expect(result.hi).toBe(3);
    expect(result.lo).toBe(0);
  });
});

test.describe("persistence and preferences", () => {
  test("theme toggle persists across reload", async ({ page }) => {
    await openApp(page);
    const wasPaper = await page.evaluate(() => document.documentElement.classList.contains("paper"));
    await page.click("#themeBtn");
    const nowPaper = await page.evaluate(() => document.documentElement.classList.contains("paper"));
    expect(nowPaper).toBe(!wasPaper);
    await page.reload();
    await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY);
    expect(await page.evaluate(() => document.documentElement.classList.contains("paper"))).toBe(nowPaper);
  });

  test("a signed-out deck survives a reload", async ({ page }) => {
    await openApp(page);
    await page.locator("#results .btn", { hasText: "+ Main" }).first().click();
    expect(await page.evaluate(() => zoneCount("main"))).toBe(1);
    await openApp(page); // reload with the same context (localStorage persists)
    expect(await page.evaluate(() => zoneCount("main"))).toBe(1);
  });
});

test.describe("copy limit (Showcase / base printings)", () => {
  const BASE = "ogn-039-298";   // Kai'Sa - Survivor
  const SHOW = "ogn-039a-298";  // Kai'Sa - Survivor (Alternate Art)

  const setMain = (page, pairs) => page.evaluate((pairs) => {
    freshDeck();
    S.zones.main = pairs.map(([ref, qty]) => ({ ...findCard(ref), id: uid(), qty }));
    render();
    return document.getElementById("problems").innerText;
  }, pairs);

  test("3 base + 1 Showcase of one card is flagged over the 3-copy limit", async ({ page }) => {
    await openApp(page);
    const problems = await setMain(page, [[BASE, 3], [SHOW, 1]]);
    expect(problems).toMatch(/Over 3 copies/);
    expect(problems).toMatch(/Kai'Sa - Survivor \(4\)/);
  });

  test("2 base + 1 Showcase (3 total across printings) is legal", async ({ page }) => {
    await openApp(page);
    const problems = await setMain(page, [[BASE, 2], [SHOW, 1]]);
    expect(problems).not.toMatch(/Over 3 copies/);
  });

  test("the collection still keys base and Showcase as distinct printings", async ({ page }) => {
    await openApp(page, { hash: "#collection" });
    const q = await page.evaluate((refs) => {
      colBump(refs[0], 1); colBump(refs[0], 1); // base -> 2
      colBump(refs[1], 1);                       // showcase -> 1
      return { base: qtyOf(refs[0]), show: qtyOf(refs[1]) };
    }, [BASE, SHOW]);
    expect(q.base).toBe(2);
    expect(q.show).toBe(1);
  });
});

test.describe("vendored SDK", () => {
  test("the auth/data SDK loads from vendored files, not a CDN", async ({ page }) => {
    // Deliberately does NOT block esm.sh — it asserts nothing tries to reach it.
    const esm = [];
    page.on("request", r => { if (/esm\.sh/.test(r.url())) esm.push(r.url()); });
    await page.goto("/");
    await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null, { timeout: 15000 });
    // window.cloud only exists once the whole vendored module graph has executed.
    await page.waitForFunction(() => typeof window.cloud !== "undefined", null, { timeout: 15000 });
    expect(esm).toEqual([]);
    const n = await page.evaluate(() =>
      performance.getEntriesByType("resource").filter(r => /\/vendor\/neon\//.test(r.name)).length);
    expect(n).toBeGreaterThan(100);
  });
});

test.describe("security", () => {
  test("an imported deck name cannot execute script (XSS regression)", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      const evil = "x'); window.__x = 1; //";
      S.zones.main = [{ ...normalize({ name: evil }), id: "evil", qty: 1 }];
      ZONE_TAB = "main";
      render();
    });
    await page.locator("#zoneList .dname").first().click();
    expect(await page.evaluate(() => window.__x)).toBeUndefined();
  });
});
