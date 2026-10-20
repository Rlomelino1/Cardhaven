#!/usr/bin/env node

// Writes one static page per card set, so search engines can find "<set> card list"
// on cardhavenapp.com, plus a /sets/ index and the sitemap that lists them all.
//
//   node scripts/build-set-pages.mjs
//
// Everything comes from the committed data: GAMES.riftbound.sets in index.html with
// data/*-pool.json, and data/pokemon/sets.json with data/pokemon/*-pool.json. The
// output is deterministic, so rerunning it only changes pages whose cards changed.
// refresh-data.mjs runs it after every data refresh.
//
// Each page links into the app with ?game=…&set=…, which index.html turns into the
// open game and set before it boots.

import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { createHash } from "node:crypto";

const ROOT = new URL("../", import.meta.url);
const at = (p) => new URL(p, ROOT);
const SITE = "https://cardhavenapp.com";
const OUT = "sets/";

const readJson = async (p) => JSON.parse(await readFile(at(p), "utf8"));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const slug = (code) => String(code).toLowerCase();
const num = (n) => Number(n).toLocaleString("en-US");
const byNumber = (a, b) =>
  String(a.number).localeCompare(String(b.number), "en", { numeric: true }) ||
  String(a.id).localeCompare(String(b.id));
const fmtDate = (d) => {
  const m = /^(\d{4})[/-](\d{2})[/-](\d{2})$/.exec(d || "");
  if (!m) return null;
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))
    .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
};

// ---- the two games, flattened to one shape ----

const html = await readFile(at("index.html"), "utf8");
const rbSets = [...html.matchAll(/\{ code:"([A-Z0-9]+)",\s*name:"([^"]*)",\s*pool:"\.\/(data\/[^"]+)"/g)]
  .map(([, code, name, pool]) => ({ code, name, pool }));
if (!rbSets.length) throw new Error("found no GAMES.riftbound.sets entries in index.html");

const rbThumb = (url) => url && url + (url.includes("?") ? "&" : "?") + "w=240&fm=webp";

const GAMES = [
  {
    id: "riftbound",
    label: "Riftbound",
    long: "Riftbound, the League of Legends trading card game",
    owner: "Riot Games",
    sets: await Promise.all(rbSets.map(async (s) => {
      const cards = (await readJson(s.pool)).map((c) => ({
        id: c.riftboundId || `${c.set}-${c.number}`,
        number: c.number,
        label: `${s.code} ${String(c.number).padStart(3, "0")}`,
        name: c.name,
        detail: [c.type, c.rarity, (c.domains || []).join(" / "),
          c.alternateArt ? "Alternate art" : null, c.signature ? "Signature" : null]
          .filter(Boolean).join(" · "),
        image: rbThumb(c.image),
        landscape: c.type === "Battlefield",
      })).sort(byNumber);
      return { code: s.code, name: s.name, group: null, released: null, cards };
    })),
  },
  {
    id: "pokemon",
    label: "Pokémon TCG",
    long: "the Pokémon Trading Card Game",
    owner: "Nintendo, Creatures Inc., GAME FREAK inc. and The Pokémon Company",
    sets: await Promise.all((await readJson("data/pokemon/sets.json")).map(async (s) => {
      const cards = (await readJson(`data/pokemon/${s.id}-pool.json`)).map((c) => ({
        id: c.id,
        number: c.number,
        label: `No. ${c.number}`,
        name: c.name,
        detail: [c.supertype, (c.subtypes || []).join(" "), (c.types || []).join(" / "),
          c.hp ? `${c.hp} HP` : null, c.rarity].filter(Boolean).join(" · "),
        image: c.imageSmall,
        landscape: false,
      })).sort(byNumber);
      return { code: s.id, name: s.name, group: s.series, released: s.releaseDate, cards };
    })),
  },
];

// ---- page chrome, shared with privacy.html's look ----

const THEME = `
try{ if(localStorage.getItem("rb.theme")==="paper")
  document.documentElement.classList.add("paper"); }catch(e){}
`;
const sha = (s) => "'sha256-" + createHash("sha256").update(s, "utf8").digest("base64") + "'";
// The card image hosts are the app's own, so a host added there reaches these pages too.
const IMG_HOSTS = (/img-src ([^;]*)/.exec(html)?.[1] ?? "").split(/\s+/)
  .filter((h) => h.startsWith("https://")).join(" ");
const CSP = `default-src 'none'; script-src ${sha(THEME)}; style-src 'unsafe-inline'; ` +
  `img-src 'self' ${IMG_HOSTS}; base-uri 'none'; object-src 'none'; form-action 'none'`;

const STYLE = `
:root{
  --ink:#141024; --panel:#1F1936; --edge:#312A4C;
  --text:#EAE7F4; --text2:#C9C2DA; --mute:#948CAB;
  --brass:#C9A227; --teal:#3FA7A0; --go-fg:#141024;
}
:root.paper{
  --ink:#F2EDE3; --panel:#FBF8F1; --edge:#DCD5C5;
  --text:#211D15; --text2:#3D372B; --mute:#867D69;
  --brass:#8C6D1F; --teal:#2E7D77; --go-fg:#F2EDE3;
}
*{box-sizing:border-box}
body{margin:0; background:var(--ink); color:var(--text2); padding:22px 18px 48px;
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; line-height:1.55}
:focus-visible{outline:2px solid var(--brass); outline-offset:2px}
main{max-width:1100px; margin:0 auto}
.top{display:flex; align-items:baseline; justify-content:space-between; gap:12px;
  flex-wrap:wrap; background:var(--panel); border:1px solid var(--edge);
  border-radius:4px; padding:10px 14px; margin-bottom:22px}
.wordmark{font-family:"Palatino Linotype","Book Antiqua",Palatino,Georgia,serif;
  font-size:21px; font-weight:700; color:var(--text); text-decoration:none}
a{color:var(--brass)}
a:hover{color:var(--text)}
.crumbs{margin:0 0 6px; font-size:13px; color:var(--mute)}
.crumbs a{color:var(--mute)}
h1{font-family:"Palatino Linotype","Book Antiqua",Palatino,Georgia,serif;
  color:var(--text); font-size:30px; line-height:1.2; margin:0 0 6px}
h2{color:var(--text); font-size:20px; margin:34px 0 8px}
h3{color:var(--text); font-size:15px; margin:20px 0 6px}
.eyebrow{margin:0 0 16px; font-family:ui-monospace,Menlo,monospace; font-size:11px;
  letter-spacing:.14em; text-transform:uppercase; color:var(--teal)}
p{font-size:15px; max-width:68ch}
.go{display:inline-block; background:var(--brass); color:var(--go-fg); font-weight:600;
  text-decoration:none; border-radius:2px; padding:10px 16px; margin:4px 0 8px}
.go:hover{color:var(--go-fg); filter:brightness(1.08)}
.cards{list-style:none; padding:0; margin:18px 0 0; display:grid; gap:14px;
  grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.cards li{background:var(--panel); border:1px solid var(--edge); border-radius:4px;
  padding:8px; font-size:13px; line-height:1.35}
.cards img{display:block; width:100%; height:auto; aspect-ratio:63/88; object-fit:contain;
  border-radius:3px; background:var(--ink); margin-bottom:6px}
.cards img.land{aspect-ratio:88/63}
.cards b{display:block; color:var(--text); font-size:14px}
.cards .no{font-family:ui-monospace,Menlo,monospace; font-size:11px; color:var(--mute)}
.cards .d{display:block; color:var(--mute); font-size:12px}
.sets{list-style:none; padding:0; margin:0; columns:3 260px; column-gap:28px}
.sets li{break-inside:avoid; margin:3px 0; font-size:15px}
.sets .n{color:var(--mute); font-size:13px}
.pn{display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-top:28px;
  font-size:14px}
footer{margin-top:40px; font-size:12px; color:var(--mute); max-width:68ch}
`;

const page = ({ path, title, description, body, ogImage }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<title>${esc(title)}</title>
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Card Haven">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${esc(ogImage || SITE + "/og-image.png")}">
<script>${THEME}</script>
<style>${STYLE}</style>
</head>
<body>
<main>
  <div class="top">
    <a class="wordmark" href="/">Card Haven</a>
    <a href="/sets/">All card sets</a>
  </div>
${body}
</main>
</body>
</html>
`;

const footer = (games) => `
  <footer>
    Card Haven is an unofficial fan tool and is not affiliated with ${esc(games.map((g) => g.owner).join(", or "))}.
    Card names and images are the property of their owners; images are loaded from their hosts.
  </footer>`;

const setPath = (g, s) => `/${OUT}${g.id}/${slug(s.code)}/`;
const appLink = (g, s) => `/?game=${g.id}&set=${encodeURIComponent(s.code)}`;

const setPage = (g, s, prev, next) => {
  const n = s.cards.length;
  const when = fmtDate(s.released);
  const facts = [g.label, s.group && `${s.group} series`, when && `released ${when}`, `${num(n)} cards`]
    .filter(Boolean).join(" · ");
  const title = `${s.name} card list (${g.label}) · Card Haven`;
  const description = `All ${num(n)} cards in ${s.name}${s.group ? ` (${s.group})` : ""}, ` +
    `from ${g.label}: names, numbers and rarities. Build decks with them or track the set in your collection on Card Haven.`;
  const cards = s.cards.map((c) => `    <li>${c.image
      ? `<img src="${esc(c.image)}" alt="${esc(c.name)}" loading="lazy" decoding="async" width="${c.landscape ? 88 : 63}" height="${c.landscape ? 63 : 88}"${c.landscape ? ' class="land"' : ""}>`
      : ""}<span class="no">${esc(c.label)}</span><b>${esc(c.name)}</b><span class="d">${esc(c.detail)}</span></li>`)
    .join("\n");
  const body = `
  <p class="crumbs"><a href="/sets/">Card sets</a> › <a href="/sets/#${g.id}">${esc(g.label)}</a>${s.group ? ` › ${esc(s.group)}` : ""}</p>
  <h1>${esc(s.name)} card list</h1>
  <p class="eyebrow">${esc(facts)}</p>
  <p>Every card in ${esc(s.name)}, a set from ${esc(g.long)}. Open it in Card Haven to build a deck
  from these cards or mark which ones you own.</p>
  <a class="go" href="${esc(appLink(g, s))}">Open ${esc(s.name)} in Card Haven</a>
  <ul class="cards">
${cards}
  </ul>
  <nav class="pn">
    <span>${prev ? `← <a href="${setPath(g, prev)}">${esc(prev.name)}</a>` : ""}</span>
    <span>${next ? `<a href="${setPath(g, next)}">${esc(next.name)}</a> →` : ""}</span>
  </nav>${footer([g])}`;
  return page({ path: setPath(g, s), title, description, body, ogImage: s.cards.find((c) => c.image)?.image });
};

const indexPage = () => {
  const sections = GAMES.map((g) => {
    const groups = new Map();
    for (const s of g.sets) {
      const k = s.group || "";
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(s);
    }
    const lists = [...groups].map(([group, sets]) => `${group ? `  <h3>${esc(group)}</h3>\n` : ""}  <ul class="sets">
${sets.map((s) => `    <li><a href="${setPath(g, s)}">${esc(s.name)}</a> <span class="n">${num(s.cards.length)} cards</span></li>`).join("\n")}
  </ul>`).join("\n");
    return `
  <h2 id="${g.id}">${esc(g.label)}</h2>
${lists}`;
  }).join("\n");
  const total = GAMES.reduce((n, g) => n + g.sets.length, 0);
  const body = `
  <h1>Card sets</h1>
  <p class="eyebrow">${GAMES.map((g) => `${g.sets.length} ${g.label} sets`).join(" · ")}</p>
  <p>Card lists for all ${total} sets Card Haven covers. Pick a set to see every card in it,
  then open it in the deck builder or collection tracker.</p>
${sections}
${footer(GAMES)}`;
  return page({
    path: `/${OUT}`,
    title: "Card sets: Riftbound and Pokémon TCG card lists · Card Haven",
    description: `Card lists for every Riftbound and Pokémon TCG set: ${total} sets with every card's name, number and rarity.`,
    body,
  });
};

// ---- write ----

await rm(at(OUT), { recursive: true, force: true });
const files = [];
const put = async (path, text) => {
  const file = at(path.replace(/^\//, "") + "index.html");
  await mkdir(new URL("./", file), { recursive: true });
  await writeFile(file, text);
  files.push(path);
};

await put(`/${OUT}`, indexPage());
for (const g of GAMES) {
  for (const [i, s] of g.sets.entries())
    await put(setPath(g, s), setPage(g, s, g.sets[i - 1], g.sets[i + 1]));
}

// Sitemap: the hand-kept pages first, keeping their lastmod, then every set page.
const old = await readFile(at("sitemap.xml"), "utf8");
const kept = [...old.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?\s*<\/url>/g)]
  .filter(([, loc]) => !loc.startsWith(`${SITE}/${OUT}`))
  .map(([, loc, mod]) => ({ loc, mod }));
const urls = [...kept, ...files.map((p) => ({ loc: SITE + p }))];
await writeFile(at("sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>${u.mod ? `
    <lastmod>${u.mod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>
`);

console.log(`wrote ${files.length} pages under /${OUT} and ${urls.length} sitemap entries`);
