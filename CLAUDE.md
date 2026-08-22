# Card Haven

## What this is

A deckbuilding and collection-tracking tool for two trading card games: **Riftbound**
(Riot's League of Legends TCG) and the **Pokémon TCG** (all 174 English sets). It is a
single self-contained HTML file: vanilla JS, no build step, no dependencies, all CSS and
JS inline. Card data comes from static JSON pool files. Accounts and per-user storage
run on Neon Postgres behind RLS.

This is a personal-interest project, not a product. The author collects cards and mostly
doesn't play. Expected traffic is one user plus a trickle of people from a niche
community. Optimize for "works unattended for months" and "cheap to understand six
months from now," not for scale.

## Who you're working with

Java/Spring Boot backend developer, about a year into the field, comfortable with
Postgres and SQL. Assume backend concepts are known — don't over-explain SQL, HTTP,
transactions, or indexing. Less experienced with frontend and with BaaS platforms;
explain those more.

## Environment (verified, August 2026)

- **Windows, PowerShell.** Not bash. Watch command syntax, path separators, and
  quoting. Don't emit `export FOO=bar` or `&&` chains that assume a POSIX shell.
- Node **24.19.0**
- `gh` CLI installed and authenticated
- Git identity configured (commits use a GitHub noreply address — don't change it)
- Neon CLI (`neonctl`) requires Node >= 20.19.0; current Node satisfies this

## Commit authorship — the author is the only contributor

**Never add a `Co-Authored-By:` trailer, and never name yourself in a commit message,
PR body, or anywhere else that feeds GitHub's contributor list.** The author is the
sole contributor to this repository and intends to stay that way. This overrides any
default habit of crediting an assistant on commits.

Applies to commits, amends, rebases, squashes, and PR bodies alike. If a trailer slips
in, strip it before pushing — once it is on a shared branch, removing it means
rewriting history.

## Layout

```
index.html              the app — must stay at the repo root, Pages serves from /
.nojekyll               required, or Pages runs Jekyll and drops _-prefixed paths
.env                    gitignored. Never commit, never inline, never echo to chat
.env.example            the key names, no values
CLAUDE.md               this file
README.md               human-facing overview
data/ogn-pool.json      352 Origins (OGN) printings with image URLs
data/sfd-pool.json      288 Spiritforged (SFD) printings; added stage 8
data/pokemon/           174 slim per-set pools + sets.json + search-index.json; stage 9
vendor/neon/            the Neon SDK graph, vendored (served from this origin, not a CDN)
scripts/                build-pool-v2.mjs (Riftbound set); build-pokemon-pools.mjs
                        (every English Pokémon set); vendor-neon.mjs (re-vendor the SDK)
migrations/             0001–0006 SQL + tests/ (48 tests, all passing)
tests/                  Playwright e2e suite (dev/CI only) + a static server
docs/                   DECISIONS.md, BLOCKED.md, auth-setup.md, deployment.md,
                        persistence-audit.md, hardening-plan.md
```

**`index.html` and `.nojekyll` cannot move.** Pages is a branch deploy from `main` at
`/`, so the app has to sit at the root. Everything else is free to reorganize.

---

# Architecture

## Where it's going

A hosted site with accounts, per-user deck CRUD, and per-user collection tracking, at
zero cost:

- **Static hosting**: GitHub Pages, **Deploy from a branch** (`main`, `/ root`) — not
  a build workflow. Nothing to generate; the HTML is the artifact. **`main` is
  protected**: a change needs a PR whose `e2e` check is green before it can merge, and
  Pages publishes whatever is on main — so the test suite gates production. Direct
  pushes to main are rejected; branch and open a PR. Don't rename the `e2e` job in
  `.github/workflows/ci.yml` without updating the required check, or merges block on a
  check that never reports.
- **Auth**: Neon Managed Better Auth (email/password + Google OAuth)
- **Data**: Neon Postgres via the Neon Data API (PostgREST-compatible), with Row Level
  Security as the authorization layer
- **No backend service.** The browser talks to Postgres over HTTPS with a JWT.

Neon project ID: `falling-star-08784661` · region `us-east-2` · database `neondb`

## Two games, one app — the adapter pattern (stage 9)

The product is **Card Haven**, live at `https://cardhavenapp.com`. It hosts **Riftbound**
and the **Pokémon TCG**. Stage 8 built the frame; stage 9 put a second game in it and
turned the frame into the adapter surface.

**The standing rule for any future game:** each game keeps its own best data source and
its own vendor script, and every source is transformed into **one internal card shape**.
There is no unified external API and no attempt to find one.

- **`GAMES` in `index.html`** is the registry: one entry per game holding its `id`,
  `label`, two-letter `mark`, its sets (or its set *manifest*), its `zones`, its filter
  axes, its `rules`, its localStorage key names, and its adapter hooks — `normalize`,
  `refOf`, `cardKeyRef`, `cardLabelRef`, `setCode`, `numLabel`, `tileMeta`,
  `tileBadges`, `modalMeta`, `colTag`, `searchMatch`, `validate`. `ACTIVE_GAME` selects
  one; `GAME` is the resolved entry; `adoptGame()` is the single place a switch takes
  effect, re-pointing the mutable aliases (`ZONES`, `DOMAINS`, `TYPES`, `RARITY_ORDER`,
  `DOMAIN_INK`, `RARITY_DOT`) so call sites never ask which game is running.
- **Adapters are declared above the registry.** The `GAMES` literal evaluates its hook
  references at load time, so an arrow const defined after it is a TDZ crash on boot.
- **Riftbound's hooks are its stage 8 expressions moved, not rewritten.** That is why it
  is pixel-identical across nine element-scoped screenshot comparisons. Keep it that
  way: if a change to shared code would move a Riftbound pixel, it belongs in a hook.
- **Two fields carry a Riftbound name for a game-neutral job**, and are deliberately
  *not* renamed: `domains` is the coloured filter axis (Riftbound domains, Pokémon
  energy types) and `type` is the primary type axis (Riftbound card type, Pokémon
  supertype). The export format and every exported deck file already use those names;
  renaming them breaks import of files in the wild.
- **The header's game dropdown switches for real**, in place. Not a reload: a reload
  would discard an unsaved deck instead of asking about it. The two "planned" rows
  (Magic, One Piece) stay hardcoded display data marked inert — no handler, no href,
  nothing to click. Keep them out of the registry: the registry describes games the app
  can actually *run*, and a fake entry there is reachable by every loop that walks it.

### Eager sets vs. lazy sets

Two loading strategies, chosen per game by `lazySets`:

- **Riftbound is eager.** Origins (`OGN`) and Spiritforged (`SFD`) are fetched in
  parallel and merged into one in-memory pool. A set that fails to load fails the whole
  load, by name, with retry-all — a partial pool would read as a deck full of unresolved
  cards and a collection full of holes.
- **Pokémon is lazy.** 174 sets, 20,444 printings. The set manifest and the global
  **search index** load at game activation; a set's full pool loads only when that set is
  opened, and is cached for the session. A chip row is the wrong control for 174 sets, so
  it gets a series-grouped collapsible picker instead — one open set per game, shared by
  the deckbuilder and the collection.

**The search index is the deck-resolution layer, not just the search layer.** This is the
load-bearing idea of the lazy design and the reason the index exists at all: a 60-card
deck spans many sets, only the open set's pool is in memory, and deck rows plus the copy
limit have to resolve anyway. `findCard()` falls back to the index and returns a **light
card** (`light: true`) — name, set, number, image, and a Basic Energy flag, which is
everything a tile, a deck row and the copy limit need. The card modal fetches the card's
real set on demand to fill in HP, types and formats. Consequences to respect:

- The index carries a sparse `b:1` Basic Energy flag beyond `{id,n,s,num,img}`, because
  the copy-limit exemption must be answerable **without** loading pools.
- Cross-set search runs off the index. The chip filters read fields the index does not
  carry, so when any chip is on the search stays inside the loaded set and the result
  count *says which of the two happened*. Silently ignoring a filter would be worse.
- A lazy game has no aggregate collection grid — 20,444 tiles is not a page. Its
  collection is always set-scoped, and the whole-game total comes off the index. Per-set
  owned counts also come off the index, so the picker can show `12/191` for a set whose
  cards were never fetched.

### Per-game rules — settled, don't drift

| | Riftbound | Pokémon |
|---|---|---|
| deck size | per-zone targets (40+ main, 12 runes, 3 battlefields, 0-or-8 side) | **exactly 60**, one zone |
| copy limit | 3 | 4 |
| counted by | **printing group** — collector number, then folded across id-groups by the base printing's name | **card name**, across every printing in every set |
| exempt | — | **Basic Energy**, entirely |
| collection cap / playset | 3 | 4 |

Pokémon has no Legend, no domains, and no per-card energy cost, so the Legend box, the
energy curve and the zone tab row **hide** rather than render empty frames. Format
legality (`legalities`) is **stored and never enforced** — out of scope.

### Storage

- **`decks.game`** (migration 0005) scopes deck rows; a deck is bound to its game at
  creation and never moves. The auth/data module reads the active game **live** on every
  query rather than caching it, or a switch would list the other game's rows. An export
  names its game in `kind`, and importing one game's export into the other is refused by
  name rather than landing as sixty unresolved entries.
- **`user_settings.collection` is nested by game** since stage 9:
  `{riftbound:{ref:qty}, pokemon:{ref:qty}}`. Still one row, one blob, one sync engine. A
  **pre-stage-9 flat blob is lifted, never rejected** — every browser and every
  production row has that shape — and written back nested on the next sync. Shape is
  decided by inspection (`isNestedCollection`), never by trust. Clamping is per *owning*
  game. Migration 0006 raised the size cap to 1 MB; read its header for the measurement
  before touching the number. Full detail in `docs/persistence-audit.md`.
- **localStorage**: the four pre-existing Riftbound keys (`riftbound-deckbuilder-v1`,
  `rb.collection`, `rb.variants`, `rb.open-deck`) **are** the riftbound namespace and
  must never be renamed — renaming orphans every existing browser's local state. New
  game-specific keys carry the game id (`riftbound.setScope`, `pokemon.deck`,
  `pokemon.open-deck:{uid}`, `pokemon.openSet`). `rb.theme` and `ch.game` are app-level,
  not per game. `rb.collection` is shared by every game and holds the nested blob.

### What is still out of scope

- **Variant tracking is explicitly deferred.** Reverse holo, holo, and 1st edition are
  *not* tracked: one row per printing, as Riftbound has. Nothing in the slim vendored
  Pokémon schema preserves variant information, so a future stage that wants it starts
  with a re-vendor plus a collection-shape change. This was a decision, not an oversight
  — pick it up deliberately.
- **No card pricing, no non-English data, no third game.** No plugin system, no schema
  generalization beyond the registry and its hooks: that hook list is the entire
  abstraction budget. When a choice presents a game-hardcoded shape and an equally cheap
  game-neutral one, the game-neutral one wins; when generalizing costs extra, don't.

**Adding a set is a data-only change.** For Riftbound: one `GAMES.riftbound.sets` entry
plus one committed pool file. For Pokémon it is not even that — the vendored manifest *is*
the set list, so re-running the vendor script is the whole change. Nothing in `index.html`
switches on a set code; set identity travels on each card's own `set` field and on the
set-prefixed ref. Keep it that way — if a change needs `if (set === "...")`, that's the
signal the design drifted.

## The data pipeline — two vendor scripts, one internal shape

| Game | Source | Script | Output |
|---|---|---|---|
| Riftbound | Riftcodex API (`api.riftcodex.com`) | `scripts/build-pool-v2.mjs` | `data/{set}-pool.json`, one per set |
| Pokémon | `PokemonTCG/pokemon-tcg-data` GitHub repo, raw JSON, no key | `scripts/build-pokemon-pools.mjs` | `data/pokemon/{setId}-pool.json` × 174, `sets.json`, `search-index.json` |

Both are zero-dependency Node scripts, re-runnable, polite about delays. Neither is a
build step: they are maintenance tools, run by hand, whose output is committed.

**Do not call the live pokemontcg.io API.** It is unreliable and unnecessary — the repo is
the source, and it is actively maintained.

**Card art is hotlinked, per the standing decision, and the URLs are copied verbatim from
the source — never rebuilt from a pattern.** Most Pokémon sets serve art from
`images.pokemontcg.io` as `{set}/{number}.png`, but the four **Mega Evolution** sets serve
cards, set symbols *and* logos from `images.scrydex.com` under a different path shape. A
reconstructed URL is wrong for 661 cards today and will be wrong again the next time
upstream moves hosts. Both hosts are in the page's CSP `img-src`;
`raw.githubusercontent.com` is **not**, and must not be — it is read at vendoring time and
never by the page, which `tests/e2e/pokemon.spec.js` asserts.

The slim Pokémon card schema keeps `supertype`/`subtypes` verbatim (they drive the Energy
exemption and the filter chips) and keeps `number` as a **string** — Pokémon collector
numbers include `GG69`, `TG12`, `SV107`. Absent fields are omitted rather than written as
`null`: at 20,444 cards the nulls alone are hundreds of KB.

## Config and secrets

Environment variables live in a gitignored `.env`, named to match Neon's own
convention (`neon env pull` writes the first two):

| Variable | Secret? | Use |
|---|---|---|
| `DATABASE_URL` | **yes** | pooled (`-pooler` host) — app runtime queries |
| `DATABASE_URL_UNPOOLED` | **yes** | direct — **all migrations, DDL, pg_dump** |
| `NEON_API_KEY` | **yes** | project-scoped key, Editor access |
| `NEON_AUTH_URL` | no | Managed Better Auth endpoint |
| `NEON_DATA_API_URL` | no | Data API endpoint |
| `NEON_PROJECT_ID` | no | `falling-star-08784661` |

**Secrets rules, no exceptions:**

- Connection strings and the API key never appear in the HTML, a migration script, a
  commit, a log line, or a chat message. Read them from `.env`.
- The two URLs are **not** secrets — they will sit in the public `index.html` by
  design. Nothing behind them works without a valid JWT plus RLS. Their presence in
  `.env` is tidiness, not a security boundary. **RLS is the security boundary.**
- If a credential is ever exposed, say so immediately and loudly. Don't quietly
  continue.

## Neon SDK gotchas — read before writing any client code

- **Use the two-URL object form of `createClient`.** The docs lead with the single-URL
  form `createClient(url)`, but that requires a version of `@neondatabase/neon-js`
  not yet published to npm. Latest published is `0.7.0-beta`, which only accepts the
  object form:

      const client = createClient({
        auth:    { url: NEON_AUTH_URL, allowAnonymous: true },
        dataApi: { url: NEON_DATA_API_URL },
      });

- **`allowAnonymous: true`** enables anonymous data access — queries work without
  signing in, using an anonymous token for RLS. Evaluate whether this replaces the
  localStorage anonymous path entirely. Prefer it if so; it's less code and one fewer
  state machine.
- **There is no publishable key.** Neon's Data API authenticates with a JWT from
  Managed Better Auth. No static browser key exists. Don't look for one, don't invent
  one, don't carry Supabase's `anon`/publishable key concept across.
- **All Neon docs use Vite's `import.meta.env`.** That does not exist here. Put the
  two URLs in a small config object at the top of `index.html`. **Do not introduce a
  build step to get environment variables.**
- **The SDK is vendored** under `vendor/neon/` and imported with relative paths, so the
  app loads it from its own origin, not esm.sh, at runtime (supply-chain hardening —
  the ~132-module resolved graph is committed and reviewable). It is still ESM via
  `<script type="module">`; there is no UMD build. Verified: the `index`, `auth`, and
  `auth/vanilla` entry points import no Node built-ins, so they're browser-safe. There
  is a dedicated `./auth/vanilla` export — use it, not the React one. To bump versions,
  edit the pins in `scripts/vendor-neon.mjs`, run it, and commit the regenerated
  `vendor/neon/`. This is a maintenance tool, not a build step the app needs at runtime.
- **Pin exact versions.** These are pre-1.0 packages. The Data API itself is in beta.
  When something behaves unexpectedly, check the current Neon docs before assuming the
  bug is in our code.

## The migration

`migrations/0001_create_decks.sql` is applied to the live database. It is Neon-native —
`auth.user_id()` through a `public.app_user_id()` wrapper, `user_id uuid` with an
`ON DELETE CASCADE` foreign key to `neon_auth."user"(id)`, four RLS policies per table,
a trigger pinning `user_id` and `created_at`, and jsonb payload size and shape
constraints. `migrations/README.md` has the details; `docs/DECISIONS.md` has the reasoning.

`0005` added `decks.game` (`text not null default 'riftbound'`) so a deck belongs to
exactly one game — its payload holds refs that only mean anything inside that game's
pool.

`0006` raised `user_settings_collection_size` from 64 KB to **1 MB**, for the
nested-by-game collection blob. The number is measured, not estimated: a complete
Pokémon collection (every one of the 20,444 printings, with a quantity) is **480,812
bytes of jsonb** while being only 255,908 bytes of JSON *text* — jsonb keeps a key-offset
table per object, so sizing this from text length under-reads by nearly half. Read the
migration header before touching it. `user_settings` is still not *row*-scoped by game
and does not need to be; the nesting lives inside the blob.

**Run migrations over `DATABASE_URL_UNPOOLED`.** The pooled endpoint runs PgBouncer in
transaction mode and does not support `SET`, `search_path`, or session state — and
`set_updated_at()` uses `set search_path = ''`. Migrations through the pooler fail in
confusing ways.

What the app persists today, and where each field belongs, is written up in
`docs/persistence-audit.md` — read from the file, not from a description of it. It also
lists the payload shrink that has to land in stage 4 (`zones` currently stores a full
card object per entry; the row needs `{ref, qty}`).

---

# Features

## The collection tracker

Alongside deckbuilding, the app tracks which physical cards the author owns, so they
can check their collection without digging through binders.

- Per-card owned quantity, per user
- The inverse view matters as much as the collection itself: "what am I missing" is a
  client-side diff against the static pool JSON, not a database query
- Same storage shape as a deck: one jsonb blob per user, read and written whole. A few
  KB even at 100% completion.
- **Phone access is a primary use case** — it's the reason accounts exist at all

### Base vs. Showcase printings — read this before touching card identity

The deckbuilder and the collection tracker want **opposite** behavior from the same
data, and conflating them will break one of the two:

- **Deckbuilder**: a base printing and its Showcase printing share one 3-copy limit.
  They are one card.
- **Collection**: a base printing and its Showcase printing are two distinct objects.
  Owning the Showcase specifically is the entire point of collecting it.

Therefore: key everything on **collector number**, and derive a separate grouping for
deck-limit purposes. Do not "fix" the copy-limit bug by normalizing or collapsing card
names — that would break the collection feature before it's built.

### The cross-set layer (stage 8) — two layers, not one

Collector number alone stops being sufficient the moment a second set exists, because
Riftbound defines identity for deck legality **by name**: the 3-copy limit is on named
cards (TR 403.4) and a card is legal if a card of that name is in a legal set
(TR 601.2.a). Reprints are the same card. So the grouping is two layers:

1. **Within a set — `copyGroupRef()`**, unchanged from stage 7: strip the variant
   suffix off the middle id segment (`ogn-039a-298` → `ogn-039`).
2. **Across id-groups — `cardKey()`**: fold groups together by the **base printing's**
   name, where the base printing is the group member whose id carries no variant
   suffix, and the trailing `(Alternate Art)` / `(Signature)` / `(Overnumbered)` marker
   is stripped off *that one name only*. Never strip suffixes off arbitrary variant
   names to build a key — a group can hold `X (Overnumbered)` and `X (Signature)` and
   no bare `X` at all, which is exactly the fragility stage 7 recorded.

Measured on the real merged pool: 640 printings → 562 id-groups → **520 cards**. All
42 merges are genuine, and they are not only cross-set:

- 13 are **cross-set reprints** — Spiritforged reprints thirteen Origins cards as
  overnumbered Showcase printings (`ogn-035` ↔ `sfd-223` Vayne - Hunter, the six
  Seals, Ahri - Inquisitive, …).
- 29 are **within-set** merges layer 1 alone misses, because a set's overnumbered
  Showcase printings get their **own collector number** rather than a suffix on the
  base card's (`ogn-247` vs `ogn-299`/`ogn-299*`; `sfd-049` vs `sfd-224`/`sfd-224*`).
  Five of those are Units, so this was a live main-deck bug, not a theoretical one.

Name grouping is only correct while two *different* cards never share a name. That is
a property of the data, so it is a test, not an assumption: `pool integrity` in
`tests/e2e/multiset.spec.js` asserts every group the key merges is functionally one
card (type, energy, might, power, domains) and goes red the day that stops holding.
Compare gameplay fields only — Riftcodex drops `supertype` on some Showcase reprints
and errata's legend text, and neither means "different card".

**The collection is untouched by all of this.** It still keys on the full ref, so an
Origins printing and its Spiritforged reprint are two distinct collectibles — guarded
by its own test.

### Pokémon collection (stage 9)

Same idea, different numbers, and one structural difference. The map keys on the card id
(`sv1-1`), the cap is 4, and the whole thing lives under the `pokemon` key of the nested
blob. The difference: with 174 sets and only one pool in memory there is **no aggregate
grid** — the collection is always scoped to the open set, the whole-game total comes off
the search index, and per-set owned counts come off it too, so the picker shows progress
for sets whose cards were never fetched. Variant tracking is deferred; see above.

## The Showcase 3-copy limit — fixed (stage 7)

Previously the 3-copy limit counted a Showcase printing and its base card as two
different cards, because their names differ (all 352 names are unique; 54 are rarity
"Showcase", 30 also flagged `alternateArt`). By the rules they share one limit.

Fixed by grouping on collector number, not names, exactly as the section above
requires. `copyGroup(card)` in `index.html` strips the variant suffix off the middle
segment of the id (`ogn-039a-298` and `ogn-039-298` are both card `ogn-039`) and the
legality check sums copies across the group; the battlefield "all different" check
uses the same grouping. The collection is untouched — it still keys on the full ref,
so a Showcase stays a distinct object there. This is pure client logic, no schema
change. Covered by e2e tests in `tests/e2e/smoke.spec.js`.

**The limit spans main deck + sideboard**, per Tournament Rules 403.4: *"Limits on
copies of named cards apply to the combination of Main Deck and sideboard."* So 3 in
the main deck plus 1 in the sideboard is illegal; 2 + 1 is fine. Runes and
battlefields are separate decks under their own rules and are not counted. The
sideboard's own 0-or-8 size rule is TR 403.2 — note both live in the **Tournament**
rules, not the Core rules, which is why the core construction section defines no
sideboard at all.

---

# Decisions already made — don't relitigate these

- **No backend server.** Free JVM hosting no longer exists in any usable form, and RLS
  removes the need. If the author asks for a Spring API later, treat it as a learning
  exercise, not a requirement.
- **Neon, not Supabase.** Chosen deliberately after a full comparison. Reasons: no
  active-project cap, scale-to-zero instead of a 7-day pause needing manual
  unpausing, and a restore window Supabase's free tier doesn't offer. Don't propose
  switching back.
- **Card art is hotlinked** from Riot's CDN (`cmsassets.rgpub.io`). Never download,
  re-host, proxy, or bake card images into the repo. The `image` field holds a URL and
  that's all.
- **The card pool stays a static JSON file** served alongside the HTML — never rows in
  the database. It's identical for every user.
- **Single file, no build step.** ESM imports from a CDN are fine. A bundler,
  framework, or local `node_modules` tree the app depends on at runtime is not, and
  needs explicit sign-off first.
- **Keep the Export button.** It's both the backup strategy and the vendor-migration
  path. Decks *and* collection must round-trip through JSON.
- **GitHub Pages branch deploy, not a build workflow.** Next.js/Gatsby/Jekyll starters
  are all site generators; there is nothing to generate.
- **The adapter pattern, not a unified card API.** Each game keeps its own best source
  and its own vendor script; every source is transformed into one internal card shape.
  Don't go looking for a single API that covers several games.
- **Pokémon data comes from the `PokemonTCG/pokemon-tcg-data` GitHub repo, never from
  the live pokemontcg.io API.** The API is unreliable and buys nothing: the repo is plain
  JSON, needs no key, and is actively maintained.
- **Pokémon variant tracking (reverse holo, holo, 1st edition) is deferred, not
  rejected.** One row per printing today. Picking it up means a re-vendor and a
  collection-shape change, so it should be a stage of its own.

# Constraints that will bite

**Neon free plan** (checked August 2026 — verify current numbers before relying on
them):

- 100 projects; 0.5 GB storage per project; 5 GB network transfer per project/month
- 100 CU-hours of compute per project/month, autoscaling up to 2 CU
- 10 branches per project
- Computes scale to zero after 5 minutes idle and wake automatically (~0.5–2s cold
  start). **No keep-alive is needed. Do not build one.**
- Instant-restore history window: 6 hours, capped at 1 GB of change history
- Running out of CU-hours stops the compute until the billing period resets.
  **Never add polling, heartbeats, or interval timers that query the database.**
  This is the single easiest way to break the site for a month.

**Riot's fan content policy**: the site must stay non-commercial — no ads, no
donations, no implying endorsement — and must carry this notice visibly:

> Riftbound Deckbuilder was created under Riot Games' "Legal Jibber Jabber" policy
> using assets owned by Riot Games. Riot Games does not endorse or sponsor this
> project.

It's already in the footer. Keep it there. Never edit or move it without asking.

---

# Build order

Deploy early and deploy empty — Google's OAuth client and the auth redirect config
both need the final public URL as input, so getting the site live first means
configuring those screens once instead of twice.

| # | Stage | Done when |
|---|---|---|
| 0 | Repo, `CLAUDE.md`, `index.html` + pool JSON + fetch script, `.gitignore`, `.nojekyll` | one commit; `git check-ignore -v .env` matches |
| 1 | Deploy to Pages as-is; **verify card art still loads over HTTPS** | the live URL works on a phone |
| 2 | Audit persisted state, adapt + run the migration, confirm RLS | anonymous role returns zero rows |
| 3 | Auth UI: sign up / in / out / password reset, email + Google | an account exists in `neon_auth` |
| 4 | `save`/`load` → Data API, anonymous path, **merge on signup** ← RISK | signed-out deck survives account creation; two accounts can't see each other |
| 5 | Multiple named decks: list, rename, duplicate, delete | three decks, switchable |
| 6 | Collection tracker + "what am I missing" view | works on phone |
| 7 | Showcase / base-card 3-copy limit | 3 base + 1 Showcase gets flagged |
| 8 | Multi-set (Origins + Spiritforged) + the multi-game frame | both sets browse, scope chips filter only the browser, a cross-set reprint shares one limit |
| 9 | Pokémon TCG — all 174 English sets, per-game rules, per-game collection | the game switcher round-trips, a 60-card deck validates only at 60, a 5th copy by name across two printings is flagged, collection caps at 4 there and 3 in Riftbound, a legacy flat collection lifts, Riftbound is pixel-identical |

**Stage 1 caveat**: card art currently loads from a `file://` page. On an HTTPS origin,
a CDN sending restrictive CORS or hotlink-protection headers fails differently. Check
the live page, not just localhost. If art breaks there, that's a redesign, not a bug
fix — surface it immediately.

**Stage 4 caveat**: the merge case has a nasty shape. Someone builds a deck signed
out, hits sign up, gets a confirmation email, leaves the tab, clicks the link, and
lands in a **fresh page load**. Handle "session arrives after a page reload," not just
"session arrives after a button click."

Not in this list, deliberately: there is no keep-alive stage, no uptime monitor, and
no cold-start UI. Scale-to-zero removed all three.

---

# How to work

## Autonomy — the important part

**Never stop mid-build to ask a question and wait.** A stalled session that needs a
reply to continue is worse than one that made a reasonable call and said so. Run the
whole stage end to end.

### Minor decisions → decide it yourself, log it, keep moving

Anything where two reasonable choices lead to a result the author wouldn't notice or
would accept either way:

- Naming: tables, columns, functions, files, CSS classes, commit messages
- Layout, spacing, colors within the existing palette, button placement, copy wording
- Which ESM CDN; which index to add; helper function extraction
- Error message text, loading state design, toast vs. inline error
- Test structure and how much to test
- Whether to refactor a function you're already editing

Log each as **one line** in `docs/DECISIONS.md`: what you chose, what you rejected.

### Major decisions → skip it, stub around it, log it, keep moving

Anything that costs money, risks data, changes agreed architecture, or produces
behavior the author would visibly disagree with:

- Anything that would leave the free tier or incur a charge
- Anything that deletes, overwrites, or irreversibly transforms user data
- **Merge-on-signup behavior** — the author wants to decide this one
- Whether account deletion can cascade to decks, if Neon's schema won't allow it
- Relaxing the no-build-step rule, or adding a runtime dependency
- Touching the Riot legal notice, or anything involving card art hosting
- A schema change that would need a destructive migration once real data exists
- Anything where you catch yourself writing "I'll assume the author wants…" about
  something they'd actually care about

For these: **do not guess and do not stop.** Pick the most conservative placeholder
that keeps the build working — a stub, a safe hardcoded default, a disabled control
with a tooltip — mark it `// TODO(decision): <one line>`, and log it in `docs/BLOCKED.md`
with:

1. What the decision is
2. The options, with the tradeoff in one sentence each
3. What you stubbed so the build still runs
4. What breaks or stays disabled until it's decided

**A deferred decision must never leave the app broken or the stage half-finished.**
Build around the gap. If a gap genuinely can't be built around, finish everything else
in the stage and say so clearly.

### Missing external setup is not a blocker either

Google OAuth credentials are configured in the Neon Console and won't exist until
after stage 1. Don't wait on them. Write the code as if they were present, read config
from a placeholder, note it in `docs/BLOCKED.md`, and continue.

### At the end of every session

Output two short lists: decisions made, and decisions deferred. Nothing else — no
summary of what the code does. Commit per stage so each is reviewable on its own.

## Everything else

- **Verify before asserting.** Don't guess API field names, endpoint paths, SDK method
  signatures, or free-tier limits from memory — check the docs or the actual data
  file. The author has been burned by confident wrong answers about both.
- **When you can test something, test it, and show the result** rather than claiming it
  works. Don't ask permission to run tests; just run them.
- **Say plainly when something isn't possible** instead of building a degraded version
  and letting the author discover it. Sandbox restrictions, CDN policies, and hosting
  limits have already cost two rebuilds.
- **Prefer editing the existing file over rewriting it.** Targeted replacements, not
  full re-emissions of a 900-line file.
- **Flag correctness bugs you notice in passing**, even when you weren't asked.