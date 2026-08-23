import { test, expect } from "@playwright/test";

async function openWithCloud(page) {
  await page.goto("/");
  await page.waitForFunction(() => typeof window.cloud !== "undefined", null, { timeout: 20000 });
}

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
      read: { data: [{ collection: { riftbound: { a: 1, b: 2 } } }], error: null },
      local: { riftbound: { b: 3, c: 1 } },
    });
    expect(JSON.parse(wrote)).toEqual({ riftbound: { a: 1, b: 3, c: 1 } });
  });

  test("a merge never shrinks the server copy", async ({ page }) => {
    await openWithCloud(page);
    const { wrote } = await syncWith(page, {
      read: { data: [{ collection: { riftbound: { a: 3 } } }], error: null },
      local: { riftbound: { a: 1 } },
    });
    expect(JSON.parse(wrote)).toEqual({ riftbound: { a: 3 } });
  });

  test("with no row yet, a local map is uploaded", async ({ page }) => {
    await openWithCloud(page);
    const { wrote } = await syncWith(page,
      { read: { data: [], error: null }, local: { riftbound: { a: 2 } } });
    expect(JSON.parse(wrote)).toEqual({ riftbound: { a: 2 } });
  });

  test("a legacy flat server blob lifts, merges, and comes back nested", async ({ page }) => {
    await openWithCloud(page);
    const { wrote, returned } = await syncWith(page, {
      read: { data: [{ collection: { "ogn-001-298": 2, "sfd-224*-221": 1 } }], error: null },
      local: { riftbound: { "ogn-001-298": 3 }, pokemon: { "sv1-1": 4 } },
    });
    expect(JSON.parse(wrote)).toEqual({
      riftbound: { "ogn-001-298": 3, "sfd-224*-221": 1 },
      pokemon: { "sv1-1": 4 },
    });
    expect(returned.map.riftbound["sfd-224*-221"]).toBe(1);
  });

  test("games merge independently — one game cannot overwrite another", async ({ page }) => {
    await openWithCloud(page);
    const { wrote } = await syncWith(page, {
      read: { data: [{ collection: { riftbound: { a: 3 }, pokemon: { "sv1-1": 1 } } }], error: null },
      local: { pokemon: { "sv1-1": 4, "sv1-2": 2 } },
    });
    expect(JSON.parse(wrote)).toEqual({
      riftbound: { a: 3 },
      pokemon: { "sv1-1": 4, "sv1-2": 2 },
    });
  });
});

test.describe("collection sync: no write before the account map has loaded", () => {
  test("colFlush does nothing while COL_READY is false", async ({ page }) => {
    await openWithCloud(page);
    const wrote = await page.evaluate(async () => {
      let calls = 0;
      window.cloud.saveCollection = async () => { calls++; return { data: {}, error: null }; };
      MODE = "cloud"; COL = {}; COL_READY = false; colDirty = true;
      await colFlush();
      return calls;
    });
    expect(wrote).toBe(0);
  });
});