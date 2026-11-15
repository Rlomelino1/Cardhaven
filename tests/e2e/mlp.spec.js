import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

// Kayou's My Little Pony cards are collect-only: the Deckbuilder view is a note that
// points to Collection, and Collection filters by rarity.

const openMlp = (page, hash = "") =>
  openApp(page, { query: "?game=mlp&set=HY12", hash });

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

  test("Collection lists the set by rarity and filters on a rarity chip", async ({ page }) => {
    await openMlp(page, "#collection");
    await expect(page.locator("#colSetChips")).toContainText("Radiant Moon Vol. 12");
    const chips = await page.locator("#colTypeRow .chip").allTextContents();
    expect(chips).toEqual(["R", "SR", "HR", "SSR", "UR", "LSR", "SGR"]);
    await expect(page.locator("#colTabs .coltab")).toHaveText([/^All/, /^Missing/, /^Owned/]);

    await page.locator("#colTypeRow .chip", { hasText: /^LSR$/ }).click();
    await expect(page.locator("#colGrid .ctile")).toHaveCount(16);
    await expect(page.locator("#colGrid h2.colsec")).toHaveCount(1);
    await expect(page.locator("#colGrid .ctile .cnum").first()).toHaveText("LSR 001");

    await page.locator('#colGrid .ctile[data-ref="hy12-lsr-001"] .step').last().click();
    await expect(page.locator("#colTabs .coltab").nth(2)).toContainText("1");
  });

  test("switching away and back keeps the other games' deckbuilders intact", async ({ page }) => {
    await openMlp(page);
    await page.evaluate(() => switchGame("riftbound"));
    await page.waitForFunction(() => POOL_READY && ACTIVE_GAME === "riftbound");
    await expect(page.locator("#collectOnly")).toBeHidden();
    await expect(page.locator(".layout")).toBeVisible();
  });
});
