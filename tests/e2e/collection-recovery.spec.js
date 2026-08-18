import { test, expect } from "@playwright/test";

// Regression tests for the second face of the 2026-08-17 collection bug.
//
// A settings read that under-reported ("no row") was taken at face value: the
// app showed "Synced · 0 copies logged" at 0%, marked the collection loaded,
// and never retried — so refreshing repeated the same failed read forever and
// only a fresh sign-in recovered it.
//
// Now a no-row read is resolved before it is believed: create the row only if
// it is genuinely missing (ON CONFLICT DO NOTHING, so an existing collection
// can never be overwritten), read again, and treat a still-empty result as a
// failure so the retry path recovers on its own.

async function openWithCloud(page) {
  await page.goto("/#collection");
  await page.waitForFunction(() => typeof window.cloud !== "undefined", null, { timeout: 20000 });
  await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null, { timeout: 20000 });
}

/**
 * Runs the real syncCollection against a scripted sequence of reads.
 * reads: array consumed one per getSettingsRow call.
 */
async function run(page, { reads, local = null, ensureError = null }) {
  return await page.evaluate(async ({ reads, local, ensureError }) => {
    const calls = { reads: 0, ensured: 0, wrote: [] };
    window.cloud.getSettingsRow = async () => reads[Math.min(calls.reads++, reads.length - 1)];
    window.cloud.ensureSettingsRow = async () => {
      calls.ensured++;
      return ensureError ? { data: null, error: ensureError } : { data: null, error: null };
    };
    window.cloud.saveCollection = async (map) => { calls.wrote.push(map); return { data: {}, error: null }; };
    window.localCollectionForMerge = () => local;
    window.clearLocalCollection = () => {};
    const returned = await window.cloud.syncCollection();
    return { returned, calls };
  }, { reads, local, ensureError });
}

const NO_ROW = { data: [], error: null };
const withData = (c) => ({ data: [{ collection: c }], error: null });

test.describe("a no-row read is resolved, never believed outright", () => {
  test("recovers the real collection when the first read under-reported", async ({ page }) => {
    await openWithCloud(page);
    const real = { "ogn-073-298": 1, "ogn-119-298": 2 };
    // First read under-reports; after ensuring the row, the re-read succeeds.
    const { returned, calls } = await run(page, { reads: [NO_ROW, withData(real)] });
    expect(returned.map).toEqual(real);      // the collection comes back
    expect(calls.wrote).toEqual([]);         // and nothing was overwritten
    expect(calls.ensured).toBe(1);
  });

  test("a genuinely new account gets an empty collection, not an error", async ({ page }) => {
    await openWithCloud(page);
    // Row really was missing: ensure creates it, the re-read shows it empty.
    const { returned, calls } = await run(page, { reads: [NO_ROW, withData({})] });
    expect(returned.map).toEqual({});
    expect(returned.error).toBeUndefined();
    expect(calls.wrote).toEqual([]);
  });

  test("a persistently unreadable row reports an error so the retry path runs", async ({ page }) => {
    await openWithCloud(page);
    const { returned, calls } = await run(page, { reads: [NO_ROW, NO_ROW] });
    expect(returned.error).toBeTruthy();
    expect(returned.map).toBeUndefined();
    expect(calls.wrote).toEqual([]);
  });

  test("a failure while creating the row is reported, not swallowed", async ({ page }) => {
    await openWithCloud(page);
    const { returned } = await run(page, { reads: [NO_ROW], ensureError: "permission denied" });
    expect(returned.error).toBe("permission denied");
  });

  test("a healthy read still short-circuits with no extra calls", async ({ page }) => {
    await openWithCloud(page);
    const real = { "ogn-073-298": 3 };
    const { returned, calls } = await run(page, { reads: [withData(real)] });
    expect(returned.map).toEqual(real);
    expect(calls.ensured).toBe(0);   // no needless write on the happy path
    expect(calls.wrote).toEqual([]);
  });
});

test.describe("what the user actually sees", () => {
  test("an unresolvable collection shows the retrying state, never a false Synced", async ({ page }) => {
    await openWithCloud(page);
    const readout = await page.evaluate(() => {
      // null = syncCollection reported an error, which is what a persistently
      // unreadable row now produces.
      window.onCloudSession({ id: "u1", email: "x@y.z", name: "T" }, [], null, null);
      return {
        sync: document.getElementById("syncState").textContent,
        pct: document.getElementById("colPct").textContent,
        ready: COL_READY,
      };
    });
    expect(readout.sync).toMatch(/retrying/i);
    expect(readout.sync).not.toMatch(/^Synced/);
    expect(readout.ready).toBe(false);   // blocks writes until it resolves
    expect(readout.pct).toBe("–");
  });
});
