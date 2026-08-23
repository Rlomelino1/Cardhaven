import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test("a forced cloud deck survives a late auth bootstrap", async ({ page }) => {
  let delayed = 0;
  await page.route("**/vendor/neon/bundle.mjs", async (route) => {
    delayed++;
    await new Promise((r) => setTimeout(r, 700));
    await route.continue();
  });
  await openApp(page);
  expect(delayed, "the SDK delay never applied — has the vendored path moved?").toBe(1);
  await page.evaluate(() => {
    MODE = "cloud"; CLOUD_USER = { id: "u1" }; DECKS = []; BASELINE = null;
    freshDeck(); addCard("ogn-001-298", "main");
  });
  await page.waitForTimeout(1200);
  expect(await page.evaluate(() => ({ main: zoneCount("main"), mode: MODE })))
    .toEqual({ main: 1, mode: "cloud" });
});