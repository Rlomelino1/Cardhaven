import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

/* Guards openApp's wait for the auth bootstrap, which is easy to write as a
   no-op and impossible to notice when it is one — the first attempt waited on
   COL_READY, which index.html sets synchronously at boot, so it waited for
   nothing and the suite stayed green.

   Delaying only the SDK's ENTRY module starts the whole graph late while still
   loading it fast, which lands the signed-out callback in the middle of a test
   the way a cold CI runner does. That callback sets MODE = "local" and calls
   freshDeck() when it finds the app in cloud mode, so it silently wiped the deck
   of every test that forces MODE = "cloud" — seen on CI as both a deck that
   emptied itself and an unsaved-changes prompt that never appeared. */
test("a forced cloud deck survives a late auth bootstrap", async ({ page }) => {
  await page.route("**/vendor/neon/_neondatabase_auth_0.5.0-beta.mjs", async (route) => {
    await new Promise((r) => setTimeout(r, 700));
    await route.continue();
  });
  await openApp(page);
  await page.evaluate(() => {
    MODE = "cloud"; CLOUD_USER = { id: "u1" }; DECKS = []; BASELINE = null;
    freshDeck(); addCard("ogn-001-298", "main");
  });
  // Long enough that a callback still in flight would have landed by now.
  await page.waitForTimeout(1200);
  expect(await page.evaluate(() => ({ main: zoneCount("main"), mode: MODE })))
    .toEqual({ main: 1, mode: "cloud" });
});
