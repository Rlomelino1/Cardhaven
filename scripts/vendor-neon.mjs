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
// esm.sh specifier to a local ./relative path. The three entry local names are
// printed at the end — index.html imports those.

import { mkdir, writeFile, rm, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const ENTRIES = [
  "https://esm.sh/@neondatabase/auth@0.5.0-beta",
  "https://esm.sh/@neondatabase/auth@0.5.0-beta/vanilla",
  "https://esm.sh/@neondatabase/postgrest-js@0.2.0-beta",
];

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

// href -> flat local filename, collision-guarded.
function buildNameMap() {
  const names = new Map(), used = new Set();
  for (const href of graph.keys()) {
    const u = new URL(href);
    let base = (u.pathname + u.search).replace(/^\//, "").replace(/[^A-Za-z0-9._-]/g, "_");
    if (!/\.(mjs|js)$/.test(base)) base += ".mjs";
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

console.log(`walking the graph from ${ENTRIES.length} entries...`);
for (const e of ENTRIES) await walk(e);
console.log(`fetched ${graph.size} modules`);

const names = buildNameMap();

// Clean and repopulate vendor/neon/.
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

let residual = 0;
for (const [href, { code }] of graph) {
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
console.log(`wrote ${files} files to vendor/neon/`);
console.log(`residual esm.sh references: ${residual}`);
console.log("\nentry local names (index.html imports these):");
for (const e of ENTRIES) console.log(`  ${e.replace("https://esm.sh/", "")}  ->  vendor/neon/${names.get(e)}`);
