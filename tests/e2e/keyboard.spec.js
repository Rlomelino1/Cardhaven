import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";

// Keyboard and screen reader basics: focus stays where the person is after an action
// redraws the page, pop-ups hold and return focus, menus answer Escape and Enter, and
// controls are named and report their state.

const focused = page => page.evaluate(() => {
  const a = document.activeElement;
  return { tag: a.tagName, id: a.id, a: a.dataset.a, a1: a.dataset.a1, a2: a.dataset.a2,
           label: a.getAttribute("aria-label") };
});

test("pressing + Main with the keyboard keeps focus on that button", async ({ page }) => {
  await openApp(page);
  const btn = page.locator("#results .tile .btn", { hasText: "+ Main" }).first();
  const ref = await btn.getAttribute("data-a1");
  await btn.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#zoneList li")).toHaveCount(1);
  expect(await focused(page)).toMatchObject({ a: "addCard", a1: ref, a2: "main" });
});

test("a filter chip keeps focus and reports whether it is on", async ({ page }) => {
  await openApp(page);
  const chip = page.locator("#typeRow .chip", { hasText: "Spell" });
  await expect(chip).toHaveAttribute("aria-pressed", "false");
  await chip.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#typeRow .chip", { hasText: "Spell" })).toHaveAttribute("aria-pressed", "true");
  expect(await focused(page)).toMatchObject({ a: "toggleFilter", a1: "typeFilter", a2: "Spell" });
});

test("the collection + moves focus to – when the copy cap disables it", async ({ page }) => {
  await openApp(page);
  await page.click('.vtab[data-goview="collection"]');
  const tile = page.locator("#colGrid .ctile").first();
  const ref = await tile.getAttribute("data-ref");
  const plus = tile.locator('[data-a2="1"]');
  await plus.focus();
  for(let i = 0; i < 3; i++) await page.keyboard.press("Enter");
  await expect(page.locator(`#colGrid .ctile[data-ref="${ref}"] .cown`)).toHaveText("3/3");
  expect(await focused(page)).toMatchObject({ a: "colBump", a1: ref, a2: "-1" });
});

test("the card view takes focus, keeps Tab inside, and returns focus on Escape", async ({ page }) => {
  await openApp(page);
  const frame = page.locator("#results .tile .frame").first();
  const ref = await frame.getAttribute("data-a1");
  await frame.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#modal")).toHaveClass(/open/);
  await expect(page.locator("#modalBox")).toBeFocused();
  for(let i = 0; i < 8; i++){
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement.closest("#modal"))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.locator("#modal")).not.toHaveClass(/open/);
  expect(await focused(page)).toMatchObject({ a: "openCard", a1: ref });
});

test("focus returns to the tile even after adding from the card view redrew it", async ({ page }) => {
  await openApp(page);
  const frame = page.locator("#results .tile .frame").first();
  const ref = await frame.getAttribute("data-a1");
  await frame.focus();
  await page.keyboard.press("Enter");
  await page.locator("#modalAdd button", { hasText: "+ Main" }).click();
  await page.locator('[data-a="closeModal"]').click();
  expect(await focused(page)).toMatchObject({ a: "openCard", a1: ref });
});

test("Reset asks in the site's own dialog, and Cancel keeps the deck", async ({ page }) => {
  await openApp(page);
  await page.locator("#results .btn", { hasText: "+ Main" }).first().click();
  const reset = page.locator('[data-a="wipe"]');
  await reset.focus();
  await page.keyboard.press("Enter");
  const dlg = page.getByRole("dialog", { name: "Reset deck?" });
  await expect(dlg).toBeVisible();
  await dlg.getByRole("button", { name: "Cancel" }).click();
  await expect(page.locator("#zoneList li")).toHaveCount(1);
  await expect(reset).toBeFocused();
  await reset.click();
  await dlg.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("#zoneList li")).toHaveCount(0);
});

test("Escape in the game menu returns focus to the game button", async ({ page }) => {
  await openApp(page);
  await page.locator("#gameBtn").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#gameMenu")).toBeVisible();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(page.locator("#gameMenu")).toBeHidden();
  await expect(page.locator("#gameBtn")).toBeFocused();
});

test("controls have names a screen reader can read", async ({ page }) => {
  await openApp(page);
  await expect(page.getByRole("textbox", { name: "Search cards" })).toBeVisible();
  const name = await page.locator("#results .tile .tname").first().textContent();
  await expect(page.locator("#results .tile .frame").first()).toHaveAttribute("aria-label", new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  await expect(page.getByRole("button", { name: `+ Main: ${name}` })).toBeVisible();
  await page.click('.vtab[data-goview="collection"]');
  await expect(page.getByRole("textbox", { name: "Search your collection" })).toBeVisible();
  await expect(page.locator(".vtab[data-goview=collection]")).toHaveAttribute("aria-pressed", "true");
  const first = page.locator("#colGrid .ctile").first();
  await expect(first.locator(".cframe")).toHaveAttribute("aria-label", /, 0 of 3 owned$|, missing$/);
  await expect(first.locator('[data-a2="1"]')).toHaveAttribute("aria-label", /^Add a copy of /);
});

test("Enter in the set filter opens the first match, and Escape returns focus", async ({ page }) => {
  await openPokemon(page);
  await page.locator("#setPickBtn").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#setPickQ")).toBeFocused();
  await page.keyboard.type("surging");
  await page.keyboard.press("Enter");
  await expect(page.locator("#setPickName")).toHaveText("Surging Sparks");
  await page.locator("#setPickBtn").click();
  await expect(page.locator("#setPickQ")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#setPickPanel")).toBeHidden();
  await expect(page.locator("#setPickBtn")).toBeFocused();
});
