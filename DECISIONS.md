# Decisions

One line each: what was chosen, what was rejected.

## Stage 0 — repo setup

- Kept `CLAUDE.md` at `docs/CLAUDE.md` where it was placed; rejected moving it to the repo root, even though root is the Claude Code auto-load convention — relocating a file the author just placed is their call.
- `.gitignore` ignores `.env*` with a `!.env.example` escape hatch; rejected a bare `.env` line, so a future `.env.local` can't leak.
- `.gitignore` covers `node_modules/` and `dist/` despite there being no build step; rejected a minimal ignore file, because dev-time tooling produces them and they must never be committed.
- Committed the baseline straight to `main`; rejected opening a PR for it, because the repo had zero commits and there was no base branch to target. Everything after it goes through a PR.
- Committed `index.html` with its pasted UI chrome intact and fixed it in PR #1; rejected cleaning it silently inside the baseline, so the fix reads as a reviewable diff.

## Stage 1 — deploy

- Enabled Pages via `gh api` as a branch deploy (`main` / `/`); rejected a build workflow, per the standing decision.
- Verified card art against a real asset hash found in a public card database repo; rejected waiting for `ogn-pool.json`, because the CDN's behaviour is a property of the CDN and does not need our data to test.
- Logged the 818 KB → 15 KB thumbnail finding in `BLOCKED.md` instead of implementing it; rejected just doing it, because card art handling is a decision reserved to the author.

## Stage 2 — schema

- Wrote `migrations/0001_create_decks.sql` fresh from the design described in `docs/CLAUDE.md`; rejected pretending to adapt the Supabase migration, which is not in the repo (`BLOCKED.md` §2).
- Put migrations in `migrations/`; rejected `supabase/migrations/` — a `supabase/` directory in a project that deliberately chose Neon over Supabase reads as a mistake six months from now.
- `user_id` is `uuid` with an FK to `neon_auth."user"(id)`; rejected the `text` column in Neon's own docs example, because uuid is what that table's primary key actually is and it is what makes `ON DELETE CASCADE` possible.
- Policies call a wrapper, `public.app_user_id()`, rather than `auth.user_id()::uuid` inline; rejected the bare cast, which raises `22P02` on a non-uuid `sub` and would turn a denied read into a 500 instead of an empty result.
- Kept `auth.user_id()` as the underlying helper; rejected `auth.uid()` (which also exists here and returns uuid directly), because `docs/CLAUDE.md` and Neon's Data API docs both specify `user_id()`.
- Four policies per table, one per verb; rejected a single `FOR ALL` policy, so each verb is independently auditable and `USING` vs `WITH CHECK` is explicit.
- Granted `anonymous` nothing on either table; rejected granting it `SELECT` and relying on policy absence alone — test T9 proves RLS alone would suffice, so this is a second independent reason a signed-out read returns nothing.
- `name` is a column on `decks`, not a payload key; rejected burying it in jsonb, so stage 5 can list and rename decks without parsing blobs.
- `payload` constraints check size, type, and zone shape but *not* card-entry shape; rejected a strict card schema, which would reject the fat objects the current client writes and break stage 4 before the shrink lands.
- Added an explicit `check (not (payload ? 'pool'))`; rejected relying on the size limit alone, so an accidental full-state POST fails loudly rather than depending on how big the pool happens to be.
- Created `user_settings.collection` now, empty, rather than in stage 6; rejected deferring it, because adding a column later means a schema change against live data.
- `FORCE ROW LEVEL SECURITY` left on even though `neondb_owner` holds `BYPASSRLS` and overrides it; rejected removing it, so the guarantee doesn't silently depend on who owns the table later.
- Migration runner is a throwaway Node script + `pg` in a scratch directory outside the repo; rejected installing `psql` or `neonctl` (neither is on this machine) and rejected adding `node_modules` to the repo.
- Ran every test inside a transaction that is rolled back, seeding real rows in `neon_auth."user"`; rejected testing against permanently-inserted fixtures, so the database is left with zero rows.
