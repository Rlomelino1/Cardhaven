import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RIOT = "Riot Games does not endorse";
const FREAK = "GAME FREAK";
const GENERIC = "All card images, names, and game content are property";

const footer = (page) => page.locator("footer");

test.describe("the footer shows only the active game's disclaimer", () => {
  test("Riftbound on load", async ({ page }) => {
    await openApp(page);
    await expect(footer(page)).toContainText(RIOT);
    await expect(footer(page)).not.toContainText(FREAK);
    await expect(footer(page)).toContainText(GENERIC);
  });

  test("Pokemon on load", async ({ page }) => {
    await openPokemon(page);
    await expect(footer(page)).toContainText(FREAK);
    await expect(footer(page)).not.toContainText(RIOT);
    await expect(footer(page)).toContainText(GENERIC);
  });

  test("switching games in place swaps it", async ({ page }) => {
    await openApp(page);
    await expect(footer(page)).toContainText(RIOT);
    await page.click("#gameBtn");
    await page.click("#gameMenu .gmrow[data-a1='pokemon']");
    await page.waitForFunction(() => ACTIVE_GAME === "pokemon" && POOL_READY, null,
      { timeout: 20000 });
    await expect(footer(page)).toContainText(FREAK);
    await expect(footer(page)).not.toContainText(RIOT);
    await expect(footer(page)).toContainText(GENERIC);
  });

  test("the disclaimer comes from the registry, not the markup", async ({ page }) => {
    await openApp(page);
    const r = await page.evaluate(() => ({
      shown: document.getElementById("legalActive").textContent,
      registry: GAMES.riftbound.legal,
      planned: PLANNED_GAMES.filter(g => g.legal).length,
    }));
    expect(r.shown).toBe(r.registry);
    expect(r.shown.length).toBeGreaterThan(80);
    expect(r.planned).toBe(0);
  });
});

test.describe("the legal notices modal", () => {
  test("lists every game in the registry that has a disclaimer", async ({ page }) => {
    await openApp(page);
    await expect(page.locator("#legalModal.open")).toBeHidden();
    await page.click("#legalAllBtn");
    await expect(page.locator("#legalModal.open")).toBeVisible();

    const box = page.locator("#legalModal");
    await expect(box).toContainText(RIOT);
    await expect(box).toContainText(FREAK);

    const r = await page.evaluate(() => ({
      headings: [...document.querySelectorAll("#legalList h4")].map(h => h.textContent),
      paragraphs: document.querySelectorAll("#legalList p").length,
      withLegal: GAME_IDS.filter(id => GAMES[id].legal).length,
    }));
    expect(r.headings).toEqual(["Riftbound", "Pokémon TCG"]);
    expect(r.paragraphs).toBe(r.withLegal);
  });

  test("closes on the Close button", async ({ page }) => {
    await openApp(page);
    await page.click("#legalAllBtn");
    await expect(page.locator("#legalModal.open")).toBeVisible();
    await page.click("#legalClose");
    await expect(page.locator("#legalModal.open")).toBeHidden();
  });

  test("closes on the backdrop and on Escape, like the other overlays", async ({ page }) => {
    await openApp(page);
    await page.click("#legalAllBtn");
    await page.locator("#legalModal").click({ position: { x: 4, y: 4 } });
    await expect(page.locator("#legalModal.open")).toBeHidden();

    await page.click("#legalAllBtn");
    await expect(page.locator("#legalModal.open")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#legalModal.open")).toBeHidden();
  });

  test("reopening rebuilds the list rather than appending to it", async ({ page }) => {
    await openApp(page);
    for (const _ of [1, 2, 3]) {
      await page.click("#legalAllBtn");
      await page.click("#legalClose");
    }
    await page.click("#legalAllBtn");
    expect(await page.evaluate(
      () => document.querySelectorAll("#legalList h4").length)).toBe(2);
  });

  test("the trigger is a real button, and carries no inline handler", async ({ page }) => {
    await openApp(page);
    const r = await page.evaluate(() => {
      const b = document.getElementById("legalAllBtn");
      return {
        tag: b.tagName,
        type: b.getAttribute("type"),
        on: [...b.attributes].map(a => a.name).filter(n => n.startsWith("on")),
        background: getComputedStyle(b).backgroundColor,
      };
    });
    expect(r.tag).toBe("BUTTON");
    expect(r.type).toBe("button");
    expect(r.on).toEqual([]);
    expect(r.background).toBe("rgba(0, 0, 0, 0)");
  });
});

test.describe("the README quotes the notices the app actually carries", () => {
  const readme = () => readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "..", "README.md"), "utf8");
  const flat = (t) => t.split(/\s+/).join(" ").trim();

  test("every registry notice appears verbatim, and the generic line too",
    async ({ page }) => {
      await openApp(page);
      const shown = await page.evaluate(() => ({
        games: GAME_IDS.filter((id) => GAMES[id].legal).map((id) => GAMES[id].legal),
        generic: document.querySelectorAll("footer .legal")[1].textContent
          .replace("View all legal notices", ""),
      }));
      const doc = flat(readme().split("## Legal")[1] || "");
      expect(shown.games.length).toBeGreaterThan(1);
      for (const notice of shown.games)
        expect(doc, `a registry notice is missing from README.md`).toContain(flat(notice));
      expect(doc, "the always-visible footer line is missing from README.md")
        .toContain(flat(shown.generic));
    });

  test("the README does not carry a superseded product name in its notices",
    async ({ page }) => {
      await openApp(page);
      const legalSection = readme().split("## Legal")[1] || "";
      expect(legalSection).not.toContain("Riftbound Deckbuilder");
    });

  test("the hosts the README names are exactly the CSP's image hosts",
    async ({ page }) => {
      await openApp(page);
      const hosts = await page.evaluate(() => {
        const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]').content;
        return /img-src ([^;]+)/.exec(csp)[1].trim().split(/\s+/)
          .filter((h) => h.startsWith("https://")).map((h) => h.replace("https://", ""));
      });
      const legalSection = readme().split("## Legal")[1] || "";
      for (const h of hosts)
        expect(legalSection, `${h} is in the CSP but not named in the Legal section`)
          .toContain(h);
    });
});
