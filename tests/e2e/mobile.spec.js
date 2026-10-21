import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";

// Phones get one column, so the deck sits below the whole card grid. A bar pinned to
// the bottom of the screen keeps the counts in view and jumps to the deck.
const phone = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };

test.describe("on a phone", () => {
  test.use(phone);

  test("the deck bar counts adds, says what happened, and jumps to the deck", async ({ page }) => {
    await openApp(page);
    const bar = page.locator("#deckBar");
    await expect(bar).toBeVisible();
    await expect(page.locator("#deckBarCounts")).toContainText("Main 0/40");

    const name = await page.locator("#results .tile .tname").first().textContent();
    await page.locator("#results .btn", { hasText: "+ Main" }).first().click();
    await expect(page.locator("#deckBarNote")).toHaveText(`Added ${name} to Main deck.`);
    await expect(page.locator("#deckBarCounts")).toContainText("Main 1/40");

    await bar.getByRole("button", { name: "View deck" }).click();
    await expect(page.locator("#deck")).toBeInViewport();
    await expect(page.locator("body")).toHaveClass(/deck-in-view/);

    await page.getByRole("button", { name: "Back to cards" }).click();
    await expect(page.locator("#q")).toBeInViewport();
    await expect(page.locator("body")).not.toHaveClass(/deck-in-view/);
  });

  test("a Pokémon deck shows its 60-card count, and the collection view has no bar", async ({ page }) => {
    await openPokemon(page);
    await expect(page.locator("#deckBarCounts")).toHaveText("Deck 0/60");
    await page.getByRole("button", { name: "Collection", exact: true }).click();
    await expect(page.locator("#deckBar")).toBeHidden();
  });

  test("nothing is wider than the screen", async ({ page }) => {
    await openApp(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });
});

test("the deck bar stays off on a desktop, where the deck is beside the grid", async ({ page }) => {
  await openApp(page);
  await expect(page.locator("#deckBar")).toBeHidden();
  await expect(page.getByRole("button", { name: "Back to cards" })).toBeHidden();
});
