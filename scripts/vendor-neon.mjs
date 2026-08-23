// Vendors the Neon auth + postgrest-js ESM graph from esm.sh into vendor/neon/,
// so the app loads its SDK from its own origin instead of a transforming CDN at
// runtime. This removes a ~140-module floating third-party dependency from the
// load path and makes the code that actually runs reviewable in the repo.
//
// It is NOT a build step the app depends on at runtime — it is a maintenance
// tool. Run it only to (re-)vendor when the pinned SDK versions are bumped:
//
//   node scripts/vendor-neon.mjs
//
// It fetches with a Chrome User-Agent so esm.sh returns the same browser-target
// build the live site gets, walks the transitive import graph, flattens every
// module into vendor/neon/ under a sanitized filename, and rewrites every
// esm.sh specifier to a local ./relative path.
//
// It then BUNDLES that graph into vendor/neon/bundle.mjs, which is the single
// file index.html imports. Measured over HTTP/2, which is what Pages serves: the
// 132-file graph costs 232 KB and the auth module reports at 10.6s on slow 3G;
// the bundle is 135 KB in one request and reports at 7.0s. Cards and first paint
// are unaffected either way - the card pool wins that race regardless.
//
// The individual modules stay committed alongside the bundle. They are the audit
// trail: a version bump diffs file-by-file against what esm.sh served, which one
// generated 670 KB file cannot show. Only bundle.mjs is loaded at runtime - see
// vendor/neon/README.md.
//
// esbuild is fetched by npx at re-vendor time and pinned. It is not a build step
// and not a dependency of the app: the output is a static file committed to the
// repo, and nothing runs esbuild to serve, test or deploy the page. It replaces
// esm.sh's own bundling pass with a pinned local one, so the transformation that
// produces the shipped bytes is now ours.

import { mkdir, writeFile, rm, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";
import { stat } from "node:fs/promises";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

/* Each entry, with the names index.html imports from it. `expose` is what the
   bundle re-exports, and therefore the root of what tree-shaking keeps: naming
   the four the page uses drops jose's whole JWE/JWS surface and every zod locale
   that nothing reaches. It cannot be derived - these entries are
   `export * from` barrels, so the names never appear in them - so it mirrors
   index.html's imports, and index.html fails to boot the moment they drift. */
const ENTRIES = [
  { url: "https://esm.sh/@neondatabase/auth@0.5.0-beta",
    expose: ["createAuthClient"] },
  { url: "https://esm.sh/@neondatabase/auth@0.5.0-beta/vanilla",
    expose: ["BetterAuthVanillaAdapter"] },
  { url: "https://esm.sh/@neondatabase/postgrest-js@0.2.0-beta",
    expose: ["NeonPostgrestClient", "fetchWithToken"] },
];

const ESBUILD = "esbuild@0.25.10";     // pinned; fetched by npx, never installed

/* Re-bundle the committed modules without touching the network:
     node scripts/vendor-neon.mjs --bundle-only
   Worth having on its own. Re-vendoring resolves the graph fresh, so it can pull
   newer transitive builds and land an SDK change in a diff that was meant to be
   about the bundle. This regenerates bundle.mjs from the exact bytes already in
   the repo, which is also how you verify that the committed bundle really is the
   committed modules. */
const BUNDLE_ONLY = process.argv.includes("--bundle-only");

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "vendor", "neon");

const isEsm = u => u.host === "esm.sh";
const graph = new Map();   // href -> { code, url }

async function fetchText(href) {
  const res = await fetch(href, { headers: { "User-Agent": UA, "Accept": "*/*" } });
  if (!res.ok) throw new Error(`${res.status} ${href}`);
  return await res.text();
}

// Import specifiers appear ONLY in real import/export statements — never inside
// regex literals or data strings. Matching "any quoted string starting with /"
// wandered into regex fragments and unrelated packages, so extraction is
// syntax-aware. Patterns are minify-tolerant: esm.sh es2022 builds have no space
// after `import`/`from` (`import{x}from"/s"`). Each captures (prefix, quote,
// spec[, tail]) so rewrite can rebuild by swapping only the spec.
const CLAUSE = "[\\w*${}\\s,]*?"; // import/export binding list; word,*,$,{},space,comma
const RE_STATIC = new RegExp(`(\\bimport\\s*(?:${CLAUSE}\\bfrom\\s*)?)(["'])([^"']+)\\2`, "g");
const RE_EXPORT = new RegExp(`(\\bexport\\s*${CLAUSE}\\bfrom\\s*)(["'])([^"']+)\\2`, "g");
const RE_DYN    = /(\bimport\s*\(\s*)(["'])([^"']+)\2(\s*\))/g;

function rawSpecs(code) {
  const out = [];
  for (const re of [RE_STATIC, RE_EXPORT, RE_DYN]) {
    for (const m of code.matchAll(re)) out.push(m[3]);
  }
  return out;
}

function specifiers(code, base) {
  const found = new Set();
  for (const raw of rawSpecs(code)) {
    let u;
    try { u = new URL(raw, base); } catch { continue; }
    if (isEsm(u)) found.add(u.href);
  }
  return found;
}

async function walk(href) {
  if (graph.has(href)) return;
  let code;
  try { code = await fetchText(href); }
  catch (e) { console.warn("  skip:", e.message); return; }
  graph.set(href, { code, url: new URL(href) });
  for (const dep of specifiers(code, href)) await walk(dep);
}

// One esm.sh URL -> its flat local filename. Deterministic from the URL alone,
// which is what lets --bundle-only find the entry files with no graph in hand.
function flatName(href) {
  const u = new URL(href);
  let base = (u.pathname + u.search).replace(/^\//, "").replace(/[^A-Za-z0-9._-]/g, "_");
  return /\.(mjs|js)$/.test(base) ? base : base + ".mjs";
}

// href -> flat local filename, collision-guarded.
function buildNameMap() {
  const names = new Map(), used = new Set();
  for (const href of graph.keys()) {
    const base = flatName(href);
    let name = base, i = 1;
    while (used.has(name)) name = base.replace(/(\.\w+)$/, `_${i++}$1`);
    used.add(name);
    names.set(href, name);
  }
  return names;
}

function localOf(raw, base, names) {
  let u;
  try { u = new URL(raw, base); } catch { return null; }
  return isEsm(u) && names.has(u.href) ? `./${names.get(u.href)}` : null;
}

function rewrite(code, base, names) {
  const three = (whole, pre, q, raw) => {
    const local = localOf(raw, base, names);
    return local ? `${pre}${q}${local}${q}` : whole;
  };
  code = code.replace(RE_STATIC, three).replace(RE_EXPORT, three);
  code = code.replace(RE_DYN, (whole, pre, q, raw, post) => {
    const local = localOf(raw, base, names);
    return local ? `${pre}${q}${local}${q}${post}` : whole;
  });
  return code;
}

if (!BUNDLE_ONLY) console.log(`walking the graph from ${ENTRIES.length} entries...`);
if (!BUNDLE_ONLY) for (const e of ENTRIES) await walk(e.url);
if (!BUNDLE_ONLY) console.log(`fetched ${graph.size} modules`);

const names = BUNDLE_ONLY
  ? new Map(ENTRIES.map(e => [e.url, flatName(e.url)]))
  : buildNameMap();

// Clean and repopulate vendor/neon/ - skipped when only re-bundling, which must
// leave the committed modules exactly as they are.
if (!BUNDLE_ONLY) {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
}

let residual = 0;
for (const [href, { code }] of (BUNDLE_ONLY ? [] : graph)) {
  const out = rewrite(code, href, names);
  // A true residual is a spec still pointing at esm.sh that is NOT a localized
  // ./relative — the app would fetch that from the CDN at runtime.
  for (const raw of rawSpecs(out)) {
    if (raw.startsWith(".")) continue;
    let u; try { u = new URL(raw, href); } catch { continue; }
    if (isEsm(u)) {
      residual++;
      if (residual <= 8) console.warn("  residual:", raw.slice(0, 90), "in", names.get(href));
    }
  }
  await writeFile(join(OUT, names.get(href)), out, "utf8");
}

const files = (await readdir(OUT)).length;
console.log(BUNDLE_ONLY ? `vendor/neon/ holds ${files} files`
                        : `wrote ${files} files to vendor/neon/`);
if (!BUNDLE_ONLY) console.log(`residual esm.sh references: ${residual}`);
console.log("\nentry local names:");
for (const e of ENTRIES)
  console.log(`  ${e.url.replace("https://esm.sh/", "")}  ->  vendor/neon/${names.get(e.url)}`);

/* ------------------------------- bundle ---------------------------------
   One generated entry that re-exports exactly the names the page imports, so
   everything else in the graph is unreachable and esbuild drops it. Which entry
   owns which name is read out of the vendored code rather than assumed, because
   the three entries overlap and esbuild fails hard on a name an entry does not
   export. */
const ENTRY_FILE = "_bundle-entry.mjs";
await writeFile(join(OUT, ENTRY_FILE),
  ENTRIES.map(e => `export { ${e.expose.join(", ")} } from "./${names.get(e.url)}";`)
    .join("\n") + "\n", "utf8");

console.log(`\nbundling with ${ESBUILD}...`);
/* Through a shell, because npx is npx.cmd on Windows and Node refuses to spawn
   a .cmd without one, and as one command string rather than a shell plus an
   argument array - the latter concatenates without escaping and Node deprecated
   it for that reason. So the quoting is ours: this repo's own path contains a
   space, and both paths below are absolute. */
const q = a => `"${a}"`;
execSync([`npx --yes ${ESBUILD}`, q(join(OUT, ENTRY_FILE)), "--bundle",
  "--format=esm", "--target=es2022", q(`--outfile=${join(OUT, "bundle.mjs")}`),
  "--log-level=warning"].join(" "), { stdio: "inherit" });
await rm(join(OUT, ENTRY_FILE), { force: true });

const { size } = await stat(join(OUT, "bundle.mjs"));
console.log(`wrote vendor/neon/bundle.mjs (${(size / 1024).toFixed(0)} KB) <- index.html imports this`);
console.log("the individual modules stay committed as the audit trail; only the bundle loads");
