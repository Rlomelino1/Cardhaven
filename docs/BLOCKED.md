# Blocked / deferred decisions

Each entry: the decision, the options, what was stubbed, what stays broken until it's decided.

---

## 1. Which SMTP sender (stage 3)

**What it is.** The author has decided against Neon's shared sender
(`auth@mail.myneon.app`) and wants password-reset mail to come from a real address.
Which address is theirs to pick — it is their identity on the mail, and one option
involves a work domain.

**Options.**
- **Gmail + app password** — `smtp.gmail.com:587`, sends as a Gmail address, proper SPF/DKIM because it really is Google sending it, 500/day, free, no domain or DNS work. Requires 2FA on the account to mint an app password.
- **Brevo free tier** — 300/day, and a single sender address can be verified by clicking a link in it, so no domain or DNS is required.
- **Resend free tier** — 3,000/month and a cleaner sending identity, but sending as anything other than a sandbox address needs a domain verified over DNS.

Whichever is chosen, the account is a new one created for this project. No existing
personal or work address is used.

**What was stubbed.** Nothing. The shared sender works today, so password reset
functions; it just arrives from a Neon address and is likelier to be filtered.

**What stays broken until it's decided.** Nothing in code — SMTP is console
configuration and no part of `index.html` references it. Stage 3 can be built and
tested in full on the shared sender and switched over at any point.

---

## Resolved

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
