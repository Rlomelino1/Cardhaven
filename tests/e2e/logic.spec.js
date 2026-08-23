import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test("serializeDeck / hydrateDeck round-trips a slim {ref,qty} deck", async ({ page }) => {
  await openApp(page);
  const ok = await page.evaluate(() => {
    const units = S.pool.filter(c => c.type === "Unit").slice(0, 3);
    S.zones.main = units.map(c => ({ ...c, id: uid(), qty: 2 }));
    S.legend = { ...S.pool.find(c => c.type === "Legend") };
    const serialized = serializeDeck();
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
  expect(res.countedInZone).toBe(2);
});

test("liftCollection clamps out-of-range and non-numeric quantities", async ({ page }) => {
  await openApp(page);
  const out = await page.evaluate(() =>
    liftCollection({ a: 0, b: 2, c: 7, d: "two", e: -1, f: 1, g: 3.9 }));
  expect(out).toEqual({ riftbound: { b: 2, c: 3, f: 1, g: 3 } });
});

test("no control carries an inline handler, in either game", async ({ page }) => {
  for (const game of ["riftbound", "pokemon"]) {
    await page.addInitScript((g) => localStorage.setItem("ch.game", g), game);
    await openApp(page);
    if (game === "pokemon") await page.waitForFunction(() => PIDX !== null);
    await page.evaluate(() => {
      addCard(refOf(S.pool[0]), "main");
      toggleDeckMenu(true);
      toggleGameMenu(true);
      paintCard(S.pool[0]);
      location.hash = "collection";
      applyHash();
    });
    await page.waitForTimeout(200);
    const found = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("*"))
        for (const at of el.attributes)
          if (/^on/i.test(at.name)) bad.push(el.tagName + "[" + at.name + "]");
      return bad;
    });
    expect(found, `inline handlers found in ${game}`).toEqual([]);
  }
});

test("a hostile value in a data attribute stays a string", async ({ page }) => {
  await openApp(page);
  const r = await page.evaluate(() => {
    const evil = `" data-a="wipe" x="`;
    document.getElementById("results").innerHTML =
      `<button id="probe" data-a="openCard" data-a1="${esc(evil)}">x</button>`;
    const el = document.getElementById("probe");
    return { action: el.dataset.a, arg: el.dataset.a1, attrs: el.attributes.length };
  });
  expect(r.action).toBe("openCard");
  expect(r.arg).toBe(`" data-a="wipe" x="`);
  expect(r.attrs).toBe(3);
});

test("esc encodes HTML metacharacters for text context", async ({ page }) => {
  await openApp(page);
  const out = await page.evaluate(() => esc(`<img src=x onerror=alert(1)>&"'`));
  expect(out).toBe("&lt;img src=x onerror=alert(1)&gt;&amp;&quot;&#39;");
});