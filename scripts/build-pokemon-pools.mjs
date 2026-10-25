#!/usr/bin/env node

import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";

const args = process.argv.slice(2);
const flag = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1] ?? true;
};
const has = (n) => args.includes(`--${n}`);

const ONE_SET = flag("set", null);
const RAW = has("raw");
const FORCE = has("force");
const INDEX_ONLY = has("index");

const RAW_BASE = "https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master";
const OUT = new URL("../data/pokemon/", import.meta.url);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const outFile = (name) => new URL(name, OUT);

const getJson = async (url) => {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${url}`);
  return res.json();
};

const str = (v) => (v === undefined || v === null ? null : String(v));

// Card images. The upstream data points most cards at images.pokemontcg.io, which only
// serves full PNGs (160-195 KB for a thumbnail). Scrydex serves the same cards as
// ~20 KB AVIF/WebP, so every card it has goes there instead. Scrydex answers a card it
// doesn't have with a stand-in image and a 200, so each card is checked against the
// stand-in's ETag, and the result is kept per set in scrydex-check.json so the weekly
// refresh only checks sets that are new or changed size.
const SCRYDEX = "https://images.scrydex.com/pokemon";
const CHECK_FILE = "scrydex-check.json";
const onPtcg = (c) => String(c.imageSmall ?? "").startsWith("https://images.pokemontcg.io/");
const scrydexUrl = (id, size) => `${SCRYDEX}/${encodeURIComponent(id)}/${size}`;

// The ETag of a HEAD request, null when the image is plainly absent, undefined when
// Scrydex couldn't be reached (the set is then left as it is and checked next run).
const headTag = async (url) => {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { method: "HEAD", headers: { accept: "image/avif,image/webp" } });
      if (res.ok) return (res.headers.get("etag") || "").replace(/^W\//, "") || null;
      if (res.status < 500) return null;
    } catch {}
    await sleep(500 * (i + 1));
  }
  return undefined;
};

const eachLimit = async (items, n, fn) => {
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (next < items.length) await fn(items[next++]);
  }));
};

// Two made-up ids must come back as the same stand-in, or the check can't be trusted.
async function scrydexStandIn() {
  const tags = await Promise.all(["cardhaven-none-1", "cardhaven-none-2"].flatMap((id) =>
    ["small", "large"].map((size) => headTag(scrydexUrl(id, size)))));
  const [s1, l1, s2, l2] = tags;
  if (!s1 || !l1 || s1 !== s2 || l1 !== l2) return null;
  return { small: s1, large: l1 };
}

async function scrydexMissing(cards, standIn) {
  const missing = [];
  let unreachable = false;
  await eachLimit(cards.filter(onPtcg), 16, async (c) => {
    const [s, l] = await Promise.all(["small", "large"].map((size) => headTag(scrydexUrl(c.id, size))));
    if (s === undefined || l === undefined) unreachable = true;
    else if (!s || !l || s === standIn.small || l === standIn.large) missing.push(c.id);
  });
  return unreachable ? null : missing.sort();
}

// Points every card Scrydex has at Scrydex. Returns true when a card changed.
async function preferScrydex(setId, cards, check, standIn) {
  let entry = check.sets[setId];
  if (!entry || entry.cards !== cards.length) {
    if (!standIn || !cards.some(onPtcg)) return false;
    const missing = await scrydexMissing(cards, standIn);
    if (!missing) {
      process.stderr.write(`    ${setId}: Scrydex unreachable, images left as they are\n`);
      return false;
    }
    entry = check.sets[setId] = { cards: cards.length, missing };
  }
  const gone = new Set(entry.missing);
  let changed = false;
  for (const c of cards) {
    if (!onPtcg(c) || gone.has(c.id)) continue;
    c.imageSmall = scrydexUrl(c.id, "small");
    c.imageLarge = scrydexUrl(c.id, "large");
    changed = true;
  }
  return changed;
}

const toCard = (c) => {
  const out = { id: String(c.id), name: String(c.name ?? "").trim() };
  const put = (k, v) => { if (v !== null && v !== undefined && v !== "") out[k] = v; };

  put("supertype", str(c.supertype));
  if (Array.isArray(c.subtypes) && c.subtypes.length) out.subtypes = c.subtypes.map(String);
  put("hp", str(c.hp));
  if (Array.isArray(c.types) && c.types.length) out.types = c.types.map(String);
  put("rarity", str(c.rarity));
  put("number", str(c.number));
  put("artist", str(c.artist));
  put("regulationMark", str(c.regulationMark));
  if (c.legalities && typeof c.legalities === "object" && Object.keys(c.legalities).length)
    out.legalities = c.legalities;
  put("evolvesFrom", str(c.evolvesFrom));
  if (Array.isArray(c.attacks)) {
    const costs = new Set();
    for (const a of c.attacks)
      if (Array.isArray(a.cost))
        for (const t of a.cost) if (t && t !== "Free") costs.add(String(t));
    if (costs.size) out.costs = [...costs];
  }
  put("imageSmall", str(c.images?.small));
  put("imageLarge", str(c.images?.large));
  return out;
};

const isBasicEnergy = (c) =>
  c.supertype === "Energy" && Array.isArray(c.subtypes) && c.subtypes.includes("Basic");

const toSet = (s) => ({
  id: String(s.id),
  name: String(s.name),
  series: String(s.series ?? "Other"),
  ptcgoCode: str(s.ptcgoCode),
  releaseDate: String(s.releaseDate ?? ""),
  total: Number(s.total ?? s.printedTotal ?? 0),
  symbolUrl: str(s.images?.symbol),
  logoUrl: str(s.images?.logo),
});

const byNewest = (a, b) =>
  String(b.releaseDate).localeCompare(String(a.releaseDate)) || a.id.localeCompare(b.id);

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1048576).toFixed(2)} MB`;

const readPool = async (setId) => {
  try { return JSON.parse(await readFile(outFile(`${setId}-pool.json`), "utf8")); }
  catch { return null; }
};

async function main() {
  await mkdir(OUT, { recursive: true });

  const manifestRaw = await getJson(`${RAW_BASE}/sets/en.json`);
  if (!Array.isArray(manifestRaw) || !manifestRaw.length)
    throw new Error("the set manifest came back empty");

  if (RAW) {
    const one = ONE_SET || manifestRaw[manifestRaw.length - 1].id;
    const cards = await getJson(`${RAW_BASE}/cards/en/${one}.json`);
    console.log(`Raw set record (${one}):\n`, JSON.stringify(
      manifestRaw.find((s) => s.id === one), null, 2));
    console.log(`\nSet keys:  ${Object.keys(manifestRaw[0]).join(", ")}`);
    console.log(`Card keys: ${Object.keys(cards[0] ?? {}).join(", ")}`);
    console.log(`\nRaw card record:\n`, JSON.stringify(cards[0], null, 2));
    console.log(`\nSlim card record:\n`, JSON.stringify(toCard(cards[0]), null, 2));
    return;
  }

  const sets = manifestRaw.map(toSet).sort(byNewest);
  const wanted = ONE_SET ? sets.filter((s) => s.id === ONE_SET) : sets;
  if (ONE_SET && !wanted.length) throw new Error(`no English set with id "${ONE_SET}"`);

  const onDisk = new Set((await readdir(OUT).catch(() => []))
    .filter((f) => f.endsWith("-pool.json"))
    .map((f) => f.replace(/-pool\.json$/, "")));

  let check = { sets: {} };
  try { check = JSON.parse(await readFile(outFile(CHECK_FILE), "utf8")); } catch {}
  const standIn = await scrydexStandIn();
  if (!standIn) process.stderr.write("Scrydex stand-in check failed; card images left as they are\n");

  let fetched = 0, skipped = 0, bytes = 0, cardCount = 0;
  const index = [];
  const counts = new Map();

  for (const set of wanted) {
    let cards = null;

    if (!INDEX_ONLY && (FORCE || ONE_SET || !onDisk.has(set.id))) {
      if (fetched) await sleep(250);
      const raw = await getJson(`${RAW_BASE}/cards/en/${set.id}.json`);
      if (!Array.isArray(raw) || !raw.length) throw new Error(`${set.id}: no cards`);
      cards = raw.map(toCard).filter((c) => c.name);
      await preferScrydex(set.id, cards, check, standIn);
      const body = JSON.stringify(cards);
      await writeFile(outFile(`${set.id}-pool.json`), body);
      fetched++;
      process.stderr.write(
        `${String(fetched).padStart(3)} ${set.id.padEnd(16)} ${String(cards.length).padStart(4)} cards  ${kb(body.length)}\n`);
    } else {
      cards = await readPool(set.id);
      if (!cards) {
        throw new Error(`${set.id}: no pool file on disk — run without --index first`);
      }
      if (await preferScrydex(set.id, cards, check, standIn))
        await writeFile(outFile(`${set.id}-pool.json`), JSON.stringify(cards));
      skipped++;
    }

    bytes += JSON.stringify(cards).length;
    cardCount += cards.length;
    counts.set(set.id, cards.length);
    for (const c of cards) {
      const e = { id: c.id, n: c.name, s: set.id, num: c.number ?? "", img: c.imageSmall ?? "" };
      if (isBasicEnergy(c)) e.b = 1;
      index.push(e);
    }
  }

  if (ONE_SET) {
    for (const set of sets) {
      if (set.id === ONE_SET) continue;
      const cards = await readPool(set.id);
      if (!cards) continue;
      counts.set(set.id, cards.length);
      for (const c of cards) {
        const e = { id: c.id, n: c.name, s: set.id, num: c.number ?? "", img: c.imageSmall ?? "" };
        if (isBasicEnergy(c)) e.b = 1;
        index.push(e);
      }
    }
  }

  const manifest = sets
    .filter((s) => counts.has(s.id))
    .map((s) => ({ ...s, cards: counts.get(s.id) }));

  const manifestBody = JSON.stringify(manifest, null, 2);
  const indexBody = JSON.stringify(index);
  await writeFile(outFile("sets.json"), manifestBody);
  await writeFile(outFile("search-index.json"), indexBody);
  const kept = Object.fromEntries(Object.entries(check.sets)
    .filter(([id]) => counts.has(id)).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(outFile(CHECK_FILE), JSON.stringify({ sets: kept }, null, 1) + "\n");

  const hosts = new Map();
  for (const e of index) {
    if (!e.img) continue;
    const h = new URL(e.img).host;
    hosts.set(h, (hosts.get(h) || 0) + 1);
  }

  console.log(`\ndata/pokemon/`);
  console.log(`  sets            ${manifest.length}  (${fetched} fetched, ${skipped} already on disk)`);
  console.log(`  cards           ${index.length}`);
  console.log(`  pool files      ${mb(bytes)}`);
  console.log(`  sets.json       ${kb(manifestBody.length)}`);
  console.log(`  search-index    ${mb(indexBody.length)}`);
  console.log(`  total on disk   ${mb(bytes + manifestBody.length + indexBody.length)}`);
  console.log(`  basic energy    ${index.filter((e) => e.b).length} cards flagged exempt`);
  console.log(`  image hosts     ${[...hosts].map(([h, n]) => `${h} (${n})`).join(", ")}`);
  console.log(`  no image        ${index.filter((e) => !e.img).length}`);
  const series = [...new Set(manifest.map((s) => s.series))];
  console.log(`  series          ${series.length}: ${series.join(", ")}`);
}

main().catch((err) => {
  console.error(`\nFailed: ${err.message}`);
  console.error("Re-running is safe — sets already written are skipped.");
  process.exit(1);
});