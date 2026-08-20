# Card Haven — Riftbound Deck Builder

A deckbuilding and collection-tracking tool for [Riftbound](https://riftbound.leagueoflegends.com/),
Riot's League of Legends TCG. Riftbound is the first game supported under the
**Card Haven** brand.

**Live:** <https://cardhavenapp.com> (the old Pages URL,
`https://rlomelino1.github.io/Riftbound-deck-builder/`, redirects there)

A single self-contained HTML file — vanilla JS, no build step, no runtime
dependencies, all CSS and JS inline. Card data is a static JSON file per set.
Accounts and per-user storage run on Neon Postgres through the Neon Data API, with Row
Level Security as the authorization layer and no backend service of our own.

## What it does

- **Deckbuilder** for Riftbound's construction rules — zone sizes, domain identity,
  Signature limits, and the 3-copy limit counted across every printing of a card,
  main deck and sideboard combined.
- **Multi-set.** Origins and Spiritforged both load; set chips scope the card browser
  without touching the deck, and a reprint shares one copy limit with its original.
- **Collection tracker**, per printing, with a per-set progress view and a "what am I
  missing" diff. A base card and its Showcase printing are separate collectibles —
  which is the whole point of collecting the Showcase.
- **Accounts**, so decks and collection are on the phone as well as the desktop.
- **Export/import** as JSON, for both decks and collection; it's the backup path.

## Running it locally

The app needs an `http://` origin rather than `file://`, because it fetches its card
pool from its own origin. Anything that serves static files will do:

```
npx serve .
```

Open the printed URL — the cards load on their own. The file picker is a fallback for
a failed fetch, or for trying a pool that isn't committed yet.

### Adding a set

Data only, no code change:

```
node scripts/build-pool-v2.mjs --set <code>     # writes <code>-pool.json
```

Move it to `data/`, add one entry to the `GAMES` registry at the top of `index.html`
(`{ code, name, pool }`), and commit both. Nothing in the app switches on a set code.

## Layout

```
index.html              the app — must stay at the root; Pages deploys from main:/
.nojekyll               stops Pages running Jekyll on the repo
data/ogn-pool.json      352 Origins (OGN) printings with image URLs
data/sfd-pool.json      288 Spiritforged (SFD) printings
scripts/                build-pool-v2.mjs — fetches a set's pool file
vendor/neon/            the Neon SDK graph, vendored and served from this origin
migrations/             schema + tests
docs/                   decisions, open questions, and runbooks
CLAUDE.md               working agreement and architecture notes
```

## Docs

| File | What's in it |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Architecture, constraints, build order, how to work on this |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Every choice made, and what was rejected |
| [`docs/BLOCKED.md`](docs/BLOCKED.md) | Open decisions and what they hold up |
| [`docs/auth-setup.md`](docs/auth-setup.md) | Neon Auth + Google OAuth console runbook |
| [`docs/deployment.md`](docs/deployment.md) | How Pages is configured, and what was verified |
| [`docs/persistence-audit.md`](docs/persistence-audit.md) | What the app stores and where it belongs |
| [`docs/hardening-plan.md`](docs/hardening-plan.md) | Security, testing, and performance audit and plan |

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

## Legal

Riftbound Deckbuilder was created under Riot Games' "Legal Jibber Jabber" policy using
assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

Card art is hotlinked from Riot's CDN and is not redistributed here. Non-commercial,
personal use.
