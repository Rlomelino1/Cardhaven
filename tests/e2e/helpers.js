// Shared setup. The suite is hermetic: it blocks the esm.sh auth/data SDK so the
// tests never depend on an external CDN or the live database. The app is built
// to degrade to local (signed-out) mode when that module fails to load, which is
// exactly the surface these tests cover. Auth-dependent flows are Tier 2 and will
// be tested separately with a mocked Neon network, not against a live account.

export async function openApp(page, { hash = "" } = {}) {
  await page.route(/(^|\/\/)esm\.sh\//, route => route.abort());
  await page.goto("/" + hash);
  // Pool is fetched from our own origin; wait for it to hydrate the state.
  await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null, {
    timeout: 15_000,
  });
}
