# Decisions

One line each: what was chosen, what was rejected.

## Stage 8 — multi-set support and the multi-game frame (2026-08-19)

### The pool and the data

- Generated `data/sfd-pool.json` with the existing `scripts/build-pool-v2.mjs --set sfd`: 288 printings, set code `SFD`, ids `sfd-NNN-221` (221 base cards), all 288 with art on `cmsassets.rgpub.io` and all 288 with a domain; spot-checked three image URLs over HTTPS (200, `image/webp`). Rejected hand-editing or a new fetcher — the committed script already emits exactly the shape `normalize()` expects.
- Verified ref uniqueness across the merged pool before building anything on it: 640 printings, 640 distinct `riftboundId`s, none missing. The set prefix guarantees it, but it is proven rather than assumed and is now a test, because refs are identity for both decks and collections.
- SFD's variant-suffix convention matches OGN's (`a` = alternate art, `*` = signature on the middle segment), so `copyGroupRef()` needed no per-set adaptation. One SFD card, `sfd-t03` ("Gold // Buff"), carries a two-segment id; `copyGroupRef` already falls back to the lowercased ref for anything it can't parse, so it groups only with itself — correct, and left alone.
- SFD has no `Rune`-type cards (Origins holds all 12). Nothing needed to change: the type chips are a static list per the mockups, and rarities are derived from the data.

### Cross-set card identity — the OGN × SFD name intersection

- **Thirteen genuine cross-set reprints exist**, so the copy-limit requirement is exercised by real data, not only by a fixture: `Vayne - Hunter` (ogn-035 ↔ sfd-223), `Seal of Rage` (ogn-040 ↔ sfd-222), `Seal of Focus` (ogn-081 ↔ sfd-226), `Ahri - Inquisitive` (ogn-119 ↔ sfd-227), `Seal of Insight` (ogn-120 ↔ sfd-229), `Teemo - Strategist` (ogn-121 ↔ sfd-230), `Seal of Strength` (ogn-163 ↔ sfd-231), `Sett - Brawler` (ogn-164 ↔ sfd-232), `Seal of Discord` (ogn-204 ↔ sfd-234), `Yasuo - Windrider` (ogn-205 ↔ sfd-235), `Karma - Channeler` (ogn-235 ↔ sfd-237), `Darius - Executioner` (ogn-243 ↔ sfd-236), `Seal of Unity` (ogn-245 ↔ sfd-238). Every one is a Unit or a Gear — main-deck cards — and all thirteen match on type, energy, might, power, domains and rules text, which is the evidence that they are reprints and not name coincidences. `Vayne - Hunter` is the e2e fixture (2 + 2 flags, 2 + 1 does not).
- **The bigger finding was within-set, not across it.** A set's *overnumbered* Showcase printings get their own collector number rather than a suffix on the base card's, so the stage-7 id strip never grouped them: `ogn-247` (Kai'Sa - Daughter of the Void) vs `ogn-299`/`ogn-299*`, and `sfd-049` (Aphelios - Exalted) vs `sfd-224`/`sfd-224*`. That is 29 more merges, five of them Units — a live main-deck bug in the shipped OGN build, found by looking at SFD. Chose to apply the name layer uniformly rather than only across sets; rejected an across-sets-only rule, which would have left the bug in place for the exact reason the brief warned about.
- Derived each group's canonical name from its **base printing** (the member whose id has no variant suffix) and only then stripped the trailing display marker; rejected stripping suffixes off arbitrary variant names, which stage 7 forbids and which the data breaks — group `ogn-299` holds `(Overnumbered)` and `(Signature)` and no bare name at all. The brief's assumption that a base printing's name is already clean does not hold; the strip runs on exactly one definitive name per group, and the merge it produces is validated by test rather than trusted.
- Guarded the "two different cards share a name" failure mode with a **data test over the real pool** rather than a `BLOCKED.md` note, because no such collision exists today: `pool integrity` asserts every canonical group is functionally one card (type, energy, might, power, domains) and fails the day a set breaks it. Compares gameplay fields only; rejected comparing `supertype` and `text`, which drift benignly between printings (Riftcodex drops `supertype` on some Showcase reprints and errata's legend text) and would have produced seven false alarms.
- 640 printings → 562 id-groups → 520 cards. Both numbers are pinned in the test, so an accidental widening or narrowing of the grouping is caught.

### Set scope (deck builder)

- Scope filters the card browser only; the deck panel, legality, import and export ignore it entirely, and the notice it raises is informational, not a legality error. Rejected any reading of it as a format/rotation setting — every released set is tournament-legal alongside every other.
- Deselecting the last selected set snaps back to "all sets"; rejected an explicit empty state, which is a dead end reachable only by a chip that is already off.
- Persisted as `riftbound.setScope` (game-namespaced from day one) in localStorage; rejected syncing it to `user_settings` — it is a per-device display preference and a write per chip tap is exactly the kind of traffic the CU-hour budget can't spare.
- Reconciled the persisted scope against the sets that actually load, in `adoptPool()`; rejected trusting the stored array, which would leave a browser scoped to a set that has been renamed or pulled.
- The search-row count reads `N cards in scope` only while nothing is narrowing it, and `N cards` once a search term or chip is active. Matches the mockup exactly in the state it draws, without letting the phrase describe a number it isn't describing.
- Set badge sits **bottom-left** on a card tile and the variant chip moved to bottom-right, rather than the mockup's top row; rejected the top row because the energy orb and the Signature marker already own the top corners in the shipped app — and the collection mockup draws that orb explicitly, so moving it would contradict the other mockup.
- The out-of-scope notice counts the **currently open zone**, matching its own wording ("cards in this zone") and the mockup's numbers; rejected counting the whole deck, which the copy does not say.

### Per-set collection

- Built both scopes in one pass — per-set and the "All sets" aggregate — rather than shipping per-set first: every collection helper already took a list, so scoping was a one-line change per call site and the aggregate is the existing behaviour preserved.
- Storage is unchanged: one jsonb blob keyed by full set-prefixed refs. Per-set views are a client-side filter over it. Rejected per-set rows or per-set localStorage keys, which would multiply the sync engine's states and drag `COL_READY`, the no-row resolution path and the 0004 history trigger into a change that buys nothing.
- "Mark set owned" and "Clear" are scoped strictly to the active set's refs and mutate `COL` in a loop before a single `colMutate()`, so a 288-card sweep is one coalesced write, not 288. Clear's confirm text names the set and says the others are untouched; rejected reusing the global wording, which on a per-set button would read as a full wipe.
- The collection's set selection is transient (part of `COLF`), unlike the deck browser's; it is a place you navigate to, not a preference you keep.
- The panel title is the plain set name ("Spiritforged"), not the mockup's "Origins: Proving Grounds" — that reflects a set-family product hierarchy the registry deliberately does not model.
- The "All sets" chip shows the total printings across all sets (115 in the mockup is exactly the sum of the per-set denominators); the game menu's collection line follows the mockup's words, "N sets · M printings logged", and reports printings actually owned.
- Generalized the collector-number search normalizer from a hardcoded `^ogn` strip to any leading run of letters — it was the only place in the file that named a set code.

### The game frame

- The registry holds one entry; the three planned games are hardcoded display rows with no handler, no href and no focus stop. Rejected putting them in `GAMES` — the registry describes games the app can run, and a fake entry is reachable by every loop that walks it.
- The dropdown's footer line and the active row's summary switch on the view, following each mockup's own wording ("Decks and collection stay per game." / "Each game keeps its own collection and decks."; "N sets · M cards" / "N sets · M printings logged").
- `ACTIVE_GAME` is republished on `window` for the auth module: a `const` at classic-script top level does not land on `window`, and the module needs the game id for the `game` column. Rejected a second literal in the module, which is exactly the duplication the registry exists to prevent.
- **Verified the data-only-set-addition property by grep**, not by assertion: after this stage the only occurrences of `ogn`/`sfd`/`origins`/`spiritforged` in `index.html` are the two registry entries and explanatory comments. No `if`, `switch`, map lookup or regex anywhere keys on a set code — set identity travels on each card's `set` field and on the set-prefixed ref, and the chip row, the rarity sections, the type chips and the search normalizer are all derived from the data. Adding Proving Grounds is one registry line plus one committed pool file.
- A set that fails to load fails the **whole** load, named, with retry-all; rejected load-what-arrived-with-a-warning, which shows every card of the missing set as an unresolved deck entry and a hole in the collection — indistinguishable from data loss, which this project has already had once.
- Fetch all sets in parallel on page load; rejected lazy-loading per selected set, which adds a state machine for a couple of hundred KB behind an ETag.

### Schema

- Migration 0005 adds `decks.game text not null default 'riftbound'` plus a format check and a `(user_id, game, updated_at desc)` index replacing the two-column one. Additive, defaulted, and reversible: rows written by a client that predates it are labelled automatically, and a pre-0005 client keeps working.
- No RLS change. `game` filters, it does not authorise — narrowing a policy by game would make the Data API answer "no such deck" for a row the user owns. T12/T13 pin that isolation is exactly what it was.
- `user_settings` stays unscoped. Its collection map is keyed by set-prefixed refs, so a second game's refs occupy their own key space inside the same object; splitting it would touch the wipe-recovery machinery for no benefit today. Revisit only if a real second game's ref format could actually collide with Riftbound's — and note that the collision would have to be in both ref shape *and* set code.
- The SQL suite grew from 29 to 41 tests (C15, C15b, C16, C17, T12, T13 are new); still run locally only, unchanged from the hardening plan.

## Stage 6 — collection tracker with automatic sync (2026-08-16)

- The collection syncs change-driven: every mutation resets a 2-second debounce, one write per burst, plus flush-on-hide and retry-with-backoff. This is **not** the polling/interval autosave the CU-hours rule bans — nothing ever fires without a user action behind it; an idle page makes zero requests.
- Merge on session arrival is **per-printing max** — `max(local, server)` per riftboundId; rejected summing (double-counts the same physical cards) and rejected either side overwriting the other (destroys data). The local blob clears only after the merged write succeeds; on failure it stays for the next arrival.
- The write is a PostgREST upsert (`POST ?on_conflict=user_id`, `Prefer: resolution=merge-duplicates`) whose body carries only `collection` — verified against the published 0.2.0-beta bundle that DO UPDATE SET is built from the body's columns, so `settings` cannot be clobbered; also asserted at the SQL level as the `authenticated` role in the new C12 test. Rejected PATCH-plus-fallback-insert, which needs two calls and a row-existence dance.
- The flush on `visibilitychange → hidden` / `pagehide` sends the map via `fetch keepalive` but deliberately keeps the dirty flag: a tab that survives (screen-off, tab switch) re-confirms with a normal write on return; a tab that dies got the best effort available. Rejected clearing the flag, which would silently trust an unconfirmable request.
- A **failed collection read** while signed in blocks all collection writes (steppers inert, readout says retrying) until a read succeeds; rejected allowing writes, because flushing a local-only map over an unread server map is how a collection gets wiped.
- On session arrival the row is created if absent (one small write, once per account) so the keepalive PATCH always has a row to hit; rejected lazy creation, which would silently drop a flush that raced the first-ever write.
- Map keys that no longer resolve against the pool are preserved on every write but excluded from all counts and the grid; rejected dropping them (destroys data when a pool momentarily regresses) and rejected counting them (numbers nobody can see).
- Quantities clamp to 1–3 on load as well as on tap — 7 heals to 3, 0 and junk are deleted; rejected rendering an impossible state from a hand-edited blob.
- Missing tiles keep the real art faintly visible (grayscale, dimmed) under the mockups' diagonal hatch; rejected hiding the art entirely — the mockup faces are placeholders, and a recognisable ghost is more useful in a binder run.
- Rarity section headers stay collection-truth (owned/total of the whole rarity) while filters narrow the grid, matching the mockups; the tab counts, by contrast, are computed over search ∧ chips so the numbers always describe what the tabs would show.
- Number search matches the collector number as a prefix after stripping the `OGN` prefix, separators, and zero-padding ("7", "007", "ogn 007", and "007a" all work), plus a raw substring match on the full id; rejected exact-only matching, which makes zero-padding the user's problem.
- The card modal hides Set as Legend / Set as Champion in the collection view — read-only detail plus Close; rejected keeping them, which would mutate a deck from a view that promises not to.
- Signed out, the readout says `On this device only · N copies logged`; rejected any state that could be mistaken for SYNCED.
- View switching is a body class plus the URL hash (`#collection`), handled on `hashchange`; the deck — unsaved edits included — stays in memory untouched and no dialog fires, per the handoff's two-tables rule.
- `normalize()` now carries `setName` through (it was dropped, and the set panel read "OGN" instead of "Origins"); the set panel reads it from the pool, nothing hardcoded.
- Percent collected uses floor, so 99.7% never reads as 100%.
- Scoped T10/T11 in `rls_test.sql` to the test users' rows; the old unscoped `count(*)` broke the moment the author saved a real deck — which they did, confirming the 403 fix live.
- Bulk actions (Mark all owned, Clear) go through the stage-5 styled dialog and the same sync engine, one write each; rejected `confirm()` per the handoff.
- Verified with a 44-check Playwright suite (stepping and cap boundaries, tabs, three search modes, missing treatment, bulk dialogs, debounce coalescing, mid-flight follow-up write, failure→pending→retry, online-event flush, keepalive-on-hide, signed-out round-trip, max-merge, load-failure lockout) plus screenshots against the three mockups in both themes and at 390px; stage 4/5 suites re-run green.

## Incident — live 403 on every deck save (2026-08-16)

- Root cause measured, not assumed: `has_schema_privilege('authenticated','auth','USAGE')` had become **false**, so the RLS policies' `app_user_id()` → `auth.user_id()` call died with `permission denied for schema auth` (42501 → PostgREST 403, whose JSON body is exactly the 89 bytes the author's DevTools showed). Migration 0001 had granted it in the same committed transaction that created the tables; Neon re-provisioning the `auth` schema (pg_session_jwt) dropped it.
- Fix: `public.app_user_id()` is now `SECURITY DEFINER` (migration 0002), so the policies no longer depend on the caller holding rights on Neon's schema; rejected a plain re-grant as the fix, because the re-grant **silently no-ops now** — Postgres downgrades a grant the grantor can't make to a warning, and `neondb_owner` lost that right in the same re-provision. The grant is still attempted in 0002 as self-healing if Neon restores it.
- SECURITY DEFINER is safe here because the function already had the required hygiene: no arguments, no table access (reads only the caller's JWT session state), `set search_path = ''`.
- Why 24 green tests missed it: `rls_test.sql` stubs `app_user_id()` with a plain SQL function, so `auth.user_id()` was never executed as `authenticated`. Added T0/T0b, which call the real function as both Data API roles before the stub lands — the suite is now 26 tests, all passing post-fix.
- Verified at the failing layer: as `authenticated`, the real `app_user_id()` returns NULL (no permission error). Full end-to-end with a signed JWT is not mintable from here — Better Auth's signing key in `neon_auth.jwks` is encrypted with the server-held secret — so the author's next Save is the closing check.

## Stage 5 + UI pass — multi-deck management and the mockup layout (2026-08-16)

- Deck-construction rules verified against Core Rules v2026-07-16 (openrift.app's rules mirror): main ≥40 is 103.2, runes =12 is 103.3.a, 3-copy limit is 103.2.b, champion-in-main with matching tag is 103.2.a, domain identity is 103.1.b. Added the **distinct battlefields** check (103.4.c — "cannot include more than one Battlefield of the same name") and a **Signature-tag mismatch** banner (103.2.d says the 3 allowed Signature cards must match the Legend's tag); rejected leaving those two unchecked, since the handoff asked for the rules to be verified.
- Sideboard 0-or-8 kept as a banner although the core construction rules don't define a sideboard; rejected dropping it — it has been the app's rule since stage 0 and the handoff lists it.
- Every active problem gets its own banner even though mockup 1 draws only one; rejected showing just the first, because the handoff's behaviour spec says one banner per active problem and the mockup is authoritative for visuals, not for which problems exist.
- The dirty-check before switching decks, starting a new deck, and signing out reuses the duplicate flow's three-way dialog (Save first / proceed / Cancel); rejected a plain confirm(), for consistency — this generalisation is the inference the handoff asked to have logged.
- Deleting a deck uses a styled two-button dialog naming the deck; rejected the browser confirm(), which can't be styled and reads out of place next to the three-way dialog.
- Switching decks refetches the row over the Data API (an allowed read) instead of trusting the cached list; rejected the cache, which would silently lose a save made on the phone.
- Duplicate detaches the live in-memory state — name gains " copy", row identity and BASELINE drop — exactly per the spec; the copy stays out of the dropdown until saved because the dropdown renders only DECKS rows.
- Domain chips: accent line removed, active chip fills with the domain color; label ink chosen per domain (white on Fury/Mind/Chaos, dark on Calm/Body/Order); rejected one ink for all six, which fails contrast on the light golds.
- Theme is a class swap on `<html>` plus one localStorage key (`rb.theme`), applied by a tiny inline script before the stylesheet parses; rejected reading it after load, which flashes Midnight at Paper users. In Paper the primary buttons are dark ink (mockup 4 draws Export black), via `--go-bg`/`--go-fg`.
- The CSS variable `--paper` (page text color) was renamed `--text` now that a theme actually called Paper exists; rejected keeping the collision.
- Signed out, the Save button and save-state label are hidden (the deck autosaves locally) and the deck dropdown is the sign-in pitch, per the handoff's degradation rule.
- The Import button stays in the deck panel actions although the mockups draw only Export/Copy/Reset; rejected removing it — it is the pool-fetch fallback and the way an uncommitted set gets tested.
- Zone shelves under the browser were replaced by the mockups' tabbed row list (dot = first domain color, energy, qty stepper); the active tab is transient state, deliberately unpersisted.
- The last-open deck id is remembered per user (`rb.open-deck:<userId>`) so a reload reopens the deck that was on the table; rejected always opening the most recent, which loses one's place after browsing another deck.
- The deck panel is sticky with internal scroll on desktop and drops to a stacked column under 940px; the phone rules from the earlier responsive pass (touch targets, 16px inputs, dvh modal) are untouched.
- Verified with a 40-check Playwright suite driving the real dropdown, dialogs, duplicate/delete flows, banners, count readout, and theme persistence, plus a reload suite for save → reload → same deck reopens. One test-harness race was found and fixed in the tests (the real auth module's late "signed out" dispatch clobbering the mocked session) — not an app defect, since the module is the app's only session source.

## Stage 4 — persistence over the Data API (2026-08-16)

- Deck payloads store `{ref, qty}` keyed on `riftboundId` (collector-number identity, name as fallback for pool-less cards); rejected name keys, which the base/Showcase rule in `CLAUDE.md` forbids.
- The champion stays a name in memory (the legality checks compare names) and becomes a ref only at the persistence boundary; rejected converting the in-memory model, which would have rippled through every check for no user-visible gain.
- Serialized zones are sorted by ref so the dirty check compares content; rejected insertion order, where remove-and-re-add would read as an unsaved change forever.
- A ref that no longer resolves stays in the deck, shows a problem banner with a "Remove them" button, counts toward zone totals, and is written back on save; rejected dropping it silently, and rejected keeping it invisible with no way to clear it.
- The localStorage blob moved to the same slim shape (schema 2) on the same key, and legacy fat blobs still hydrate; rejected a new key, which would have stranded existing browsers' decks.
- The `variants` toggle moved to its own localStorage key (`rb.variants`) like a device preference; rejected the `user_settings` row the audit suggested — cross-device sync of one boolean isn't worth a table round-trip yet, and the key survives the deck blob being claimed by a signup.
- Signed-out users keep autosave-on-every-mutation; signed-in users write only on the Save button; rejected any autosave/interval against the CU-hours budget.
- The merge runs on any session arrival with an unclaimed non-empty local deck, not only on signup; rejected signup-only, since a sign-in over a local doodle has the identical data-loss shape. Imported decks get an `(imported)` name suffix; the blob is cleared only after the insert succeeds; an empty untitled deck is not imported.
- Data API access is `@neondatabase/postgrest-js@0.2.0-beta` + `fetchWithToken` with the JWT read from `getSession().data.session.token`; verified against the published `neon-js@0.7.0-beta` source that this is exactly what its integrated client does, and against the postgrest bundle that queries resolve `{data, error}` and never throw.
- Import now accepts deck-only files (fixes the broken Export→Import round-trip: exports carry no pool and the importer threw "no cards"); an imported deck opens as a new unsaved deck rather than overwriting the open row.
- Sign-out clears the table to a fresh untitled deck after a confirm if unsaved changes exist; rejected keeping account data painted on a signed-out screen.
- Reset clears the working deck in memory (and the blob when signed out) but never deletes database rows; rejected wiring it to row deletion, which stage 5 handles explicitly per deck.
- Removed the dead `S.target` field flagged in the stage-2 audit; rejected keeping it now that the state object was being reshaped anyway.
- Verified with a 35-check Playwright suite driving the real page over localhost (slim round-trip, legacy blobs, unresolved refs, merge-once, dirty tracking, failed saves, sign-out) with a mocked `window.cloud`; the PostgREST wire itself is verified separately against the published bundle and live on the deployed site.

## Stage 0 — repo setup

- Kept `CLAUDE.md` at `CLAUDE.md` where it was placed; rejected moving it to the repo root, even though root is the Claude Code auto-load convention — relocating a file the author just placed is their call.
- `.gitignore` ignores `.env*` with a `!.env.example` escape hatch; rejected a bare `.env` line, so a future `.env.local` can't leak.
- `.gitignore` covers `node_modules/` and `dist/` despite there being no build step; rejected a minimal ignore file, because dev-time tooling produces them and they must never be committed.
- Committed the baseline straight to `main`; rejected opening a PR for it, because the repo had zero commits and there was no base branch to target. Everything after it goes through a PR.
- Committed `index.html` with its pasted UI chrome intact and fixed it in PR #1; rejected cleaning it silently inside the baseline, so the fix reads as a reviewable diff.

## Stage 1 — deploy

- Enabled Pages via `gh api` as a branch deploy (`main` / `/`); rejected a build workflow, per the standing decision.
- Verified card art against a real asset hash found in a public card database repo; rejected waiting for `data/ogn-pool.json`, because the CDN's behaviour is a property of the CDN and does not need our data to test.
- Logged the 818 KB → 15 KB thumbnail finding in `docs/BLOCKED.md` instead of implementing it; rejected just doing it, because card art handling is a decision reserved to the author.

## Card art sizing (author decision, 2026-08-14)

- Grid tiles request `&w=240&fm=webp`; rejected leaving the originals, per the author's call on "Thumbnail sizing" in `docs/BLOCKED.md` — 779 KB → 14 KB measured live, and the revert is a one-line change to `thumb()`.
- The card modal keeps the full-size original; rejected shrinking it too, so there is always an unmodified reference to compare tile quality against.
- `thumb()` picks `?` or `&` by inspecting the URL; rejected hardcoding `&`, because 14 of the 352 pool entries carry no query tag and would have produced a malformed URL.
- Width fixed at 240 for a ~112 px tile; rejected matching the CSS width exactly, so the tiles stay sharp on a 2× phone screen — which is the primary use case.

## Responsive / phone (2026-08-14)

- One stylesheet with media queries; rejected a separate mobile page or a `/m/` route, per the author — the site adapts, it does not fork.
- Split the breakpoints three ways — `(hover:hover)`, `(hover:none)`, `(max-width:640px)`; rejected branching on width alone, which would give a narrow desktop window fat touch targets and a tablet mouse-sized ones.
- Moved all five `:hover` rules inside `@media (hover:hover)`; rejected leaving them, because tapped elements keep the hover state on touch and read as a stuck selection.
- `#q` and `#deckName` go to 16px on touch; rejected keeping 14px — iOS zooms the page on focus below 16px and does not zoom back out.
- `.step` goes 19px → 30px on touch; rejected 44px (Apple's floor) — it wrecks the density of the deck list, and 30px inside a padded row is reachable.
- Legality strip becomes a 4-column grid under 640px; rejected letting it wrap, which breaks 3-and-1.
- Card modal goes full-screen under 640px with a sticky action bar; rejected the centred box, which left ~20px of tappable backdrop on a phone.
- Sized the modal in `dvh` with a `vh` fallback; rejected `vh` alone, which is the mobile URL-bar clipping bug.
- Tile action buttons may wrap on touch; rejected keeping `nowrap`, because touch padding overflows a 94px tile.

## Stage 4 — merge on signup (author decision, 2026-08-14)

- Keep both: a signed-out deck is imported as an additional deck on the account; rejected overwrite-server and discard-local, both of which destroy data with no undo.

## Card pool served from the site (2026-08-14)

- The app fetches `data/ogn-pool.json` from its own origin on startup; rejected the manual file picker, which was a stopgap from before the pool was in the repo and could never have worked for anyone else — the file only exists here.
- `save()` no longer persists `pool`; rejected keeping the localStorage cache, which rewrote ~240 KB on every `+1` to duplicate a file the browser already caches.
- `load()` deletes `pool` from restored blobs; rejected trusting old data, because a cached copy would silently shadow a newly released set.
- The picker is kept as a fallback shown only on fetch failure, plus a "Try again"; rejected removing it, since it is also how an uncommitted pool gets tested.
- `render()` runs before the fetch so a saved deck paints immediately; rejected blocking the first paint on the network.
- `fetch(..., {cache:"default"})`; rejected cache-busting — the file changes only when a set drops and Pages serves an ETag, so revalidation is cheap.

## Stage 3 — auth UI (2026-08-14)

- Imported `createAuthClient` from `@neondatabase/auth` + `BetterAuthVanillaAdapter` from its `/vanilla` export; rejected `createClient` from the `@neondatabase/neon-js` root, which also pulls `better-auth/react` and therefore React into a page that has none. Verified both construct an identical client against the live server.
- Every endpoint verified by probing the live server before writing against it; rejected trusting Better Auth's documented defaults — `/verify-email` and plain `/forget-password` behave differently here than the generic docs suggest.
- Password reset uses the OTP pair (`forgetPassword.emailOtp` → `emailOtp.resetPassword`); rejected the emailed-link flow, so every step stays in one tab and there is no session-arrives-after-reload case to handle for reset.
- Errors are caught from `throw`, not read off a returned `{error}`; rejected the returned-error shape — the Better Auth proxy throws, and assuming otherwise would have swallowed every failure silently.
- A `MESSAGES` map translates the error codes a user can actually hit, falling back to the server's own text; rejected showing raw codes like `INVALID_OTP`.
- An `EMAIL_NOT_VERIFIED` sign-in sends a fresh code and jumps to the verify view; rejected showing the error alone, which dead-ends a user who cannot act on it.
- The verify and reset views carry a spam-folder note (author's request); rejected leaving it implicit — Neon's stock template lands in Gmail spam on a new sender, measured, and verification is required, so a missed code is a blocked signup.
- Forgotten-password always reports success; rejected revealing whether an address is registered, matching what the server already does.
- Auth lives in its own `<script type="module">` and touches no deck state; rejected wiring `save`/`load` now — that is stage 4, and mixing them would make this stage unreviewable.
- All auth views render from one `VIEWS` map into a single form element; rejected five separate modals, which would duplicate the busy/error handling five times.

## Stage 3 — auth UI matched to the mockups (2026-08-15)

Seven mockups in `docs/mockups/` were compared against the built UI, state by state,
in a real browser. Most of the modal already matched; these are the gaps that were closed.

- Account control moved to the right of the legality checks behind a vertical rule, and
  restyled from an 11px underlined link to a bordered button with a `DECKS ON EVERY DEVICE`
  caption; rejected keeping the link, which the mockup clearly draws as a button.
- Header now paints the signed-out account control synchronously and drops the `hidden`
  attribute; rejected waiting for `getSession`, which made the button appear a beat late.
- `.acct:empty{display:none}` so a failed CDN module load leaves no orphan rule floating
  next to the checks; rejected leaving it, since the padding and border render regardless.
- `Forgotten?` moved onto the password label row; rejected the stacked link list under the
  Google button, which is where the mockup does *not* put it.
- Footer links became sentences (`New here? Create an account`); rejected bare links.
- Removed the Google button from the create-account view per the mockup; rejected keeping
  it, since "Continue with Google" signs up and signs in identically and the sign-in view
  already offers it.
- `NAME` carries an `OPTIONAL` tag on the label row instead of a placeholder inside the
  input; rejected the placeholder, which disappears as soon as anyone types.
- Added `At least 8 characters.` under the password field, `you@example.com` placeholders,
  and a six-dot OTP placeholder; all three are drawn in the mockups.
- Added the `ACCOUNT` eyebrow and a close ✕ to the modal; rejected relying on backdrop-tap
  and Escape alone, which is what the code had and neither is discoverable.
- Busy state now swaps the submit button to a spinner plus a per-view verb
  (`Signing in…`, `Creating account…`); rejected a spinner elsewhere in the box — the
  mockup puts it on the button, and the button is where the eye already is.
- `.alt a` is brass: the app had no anchor styling at all, so every modal link was
  rendering in the browser's default blue.

## Stage 3 — auth config (2026-08-14)

- Signed-out users stay on localStorage; rejected `allowAnonymous: true` (author's call) — an anonymous token would put every drive-by doodle in the database against a 0.5 GB cap, and the export button already covers signed-out backup.
- Auth setup steps live in `docs/auth-setup.md`; rejected putting them in `CLAUDE.md`, which is instructions-for-Claude, not a runbook the author works from.
- Probed the live auth endpoint rather than assuming provisioning state; rejected asking the author to check — the endpoint answers definitively and Managed Better Auth turned out to be already enabled.
- Custom SMTP over a real sender (author's call); rejected Neon's shared `auth@mail.myneon.app`, which is the likeliest address to be spam-filtered and now carries the sign-up code.
- Gmail + app password as the sender; rejected Brevo and Resend, both of which want a domain verified over DNS for a project that has none.
- A Gmail account created for this project; rejected any existing address — the author's own addresses are not used anywhere in this repo.
- Sent a test message through `send_test_email` before writing the config; rejected saving first and finding out later, because a bad app password would otherwise surface as a user who never received their code.
- Turned on `send_verification_email_on_sign_up` to match `require_email_verification`, which was already on; rejected leaving the pair inconsistent — that combination creates accounts that can never sign in, and neither the console nor the API reports it as an error.
- Stage 4 will handle "session arrives on a fresh page load" even though email verification is currently off; rejected coding to the current setting, which is a console toggle that can change without touching the repo.

## Stage 2 — schema

- Wrote `migrations/0001_create_decks.sql` fresh from the design described in `CLAUDE.md`; rejected pretending to adapt the earlier migration `CLAUDE.md` pointed at, which is not in the repo.
- Put migrations in `migrations/`; rejected the `supabase/migrations/` path `CLAUDE.md` named — this project runs on Neon, and that directory would read as a mistake six months from now.
- `user_id` is `uuid` with an FK to `neon_auth."user"(id)`; rejected the `text` column in Neon's own docs example, because uuid is what that table's primary key actually is and it is what makes `ON DELETE CASCADE` possible.
- Policies call a wrapper, `public.app_user_id()`, rather than `auth.user_id()::uuid` inline; rejected the bare cast, which raises `22P02` on a non-uuid `sub` and would turn a denied read into a 500 instead of an empty result.
- Kept `auth.user_id()` as the underlying helper; rejected `auth.uid()` (which also exists here and returns uuid directly), because `CLAUDE.md` and Neon's Data API docs both specify `user_id()`.
- Four policies per table, one per verb; rejected a single `FOR ALL` policy, so each verb is independently auditable and `USING` vs `WITH CHECK` is explicit.
- Granted `anonymous` nothing on either table; rejected granting it `SELECT` and relying on policy absence alone — test T9 proves RLS alone would suffice, so this is a second independent reason a signed-out read returns nothing.
- `name` is a column on `decks`, not a payload key; rejected burying it in jsonb, so stage 5 can list and rename decks without parsing blobs.
- `payload` constraints check size, type, and zone shape but *not* card-entry shape; rejected a strict card schema, which would reject the fat objects the current client writes and break stage 4 before the shrink lands.
- Added an explicit `check (not (payload ? 'pool'))`; rejected relying on the size limit alone, so an accidental full-state POST fails loudly rather than depending on how big the pool happens to be.
- Created `user_settings.collection` now, empty, rather than in stage 6; rejected deferring it, because adding a column later means a schema change against live data.
- `FORCE ROW LEVEL SECURITY` left on even though `neondb_owner` holds `BYPASSRLS` and overrides it; rejected removing it, so the guarantee doesn't silently depend on who owns the table later.
- Migration runner is a throwaway Node script + `pg` in a scratch directory outside the repo; rejected installing `psql` or `neonctl` (neither is on this machine) and rejected adding `node_modules` to the repo.
- Ran every test inside a transaction that is rolled back, seeding real rows in `neon_auth."user"`; rejected testing against permanently-inserted fixtures, so the database is left with zero rows.

## Google sign-in re-enabled (2026-08-15)

- Re-enabled the Google button after the author verified the flow end to end on the live Pages URL and on iOS Safari; rejected keeping it disabled, since the blocking defect was Neon's and Neon fixed it.
- Left `@neondatabase/auth` pinned at `0.5.0-beta`; rejected bumping it — it is the latest published version and was unchanged across the failing and passing runs, so a bump would have been cargo-culting a server-side fix.
- Left the load path alone rather than adding verifier handling; established by test that the SDK's own `getSession` interceptor reads `neon_auth_session_verifier` from `location.search` and appends it to the request, so `refresh()` already drives the exchange.
- Verified that by mirroring the published bundle and driving it against a stubbed transport; rejected reading the minified source alone, which is how the previous investigation concluded "no `location.search` handling" — it had missed `dist/adapter-core-*.mjs` entirely.
- Added a verifier strip on the failure path only; rejected stripping unconditionally, which would duplicate the `history.replaceState` the SDK already does on success, and rejected doing nothing, which leaves a burned single-use token in the address bar after a failed return.
- Reworded the return-trip banner to a plain "didn't complete, try again"; rejected deleting the handler, because a redirect returning with no session is the exact fingerprint of the defect coming back.
- `docs/BLOCKED.md` §2 moved to Resolved with the evidence table, and the CHIPS correction was corrected rather than deleted — partitioning turned out to be the mechanism that makes it work, not an incidental detail.
- Recorded the partition consequence in `docs/auth-setup.md`: the cookie is partitioned to `https://rlomelino1.github.io`, so a future custom domain signs every user out once. Rejected leaving it implicit — it is invisible until launch day.
- Kept `.gbtn:disabled` while deleting `.gnote`; the disabled style is still reached through `setBusy()`, the note's element no longer exists.

## Card Haven rebrand + domain-move doc sync (2026-08-17)

- Header brand is now `Card Haven` (wordmark) + `Riftbound` (brandsub); rejected adding new markup or CSS — the existing two-span structure expresses primary + game-label as-is.
- Dropped the JS that swapped the brandsub between "Deckbuilder"/"Collection" on view change; rejected keeping a third span for it — the view tabs right next to it already show the active view, and the brandsub now carries the game name.
- On phones the brandsub is hidden (existing ≤640px rule), so the mobile header reads just "Card Haven"; rejected surfacing "Riftbound" there — header space is the scarce resource on the phone layout.
- Left `kind:"riftbound"` in the export payload, the `riftbound-deckbuilder-v1` localStorage key, and all `riftboundId` identifiers untouched; renaming any of them would orphan saved data or break import round-trips.
- Left the Riot legal notice's "Riftbound Deckbuilder" wording untouched in both the footer and README's Legal section — the notice is per-game and off-limits.
- Placed the roadmap note in `CLAUDE.md` under `# Architecture`, right after "Where it's going"; rejected the top of the file, where it would read as a rename of the project rather than context.
- Old-URL mentions that record past measurements (stage-1 verification table, the 2026-08-15 cookie table, §1 probe table) stay as written, annotated where needed; only statements of current canonical state moved to `cardhavenapp.com`.

## Hardening stage — security, testing, perf (2026-08-17)

- Added a `jsStr()` escaper for values landing in a JS string inside an inline handler, and replaced the `esc(...).replace(/'/g,"\\'")` idiom at all 9 sites; rejected keeping `esc()` there — it produces `&#39;`, which the HTML parser decodes back to `'` before the JS runs, so an imported deck name could break out and execute (confirmed with Playwright). The same fix restores the fallback-image swap for the 19 apostrophe-named cards.
- Chose a correct escaper (option 1) over an event-delegation refactor (option 2) for this pass; the CSP keeps `'unsafe-inline'` anyway, so delegation's benefit (dropping it) is deferred — logged in the plan as a later small pass.
- Added a `<meta>` CSP that keeps `script-src 'unsafe-inline'` (inline scripts + handlers require it) but locks `connect-src` to the two Neon hosts and `img-src` to Riot's CDN, plus `base-uri/object-src/form-action`; rejected a hash-based `script-src` (impractical for a file this size) and validated the policy is non-breaking against the live app before shipping.
- Added `decoding="async"` to grid images and `preconnect` hints for `cmsassets.rgpub.io` and `esm.sh`; rejected debounce/diff-render work now — measured full-grid render is ~15 ms at 352 cards, below perceptible, filed to revisit when a second set ships.
- Added migration `0003` capping decks at 100 per user via a BEFORE INSERT trigger that counts on `app_user_id()` (fires before `pin_ownership`, so `new.user_id` isn't trustworthy yet); rejected counting on `new.user_id`, and rejected no cap — the Data API is public over a 0.5 GB free tier and any verified account could otherwise fill it.
- Added a dev-only `package.json` (Playwright + pg as devDependencies), a Playwright e2e suite, a 20-line static server, and a CI workflow; rejected `npx serve` (download-prone default) and rejected running the SQL tests in CI (needs a Neon API key as a standing CI secret — kept local, per the plan).
- The e2e suite blocks `esm.sh` so it is hermetic and network-independent, covering the local/signed-out surface the app degrades to when the auth module fails; auth-flow tests with a mocked Neon network are left as the plan's Tier 2.
- Applied `0003` to the live database (additive, reversible) after the trigger logic passed in a rolled-back transaction; the full suite is 29/29 green against live.

## Vendor the Neon SDK graph (2026-08-17)

- Vendored the full resolved esm.sh module graph (132 modules: @neondatabase/auth + postgrest-js and their transitive deps — better-auth, jose, zod, supabase auth-js, nanostores, defu) into `vendor/neon/` and switched the three imports to relative paths; the app now loads its SDK from its own origin, not a transforming CDN. Rejected SRI (esm.sh rewrites modules and the risk is transitive) and hand-pinning 140 build-hashed URLs (unmaintainable) — vendoring is the only option that makes the running code reviewable and removes the load-time dependency on esm.sh.
- Flattened the graph into one directory with sanitized filenames and rewrote every internal specifier to `./relative`; rejected mirroring esm.sh's nested `@scope/pkg@ver/...` tree, which would need per-file relative-path computation for no benefit.
- Wrote `scripts/vendor-neon.mjs` as a re-vendor tool (fetches with a Chrome UA to match the browser-target build, syntax-aware minify-tolerant specifier extraction, 0 residual esm.sh refs); rejected a one-off manual download — versions will bump and this must be repeatable.
- Tightened the CSP `script-src` from `'unsafe-inline' https://esm.sh` to `'unsafe-inline' 'self'` and dropped the esm.sh preconnect, now that nothing loads from the CDN.
- Committed the ~168 KB vendored tree; `.nojekyll` already keeps the `_`-prefixed filenames from being dropped by Pages. Verified live-equivalent locally: 132 modules load from our origin, `window.cloud` initializes with all methods, zero requests to esm.sh, no CSP violations; 14/14 e2e green including a new guard that asserts the SDK never reaches a CDN.

## Stage 7 — Showcase / base-card 3-copy limit (2026-08-17)

- Grouped printings for the 3-copy limit on collector number via `copyGroup()`, which strips the variant suffix off the middle id segment (`ogn-039a-298` and `ogn-039-298` → `ogn-039`); rejected name-based grouping, which CLAUDE.md forbids and which the data proves fragile — the 12 signature/overnumbered legend pairs have names that disagree under any suffix-strip, while the id grouping clusters all 42 multi-printing groups correctly (verified: `number` field identical within every group, 0 orphans).
- The over-limit check now sums qty across all main-deck entries in a group (incl. unresolved ones by ref) and flags `> 3`; rejected the old per-entry `qty > 3` test, which was dead code — qty is already clamped to 3, so it could never fire, and the real over-limit only ever arose from two printings counted separately.
- Kept base and Showcase as distinct deck entries (distinct refs), not collapsed in `addCard`; rejected merging them, which would lose the user's chosen printing and contradict the collection's per-printing identity. The grouping is legality-only; the collection is untouched (guarded by an e2e test).
- Applied the same grouping to the battlefield "all different" check (a base battlefield and its Showcase are the same battlefield); rejected leaving it name/entry-based, since it is the identical bug class and the fix is one shared helper.
- The 3-copy limit counts the main deck **and sideboard combined**, per Tournament Rules 403.4 quoted verbatim from playriftbound.com: "Limits on copies of named cards apply to the combination of Main Deck and sideboard." Initially left main-deck-only (matching the pre-existing check) and corrected after checking the rules rather than assuming; the rule's own worked examples (3 main + 1 side illegal, 2 + 1 fine) are now e2e tests. Runes and battlefields stay excluded — 403.4 names only those two zones, and they are separate decks under their own rules.
- The over-limit banner names the sideboard only when the sideboard actually contributed ("Over 3 copies (main deck and sideboard combined): …"); rejected always citing both zones, which would point a main-deck-only mistake at a zone the user never touched, and rejected never citing it, which makes "3 in my main deck" plus a hidden sideboard copy read as a miscount.
- Display label for an over-limit group is the base name (trailing "(Alternate Art)"/"(Signature)"/"(Overnumbered)" stripped) plus the total count, e.g. "Kai'Sa - Survivor (4)"; the strip is display-only and never used as an identity key.

## Incident: collection wiped to zero, and the fix (2026-08-17)

- **What happened.** A signed-in collection (5 printings, 6 copies) was replaced with `{}` at 21:14:18Z. Root cause found by driving the shipped `syncCollection()` against stubbed reads: three response shapes — `data: []`, `data: null` with no error, and `data: undefined` — all fell through to "the server has no row" and then wrote `{}`. Because `saveCollection` upserts on `user_id`, PostgREST applies that as `ON CONFLICT DO UPDATE`, so the empty map overwrote a real collection. The apparent link to deploys is real but indirect: a deploy means a reload, and a reload can race Neon's scale-to-zero cold start, which is enough to make that first read come back empty.
- `syncCollection` now treats a non-array `data` as a failed read rather than as an empty server, and **never writes when there is no local map to contribute**; rejected keeping the "create the row so the keepalive has a target" write, which bought nothing (a PATCH against a missing row affects zero rows) and was the entire wipe path.
- Added a `COL_READY` guard to `colFlush`; `colFlushOnHide` already had one, but `colFlush` is reachable from the `visibilitychange` and `online` handlers and would push the empty placeholder map before the account's real collection had loaded.
- Verified the DB layer was innocent before touching the client: policies, grants, and RLS on `user_settings` are correct, and `authenticated` with the real `app_user_id()` sees exactly one row. The bug was entirely client-side.
- Recovered the data from a point-in-time Neon branch (6-hour instant-restore window, found with ~3 hours to spare) rather than asking the author to re-enter it; the probe branch was deleted immediately after reading.
- Added migration `0004`: a trigger that snapshots the previous collection whenever an update *removes* printings. Rejected blocking empty writes outright, which would break the legitimate "Clear the collection" button, and rejected a full audit log, which would grow on every ordinary add. Growth writes nothing, so the common case costs zero. The table has no grants and RLS with no policies, so the Data API cannot reach it.
- Regression tests are committed at both layers: `tests/e2e/collection-sync.spec.js` drives the real `window.cloud.syncCollection` for every under-reporting read shape and for the merge-on-signup paths, and `migrations/tests/history_test.sql` covers the snapshot trigger.

## Collection recovery: stop believing an under-reporting read (2026-08-17)

- A settings read that reported "no row" was taken at face value: the app painted `Synced · 0 copies logged` at 0%, set `COL_READY`, and never retried — so refreshing repeated the same failed read and only a fresh sign-in recovered the collection. The wipe fix stopped the data loss; this is the same defect's second face, on the display side.
- `syncCollection` now resolves a no-row read instead of trusting it: create the row only if genuinely missing, then re-read. Rejected trusting the first read (that is the bug), and rejected retrying blindly without creating the row — a genuinely new account would then never settle and would sit on "retrying" forever.
- Row creation uses `ignoreDuplicates: true` (`Prefer: resolution=ignore-duplicates` → `ON CONFLICT DO NOTHING`, verified in the vendored postgrest-js bundle), so unlike `saveCollection` it can never overwrite an existing collection; SQL test H6 pins that, because a regression to `merge-duplicates` would recreate the wipe exactly.
- After the row is known to exist, a still-empty read is reported as an error so the existing retry-with-backoff path recovers on its own; rejected returning an empty map, which is what showed a real collection as zero.
- The happy path is unchanged and makes no extra calls — verified by a test asserting `ensureSettingsRow` is not called when the first read succeeds, so ordinary loads cost nothing extra against the CU-hour budget.

## Tests gate production (2026-08-18)

- `main` is now a protected branch requiring a pull request and a green `e2e` check before merge. Pages deploys from the branch, so Actions cannot block the publish itself — it fires on any push to main, in parallel with CI — which is why the gate sits on what may *reach* main instead. A merge is the only way main advances, so only a green suite is ever published.
- `enforce_admins` is ON. It was briefly off, and a direct push to main was accepted with "Bypassed rule violations" — a gate the only person who pushes here can walk through is not a gate. Rejected leaving admins exempt; the escape hatch is toggling the setting deliberately, not bypassing it by habit.
- Required check is matched by **job name** (`e2e`), not workflow name; renaming the job silently blocks every merge on a check that never reports. Recorded in `ci.yml` and `CLAUDE.md` because it is invisible until it bites.
- `strict` is on (a branch must be up to date with main before merging), so the suite that gates a merge ran against the code that will actually be on main; rejected the looser setting, which lets two independently-green PRs combine into a broken main.
- The SQL suite still runs locally only. Gating on it would mean a production database credential in CI secrets for a suite that only changes when a migration does; rejected that trade, unchanged from the hardening plan.

## Stage 9 — Pokémon TCG, the second game (2026-08-20)

### Reported back, because measurement contradicted a settled number

- **The collection size cap is 1 MB, not the 512 KB the stage brief settled on.** The
  brief's rationale was "~20k entries ≈ 300 KB", which is the JSON *text* size. Measured
  in Postgres with every real card id from the vendored index: `pg_column_size` of a
  complete Pokémon collection is **480,812 bytes**, against 255,908 bytes of text —
  jsonb keeps a key-offset table per object, costing ~88% on top. 512 KB would have left
  a full collection 3% of headroom and started rejecting syncs near completion,
  silently. 1 MB is ~2.2x a complete collection and still ~7x too small to absorb a
  client that posts card objects instead of counts, which is what the cap is for.
  Rejected removing the cap (that removes the guard) and rejected 512 KB (that is the
  drafting error).
- **Image URLs are copied verbatim from the source, not built from `{set}/{number}.png`.**
  The brief's settled decision #3 named `images.pokemontcg.io` as *the* host. It isn't:
  the four Mega Evolution sets serve card art, set symbols and logos from
  `images.scrydex.com` under a different path shape — 661 cards today. A pattern-built
  URL is wrong for those and will be wrong again the next time upstream moves. Both
  hosts are in the CSP. The hotlink-don't-host rule is unchanged.
- **The search index carries one field beyond the brief's `{id,n,s,num,img}`**: a sparse
  `b:1` Basic Energy flag. The copy-limit exemption has to be answerable for a card seen
  only through the index, and the alternative was downloading a set pool to find out
  whether a card is Basic Energy. Measured cost: 183 flagged entries out of 20,444.
- **"Assert no pokemon pool fetches before a set is opened" was reinterpreted.**
  Something has to be on screen when you switch to Pokémon, so exactly one pool — the
  persisted or newest set — loads at activation. The test asserts *one* fetch rather than
  zero, and that opening another set fetches exactly that one, once.

### Architecture

- **Adapter hooks on the registry entry, not a `GameAdapter` class or a plugin system.**
  Twelve small functions per game (`normalize`, `refOf`, `cardKeyRef`, `cardLabelRef`,
  `setCode`, `numLabel`, `tileMeta`, `tileBadges`, `modalMeta`, `colTag`, `searchMatch`,
  `validate`) plus a `rules` object. Rejected a class hierarchy and rejected branching on
  `GAME.id` at call sites; the rule is that nothing outside the registry asks which game
  is running.
- **Riftbound's hooks are its stage 8 expressions *moved*, not rewritten**, and the
  mutable aliases (`ZONES`, `DOMAINS`, `TYPES`, …) keep every call site byte-identical.
  Verified with nine element-scoped screenshot comparisons against a stage-8 worktree:
  header, set bar, browser+deck panel empty and full, collection summary, controls, set
  bar, collection tiles at 0/1/3 copies, paper theme, card modal, deck switcher menu —
  all zero-pixel. The two intended deltas are the footer's Pokémon notice and the game
  menu's new row.
- **`domains` and `type` keep their Riftbound names** for the game-neutral jobs of
  "coloured filter axis" and "primary type axis". Rejected renaming to `axis`/`kind`: the
  export format uses those names, and every exported deck file in the wild would stop
  importing. Documented instead.
- **The game switch happens in place, not via `location.reload()`.** A reload is fewer
  lines and would silently discard an unsaved deck; in-place reuses the existing
  three-way dirty prompt. Cost is one explicit reset of per-game state.
- **The auth module reads `window.ACTIVE_GAME` per query** instead of capturing it at
  load. A captured constant had the module listing Riftbound rows on a Pokémon screen.
- **Merge-on-signup now sweeps every game's signed-out deck**, each inserted with its own
  `game`. The handoff fires once per session, so a deck left behind would sit unimported.
  This applies the already-decided merge rule (2026-08-14: keep both, import as an
  additional deck) per game; it is not a new decision about merge behaviour.

### Lazy sets

- **174 sets load one at a time; the search index is the deck-resolution layer.** Chosen
  because a 60-card deck spans many sets while only one pool is in memory — without the
  index a saved deck renders as sixty unresolved entries. Rejected loading all 174 pools
  (6.76 MB per visit, and 20,444 tiles is not a page) and rejected a mega file.
- **The index is not deferred past game activation**, though the brief said "lazily on
  first use". Deck hydration *is* the first use, on the first paint. The lazy part is the
  per-set pools.
- **Cross-set search yields to the chip filters rather than ignoring them.** The index
  carries no supertype, energy type or rarity, so a chipped search stays inside the
  loaded set and the result count says so ("this set only (filters on)"). Rejected
  silently dropping the chips, and rejected fetching pools to satisfy them.
- **A series-grouped collapsible picker replaces the chip row for a lazy game**, one open
  set shared by the deckbuilder and the collection. Rejected a per-view open set: staying
  in the set you are working in is the behaviour you want when flipping between views.
- **`findCard` keeps a linear scan behind the ref map.** The map is the fast path; the
  scan means anything that puts cards in `S.pool` without going through `adoptPool()`
  stays visible instead of silently disappearing. A test that pushes fixtures into the
  pool found this the honest way.

### Collection

- **Nested by game inside one blob and one row**, not per-game rows. Same argument 0005
  made for the row: splitting multiplies the sync engine's states and drags the
  wipe-recovery machinery along for nothing.
- **A flat blob is lifted, never rejected**, and shape is decided by inspection — every
  top-level key a known game id *and* every value an object — not by trusting the sender.
  Both sides of the sign-in merge are lifted, so a flat server blob meeting a nested
  local one merges as Riftbound.
- **A key under an unknown game id is preserved untouched**, not dropped and not clamped
  to a cap that isn't its own. Same principle as an unresolved ref.
- **The 0004 shrink trigger is left alone.** The one-time flat-to-nested rewrite reads as
  a shrink (N top-level keys become one or two) and archives the flat pre-image once per
  account, which makes the shape migration itself recoverable for free. Rejected
  special-casing the trigger: it would be a second implementation of the shape rule, in
  SQL, drifting from the client's. Pinned by H7/H7b.
- **A non-object collection is refused by the 0004 trigger, not the CHECK** — it calls
  `jsonb_object_keys` on the new value and raises first. The write does not land either
  way; C22 documents which layer does it rather than asserting the wrong error class.

### Fixed in passing

- **Cards with no rarity were dropped from the collection grid entirely.** The rarity
  sections filtered falsy values out of the section list, so 295 Pokémon printings had no
  heading to live under and never rendered. They group under one explicit "Unclassified"
  heading now. Riftbound was unaffected — every printing there has a rarity — which is
  why it survived stage 8.
- **The collection's number search assumed the ref's middle segment held the collector
  number.** It now prefers the card's own `number` field when it has one, so a Pokémon
  search for `GG69` or `107` reaches the right branch.
- **Collector-number sorting assumed numbers were numeric.** 1,621 Pokémon numbers are
  not (`GG69`, `TG12`, `SV107`); they now sort after the numerics, alphabetically, with a
  stable tiebreak on the ref.
- **`#curveBlock` collapsed a 15px flex gap** in the deck panel when the energy curve was
  wrapped so it could hide as a unit. Caught by the pixel comparison, not by a test.

### Minor calls, logged and moved on

- Vendor script writes repo-relative (`data/pokemon/`) rather than to the cwd like
  `build-pool-v2.mjs`, which needs its output moved by hand afterwards.
- Per-set pool files are minified, `sets.json` is pretty-printed. 6.76 MB of generated
  data is not diff-reviewable either way; a 174-entry manifest is.
- Absent fields are omitted from slim records rather than written as `null` — at 20,444
  cards the nulls alone are hundreds of KB.
- Pokémon tiles put the regulation mark in the Signature badge slot (a single letter in a
  16px square is what both are) and HP in the variant slot. No energy orb: a 20px circle
  does not hold "110".
- The Pokémon rarity ladder is ordered for the fourteen rarities people think in; the
  other 25 fall in after them alphabetically, via the same data-driven fallback the
  Riftbound list already relied on.
- Pokémon energy types share the CSS variable namespace with Riftbound domains, so every
  `var(--<axis value>)` rule works for both games unchanged. `Colorless` is shared: it
  means the same thing in both, and the grey was already right.
- Chase rarities for the "still missing" sentence are per game — "Epic or Showcase" for
  Riftbound, "Double Rare or better" for Pokémon — rather than a hardcoded pair.

## QA pass, 2026-08-21 (see docs/qa-pass-log.md for the full log)

- Badge ink on card tiles is pinned, not themed. The chip behind it is a fixed dark wash
  over card art, so `var(--text)` went near-black on near-black in Paper. Chose to pin
  `.variant` and `.regmark` like `.setbadge`/`.ctag` already were, rejecting a per-theme
  override pair for two rules that never wanted to follow the theme.
- `addCard()` merges into an existing deck row by **ref**, not by name. Rejected keeping
  the name match with a Pokémon-only branch: no two Riftbound printings share an exact
  name (now a test), so the ref match is the same behaviour there and the correct one for
  a game that reprints names.
- The collector-number denominator reads the manifest's `total`, progress counts keep
  reading `cards`. Rejected making them agree — they answer different questions, which is
  why the vendor script emits both.
- A superseded set load is dropped by generation counter rather than aborted. The fetch
  still fills `POOL_CACHE`, so the wasted-work version would have been the abort.
- Phone dropdowns are fixed by taking the *wrapper* out of the positioning chain, so each
  panel spans the bar it belongs to. Rejected per-control `right:` offsets — that is what
  the stage-5 `right:-40px` deck-menu rule was, and it was 19px short.
- Rarity filters are reconciled in `adoptPool()` rather than reset in `openSet()`, so
  every route that replaces the pool (fetch, set switch, file import) is covered by one
  line.
