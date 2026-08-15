# Blocked / deferred decisions

Each entry: the decision, the options, what was stubbed, what stays broken until it's decided.

---

## 1. Does the header mockup also respecify the legality checks?

`docs/mockups/singin-button.png` was matched for the account control, which is plainly
what it is about. But the same image draws the legality strip differently from the built
app, and that is a rules change, not a styling one — so it was left alone.

| | Mockup | Built |
|---|---|---|
| Tiles | `LEGEND`, `MAIN`, `RUNES`, `BATTLEFIELD` | `MAIN DECK`, `RUNE DECK`, `BATTLEFIELDS`, `SIDEBOARD` |
| Order | label on top, value below | value on top, label below |
| Sideboard | absent | present, `0/8` |
| Legend | present, reads `SET` | shown in the legend line under the deck name instead |

**Options.** (a) The mockup is a frame for the Sign in button and its checks are
placeholder art — change nothing. (b) The mockup respecifies the strip — then the
sideboard counter goes away, a Legend tile arrives, and label/value flip.

**Stubbed:** nothing. The legality strip is untouched and correct as built.

**Blocked until decided:** only whether option (b) is wanted. Dropping the sideboard
tile changes what the app reports as a legal deck, which is why it was not done on the
strength of a mockup aimed at the sign-in button.

## 2. Google sign-in never delivers a session cookie — a Neon-side defect

**Status 2026-08-16: apparently fixed on Neon's end, live verification outstanding.**
The author signed in with Google on `http://localhost:8080` and the session stuck. No
code in this repo changed between the failing and passing runs, so whatever moved,
moved on Neon's side — there is no local commit to point at. The button is re-enabled
and pushed so the same can be checked on `https://rlomelino1.github.io`, which is the
origin that actually matters and which failed identically before.

**This entry stays open until the live origin is confirmed.** If it passes there, move
the whole thing to Resolved; if it fails there, the disable is a one-line revert and
the evidence below is still the report to file.

**Original conclusion (2026-08-15):** the OAuth callback creates a valid session in the
database and does not give the browser a session cookie. Nothing in this repo can fix
it. Verified on both `http://localhost:8080` and `https://rlomelino1.github.io`.

Evidence, in the order it was gathered:

| Check | Result |
|---|---|
| `neon_auth."account"` after signing in | row with `providerId = google`, linked to the existing user |
| `neon_auth."session"` | **5 sessions** created across the attempts, correct IP, week-long expiry |
| Browser cookie jar for the auth domain | `state`, `aid`, `session_challenge` present — **no `session_token`** |
| Top-level `GET /get-session` (the one context a `SameSite=Lax` cookie *is* sent) | `null` on HTTP **and** on HTTPS |
| HTTPS attempt | created session #5, still `null` — so scheme is not the variable |
| `POST /sign-in/social` with `idToken` | ignored; Neon's wrapper rewrites the endpoint into its `/sign-in/social/init?token=` bridge and returns a redirect even for a garbage token |
| Auth server's own OpenAPI (`/open-api/generate-schema`, 78 endpoints) | no session-exchange endpoint |
| SDK bundle | no `URLSearchParams` / `location.search` handling — the client reads the session from the cookie only |

So the sign-in genuinely succeeds and the result is unreachable. Neon bridges the
*outbound* partition problem with a one-time token in the URL; there is no matching
bridge on the return leg.

**An earlier version of this entry blamed CHIPS cookie partitioning.** That was wrong.
The partitioned cookies are real but incidental — a partitioned cookie would still be
*stored*, and no session cookie is stored at all.

**Options as they stood on 2026-08-15.**
1. **Ship email/password, drop or disable the Google button.** Unblocked today. Costs
   one-tap sign-in on the phone. ← taken, and now unwound
2. **Report it and wait.** The Data API and Managed Better Auth are both beta; the
   evidence table above is a complete report. Costs an unknown amount of time.
3. **One site for app and auth.** Removes every cross-site question at once, but needs a
   custom domain, and Neon's managed auth base URL is not customisable on this plan.

Option 2 is effectively what happened, without the reporting: it started working on its
own inside a day.

**Email/password is confirmed working** (author, 2026-08-15) — signed in and stayed
signed in. So the cookie problem was specific to the OAuth callback, the no-backend
architecture holds, and stage 4 was never blocked by any of this.

**No longer stubbed.** The button is enabled, the tooltip and the note under it are
gone, and the `TODO(decision)` in `index.html` is replaced by a comment recording the
history. Returning from a redirect with nothing still reports *"Google sent you back,
but no session arrived"* — that path is now the live-origin test's failure signal
rather than a permanent state.

**To close this entry:** sign in with Google on `https://rlomelino1.github.io/Riftbound-deck-builder/`.
Session sticks → move to Resolved. Banner appears → re-disable and file the report.

## 3. Which error code arrives for an unverified sign-in

The SDK does not pass the server's error code through. Measured against the live
endpoint on 2026-08-15: the server answers a bad sign-in with
`code: "INVALID_EMAIL_OR_PASSWORD"`, and the thrown `AuthApiError` carries
`code: "invalid_credentials"`. It rewrites messages too — `Password too short` arrives as
`Password does not meet security requirements` under `code: "weak_password"`.

Verified client codes: `invalid_credentials` (401), `validation_failed` (400, bad OTP),
`weak_password` (400). Not reproducible without an account in that state:
`user_already_exists`, `email_not_confirmed`, `otp_expired`.

This mattered beyond wording: the sign-in handler auto-sends a fresh code when an
unverified account tries to sign in, and it was gated on `err.code === "EMAIL_NOT_VERIFIED"`,
which can never fire.

**Stubbed:** `isUnverified()` accepts `email_not_confirmed`, `EMAIL_NOT_VERIFIED`, or a
message matching `/not verified|not confirmed/i`. Nothing is disabled.

**To close:** on the first real sign-up, try signing in before entering the code. If the
banner reads *"Verify your email first"*, the guess is right and the extra spellings can
be dropped.

---

## Resolved

**SMTP sender (was §1).** Settled 2026-08-14: a Gmail account created for this project,
`smtp.gmail.com:587` with a 16-character app password. Chosen over Brevo and Resend
because it needs no domain and no DNS, and deliverability is good because Google
genuinely is the sender. Tested with `POST /auth/send_test_email` — which validates the
config *without* saving it — before the config was written. No existing personal or
work address is involved.

**Merge on signup (was §1).** Decided by the author on 2026-08-14: **keep both.** A deck
built signed out is imported as an additional deck on the account; nothing on either
side is overwritten or discarded. Users can have multiple decks, so the local deck is
just another row. This is the only one of the three options where a mistake is
recoverable — a stray deck is one delete, an overwritten deck is gone.

Implementation notes for stage 4, since the policy is the easy half:

- The trigger fires on *session arrives*, not *button clicked*. Email confirmation means
  the session can land on a fresh page load in a tab that never saw the sign-up form.
- It must resolve exactly once. Mark the localStorage blob as claimed after import, or
  every subsequent load re-imports the same deck.
- Naming: the imported deck needs a name that says where it came from, since the account
  may already hold a deck with the same `Untitled deck` default.

**Pool files (was §1).** `data/ogn-pool.json` and `scripts/build-pool-v2.mjs` were supplied by the
author on 2026-08-14. The pool holds 352 cards, all 352 with an `image` URL. The app
still loads it through the manual file-import picker; switching to a fetch from the
app's own origin is a separate, self-contained change.

**Thumbnail sizing (was §3).** Decided by the author on 2026-08-14: take the smaller
version, revert if it looks wrong. Grid tiles now request `&w=240&fm=webp`; the card
modal keeps the full-size original. Measured live: 779 KB png → 14 KB webp. The 14 pool
entries whose URLs carry no query tag are 1488×2078 masters at 1.43 MB, and drop to the
same 14 KB. Still a hotlink to Riot's CDN — same asset, same host, nothing re-hosted.

**Supabase migration (was §2).** Closed, not deferred. The project is on Neon; the entry
only ever concerned a legacy file `CLAUDE.md` referenced as the thing to adapt, and
that file is not in the repo. `migrations/0001_create_decks.sql` is Neon-native, applied,
and passing 24 tests. Nothing is waiting on it.

**Account deletion cascade.** `CLAUDE.md` anticipated that Neon might not permit
`ON DELETE CASCADE` to its identity table, and called an explicit cleanup path a real
requirement if so. It does permit it. `neondb_owner` holds `REFERENCES` on
`neon_auth."user"` through membership in the `neon_auth` role, the foreign key was
accepted, and test **C10** confirms deleting an account removes that user's decks *and*
settings. No sweep job, no scheduled cleanup, nothing that polls the database — which
matters, because the free plan's CU-hour budget rules those out.

One residual risk, recorded rather than designed around: `neon_auth` is Neon's schema.
If a future Managed Better Auth change recreates that table, an inbound foreign key
could block it or be dropped. Nothing except the cascade depends on the constraint —
ownership is enforced by trigger and isolation by RLS, both of which hold without it.
