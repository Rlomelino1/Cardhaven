import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";

const OGN_VAYNE = "ogn-035-298";

const setZones = (page, zones) => page.evaluate((zones) => {
  freshDeck();
  for (const [z, pairs] of Object.entries(zones))
    S.zones[z] = pairs.map(([ref, qty]) => ({ ...findCard(ref), id: uid(), qty }));
  render();
}, zones);

const items = (page) => page.evaluate(() =>
  [...document.querySelectorAll("#problems li")].map((li) => ({
    cls: li.className, text: li.innerText.replace(/\s+/g, " ").trim(),
  })));

test.describe("an empty deck is a start, not a list of failures", () => {
  test("Riftbound opens on one welcome line and no red", async ({ page }) => {
    await openApp(page);
    const r = await items(page);
    expect(r).toHaveLength(1);
    expect(r[0].cls).toBe("welcome");
    expect(r[0].text).toMatch(/^Start a deck\./);
  });

  test("Show Legends filters to Legends, and the button steps aside", async ({ page }) => {
    await openApp(page);
    await page.click("#problems .welcome [data-a2='Legend']");
    expect(await page.evaluate(() => S.typeFilter)).toEqual(["Legend"]);
    await expect(page.locator("#problems .welcome [data-a2='Legend']")).toHaveCount(0);
    await expect(page.locator("#problems .welcome")).toContainText("Track my collection");
  });

  test("Track my collection opens the collection", async ({ page }) => {
    await openApp(page);
    await page.click("#problems .welcome [data-a='goView']");
    expect(await page.evaluate(() => VIEW)).toBe("collection");
  });

  test("the Pokemon panel's pills start neutral, not failed", async ({ page }) => {
    await openPokemon(page);
    const pills = await page.evaluate(() => [...document.querySelectorAll(".dspill")]
      .map((p) => p.className));
    expect(pills.length).toBeGreaterThan(0);
    expect(pills.every((c) => c === "dspill")).toBe(true);
  });

  test("Pokemon opens on its own welcome line", async ({ page }) => {
    await openPokemon(page);
    const r = await items(page);
    expect(r).toHaveLength(1);
    expect(r[0].cls).toBe("welcome");
    expect(r[0].text).toMatch(/Add 60 cards, at most 4 with the same name/);
  });
});

test.describe("a deck in progress reads as progress", () => {
  test("missing counts share one neutral line", async ({ page }) => {
    await openApp(page);
    await setZones(page, { main: [[OGN_VAYNE, 2]] });
    const r = await items(page);
    const todo = r.filter((x) => x.cls === "todo");
    expect(todo).toHaveLength(1);
    expect(todo[0].text).toContain("Main deck needs 38 more cards.");
    expect(todo[0].text).toContain("Rune deck needs 12 more runes.");
    expect(todo[0].text).toContain("No Legend set");
    expect(r.filter((x) => x.cls === "")).toEqual([]);
  });

  test("a real rule break is still red, above the progress line", async ({ page }) => {
    await openApp(page);
    await setZones(page, { main: [[OGN_VAYNE, 4]] });
    const r = await items(page);
    expect(r[0].cls).toBe("");
    expect(r[0].text).toMatch(/Over 3 copies/);
    expect(r.map((x) => x.cls)).toContain("todo");
  });
});

test.describe("the first screen on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("nothing is wider than the screen, and cards start on screen one", async ({ page }) => {
    await openApp(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
    const top = await page.locator("#results .tile").first().evaluate((el) =>
      el.getBoundingClientRect().top);
    expect(top).toBeLessThan(844);
  });
});
