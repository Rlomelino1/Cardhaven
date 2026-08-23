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
generalisation beyond that. See **Architecture & core logic** below.

## Architecture & core logic

The app is one HTML file with no build step: three inline scripts and one inline
stylesheet. Two of the scripts are classic scripts holding the app, the third is a
module holding auth and the Data API client. The code carries no comments by policy —
this section is where the reasoning lives, and anything not here is an implementation
detail that was deliberately left undocumented.

### One app, two games: the registry and its adapters

`GAMES` is a registry with one entry per game. An entry owns the game's identity (`id`,
`label`, two-letter `mark`), its sets or its set *manifest*, its `zones`, its filter
axes, its `rules`, its localStorage key names, and a list of adapter hooks —
`normalize`, `refOf`, `cardKeyRef`, `cardLabelRef`, `setCode`, `deckCode`, `numLabel`,
`tileMeta`, `tileBadges`, `modalMeta`, `colTag`, `searchMatch`, `validate`, `blockAdd`,
`deckStats`, `deckSections`, `rowBadges`, `deckRowCounts`, `deckText`, `parseDeckText`,
plus the `artPlaceholder`, `legal` and `cardBack` values.

`ACTIVE_GAME` names the running game, `GAME` is the resolved entry, and `adoptGame()` is
the single place a switch takes effect: it re-points the mutable aliases (`ZONES`,
`DOMAINS`, `TYPES`, `RARITY_ORDER`, `DOMAIN_INK`, `RARITY_DOT`) so no call site ever asks
which game is running. Adding a game is one registry entry plus one vendor script; there
is no plugin system and no schema generalisation beyond the hooks.

**The legal disclaimers are registry data too**, which is what keeps the footer from
growing a permanent paragraph per game. Each entry carries a `legal` string; `adoptGame()`
writes the active game's into the footer with `textContent`, so only the disclaimer that
belongs to the assets actually on screen is shown. One generic line is always visible
beside it, and it opens a **Legal notices** modal that iterates `GAME_IDS` at open time
and lists every entry that has a `legal` field. A future game's notice therefore appears
in both places as soon as its registry entry has the string, with no markup to touch.
`PLANNED_GAMES` entries deliberately have none: they are label-only placeholders with no
assets on the site yet.

Two constraints are easy to trip over. Adapter functions must be declared **above** the
registry, because the `GAMES` object literal evaluates its hook references at load time
and an arrow function defined afterwards is a temporal-dead-zone crash on boot. And the
game dropdown switches **in place** rather than reloading, because a reload would discard
an unsaved deck instead of asking about it.

Two fields keep a Riftbound name for a game-neutral job and are deliberately not
renamed: `domains` is the coloured filter axis (Riftbound domains, Pokémon energy types)
and `type` is the primary type axis (Riftbound card type, Pokémon supertype). Every
exported deck file already uses those names, so renaming them would break importing files
that already exist.

### Eager sets, lazy sets, and the search index

Loading strategy is per game, chosen by `lazySets`.

Riftbound is **eager**: both sets are fetched in parallel and merged into one in-memory
pool, and a set that fails to load fails the whole load by name with a retry — a partial
pool would present as a deck full of unresolved cards and a collection full of holes.

Pokémon is **lazy**: 174 sets, 20,444 printings. The set manifest and a global search
index load when the game activates; a set's full pool loads only when that set is opened,
then stays cached for the session.

The search index is the load-bearing idea, and it is the **deck-resolution** layer rather
than just a search layer. A 60-card deck spans many sets while only the open set's pool
is in memory, yet deck rows and the copy limit still have to resolve. So `findCard()`
falls back to the index and returns a **light card** (`light: true`) carrying name, set,
number, image and a Basic Energy flag — everything a tile, a deck row and the copy limit
need. The card modal fetches the card's real set on demand to fill in HP, types and
formats. Three consequences follow:

- The index carries a sparse Basic Energy flag, because the copy-limit exemption has to
  be answerable without loading any pool.
- Cross-set search runs off the index, but the filter chips read fields the index does
  not carry. So when any chip is active, search stays inside the loaded set, and the
  result count says which of the two happened. Silently ignoring an active filter would
  be worse than saying so.
- A lazy game has no aggregate collection grid, because 20,444 tiles is not a page. Its
  collection is always set-scoped, and both the whole-game total and the per-set owned
  counts come off the index — which is how the set picker shows progress for a set whose
  cards were never fetched.

### Card identity is two layers, and the two views want opposite things

The deck builder and the collection tracker want opposite behaviour from the same data,
and collapsing them breaks one of the two. For deck legality a base printing and its
Showcase printing are **one card** sharing one copy limit. For the collection they are
**two distinct objects**, because owning the Showcase specifically is the entire point of
collecting it.

So the collection keys on the full printing ref and nothing else, while deck legality
derives a separate grouping in two layers:

1. **Within a set**, `copyGroupRef()` strips the variant suffix from the middle id
   segment, so `ogn-039a-298` and `ogn-039-298` are both card `ogn-039`.
2. **Across id groups**, `cardKey()` folds groups together by the **base printing's**
   name — the group member whose id carries no variant suffix — with the trailing
   `(Alternate Art)`, `(Signature)` or `(Overnumbered)` marker stripped off that one name
   only. Suffixes are never stripped from arbitrary variant names to build a key: a group
   can hold `X (Overnumbered)` and `X (Signature)` and no bare `X` at all.

Riftbound needs the second layer because it defines identity for legality by *name*: the
copy limit is on named cards and a reprint is the same card. On the real merged pool that
is 640 printings, 562 id groups, 520 cards. All 42 merges are genuine, and they are not
only cross-set — 29 are within-set merges that layer one alone misses, because a set's
overnumbered Showcase printings get their own collector number rather than a suffix on
the base card's.

Name grouping is only correct while two genuinely different cards never share a name.
That is a property of the data rather than an assumption, so it is asserted by a test
that compares gameplay fields across every merged group and goes red the day it stops
holding.

### Deck rules per game, and where a rule is enforced

| | Riftbound | Pokémon |
|---|---|---|
| deck size | per-zone targets (40+ main, 12 runes, 3 battlefields, 0-or-8 side) | exactly 60, one zone |
| copy limit | 3 | 4 |
| counted by | printing group, then folded across id groups by the base printing's name | card name, across every printing in every set |
| exempt | — | Basic Energy, entirely |
| one per deck | — | ACE SPEC and Radiant, each counted across all such cards, not per name |
| must contain | a Legend | at least one Basic Pokémon |
| collection cap | 3 | 4 |

The copy limit spans main deck **plus** sideboard, per Riftbound's tournament rules;
runes and battlefields are separate decks under their own rules and are not counted.

Pokémon has no Legend, no domains and no per-card energy cost, so the Legend box, the
energy curve and the zone tab row **hide** rather than render empty frames. Format
legality is stored and never enforced.

Enforcement splits cleanly, and the split is deliberate:

- **Add time blocks.** One `addBlock()` gate is run by *both* add paths — the browse
  tile's button and the deck row's `+` stepper. Those two once disagreed, because the
  stepper ran no gates at all, which let a 60-card deck reach 63 and a single ACE SPEC
  reach three. A new add-time rule goes in that gate or it will be half-enforced. A
  blocked add carries its reason on the disabled control; only a subtype refusal also
  writes to the notice line, because the deck-size case is already visible three times
  over.
- **Validation only advises.** A deck that *arrives* over size or over cap — an import,
  an old blob — is reported, never rejected, and `−` always works. The gate stops the app
  *building* an illegal deck, not opening one. `deckSizeExact` is null for Riftbound,
  whose main deck is 40 or more, so the size gate is inert there.

### The Pokémon deck panel

All of it renders from one hook, `GAME.deckStats`, into one container, so Riftbound —
which declares no such hook — cannot be reached by any of it.

**Mulligan odds are exact**: `C(n-b,7)/C(n,7)` in BigInt, against the deck's actual size
rather than an assumed 60. BigInt is not for the result, which fits a double, but for the
intermediates that a naive factorial overflows. Reference points: 15 Basics gives 11.8%,
12 gives 19.1%, 10 gives 25.9%.

**The type-alignment strip matches attack costs, not the Pokémon's own card type.**
Card-type matching false-flags a Colorless-cost attacker as needing energy it never asks
for. Colorless generates no requirement, and any Special Energy in the deck suppresses
the warning outright rather than modelling what each one provides. It is a soft hint and
never blocks anything.

**Evolution grouping is by name**, because `evolvesFrom` is a name reference upstream —
the same name-over-printing axis the copy limit uses. Two printings of one pre-evolution
attach the line to the first of them, and an evolution whose pre-evolution is absent gets
a muted mark rather than an error, because running one is legal and sometimes deliberate.

The panel needs `supertype`, `subtypes`, `costs` and `evolvesFrom` for every card in the
deck, and the search index carries none of them. Putting them in the index measured at
+24% on a 2 MB file every visitor downloads, including visitors who never open a deck. So
the deck's own set pools are fetched on demand and cached instead, the same
detail-on-demand move the card modal already makes. The price is a real pending state:
while `DECK_DETAIL_PENDING` is non-zero the panel draws only what it can stand behind and
the subtype-scoped legality checks stay **silent**. That silence is deliberate — a deck of
Basics must not be told it has no Basic Pokémon because its Pokémon have not arrived yet.

**Copy as text** emits the Limitless/PTCGL sectioned format and Import reads it back,
resolving on `(set code, collector number)` and never on the name, because names carry
parentheses, digits and apostrophes. Nine of the 20,432 code/number pairs are shared by
two printings; first wins, and both are the same card by name and number. `sets.json`
carries `ptcgoCode` for 149 of the 174 sets — "SVI" where the internal set id is "sv1" —
and the rest fall back to the uppercased id, because without it a copied list names its
sets in a way Pokémon TCG Live does not recognise.

### Card motion: grid tilt and the modal flip

Two effects, both of them opt-out rather than opt-in for the browser.

**Grid hover tilt.** A hovered `.frame` lifts and tilts toward the cursor — the corner under
the pointer presses in, the opposite corner rises, capped at 7° per axis. The transform is
driven by two custom properties (`--rx`, `--ry`) that CSS reads, so the JavaScript only ever
writes two numbers and never touches layout. Listeners are **delegated from `document`**, not
attached per tile: shelves re-render constantly and can hold hundreds of frames, and delegation
survives every re-render with nothing to rebind. The bounding rect is measured once on pointer
enter and re-measured on scroll, and writes are gated behind `requestAnimationFrame` so
intermediate pointer moves between frames are dropped. `will-change: transform` is set by the
`:hover` rule alone — applying it globally would mean hundreds of permanent compositor layers,
which costs more than it buys.

The whole effect lives behind `@media (hover:hover)` and is switched off again under
`prefers-reduced-motion: reduce`, in both the CSS and the JavaScript, leaving those users the
brightness bump the grid always had. Keyboard focus gets the lift without the tilt, there being
no pointer to track. Flagged tiles keep their warning ring while hovered, which needs an
explicit rule because the lift's shadow would otherwise replace it.

**Modal flip.** The card art in the modal is a standard 3D flip: a scene with `perspective`, a
flipper with `preserve-3d` and a transform transition, and two faces with `backface-visibility:
hidden`, the back pre-rotated 180°. Rotation is Y-axis only, so the card reads as turning on a
spit rather than tumbling.

Two ways to turn it: a click on the art, and **dragging the art left or right**. There is no
flip button — the card is the control. The drag is the interesting one,
because it is *interactive* rather than a gesture that triggers an animation. While the pointer
is down the transition is switched off and the rotation is written straight from the pointer
offset, so the card turns exactly as far as the hand moves — a full 180° costs 60% of the card's
width. On release, past halfway commits the flip and anything short of halfway returns, easing
from wherever the card happened to be. So abandoning a drag genuinely almost-flips and falls
back, rather than snapping.

**Rotation is an accumulating angle, not a boolean.** The first version pinned the resting state
to a `.flipped` class carrying `rotateY(180deg)`, which meant a leftward drag could only settle
by unwinding 315° back the other way — it visibly spun the wrong direction to get there. The
angle is now kept as a running total and the card settles at `base ± 180` in whichever direction
the hand went, so it always turns the way it was pushed. `.flipped` survives as a state marker
for parity, not as the source of the transform.

**The turn is clipped while it runs.** A card rotating under perspective projects a near edge
taller than the card itself, which pushed a scrollbar into the modal whenever the box was
already at its `90vh` cap. `#modalBox` takes `overflow:hidden` for the duration of the gesture
and the settle, so the transient growth cannot produce a scrollbar; at rest the modal scrolls
normally.

The drag also has to not do three things: close the modal (the backdrop's click is swallowed
once after any real drag), select the card as text (`user-select:none` plus a prevented
default), or fight vertical scrolling on touch (`touch-action:pan-y`). The scene owns the whole
gesture, which is why it carries no `data-a` — leaving the delegated click handler in place
alongside the pointer handler would have flipped twice and looked like nothing happened.

Reduced motion keeps both controls and drops the animation: the faces swap instantly and the
drag stops tracking, committing or cancelling on release instead.

Note the accessibility consequence of having no button: flipping is pointer-only, so there is
no keyboard or assistive-technology path to the back face. The card art is an image, not a
focusable control.

**The back faces are registry data.** `cardBack(c)` is a function rather than a string because
Riftbound has three backs keyed by card type — black for Legends and Battlefields, white for
Runes, blue for everything in the main deck — while Pokémon has one for all cards. Both are
hotlinked like the fronts and carry the same `referrerpolicy="no-referrer"`. They are fetched
only when a modal opens, never on page load.

The two backs are not framed the same way, and the CSS has to know it. Riftbound's scans bleed
to the edge, so they take the same 8px corner as everything else. Pokémon's Bulbagarden scan is
a rounded card inscribed in a square image, with white pixels in the corners — measured at 28px
on a 745×1040 file — so an 8px corner left four white notches showing. The Pokémon back alone is
rounded to `4.2% / 3%`, which reproduces that 28px corner at any rendered size. It hangs off the
`game-pokemon` body class rather than a new registry field, since it describes one image rather
than a rule of the game. Pokémon *fronts* need nothing: their art bleeds to the edge.

Neither back host is a publisher CDN: Riftbound's are a pinned commit in a fan-maintained image
repo and Pokémon's is a wiki archive. That is exactly why a failed back image is not left
broken — it swaps silently to a generated SVG back built from the registry's own `mark` and
`label`, with no user-facing notice, since a missing *back* tells the reader nothing useful. The
same SVG serves any game that has no `cardBack` at all. The front face keeps its own separate
error path, so the missing-art notice still fires for a front that genuinely has no image.

### Storage

- **`decks.game`** scopes deck rows. A deck is bound to its game at creation and never
  moves, because its payload holds refs that only mean anything inside that game's pool.
  The auth module reads the active game **live** on every query rather than caching it —
  a cached value would list one game's rows on the other game's screen. An export names
  its game, and importing one game's export into the other is refused by name rather than
  landing as sixty unresolved entries.
- **The collection blob is nested by game**: `{riftbound:{ref:qty}, pokemon:{ref:qty}}`,
  still one row and one sync engine. A pre-nesting **flat blob is lifted, never rejected**,
  and written back nested on the next sync; the shape is decided by inspection, never by
  trust. Clamping is per owning game.
- **localStorage.** The four original Riftbound keys (`riftbound-deckbuilder-v1`,
  `rb.collection`, `rb.variants`, `rb.open-deck`) *are* the Riftbound namespace and must
  never be renamed, because renaming orphans every existing browser's local state. Newer
  per-game keys carry the game id. `rb.theme` and `ch.game` are app-level, and
  `rb.collection` is shared by every game and holds the nested blob.

### Auth and the session

Accounts are Neon Managed Better Auth; data is Neon Postgres through the Data API, with
Row Level Security as the authorization layer. There is no backend service: the browser
talks to Postgres over HTTPS with a JWT. The two Neon URLs sit in plain sight in this
file by design — nothing behind them works without a valid JWT, and **RLS is the security
boundary**.

The session is a **partitioned (CHIPS) cookie**, and the flow is not obvious:

- Google's callback returns to the app with a one-time verifier in the query string
  (`?neon_auth_session_verifier=...`). The next `getSession()` call trades it for the
  session cookie, so `getSession()` is the OAuth **return leg**, not merely a session
  read. The SDK's own interceptor reads the param out of `location.search`, appends it to
  the request and sends credentials; nothing in this app hands it over. Calling
  `getSession()` on load is the whole integration, which is also why it hangs off the
  load path rather than off any button — the email-verification link lands in a fresh tab
  that never saw the sign-up form.
- The response sets `__Secure-neon-auth.session_token` for 7 days with `HttpOnly`,
  `Secure`, `SameSite=None` and **`Partitioned`**. Partitioning is the mechanism that
  makes this work at all, because it is what lets the cookie survive in a third-party
  context.
- The challenge cookies Neon sends up are spelled **`session_challange`**. Grepping for
  `challenge` finds nothing.
- A failed session read is **not** the same as being signed out: a blocked cookie, a CORS
  failure and an expired session all land in the same place, and painting "Sign in" for
  all three hides which one happened.
- Better Auth's error codes are not one vocabulary. The endpoint answers a bad sign-in
  with `INVALID_EMAIL_OR_PASSWORD`, while the thrown client error carries
  `invalid_credentials`, and the message text is rewritten too. Both spellings are
  matched, and the client one is what actually fires.

Signing in **merges** the signed-out deck into the account as an additional deck, for
every game rather than only the one on screen, because the handoff runs exactly once per
session and a deck left behind would sit in localStorage unimported. Only the active
game's import is opened on the table.

### The Data API client, and one lesson it paid for

The token getter is `getSession()` then `session.token`, which the auth SDK has already
swapped for the JWT the server returns in its `set-auth-jwt` header. `getSession()` is
cached by the SDK with the JWT's own expiry, so this costs no round trip per query. Every
normal token fetch also stashes the JWT, because the collection sync's flush-on-tab-close
has to issue a keepalive fetch synchronously inside `pagehide`, with no time for an async
lookup. Every cloud result is flattened to `{data, error}` so the app never has to know
PostgREST's error shape.

The collection write is an upsert carrying only the collection column, so the settings
column cannot be clobbered. The lesson worth keeping: **a read that does not come back as
an array is a failed read, not proof that the server is empty.** Treating one as "no row"
once destroyed a real collection, because the write that followed replaced it with `{}`
through the upsert. Two rules came out of that — nothing local to contribute means
nothing is written, whatever the read said; and "no row reported *and* nothing local" is
resolved by creating the row only if it is genuinely missing (`ON CONFLICT DO NOTHING`,
so an existing collection is never touched) and then reading again. After that, "no row"
can only mean the read is failing, which is reported so the retry path can recover.

Merging server and local collections is **max per printing, within each game**. Summing
would double-count the same physical cards and overwriting either side destroys data.

### The CSP is load-bearing

`script-src` contains no `'unsafe-inline'`. It names each inline script by sha256 instead,
plus `'self'` for the vendored SDK's module imports. That is what makes the escaping in
this app worth anything: with `'unsafe-inline'` a missed `esc()` is an XSS, and without it
the same miss is inert markup. Two rules follow, and breaking either gives a blank page
rather than a warning:

1. **Edit an inline script, then rehash it**: `node scripts/csp-hashes.mjs --write`. The
   e2e suite fails if you forget, and `main` will not merge a red suite, so the worst case
   is a caught mistake rather than a dead site.
2. **`index.html` stays LF**, pinned by `.gitattributes`. Windows checks out CRLF while
   Pages serves the LF that git stores, and a hash can only match one of them.

There are **no inline event handlers**, and there must not be new ones — the policy would
refuse to run them. Controls carry `data-a` (the action) and `data-a1..3` (its arguments),
dispatched by one delegated listener through the `ACTIONS` map. Card art uses two
capture-phase listeners keyed on `data-card`, because `error` and `load` do not bubble.
This is also why no JS-string escaper exists: nothing has to survive the HTML parser and
then the JS parser, so `esc()` alone is correct everywhere. Reaching for a JS-string
escaper means an inline handler is being added.

One related gotcha: `csp-hashes.mjs` blanks HTML comments before scanning for scripts,
because a comment merely *mentioning* a script tag would otherwise be counted as one and
shift every hash after it.

### Data pipeline and card art

Each game keeps its own best source and its own vendor script, and every source is
transformed into one internal card shape. There is no unified external API and no attempt
to find one. Riftbound comes from the Riftcodex API via `build-pool-v2.mjs`; Pokémon comes
from the `PokemonTCG/pokemon-tcg-data` GitHub repo — raw JSON, no key — via
`build-pokemon-pools.mjs`. Neither is a build step: both are re-runnable maintenance tools
whose output is committed. The live pokemontcg.io API is deliberately not used.

Adding a set is a data-only change. Nothing in `index.html` switches on a set code — set
identity travels on each card's own `set` field and on the set-prefixed ref — and a change
that needs `if (set === ...)` is a signal the design has drifted.

**Card art is hotlinked, and the URLs are copied verbatim from the source rather than
rebuilt from a pattern.** Most Pokémon sets serve art from `images.pokemontcg.io`, but the
four Mega Evolution sets serve cards, set symbols and logos from `images.scrydex.com` under
a different path shape. A reconstructed URL is wrong for 661 cards today and will be wrong
again the next time upstream moves hosts.

**The art host lies about missing images, and the page has to notice.**
`images.pokemontcg.io` answers a card it has no image for with HTTP 404 *and* a decodable
PNG of the card back, so an `<img>` fires `load` rather than `error` and an `onerror`
fallback never runs — the card back renders as though it were the card, with the real name
and HP beside it. The tell is the size: the placeholder is 640×892, which is neither a real
small (245×342, or 240×330 on the oldest sets) nor a real hires (734×1024).
`GAME.artPlaceholder` declares those dimensions per game — Riot's CDN 404s properly, so
Riftbound declares none and never even emits the handler — and the load handler swaps in
the app's own fallback art. Checking on load costs no request, catches cards that break
upstream later, and heals itself when real art appears. 52 of the 20,444 images are
affected today; detection is by dimension, never by a blocklist.

The Pokémon card schema is slimmed deliberately. `supertype` and `subtypes` are kept
verbatim because they drive the Energy exemption, the filter chips and the ACE SPEC and
Radiant rules. `number` stays a **string**, because collector numbers include `GG69`,
`TG12` and `SV107`. `evolvesFrom` is kept as the upstream *name*, and `costs` is the
deduped union of every attack cost symbol on the card with the `Free` token dropped.
Absent fields are omitted rather than written as `null`, because at 20,444 cards the nulls
alone are hundreds of kilobytes. Attack text, abilities, weaknesses and retreat costs stay
unvendored; anything wanting damage numbers or effect text is a re-vendor and a size
conversation, not a client change.

### The vendored SDK

The Neon SDK is vendored under `vendor/neon/` so the app loads it from its own origin
rather than a transforming CDN at runtime. `index.html` imports **`bundle.mjs`**, one file;
the 132 individual modules stay committed beside it purely as the audit trail for a version
bump, and nothing fetches them. Measured over HTTP/2, which is what Pages serves: the graph
costs 232 KB across 132 requests and the auth module reports at 10.6s on a slow-3G profile,
while the bundle is 135 KB in one request and reports at 7.0s. First paint and
time-to-cards do not move either way, because the card pool wins that race regardless — so
the win is entirely how fast a signed-in user's decks appear.

The names the bundle exposes are listed as `ENTRIES[].expose` in `scripts/vendor-neon.mjs`
and must match `index.html`'s import, or tree-shaking drops what the page then asks for.
`node scripts/vendor-neon.mjs --bundle-only` rebuilds the bundle from the committed modules
with no network. esbuild is fetched by `npx` at a pinned version when that script runs; it
is not a dependency of the app, not in `package.json`, and nothing runs it to serve, test
or deploy the page.

One measurement caveat worth keeping: **do not measure load performance on a server that
does not compress.** An earlier pass put time-to-cards on slow 3G at 22 seconds and blamed
the module graph; the test server was serving the page and the pools uncompressed. With
gzip it is around 4 seconds on HTTP/1.1 and HTTP/2 alike.

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

This README is the only documentation in the repository. Decision logs, runbooks,
mockups and audit notes are kept outside it and are not published.

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
