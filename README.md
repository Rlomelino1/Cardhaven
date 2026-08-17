# Card Haven — Riftbound Deck Builder

A deckbuilding and collection-tracking tool for [Riftbound](https://riftbound.leagueoflegends.com/),
Riot's League of Legends TCG. Riftbound is the first game supported under the
**Card Haven** brand.

**Live:** <https://cardhavenapp.com> (the old Pages URL,
`https://rlomelino1.github.io/Riftbound-deck-builder/`, redirects there)

A single self-contained HTML file — vanilla JS, no build step, no runtime
dependencies, all CSS and JS inline. Card data is a static JSON file. Accounts and
per-user storage run on Neon Postgres through the Neon Data API, with Row Level
Security as the authorization layer and no backend service of our own.

## Running it locally

The app needs an `http://` origin rather than `file://`, because it fetches its card
pool from its own origin. Anything that serves static files will do:

```
npx serve .
```

Open the printed URL — the cards load on their own. The file picker is a fallback for
a failed fetch, or for trying a pool that isn't committed yet.

## Layout

```
index.html              the app — must stay at the root; Pages deploys from main:/
.nojekyll               stops Pages running Jekyll on the repo
data/ogn-pool.json      352 Origins cards with image URLs
scripts/                build-pool-v2.mjs — refetches the pool when a new set drops
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
| 7 · Showcase / base-card 3-copy limit | |

## Legal

Riftbound Deckbuilder was created under Riot Games' "Legal Jibber Jabber" policy using
assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

Card art is hotlinked from Riot's CDN and is not redistributed here. Non-commercial,
personal use.
