import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

// Kayou's My Little Pony cards are collect-only: the Deckbuilder view is a note that
// points to Collection, and Collection filters by rarity.

const openMlp = (page, hash = "") =>
  openApp(page, { query: "?game=mlp", hash });

// Collection opens on All sets; most checks below look at Wave 12 on its own.
const openWave12 = async (page) => {
  await openMlp(page, "#collection");
  await page.locator('#colSetChips .setchip[data-a1="HY12"]').click();
  await expect(page.locator('#colSetChips .setchip[data-a1="HY12"]')).toHaveAttribute("aria-pressed", "true");
};

// Cards per set, in print order of rarity: R SR HR SSR UR LSR SGR ZR SC ◇ZR.
const WAVES = {
  HY07: [30, 20, 36, 54, 16, 15, 8, 0, 7, 0],
  HY08: [30, 20, 30, 54, 16, 16, 8, 7, 7, 1],
  HY09: [30, 20, 30, 20, 19, 16, 8, 7, 7, 1],
  HY10: [30, 20, 30, 20, 18, 16, 8, 7, 7, 2],
  HY11: [30, 20, 30, 26, 16, 16, 8, 7, 7, 2],
  HY12: [30, 20, 30, 26, 16, 16, 10, 7, 7, 2],
};
const RARITIES = ["R", "SR", "HR", "SSR", "UR", "LSR", "SGR", "ZR", "SC", "◇ZR"];

test.describe("My Little Pony, a collect-only game", () => {
  test("the Deckbuilder view says there are no decks and links to Collection", async ({ page }) => {
    await openMlp(page);
    const note = page.locator("#collectOnly");
    await expect(note).toBeVisible();
    await expect(note.locator("h2")).toHaveText("My Little Pony cards are for collecting");
    for (const sel of [".layout", ".deckid", "#saveBtn", "#setBar", "#deckBar"])
      await expect(page.locator(sel)).toBeHidden();
    await note.getByRole("button", { name: "Go to my collection" }).click();
    await expect(page).toHaveURL(/#collection$/);
    await expect(note).toBeHidden();
    await expect(page.locator("#colGrid .ctile").first()).toBeVisible();
  });

  test("each Moon Edition wave is its own set, with its own cards", async ({ page }) => {
    await openMlp(page, "#collection");
    await expect(page.locator("#colSetChips .setchip")).toHaveText([
      /^All sets 1017$/, /^Moon Edition Wave 7 0\/186$/, /^Moon Edition Wave 8 0\/189$/,
      /^Moon Edition Wave 9 0\/158$/, /^Moon Edition Wave 10 0\/158$/, /^Moon Edition Wave 11 0\/162$/,
      /^Moon Edition Wave 12 0\/164$/,
    ]);
    const counts = await page.evaluate((rarities) => {
      const out = {};
      for (const c of S.pool) {
        out[c.set] ??= rarities.map(() => 0);
        out[c.set][rarities.indexOf(c.rarity)]++;
      }
      return out;
    }, RARITIES);
    expect(counts).toEqual(WAVES);
    // Kayou's US site swaps these two names; the pictures and print numbers are right.
    const swapped = await page.evaluate((ids) =>
      Object.fromEntries(ids.map(id => [id, S.pool.find(c => c.mlpId === id)?.name])),
      ["hy07-sgr-004", "hy07-sgr-005", "hy08-sgr-004", "hy08-sgr-005"]);
    expect(swapped).toEqual({
      "hy07-sgr-004": "Rarity", "hy07-sgr-005": "Fluttershy",
      "hy08-sgr-004": "Rarity", "hy08-sgr-005": "Fluttershy",
    });
    // Ids are unique across sets, so one log can hold every wave.
    expect(await page.evaluate(() => new Set(S.pool.map(c => c.mlpId)).size)).toBe(1017);

    // All sets keeps each wave together, in print order, and tiles say which wave.
    await page.locator("#colTypeRow .chip", { hasText: /^SC$/ }).click();
    const refs = await page.locator("#colGrid .ctile").evaluateAll(els => els.map(e => e.dataset.ref));
    expect(refs).toHaveLength(42);
    expect(refs.slice(0, 8)).toEqual([1, 2, 3, 4, 5, 6, 7].map(n => `hy07-sc-00${n}`).concat("hy08-sc-001"));
    expect(refs.at(-1)).toBe("hy12-sc-007");
    await expect(page.locator("#colGrid .ctile .cnum").first()).toHaveText("HY07 SC 001");
    await page.locator("#colTypeRow .chip", { hasText: /^SC$/ }).click();

    // The number finds a card with the wave code, or in every wave without it.
    await page.fill("#colQ", "HY10 LSR 001");
    await expect(page.locator("#colGrid .ctile")).toHaveCount(1);
    await expect(page.locator("#colGrid .ctile").first()).toHaveAttribute("data-ref", "hy10-lsr-001");
    await page.fill("#colQ", "LSR 001");
    await expect(page.locator("#colGrid .ctile")).toHaveCount(6);
    await page.fill("#colQ", "");

    await page.locator('#colSetChips .setchip[data-a1="HY10"]').click();
    await expect(page.locator("#colGrid .ctile")).toHaveCount(158);
    await expect(page.locator("#colGrid h2.colsec", { hasText: /^SC/ })).toHaveText("SC 0/7");
  });

  test("Collection lists the set by rarity and filters on a rarity chip", async ({ page }) => {
    await openWave12(page);
    const chips = await page.locator("#colTypeRow .chip").allTextContents();
    expect(chips).toEqual(["R", "SR", "HR", "SSR", "UR", "LSR", "SGR", "ZR", "SC", "◇ZR"]);
    await expect(page.locator("#colTabs .coltab")).toHaveText([/^All/, /^Missing/, /^Owned/]);

    await page.locator("#colTypeRow .chip", { hasText: /^LSR$/ }).click();
    await expect(page.locator("#colGrid .ctile")).toHaveCount(16);
    await expect(page.locator("#colGrid h2.colsec")).toHaveCount(1);
    await expect(page.locator("#colGrid .ctile .cnum").first()).toHaveText("HY12 LSR 001");

    await page.locator('#colGrid .ctile[data-ref="hy12-lsr-001"] .step').last().click();
    await expect(page.locator("#colTabs .coltab").nth(2)).toContainText("1");
  });

  test("every card has its picture: small on tiles, full size in the card view", async ({ page }) => {
    await openWave12(page);
    const missing = await page.evaluate(() => S.pool.filter(c => !c.image).length);
    expect(await page.evaluate(() => S.pool.length)).toBe(1017);
    expect(missing).toBe(0);
    await page.locator("#colTypeRow .chip", { hasText: /^LSR$/ }).click();
    const img = page.locator('#colGrid .ctile[data-ref="hy12-lsr-001"] img');
    await expect(img).toHaveAttribute("src", "./img/mlp/hy12/hy12-lsr-001.sm.webp");
    await expect.poll(() => img.evaluate(el => el.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('#colGrid .ctile[data-ref="hy12-lsr-001"] .cframe')).not.toHaveClass(/land/);

    // Sideways-printed cards are turned to fit the portrait tile.
    await page.locator("#colTypeRow .chip", { hasText: /^HR$/ }).click();
    await expect(page.locator('#colGrid .ctile[data-ref="hy12-hr-001"] .cframe')).toHaveClass(/land/);

    await page.locator('#colGrid .ctile[data-ref="hy12-hr-001"] .cframe').click();
    await expect(page.locator("#modalBox .face.front img")).toHaveAttribute("src", "./img/mlp/hy12/hy12-hr-001.webp");
  });

  test("a card is owned or not: the usual stepper, capped at one copy", async ({ page }) => {
    await openWave12(page);
    const tile = page.locator('#colGrid .ctile[data-ref="hy12-sgr-001"]');
    await expect(tile.locator(".cseg i")).toHaveCount(1);
    await expect(tile.locator(".cown")).toHaveText("Missing");
    await expect(page.locator("#colGrid h2.colsec", { hasText: /^SGR/ })).toHaveText("SGR 0/10");

    await tile.locator(".step").last().click();
    await expect(tile.locator(".cown")).toHaveText("1/1");
    await expect(tile.locator(".cown")).toHaveClass(/full/);
    await expect(tile.locator(".step").last()).toBeDisabled();
    await expect(page.locator("#colGrid h2.colsec", { hasText: /^SGR/ })).toHaveText("SGR 1/10");

    await tile.locator(".step").first().click();
    await expect(tile.locator(".cown")).toHaveText("Missing");

    await page.evaluate(() => openCard("hy12-sgr-001"));
    await expect(page.locator("#modalBox .modalcount span")).toHaveText("0 of 1 owned");
  });

  test("an older log of several copies counts as one", async ({ page }) => {
    await openMlp(page, "#collection");
    expect(await page.evaluate(() => liftCollection({ mlp: { "hy12-r-001": 4 } })))
      .toEqual({ mlp: { "hy12-r-001": 1 } });
  });

  test("the search finds a card by the number printed on its tile", async ({ page }) => {
    await openWave12(page);
    await page.fill("#colQ", "LSR 001");
    await expect(page.locator("#colGrid .ctile")).toHaveCount(1);
    await expect(page.locator("#colGrid .ctile").first()).toHaveAttribute("data-ref", "hy12-lsr-001");
    await page.fill("#colQ", "◇ZR 002");
    await expect(page.locator("#colGrid .ctile")).toHaveCount(1);
    await expect(page.locator("#colGrid .ctile").first()).toHaveAttribute("data-ref", "hy12-dzr-002");
  });

  test("the card view shows the printed number", async ({ page }) => {
    await openMlp(page, "#collection");
    await page.evaluate(() => openCard("hy12-dzr-001"));
    await expect(page.locator("#modalBox .meta .sub")).toHaveText("◇ZR · Moon Edition Wave 12 · HY12-◇ZR-001");
  });

  test("a pool that fails to load says so, with Try again, in both views", async ({ page }) => {
    await page.route("**/data/mlp/hy12-pool.json", route => route.fulfill({ status: 503, body: "nope" }));
    await page.goto("/?game=mlp");
    const note = page.locator("#collectOnly");
    await expect(note.locator("#collectOnlyErr")).toContainText("Couldn't load the card pool");
    await expect(note.locator("#collectOnlyRetry")).toBeVisible();
    await expect(note.getByRole("button", { name: "Go to my collection" })).toBeHidden();
    await page.evaluate(() => goView("collection"));
    await expect(note.locator("#collectOnlyErr")).toBeVisible();

    await page.unroute("**/data/mlp/hy12-pool.json");
    await note.locator("#collectOnlyRetry").click();
    await expect(note).toBeHidden();
    await expect(page.locator("#colGrid .ctile").first()).toBeVisible();
  });

  test("a shared deck link for a collect-only game is ignored", async ({ page }) => {
    await page.goto("/?deck=mlp.abc");
    await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY);
    expect(await page.evaluate(() => ACTIVE_GAME)).toBe("riftbound");
  });

  test("switching away and back keeps the other games' deckbuilders intact", async ({ page }) => {
    await openMlp(page);
    await page.evaluate(() => switchGame("riftbound"));
    await page.waitForFunction(() => POOL_READY && ACTIVE_GAME === "riftbound");
    await expect(page.locator("#collectOnly")).toBeHidden();
    await expect(page.locator(".layout")).toBeVisible();
  });
});
