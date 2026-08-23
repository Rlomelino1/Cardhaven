import { mkdir, writeFile, rm, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";
import { stat } from "node:fs/promises";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const ENTRIES = [
  { url: "https://esm.sh/@neondatabase/auth@0.5.0-beta",
    expose: ["createAuthClient"] },
  { url: "https://esm.sh/@neondatabase/auth@0.5.0-beta/vanilla",
    expose: ["BetterAuthVanillaAdapter"] },
  { url: "https://esm.sh/@neondatabase/postgrest-js@0.2.0-beta",
    expose: ["NeonPostgrestClient", "fetchWithToken"] },
];

const ESBUILD = "esbuild@0.25.10";

const BUNDLE_ONLY = process.argv.includes("--bundle-only");

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "vendor", "neon");

const isEsm = u => u.host === "esm.sh";
const graph = new Map();

async function fetchText(href) {
  const res = await fetch(href, { headers: { "User-Agent": UA, "Accept": "*/*" } });
  if (!res.ok) throw new Error(`${res.status} ${href}`);
  return await res.text();
}

const CLAUSE = "[\\w*${}\\s,]*?";
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

function flatName(href) {
  const u = new URL(href);
  let base = (u.pathname + u.search).replace(/^\//, "").replace(/[^A-Za-z0-9._-]/g, "_");
  return /\.(mjs|js)$/.test(base) ? base : base + ".mjs";
}

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

if (!BUNDLE_ONLY) {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
}

let residual = 0;
for (const [href, { code }] of (BUNDLE_ONLY ? [] : graph)) {
  const out = rewrite(code, href, names);
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

const ENTRY_FILE = "_bundle-entry.mjs";
await writeFile(join(OUT, ENTRY_FILE),
  ENTRIES.map(e => `export { ${e.expose.join(", ")} } from "./${names.get(e.url)}";`)
    .join("\n") + "\n", "utf8");

console.log(`\nbundling with ${ESBUILD}...`);
const q = a => `"${a}"`;
execSync([`npx --yes ${ESBUILD}`, q(join(OUT, ENTRY_FILE)), "--bundle",
  "--format=esm", "--target=es2022", q(`--outfile=${join(OUT, "bundle.mjs")}`),
  "--log-level=warning"].join(" "), { stdio: "inherit" });
await rm(join(OUT, ENTRY_FILE), { force: true });

const { size } = await stat(join(OUT, "bundle.mjs"));
console.log(`wrote vendor/neon/bundle.mjs (${(size / 1024).toFixed(0)} KB) <- index.html imports this`);
console.log("the individual modules stay committed as the audit trail; only the bundle loads");