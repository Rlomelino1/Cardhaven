import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";

// The page must not jump when the cards arrive: the set bar, header and footer keep
// their places from the first paint. Google counts layout shift above 0.1 against
// the page, so this holds the deckbuilder well under it in both games.
const watchShift = page => page.addInitScript(() => {
  window.__shift = 0;
  new PerformanceObserver(list => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__shift += e.value;
  }).observe({ type: "layout-shift", buffered: true });
});
const shift = page => page.evaluate(() => window.__shift);

// Card data held back for a moment, so the first paint happens before it lands.
const slowData = page => page.route(/\/data\/.*\.json/, async route => {
  await new Promise(r => setTimeout(r, 300));
  await route.continue();
});

for (const [label, size] of [
  ["desktop", { viewport: { width: 1280, height: 800 } }],
  ["phone", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
]) {
  test.describe(`on a ${label}`, () => {
    test.use(size);

    test("the Riftbound deckbuilder doesn't jump when the cards load", async ({ page }) => {
      await watchShift(page); await slowData(page);
      await openApp(page);
      await page.waitForTimeout(300);
      expect(await shift(page)).toBeLessThan(0.02);
    });

    test("the Pokémon deckbuilder doesn't jump when the cards load", async ({ page }) => {
      await watchShift(page); await slowData(page);
      await openPokemon(page);
      await page.waitForTimeout(300);
      expect(await shift(page)).toBeLessThan(0.02);
    });
  });
}

test("the set bar is already drawn, without counts, while the cards load", async ({ page }) => {
  let release;
  const held = new Promise(r => { release = r; });
  await page.route(/\/data\/.*\.json/, async route => { await held; await route.continue(); });
  await page.goto("/");
  await expect(page.locator("#setBar")).toBeVisible();
  await expect(page.locator("#setScopeCount")).toHaveText("Loading the cards in scope…");
  await expect(page.locator("#setChips .setchip").first()).toHaveText("All sets");
  release();
  await expect(page.locator("#setScopeCount")).toContainText("cards in scope");
});

test("the page below the header is revealed once the app has drawn it", async ({ page }) => {
  await openApp(page);
  expect(await page.evaluate(() => ({
    booted: document.documentElement.classList.contains("booted"),
    layout: getComputedStyle(document.querySelector(".layout")).visibility,
    footer: getComputedStyle(document.querySelector("footer")).visibility,
  }))).toEqual({ booted: true, layout: "visible", footer: "visible" });
});
