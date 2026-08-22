import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

/* The file picker accepts anything a user can select — `accept` on an <input>
   is a filter in the file dialog, not a guarantee about what arrives. Everything
   in an imported file is attacker-controlled text: card names, artists, rules
   text, image URLs, quantities, zone keys, even the shape of the JSON.

   The page's CSP keeps 'unsafe-inline' for script-src (its own handlers are
   inline), so it does NOT contain injected script. Escaping is the actual
   defence, which makes these tests the thing standing behind it.

   Each test drives the REAL picker with a real file. window.__pwn is the canary:
   if any payload achieves script execution, it is set and the test fails. */

const upload = (page, name, body) =>
  page.setInputFiles("#picker", {
    name,
    mimeType: name.endsWith(".json") ? "application/json" : "text/plain",
    buffer: Buffer.from(body, "utf8"),
  });

const pwned = (page) => page.evaluate(() => window.__pwn ?? null);

/* Payloads that try to break out of an HTML attribute, a JS string inside an
   inline handler, or a text node. */
const XSS = [
  `<img src=x onerror="window.__pwn=1">`,
  `<script>window.__pwn=1</script>`,
  `x'); window.__pwn=1; //`,
  `x"); window.__pwn=1; //`,
  `" onload="window.__pwn=1`,
  `' onmouseover='window.__pwn=1`,
  `</button><img src=x onerror=window.__pwn=1>`,
  `&lt;img src=x onerror=window.__pwn=1&gt;`,
  `\\'); window.__pwn=1; //`,
  `&#39;); window.__pwn=1; //`,
  `&quot; onerror=&quot;window.__pwn=1`,
];

test.describe("a hostile import cannot execute script", () => {
  for (const [i, payload] of XSS.entries()) {
    test(`payload ${i} in every rendered card field`, async ({ page }) => {
      await openApp(page);
      // One card, with the payload in every field the UI renders anywhere.
      await upload(page, "evil.json", JSON.stringify({
        pool: [{
          name: payload, artist: payload, text: payload, rarity: payload,
          type: payload, supertype: payload, set: payload, setName: payload,
          number: payload, riftboundId: payload, image: payload,
          domains: [payload], energy: 1,
        }],
      }));
      await expect(page.locator("#results .tile")).toHaveCount(1);
      // Open the card panel too — a second renderer, with more fields.
      await page.evaluate(() => openCard(refOf(S.pool[0])));
      await page.waitForTimeout(150);
      // And the deck panel's row renderer.
      await page.evaluate(() => {
        closeModal();
        addCard(refOf(S.pool[0]), "main");
      });
      await page.waitForTimeout(150);
      expect(await pwned(page)).toBeNull();
      // The payload must be visible as TEXT, not parsed as markup.
      const injected = await page.evaluate(() =>
        document.querySelectorAll("#results script, #modalBox script, #zoneList script").length);
      expect(injected).toBe(0);
    });
  }

  test("a hostile deck name cannot execute script", async ({ page }) => {
    await openApp(page);
    await upload(page, "deck.json", JSON.stringify({
      kind: "riftbound", version: 3,
      name: `x'); window.__pwn=1; //`,
      zones: { main: [{ ref: "ogn-001-298", qty: 2 }] },
    }));
    await page.waitForTimeout(200);
    await page.locator("#deckCaret").click().catch(() => {});
    await page.waitForTimeout(150);
    expect(await pwned(page)).toBeNull();
  });

  test("a hostile unresolved ref cannot execute script", async ({ page }) => {
    await openApp(page);
    await upload(page, "deck.json", JSON.stringify({
      zones: { main: [{ ref: `<img src=x onerror="window.__pwn=1">`, qty: 1 }] },
    }));
    await page.waitForTimeout(250);
    expect(await pwned(page)).toBeNull();
    // It is shown, as text, in the unresolved banner.
    expect(await page.evaluate(() =>
      document.getElementById("problems").innerText)).toContain("img src=x");
  });

  test("a hostile decklist TEXT import cannot execute script", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("ch.game", "pokemon"));
    await openApp(page);
    await page.waitForFunction(() => PIDX !== null);
    await upload(page, "list.txt",
      ["Pokemon: 4", `4 <img src=x onerror="window.__pwn=1"> SVI 81`,
       `2 x'); window.__pwn=1; // MEW 151`, ""].join("\n"));
    await page.waitForTimeout(300);
    expect(await pwned(page)).toBeNull();
  });
});

test.describe("a hostile import cannot corrupt state", () => {
  test("__proto__ in a card does not pollute Object.prototype", async ({ page }) => {
    await openApp(page);
    await upload(page, "proto.json",
      `{"pool":[{"name":"a","__proto__":{"pwn":"polluted"},"constructor":{"prototype":{"pwn2":"x"}}}]}`);
    await page.waitForTimeout(250);
    expect(await page.evaluate(() => ({
      viaLiteral: ({}).pwn ?? null,
      viaLiteral2: ({}).pwn2 ?? null,
      protoTouched: Object.prototype.pwn ?? null,
    }))).toEqual({ viaLiteral: null, viaLiteral2: null, protoTouched: null });
  });

  test("an absurd quantity is clamped, not stored", async ({ page }) => {
    await openApp(page);
    await upload(page, "qty.json", JSON.stringify({
      zones: {
        main: [{ ref: "ogn-001-298", qty: 1e9 },
               { ref: "not-a-real-card", qty: 1e9 }],
      },
    }));
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => ({
      resolved: S.zones.main.map((c) => c.qty),
      unresolved: S.unresolved.map((u) => u.qty),
      counted: zoneCount("main"),
      stored: JSON.parse(localStorage.getItem("riftbound-deckbuilder-v1") || "null"),
    }));
    // A resolved card is capped by the copy limit.
    expect(r.resolved).toEqual([3]);
    // An unresolved one must not be able to carry a billion either.
    expect(Math.max(...r.unresolved, 0)).toBeLessThanOrEqual(3);
    expect(r.counted).toBeLessThanOrEqual(100);
  });

  test("nonsense quantities become sane numbers", async ({ page }) => {
    await openApp(page);
    await upload(page, "qty2.json", JSON.stringify({
      zones: { main: [
        { ref: "ogn-001-298", qty: -5 },
        { ref: "ogn-002-298", qty: "abc" },
        { ref: "ogn-004-298", qty: null },
        { ref: "ogn-005-298", qty: 1.9 },
      ] },
    }));
    await page.waitForTimeout(300);
    const qtys = await page.evaluate(() => S.zones.main.map((c) => c.qty));
    for (const q of qtys) {
      expect(Number.isInteger(q)).toBe(true);
      expect(q).toBeGreaterThanOrEqual(1);
      expect(q).toBeLessThanOrEqual(3);
    }
  });

  test("junk shapes are refused without throwing to the console", async ({ page }) => {
    const errors = [];
    await openApp(page);
    page.on("pageerror", (e) => errors.push(e.message));
    for (const body of [
      `not json at all`,
      `[]`,
      `{}`,
      `{"pool":[null,1,"str",[],{},{"name":null}]}`,
      `{"zones":"not an object"}`,
      `{"zones":{"main":"not an array"}}`,
      `{"zones":{"__proto__":[{"ref":"x","qty":1}]}}`,
      `{"pool":{"name":"not an array"}}`,
      `{"deck":{"zones":{"main":[{"ref":{"nested":"object"},"qty":1}]}}}`,
      `{"legend":{"name":"<img src=x onerror=window.__pwn=1>"}}`,
      JSON.stringify({ pool: [{ name: "x".repeat(200000) }] }),
    ]) {
      await upload(page, "junk.json", body);
      await page.waitForTimeout(120);
    }
    expect(await pwned(page)).toBeNull();
    expect(errors).toEqual([]);
    // The app is still usable after all of that.
    expect(await page.evaluate(() => typeof render === "function")).toBe(true);
    await page.evaluate(() => render());
  });

  test("an imported pool cannot persist itself into localStorage", async ({ page }) => {
    /* A malicious pool is scoped to the session: it is never written to storage,
       so a reload restores the real card data. `load()` also strips a `pool` key
       out of any legacy blob for exactly this reason. */
    await openApp(page);
    await upload(page, "pool.json", JSON.stringify({
      pool: [{ name: "Fake Card", riftboundId: "evil-001-1", image: "https://evil.example/x.png" }],
    }));
    await page.waitForTimeout(250);
    expect(await page.evaluate(() => S.pool.length)).toBe(1);
    const stored = await page.evaluate(() =>
      localStorage.getItem("riftbound-deckbuilder-v1") || "");
    expect(stored).not.toContain("Fake Card");
    expect(stored).not.toContain("evil.example");
    await openApp(page);   // reload
    expect(await page.evaluate(() => S.pool.length)).toBe(640);
  });
});

test.describe("what an imported image URL can reach", () => {
  test("a card image is confined to the CSP's hosts", async ({ page }) => {
    /* An imported pool controls img src. The CSP img-src is the boundary that
       stops it becoming an outbound beacon, so assert the policy still names
       only the art hosts and data:. */
    await openApp(page);
    const csp = await page.evaluate(() =>
      document.querySelector('meta[http-equiv="Content-Security-Policy"]').content);
    const img = /img-src ([^;]+)/.exec(csp)[1].trim().split(/\s+/);
    expect(img.sort()).toEqual([
      "data:",
      "https://cmsassets.rgpub.io",
      "https://images.pokemontcg.io",
      "https://images.scrydex.com",
    ]);
    // No wildcard, and nothing that would allow an arbitrary host.
    expect(img).not.toContain("*");
    expect(img).not.toContain("https:");
  });

  test("a javascript: image URL does not execute", async ({ page }) => {
    await openApp(page);
    await upload(page, "js.json", JSON.stringify({
      // Needs a set, or the card falls outside the set scope and never renders.
      pool: [{ name: "a", riftboundId: "ogn-999-298", set: "OGN",
               image: "javascript:window.__pwn=1" }],
    }));
    await expect(page.locator("#results .tile")).toHaveCount(1);
    await page.evaluate(() => openCard(refOf(S.pool[0])));
    await page.waitForTimeout(200);
    expect(await pwned(page)).toBeNull();
  });
});
