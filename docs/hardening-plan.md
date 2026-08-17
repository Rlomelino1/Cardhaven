# Hardening, testing, and performance plan

A read-only audit pass. Nothing here is implemented yet; the only change that ships
with this document is the document. Stage 7 (Showcase 3-copy limit) is untouched and
takes priority over everything below.

Every finding was verified against the running code, the live deployment, or the pool
data — not read off the source and assumed. Where a claim was checked by driving the
app, the method is stated so it can be re-run.

Priority order is security, then testing, then performance. Organised by tier, not by
topic:

- **Tier 1 — do now**: benefit clearly outweighs cost.
- **Tier 2 — worth it soon**: real benefit, nontrivial effort; sequenced after Stage 7.
- **Tier 3 — considered and rejected**: named, with why it lost.

The governing filter throughout: this is a single-file, no-build hobby app, one primary
user plus a trickle, optimised for "works unattended for months." A recommendation that
adds page-load latency, a build step, a framework, or standing maintenance needs an
exceptional reason. The asymmetry that keeps security in scope: the Neon Data API and
auth endpoints are public internet URLs regardless of traffic, so the threat model is a
hostile stranger with the URL, not a friendly collector.

---

## What was measured (the evidence base)

**Live deployment headers** (`curl` against `https://cardhavenapp.com`, 2026-08-17):

- HTML: `200`, `Content-Encoding: gzip`, ~41 KB gzipped (139 KB raw), `ETag`,
  `Cache-Control: max-age=600`, HTTPS enforced. `data/ogn-pool.json`: gzip, ~29 KB
  gzipped (240 KB raw), same cache policy.
- No brotli (gzip only) — a few KB left on the table, not controllable on Pages anyway.
- `www.cardhavenapp.com` → `301` to the apex. Good.

**Data API surface** (`curl`, no/forged credentials):

- Unauthenticated `GET /decks` → `400` `"missing authentication credentials"` — rejected
  at the gate, no row read, no DB compute spent.
- Forged/garbage JWT → `400`. The `neon_auth."user"` table and the PostgREST root
  (`/rest/v1/`) both → `400` unauthenticated. Nothing is anonymously enumerable.

**Startup timing** (Playwright against the live site, cold):

- First contentful paint ≈ 2.40 s, almost entirely gated by TTFB ≈ 2.33 s (Fastly edge +
  network). The inline HTML means first paint waits only on the HTML transfer; the pool
  JSON arrives 9 ms after the HTML and the SDK modules load *after* paint without
  blocking it.
- The esm.sh module graph is **~140 files** (the Neon auth entry transitively pulls the
  full `better-auth@1.6.23` client with every plugin, all of `jose@6.2.5`, `zod@4.3.6`,
  `@supabase/auth-js@2.79.0`, `nanostores`, `defu`, `better-fetch`), ~168 KB resolved.
  Each is cached and returns in ~18–50 ms. It does **not** gate first paint or
  deck-building — only the moment the account control and sign-in become live.

**Render cost** (Playwright, `performance.now()` around `render()`):

- Full 352-tile browser grid: ~13–15 ms. Filtered to 48: <3 ms. A per-keystroke search
  re-render at 48 cards: ~0.8 ms. Collection full-grid (352 tiles): ~31 ms. Rendering is
  not a bottleneck at the current pool size.

**Collection grid images**: 352 `<img>`, all `loading="lazy"` ✅, none `decoding="async"`.

**Pool data** (`data/ogn-pool.json`, 352 cards): every card has a `riftboundId`; ids
match `[a-z0-9-]` except 12 Signature cards whose id carries a `*` (`ogn-299*-298`) —
harmless in both HTML and JS-string contexts. 19 card **names** contain an apostrophe
(`Kai'Sa`, `Zhonya's Hourglass`, …). No card name/text/artist contains `<` or `>`.

---

# Part 1 — Security

## The XSS walk: where every `innerHTML` input comes from

There are ~27 `innerHTML` assignments. Classified by input source:

- **Static / app-generated** (filter chips, legality rows, curve bricks, zone tabs, deck
  menu chrome, energy glyphs): no external input. Safe.
- **Pool-derived** (card name, type, rarity, artist, rules text, domains, collector
  number): comes from `data/ogn-pool.json`, served from our own origin. Rendered through
  `esc()` at every text position. The pool currently contains no HTML metacharacters, but
  it is treated as escaped input regardless, which is correct — a future set fetch should
  not become an injection.
- **User-controlled** (deck name, imported deck JSON, the collection map): the interesting
  ones. Walked individually below.

**Deck name** — rendered via `esc()` in the switcher (`.dmname`), set as an input
`.value`, and passed to `ask()`/`confirm()` which use `textContent`. No path puts it in
an inline handler. Safe.

**Collection map** — keys are refs, values are integers passed through
`sanitizeCollection()` (coerced to 1–3). Never interpolated into script. Safe.

### CONFIRMED bug — XSS via imported deck file (the one real hole)

`esc()` HTML-entity-encodes (`'` → `&#39;`). Several inline `onclick` handlers embed a
value into a **JavaScript string** inside a double-quoted attribute, e.g. in the zone
list, the results grid, the collection tiles, and the modal buttons:

```js
onclick="openCard('${esc(c.riftboundId||c.name).replace(/'/g,"\\'")}')"
imgFail(this,'${esc(c.name).replace(/'/g,"\\'")}')
```

The `.replace(/'/g,"\\'")` was clearly meant to backslash-escape quotes for the JS-string
context — but it runs **after** `esc()` has already turned every `'` into `&#39;`, so it
matches nothing and is dead code. At attribute-parse time the browser decodes `&#39;`
back to `'`, which closes the JS string. HTML-entity encoding is the wrong defense for a
JS-string context.

**Verified by driving the app** (`scratchpad/xss-probe.mjs`, local server + Playwright):
importing a deck whose card has no `riftboundId` and name `x'); window.__xss(); //`
renders `onclick="openCard('x'); window.__xss(); //')"`, and clicking the entry **fired
`__xss()`**. Confirmed, not theoretical.

- **Why the live pool is safe today**: every pool card has a quote-free `riftboundId`, and
  `refOf`/`riftboundId||name` resolves to the id, so pool cards never reach the vulnerable
  branch. The hole opens only for an entry carrying a **name** with a `'` and **no id** —
  which the committed data never produces but an **imported file** does.
- **Blast radius**: import is the trigger. It is self-XSS in the strict sense (you import
  the file), but decklists are shared artifacts in this community, so "open this deck I
  made" is a plausible delivery. A malicious name round-tripped through the database is
  *de*fanged — it comes back as an unresolved `ref` rendered only as escaped text, never
  in a handler — so the DB is not a persistence vector. Import-render is.
- **Same root cause, second symptom**: for the 19 apostrophe-named pool cards, if a
  thumbnail fails to load, the `imgFail(this,'Kai&#39;Sa …')` handler decodes to a
  syntax error and the fallback SVG never swaps in. A broken image stays broken. Minor,
  but it's the same bug and the same fix clears it.

**Tier 1.** *What*: replace the broken quote-escaping with a correct approach. *Why*:
confirmed script execution from an imported file. *How*: two options, prefer the second —
  1. A real JS-string escaper used at these sites (`jsStr(s)` that backslash-escapes `\`,
     `'`, `"`, `\n`, `\r`, `<`, `>`, `&`), replacing the `esc(...).replace(...)` idiom; or
  2. **Drop inline `onclick` for the card grids and lists and use event delegation** — a
     single listener per container reading `data-ref` (already present on collection
     tiles). This removes the whole class of attribute-injection, is less code at each
     render site, and makes a future `script-src` CSP that forbids inline handlers
     possible. Refs are the only interpolated values and they are quote-free, but
     delegation removes the footgun permanently.
  *Effort*: option 1 ~1 hr; option 2 ~half a day (touches every grid/list render + the
  modal buttons). *Performance cost*: none (delegation is marginally *faster* — fewer
  attributes serialized per tile).

## Content Security Policy via `<meta>` — achievable, with one honest limit

No CSP exists. Pages gives no response-header control, so the only lever is
`<meta http-equiv="Content-Security-Policy">`. `meta` **cannot** set `frame-ancestors`
(so clickjacking defense is unavailable — see Tier 3) and cannot set `report-uri`.

The honest script-src limit: the app has two large inline `<script>` blocks **and**
pervasive inline `onclick=` handlers. A `script-src` that omits `'unsafe-inline'` would
need per-script hashes *and* would still block every inline handler — so without the
delegation refactor above, `script-src` must keep `'unsafe-inline'`, and therefore does
**not** constrain injected script execution. That part is theater and this plan does not
pretend otherwise.

What is **not** theater, even with `'unsafe-inline'` script: `connect-src`, `img-src`,
`object-src`, `base-uri`, and `form-action` all constrain **post-exploitation**. If an
XSS did fire, `connect-src` locked to the two Neon hosts stops it exfiltrating stolen
data to an attacker server; `img-src` stops beacon loads; `base-uri 'none'` stops `<base>`
hijack of the relative pool fetch; `object-src 'none'` blocks plugin vectors. That is
real defense-in-depth for a few lines of markup.

**Verified non-breaking** (`scratchpad/csp-test.mjs`: injected the policy as a meta tag
into the live document via Playwright route-rewrite, then loaded fully). The pool loaded
(352 cards), the auth module initialized (`window.cloud` present), the account control
painted, a grid image loaded, and **zero CSP violations** were reported. The validated
policy:

```
default-src 'none';
script-src 'unsafe-inline' https://esm.sh;
style-src 'unsafe-inline';
connect-src https://ep-flat-tooth-ay7zxkh2.neonauth.c-5.us-east-2.aws.neon.tech
            https://ep-flat-tooth-ay7zxkh2.apirest.c-5.us-east-2.aws.neon.tech 'self';
img-src https://cmsassets.rgpub.io data:;
base-uri 'none';
object-src 'none';
form-action 'none'
```

**Tier 1.** *What*: add this meta CSP to `<head>`. *Why*: contains an XSS's reach even
while `script-src` stays permissive; cheap. *How*: paste the block above (single-line it);
re-run `csp-test.mjs` after any endpoint change. *Effort*: 30 min including a
re-validation pass. *Performance cost*: none (a parsed meta tag; no request, no paint
delay). *Note*: pairs with the escaping fix — the CSP is the seatbelt, the fix is the
brakes. If the delegation refactor (option 2 above) lands, tighten `script-src` to drop
`'unsafe-inline'` in a later pass and re-validate.

## Supply chain — the esm.sh graph is the largest unpinned surface

The two pinned SDK imports transitively resolve to **~140 modules** from esm.sh, and the
transitive versions **float**: the pinned `@neondatabase/auth@0.5.0-beta` currently drags
in `better-auth@1.6.23`, `jose@6.2.5`, `zod@4.3.6`, `@supabase/auth-js@2.79.0` — none of
which we pin. A compromise or bad publish anywhere in that tree runs with full page
privileges on every load.

Options weighed:

- **SRI (`integrity=`) on the entry points** — impractical here. esm.sh rewrites modules
  and the risk is in the *transitive* graph, which the entry hash does not cover; and
  esm.sh can re-resolve transitive URLs, changing content an entry hash can't pin.
  Rejected as a false sense of security (Tier 3).
- **Exact-pin the transitive graph** — esm.sh supports immutable build-hashed URLs, but
  pinning 140 of them by hand and re-deriving them on every SDK bump is unmaintainable for
  a one-person project. Rejected (Tier 3).
- **Vendor the resolved module graph into the repo** — commit the ~168 KB of resolved
  `.mjs` files and import them with relative paths instead of from esm.sh. This is the
  only option that actually closes the hole: the code that runs is the code in the repo,
  reviewable in a diff, and the app no longer depends on esm.sh being up or honest at
  load time. It is **compatible with the no-build-step rule** — these are static files
  served alongside `index.html`, not a bundler or a runtime `node_modules` — and is in
  fact *more* conservative than the current CDN import. Costs: ~168 KB added to the repo,
  a manual re-vendor step when the SDK is intentionally upgraded (a script can automate
  the fetch-and-rewrite), and a one-time verification that the relative-import graph loads
  identically.

**Tier 2.** *What*: vendor the Neon auth + postgrest-js resolved graph under e.g.
`vendor/neon/` and switch the two imports to relative paths. *Why*: removes a 140-module
floating third-party dependency from the load path and makes the running code auditable.
*How*: fetch the full graph (the walk in `scratchpad/esm-graph.mjs` enumerates it),
rewrite the internal `/…` specifiers to relative, commit, point the `<script type=module>`
imports at the local copies, tighten `script-src`/`connect-src` to drop `https://esm.sh`,
re-run the smoke suite. *Effort*: ~1 day including a re-vendor helper script.
*Performance cost*: **positive** — removes ~140 cross-origin requests and the esm.sh
resolution latency from the auth-ready path; served same-origin, gzipped, HTTP-cached.
First paint is already independent of this, so the win is "sign-in becomes live sooner,"
not first paint. *Decision note*: this does not reverse any logged decision — CLAUDE.md
permits ESM-from-CDN but does not require it, and vendoring static files respects
"single file, no build step" in spirit. Accepting the risk as-is is also defensible given
esm.sh's own integrity and the small blast radius; if the author prefers not to carry
vendored code, that is a legitimate Tier-3 outcome and should be recorded as such.

## RLS and the authorization boundary — holds; extend the *tests*, not the schema

The boundary was audited against the migrations and the 24-test suite and it is sound:

- Both reachable tables (`decks`, `user_settings`) have a policy for **every** verb;
  UPDATE policies carry **both** `USING` and `WITH CHECK`; `anonymous` is granted nothing
  and named in no policy (two independent reasons a signed-out read returns zero rows).
- **Mass-assignment is defused**: `pin_ownership()` overwrites client-supplied `user_id`
  and `created_at` on INSERT and pins them to the old values on UPDATE, so a client cannot
  insert a row owned by someone else or re-home one (tests T1, T2, C8, C9).
- `app_user_id()` is `SECURITY DEFINER` with `search_path=''` and a strict uuid regex, so
  a malformed JWT `sub` yields NULL (matches nothing) rather than a 500 (test C11), and
  RLS survives Neon re-provisioning the `auth` schema (migration 0002).
- Column exposure is appropriately narrow: the client selects `id,name,payload,updated_at`
  from `decks` and only `collection` from `user_settings`; RLS scopes every read to the
  caller's own rows regardless.

Verified live: unauthenticated and forged-JWT calls are rejected at the PostgREST gate
with `400`, so none of this even reaches a policy for a stranger.

**One genuine gap — abuse, not authorization: unlimited rows per user.** There is no cap
on how many deck rows one account can create. Each is bounded to 256 KB, but nothing
bounds the *count*. A verified account (the only barrier is sign-up + email OTP) can
insert rows until the project's 0.5 GB storage cap, which would break the site for
everyone until manually cleared. `user_settings` is naturally capped at one row per user
by its PK, so only `decks` is exposed.

**Tier 2.** *What*: a per-user deck row-count backstop. *Why*: closes the one
internet-facing way a stranger can degrade the shared free-tier database. *How*: a
`BEFORE INSERT` trigger on `decks` that raises when the caller already owns N rows (e.g.
100 — far above any real collection, low enough to bound abuse), enforced in the same
`SECURITY DEFINER` style as the existing triggers so it can't be bypassed from the client.
Add it as a new migration `0003_*`; it is additive, not destructive. *Performance cost*:
one indexed `count(*)` on `(user_id)` per insert — negligible, and inserts are
Save-button-only. *Testing*: extend `migrations/tests/constraint_test.sql` with a case
that the (N+1)th insert for one user is rejected while N succeed, and that a second user
is unaffected.

**Test-coverage additions for the SQL suite** (plan, not code):

- **C13** — the row-count cap above.
- **C14** — a JWT `sub` that is a *valid uuid but not a real user* reads zero rows and
  cannot insert (the FK to `neon_auth."user"` rejects the insert). Confirms a forged but
  well-formed token gains nothing. The current suite stubs `app_user_id()` to a seeded
  user; this case exercises the unseeded-uuid path the stub skips.

## Session and auth flow — coherent

- No token in `localStorage` or the URL: the JWT lives in the SDK's in-memory session and
  the partitioned session cookie; `lastToken` is a module-scope variable (for the
  keepalive PATCH), never persisted. The OAuth `neon_auth_session_verifier` is stripped
  from the address bar on both the success (SDK) and failure (app) paths.
- Sign-out calls `auth.signOut()`, nulls `session`, and repaints — and `collectionKeepalive`
  guards on `session?.id`, so a stale in-memory `lastToken` can't fire a write after
  sign-out.
- **No confused-origin path**: the old Pages URL no longer serves the app (the repo was
  renamed; `https://rlomelino1.github.io/Riftbound-deck-builder/` now returns `404`, and
  only the trusted `cardhavenapp.com` origins are registered in Neon Auth and Google
  OAuth). There is no second live origin to confuse the auth flow.

No action. (One doc-truth note, not a security item: the README claims the old Pages URL
"redirects there" — it actually 404s, because the redirect only exists on the *renamed*
repo path `…/Cardhaven/`. Worth a one-line README correction in a future doc pass; out of
scope for this commit.)

## Other static-app checks (swept, worth-it filter applied)

- **Reverse tabnabbing / `target="_blank"`**: none in the app — the only anchors are
  in-page (`data-view`, `href="#"`). Nothing to fix.
- **Referrer leakage to Riot's CDN**: already handled — `<meta name="referrer"
  content="no-referrer">` plus per-image `referrerpolicy="no-referrer"`. No action.
- **Open redirect**: the only redirect input is the OAuth `callbackURL`, set to
  `location.href.split("#")[0]` (self), and validated server-side by Neon's trusted-domain
  list. No user-controlled redirect target. No action.
- **Prototype pollution via imported JSON**: `sanitizeCollection` assigns numeric values
  (a `__proto__` key with a number is ignored by the setter), and deck hydration reads
  fixed fields into fresh objects via `normalize()`. Low risk; not worth special-casing
  (Tier 3).

---

# Part 2 — Testing

Current state: 24 SQL tests (constraints + RLS), all passing, run locally via a throwaway
`pg` script. **Zero committed frontend tests.** Playwright has been used ad hoc during
stage work (and in this audit) but nothing lives in the repo or runs on push.

The design constraint that shapes all of this: the app is one HTML file with no module
system, so the logic isn't importable. The least-invasive way to test it is a Playwright
harness that drives the **real page** and calls its functions through `page.evaluate` —
the same technique this audit used to confirm the XSS and validate the CSP. That respects
the single-file rule (no extraction, no build) and tests the code as shipped.

## Tier 1 — a committed Playwright smoke suite

*What*: `tests/e2e/` with a Playwright config that serves the repo statically (a tiny
Node static server — `npx serve` starts a download-prone default on some setups; a 15-line
static handler like the ones in `scratchpad/` is more reliable) and asserts the core
journeys:

- App boots; pool loads (352 cards); browser grid renders; onboarding hides.
- Search and each filter (domain/type/rarity/variants) narrow the grid; result count
  matches.
- Deck add/remove respects the 3-copy cap; zone routing (Rune → rune deck, Battlefield →
  battlefields) works; legality banners appear/clear at the right counts.
- Collection steppers cap at 0 and 3; tab counts (all/missing/partial/playset) are
  consistent; "mark all / clear" dialogs behave.
- Theme toggle persists across reload (`localStorage` `rb.theme`).
- Signed-out deck survives a reload (the localStorage round-trip).

*Why*: these are the paths a regression would silently break, and none are covered today.
*How*: `@playwright/test` as a **dev-only** dependency (never imported by the app at
runtime — consistent with the no-runtime-dependency rule). *Effort*: ~1 day for the first
suite. *Performance cost*: none (dev/CI only).

## Tier 1 — pure-logic tests via an in-page harness

*What*: assert the high-value pure functions directly through `page.evaluate` against the
loaded page: `serializeDeck`/`hydrateDeck` round-trip (including the fat-legacy and
slim-`{ref,qty}` shapes and unresolved-ref preservation), `sanitizeCollection` clamping,
the signed-out→signed-in collection **max-merge**, import parsing of the three accepted
file shapes, and `esc()` / the new `jsStr()` escaper (regression-guard the XSS fix so it
can't silently rot again).

*Why*: highest value, lowest cost — this is where correctness bugs with real user impact
live (merge is the Stage 4 risk item; escaping is the confirmed vuln). *How*: same harness
as the smoke suite; no logic extraction, so the one-file constraint is untouched.
*Effort*: ~half a day. *Performance cost*: none. This is the single most worthwhile piece
of testing in the plan.

## Tier 2 — auth-dependent flows with mocked network

*What*: cover sign-in/out, the merge-on-signup deck import, and the collection sync by
**intercepting the network with Playwright route interception** and stubbing the Neon auth
+ Data API responses ({data, error} contracts the app already normalizes to).

*Why*: these flows are load-bearing and currently untested, but a **live test account is
the wrong tool** — it burns Neon CU-hours (the scarcest resource, and the one thing
CLAUDE.md most warns against spending on automation), depends on email-OTP delivery
(non-deterministic, unautomatable), and needs secrets in CI. Mocking at the network
boundary is deterministic, free, and offline. *How*: `page.route` the auth and apirest
hosts; assert the app's handoff (`onCloudSession`) and the merge logic given canned server
maps. *Effort*: ~1 day (the mocking scaffold is the bulk). *Performance cost*: none.

## Tier 3 — render-correctness by screenshot; live-account auth tests

- **Screenshot assertions against the mockups**: rejected as the *primary* mechanism.
  Pixel diffs are flaky across OS font rendering and headless-vs-real compositing, and the
  mockups are design intent, not the current pixels. **Targeted DOM assertions** (element
  present, class applied, count/text correct) are the saner substitute and belong in the
  Tier 1 smoke suite. One tolerant, single full-page screenshot per theme as a *canary*
  (large diff threshold) is acceptable if the author wants a visual tripwire, but it is
  not load-bearing coverage.
- **Live-account auth tests**: rejected — see the Tier 2 rationale (CU-hours, OTP
  non-determinism, CI secrets).

## CI — GitHub Actions that informs, never gates the deploy

*What*: a workflow on push/PR that runs the Playwright suite headless.

*Why*: catches regressions before they reach `main`. *How*: it must not touch the Pages
deploy mechanism — Pages is a **branch deploy from `main`**, which publishes independently
of Actions, so a failing test **cannot** block the site going live. That is the correct
behavior for a one-person project (a red test informs; it does not wedge the deploy). The
workflow installs `@playwright/test`, serves the repo, runs `tests/`, uploads the report.
*Effort*: ~half a day. *Performance cost*: none (CI only). *Caveat*: the workflow lives in
`.github/workflows/`, which is fine — Pages ignores it — but confirm `.nojekyll` and the
branch-deploy source stay untouched.

**Can the SQL tests run in CI?** Technically yes — a Neon branch per CI run (create,
apply, test, delete) is the standard pattern. **Rejected for now (Tier 3)**: it needs
`NEON_API_KEY` as a CI secret (a project-scoped Editor key exposed to every workflow run,
including PRs from any future contributor), and juggles against the 10-branch cap if runs
overlap or cleanup fails. For a suite that changes rarely and runs fine locally in
seconds, the standing secret-exposure and branch-cap risk outweigh the benefit. Keep the
SQL tests local; if that calculus changes (real contributors, frequent schema churn),
revisit with a dedicated least-privilege key and a hard branch-cleanup step.

---

# Part 3 — Performance

Measured first, per the brief. The short version: **the app is already fast where it
matters, and the one number a user feels (first paint) is gated by edge/network latency
we don't control.** Most of this section is "fine as-is."

## Tier 1 — the two free wins

- **`decoding="async"` on grid images** (browser + collection grids). *What*: add the
  attribute alongside the existing `loading="lazy"`. *Why*: lets the browser decode card
  art off the main thread, so a burst of images becoming visible can't jank a scroll.
  *How*: one attribute in `tileHtml` and `colTileHtml`. *Effort*: 5 min. *Performance
  cost*: none — it only helps. *Felt effect*: marginally smoother scroll on the 352-tile
  collection grid on a phone; nothing dramatic.
- **`preconnect` hints for the two runtime hosts**. *What*: `<link rel="preconnect">` for
  `https://cmsassets.rgpub.io` (card art) and, until/unless the SDK is vendored,
  `https://esm.sh`. *Why*: warms the TLS handshake before the first image / module request,
  shaving the connection setup from the critical path to those hosts. *How*: two `<link>`
  tags in `<head>`. *Effort*: 5 min. *Performance cost*: negligible (preconnect opens a
  socket early; to exactly two hosts the app already uses, so no waste). *Felt effect*:
  card thumbnails appear slightly sooner on first load; small.

## Tier 3 — measured and deliberately not done now

- **Debounce the search input**: rejected *now*. Every keystroke calls `render()`, but a
  filtered re-render is ~0.8–3 ms at 352 cards — below perceptible. Debouncing would add a
  timer and a slight input-to-result lag for zero felt gain. **Revisit when the pool
  roughly doubles** (a second Riftbound set): at ~700+ cards a full-grid render approaches
  30 ms and a per-keystroke debounce (~120 ms trailing) starts to earn its keep. Noted,
  not built.
- **`DocumentFragment` / targeted-diff rendering**: rejected now. Full 352-tile render is
  ~15 ms; the collection already does targeted single-tile updates on the common
  quantity-change path (`updateColTile`) specifically to avoid full repaints. The
  `innerHTML` rebuild is fine at this scale. Same "revisit when the pool doubles" trigger.
- **Shrinking / deferring the esm.sh graph for startup**: rejected as a *performance*
  item. The 140-module graph does not block first paint or deck-building (it loads after
  paint, as a deferred module), so trimming it buys no felt startup speed. Vendoring it is
  worth doing — but for the **supply-chain** reason in Part 1, not for perf. Filed there.
- **First-paint optimization**: nothing to do. FCP ≈ 2.4 s is ~97% TTFB (Fastly edge +
  network cold path); the inline-everything HTML already means first paint waits only on
  the HTML byte transfer. There is no render-blocking sub-resource to defer and no build
  step to add a critical-CSS trick to. This is as good as a static Pages origin gets.
- **Interaction latency in click paths**: swept, nothing to fix. The one synchronous
  network action in a click path is the Save button (an explicit user action with a
  visible "Saving…" state), and the collection sync is already debounced/coalesced off the
  render path. No layout-thrash hotspots (renders build a string and assign `innerHTML`
  once per container, not in a read/write loop).

---

# Proposed sequencing

Stage 7 (Showcase 3-copy limit) comes first and is not touched by any of this.

**After Stage 7 — one "Stage 8: hardening" bundle** (the Tier 1 items, plus the two
cheap Tier 2 SQL pieces, in one reviewable commit or a short series):

1. **Fix the escaping XSS** (prefer event delegation for the grids/lists; correct
   `jsStr()` escaper elsewhere) — also clears the apostrophe-card `imgFail` bug.
2. **Add the validated meta CSP** — the seatbelt for (1), verified non-breaking.
3. **`decoding="async"` + `preconnect`** — free perf, no reason to hold them back.
4. **Row-count backstop migration (`0003`)** + its two new SQL tests (C13/C14).
5. **Commit the Playwright smoke suite + in-page pure-logic tests + the CI workflow** —
   so that everything above lands with regression coverage rather than before it.

Items 1–3 are frontend-only and independently shippable; 4 is a standalone additive
migration; 5 is the safety net that should accompany, not follow, the behavior changes.
If the delegation refactor (item 1, option 2) lands cleanly, a **later** small pass can
tighten `script-src` to drop `'unsafe-inline'` and re-validate.

**Later, when convenient (Tier 2, not blocking):**

- **Vendor the Neon SDK graph** and switch to relative imports — the supply-chain fix.
  Larger and lower-urgency; do it as its own focused change with a re-vendor helper
  script, and re-run the smoke suite as the acceptance gate. (Or consciously accept the
  esm.sh risk and record that as the decision — a legitimate outcome at this scale.)
- **Auth-flow tests with mocked network** — fold into the test suite once the smoke suite
  exists to build on.

**Explicitly deferred until the pool doubles** (a second set): search debounce and
diff-rendering. Both are noted with the trigger so they aren't rediscovered from scratch.
