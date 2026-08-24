#!/usr/bin/env node
 
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
 
  const total = Number(first?.total ?? 0);
  const pages = Number(first?.pages ?? 1);
 
  for (let page = 2; page <= pages; page++) {
    await sleep(400);
    const json = await getPage(page);
    const batch = unwrap(json);
    process.stderr.write(`page ${page} → ${batch.length} cards\n`);
    if (!batch.length) break;
    raw.push(...batch);
  }
 
  if (total && raw.length !== total) {
    throw new Error(
      `fetched ${raw.length} rows but the API reports ${total} for ${SET}`
    );
  }
 
  const stamp = (c) => Date.parse(c?.metadata?.updated_on ?? "") || 0;
  const filled = (c) =>
    (c?.metadata?.clean_name ? 1 : 0) + (c?.tcgplayer_id ? 1 : 0);
  const supersedes = (cur, next) =>
    stamp(next) !== stamp(cur)
      ? stamp(next) > stamp(cur)
      : filled(next) > filled(cur);
 
  const byKey = new Map();
  for (const c of raw) {
    const k = c.riftbound_id ?? `${c.name}|${c.collector_number}`;
    const cur = byKey.get(k);
    if (!cur || supersedes(cur, c)) byKey.set(k, c);
  }
 
  const superseded = raw.length - byKey.size;
  const unique = [...byKey.values()].map(toCard).filter((c) => c.name);
 
  const file = `${SET}-pool.json`;
  await fs.writeFile(file, JSON.stringify(unique, null, 2));
 
  const withImage = unique.filter((c) => c.image).length;
  const withDomain = unique.filter((c) => c.domains.length).length;
  const sigs = unique.filter((c) => c.signature).length;
 
  console.log(`\nWrote ${file}`);
  console.log(`  cards        ${unique.length}`);
  console.log(`  rows         ${raw.length} (${superseded} superseded)`);
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