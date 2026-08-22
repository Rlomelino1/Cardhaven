# Migrations

Applied in filename order, **over `DATABASE_URL_UNPOOLED`**. The pooled endpoint runs
PgBouncer in transaction mode and cannot carry the session state these need — the
`set search_path = ''` on the trigger functions in particular fails there in ways that
are hard to read.

| # | File | Applied | State |
|---|---|---|---|
| 0001 | `0001_create_decks.sql` | 2026-08-13 | live on `neondb`, `falling-star-08784661` |
| 0002 | `0002_app_user_id_survives_auth_reprovision.sql` | 2026-08-16 | live — see the incident note in the file header |
| 0003 | `0003_limit_decks_per_user.sql` | 2026-08-17 | live — 100-deck-per-user cap, a free-tier abuse backstop |
| 0004 | `0004_collection_history_safety_net.sql` | 2026-08-17 | live — snapshots a collection before any update that removes printings |
| 0005 | `0005_scope_decks_by_game.sql` | 2026-08-19 | live — `decks.game`, defaulted to `riftbound`; scopes a deck to one Card Haven game |
| 0006 | `0006_collection_room_for_two_games.sql` | 2026-08-20 | live — collection size cap 64 KB → 1 MB, for the nested-by-game blob stage 9 introduced |

## Running

`pg` is deliberately not vendored here — the app has no build step and no runtime
dependencies, and that rule is worth keeping visible. Install it outside the repo:

```powershell
mkdir $env:TEMP\dbrunner; cd $env:TEMP\dbrunner; npm init -y; npm i pg
cd "D:\Dev\projects\Riftbound deck builder\migrations\tests"
node run.mjs --file ..\0001_create_decks.sql
```

`run.mjs` reads the connection string from the repo `.env` and never prints it.

## Tests

```powershell
node run.mjs --file rls_test.sql
node run.mjs --file constraint_test.sql
node run.mjs --file history_test.sql
```

The 0006 cases in `constraint_test.sql` run under their own account
(`99999999-…`) with its own `app_user_id()` stub, because C10 earlier in the same file
deletes the account the tests before it share — and `pin_ownership()` takes `user_id`
from `app_user_id()`, so a fresh row needs a fresh stub, not just a fresh uuid.

Or `npm run test:sql` from the repo root, which runs all three.

Both wrap everything in a transaction that is **rolled back**, including the rows they
insert into `neon_auth."user"`. Running them leaves the database exactly as it was.

`rls_test.sql` redefines `public.app_user_id()` mid-transaction to stand in for a signed
JWT — `pg_session_jwt` would need a real signed token to populate `auth.user_id()`. The
rollback restores the real function. The JWT-to-uuid step it skips is covered separately
by C11/C11b.

### What they cover — 48 tests, all passing

**Isolation (`rls_test.sql`)**

| | |
|---|---|
| T0/T0b | the **real** `app_user_id()` (not the stub) is executable by both Data API roles — guards against Neon re-provisioning the `auth` schema, which produced live 403s on 2026-08-16 while the stubbed suite stayed green |
| T1 | trigger pins `user_id` on insert |
| T2 | a client-supplied `user_id` is overridden, not honoured |
| T3 | user A sees exactly its own rows |
| T4 | user B sees only its own row, not A's |
| T5 | B cannot `UPDATE` A's rows |
| T6 | B cannot `DELETE` A's rows |
| T7 | A's rows are genuinely untouched after B's attempts |
| T8 | `authenticated` with no JWT sees zero rows |
| T9 | `anonymous` sees zero rows **even when granted full DML** — RLS alone is sufficient |
| T10 | the admin role bypasses RLS (`BYPASSRLS` beats `FORCE`) — asserted, not wished away |
| T10b | no Data API role (`authenticator`, `authenticated`, `anonymous`) can bypass RLS |
| T11 | control: 3 rows really exist, so every zero above is RLS and not an empty table |
| T12 | (0005) a `game` filter narrows **within** the owner's own rows |
| T13 | (0005) `game` scoping did not widen RLS — B still sees only its own deck, whichever game is asked for. `game` filters; it does not authorise |

**Constraints, cascade, cast (`constraint_test.sql`)**

| | |
|---|---|
| C1 | a payload containing `pool` is rejected |
| C2 | a payload over 256 KB is rejected |
| C3 | a non-object payload is rejected |
| C4 | `zones.main` that isn't an array is rejected |
| C5 | an empty deck name is rejected |
| C6 | a well-formed reference-shaped deck is accepted |
| C7 | the fat payload the **current** client writes still fits |
| C8 | `created_at` is immutable; client-supplied timestamps are overwritten |
| C9 | `UPDATE` cannot re-home a row to another user |
| C10 | deleting the account cascades away decks **and** settings |
| C11 | a non-uuid JWT `sub` yields NULL rather than raising `22P02` |
| C11b | a real uuid `sub` still casts, case-insensitively |
| C12 | the stage-6 collection upsert (only `collection` in the body) leaves `settings` untouched, run as `authenticated` |
| C13 | the per-user deck cap (0003): 100 inserts succeed, the 101st is rejected, and the cap is per-user |
| C14 | a forged but well-formed JWT (valid uuid `sub`, no such user) cannot insert — the FK to `neon_auth."user"` rejects it |
| C15 | (0005) a client that predates the migration omits `game`; the default labels the row `riftbound` |
| C15b | (0005) an explicit `game` is stored as sent |
| C16 | (0005) a malformed game identifier (spaces, uppercase, empty) is rejected |
| C17 | (0005) listing by `game` returns only that game's decks, and only this user's |
| C18 | (0006) the nested-by-game collection shape stores and reads back as sent |
| C19 | (0006) the **pre-stage-9 flat shape is still accepted** — every production row has it, and the client lifts it on read |
| C20 | (0006) a complete 20,444-printing Pokémon collection fits under the cap |
| C21 | (0006) over 1 MB is still rejected — the cap exists to catch a client posting card *objects* instead of counts |
| C22 | (0006) a non-object collection is refused. Note *which* layer refuses it: the 0004 trigger calls `jsonb_object_keys` on the new value and raises before the CHECK gets a look, so the error is not a `check_violation`. The write does not land either way, which is the property that matters |

**Collection history safety net (`history_test.sql`)**

| | |
|---|---|
| H1 | growing a collection writes **no** history — ordinary collecting stays free |
| H2 | an update that empties a collection snapshots the previous value, with before/after key counts |
| H3 | the last non-empty value is retrievable — the query a human runs to recover |
| H4 | `authenticated`/`anonymous` hold no grants on the history table |
| H5 | RLS is enabled **and** forced with zero policies, so it stays unreadable even if a grant is added by accident |
| H6 | the client's row-creating insert (`ON CONFLICT DO NOTHING`) cannot overwrite an existing collection — the guard against it regressing to `merge-duplicates`, which is what caused the wipe |
| H7 | (0006) the one-time flat → nested rewrite archives the flat pre-image exactly once. The trigger counts **top-level** keys, so N refs becoming one `"riftbound"` key reads as a shrink. That is intended and useful — it makes the shape migration itself recoverable, at one row per account — and deliberately not special-cased, because a trigger that understood the nesting would be a second implementation of the shape rule, in SQL, drifting from the client's |
| H7b | nested writes *after* the lift add no history, so the snapshot is genuinely one-off |

T10 is worth reading twice. `neondb_owner` — the role in `DATABASE_URL` — has
`rolbypassrls = true`, and `BYPASSRLS` overrides `FORCE ROW LEVEL SECURITY`. Anything
holding that connection string reads and writes every row regardless of policy. That is
normal for an admin credential; it is also why it is the one value in `.env` that must
never reach the browser. The roles the Data API actually runs as do not bypass.
