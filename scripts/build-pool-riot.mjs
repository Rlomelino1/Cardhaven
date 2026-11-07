#!/usr/bin/env node

// Builds Riftbound card pools from Riot's official card gallery
// (riftbound.leagueoflegends.com/en-us/card-gallery). The page ships every card of every
// main set in its Next.js data, so one request covers them all. Riftcodex stays the
// source for the promo sets, which the gallery leaves out.
//
//   node scripts/build-pool-riot.mjs --list           # the gallery's sets, as JSON on stdout
//   node scripts/build-pool-riot.mjs --set rad        # write data/rad-pool.json
//
// refresh-data.mjs runs both for any set Riftcodex doesn't have.
//
// Cards are written in the same shape build-pool-v2.mjs writes, with the same
// riftboundId format, so decks and collections keep pointing at the same cards whichever
// source built a set.

import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const flag = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1] ?? true;
};
const has = (n) => args.includes(`--${n}`);

const GALLERY = "https://riftbound.leagueoflegends.com/en-us/card-gallery/";
const USER_AGENT = "CardHaven-data-refresh (+https://cardhavenapp.com)";
const DOMAINS = ["Fury", "Calm", "Mind", "Body", "Chaos", "Order", "Colorless"];

// Tags out, entities kept: Riftcodex's plain text keeps &quot; and &gt; as written, and the
// app escapes card text the same way for both sources.
const plain = (html) => (html ? String(html).replace(/<br\s*\/?>/g, "").replace(/<[^>]+>/g, "").trim() : null);

const num = (v) => (v === undefined || v === null || v === "" ? null : Number(v));

// Riot writes signature/showcase overnumbers as "ogn-299-star-298"; Riftcodex, and so
// every saved deck, writes "ogn-299*-298".
const riftboundIdOf = (id) => String(id).replace(/-star-/, "*-");

// Riftcodex names a card the way the app expects, and the app's copy limit counts by that
// name with any "(…)" suffix dropped, so Riot's split name/subtitle/tags are put back
// together the same way: "Jinx - Demolitionist" for a champion unit, "Yordle, Kennen - Heart of
// the Tempest" for a legend, plus "(Alternate Art)", "(Signature)" or "(Overnumbered)".
const nameOf = (c, id, type, setSize) => {
  let name = String(c.name ?? "").trim();
  const tags = c.tags?.tags ?? [];
  if (type === "Legend" && tags.length) name = `${tags.join(", ")} - ${name}`;
  else if (type === "Unit" && c.subtitle) name = `${name} - ${String(c.subtitle).trim()}`;
  const [, numPart = ""] = id.split("-");
  if (/a$/.test(numPart)) name += " (Alternate Art)";
  else if (numPart.endsWith("*")) name += " (Signature)";
  else if (setSize && Number.parseInt(numPart, 10) > setSize) name += " (Overnumbered)";
  return name;
};

const toCard = (c) => {
  const id = riftboundIdOf(c.id);
  // A few cards come without a card type; the image's alt text still starts "Riftbound Unit: …".
  const type = c.cardType?.type?.[0]?.label
    ?? /^Riftbound (Unit|Spell|Gear|Legend|Battlefield|Rune):/.exec(c.cardImage?.accessibilityText ?? "")?.[1]
    ?? "Unit";
  const supertype = c.cardType?.superType?.[0]?.label ?? null;
  const setSize = Number(id.split("-")[2]) || null;
  const text = plain(c.text?.richText?.body);
  return {
    name: nameOf(c, id, type, setSize),
    energy: num(c.energy?.value?.id) ?? 0,
    might: num(c.might?.value?.id),
    power: num(c.power?.value?.id),
    type,
    supertype,
    rarity: c.rarity?.value?.label ?? null,
    domains: (c.domain?.values ?? []).map((d) => d.label).filter((d) => DOMAINS.includes(d)),
    set: c.set?.value?.id ?? null,
    setName: c.set?.value?.label ?? null,
    number: num(c.collectorNumber),
    riftboundId: id,
    signature: id.includes("*"),
    alternateArt: /a$/.test(id.split("-")[1] ?? ""),
    image: c.cardImage?.url ?? null,
    artist: (c.illustrator?.values ?? []).map((v) => v.label).join(", ") || null,
    text: text || null,
  };
};

async function fetchGallery() {
  const res = await fetch(GALLERY, { headers: { accept: "text/html", "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${GALLERY}`);
  const html = await res.text();
  const m = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  if (!m) throw new Error("the card gallery page has no __NEXT_DATA__ block");
  const blades = JSON.parse(m[1])?.props?.pageProps?.page?.blades ?? [];
  const items = blades.flatMap((b) => b?.cards?.items ?? []);
  if (!items.length) throw new Error("found no cards in the card gallery data");
  // Sets in gallery order with their names and release order (first seen = newest).
  const sets = new Map();
  for (const c of items) {
    const s = c.set?.value;
    if (s?.id && !sets.has(s.id)) sets.set(s.id, { code: s.id, name: s.label, count: 0 });
    if (s?.id) sets.get(s.id).count++;
  }
  return { items, sets: [...sets.values()] };
}

const poolFor = (items, code) => {
  const byId = new Map();
  for (const c of items) if (c.set?.value?.id === code) byId.set(c.id, c);
  return [...byId.values()].map(toCard).filter((c) => c.name)
    .sort((a, b) => (a.number ?? 0) - (b.number ?? 0) || a.riftboundId.localeCompare(b.riftboundId));
};

try {
  const { items, sets } = await fetchGallery();
  if (has("list")) {
    console.log(JSON.stringify(sets));
  } else {
    const code = String(flag("set", "")).toUpperCase();
    if (!code) throw new Error("pass --set <code> or --list");
    const pool = poolFor(items, code);
    if (!pool.length) throw new Error(`the card gallery has no cards for ${code}`);
    const file = new URL(`../data/${code.toLowerCase()}-pool.json`, import.meta.url);
    await writeFile(file, JSON.stringify(pool, null, 2));
    process.stderr.write(`Wrote data/${code.toLowerCase()}-pool.json: ${pool.length} cards\n`);
  }
} catch (err) {
  console.error(`Failed: ${err.message}`);
  process.exit(1);
}
