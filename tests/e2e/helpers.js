// Shared setup. The suite is hermetic and network-independent. The Neon SDK is
// vendored under vendor/neon/ and served from our own origin, so nothing here
// reaches a CDN; esm.sh is blocked anyway as a belt-and-suspenders guard against
// a future dependency quietly re-introducing a runtime CDN import. Auth-dependent
// flows are Tier 2 and will be tested with a mocked Neon network, not a live
// account. (The "vendored SDK" test deliberately does NOT block esm.sh — it
// proves nothing tries to reach it.)

export async function openApp(page, { hash = "" } = {}) {
  await page.route(/(^|\/\/)esm\.sh\//, route => route.abort());
  /* Records that the auth module has reported, by wrapping the property the app
     assigns its callback to — installed before any app script runs.

     The wrapper is built in the SETTER, not the getter, so it is bound to the
     function that was assigned. A getter that re-reads the current
     implementation looks equivalent and is not: a test that saves the old
     callback and installs its own (smoke.spec.js does) would hand the saved
     wrapper a moving target and recurse until the stack ran out. */
  await page.addInitScript(() => {
    let wrapped;
    Object.defineProperty(window, "onCloudSession", {
      configurable: true,
      get: () => wrapped,
      set: (fn) => {
        wrapped = typeof fn === "function"
          ? (...a) => { window.__authReported = true; return fn(...a); }
          : fn;
      },
    });
  });
  await page.goto("/" + hash);
  // Pool is fetched from our own origin; wait for it to hydrate the state.
  await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null, {
    timeout: 15_000,
  });
  /* ...then wait for the auth module to have REPORTED, which is a separate
     arrival. The vendored SDK is 132 module files: here it settles long before
     the pool, but on a cold CI runner it can land after, and its signed-out
     callback sets MODE = "local" and calls freshDeck() when it finds the app in
     cloud mode. Every test that forces MODE = "cloud" was racing that. Proven by
     dispatching the callback by hand: a 1-card dirty cloud deck becomes 0 cards,
     clean, local — which is both CI failure shapes for the game-switcher test,
     the deck emptied and the prompt never shown.

     The observable has to be the callback itself. COL_READY looks like one and
     is not: index.html sets it synchronously at boot for the signed-out local
     collection, long before this module exists. So wrap the property the app
     assigns to, before the app loads, and record the call. Once it has fired the
     app's own lastUid guard stops any second dispatch for the same session. */
  await page.waitForFunction(() => window.__authReported === true, null,
    { timeout: 15_000, polling: 50 });
}
