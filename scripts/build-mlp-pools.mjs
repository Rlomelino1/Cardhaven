#!/usr/bin/env node

// Writes the card lists for Kayou's My Little Pony cards (小马宝莉 友谊永恒卡), the
// collect-only game in Card Haven.
//
//   node scripts/build-mlp-pools.mjs
//
// There is no public database or API for these cards, so each set is described here by
// hand: how many cards each rarity has, who is on each card, and whether its picture is
// in img/mlp/<set>/. The pictures were collected once from public eBay listings of the
// set (mostly one seller's clean scans of Kayou's own card renders), cropped to the card
// and saved as WebP at two sizes: <id>.webp (450px short side, for the card view) and
// <id>.sm.webp (240px, for tiles). There is no automatic refresh for this game.
//
// Every card gets an id in Kayou's own print format (HY12-SSR-001 → hy12-ssr-001), so
// collections keep pointing at the same card when names or pictures change. ◇ZR is
// written "dzr" in ids and file names.

import { mkdir, writeFile, access, readFile } from "node:fs/promises";

// From most common to rarest, in the order the app lists them.
export const MLP_RARITIES = ["R", "SR", "HR", "SSR", "UR", "LSR", "SGR", "ZR", "SC", "◇ZR"];
const idPart = (r) => (r === "◇ZR" ? "dzr" : r.toLowerCase());

const M6 = ["Twilight Sparkle", "Pinkie Pie", "Rainbow Dash", "Rarity", "Fluttershy", "Applejack"];
const PM6 = ["Princess Twilight Sparkle", ...M6.slice(1)];

const SETS = [
  {
    // 小马宝莉 友谊永恒卡 辉月包 第12弹, theme "Mystic Adventure" (异境奇遇), China,
    // 2026-07-26. 18 packs a box, 5 cards a pack. 164 cards.
    code: "HY12",
    name: "Radiant Moon Vol. 12",
    cards: {
      R: [...PM6, "Starlight Glimmer", "Sunburst", "Trixie", "Shining Armor",
        "Cherry Jubilee", "Photo Finish", "Sapphire Shores", "Vapor Trail", "Sky Stinger",
        "Fleur de Lis", "Fancy Pants", "Hoity Toity", "Jet Set", "Coco Pommel",
        "Hayseed Turnip Truck", "Cheerilee", "Silver Spoon", "Snails", "Snips",
        "Diamond Tiara", "Blossomforth", "Thunderlane", "Muffins", "Bulk Biceps"],
      SR: [...PM6, ...PM6, "Apple Bloom", "Scootaloo", "Sweetie Belle", "Big McIntosh",
        "Fancy Pants", "Princess Celestia", "Queen Novo", "Bulk Biceps"],
      HR: [...M6, "Spike", "Discord", "Rarity & Rainbow Dash", "Rarity",
        "Applejack & Rarity", "Princess Celestia & Princess Luna", "Marching Band",
        "Fluttershy & Discord", "Applejack & Apple Bloom", "Pear Butter & Bright Mac",
        "Yaks", "Mane Six", "Princess Luna", "Rarity, Pinkie Pie & Spike",
        "Twilight Sparkle & Spike", "Mane Six", ...M6, "Starlight Glimmer", "Trixie"],
      SSR: [...PM6, "Spike", "Princess Luna", "Apple Bloom", "Scootaloo", "Sweetie Belle",
        "Mrs. Cup Cake", "Mayor Mare", "Golden Harvest", ...M6,
        ...M6.map((n) => `${n} Cutie Mark`)],
      UR: [...PM6, "Princess Celestia", "Princess Luna", "Sunset Shimmer", "Granny Smith",
        "Apple Bloom", "Scootaloo", "Sweetie Belle", "Babs Seed", "Cozy Glow",
        "Twilight Sparkle"],
      LSR: [...PM6, "Starlight Glimmer", "Trixie", "Sunburst", "Shining Armor",
        "Photo Finish", "Diamond Tiara", "Sapphire Shores", "Vapor Trail", "Cherry Jubilee",
        "Fleur de Lis"],
      SGR: [...M6, "Princess Celestia", "Princess Luna", "Twilight Sparkle, Fluttershy & Rarity",
        "Pinkie Pie, Rainbow Dash & Applejack"],
      ZR: [...PM6, "Mane Six"],
      SC: [...PM6, "Princess Celestia & Princess Luna"],
      "◇ZR": ["Princess Twilight Sparkle", "Mane Six"],
    },
  },
];

const root = new URL("../", import.meta.url);
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
  for (const rarity of MLP_RARITIES) {
    for (const [i, name] of (set.cards[rarity] || []).entries()) {
      const n = String(i + 1).padStart(3, "0");
      const mlpId = `${set.code.toLowerCase()}-${idPart(rarity)}-${n}`;
      const img = `img/mlp/${set.code.toLowerCase()}/${mlpId}.webp`;
      const has = await exists(img);
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
