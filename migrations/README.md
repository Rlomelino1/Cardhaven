# Migrations

Applied in filename order, **over `DATABASE_URL_UNPOOLED`**. The pooled endpoint runs
PgBouncer in transaction mode and cannot carry the session state these need — the
`set search_path = ''` on the trigger functions in particular fails there in ways that
are hard to read.

| # | File | Applied | State |
|---|---|---|---|
| 0001 | `0001_create_decks.sql` | 2026-08-13 | live on `neondb`, `falling-star-08784661` |
| 0002 | `0002_app_user_id_survives_auth_reprovision.sql` | 2026-08-16 | live — see the incident note in the file header |

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
```

Both wrap everything in a transaction that is **rolled back**, including the rows they
insert into `neon_auth."user"`. Running them leaves the database exactly as it was.

`rls_test.sql` redefines `public.app_user_id()` mid-transaction to stand in for a signed
JWT — `pg_session_jwt` would need a real signed token to populate `auth.user_id()`. The
rollback restores the real function. The JWT-to-uuid step it skips is covered separately
by C11/C11b.

### What they cover — 26 tests, all passing

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

T10 is worth reading twice. `neondb_owner` — the role in `DATABASE_URL` — has
`rolbypassrls = true`, and `BYPASSRLS` overrides `FORCE ROW LEVEL SECURITY`. Anything
holding that connection string reads and writes every row regardless of policy. That is
normal for an admin credential; it is also why it is the one value in `.env` that must
never reach the browser. The roles the Data API actually runs as do not bypass.
