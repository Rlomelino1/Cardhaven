import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

// Pure-logic tests driven against the real page via page.evaluate — no logic is
// extracted from index.html, so the single-file constraint is untouched. These
// are the highest-value/lowest-cost tests: deck (de)serialization, collection
// sanitization, and the escaping the XSS fix depends on.

test("serializeDeck / hydrateDeck round-trips a slim {ref,qty} deck", async ({ page }) => {
  await openApp(page);
  const ok = await page.evaluate(() => {
    // Build a small legal-ish deck from real pool cards.
    const units = S.pool.filter(c => c.type === "Unit").slice(0, 3);
    S.zones.main = units.map(c => ({ ...c, id: uid(), qty: 2 }));
    S.legend = { ...S.pool.find(c => c.type === "Legend") };
    const serialized = serializeDeck();
    // Fresh hydrate from the serialized form.
    hydrateDeck(serialized);
    const again = serializeDeck();
    return JSON.stringify(serialized) === JSON.stringify(again);
  });
  expect(ok).toBe(true);
});

test("hydrateDeck preserves an unresolved ref instead of dropping it", async ({ page }) => {
  await openApp(page);
  const res = await page.evaluate(() => {
    hydrateDeck({ zones: { main: [{ ref: "zzz-999-does-not-exist", qty: 2 }] }, legend: null });
    return {
      unresolved: S.unresolved.length,
      ref: S.unresolved[0]?.ref,
      qty: S.unresolved[0]?.qty,
      countedInZone: zoneCount("main"),
    };
  });
  expect(res.unresolved).toBe(1);
  expect(res.ref).toBe("zzz-999-does-not-exist");
  expect(res.qty).toBe(2);
  expect(res.countedInZone).toBe(2); // still counts toward the deck, per design
});

test("sanitizeCollection clamps out-of-range and non-numeric quantities", async ({ page }) => {
  await openApp(page);
  const out = await page.evaluate(() =>
    sanitizeCollection({ a: 0, b: 2, c: 7, d: "two", e: -1, f: 1, g: 3.9 }));
  // 0/-1 dropped, "two" dropped, 7 clamped to 3, 2 and 1 kept, 3.9 floored to 3.
  expect(out).toEqual({ b: 2, c: 3, f: 1, g: 3 });
});

test("jsStr escapes for the JS-string-in-attribute context (XSS guard)", async ({ page }) => {
  await openApp(page);
  const r = await page.evaluate(() => {
    const payload = "x'); alert(1); //";
    const escaped = jsStr(payload);
    // The single quote must be backslash-escaped so it can't close the string,
    // and no HTML entity (&#39;) is produced that would decode back to a quote.
    return {
      escaped,
      hasBackslashQuote: escaped.includes("\\'"),
      hasRawQuote: /(^|[^\\])'/.test(escaped),
      hasEntity: escaped.includes("&#39;"),
    };
  });
  expect(r.hasBackslashQuote).toBe(true);
  expect(r.hasRawQuote).toBe(false);
  expect(r.hasEntity).toBe(false);
});

test("esc encodes HTML metacharacters for text context", async ({ page }) => {
  await openApp(page);
  const out = await page.evaluate(() => esc(`<img src=x onerror=alert(1)>&"'`));
  expect(out).toBe("&lt;img src=x onerror=alert(1)&gt;&amp;&quot;&#39;");
});
