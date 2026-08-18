import { test, expect } from "@playwright/test";

// Regression tests for the 2026-08-17 collection wipe.
//
// A user's collection was silently replaced with {}. Cause: syncCollection()
// treated a settings read that came back empty-but-without-an-error as proof
// that the server had no row, then "created" the row by upserting {} — which
// PostgREST applies as ON CONFLICT DO UPDATE, overwriting the real collection.
// A reload racing Neon's scale-to-zero cold start is enough to trigger it,
// which is why it looked like deploys were causing it.
//
// These drive the REAL shipped window.cloud.syncCollection with the network
// layer stubbed, so they assert the actual behaviour rather than a copy of it.

async function openWithCloud(page) {
  await page.goto("/");
  // window.cloud only exists once the vendored SDK module graph has executed.
  await page.waitForFunction(() => typeof window.cloud !== "undefined", null, { timeout: 20000 });
}

/** Runs syncCollection against a stubbed read, returning what it tried to write. */
async function syncWith(page, { read, local }) {
  return await page.evaluate(async ({ read, local }) => {
    let wrote = "NO WRITE";
    window.cloud.getSettingsRow = async () => read;
    window.cloud.saveCollection = async (map) => { wrote = JSON.stringify(map); return { data: {}, error: null }; };
    window.localCollectionForMerge = () => local;
    window.clearLocalCollection = () => {};
    const returned = await window.cloud.syncCollection();
    return { wrote, returned };
  }, { read, local });
}

test.describe("collection sync: never destroys the server copy", () => {
  // Each of these read shapes previously caused a destructive write of {}.
  const underReportingReads = [
    { label: "an empty array", read: { data: [], error: null } },
    { label: "data: null with no error", read: { data: null, error: null } },
    { label: "data: undefined", read: { data: undefined, error: null } },
  ];

  for (const { label, read } of underReportingReads) {
    test(`a settings read returning ${label} must not write anything`, async ({ page }) => {
      await openWithCloud(page);
      const { wrote } = await syncWith(page, { read, local: null });
      expect(wrote).toBe("NO WRITE");
    });
  }

  test("a real server collection is returned untouched, with no write", async ({ page }) => {
    await openWithCloud(page);
    const server = { "ogn-073-298": 1, "ogn-119-298": 2 };
    const { wrote, returned } = await syncWith(page, {
      read: { data: [{ collection: server }], error: null }, local: null,
    });
    expect(wrote).toBe("NO WRITE");
    expect(returned.map).toEqual(server);
  });
});

test.describe("collection sync: merge-on-signup still works", () => {
  test("a signed-out map merges into the server collection by max", async ({ page }) => {
    await openWithCloud(page);
    const { wrote } = await syncWith(page, {
      read: { data: [{ collection: { a: 1, b: 2 } }], error: null },
      local: { b: 3, c: 1 },
    });
    expect(JSON.parse(wrote)).toEqual({ a: 1, b: 3, c: 1 });
  });

  test("a merge never shrinks the server copy", async ({ page }) => {
    await openWithCloud(page);
    const { wrote } = await syncWith(page, {
      read: { data: [{ collection: { a: 3 } }], error: null },
      local: { a: 1 },
    });
    expect(JSON.parse(wrote)).toEqual({ a: 3 });
  });

  test("with no row yet, a local map is uploaded", async ({ page }) => {
    await openWithCloud(page);
    const { wrote } = await syncWith(page, { read: { data: [], error: null }, local: { a: 2 } });
    expect(JSON.parse(wrote)).toEqual({ a: 2 });
  });
});

test.describe("collection sync: no write before the account map has loaded", () => {
  test("colFlush does nothing while COL_READY is false", async ({ page }) => {
    await openWithCloud(page);
    const wrote = await page.evaluate(async () => {
      let calls = 0;
      window.cloud.saveCollection = async () => { calls++; return { data: {}, error: null }; };
      // Simulate a signed-in page whose collection read has not landed yet:
      // COL still holds the empty placeholder this page loaded with.
      MODE = "cloud"; COL = {}; COL_READY = false; colDirty = true;
      await colFlush();
      return calls;
    });
    expect(wrote).toBe(0);
  });
});
