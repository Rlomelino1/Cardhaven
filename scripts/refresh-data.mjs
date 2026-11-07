#!/usr/bin/env node

// Re-fetches every card pool for both games and reports what changed. The weekly
// data-refresh workflow runs this and opens a pull request when the data moved;
// running it by hand does the same refresh without the PR.
//
//   node scripts/refresh-data.mjs                     # refresh in place
//   node scripts/refresh-data.mjs --summary out.md    # also write a change summary
//
// Riftbound: every set Riftcodex lists is rebuilt with build-pool-v2.mjs, and every set
// only Riot's official card gallery has (a new release, before Riftcodex catches up)
// with build-pool-riot.mjs. A set code the app has never seen gets a
// GAMES.riftbound.sets entry in index.html (named as its source names it, placed after
// the newest release) and the CSP hashes are redone.
// Pokémon: build-pokemon-pools.mjs --force, which also picks up new sets on its own.
// Then build-set-pages.mjs rewrites /sets/ and sitemap.xml to match.

import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fetchGallery, poolFor } from "./build-pool-riot.mjs";

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
// Two sources. Riot's official card gallery (build-pool-riot.mjs) lists every main set
// the day it comes out; Riftcodex (build-pool-v2.mjs) also has the promo sets but can
// lag weeks behind a release. Each set is built from Riftcodex when Riftcodex has it,
// since that is what the existing pools and saved decks came from, and from Riot's
// gallery otherwise. data/riftbound-riot-sets.json records which sets came from Riot.
//
// Riftcodex sits behind Cloudflare, which has refused GitHub's runners since late
// October 2026. A refusal leaves the Riftcodex sets as they are for this run; Riot's
// sets, including brand-new ones, are still refreshed. The run only fails when Riot's
// gallery can't be read, because then a new set could be missed.

const RIOT_SETS = "data/riftbound-riot-sets.json";
let rbSets = [], added = [], rcError = null, riotError = null;
const rbLines = [];
const rbBefore = new Map();
const countOf = async (code) => (await readJson(`data/${code.toLowerCase()}-pool.json`))?.length ?? null;

let html = await readFile(at("index.html"), "utf8");
const listedOrder = [...html.matchAll(/\{ code:"([A-Z0-9]+)",\s*name:"[^"]*",\s*pool:"\.\/data\//g)].map((m) => m[1]);
const listed = new Set(listedOrder);
if (!listed.size) throw new Error("found no GAMES.riftbound.sets entries in index.html");

let rcSets = [];
try {
  const setsRes = await fetch(`${RIFTCODEX}/sets`, { headers: { accept: "application/json", "user-agent": USER_AGENT } });
  if (!setsRes.ok) throw new Error(`${setsRes.status} ${setsRes.statusText} on ${RIFTCODEX}/sets`);
  rcSets = ((await setsRes.json()).items ?? []).map((s) => ({ code: s.set_id, name: s.name, published: String(s.published_on), source: "Riftcodex" }));
  if (!rcSets.length) throw new Error("Riftcodex listed no sets");
} catch (err) {
  rcSets = [];
  rcError = err.message;
  process.stderr.write(`riftcodex skipped: ${rcError}\n`);
}

let riot = null;
try {
  riot = await fetchGallery();
} catch (err) {
  riotError = err.message;
  process.stderr.write(`riot card gallery skipped: ${riotError}\n`);
}

// Which sets Riot builds: the ones Riftcodex doesn't list, or, when Riftcodex couldn't
// be asked, the ones Riot built last time plus any the site doesn't have yet.
const prevRiot = new Set((await readJson(RIOT_SETS)) ?? []);
const rcCodes = new Set(rcSets.map((s) => s.code));
const riotSets = (riot?.sets ?? [])
  .filter((s) => (rcError ? prevRiot.has(s.code) || !listed.has(s.code) : !rcCodes.has(s.code)))
  .map((s) => ({ code: s.code, name: s.name, source: "Riot's card gallery" }));

for (const s of rcSets) {
  rbBefore.set(s.code, await countOf(s.code));
  process.stderr.write(`riftbound ${s.code} (Riftcodex)\n`);
  try { run("build-pool-v2.mjs", ["--set", s.code.toLowerCase()], at("data/")); }
  catch (err) { rcError ??= err.message; }
}
for (const s of riotSets) {
  rbBefore.set(s.code, await countOf(s.code));
  process.stderr.write(`riftbound ${s.code} (Riot)\n`);
  await writeFile(at(`data/${s.code.toLowerCase()}-pool.json`), JSON.stringify(poolFor(riot.items, s.code), null, 2));
}
if (riot) {
  const stillRiot = riotSets.map((s) => s.code).sort();
  if (JSON.stringify(stillRiot) !== JSON.stringify([...prevRiot].sort()))
    await writeFile(at(RIOT_SETS), JSON.stringify(stillRiot) + "\n");
}
rbSets = [...rcSets, ...riotSets];

// New sets go into GAMES.riftbound.sets right after the newest main set the site lists:
// by Riftcodex release date when Riftcodex knows the set, else after the last listed
// set Riot's gallery carries with 100+ cards (Riot's own order says nothing about dates).
added = rbSets.filter((s) => !listed.has(s.code))
  .sort((a, b) => String(a.published ?? "~").localeCompare(String(b.published ?? "~")));
if (added.length) {
  const bigRiot = new Set((riot?.sets ?? []).filter((s) => s.count >= 100).map((s) => s.code));
  const newestRc = rcSets.filter((s) => listed.has(s.code)).sort((a, b) => b.published.localeCompare(a.published))[0]?.code;
  const anchorCode = newestRc ?? listedOrder.filter((c) => bigRiot.has(c)).at(-1) ?? listedOrder.at(-1);
  const anchor = new RegExp(`^.*\\{ code:"${anchorCode}",.*\\n`, "m");
  const entry = (s) => {
    const code = `code:"${s.code}",`.padEnd(12);
    const name = `name:"${s.name.replace(/"/g, "")}",`.padEnd(23);
    return `      { ${code}${name} pool:"./data/${s.code.toLowerCase()}-pool.json" },\n`;
  };
  html = html.replace(anchor, (line) => line + added.map(entry).join(""));
  await writeFile(at("index.html"), html);
  run("csp-hashes.mjs", ["--write"]);
}

for (const s of rbSets) {
  const before = rbBefore.get(s.code);
  const after = (await countOf(s.code)) ?? 0;
  if (before === null || added.includes(s)) rbLines.push(`- **${s.name}** (${s.code}) is new: ${plural(after, "card")}, from ${s.source}`);
  else if (before !== after) rbLines.push(`- ${s.name} (${s.code}): ${delta(before, after)} cards, now ${after}`);
}
const rbError = riotError
  ? `Riot's card gallery could not be read (${riotError})${rcError ? ` and Riftcodex refused too (${rcError})` : ""}`
  : null;

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

// ---- Set pages and sitemap, rebuilt from the refreshed data ----

process.stderr.write("set pages\n");
run("build-set-pages.mjs", []);

// ---- Image hosts the CSP would block ----

const imgSrc = (/img-src ([^;]*)/.exec(await readFile(at("index.html"), "utf8"))?.[1] ?? "").split(/\s+/);
const hosts = new Set();
const addHost = (u) => { try { if (u) hosts.add(new URL(u).origin); } catch {} };
for (const s of rbSets) for (const c of (await readJson(`data/${s.code.toLowerCase()}-pool.json`)) ?? []) addHost(c.image);
for (const s of pkAfter)
  for (const c of (await readJson(`data/pokemon/${s.id}-pool.json`)) ?? []) { addHost(c.imageSmall); addHost(c.imageLarge); }
const blocked = [...hosts].filter((h) => !imgSrc.includes(h));

// ---- Summary ----

const section = (title, lines) =>
  `### ${title}\n\n${lines.length ? lines.join("\n") : "No new sets or card count changes. Card details may still have been corrected."}\n`;
const notes = added.length
  ? `\nNew Riftbound sets were added to \`GAMES.riftbound.sets\` in index.html under their source's own name, and the CSP hashes were regenerated. Rename them there if the site should call them something shorter.\n`
  : "";
const warning = blocked.length
  ? `\n**Images will not load** for cards hosted on ${blocked.join(", ")}: the CSP's img-src in index.html does not allow ${blocked.length === 1 ? "it" : "them"}. Add ${blocked.length === 1 ? "it" : "them"} there before merging.\n`
  : "";
const rbSection = rbError
  ? `### Riftbound\n\nNot refreshed this time: ${rbError}. Pokémon was still refreshed.\n`
  : section("Riftbound", rbLines) + (rcError
    ? `\nRiftcodex could not be reached (${rcError}), so ${[...listed].filter((c) => !riotSets.some((s) => s.code === c)).join(", ")} were left as they are. New sets still come in from Riot's card gallery.\n`
    : "");
const summary = `${warning}${rbSection}\n${section("Pokémon", pkLines)}${notes}`;

console.log(summary);
if (SUMMARY) await writeFile(SUMMARY, summary);
if (rbError) console.log(`::warning::Riftbound was not refreshed: ${rbError}`);
