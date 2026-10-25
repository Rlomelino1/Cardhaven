import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";

// Readability and phone polish: text that clears the contrast bar in both themes, a
// card view that can add the card, a search that says when it found nothing, and a
// collection that shows cards before its summary on a phone.

// WCAG AA contrast of every visible text node that is not disabled, over its effective
// background. 4.5:1 for normal text, 3:1 for large.
const lowContrast = () => {
  const parse = c => c.match(/[\d.]+/g).map(Number);
  const lum = rgb => { const [r, g, b] = rgb.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
    return .2126 * r + .7152 * g + .0722 * b; };
  const bgOf = el => { const layers = [];
    for(let e = el; e; e = e.parentElement){ const c = parse(getComputedStyle(e).backgroundColor);
      if((c[3] ?? 1) > 0){ layers.push(c); if((c[3] ?? 1) >= 1) break; } }
    let base = [255, 255, 255];
    for(const l of layers.reverse()){ const a = l[3] ?? 1; base = base.map((v, i) => v * (1 - a) + l[i] * a); }
    return base; };
  const bad = [];
  for(const el of document.querySelectorAll("body *")){
    const txt = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join("");
    if(!txt || !el.getClientRects().length || el.closest("[disabled],.planned,.ctile.ismissing,[aria-hidden=true]")) continue;
    const s = getComputedStyle(el);
    if(s.visibility !== "visible") continue;
    let op = 1; for(let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
    if(op < .05) continue;
    const bg = bgOf(el); let fg = parse(s.color); const a = (fg[3] ?? 1) * op;
    fg = fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a));
    const [l1, l2] = [lum(fg), lum(bg)];
    const cr = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
    const size = parseFloat(s.fontSize);
    const need = size >= 24 || (size >= 18.66 && +s.fontWeight >= 700) ? 3 : 4.5;
    if(cr < need) bad.push(`${txt.slice(0, 24)} ${cr.toFixed(2)}`);
  }
  return [...new Set(bad)];
};

for(const theme of ["midnight", "paper"]){
  test(`${theme} text meets the contrast bar in both views`, async ({ page }) => {
    await page.addInitScript(t => localStorage.setItem("rb.theme", t), theme);
    await openApp(page);
    expect(await page.evaluate(lowContrast)).toEqual([]);
    await page.click('.vtab[data-goview="collection"]');
    await expect(page.locator("#colGrid .ctile").first()).toBeVisible();
    expect(await page.evaluate(lowContrast)).toEqual([]);
  });

  test(`${theme} text meets the contrast bar in the Pokémon deckbuilder`, async ({ page }) => {
    await page.addInitScript(t => localStorage.setItem("rb.theme", t), theme);
    await openPokemon(page);
    expect(await page.evaluate(lowContrast)).toEqual([]);
  });
}

test("the theme button shows a sun in Midnight and a moon in Paper", async ({ page }) => {
  await openApp(page);
  await expect(page.locator("#themeBtn .sun")).toBeVisible();
  await expect(page.locator("#themeBtn .moon")).toBeHidden();
  await page.click("#themeBtn");
  await expect(page.locator("#themeBtn .moon")).toBeVisible();
  await expect(page.locator("#themeBtn .sun")).toBeHidden();
});

test("a search with no matches says so and can be cleared", async ({ page }) => {
  await openApp(page);
  await page.fill("#q", "zzqxnotacard");
  await expect(page.locator("#results .noresults")).toContainText("No cards match “zzqxnotacard”");
  await page.getByRole("button", { name: "Clear search and filters" }).click();
  await expect(page.locator("#q")).toHaveValue("");
  await expect(page.locator("#q")).toBeFocused();
  await expect(page.locator("#results .tile").first()).toBeVisible();
});

test("the card view adds to the deck and counts what it holds", async ({ page }) => {
  await openApp(page);
  await page.locator("#results .tile .frame").first().click();
  const acts = page.locator("#modalAdd");
  await expect(acts.getByRole("button", { name: "+ Main" })).toBeVisible();
  await expect(acts.locator(".modalheld")).toHaveCount(0);
  await acts.getByRole("button", { name: "+ Main" }).click();
  await acts.getByRole("button", { name: "+ Side" }).click();
  await expect(acts.locator(".modalheld")).toHaveText("2 in deck");
  await expect(page.locator("#modal")).toHaveClass(/open/);
});

test("the card view steps collection copies", async ({ page }) => {
  await openApp(page);
  await page.click('.vtab[data-goview="collection"]');
  const tile = page.locator("#colGrid .ctile").first();
  await tile.locator(".cframe").click();
  const acts = page.locator("#modalAdd");
  await expect(acts).toContainText("0 of 3 owned");
  await acts.getByRole("button", { name: "Add a copy" }).click();
  await expect(acts).toContainText("1 of 3 owned");
  await expect(tile.locator(".cown")).toHaveText("1/3");
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("collection cards start on the first screen, the breakdown folds away", async ({ page }) => {
    await openApp(page);
    await page.getByRole("button", { name: "Collection", exact: true }).click();
    await expect(page.locator("#colGrid .ctile").first()).toBeInViewport();
    const more = page.locator("#colMoreBtn");
    await expect(more).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#colRarityPanel")).toBeHidden();
    await more.click();
    await expect(more).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#colRarityPanel")).toBeVisible();
    await expect(page.locator("#colMarkBtn")).toBeVisible();
  });
});

test("the collection breakdown stays open on desktop", async ({ page }) => {
  await openApp(page);
  await page.click('.vtab[data-goview="collection"]');
  await expect(page.locator("#colMoreBtn")).toBeHidden();
  await expect(page.locator("#colRarityPanel")).toBeVisible();
});
