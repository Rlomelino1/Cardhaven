# Decisions

One line each: what was chosen, what was rejected.

## Stage 0 — repo setup

- Kept `CLAUDE.md` at `docs/CLAUDE.md` where it was placed; rejected moving it to the repo root (root is the Claude Code auto-load convention, but moving a file the author just placed is their call, not mine).
- `.gitignore` ignores `.env*` with a `!.env.example` escape hatch; rejected a bare `.env` line, so future `.env.local`/`.env.production` can't leak.
- `.gitignore` includes `node_modules/` and `dist/` even though there is no build step; rejected a minimal ignore file, because dev-time tooling (migration runner, formatter) will produce them and they must never be committed.
- Baseline committed to `main` directly (the repo had zero commits, so there was no base branch to open a PR against); every change after it goes through a PR.
- Committed the pasted-chrome `index.html` verbatim in the baseline and fixed it in PR #1; rejected silently cleaning it in the baseline, so the fix is visible as a reviewable diff.

## Stage 1 — deploy

- GitHub Pages configured as branch deploy (`main` / `/`) via `gh api`; rejected a Pages build workflow, per the standing decision in CLAUDE.md.

## Stage 2 — schema

- Table names `decks` and `user_settings`; rejected `deck`/`settings` singular, matching the plural convention in the original migration.
- Migration runner is a throwaway Node script under a scratch directory using `pg`; rejected installing `psql` or `neonctl` (neither is present on this machine) and rejected adding `node_modules` to the repo.
- `user_settings` is a separate table rather than more columns on `decks`; rejected folding settings into the deck row, because settings are per-user and decks become per-user-many in stage 5.
