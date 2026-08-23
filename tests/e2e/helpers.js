export async function openApp(page, { hash = "" } = {}) {
  await page.route(/(^|\/\/)esm\.sh\//, route => route.abort());

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
  await page.waitForFunction(() => typeof POOL_READY !== "undefined" && POOL_READY, null, {
    timeout: 15_000,
  });

  await page.waitForFunction(() => window.__authReported === true, null,
    { timeout: 15_000, polling: 50 });
}