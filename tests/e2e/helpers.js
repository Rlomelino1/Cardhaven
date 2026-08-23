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
  /* ...and wait for the auth module to have reported, which is a SEPARATE
     arrival. The vendored SDK is 132 module files: here it settles long before
     the pool, but on a cold CI runner it lands after, and its signed-out
     callback runs `MODE = "local"` plus `freshDeck()` when it finds the app in
     cloud mode. Any test that forces `MODE = "cloud"` was therefore racing it —
     the deck it had just built got wiped, or `isDirty()` went false so the
     unsaved-changes prompt never appeared. Both shapes turned up on CI and
     neither reproduces here. COL_READY is the observable: it starts false and
     only onCloudSession sets it. */
  await page.waitForFunction(() => COL_READY === true, null,
    { timeout: 15_000, polling: 50 });
}
