# Blocked / deferred decisions

Each entry: the decision, the options, what was stubbed, what stays broken until it's decided.

---

## 1. `ogn-pool.json` and `build-pool-v2.mjs` are not in the repo

**What it is.** `docs/CLAUDE.md` lists both as repo files. Neither exists on disk. The
author has said the pool JSON will be supplied later.

**Options.**
- Wait for the real file — correct data, but blocks stage 1's "verify card art loads over HTTPS".
- Reconstruct the pool by re-running a fetch script — the fetch script is also missing, and guessing at Riot's API shape would produce wrong data.

**What was stubbed.** Nothing in the app: `index.html` already loads its pool through a
manual file-import picker, so it runs and deploys without a pool file present. Card-art
verification over HTTPS was done against a real Riot CDN URL instead of the full pool.

**What stays broken until it's decided.** Nothing structural. When `ogn-pool.json`
lands it gets its own PR, and the app can then switch from manual import to fetching
the pool from the same origin (a separate, small change).

---

## 2. Account deletion cannot cascade to user data

**What it is.** `docs/CLAUDE.md` asks whether `ON DELETE CASCADE` from our tables to
Neon's identity table is permitted. It is not — see `supabase/migrations/` header
comment and the stage 2 notes. Neon's Managed Better Auth owns the `neon_auth` schema;
its tables are not ours to reference with a foreign key, and Neon may recreate them.

**Options.**
- Periodic sweep — a scheduled job deleting rows whose `user_id` no longer exists in `neon_auth`. Costs CU-hours on a free plan whose budget is the main constraint, and the doc forbids anything that polls the database.
- Delete-on-request in the app — the signed-in user presses "delete my data", the app deletes their rows under RLS before deleting the account. Cheap and correct for the intended flow, but orphans rows if the account is deleted from the Neon Console instead.
- Accept orphans — a few KB of jsonb per deleted account, invisible and harmless at this scale.

**What was stubbed.** The migration creates no FK to `neon_auth`. `user_id` is a plain
`text` column pinned by trigger to `auth.user_id()`, so rows are still unforgeable and
still isolated by RLS. Nothing about correctness or security depends on the cascade.

**What stays broken until it's decided.** Deleting an account leaves its `decks` and
`user_settings` rows behind. No user-visible effect; it is a data-hygiene question.
The delete-on-request path is the recommendation, and it belongs in stage 3 with the
rest of the account UI.

---

## 3. Merge-on-signup behaviour (stage 4 — flagged early, not yet reached)

`docs/CLAUDE.md` reserves this decision for the author. Nothing in stages 0–2 depends
on it. Noted here so it isn't rediscovered late: the schema does not prevent any of the
options (overwrite, merge, keep-both-as-two-decks), because a deck is one jsonb blob and
stage 5 makes decks per-user-many anyway.
