#!/usr/bin/env node
/**
 * build-pool.mjs (v2) — fetch one Riftbound set into an import-ready pool file.
 *
 * Requires Node 18+. No dependencies.
 *
 *   node build-pool.mjs                  # Origins from Riftcodex
 *   node build-pool.mjs --set sfd        # Spiritforged
 *   node build-pool.mjs --set unl        # Unleashed
 *   node build-pool.mjs --raw            # dump one page and print the real keys
 *
 * Output: <set>-pool.json
 *
 * Mapping follows the documented Riftcodex schema: attributes / classification
 * / media / set / metadata are nested objects, not top-level fields.
 */
 
const args = process.argv.slice(2);
const flag = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1] ?? true;
};
const has = (n) => args.includes(`--${n}`);
 
const SET = String(flag("set", "ogn")).toLowerCase();
const RAW = has("raw");
const BASE = "https://api.riftcodex.com";
 
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
 
/* Colorless is a real domain and is legal in every deck — keep it. */
const DOMAINS = ["Fury", "Calm", "Mind", "Body", "Chaos", "Order", "Colorless"];
const titleCase = (s) =>
  String(s).charAt(0).toUpperCase() + String(s).slice(1).toLowerCase();
 
const unwrap = (json) => {
  if (Array.isArray(json)) return json;
  for (const k of ["items", "data", "cards", "results"]) {
    if (Array.isArray(json?.[k])) return json[k];
  }
  return [];
};
 
const num = (v) => (v === undefined || v === null ? null : Number(v));
 
const toCard = (c) => {
  const a = c.attributes ?? {};
  const cl = c.classification ?? {};
  const m = c.media ?? {};
  const s = c.set ?? {};
  const md = c.metadata ?? {};
 
  return {
    name: String(c.name ?? "").trim(),
    energy: num(a.energy) ?? 0,
    might: num(a.might),
    power: num(a.power),
    type: String(cl.type ?? "Unit"),
    supertype: cl.supertype ? String(cl.supertype) : null,
    rarity: cl.rarity ? String(cl.rarity) : null,
    domains: (Array.isArray(cl.domain) ? cl.domain : cl.domain ? [cl.domain] : [])
      .map((d) => titleCase(d))
      .filter((d) => DOMAINS.includes(d)),
    set: String(s.set_id ?? SET.toUpperCase()),
    setName: s.label ? String(s.label) : null,
    number: num(c.collector_number),
    riftboundId: c.riftbound_id ? String(c.riftbound_id) : null,
    signature: Boolean(md.signature),
    alternateArt: Boolean(md.alternate_art),
    image: m.image_url ? String(m.image_url) : null,
    artist: m.artist ? String(m.artist) : null,
    text: c.text?.plain ? String(c.text.plain) : null,
  };
};
 
/* -------------------------------- fetch ----------------------------- */
 
const fs = await import("node:fs/promises");
 
const getPage = async (page) => {
  const url = `${BASE}/cards?set_id=${SET}&size=100&page=${page}&sort=collector_number`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${url}`);
  return res.json();
};
 
try {
  const first = await getPage(1);
 
  if (RAW) {
    await fs.writeFile("raw-sample.json", JSON.stringify(first, null, 2));
    const card = unwrap(first)[0];
    console.log("Wrote raw-sample.json");
    console.log("Envelope keys:", Object.keys(first).join(", "));
    if (card) {
      console.log("Card keys:   ", Object.keys(card).join(", "));
      console.log("\nFirst card:\n", JSON.stringify(card, null, 2).slice(0, 1500));
    } else {
      console.log("No cards in the envelope — send me the envelope keys above.");
    }
    process.exit(0);
  }
 
  const raw = [...unwrap(first)];
  process.stderr.write(`page 1 → ${raw.length} cards\n`);
 
  for (let page = 2; page <= 25; page++) {
    await sleep(400); // these are volunteer-run APIs; don't hammer them
    const json = await getPage(page);
    const batch = unwrap(json);
    process.stderr.write(`page ${page} → ${batch.length} cards\n`);
    if (!batch.length) break;
    raw.push(...batch);
    if (batch.length < 100) break;
  }
 
  const cards = raw.map(toCard).filter((c) => c.name);
 
  const seen = new Set();
  const unique = cards.filter((c) => {
    const k = c.riftboundId ?? `${c.name}|${c.number}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
 
  const file = `${SET}-pool.json`;
  await fs.writeFile(file, JSON.stringify(unique, null, 2));
 
  const withImage = unique.filter((c) => c.image).length;
  const withDomain = unique.filter((c) => c.domains.length).length;
  const sigs = unique.filter((c) => c.signature).length;
 
  console.log(`\nWrote ${file}`);
  console.log(`  cards        ${unique.length}`);
  console.log(`  with image   ${withImage}`);
  console.log(`  with domain  ${withDomain}`);
  console.log(`  signature    ${sigs}`);
  console.log(
    `  types        ${[...new Set(unique.map((c) => c.type))].join(", ")}`
  );
  console.log(
    `  domains      ${[...new Set(unique.flatMap((c) => c.domains))].join(", ")}`
  );
  console.log(`\nSample:\n`, JSON.stringify(unique[0], null, 2));
 
  if (!withImage || !withDomain) {
    console.log("\nStill missing fields. Run --raw and send me the key list.");
  }
} catch (err) {
  console.error(`\nFailed: ${err.message}`);
  console.error("Run with --raw to see what the API actually returns.");
  process.exit(1);
}