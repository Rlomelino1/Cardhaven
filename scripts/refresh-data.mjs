#!/usr/bin/env node

// Re-fetches every card pool for both games and reports what changed. The weekly
// data-refresh workflow runs this and opens a pull request when the data moved;
// running it by hand does the same refresh without the PR.
//
//   node scripts/refresh-data.mjs                     # refresh in place
//   node scripts/refresh-data.mjs --summary out.md    # also write a change summary
//
// Riftbound: every set Riftcodex lists is rebuilt with build-pool-v2.mjs. A set code
// the app has never seen gets a GAMES.riftbound.sets entry in index.html (named as
// Riftcodex names it, placed after the newest release) and the CSP hashes are redone.
// Pokémon: build-pokemon-pools.mjs --force, which also picks up new sets on its own.

import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const SUMMARY = args.includes("--summary") ? args[args.indexOf("--summary") + 1] : null;

const ROOT = new URL("../", import.meta.url);
const at = (p) => new URL(p, ROOT);
const RIFTCODEX = "https://api.riftcodex.com";
const USER_AGENT = "CardHaven-data-refresh (+https://cardhavenapp.com)";

const run = (script, scriptArgs, cwd = ROOT) => {
  const r = spawnSync(process.execPath, [new URL(script, at("scripts/")).pathname, ...scriptArgs],
    { cwd, stdio: ["ignore", "ignore", "inherit"] });
  if (r.status !== 0) throw new Error(`${script} ${scriptArgs.join(" ")} exited with ${r.status}`);
};

const readJson = async (p) => {
  try { return JSON.parse(await readFile(at(p), "utf8")); }
  catch { return null; }
};

const plural = (n, one, many = `${one}s`) => `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`;
const delta = (before, after) => (after > before ? `+${after - before}` : `${after - before}`);

// ---- Riftbound ----
// Riftcodex sits behind Cloudflare, which can refuse requests from CI runners. A refusal
// skips Riftbound for this run rather than holding back the Pokémon refresh, and the
// summary says so.

let rbSets = [], added = [], rbError = null;
const rbLines = [];
try {
  const setsRes = await fetch(`${RIFTCODEX}/sets`, { headers: { accept: "application/json", "user-agent": USER_AGENT } });
  if (!setsRes.ok) throw new Error(`${setsRes.status} ${setsRes.statusText} on ${RIFTCODEX}/sets`);
  rbSets = (await setsRes.json()).items ?? [];
  if (!rbSets.length) throw new Error("Riftcodex listed no sets");

  let html = await readFile(at("index.html"), "utf8");
  const listed = new Set([...html.matchAll(/\{ code:"([A-Z0-9]+)",\s*name:"[^"]*",\s*pool:"\.\/data\//g)]
    .map((m) => m[1]));
  if (!listed.size) throw new Error("found no GAMES.riftbound.sets entries in index.html");

  const rbBefore = new Map();
  for (const s of rbSets) {
    const code = s.set_id.toLowerCase();
    rbBefore.set(s.set_id, (await readJson(`data/${code}-pool.json`))?.length ?? null);
    process.stderr.write(`riftbound ${s.set_id}\n`);
    run("build-pool-v2.mjs", ["--set", code], at("data/"));
  }

  added = rbSets.filter((s) => !listed.has(s.set_id))
    .sort((a, b) => String(a.published_on).localeCompare(String(b.published_on)));
  if (added.length) {
    const newestListed = rbSets.filter((s) => listed.has(s.set_id))
      .sort((a, b) => String(b.published_on).localeCompare(String(a.published_on)))[0];
    const anchor = new RegExp(`^.*\\{ code:"${newestListed.set_id}",.*\\n`, "m");
    const entry = (s) => {
      const code = `code:"${s.set_id}",`.padEnd(12);
      const name = `name:"${s.name.replace(/"/g, "")}",`.padEnd(23);
      return `      { ${code}${name} pool:"./data/${s.set_id.toLowerCase()}-pool.json" },\n`;
    };
    html = html.replace(anchor, (line) => line + added.map(entry).join(""));
    await writeFile(at("index.html"), html);
    run("csp-hashes.mjs", ["--write"]);
  }

  for (const s of rbSets) {
    const before = rbBefore.get(s.set_id);
    const after = (await readJson(`data/${s.set_id.toLowerCase()}-pool.json`))?.length ?? 0;
    if (before === null || added.includes(s)) rbLines.push(`- **${s.name}** (${s.set_id}) is new: ${plural(after, "card")}`);
    else if (before !== after) rbLines.push(`- ${s.name} (${s.set_id}): ${delta(before, after)} cards, now ${after}`);
  }
} catch (err) {
  rbError = err.message;
  process.stderr.write(`riftbound skipped: ${rbError}\n`);
}

// ---- Pokémon ----

const pkBefore = new Map(((await readJson("data/pokemon/sets.json")) ?? []).map((s) => [s.id, s.cards]));
process.stderr.write("pokemon (every set)\n");
run("build-pokemon-pools.mjs", ["--force"]);
const pkAfter = (await readJson("data/pokemon/sets.json")) ?? [];

const pkLines = [];
for (const s of pkAfter) {
  const before = pkBefore.get(s.id);
  if (before === undefined) pkLines.push(`- **${s.name}** (${s.id}) is new: ${plural(s.cards, "card")}`);
  else if (before !== s.cards) pkLines.push(`- ${s.name} (${s.id}): ${delta(before, s.cards)} cards, now ${s.cards}`);
}
const gone = [...pkBefore.keys()].filter((id) => !pkAfter.some((s) => s.id === id));
for (const id of gone) pkLines.push(`- ${id} is no longer in the source; its pool file was left in place`);

// ---- Image hosts the CSP would block ----

const imgSrc = (/img-src ([^;]*)/.exec(await readFile(at("index.html"), "utf8"))?.[1] ?? "").split(/\s+/);
const hosts = new Set();
const addHost = (u) => { try { if (u) hosts.add(new URL(u).origin); } catch {} };
for (const s of rbSets) for (const c of (await readJson(`data/${s.set_id.toLowerCase()}-pool.json`)) ?? []) addHost(c.image);
for (const s of pkAfter)
  for (const c of (await readJson(`data/pokemon/${s.id}-pool.json`)) ?? []) { addHost(c.imageSmall); addHost(c.imageLarge); }
const blocked = [...hosts].filter((h) => !imgSrc.includes(h));

// ---- Summary ----

const section = (title, lines) =>
  `### ${title}\n\n${lines.length ? lines.join("\n") : "No new sets or card count changes. Card details may still have been corrected."}\n`;
const notes = added.length
  ? `\nNew Riftbound sets were added to \`GAMES.riftbound.sets\` in index.html under Riftcodex's own name, and the CSP hashes were regenerated. Rename them there if the site should call them something shorter.\n`
  : "";
const warning = blocked.length
  ? `\n**Images will not load** for cards hosted on ${blocked.join(", ")}: the CSP's img-src in index.html does not allow ${blocked.length === 1 ? "it" : "them"}. Add ${blocked.length === 1 ? "it" : "them"} there before merging.\n`
  : "";
const rbSection = rbError
  ? `### Riftbound\n\nNot refreshed this time: ${rbError}. Pokémon was still refreshed.\n`
  : section("Riftbound", rbLines);
const summary = `${warning}${rbSection}\n${section("Pokémon", pkLines)}${notes}`;

console.log(summary);
if (SUMMARY) await writeFile(SUMMARY, summary);
if (rbError) console.log(`::warning::Riftbound was not refreshed: ${rbError}`);
