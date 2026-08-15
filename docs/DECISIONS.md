# Decisions

One line each: what was chosen, what was rejected.

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

- Grid tiles request `&w=240&fm=webp`; rejected leaving the originals, per the author's call on `docs/BLOCKED.md` §3 — 779 KB → 14 KB measured live, and the revert is a one-line change to `thumb()`.
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

## Google sign-in re-enabled (2026-08-16)

- Re-enabled the Google button on the author's instruction after they confirmed the flow working on `http://localhost:8080`; rejected leaving it disabled pending a live check, because the live origin is the only place the check can happen and the button has to be enabled to run it.
- `docs/BLOCKED.md` §2 stays open rather than moving to Resolved; rejected closing it on the strength of the local pass, since localhost passed the trust check all along and `https://rlomelino1.github.io` is the origin that failed.
- The `TODO(decision)` block in `index.html` became a plain history comment; rejected deleting it, so the next reader learns the failure existed and that nothing here fixed it.
- Kept the "Google sent you back, but no session arrived" return-trip handler untouched; rejected removing it as obsolete — it is exactly the signal the live test needs if the defect is still present there.
