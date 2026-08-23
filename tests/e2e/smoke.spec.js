import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test.describe("boot and browse", () => {
  test("app boots, pool loads, cards render", async ({ page }) => {
    await openApp(page);
    await expect(page.locator("#onboard")).toBeHidden();
    await expect(page.locator("#browser")).toBeVisible();
    // Stage 8: the browser opens on the merged pool, all sets in scope.
    await expect(page.locator("#resultCount")).toHaveText(/640 cards in scope/);
    expect(await page.locator("#results .tile").count()).toBeGreaterThan(0);
    // 352 Origins + 288 Spiritforged printings, all with art.
    expect(await page.evaluate(() => S.pool.length)).toBe(640);
    expect(await page.evaluate(() => S.pool.filter(c => c.image).length)).toBe(640);
  });

  test("search narrows the grid, and the readout keeps the scope it narrowed", async ({ page }) => {
    await openApp(page);
    await page.fill("#q", "kai");
    await expect(page.locator("#resultCount")).not.toHaveText(/640 cards in scope/);
    const n = await page.evaluate(() => S.pool.filter(c => c.name.toLowerCase().includes("kai")).length);
    // "N of 640 in scope": the filtered count AND what it was filtered from. The
    // label used to drop to a bare "N cards", which threw the scope away and
    // changed shape on every keystroke.
    await expect(page.locator("#resultCount")).toHaveText(new RegExp(`^${n} of 640 in scope$`, "i"));
  });

  test("a domain filter changes the result count", async ({ page }) => {
    await openApp(page);
    const before = await page.evaluate(() => Number(document.getElementById("resultCount").textContent.match(/\d+/)[0]));
    await page.locator("#domainRow .chip", { hasText: "Fury" }).click();
    const after = await page.evaluate(() => Number(document.getElementById("resultCount").textContent.match(/\d+/)[0]));
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0);
  });
});

test.describe("deck building", () => {
  test("adding a card wires through, and the 3-copy cap holds", async ({ page }) => {
    await openApp(page);
    // Click a real "+ Main" button to prove the wiring.
    await page.locator("#results .btn", { hasText: "+ Main" }).first().click();
    expect(await page.evaluate(() => zoneCount("main"))).toBe(1);

    // The copy limit: five adds of one card cap at 3.
    const capped = await page.evaluate(() => {
      const id = refOf(S.zones.main[0]);
      for (let i = 0; i < 5; i++) addCard(id, "main");
      return S.zones.main.find(c => refOf(c) === id).qty;
    });
    expect(capped).toBe(3);

    // Removing past zero drops the entry.
    const gone = await page.evaluate(() => {
      const c = S.zones.main[0], id = c.id;
      for (let i = 0; i < 5; i++) bump("main", id, -1);
      return S.zones.main.some(x => x.id === id);
    });
    expect(gone).toBe(false);
  });
});

test.describe("collection", () => {
  test("steppers cap at 3 and clear at 0", async ({ page }) => {
    await openApp(page, { hash: "#collection" });
    await expect(page.locator("#collectionView")).toBeVisible();
    const result = await page.evaluate(() => {
      const ref = refOf(S.pool[0]);
      for (let i = 0; i < 5; i++) colBump(ref, 1);
      const hi = qtyOf(ref);
      for (let i = 0; i < 5; i++) colBump(ref, -1);
      return { hi, lo: qtyOf(ref) };
    });
    expect(result.hi).toBe(3);
    expect(result.lo).toBe(0);
  });
});

test.describe("persistence and preferences", () => {
  test("theme toggle persists across reload", async ({ page }) => {
    await openApp(page);
    const wasPaper = await page.evaluate(() => document.documentElement.classList.contains("paper"));
    await page.click("#themeBtn");
    const nowPaper = await page.evaluate(() => document.documentElement.classList.contains("paper"));
    expect(nowPaper).toBe(!wasPaper);
    await page.reload();
    await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY);
    expect(await page.evaluate(() => document.documentElement.classList.contains("paper"))).toBe(nowPaper);
  });

  test("a signed-out deck survives a reload", async ({ page }) => {
    await openApp(page);
    await page.locator("#results .btn", { hasText: "+ Main" }).first().click();
    expect(await page.evaluate(() => zoneCount("main"))).toBe(1);
    await openApp(page); // reload with the same context (localStorage persists)
    expect(await page.evaluate(() => zoneCount("main"))).toBe(1);
  });
});

test.describe("copy limit (Showcase / base printings)", () => {
  const BASE = "ogn-039-298";   // Kai'Sa - Survivor
  const SHOW = "ogn-039a-298";  // Kai'Sa - Survivor (Alternate Art)

  const RUNE = "ogn-007-298";   // Fury Rune

  // zones: { main: [[ref, qty], ...], sideboard: [...], runes: [...] }
  const setZones = (page, zones) => page.evaluate((zones) => {
    freshDeck();
    for (const [z, pairs] of Object.entries(zones))
      S.zones[z] = pairs.map(([ref, qty]) => ({ ...findCard(ref), id: uid(), qty }));
    render();
    return document.getElementById("problems").innerText;
  }, zones);

  const setMain = (page, pairs) => setZones(page, { main: pairs });

  test("3 base + 1 Showcase of one card is flagged over the 3-copy limit", async ({ page }) => {
    await openApp(page);
    const problems = await setMain(page, [[BASE, 3], [SHOW, 1]]);
    expect(problems).toMatch(/Over 3 copies/);
    expect(problems).toMatch(/Kai'Sa - Survivor \(4\)/);
  });

  test("2 base + 1 Showcase (3 total across printings) is legal", async ({ page }) => {
    await openApp(page);
    const problems = await setMain(page, [[BASE, 2], [SHOW, 1]]);
    expect(problems).not.toMatch(/Over 3 copies/);
  });

  // Tournament Rules 403.4: "Limits on copies of named cards apply to the
  // combination of Main Deck and sideboard." These two are the rule's own
  // worked examples.
  test("3 in the main deck + 1 in the sideboard is over the limit", async ({ page }) => {
    await openApp(page);
    const problems = await setZones(page, { main: [[BASE, 3]], sideboard: [[BASE, 1]] });
    expect(problems).toMatch(/Over 3 copies \(main deck and sideboard combined\)/);
    expect(problems).toMatch(/Kai'Sa - Survivor \(4\)/);
  });

  test("2 in the main deck + 1 in the sideboard is legal", async ({ page }) => {
    await openApp(page);
    const problems = await setZones(page, { main: [[BASE, 2]], sideboard: [[BASE, 1]] });
    expect(problems).not.toMatch(/Over 3 copies/);
  });

  test("printing grouping applies across zones too (base main + Showcase side)", async ({ page }) => {
    await openApp(page);
    const problems = await setZones(page, { main: [[BASE, 3]], sideboard: [[SHOW, 1]] });
    expect(problems).toMatch(/Kai'Sa - Survivor \(4\)/);
  });

  test("the rune deck is a separate deck and does not count toward the limit", async ({ page }) => {
    await openApp(page);
    const problems = await setZones(page, { main: [[RUNE, 3]], runes: [[RUNE, 3]] });
    expect(problems).not.toMatch(/Over 3 copies/);
  });

  test("the collection still keys base and Showcase as distinct printings", async ({ page }) => {
    await openApp(page, { hash: "#collection" });
    const q = await page.evaluate((refs) => {
      colBump(refs[0], 1); colBump(refs[0], 1); // base -> 2
      colBump(refs[1], 1);                       // showcase -> 1
      return { base: qtyOf(refs[0]), show: qtyOf(refs[1]) };
    }, [BASE, SHOW]);
    expect(q.base).toBe(2);
    expect(q.show).toBe(1);
  });
});

test.describe("vendored SDK", () => {
  test("the auth/data SDK loads from vendored files, not a CDN", async ({ page }) => {
    // Deliberately does NOT block esm.sh — it asserts nothing tries to reach it.
    const esm = [];
    page.on("request", r => { if (/esm\.sh/.test(r.url())) esm.push(r.url()); });
    await page.goto("/");
    await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null, { timeout: 15000 });
    // window.cloud only exists once the whole vendored module graph has executed.
    await page.waitForFunction(() => typeof window.cloud !== "undefined", null, { timeout: 15000 });
    expect(esm).toEqual([]);
    const n = await page.evaluate(() =>
      performance.getEntriesByType("resource").filter(r => /\/vendor\/neon\//.test(r.name)).length);
    expect(n).toBeGreaterThan(100);
  });
});

test.describe("security", () => {
  test("an imported deck name cannot execute script (XSS regression)", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      const evil = "x'); window.__x = 1; //";
      S.zones.main = [{ ...normalize({ name: evil }), id: "evil", qty: 1 }];
      ZONE_TAB = "main";
      render();
    });
    await page.locator("#zoneList .dname").first().click();
    expect(await page.evaluate(() => window.__x)).toBeUndefined();
  });
});

test.describe("themes", () => {
  /* Badges are drawn on a FIXED dark chip over card art. Ink taken from
     var(--text) / var(--text2) inverts with the theme while the chip under it
     does not, so in Paper it went near-black on near-black and the badge became
     a solid rectangle. Assert the ink is pinned — identical across themes — and
     light enough to read on that chip. */
  const relLum = rgb => {
    const [r, g, b] = rgb.match(/[\d.]+/g).slice(0, 3).map(Number)
      .map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ink = (page, sel) =>
    page.evaluate(s => getComputedStyle(document.querySelector(s)).color, sel);

  test("no control falls back to the browser's default button chrome", async ({ page }) => {
    /* .gmrow styled its layout and set its ink to var(--text), but never reset
       background or border — and the switchable game row is a <button> while the
       active one is a <div>. So that row painted the UA default: rgb(240,240,240)
       with a 2px black border, carrying light Midnight ink. It was the only rule
       in the file with the gap; this keeps it the only one that can't come back. */
    await openApp(page);
    // Open the menus directly: clicking one closes the other by design.
    await page.evaluate(() => { toggleGameMenu(true); toggleDeckMenu(true); });
    const r = await page.evaluate(() => {
      const probe = document.createElement("button");
      document.body.appendChild(probe);
      const uaBg = getComputedStyle(probe).backgroundColor;
      probe.remove();
      const bad = [];
      for (const b of document.querySelectorAll("button")) {
        if (!b.getBoundingClientRect().width) continue;      // not on screen
        if (getComputedStyle(b).backgroundColor === uaBg)
          bad.push(`${b.className || b.id}: ${b.textContent.trim().slice(0, 24)}`);
      }
      return { uaBg, bad, seen: document.querySelectorAll("button").length };
    });
    expect(r.bad).toEqual([]);
    expect(r.seen).toBeGreaterThan(20);   // the sweep actually swept something
  });

  test("tile badges stay legible in the Paper theme", async ({ page }) => {
    await openApp(page);
    // Showcase printings are the ones carrying a .variant badge.
    await page.evaluate(() => { S.rarityFilter = ["Showcase"]; render(); });
    await expect(page.locator("#results .variant").first()).toBeVisible();
    const midnight = await ink(page, "#results .variant");
    await page.click("#themeBtn");
    expect(await page.evaluate(() =>
      document.documentElement.classList.contains("paper"))).toBe(true);
    const paper = await ink(page, "#results .variant");
    expect(paper).toBe(midnight);
    expect(relLum(paper)).toBeGreaterThan(0.5);
  });
});

test.describe("saving", () => {
  /* A signed-in session, mocked, with a counter on the endpoint. The real auth
     module dispatches onCloudSession(null) once its own getSession resolves,
     which would drop us back to local mode mid-test — so that late null is
     swallowed after the mock is installed. */
  const signIn = (page) => page.evaluate(() => {
    window.__writes = 0;
    const rows = [];
    window.cloud = {
      list: async () => ({ data: rows.slice() }),
      get: async (id) => ({ data: rows.find((r) => r.id === id) || null }),
      insert: async ({ name, payload }) => {
        window.__writes++;
        const r = { id: "r" + (rows.length + 1), name, payload,
                    game: window.ACTIVE_GAME, updated_at: new Date().toISOString() };
        rows.push(r);
        return { data: r };
      },
      update: async (id, p) => {
        window.__writes++;
        const r = rows.find((x) => x.id === id);
        Object.assign(r, p);
        return { data: r };
      },
      remove: async () => ({}), saveCollection: async () => ({}),
      syncCollection: async () => ({ map: {} }), collectionKeepalive: () => {},
    };
    const real = window.onCloudSession;
    window.onCloudSession = (u, ...rest) => {
      if (!u && window.__mocked) return;
      return real(u, ...rest);
    };
    window.__mocked = true;
    window.onCloudSession({ id: "u1", email: "t@example.com" }, [], null, { riftbound: {} });
  });

  const state = (page) => page.evaluate(() => ({
    text: document.getElementById("saveBtn").textContent.trim(),
    disabled: document.getElementById("saveBtn").disabled,
    writes: window.__writes,
  }));

  test("a saved deck with no changes cannot be saved again", async ({ page }) => {
    /* Every click used to be another POST writing the identical payload. CU-hours
       are the scarcest resource here, so an idempotent write is not harmless. */
    await openApp(page);
    await signIn(page);
    await page.waitForTimeout(300);

    await page.evaluate(() => addCard("ogn-001-298", "main"));
    expect(await state(page)).toMatchObject({ text: "Save deck", disabled: false, writes: 0 });

    await page.locator("#saveBtn").click();
    await expect(page.locator("#saveBtn")).toBeDisabled();
    expect(await state(page)).toMatchObject({ text: "Saved", disabled: true, writes: 1 });

    // Clicking anyway — and calling the function directly — must write nothing.
    for (let i = 0; i < 5; i++) await page.locator("#saveBtn").click({ force: true });
    await page.evaluate(() => saveDeckCloud());
    await page.waitForTimeout(300);
    expect(await state(page)).toMatchObject({ disabled: true, writes: 1 });
  });

  test("any real change re-enables it, including a rename", async ({ page }) => {
    await openApp(page);
    await signIn(page);
    await page.waitForTimeout(300);
    await page.evaluate(() => addCard("ogn-001-298", "main"));
    await page.locator("#saveBtn").click();
    await expect(page.locator("#saveBtn")).toBeDisabled();

    // a quantity change
    await page.evaluate(() => bump("main", S.zones.main[0].id, 1));
    await expect(page.locator("#saveBtn")).toBeEnabled();
    await page.locator("#saveBtn").click();
    await expect(page.locator("#saveBtn")).toBeDisabled();
    expect((await state(page)).writes).toBe(2);

    // the deck NAME is part of what gets stored, so it counts too
    await page.fill("#deckName", "Renamed");
    await expect(page.locator("#saveBtn")).toBeEnabled();
  });

  test("a brand-new deck is savable even though nothing has been edited",
    async ({ page }) => {
      /* Dirty means "differs from the stored row", and a deck with no row at all
         differs from it by definition — otherwise a fresh deck could never be
         saved the first time. */
      await openApp(page);
      await signIn(page);
      await page.waitForTimeout(300);
      expect(await page.evaluate(() => ({ deckId: S.deckId, dirty: isDirty() })))
        .toEqual({ deckId: null, dirty: true });
      await expect(page.locator("#saveBtn")).toBeEnabled();
    });

  test("a failed save leaves the deck dirty so it can be retried", async ({ page }) => {
    await openApp(page);
    await signIn(page);
    await page.waitForTimeout(300);
    await page.evaluate(() => {
      window.cloud.insert = async () => ({ error: "network is down" });
      addCard("ogn-001-298", "main");
    });
    await page.locator("#saveBtn").click();
    await page.waitForTimeout(300);
    // Still dirty, still pressable, and it said what went wrong.
    expect(await page.evaluate(() => isDirty())).toBe(true);
    await expect(page.locator("#saveBtn")).toBeEnabled();
    expect(await page.evaluate(() =>
      document.getElementById("notice").textContent)).toContain("network is down");
  });
});

test.describe("the browse page ends on a full row", () => {
  /* The grid is auto-fill, so its column count is whatever fits — 11 at 1920px,
     3 on a phone. A fixed page of 48 therefore landed mid-row at most widths,
     leaving a ragged last line. The page is now a whole number of rows, rounded
     UP from 48 so no width shows less than it used to. */
  const shelf = (page) => page.evaluate(() => {
    const el = document.getElementById("results");
    const cols = getComputedStyle(el).gridTemplateColumns
      .split(" ").filter((t) => t.endsWith("px")).length;
    const tops = [...el.querySelectorAll(".tile")].map((t) =>
      Math.round(t.getBoundingClientRect().top));
    const bottom = Math.max(...tops);
    return {
      cols, tiles: tops.length, rows: new Set(tops).size,
      lastRow: tops.filter((t) => t === bottom).length,
      limit: S.limit,
    };
  });

  // Widths chosen because 48 divides evenly into some and not others.
  for (const width of [1920, 1600, 1100, 940, 1440, 390]) {
    test(`at ${width}px the last row is full and the page is not smaller than 48`,
      async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await openApp(page);
        const r = await shelf(page);
        expect(r.cols).toBeGreaterThan(0);
        expect(r.tiles % r.cols, `${r.tiles} tiles over ${r.cols} columns`).toBe(0);
        expect(r.lastRow).toBe(r.cols);
        expect(r.tiles).toBeGreaterThanOrEqual(48);
        // ...and no more than a row's worth beyond it, so this is a page and not
        // an excuse to render everything.
        expect(r.tiles).toBeLessThan(48 + r.cols);
      });
  }

  test("paging keeps every drawn row full", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 });
    await openApp(page);
    const first = await shelf(page);
    await page.locator("#more").click();
    const second = await shelf(page);
    expect(second.tiles).toBe(first.tiles * 2);
    expect(second.lastRow).toBe(second.cols);
    // The button offers a whole page, not the old fixed 48.
    await expect(page.locator("#more")).toHaveText(`Show ${first.tiles} more`);
  });

  /* No absolute column counts here. The count depends on how much width the
     browser gives the grid, and a headless Linux runner reserves no scrollbar
     where this machine reserves ~15px — enough to change the count at the same
     viewport width. The property under test is relational anyway: whatever the
     two counts are, the page re-rounds to whole rows and never shrinks.

     Polled on an interval rather than the default rAF, because rAF stops in a
     backgrounded page and CI runs several workers at once — the first version of
     this test timed out there while passing everywhere else. */
  test("a resize re-rounds the page rather than leaving it ragged",
    async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1000 });
      await openApp(page);
      const wide = await shelf(page);
      expect(wide.lastRow).toBe(wide.cols);

      await page.setViewportSize({ width: 1100, height: 1000 });
      const settled = await page.waitForFunction((was) => {
        const el = document.getElementById("results");
        const cols = getComputedStyle(el).gridTemplateColumns
          .split(" ").filter((t) => t.endsWith("px")).length;
        const tiles = el.querySelectorAll(".tile").length;
        return cols !== was && tiles % cols === 0 ? { cols, tiles } : null;
      }, wide.cols, { timeout: 15000, polling: 100 }).then((h) => h.jsonValue());

      const r = await shelf(page);
      expect(r.cols, `narrow cols should differ from ${wide.cols}`).not.toBe(wide.cols);
      expect(r.tiles % r.cols, `${r.tiles} tiles over ${r.cols} columns`).toBe(0);
      expect(r.lastRow).toBe(r.cols);
      // Up, never down: a reader who paged through screens keeps them.
      expect(r.tiles).toBeGreaterThanOrEqual(wide.tiles);
      expect(settled.cols).toBe(r.cols);
    });

  test("Show all is allowed to end ragged — that is the end of the results",
    async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1000 });
      await openApp(page);
      await page.locator("#showAll").click();
      const r = await shelf(page);
      expect(r.tiles).toBe(640);          // every card, not a whole-row page
      await expect(page.locator("#more")).toBeHidden();
      // Collapsing returns to exactly one full page.
      await page.locator("#showLess").click();
      const back = await shelf(page);
      expect(back.lastRow).toBe(back.cols);
      expect(back.tiles % back.cols).toBe(0);
    });
});
