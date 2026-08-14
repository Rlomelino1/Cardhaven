-- 0001_create_decks.sql
--
-- Per-user deck storage and per-user settings for the Riftbound deckbuilder,
-- for Neon Postgres behind the Neon Data API with Managed Better Auth.
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
-- The pooled host runs PgBouncer in transaction mode and does not support the
-- session state these functions need; `set search_path = ''` in particular will
-- fail in confusing ways through the pooler.
--
-- ---------------------------------------------------------------------------
-- Provenance
-- ---------------------------------------------------------------------------
-- Written fresh for Neon. An earlier migration for this project existed but was
-- never committed to the repository, so nothing was adapted or carried across.
-- This file implements the design CLAUDE.md describes -- jsonb payload,
-- size and shape constraints, four RLS policies, and a trigger that pins
-- user_id and created_at. The checks run against it are listed at the bottom.
--
-- ---------------------------------------------------------------------------
-- What Neon required, and why (all verified against this database, not assumed)
-- ---------------------------------------------------------------------------
-- 1. auth.uid() -> auth.user_id(). Both exist here: pg_session_jwt 0.5.0
--    provides auth.uid() returning uuid and auth.user_id() returning text.
--    CLAUDE.md and Neon's own Data API docs both specify user_id(), so
--    that is what the policies call.
--
-- 2. The identity table is neon_auth."user", not auth.users. Confirmed by
--    introspection: schema neon_auth holds user, session, account, jwks,
--    organization, member, invitation, verification, project_config.
--    "user" is a reserved word and must stay double-quoted.
--
-- 3. neon_auth."user".id is uuid, primary key. Our user_id columns are
--    therefore uuid, and auth.user_id() (text) is cast to compare. The cast is
--    wrapped -- see app_user_id() below -- because a JWT sub that is not a uuid
--    would otherwise raise 22P02 instead of simply matching no rows, turning a
--    denied read into a 500.
--
-- 4. ON DELETE CASCADE to neon_auth."user" IS permitted. Probed inside a
--    rolled-back transaction before writing this file: the FK was accepted.
--    neondb_owner holds REFERENCES on that table through membership in the
--    neon_auth role, which is how Neon provisions it. So account deletion does
--    clean up user data and no sweep job is needed -- which matters, because
--    the free plan's CU-hour budget rules out anything that polls.
--
--    Residual risk, recorded rather than designed around: neon_auth is Neon's
--    schema. If a future Managed Better Auth change recreates that table, an
--    inbound FK could block or be dropped. Nothing but the cascade depends on
--    it -- ownership is enforced by trigger and isolation by RLS, both of
--    which hold with or without the constraint.

begin;

-- ---------------------------------------------------------------------------
-- Helper: the current user's id as uuid, or NULL
-- ---------------------------------------------------------------------------
-- Wraps auth.user_id() so a malformed or absent sub yields NULL (matches
-- nothing) instead of an invalid-input-syntax error. The regex accepts exactly
-- the canonical uuid form, so anything it passes is guaranteed to cast.
--
-- STABLE, no arguments: the planner evaluates it once per query and can still
-- use the index on user_id.
create or replace function public.app_user_id()
  returns uuid
  language sql
  stable
  parallel safe
  set search_path = ''
as $$
  select case
    when auth.user_id() ~*
      '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    then auth.user_id()::uuid
  end
$$;

comment on function public.app_user_id() is
  'Current Data API user as uuid, or NULL when unauthenticated / sub is not a uuid.';

-- ---------------------------------------------------------------------------
-- Helper: updated_at maintenance
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
  returns trigger
  language plpgsql
  set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Helper: pin ownership and creation time
-- ---------------------------------------------------------------------------
-- The browser talks to Postgres directly, so every client-supplied value is
-- attacker-controlled. RLS alone would let a client INSERT a row already
-- labelled with someone else's user_id only if WITH CHECK let it through --
-- it does not -- but this makes the client's value irrelevant rather than
-- merely rejected, and it stops an UPDATE from re-homing a row or rewriting
-- its history.
create or replace function public.pin_ownership()
  returns trigger
  language plpgsql
  set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.user_id    := coalesce(public.app_user_id(), new.user_id);
    new.created_at := now();
  else
    new.user_id    := old.user_id;     -- ownership is immutable
    new.created_at := old.created_at;  -- so is creation time
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- decks
-- ---------------------------------------------------------------------------
-- One row per deck. `name` is a column, not a payload key, so stage 5 can list
-- and rename decks without parsing jsonb. Everything else about the deck --
-- zones, legend, champion -- lives in `payload`, read and written whole, which
-- is how the client already treats it.
--
-- `payload` deliberately does NOT constrain card entry shape. The client still
-- writes full card objects today (index.html:530); stage 4 shrinks them to
-- {ref, qty}. A constraint on entry shape would reject the current client and
-- break the stage it is meant to support.
create table if not exists public.decks (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null
               references neon_auth."user"(id) on delete cascade,
  name       text        not null,
  payload    jsonb       not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint decks_name_len
    check (char_length(name) between 1 and 120),

  -- A deck is an object, never an array or a bare scalar.
  constraint decks_payload_is_object
    check (jsonb_typeof(payload) = 'object'),

  -- If zones is present it must be an object whose four known keys, where
  -- present, are arrays. Permissive about extra keys so a future zone does not
  -- require a migration; strict about the ones the app reads.
  constraint decks_payload_zones_shape
    check (
      not (payload ? 'zones')
      or (
        jsonb_typeof(payload -> 'zones') = 'object'
        and (not (payload -> 'zones' ? 'main')
             or jsonb_typeof(payload -> 'zones' -> 'main') = 'array')
        and (not (payload -> 'zones' ? 'runes')
             or jsonb_typeof(payload -> 'zones' -> 'runes') = 'array')
        and (not (payload -> 'zones' ? 'battlefields')
             or jsonb_typeof(payload -> 'zones' -> 'battlefields') = 'array')
        and (not (payload -> 'zones' ? 'sideboard')
             or jsonb_typeof(payload -> 'zones' -> 'sideboard') = 'array')
      )
    ),

  -- The card pool must never be written to a deck row. It is identical for
  -- every user and is served as a static JSON file; a client that accidentally
  -- posts its whole state object gets rejected here rather than silently
  -- costing storage and transfer on every keystroke.
  constraint decks_payload_no_pool
    check (not (payload ? 'pool')),

  -- Backstop on total size. A reference-shaped deck is ~2 KB; a fat deck that
  -- still embeds whole card objects is ~150 KB. 256 KB leaves room for the
  -- current client without leaving room for the pool.
  constraint decks_payload_size
    check (pg_column_size(payload) <= 262144)
);

comment on table public.decks is
  'One deck per row, owned by a neon_auth user. payload holds zones/legend/champion.';

create index if not exists decks_user_id_updated_at_idx
  on public.decks (user_id, updated_at desc);

-- ---------------------------------------------------------------------------
-- user_settings
-- ---------------------------------------------------------------------------
-- Per-user, not per-deck. `settings` holds UI preferences that follow the user
-- across devices -- today that is exactly one key, the `variants` browser
-- filter toggle. `collection` is the stage 6 owned-card map, same storage shape
-- as a deck: one blob, read and written whole, a few KB at 100% completion.
-- It is created now because adding it later is a schema change with live data;
-- it stays empty until stage 6.
create table if not exists public.user_settings (
  user_id    uuid        primary key
               references neon_auth."user"(id) on delete cascade,
  settings   jsonb       not null default '{}'::jsonb,
  collection jsonb       not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint user_settings_settings_is_object
    check (jsonb_typeof(settings) = 'object'),
  constraint user_settings_collection_is_object
    check (jsonb_typeof(collection) = 'object'),
  constraint user_settings_settings_size
    check (pg_column_size(settings) <= 16384),
  -- 352 cards as {collector_number: qty} is well under 16 KB; 64 KB absorbs
  -- several future sets without absorbing a mistake.
  constraint user_settings_collection_size
    check (pg_column_size(collection) <= 65536)
);

comment on table public.user_settings is
  'One row per user: cross-device UI preferences and the owned-card collection.';

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------
drop trigger if exists decks_pin_ownership on public.decks;
create trigger decks_pin_ownership
  before insert or update on public.decks
  for each row execute function public.pin_ownership();

drop trigger if exists decks_set_updated_at on public.decks;
create trigger decks_set_updated_at
  before insert or update on public.decks
  for each row execute function public.set_updated_at();

drop trigger if exists user_settings_pin_ownership on public.user_settings;
create trigger user_settings_pin_ownership
  before insert or update on public.user_settings
  for each row execute function public.pin_ownership();

drop trigger if exists user_settings_set_updated_at on public.user_settings;
create trigger user_settings_set_updated_at
  before insert or update on public.user_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Four policies per table, one per verb, rather than a single FOR ALL policy:
-- the verbs are then independently auditable, and USING vs WITH CHECK is
-- explicit at each one instead of implied.
--
-- FORCE is on so a table owner without BYPASSRLS is subject to the policies
-- too. Note what it does NOT do here: neondb_owner -- the role in
-- DATABASE_URL -- has rolbypassrls = true, and BYPASSRLS beats FORCE. Anything
-- holding that connection string reads and writes every row regardless of
-- policy. That is normal for an admin credential and is why it is the one
-- thing in .env that must never reach the browser.
--
-- The roles that matter for the app do not bypass: authenticator, authenticated
-- and anonymous all have rolbypassrls = false (verified), and those are the
-- only roles the Data API ever runs as. FORCE stays on so the guarantee does
-- not silently depend on who happens to own the table later.
alter table public.decks         enable row level security;
alter table public.decks         force  row level security;
alter table public.user_settings enable row level security;
alter table public.user_settings force  row level security;

-- decks
drop policy if exists decks_select_own on public.decks;
create policy decks_select_own on public.decks
  for select to authenticated
  using (user_id = public.app_user_id());

drop policy if exists decks_insert_own on public.decks;
create policy decks_insert_own on public.decks
  for insert to authenticated
  with check (user_id = public.app_user_id());

drop policy if exists decks_update_own on public.decks;
create policy decks_update_own on public.decks
  for update to authenticated
  using (user_id = public.app_user_id())
  with check (user_id = public.app_user_id());

drop policy if exists decks_delete_own on public.decks;
create policy decks_delete_own on public.decks
  for delete to authenticated
  using (user_id = public.app_user_id());

-- user_settings
drop policy if exists user_settings_select_own on public.user_settings;
create policy user_settings_select_own on public.user_settings
  for select to authenticated
  using (user_id = public.app_user_id());

drop policy if exists user_settings_insert_own on public.user_settings;
create policy user_settings_insert_own on public.user_settings
  for insert to authenticated
  with check (user_id = public.app_user_id());

drop policy if exists user_settings_update_own on public.user_settings;
create policy user_settings_update_own on public.user_settings
  for update to authenticated
  using (user_id = public.app_user_id())
  with check (user_id = public.app_user_id());

drop policy if exists user_settings_delete_own on public.user_settings;
create policy user_settings_delete_own on public.user_settings
  for delete to authenticated
  using (user_id = public.app_user_id());

-- No policy grants anything to `anonymous`. A signed-out caller therefore reads
-- zero rows and cannot write, even though the Data API will happily connect it.
-- This is the "anonymous role returns zero rows" condition for stage 2.

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
-- Table privileges are the outer gate; RLS is the inner one. `anonymous` is
-- granted nothing here, so it fails at the gate rather than relying on policy
-- absence alone -- two independent reasons a signed-out read returns nothing.
grant usage on schema public to authenticated, anonymous;
grant select, insert, update, delete on public.decks         to authenticated;
grant select, insert, update, delete on public.user_settings to authenticated;

-- Policies call public.app_user_id(), which calls auth.user_id(). The auth
-- schema does not grant USAGE to the Data API roles by default.
grant usage   on schema auth to authenticated, anonymous;
grant execute on function public.app_user_id() to authenticated, anonymous;

commit;
