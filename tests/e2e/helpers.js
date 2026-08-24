export const RB_SETS = [
  { code: "OGN", name: "Origins",         n: 352 },
  { code: "SFD", name: "Spiritforged",    n: 288 },
  { code: "UNL", name: "Unleashed",       n: 280 },
  { code: "VEN", name: "Vendetta",        n: 227 },
  { code: "OGS", name: "Proving Grounds", n: 24 },
  { code: "OPP", name: "Organized Play",  n: 117 },
  { code: "PR",  name: "Promos",          n: 13 },
  { code: "JDG", name: "Judge Promos",    n: 3 },
];
export const RB_CODES = RB_SETS.map(s => s.code);
export const RB_POOL = RB_SETS.reduce((n, s) => n + s.n, 0);
export const rbWithout = code => RB_CODES.filter(c => c !== code);
export const rbCardsWithout = code =>
  RB_POOL - RB_SETS.find(s => s.code === code).n;

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

export async function openPokemon(page, { hash = "", collection = null } = {}) {
  await page.addInitScript(([col]) => {
    localStorage.setItem("ch.game", "pokemon");
    if (col) localStorage.setItem("rb.collection", col);
  }, [collection ? JSON.stringify(collection) : null]);
  await openApp(page, { hash });
  await page.waitForFunction(() => PIDX !== null);
}
