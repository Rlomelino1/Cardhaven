#!/usr/bin/env node

// Writes the card lists for Kayou's My Little Pony cards (小马宝莉 友谊永恒卡), the
// collect-only game in Card Haven.
//
//   node scripts/build-mlp-pools.mjs
//
// There is no public database or image gallery for these cards, so each set is described
// here by hand: how many cards each rarity has, and, where known, a card's character.
// Every card gets an id in Kayou's own print format (HY12-SSR-001 → hy12-ssr-001), so
// collections keep pointing at the same card when names or images are filled in later.
// Rarities run from most common to rarest, in the order the app lists them.

import { mkdir, writeFile } from "node:fs/promises";

export const MLP_RARITIES = ["R", "SR", "HR", "SSR", "UR", "LSR", "SGR", "ZR", "SC"];

const SETS = [
  {
    // 小马宝莉 友谊永恒卡 辉月包 第12弹, "Mystic Adventure" (异境奇遇), China, 2026-07-26.
    // 18 packs a box, 5 cards a pack. Counts per rarity from retailer listings of the
    // set; ZR and SC are left out until their counts are known.
    code: "HY12",
    name: "Radiant Moon Vol. 12",
    counts: { R: 30, SR: 20, HR: 30, SSR: 26, UR: 16, LSR: 16, SGR: 10 },
    names: {},  // e.g. "LSR-001": "Rainbow Dash"
  },
];

await mkdir(new URL("../data/mlp/", import.meta.url), { recursive: true });
for (const set of SETS) {
  const cards = [];
  for (const rarity of MLP_RARITIES) {
    const n = set.counts[rarity] || 0;
    for (let i = 1; i <= n; i++) {
      const number = `${rarity}-${String(i).padStart(3, "0")}`;
      cards.push({
        name: set.names[number] || `${rarity} card ${String(i).padStart(3, "0")}`,
        rarity,
        set: set.code,
        setName: set.name,
        number,
        mlpId: `${set.code}-${number}`.toLowerCase(),
        image: set.images?.[number] ?? null,
      });
    }
  }
  const out = new URL(`../data/mlp/${set.code.toLowerCase()}-pool.json`, import.meta.url);
  await writeFile(out, JSON.stringify(cards, null, 2) + "\n");
  console.log(`${set.code}: ${cards.length} cards → data/mlp/${set.code.toLowerCase()}-pool.json`);
}
