# Card Haven — deck builder and collection tracker

A deckbuilding and collection-tracking tool for two trading card games:
[Riftbound](https://riftbound.leagueoflegends.com/), Riot's League of Legends TCG, and
the [Pokémon TCG](https://www.pokemon.com/us/pokemon-tcg) — every English set. Pick a
game from the header; decks and collection are kept per game.

**Live:** <https://cardhavenapp.com> (the old Pages URL,
`https://rlomelino1.github.io/Riftbound-deck-builder/`, redirects there)

A single self-contained HTML file — vanilla JS, no build step, no runtime
dependencies, all CSS and JS inline. Card data is a static JSON file per set.
Accounts and per-user storage run on Neon Postgres through the Neon Data API, with Row
Level Security as the authorization layer and no backend service of our own.

Each game keeps its own data source and its own vendor script, and both are transformed
into one internal card shape. Everything that differs between them — the rules, the
filter chips, the meta lines, the identity functions — is a value or a function in the
`GAMES` registry at the top of `index.html`; nothing outside it asks which game is
running.

## What it does

- **Riftbound deckbuilder** — zone sizes, domain identity, Signature limits, and the
  3-copy limit counted across every printing of a card, main deck and sideboard
  combined. Origins and Spiritforged both load into one pool; set chips scope the card
  browser without touching the deck, and a reprint shares one copy limit with its
  original.
- **Pokémon deckbuilder** — exactly 60 cards, at most 4 with the same *name* across
  every printing in every set, Basic Energy exempt. All 174 English sets, 20,444
  printings; a set's cards load when you open that set, and search spans all of them.
- **Collection tracker**, per printing, per game, with a per-set progress view and a
  "what am I missing" diff. A base card and its Showcase printing are separate
  collectibles — which is the whole point of collecting the Showcase — and so are an
  Origins card and its Spiritforged reprint. Caps follow the game: 3 and 4.
- **Accounts**, so decks and collection are on the phone as well as the desktop.
- **Export/import** as JSON, for both decks and collection; it's the backup path. An
  export names its game, and importing one into the other game is refused rather than
  silently unresolved.

## Running it locally

The app needs an `http://` origin rather than `file://`, because it fetches its card
pool from its own origin. Anything that serves static files will do:

```
npx serve .
```

Open the printed URL — the cards load on their own. The file picker is a fallback for
a failed fetch, or for trying a pool that isn't committed yet.

### Adding a Riftbound set

Data only, no code change:

```
node scripts/build-pool-v2.mjs --set <code>     # writes <code>-pool.json
```

Move it to `data/`, add one entry to the `GAMES.riftbound.sets` list at the top of
`index.html` (`{ code, name, pool }`), and commit both. Nothing in the app switches on a
set code.

### Adding or refreshing Pokémon sets

Not even that — the vendored manifest *is* the set list, so a new set needs no code
change at all:

```
node scripts/build-pokemon-pools.mjs             # every English set (re-runnable)
node scripts/build-pokemon-pools.mjs --set sv1   # rebuild one set
node scripts/build-pokemon-pools.mjs --index     # rebuild manifest + index from disk
node scripts/build-pokemon-pools.mjs --raw       # print one raw record
```

Sets already on disk are skipped unless `--force` or `--set` names them. Commit the
regenerated `data/pokemon/`.

### Adding a game

One entry in the `GAMES` registry plus one vendor script that transforms the source into
the internal card shape. There is deliberately no plugin system and no schema
generalisation beyond that: everything a game differs by is a value or a function on its
registry entry.

### Maintenance notes

Two rules about `index.html`, because breaking either serves a blank page rather than an
error:

- **Edit an inline script, then rehash it:** `node scripts/csp-hashes.mjs --write`. The
  Content-Security-Policy names each inline script by sha256, so a stale hash stops the
  page running. `npm test` catches it, and `main` will not merge a red suite.
- **`index.html` stays LF**, pinned by `.gitattributes`. A hash can only match one line
  ending, and Pages serves the LF that git stores.

## Layout

```
index.html              the app — must stay at the root; Pages deploys from main:/
.nojekyll               stops Pages running Jekyll on the repo
data/ogn-pool.json      352 Origins (OGN) printings with image URLs
data/sfd-pool.json      288 Spiritforged (SFD) printings
data/pokemon/           174 slim per-set pools + sets.json + search-index.json (~8.9 MB)
scripts/                build-pool-v2.mjs (Riftbound) · build-pokemon-pools.mjs (Pokémon)
vendor/neon/            bundle.mjs (what the page loads) + the vendored module graph
migrations/             schema + tests
tests/                  Playwright e2e suite and a static server
```

Decision logs, runbooks, mockups and audit notes are kept outside the repository and are
not published.

## Tests

Dev-only; the app itself has no build step and no runtime dependencies.

```
npm install
npm test         # Playwright e2e suite (serves the repo, blocks the CDN, runs headless)
npm run test:sql # SQL constraint + RLS tests against the live DB (rolled back)
```

`npm test` runs in CI on push and PR (`.github/workflows/ci.yml`) and **gates what
reaches production**: `main` is protected, so a change needs a pull request with a
green `e2e` check before it can be merged, and Pages only publishes what is on
main. Direct pushes to main are rejected — work on a branch and open a PR.

The SQL tests need a database credential from `.env` and stay local; run them with
`npm run test:sql` before touching a migration.

## Status

| Stage | |
|---|---|
| 0 · Repo baseline | done |
| 1 · Deploy to Pages, verify card art over HTTPS | done |
| 2 · Audit persisted state, schema + RLS | done |
| 3 · Auth UI — sign up / in / out / reset, email + Google | done |
| 4 · `save`/`load` → Data API, anonymous path, merge on signup | done |
| 5 · Multiple named decks, Paper/Midnight themes, validation banners | done |
| 6 · Collection tracker + "what am I missing" | done |
| 7 · Showcase / base-card 3-copy limit | done |
| 8 · Multi-set (Origins + Spiritforged) + the multi-game frame | done |
| 9 · Pokémon TCG — all 174 English sets, per-game rules, per-game collection | done |

## Legal

Riftbound Deckbuilder was created under Riot Games' "Legal Jibber Jabber" policy using
assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

Card Haven is not affiliated with, endorsed, sponsored, or specifically approved by
Nintendo, Creatures Inc., GAME FREAK inc., or The Pokémon Company. Pokémon and all
related names and card images are trademarks and copyrights of their respective owners.

Card art is hotlinked from the publishers' own CDNs — `cmsassets.rgpub.io` for
Riftbound, `images.pokemontcg.io` and `images.scrydex.com` for Pokémon — and is not
redistributed here. Non-commercial, personal use.
