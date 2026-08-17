# Blocked / deferred decisions

Each entry: the decision, the options, what was stubbed, what stays broken until it's decided.

---

## 1. Which error code arrives for an unverified sign-in

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

**The legality-strip question (was §1, "Does the header mockup also respecify the
legality checks?").** Closed 2026-08-16 by the deck-management mockups
(`docs/mockups/darkmode1–3.png`, `lightmode.png`), which answer it directly and split
the earlier mockup's difference: the strip moved into the deck panel as label-left /
value-right rows with progress bars, the **sideboard row stays** (`0/8`), and the
Legend got its own box above the strip rather than a tile in it. Nothing about what
the app reports as a legal deck changed.

**Google sign-in (was §2).** Closed 2026-08-15. Neon shipped a return-leg session
exchange and the flow works end to end — verified by the author on the live Pages URL
and on iOS Safari. The only code change was removing `disabled` from the button.
Reconfirmed after the August 2026 move to `https://cardhavenapp.com`: the same
CHIPS-based partitioned cookie (`SameSite=None; Secure; Partitioned`) works on the
custom domain, with the partition key now `https://cardhavenapp.com`.

The session no longer depends on a cookie set during the callback redirect. The callback
returns to the app with a one-time verifier in the query string, and the next
`getSession()` trades it for a session cookie. The table is the measurement as taken
on 2026-08-15, on the old Pages origin — the origin-dependent rows (partition key,
CORS) now read `https://cardhavenapp.com` instead:

| Observation | Value |
|---|---|
| Session endpoint call | `GET /neondb/auth/get-session?neon_auth_session_verifier=<opaque>` |
| Cookies sent up | two `__Secure-neon-auth.session_challange` cookies |
| Cookie set in response | `__Secure-neon-auth.session_token`, 7 days |
| Its attributes | `HttpOnly`, `Secure`, `SameSite=None`, **`Partitioned`** |
| Its partition key | `https://rlomelino1.github.io` (the top-level site) |
| The challenge cookies, same response | expiry `0 ms` — burned on use |
| CORS | `Access-Control-Allow-Origin: https://rlomelino1.github.io`, `Allow-Credentials: true` |

Neon spells it **`session_challange`**. Grepping for `challenge` finds nothing.

**On the CHIPS correction — the earlier entry corrected itself in the wrong direction.**
Version one blamed CHIPS cookie partitioning. Version two called that wrong, on the
reasoning that a partitioned cookie would still be *stored* and none was. The reasoning
was sound and the conclusion was right *for that cookie*: the callback genuinely set
nothing. But partitioning is not incidental here — `Partitioned` is precisely the
mechanism that now makes it work, because it is what lets a cookie survive in a
third-party context at all. The right reading is that the cookie was missing because
there was no return leg to set it, and the fix Neon shipped is a partitioned cookie set
by a credentialed same-site-of-the-partition request. Both earlier versions were
reasoning about the right mechanism and mislocating the fault.

`@neondatabase/auth` stayed pinned at `0.5.0-beta` (latest published, npm 2026-08-11)
across the failing and passing runs. This was a server-side change; the version was not
bumped and does not need to be.

**Who consumes the verifier.** Measured against the published bundle, not assumed — the
old entry's "the SDK has no `location.search` handling" was read off a module graph that
missed `dist/adapter-core-*.mjs`, which is where this lives. Its `getSession`
interceptor reads `neon_auth_session_verifier` from `location.search`, appends it to the
`/get-session` request, sends `credentials: include`, and on success deletes the param
via `history.replaceState`. So calling `auth.getSession()` on load *is* the integration —
`index.html` already did, which is why re-enabling the button was the only change needed.

Three scenarios, driven against a stubbed transport:

| `location.search` | Server answers | Request the SDK made | Param cleaned after |
|---|---|---|---|
| *(empty)* | signed out | `GET /get-session` | n/a |
| verifier present | session + user | `GET /get-session?neon_auth_session_verifier=…` | **yes** |
| verifier present | signed out | `GET /get-session?neon_auth_session_verifier=…` | **no** |

The third row is why `index.html` strips the param itself after a failed return: a burned
single-use verifier should not stay in the address bar to be bookmarked or shared.
Accumulation across retries is not a risk either way — the SDK uses `searchParams.set`,
which overwrites.

**If it regresses**, the fingerprint is in `docs/auth-setup.md` alongside the record
of the one-time sign-out the August 2026 custom-domain move caused.

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
