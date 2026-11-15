#!/usr/bin/env node

// Writes the card lists for Kayou's My Little Pony cards (小马宝莉 友谊永恒卡), the
// collect-only game in Card Haven.
//
//   node scripts/build-mlp-pools.mjs
//
// Card lists live in scripts/mlp-sets.json, one entry per set: its code, name, a note on
// where the names and pictures came from, and the cards of each rarity in print order.
// Most sets come from Kayou's US site, which shows every card of its English "Moon
// Edition" series with a name and an official picture; those series reprint the Chinese
// waves (see each set's note). Cards missing there were filled from mylittlewiki.org and
// public eBay listings. Pictures are saved in img/mlp/<set>/ as WebP at two sizes:
// <id>.webp (450px short side, for the card view) and <id>.sm.webp (240px, for tiles).
// There is no automatic refresh for this game.
//
// Every card gets an id in Kayou's Chinese print format (HY12-SSR-001 → hy12-ssr-001), so
// collections keep pointing at the same card when names or pictures change. ◇ZR is
// written "dzr" in ids and file names.

import { mkdir, writeFile, access, readFile } from "node:fs/promises";

// From most common to rarest, in the order the app lists them.
export const MLP_RARITIES = ["R", "SR", "HR", "SSR", "UR", "LSR", "SGR", "ZR", "SC", "◇ZR"];
const idPart = (r) => (r === "◇ZR" ? "dzr" : r.toLowerCase());

const root = new URL("../", import.meta.url);
const SETS = JSON.parse(await readFile(new URL("scripts/mlp-sets.json", root), "utf8"));
const exists = (p) => access(new URL(p, root)).then(() => true, () => false);

// Width and height of a WebP file, read from its header (lossy, lossless or extended).
async function webpSize(p) {
  const b = await readFile(new URL(p, root));
  const kind = b.toString("ascii", 12, 16);
  if (kind === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (kind === "VP8L") {
    const v = b.readUInt32LE(21);
    return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1];
  }
  if (kind === "VP8X") return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1];
  return [0, 0];
}

await mkdir(new URL("data/mlp/", root), { recursive: true });
for (const set of SETS) {
  const out = [];
  let pictured = 0;
  const unknown = Object.keys(set.cards).filter((r) => !MLP_RARITIES.includes(r));
  if (unknown.length) throw new Error(`${set.code}: unknown rarity ${unknown.join(", ")}`);
  for (const rarity of MLP_RARITIES) {
    for (const [i, name] of (set.cards[rarity] || []).entries()) {
      const n = String(i + 1).padStart(3, "0");
      const mlpId = `${set.code.toLowerCase()}-${idPart(rarity)}-${n}`;
      const img = `img/mlp/${set.code.toLowerCase()}/${mlpId}.webp`;
      // Tiles load the small copy, the card view the full one: a card needs both.
      const [full, small] = await Promise.all([exists(img), exists(img.replace(/\.webp$/, ".sm.webp"))]);
      if (full !== small) throw new Error(`${mlpId}: has ${full ? "no" : "only a"} .sm.webp picture`);
      const has = full;
      if (has) pictured++;
      // Some Kayou cards are printed sideways; the site turns those to fit a portrait tile.
      const [w, h] = has ? await webpSize(img) : [0, 0];
      out.push({
        name,
        rarity,
        set: set.code,
        setName: set.name,
        number: `${rarity}-${n}`,
        mlpId,
        image: has ? `./${img}` : null,
        ...(w > h ? { landscape: true } : {}),
      });
    }
  }
  const file = `data/mlp/${set.code.toLowerCase()}-pool.json`;
  await writeFile(new URL(file, root), JSON.stringify(out, null, 2) + "\n");
  console.log(`${set.code}: ${out.length} cards, ${pictured} with pictures → ${file}`);
}
