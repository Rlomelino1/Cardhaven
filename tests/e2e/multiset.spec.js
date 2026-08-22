import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

/* Stage 8: two sets in one pool, the set-scope display filter, and the
   cross-set card identity that the 3-copy limit depends on.

   The reprint fixture is REAL data, not a construction. Spiritforged reprints
   thirteen Origins cards as overnumbered Showcase printings; Vayne - Hunter is
   one of them, and it is a Unit, so it belongs in a main deck where the copy
   limit actually bites. Both refs are asserted to exist before they are used,
   so a pool regeneration that dropped them fails loudly here instead of
   quietly turning this file into a no-op. */
const OGN_VAYNE = "ogn-035-298";   // Vayne - Hunter
const SFD_VAYNE = "sfd-223-221";   // Vayne - Hunter (Overnumbered), Showcase

// zones: { main: [[ref, qty], ...], ... }
const setZones = (page, zones) => page.evaluate((zones) => {
  freshDeck();
  for (const [z, pairs] of Object.entries(zones))
    S.zones[z] = pairs.map(([ref, qty]) => ({ ...findCard(ref), id: uid(), qty }));
  render();
  return document.getElementById("problems").innerText;
}, zones);

test.describe("merged pool", () => {
  test("both sets load in parallel into one pool", async ({ page }) => {
    await openApp(page);
    const r = await page.evaluate(() => ({
      total: S.pool.length,
      sets: poolSets().map(s => ({ code: s.code, name: s.name, n: setCardsOf(s.code).length })),
      // Refs are identity for decks AND collections. A collision across sets
      // would silently merge two different cards' storage.
      uniqueRefs: new Set(S.pool.map(refOf)).size,
      missingRef: S.pool.filter(c => !c.riftboundId).length,
    }));
    expect(r.sets).toEqual([
      { code: "OGN", name: "Origins", n: 352 },
      { code: "SFD", name: "Spiritforged", n: 288 },
    ]);
    expect(r.total).toBe(640);
    expect(r.uniqueRefs).toBe(640);   // no ref collides across sets
    expect(r.missingRef).toBe(0);
  });

  test("the browser renders cards from both sets, badged with their set", async ({ page }) => {
    await openApp(page);
    await page.fill("#q", "vayne");
    const badges = await page.evaluate(() =>
      [...document.querySelectorAll("#results .setbadge")].map(b => b.textContent));
    expect(new Set(badges)).toEqual(new Set(["OGN", "SFD"]));
  });

  test("a set that fails to load fails the whole load, naming the set", async ({ page }) => {
    // Partial pools are worse than none: every card of the missing set would
    // read as an unresolved deck entry and as a hole in the collection.
    await page.route("**/data/sfd-pool.json", route => route.fulfill({ status: 503, body: "nope" }));
    await page.goto("/");
    await expect(page.locator("#onboardMsg")).toContainText("Spiritforged");
    await expect(page.locator("#onboardRetry")).toBeVisible();
    expect(await page.evaluate(() => S.pool.length)).toBe(0);
  });
});

test.describe("cross-set card identity", () => {
  test("the fixture reprint really is one card in two sets", async ({ page }) => {
    await openApp(page);
    const r = await page.evaluate(([a, b]) => {
      const x = findCard(a), y = findCard(b);
      return {
        found: !!x && !!y,
        names: [x?.name, y?.name],
        sets: [x?.set, y?.set],
        // same card by the rules (TR 601.2.a), different printings by ref
        sameKey: cardKeyRef(a) === cardKeyRef(b),
        differentRefs: a !== b,
        idGroupsDiffer: copyGroupRef(a) !== copyGroupRef(b),
      };
    }, [OGN_VAYNE, SFD_VAYNE]);
    expect(r.found).toBe(true);
    expect(r.sets).toEqual(["OGN", "SFD"]);
    expect(r.names[0]).toBe("Vayne - Hunter");
    expect(r.names[1]).toBe("Vayne - Hunter (Overnumbered)");
    expect(r.idGroupsDiffer).toBe(true);   // layer 1 alone would miss this
    expect(r.sameKey).toBe(true);          // layer 2 catches it
    expect(r.differentRefs).toBe(true);
  });

  test("2 + 2 across two sets' printings of one card is over the limit", async ({ page }) => {
    await openApp(page);
    const problems = await setZones(page, { main: [[OGN_VAYNE, 2], [SFD_VAYNE, 2]] });
    expect(problems).toMatch(/Over 3 copies/);
    expect(problems).toMatch(/Vayne - Hunter \(4\)/);   // labelled by the base printing
  });

  test("2 + 1 across two sets (3 total) is legal", async ({ page }) => {
    await openApp(page);
    const problems = await setZones(page, { main: [[OGN_VAYNE, 2], [SFD_VAYNE, 1]] });
    expect(problems).not.toMatch(/Over 3 copies/);
  });

  test("the limit still spans main + sideboard across sets", async ({ page }) => {
    await openApp(page);
    const problems = await setZones(page,
      { main: [[OGN_VAYNE, 3]], sideboard: [[SFD_VAYNE, 1]] });
    expect(problems).toMatch(/Over 3 copies \(main deck and sideboard combined\)/);
    expect(problems).toMatch(/Vayne - Hunter \(4\)/);
  });

  test("a set's own overnumbered Showcase shares the base card's limit", async ({ page }) => {
    // Within Spiritforged, an overnumbered Showcase gets its OWN collector
    // number rather than a suffix on the base card's, so the id strip alone
    // does not group it. sfd-049 / sfd-224* are one Unit: Aphelios - Exalted.
    await openApp(page);
    const problems = await setZones(page,
      { main: [["sfd-049-221", 3], ["sfd-224*-221", 1]] });
    expect(problems).toMatch(/Aphelios - Exalted \(4\)/);
  });

  test("battlefield uniqueness groups a reprint with its original", async ({ page }) => {
    // No battlefield is reprinted across OGN and SFD today, so this is a
    // synthetic fixture. The rule is stable regardless; the real-data guard is
    // the pool-integrity test below.
    await openApp(page);
    const problems = await page.evaluate(() => {
      S.pool.push(
        normalize({ name: "Testing Grounds", type: "Battlefield", domains: ["Fury"],
                    set: "OGN", number: 900, riftboundId: "ogn-900-298" }),
        normalize({ name: "Testing Grounds", type: "Battlefield", domains: ["Fury"],
                    set: "SFD", number: 900, riftboundId: "sfd-900-221" }));
      buildCardIndex();
      freshDeck();
      S.zones.battlefields = ["ogn-900-298", "sfd-900-221"]
        .map(ref => ({ ...findCard(ref), id: uid(), qty: 1 }));
      render();
      return document.getElementById("problems").innerText;
    });
    expect(problems).toMatch(/Battlefields must all be different/);
    expect(problems).toMatch(/Testing Grounds/);
  });

  test("pool integrity: every card the grouping merges is functionally one card",
    async ({ page }) => {
      // The grouping is name-based, and name-based grouping is only correct
      // while two different cards never share a name. That is a property of the
      // DATA, so it is asserted against the real pool: the day a set ships two
      // distinct cards under one name, this goes red and the design gets
      // revisited instead of silently mis-counting a deck.
      await openApp(page);
      const bad = await page.evaluate(() => {
        const byKey = new Map();
        for (const c of S.pool) {
          const k = cardKey(c);
          if (!byKey.has(k)) byKey.set(k, []);
          byKey.get(k).push(c);
        }
        // Gameplay identity only. Riftcodex's metadata drifts between printings
        // (a Showcase reprint may drop `supertype`, and legend text gets
        // errata'd), which is not evidence of a different card.
        const shape = c => JSON.stringify({
          type: c.type, energy: c.energy, might: c.might, power: c.power,
          domains: [...c.domains].sort(),
        });
        const out = [];
        for (const [k, list] of byKey)
          if (new Set(list.map(shape)).size > 1)
            out.push(k + ": " + list.map(c => refOf(c)).join(","));
        return { collisions: out, keys: byKey.size, printings: S.pool.length };
      });
      expect(bad.collisions).toEqual([]);
      // 640 printings collapse to 520 distinct cards for legality purposes.
      expect(bad.printings).toBe(640);
      expect(bad.keys).toBe(520);
    });

  test("no two Riftbound printings share an exact name", async ({ page }) => {
    // addCard() merges a click into an existing deck row by REF. It used to
    // merge by name, which was interchangeable here and wrong for a game that
    // reprints one name across sets. This asserts the property that made the
    // two interchangeable, so the day a Riftbound set ships two printings under
    // one identical name, the reasoning behind that change gets revisited
    // rather than quietly stopping being true.
    await openApp(page);
    const shared = await page.evaluate(() => {
      const byName = new Map();
      for (const c of S.pool) {
        const k = c.name.toLowerCase();
        if (!byName.has(k)) byName.set(k, []);
        byName.get(k).push(refOf(c));
      }
      return [...byName].filter(([, refs]) => refs.length > 1)
        .map(([n, refs]) => n + ": " + refs.join(","));
    });
    expect(shared).toEqual([]);
  });

  test("the collection keeps a reprint and its original as distinct printings",
    async ({ page }) => {
      await openApp(page, { hash: "#collection" });
      const q = await page.evaluate(([a, b]) => {
        colBump(a, 1); colBump(a, 1);   // OGN printing -> 2
        colBump(b, 1);                  // SFD reprint  -> 1
        return { ogn: qtyOf(a), sfd: qtyOf(b), keys: Object.keys(COL).length };
      }, [OGN_VAYNE, SFD_VAYNE]);
      expect(q).toEqual({ ogn: 2, sfd: 1, keys: 2 });
    });
});

/* The All sets chip is a toggle: pressing it while it is already on backs out of
   all-mode. So say the intent — be in all-mode — rather than pressing a button
   whose meaning depends on where you already are. */
const allSets = page => page.evaluate(() => {
  if (!S.setScopeAll) toggleSetScope("all");
  return S.setScopeAll;
});

test.describe("deck builder set scope", () => {
  const deselectSfd = async page => {
    await allSets(page);
    return page.evaluate(() => { toggleSetScope("SFD"); return S.setScope; });
  };

  test("chips scope the browser and the readouts", async ({ page }) => {
    await openApp(page);
    await expect(page.locator("#setScopeCount")).toHaveText(/2 sets · 640 cards in scope/i);
    await expect(page.locator("#resultCount")).toHaveText(/640 cards in scope/);

    expect(await deselectSfd(page)).toEqual(["OGN"]);
    await expect(page.locator("#setScopeCount")).toHaveText(/1 set · 352 cards in scope/i);
    await expect(page.locator("#resultCount")).toHaveText(/352 cards in scope/);
    const sets = await page.evaluate(() =>
      [...new Set([...document.querySelectorAll("#results .setbadge")].map(b => b.textContent))]);
    expect(sets).toEqual(["OGN"]);
  });

  test("scope never touches the deck panel, the counts, or legality", async ({ page }) => {
    await openApp(page);
    await setZones(page, { main: [[OGN_VAYNE, 2], [SFD_VAYNE, 2]] });
    const before = await page.evaluate(() => ({
      count: zoneCount("main"),
      rows: document.querySelectorAll("#zoneList .dlist li").length,
      over: /Over 3 copies/.test(document.getElementById("problems").innerText),
    }));
    await deselectSfd(page);
    const after = await page.evaluate(() => ({
      count: zoneCount("main"),
      rows: document.querySelectorAll("#zoneList .dlist li").length,
      over: /Over 3 copies/.test(document.getElementById("problems").innerText),
      names: [...document.querySelectorAll("#zoneList .dname")].map(n => n.textContent),
    }));
    expect(after.count).toBe(before.count);
    expect(after.rows).toBe(before.rows);
    expect(after.over).toBe(true);              // still flagged, still illegal
    expect(before.over).toBe(true);
    expect(after.names.join(" ")).toContain("Vayne - Hunter (Overnumbered)");
  });

  test("the out-of-scope notice counts the open zone and is not an error", async ({ page }) => {
    await openApp(page);
    await setZones(page, { main: [[OGN_VAYNE, 1], [SFD_VAYNE, 2]] });
    await expect(page.locator("#problems .scopenote")).toHaveCount(0);
    await deselectSfd(page);
    const note = page.locator("#problems .scopenote");
    await expect(note).toHaveCount(1);
    await expect(note).toHaveText(
      /2 cards in this zone sit outside the current set scope — still legal, just not browsable right now\./);
    // It is the last line in the notice area, after the legality messages.
    const last = await page.evaluate(() =>
      document.querySelector("#problems li:last-child").className);
    expect(last).toBe("scopenote");
  });

  test("the scope selection survives a reload", async ({ page }) => {
    await openApp(page);
    await deselectSfd(page);
    await openApp(page);   // same context, so localStorage persists
    expect(await page.evaluate(() => S.setScope)).toEqual(["OGN"]);
    await expect(page.locator("#resultCount")).toHaveText(/352 cards in scope/);
  });

  test("the All sets chip reports the act, not the sum of the picks", async ({ page }) => {
    /* Ticking every set by hand is not the same act as asking for all sets, so
       the chip lights only in all-mode. It also means more than the enumeration
       does: all-mode covers sets that ship later, an enumerated pick does not. */
    const state = () => page.evaluate(() => ({
      lit: document.querySelector("#setChips .setchip").classList.contains("on"),
      all: S.setScopeAll,
      scope: S.setScope,
      stored: JSON.parse(localStorage.getItem(setScopeKey()) || "null"),
    }));
    await openApp(page);
    // Fresh: nothing has been picked, so the app really is showing every set.
    expect(await state()).toMatchObject({ lit: true, all: true });

    await page.locator("#setChips .setchip", { hasText: "Spiritforged" }).click();
    expect(await state()).toMatchObject({ lit: false, all: false, scope: ["OGN"] });

    // Back to every set, by hand. The chip must NOT light.
    await page.locator("#setChips .setchip", { hasText: "Spiritforged" }).click();
    expect(await state()).toMatchObject({
      lit: false, all: false, scope: ["OGN", "SFD"], stored: ["OGN", "SFD"] });
    await openApp(page);   // and it survives a reload as a hand-picked scope
    expect(await state()).toMatchObject({ lit: false, all: false });

    // Asking for all sets does light it, and persists as the mode.
    await page.locator("#setChips .setchip", { hasText: "All sets" }).click();
    // Stored as the mode plus the scope to back out to.
    expect(await state()).toMatchObject({
      lit: true, all: true, stored: { all: true, prev: ["OGN", "SFD"] } });
    await openApp(page);
    expect(await state()).toMatchObject({ lit: true, all: true });
  });

  test("pressing All sets again backs out to the scope you were on", async ({ page }) => {
    const chip = page.locator("#setChips .setchip", { hasText: "All sets" });
    const state = () => page.evaluate(() => ({
      all: S.setScopeAll, scope: S.setScope,
      prev: S.setScopePrev,
      lit: document.querySelector("#setChips .setchip").classList.contains("on"),
    }));
    await openApp(page);
    // Get onto a real hand-picked scope first.
    await page.locator("#setChips .setchip", { hasText: "Origins" }).click();
    expect(await state()).toMatchObject({ all: false, scope: ["SFD"] });

    await chip.click();
    expect(await state()).toMatchObject({
      all: true, lit: true, scope: ["OGN", "SFD"], prev: ["SFD"] });
    // ...and pressing it again returns you to exactly that scope.
    await chip.click();
    expect(await state()).toMatchObject({
      all: false, lit: false, scope: ["SFD"], prev: null });

    // The round trip survives a reload, because the scope to come back to is
    // stored with the preference.
    await chip.click();
    await openApp(page);
    expect(await state()).toMatchObject({ all: true, prev: ["SFD"] });
    await chip.click();
    expect(await state()).toMatchObject({ all: false, scope: ["SFD"] });
  });

  test("backing out with nothing to return to lands on the game's first set",
    async ({ page }) => {
      const chip = page.locator("#setChips .setchip", { hasText: "All sets" });
      // A fresh browser starts in all-mode having never picked anything, so
      // there is no previous scope — the first set beats an empty browser.
      await openApp(page);
      expect(await page.evaluate(() => ({
        all: S.setScopeAll, prev: S.setScopePrev }))).toEqual({ all: true, prev: null });
      await chip.click();
      expect(await page.evaluate(() => S.setScope)).toEqual(["OGN"]);
      expect(await page.evaluate(() => poolSets()[0].code)).toBe("OGN");
    });

  test("a remembered set that left the pool falls back to the first set",
    async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem("riftbound.setScope",
        JSON.stringify({ all: true, prev: ["GONE"] })));
      await openApp(page);
      expect(await page.evaluate(() => S.setScopeAll)).toBe(true);
      await page.locator("#setChips .setchip", { hasText: "All sets" }).click();
      expect(await page.evaluate(() => S.setScope)).toEqual(["OGN"]);
    });

  test("all-mode covers a set that ships later; a hand-picked scope does not",
    async ({ page }) => {
      await openApp(page);
      const withNewSet = () => page.evaluate(() => {
        S.pool.push({ ...S.pool[0], set: "NEW", setName: "Newest Set",
                      riftboundId: "new-001-100" });
        adoptPool();
        return S.setScope;
      });
      // A fresh browser is already in all-mode, so pressing the chip here would
      // back OUT of it. Assert the starting state instead of clicking into it.
      expect(await page.evaluate(() => S.setScopeAll)).toBe(true);
      expect(await withNewSet()).toEqual(["OGN", "SFD", "NEW"]);

      await openApp(page);
      // Hand-picked: the scope is what was picked, and stays that way.
      await page.locator("#setChips .setchip", { hasText: "Spiritforged" }).click();
      await page.locator("#setChips .setchip", { hasText: "Spiritforged" }).click();
      expect(await withNewSet()).toEqual(["OGN", "SFD"]);
    });

  test("a legacy stored array still reads as a hand-picked scope", async ({ page }) => {
    // Every browser that has ever set a scope holds an array, never "all".
    await page.addInitScript(() =>
      localStorage.setItem("riftbound.setScope", JSON.stringify(["OGN", "SFD"])));
    await openApp(page);
    const r = await page.evaluate(() => ({
      all: S.setScopeAll, scope: S.setScope,
      lit: document.querySelector("#setChips .setchip").classList.contains("on"),
    }));
    expect(r).toEqual({ all: false, scope: ["OGN", "SFD"], lit: false });
  });

  test("the last set standing cannot be deselected", async ({ page }) => {
    /* Something has to stay in scope. This used to snap to EVERY set, which
       turned one stray click into a scope nobody asked for; now the click does
       nothing whatsoever — including not disturbing all-mode or the remembered
       scope, which is why the guard runs before either is written. */
    await openApp(page);
    await allSets(page);
    await page.locator("#setChips .setchip", { hasText: "Spiritforged" }).click();
    expect(await page.evaluate(() => S.setScope)).toEqual(["OGN"]);

    // Click the only remaining set, three times.
    const lone = page.locator("#setChips .setchip", { hasText: "Origins" });
    for (let i = 0; i < 3; i++) await lone.click();
    expect(await page.evaluate(() => ({
      scope: S.setScope,
      lit: document.querySelectorAll("#setChips .setchip.on").length,
      stored: JSON.parse(localStorage.getItem(setScopeKey())),
    }))).toEqual({ scope: ["OGN"], lit: 1, stored: ["OGN"] });
    // It says why on hover, so a click that does nothing doesn't read as dead.
    await expect(lone).toHaveAttribute("title", /at least one set/i);
    // The other set can still be brought back...
    await page.locator("#setChips .setchip", { hasText: "Spiritforged" }).click();
    expect(await page.evaluate(() => S.setScope.length)).toBe(2);
    // ...and with two selected, neither is pinned.
    expect(await page.locator("#setChips .setchip[title]").count()).toBe(0);
  });

  test("dropping to one set keeps the mode flags honest", async ({ page }) => {
    await openApp(page);
    await page.locator("#setChips .setchip", { hasText: "Spiritforged" }).click();
    await page.locator("#setChips .setchip", { hasText: "All sets" }).click();
    expect(await page.evaluate(() => ({ all: S.setScopeAll, prev: S.setScopePrev })))
      .toEqual({ all: true, prev: ["OGN"] });
    // Leaving all-mode by clicking a set drops to the other one, and that is a
    // fresh choice: no remembered scope left over.
    await page.locator("#setChips .setchip", { hasText: "Origins" }).click();
    expect(await page.evaluate(() => ({
      all: S.setScopeAll, prev: S.setScopePrev, scope: S.setScope,
    }))).toEqual({ all: false, prev: null, scope: ["SFD"] });
  });
});

test.describe("import / export across sets", () => {
  test("a two-set deck round-trips, including while one set is out of scope",
    async ({ page }) => {
      await openApp(page);
      await setZones(page, { main: [[OGN_VAYNE, 2], [SFD_VAYNE, 1]] });
      await page.evaluate(() => { S.deckName = "Two sets"; });

      const download = await Promise.all([
        page.waitForEvent("download"),
        page.evaluate(() => exportDeck()),
      ]).then(([d]) => d);
      const stream = await download.createReadStream();
      let text = "";
      for await (const chunk of stream) text += chunk;
      const json = JSON.parse(text);
      expect(json.zones.main.map(c => c.riftboundId).sort())
        .toEqual([OGN_VAYNE, SFD_VAYNE].sort());

      // Narrow the browser to Origins, then import the file back.
      await allSets(page);
      await page.evaluate(() => toggleSetScope("SFD"));
      await page.evaluate(() => { freshDeck(); render(); });
      await page.setInputFiles("#picker", {
        name: "two-sets.json", mimeType: "application/json", buffer: Buffer.from(text),
      });
      const after = await page.evaluate(() => ({
        name: S.deckName,
        unresolved: S.unresolved.length,
        main: S.zones.main.map(c => [refOf(c), c.qty]).sort(),
        rows: [...document.querySelectorAll("#zoneList .dname")].map(n => n.textContent),
        scope: S.setScope,
      }));
      expect(after.name).toBe("Two sets");
      expect(after.unresolved).toBe(0);
      expect(after.main).toEqual([[OGN_VAYNE, 2], [SFD_VAYNE, 1]].sort());
      // The out-of-scope card is still in the deck and still drawn in the panel.
      expect(after.rows.join(" ")).toContain("Vayne - Hunter (Overnumbered)");
      expect(after.scope).toEqual(["OGN"]);
    });
});

test.describe("per-set collection", () => {
  /* Seed the signed-out map before the app boots — this is exactly the shape a
     pre-stage-8 browser holds, so it doubles as the backwards-compatibility
     test. */
  const seed = async (page, map) => {
    await openApp(page);
    await page.evaluate(m => localStorage.setItem("rb.collection", JSON.stringify(m)), map);
    // A full reload, not a hash change: the map is read once at startup, and
    // navigating "/" -> "/#collection" is same-document, so the script that
    // reads it would never run again.
    await page.reload();
    await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY,
      null, { timeout: 15_000 });
    await page.evaluate(() => { location.hash = "collection"; });
    await expect(page.locator("#collectionView")).toBeVisible();
  };

  test("a pre-stage-8 OGN-only map still loads and reports against Origins",
    async ({ page }) => {
      await seed(page, { "ogn-001-298": 3, "ogn-002-298": 1 });
      const r = await page.evaluate(() => {
        setColSet("OGN");
        return {
          ready: COL_READY,
          keys: Object.keys(COL).length,
          name: document.getElementById("colSetName").textContent,
          cards: document.getElementById("colCards").textContent,
          copies: document.getElementById("colCopies").textContent,
        };
      });
      expect(r.ready).toBe(true);
      expect(r.keys).toBe(2);
      expect(r.name).toBe("Origins");
      expect(r.cards).toBe("2 of 352 cards");
      expect(r.copies).toMatch(/^4\/1056 copies · 1 playset$/);
    });

  test("a mixed-set map reports each set separately and both together",
    async ({ page }) => {
      await seed(page, {
        "ogn-001-298": 3, "ogn-002-298": 1,     // Origins: 2 printings, 4 copies
        "sfd-001-221": 2, "sfd-002-221": 2, "sfd-003-221": 1,  // SFD: 3 printings, 5 copies
      });
      const read = () => page.evaluate(() => ({
        name: document.getElementById("colSetName").textContent,
        meta: document.getElementById("colSetMeta").textContent,
        cards: document.getElementById("colCards").textContent,
        copies: document.getElementById("colCopies").textContent,
        missing: document.getElementById("colMissN").textContent,
        chips: [...document.querySelectorAll("#colSetChips .setchip")]
          .map(b => b.textContent.replace(/\s+/g, " ").trim()),
        count: document.getElementById("colSetCount").textContent,
        tabs: [...document.querySelectorAll("#colTabs .coltab")]
          .map(b => b.textContent.replace(/\s+/g, " ").trim()),
        gridSets: [...new Set([...document.querySelectorAll("#colGrid .ctile")]
          .map(t => t.dataset.ref.split("-")[0]))],
      }));

      const all = await read();
      expect(all.name).toBe("All sets");
      expect(all.cards).toBe("5 of 640 cards");
      expect(all.copies).toMatch(/^9\/1920 copies · 1 playset$/);
      expect(all.chips).toEqual(["All sets 640", "Origins 2/352", "Spiritforged 3/288"]);
      expect(all.count).toBe("640 printings");

      await page.evaluate(() => setColSet("SFD"));
      const sfd = await read();
      expect(sfd.name).toBe("Spiritforged");
      expect(sfd.meta).toBe("288 printings · variants counted separately");
      expect(sfd.cards).toBe("3 of 288 cards");
      expect(sfd.copies).toMatch(/^5\/864 copies · 0 playsets$/);
      expect(sfd.missing).toBe("285");
      expect(sfd.count).toBe("288 printings");
      expect(sfd.gridSets).toEqual(["sfd"]);   // no Origins card leaks in
      // Tabs are computed on this set's slice: 288 all, 285 missing,
      // 3 partial (2+2+1 copies, none at a playset), 0 playsets.
      expect(sfd.tabs).toEqual(["All288", "Missing285", "Partial3", "Playset0"]);

      await page.evaluate(() => setColSet("OGN"));
      const ogn = await read();
      expect(ogn.cards).toBe("2 of 352 cards");
      expect(ogn.tabs).toEqual(["All352", "Missing350", "Partial1", "Playset1"]);
    });

  test("search and the missing tab stay inside the active set", async ({ page }) => {
    await seed(page, {});
    const r = await page.evaluate(() => {
      setColSet("SFD");
      const ph = document.getElementById("colQ").placeholder;
      COLF.q = "001";        // matches a collector number in BOTH sets
      renderCollection();
      const refs = [...document.querySelectorAll("#colGrid .ctile")].map(t => t.dataset.ref);
      return { ph, refs };
    });
    expect(r.ph).toBe("Search Spiritforged by name, number, or artist");
    expect(r.refs.every(ref => ref.startsWith("sfd-"))).toBe(true);
    expect(r.refs.length).toBeGreaterThan(0);
  });

  test("Mark set owned and Clear touch only the active set's refs", async ({ page }) => {
    await seed(page, { "ogn-001-298": 3, "sfd-001-221": 2 });
    // ask() resolves through the modal; answer it by clicking the confirm button.
    const confirmWith = async (label, fn) => {
      const done = page.evaluate(fn);
      await page.locator("#askActs .btn", { hasText: label }).click();
      await done;
    };

    await page.evaluate(() => setColSet("SFD"));
    await confirmWith("Mark set owned", () => colMarkAll());
    let r = await page.evaluate(() => ({
      ogn: Object.keys(COL).filter(k => k.startsWith("ogn-")).length,
      sfd: Object.keys(COL).filter(k => k.startsWith("sfd-")).length,
      ognKept: COL["ogn-001-298"],
      sfdKept: COL["sfd-001-221"],   // an existing qty above 1 is not reduced
    }));
    expect(r.sfd).toBe(288);
    expect(r.ogn).toBe(1);           // Origins untouched
    expect(r.ognKept).toBe(3);
    expect(r.sfdKept).toBe(2);

    await confirmWith("Clear it", () => colClear());
    r = await page.evaluate(() => ({
      ogn: Object.keys(COL).filter(k => k.startsWith("ogn-")).length,
      sfd: Object.keys(COL).filter(k => k.startsWith("sfd-")).length,
      ognKept: COL["ogn-001-298"],
    }));
    expect(r.sfd).toBe(0);           // Spiritforged wiped
    expect(r.ogn).toBe(1);           // Origins still there
    expect(r.ognKept).toBe(3);
  });

  test("the 3-copy cap is unchanged per printing", async ({ page }) => {
    await seed(page, {});
    const r = await page.evaluate(() => {
      setColSet("SFD");
      const ref = "sfd-001-221";
      for (let i = 0; i < 6; i++) colBump(ref, 1);
      const hi = qtyOf(ref);
      const tile = document.querySelector(`#colGrid .ctile[data-ref="${ref}"]`);
      return {
        hi,
        badge: tile?.querySelector(".cown")?.textContent,
        plusDisabled: tile?.querySelectorAll(".step")[1]?.disabled,
      };
    });
    expect(r.hi).toBe(3);
    expect(r.badge).toBe("3/3");
    expect(r.plusDisabled).toBe(true);
  });
});

test.describe("the game switcher", () => {
  test("the registry drives the button and the active row", async ({ page }) => {
    await openApp(page);
    await expect(page.locator("#gameLabel")).toHaveText("Riftbound");
    await expect(page.locator("#ctxLabel")).toHaveText("Deckbuilder");
    await page.click("#gameBtn");
    await expect(page.locator("#gameMenu .gmrow.active .gmname")).toHaveText("Riftbound");
    await expect(page.locator("#gameMenu .gmrow.active .gmsub")).toHaveText("2 sets · 640 cards");
    await expect(page.locator("#gameMenu .gmfoot")).toHaveText("Decks and collection stay per game.");
  });

  test("planned games are inert decoration, not registry entries", async ({ page }) => {
    await openApp(page);
    await page.click("#gameBtn");
    const rows = page.locator("#gameMenu .gmrow.planned");
    // Two now: Pokemon graduated from a planned row to a registry entry in
    // stage 9, which is exactly the move this test exists to notice.
    await expect(rows).toHaveCount(2);
    await expect(rows.first().locator(".gmstate")).toHaveText("Planned");
    await expect(rows.first().locator(".gmsub")).toHaveText("Not yet on Card Haven");
    const r = await page.evaluate(() => ({
      // no buttons, no links, no handlers — nothing to click
      interactive: document.querySelectorAll("#gameMenu .planned a, #gameMenu .planned button").length,
      registryGames: Object.keys(GAMES),
    }));
    expect(r.interactive).toBe(0);
    expect(r.registryGames).toEqual(["riftbound", "pokemon"]);
  });

  test("the collection context relabels the header and the menu", async ({ page }) => {
    await openApp(page, { hash: "#collection" });
    await expect(page.locator("#ctxLabel")).toHaveText("Collection");
    await page.evaluate(() => { colBump("ogn-001-298", 2); colBump("sfd-001-221", 1); });
    await page.click("#gameBtn");
    await expect(page.locator("#gameMenu .gmrow.active .gmsub"))
      .toHaveText("2 sets · 2 printings logged");
    await expect(page.locator("#gameMenu .gmfoot"))
      .toHaveText("Each game keeps its own collection and decks.");
  });
});
