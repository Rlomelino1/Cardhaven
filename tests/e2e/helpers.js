// Shared setup. The suite is hermetic and network-independent. The Neon SDK is
// vendored under vendor/neon/ and served from our own origin, so nothing here
// reaches a CDN; esm.sh is blocked anyway as a belt-and-suspenders guard against
// a future dependency quietly re-introducing a runtime CDN import. Auth-dependent
// flows are Tier 2 and will be tested with a mocked Neon network, not a live
// account. (The "vendored SDK" test deliberately does NOT block esm.sh — it
// proves nothing tries to reach it.)

export async function openApp(page, { hash = "" } = {}) {
  await page.route(/(^|\/\/)esm\.sh\//, route => route.abort());
  await page.goto("/" + hash);
  // Pool is fetched from our own origin; wait for it to hydrate the state.
  await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null, {
    timeout: 15_000,
  });
}
