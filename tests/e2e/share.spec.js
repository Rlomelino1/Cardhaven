import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";

// A shared deck link carries the whole deck after ?deck=<game>. Opening one starts a new
// deck holding those cards; signed out, that is this browser's one slot, so a deck
// already there is only replaced after asking.

const RB_DECK = {
  legend: "ogn-247-298",
  zones: { main: [["ogn-001-298", 3], ["ogn-002-298", 2], ["sfd-010-221", 1]] },
};

const buildDeck = (page, deck, name) => page.evaluate(([deck, name]) => {
  freshDeck();
  S.deckName = name;
  if (deck.legend) S.legend = { ...findCard(deck.legend) };
  for (const [z, pairs] of Object.entries(deck.zones))
    S.zones[z] = pairs.map(([ref, qty]) => ({ ...findCard(ref), id: uid(), qty }));
  touch(); render();
  return serializeDeck();
}, [deck, name]);

const linkFor = page => page.evaluate(async () => `/?deck=${ACTIVE_GAME}.${await packDeck()}`);

test.describe("sharing a deck as a link", () => {
  test("Share link copies a link that opens the same deck", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await openApp(page);
    const deck = await buildDeck(page, RB_DECK, "Brass test deck");
    await page.click("[data-a='shareDeck']");
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toMatch(/\/\?deck=riftbound\.[A-Za-z0-9_-]+$/);
    const url = await page.evaluate(() => navigator.clipboard.readText());
    expect(url.length).toBeLessThan(400);
    // A small bubble says so above the button, then goes away by itself.
    const bubble = page.locator("#toast");
    await expect(bubble).toHaveText("Link copied");
    await expect(bubble).toHaveClass(/\bon\b/);
    const [b, t] = await Promise.all([page.locator("[data-a='shareDeck']").boundingBox(), bubble.boundingBox()]);
    expect(t.y + t.height).toBeLessThanOrEqual(b.y);
    expect(Math.abs((t.x + t.width / 2) - (b.x + b.width / 2))).toBeLessThan(2);
    await expect(bubble).not.toHaveClass(/\bon\b/, { timeout: 3000 });

    const other = await context.newPage();
    await openApp(other, { query: url.slice(url.indexOf("?")) });
    await expect.poll(() => other.evaluate(() => S.deckName)).toBe("Brass test deck");
    expect(await other.evaluate(() => serializeDeck())).toEqual(deck);
    // The parameter is gone, so a reload doesn't open the link again.
    expect(new URL(other.url()).search).toBe("");
  });

  test("an empty deck isn't shared", async ({ page }) => {
    await openApp(page);
    await page.click("[data-a='shareDeck']");
    await expect(page.locator("#notice")).toHaveText("Add some cards before sharing the deck.");
    await expect(page.locator("#toast")).toHaveText("Add some cards first");
  });

  test("Copy as text says so in the same bubble, and so does a blocked clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await openApp(page);
    await buildDeck(page, RB_DECK, "Bubble deck");
    await page.click("[data-a='copyText']");
    await expect(page.locator("#toast")).toHaveText("Decklist copied");
    await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.reject(new Error("blocked")); });
    await page.click("[data-a='copyText']");
    await expect(page.locator("#toast")).toHaveText("Clipboard blocked");
  });

  test("a Pokémon deck round-trips too", async ({ page, context }) => {
    await openPokemon(page);
    const refs = await page.evaluate(() => PIDX.slice(0, 3).map(e => e.id));
    const deck = await buildDeck(page, { zones: { main: refs.map(r => [r, 2]) } }, "Pika list");
    const link = await linkFor(page);
    const other = await context.newPage();
    await openApp(other, { query: link.slice(1) });
    await expect.poll(() => other.evaluate(() => S.deckName)).toBe("Pika list");
    expect(await other.evaluate(() => ACTIVE_GAME)).toBe("pokemon");
    expect(await other.evaluate(() => serializeDeck())).toEqual(deck);
  });
});

test.describe("opening a shared deck while signed out", () => {
  test("an empty browser slot just takes the shared deck, and Save asks to sign in",
    async ({ page, context }) => {
      await openApp(page);
      await buildDeck(page, RB_DECK, "Shared one");
      const link = await linkFor(page);

      const other = await context.browser().newContext();
      const visitor = await other.newPage();
      await openApp(visitor, { query: link.slice(1) });
      await expect.poll(() => visitor.evaluate(() => S.deckName)).toBe("Shared one");
      await expect(visitor.locator("#askModal")).not.toHaveClass(/open/);
      // Kept in this browser's slot like any signed-out deck.
      const saved = await visitor.evaluate(() => JSON.parse(localStorage.getItem(GAME.ls.deck)));
      expect(saved.deckName).toBe("Shared one");

      const save = visitor.locator("#saveBtn");
      await expect(save).toBeVisible();
      await save.click();
      expect(await visitor.evaluate(() => window.authWanted?.() || !!window.authLoaded)).toBe(true);
      await other.close();
    });

  test("a deck already in the slot is only replaced after asking", async ({ page, context }) => {
    await openApp(page);
    await buildDeck(page, RB_DECK, "Incoming");
    const link = await linkFor(page);

    const other = await context.browser().newContext();
    const visitor = await other.newPage();
    await openApp(visitor);
    await buildDeck(visitor, { zones: { main: [["ogn-003-298", 1]] } }, "Mine");

    // Cancel keeps the deck that was there.
    await openApp(visitor, { query: link.slice(1) });
    await expect(visitor.locator("#askModal")).toHaveClass(/open/);
    await visitor.click("#askActs button:has-text('Cancel')");
    expect(await visitor.evaluate(() => S.deckName)).toBe("Mine");
    expect(await visitor.locator("#saveBtn").isHidden()).toBe(true);

    // Open replaces it.
    await openApp(visitor, { query: link.slice(1) });
    await visitor.click("#askActs button:has-text('Open shared deck')");
    await expect.poll(() => visitor.evaluate(() => S.deckName)).toBe("Incoming");
    await other.close();
  });

  test("a damaged link opens nothing and breaks nothing", async ({ page }) => {
    await openApp(page, { query: "?deck=riftbound.AAAAnotadeck" });
    expect(await page.evaluate(() => deckIsBlank())).toBe(true);
    expect(new URL(page.url()).search).toBe("");
    await openApp(page, { query: "?deck=chess.AAAA" });
    expect(await page.evaluate(() => ACTIVE_GAME)).toBe("riftbound");
  });
});

test.describe("opening a shared deck while signed in", () => {
  test("it opens as a new unsaved deck and the saved ones are untouched", async ({ page, context }) => {
    await openApp(page);
    await buildDeck(page, RB_DECK, "From a friend");
    const link = await linkFor(page);

    const other = await context.browser().newContext();
    const visitor = await other.newPage();
    const user = { id: "bbbbbbbb-7777-4777-8777-bbbbbbbbbbbb", email: "s@example.com", name: "Sam",
      emailVerified: true, createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" };
    const session = { id: "s2", token: "tok", userId: user.id, expiresAt: "2099-01-01T00:00:00Z",
      createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" };
    const writes = [];
    await visitor.route(/neonauth\./, r => /\/get-session/.test(r.request().url())
      ? r.fulfill({ json: { user, session } }) : r.fulfill({ json: {} }));
    await visitor.route(/apirest\./, r => {
      const req = r.request();
      if (req.method() !== "GET") writes.push(req.url());
      if (/\/decks/.test(req.url()) && req.method() === "GET")
        return r.fulfill({ json: [{ id: "d1", name: "Account deck", game: "riftbound",
          payload: { schema: 1, legend: null, champion: null, zones: { main: [{ ref: "ogn-003-298", qty: 1 }] } },
          updated_at: "2026-11-01T00:00:00Z" }] });
      return r.fulfill({ json: [] });
    });
    // Signed in last time, so the link waits for the account before opening.
    await visitor.addInitScript(() => localStorage.setItem("ch.signed-in", "1"));
    await openApp(visitor, { query: link.slice(1) });
    await expect(visitor.locator("#acct .me")).toBeVisible();
    await expect.poll(() => visitor.evaluate(() => S.deckName)).toBe("From a friend");
    expect(await visitor.evaluate(() => [MODE, S.deckId, isDirty()])).toEqual(["cloud", null, true]);
    await expect(visitor.locator("#saveBtn")).toHaveText("Save deck");
    expect(writes.filter(u => /\/decks/.test(u))).toEqual([]);
    await other.close();
  });
});
