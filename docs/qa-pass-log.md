# QA pass — stage 9 dogfood, 2026-08-21

A hands-on pass over the local build (`node tests/serve.mjs`, driven with Playwright at
1440px and at 390/360px), playing three users: a new visitor, a Riftbound deck builder,
and a Pokémon collector. Baseline before any change: **95 tests green**. After:
**106 green**, 11 of them added here.

**Auth:** every signed-in flow was exercised against a **mocked `window.cloud`** in the
page, not a live Neon session — `localhost` is not a trusted origin for the Managed
Better Auth client. What that does and doesn't prove is under UNTESTED. One caveat worth
recording for the next person who mocks a session: the real vendored auth module
dispatches `onCloudSession(null)` when its own `getSession` resolves, seconds into the
page, which silently drops a mocked session back to local mode. It cost a false
"switching games signs you out" finding here. Swallow the late null dispatch before
trusting a mocked session.

**Console:** attached for every run — `console.error`, `console.warning`, `pageerror`,
`requestfailed`, and every HTTP >= 400. **Not one uncaught exception, failed fetch, 404
or CSP violation, in either game, at either width, in any scenario.** Every bug below is
behavioural or visual; none of them announced itself in the console, which is why this
had to be a screen pass rather than a log pass.

**Riftbound regression:** the full Riftbound walkthrough was re-run after all nine fixes
and every readout came back byte-identical to the pre-fix run — notice line, result
counts, set scope, validation banners, checks, zone tabs, collection stats, stepper caps.
Two fixes touch shared code (F6, F2) and the reasoning for why they're safe there is in
each entry.

---

## FIXED

Nine bugs, one commit each, most-severe first. Two of them (F2, F6) touch code Riftbound
shares; each entry says why that is safe.

### F1 — Clicking a card name in a Pokémon deck list did nothing · `b27e4ad`
*Breaks flow.* Every row of every Pokémon deck was a dead button.

- **Did:** built a Pokémon deck, clicked a card's name in the deck panel.
- **Expected:** the card modal, as in Riftbound.
- **Got:** nothing. No modal, nothing in the console.
- **Cause:** the row's handler was `openCard(c.riftboundId || c.name)` — a line older
  than the second game. A Pokémon card has no `riftboundId`, so it handed the card's
  *name* to a resolver that wants a ref, and `findCard()` correctly found nothing.
  Riftbound worked only because the field happened to be there.
- **Fix:** pass `refOf(c)`, the identity every other call site uses.
- **Test:** `pokemon.spec.js` › "a deck row opens the card modal".

### F2 — Card-tile badges were unreadable in the Paper theme · `54e5f14`
*Wrong but usable — an entire class of badge invisible.* Worst on Pokémon, where **every**
tile carries an HP badge and a regulation mark; it hit Riftbound's Showcase / alt-art
badge too, so this one predates stage 9.

- **Did:** switched to Paper and looked at the card grid, both games.
- **Expected:** readable badges, like the set code sitting next to them.
- **Got:** solid dark rectangles. Measured: `.variant` ink `rgb(33,29,21)` and `.regmark`
  ink `rgb(61,55,43)` on a `rgba(10,8,18,.85)` chip — near-black on near-black.
- **Cause:** both rules take ink from `var(--text)` / `var(--text2)`, which inverts with
  the theme, while the chip behind them is a hardcoded dark wash over card art. The
  neighbouring `.setbadge`, `.ctag` and `.cnum` rules already pin their ink and say why
  in a comment; these two didn't.
- **Fix:** pin the ink on both, the same way and for the stated reason.
- **Safe for Riftbound?** It changes a Riftbound pixel — in Paper only, and only from
  "unreadable" to "readable". Pixel-identity was a stage-9 promise about not *regressing*
  Riftbound, not a promise to keep a pre-existing contrast bug.
- **Tests:** `smoke.spec.js` › "tile badges stay legible in the Paper theme" (Riftbound
  `.variant`) and `pokemon.spec.js` › "the regulation mark and HP badges stay legible in
  Paper". Both assert the ink is *pinned* — identical across themes — and light enough to
  read, so the same mistake can't come back through a different variable.

### F3 — A rarity filter survived a set change and silently emptied the browser · `855dca3`
*Breaks flow.* The most convincing "this app is broken" screen in the pass.

- **Did:** opened Scarlet & Violet base, filtered to **Double Rare**, opened the Base set
  (which has no Double Rare).
- **Expected:** the filter clears, or something explains the emptiness.
- **Got:** "0 CARDS", an empty grid, and **no lit chip anywhere to turn off** — the rarity
  row is built from the open set's own rarities, so the chip holding the filter isn't
  rendered at all. Reproduced twice. Indistinguishable from a set that failed to load.
- **Cause:** `S.rarityFilter` was never reconciled against the pool that replaced it. The
  set scope already gets exactly this treatment two lines away in `adoptPool()`.
- **Fix:** `adoptPool()` drops rarity values the incoming pool has no card for. A no-op
  for Riftbound, whose pool is every set at once.
- **Test:** `pokemon.spec.js` › "a rarity filter the newly opened set has no card for is
  dropped" — asserts the filter empties, tiles come back, *and* no chip is left lit.

### F4 — "Show all N" showed only the open set's worth on a cross-set search · `9ab0c50`
*Wrong but usable.*

- **Did:** with a 64-card set open, searched `ex` — 3,133 hits across all 174 sets — and
  clicked **Show all 3133**.
- **Expected:** 3,133 tiles.
- **Got:** 64 tiles, and the pager still offering "Show all 3133" — so the button read as
  broken rather than as finished.
- **Cause:** the handler set `S.limit = S.pool.length`, which *was* the result count back
  when the pool was the only thing searched. A cross-set search resolves off the index, so
  pool size and result size parted ways.
- **Fix:** the pager raises the limit to the count the last render actually matched.
- **Test:** `pokemon.spec.js` › "Show all on a cross-set search really shows every hit" —
  also asserts both pager buttons then hide, which is what made the old behaviour look
  broken.

### F5 — Switching sets mid-load landed on whichever set was slower · `0fb1b51`
*Wrong but usable (race).*

- **Did:** clicked a slow set, then a different set 200ms later.
- **Expected:** the set clicked last.
- **Got:** the *first* one — its fetch resolved second and overwrote everything. Pool,
  picker label and notice line all agreed on the set nobody asked for, which is the hard
  kind of wrong to notice. Reproduced twice behind a 2.5s route delay.
- **Cause:** `openSet()` had no notion of a superseded request; last to resolve won.
- **Fix:** a generation counter; a load that is no longer the newest is dropped on
  arrival. It still populated `POOL_CACHE` on the way, so the abandoned fetch isn't
  wasted. `switchGame()` bumps the same counter, so a Pokémon set landing after a switch
  to Riftbound can't drop its cards into the other game's pool — a second race the fix
  closes for free.
- **Test:** `pokemon.spec.js` › "the last set clicked wins a mid-load switch" — asserts
  the pool, the picker label and the persisted key, and that the abandoned fetch is
  cached anyway.

### F6 — Adding a second printing bumped the first printing instead · `9f73885`
*Wrong but usable.*

- **Did:** added Base-set Pikachu from the browser, then Jungle Pikachu.
- **Expected:** two rows, one per printing — which is exactly what the deck panel draws
  when the same deck arrives from storage or an import.
- **Got:** one row, `base1-58 ×2`. The printing actually clicked never entered the deck.
- **Cause:** `addCard()` merged on `nk(c.name)`. Under Riftbound's data that is
  interchangeable with the ref; Pokémon reprints one name set after set.
- **Fix:** merge on `refOf`, the identity every other call site uses.
- **Safe for Riftbound?** Yes, and now provably: **no two printings in the 640-card
  merged pool share an exact name** (measured, zero collisions). That property is now a
  test rather than an assumption, so if a future set ever ships two printings under one
  identical name, the reasoning behind this change gets revisited instead of quietly
  ceasing to hold.
- **Tests:** `multiset.spec.js` › "no two Riftbound printings share an exact name", and
  `pokemon.spec.js` › "two printings of one card are two deck rows, under one copy limit"
  — the second half matters: separate rows must still share the one 4-copy name limit.

### F7 — The collection's "copies logged" readout counted only the open set · `37f811b`
*Wrong but usable — a readout that lies.*

- **Did:** logged 4 copies in one Pokémon set and read the header.
- **Got:** "On this device only · 4 copies logged", directly above a panel correctly
  saying "0 of 20,444 logged across all sets". Copies logged in any other set simply
  dropped out of a number presented as a total.
- **Cause:** it summed `colCopies(S.pool)`, and for a lazy game `S.pool` is one set.
  `colLoggedPrintings()` already solves precisely this off the search index; the copies
  count didn't follow.
- **Fix:** a `colLoggedCopies()` beside it, same rule — whole map, narrowed to refs the
  index can place.
- **Test:** `pokemon.spec.js` › "the copies readout spans every set, not just the open
  one" — seeded across two unopened sets plus one unplaceable ref, asserting the
  unplaceable one stays excluded and no pool gets fetched to answer.

### F8 — Collector numbers used the file count as their denominator · `4ebbc00`
*Cosmetic. 6 of 174 sets.*

- **Did:** opened SM Black Star Promos and Scarlet & Violet Energies.
- **Got:** `SVP 001/165` against a printed `/75`; `/16` against a printed `/8`.
- **Cause:** `pkSetTotal()` read the manifest's `cards` — what the repo holds — where a
  printed collector number wants `total`, what the set officially contains. The manifest
  carries both and the vendor script's own comment draws the line. They agree for 168
  sets, which is why it wasn't obvious.
- **Fix:** `pkSetTotal()` prefers `total`. Progress counts still use `cards`.
- **Test:** `pokemon.spec.js` › "a collector number's denominator is the set total, not
  the file count" — asserts the fixture itself (that some set still disagrees), so a
  re-vendor that makes them all agree fails loudly instead of turning the test into a
  no-op.

### F9 — Three dropdowns ran off the right edge of a phone screen · `04a8514`
*Wrong but usable (game menu), cosmetic (the other two).* Measured at 390px and 360px;
the page never gains a horizontal scrollbar, so the overflow is simply unreachable.

| control | right edge @390px | overflow |
|---|---|---|
| `#gameMenu` | 456 | **66px** — the Active / Switch labels off-screen |
| `#deckMenu` | 409 | 19px — clips the delete ✕ |
| `#setPickPanel` | 398 | 8px — clips the border and the card counts |

- **Cause:** all three are absolutely positioned against a small wrapper sitting well into
  its row, with a `max-width` in `vw` that knows nothing about that offset. The deck menu
  has a `right:-40px` phone rule from stage 5 that helps without finishing the job; the
  other two never got one.
- **Fix:** on a phone, take the wrapper out of the positioning chain so each panel
  measures against the full-width bar it belongs to and spans it — which also makes each
  panel's existing `top:calc(100% + 9px)` mean "below that bar", which is what it should
  have meant here all along. Desktop geometry untouched. All three now sit at 11 → 379 in
  a 390px viewport.
- **Test:** `pokemon.spec.js` › "every dropdown stays inside the viewport, in both games"
  — plus an assertion that the document itself never scrolls sideways.

---

## DEFERRED

### D1 — Every Pokémon tile caption is truncated mid-word
`POKÉMON · 110 HP · GRA…` on essentially every tile in the grid, at every width. The HP
it spends those characters on is **already** a badge on the art directly above it —
deliberately, per `.variant`'s own comment ("HP takes the bottom-right variant slot").

- **Why it needs you:** the obvious minimal fix is dropping the duplicated HP from the
  caption, giving `POKÉMON · GRASS`, which fits. But that exact format is asserted by an
  existing stage-9 test (`pokemon.spec.js` › "the meta line and badges are Pokémon's, not
  Riftbound's" expects `` `Pokémon · ${hp} HP · ${type}` ``), so the format was a
  decision, not an accident. Changing it is a design call and this was a bug-fix pass.
- **Recommended:** drop the HP from `pkTileMeta` and update that assertion. The
  information is still on the art, in the badge tooltip, and in the modal. If you'd rather
  keep all three fields, the alternative is letting `.ttype` wrap to two lines for this
  game only — but that reflows the whole grid.

### D2 — The Pokémon collection summary panel has a large dead area
The three summary panels are a `1.5fr 1.2fr .9fr` grid, and Pokémon's by-rarity panel runs
to ten-plus single-column rows (Paldean Fates has ten) against Riftbound's five in two
columns. The panels stretch to the tallest, leaving ~170px empty under the percentage.

- **Why it needs you:** every fix is a layout change, not a bug fix — cap the list, move
  the panel, let panels size to content, or put something in the space.
- **Recommended:** `align-items:start` on `.colsummary` is the one-line version. Worth
  eyeballing in both games first; it will also shrink Riftbound's panels.

### D3 — Riftbound's energy orb is low-contrast in the Paper theme
`.orb` is `var(--brass)` ink on the same fixed dark chip as F2. In Paper `--brass` drops to
`#8C6D1F`, about 3.4:1 against the chip — legible, unlike F2, but under 4.5:1.

- **Why it needs you:** it *is* readable, so changing it moves a Riftbound pixel for taste
  rather than to restore intended behaviour, and the brass orb is a deliberate part of the
  tile look.
- **Recommended:** pin the orb's ink to `#C9A227` (the Midnight brass) and leave the
  border on `--brass`. One line, next to F2's fix.

### D4 — A Pokémon deck's cross-set rows have no type colour
The dot beside a deck row reads `c.domains[0]`, and a card from a set whose pool isn't
loaded is a **light card** off the search index, which carries no types — so most rows in a
real multi-set deck get the grey Colorless dot. Correct by construction, not wrong.

- **Why it needs you:** the honest fix is adding a type hint to the search index, growing a
  file every visitor downloads, for decoration. That's a data-shape and page-weight call.
- **Recommended:** leave it. If the grey grates, hide the dot for lazy games rather than
  pay index bytes for it.

### D5 — The original Base Set can't be found by searching "base set"
The picker returns **Expedition Base Set** and **Base Set 2**; the original's vendored name
is the bare word `Base`. Upstream naming from `PokemonTCG/pokemon-tcg-data`, copied
faithfully. Nothing is unreachable — the picker also matches on series, so "base" finds all
seven Base-series sets including `base1`.

- **Why it needs you:** fixing it means either an `if (set === …)` override in the client —
  the exact shape `CLAUDE.md` names as the signal the design drifted — or a new alias field
  in the vendor script and a re-vendor of all 174 sets.
- **Recommended:** leave it. If it grates, a `searchAlias` emitted by
  `build-pokemon-pools.mjs` for the handful of sets whose common name differs from their
  vendored one, matched in `renderSetPickList()` alongside name/code/series.

---

## UNTESTED

All of it needs a **real Neon session on a trusted origin** — `cardhavenapp.com`, or
`localhost` added to the Neon Auth trusted domains and the Google OAuth origins.

- **Google and email sign-in, sign-up, verification, password reset.** Not reachable here.
- **Merge-on-signup** — the signed-out deck *and* the nested collection blob swept into a
  fresh account, including the stage-4 caveat where the session arrives after a page
  reload. `localDeckForMerge()` returns one entry **per game** now; that array shape has
  never met the live module.
- **The real `decks.game` filter.** My mock filtered by game and the round trip was clean
  (a Riftbound deck and a Pokémon deck saved, listed and reopened per game), but that
  proves my stub, not migration 0005 plus RLS.
- **The collection sync engine's failure paths** — debounce, coalescing, `pagehide`
  keepalive, backoff, and the `COL_READY` write guard. All stubbed to succeed.
- **A 1 MB nested collection blob against migration 0006's size constraint.** The
  measurement is in the migration header; nothing here pushed a real row at it.

**Covered with the mock, so it needn't be re-derived:** Save and its in-flight guard
against a double-click (one row, not two), first-save-adds-a-row, Duplicate plus its
disabled state and tooltip on a row-less deck, the three-way dirty gate on both deck
switch and game switch with Cancel honoured, and per-game deck lists across a switch.

**Covered signed-out, for the record:** cold load and warm reload in both games, lazy pool
loading (exactly one pool fetch on boot, none before a set is opened, no double-fetch on
reopen), the legacy flat collection lifting to nested with no loss and writing back nested,
per-game caps (3 / 4) surviving a round trip, Mark-all-owned, per-set scoping and Clear,
the Playset tab at exactly 3 and exactly 4, back/forward navigation, empty and garbage
searches, rapid stepper double-clicks, window resize with the modal open, and Paper /
Midnight in both games and both views.
