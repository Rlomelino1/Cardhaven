-- 0004_collection_history_safety_net.sql
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
--
-- ---------------------------------------------------------------------------
-- Why
-- ---------------------------------------------------------------------------
-- On 2026-08-17 a user's collection was silently replaced with {}. Cause was
-- client-side (see the syncCollection fix in index.html): a settings read that
-- came back empty without an error was treated as "the server has no row", and
-- the follow-up upsert then overwrote a real collection through ON CONFLICT
-- DO UPDATE. Recovery was only possible because Neon's instant-restore window
-- (6 hours) had not yet expired -- the wipe was found with ~3 hours to spare.
--
-- The client bug is fixed, but "the only copy is the current row, and a bad
-- write is unrecoverable after 6 hours" is the underlying fragility. This adds
-- a cheap, always-on safety net: whenever an update SHRINKS a collection, the
-- previous value is snapshotted first. Restoring then costs one SELECT instead
-- of a race against the restore window.
--
-- Deliberately narrow: only shrinking updates are recorded, so normal
-- collecting (which only ever adds) writes nothing here. A 352-card collection
-- is a few KB, so even a pathological number of snapshots stays negligible
-- against the 0.5 GB free-tier cap.
--
-- ---------------------------------------------------------------------------
-- Exposure
-- ---------------------------------------------------------------------------
-- This table must never be reachable through the Data API. It is guarded twice:
-- no grants to `authenticated` or `anonymous` (so PostgREST fails at the gate),
-- and RLS enabled with NO policies (so it would return zero rows even if a
-- grant were ever added by accident). Same belt-and-braces pattern as 0001.

begin;

create table if not exists public.user_settings_history (
  id          bigserial   primary key,
  user_id     uuid        not null,
  collection  jsonb       not null,
  old_keys    integer     not null,
  new_keys    integer     not null,
  replaced_at timestamptz not null default now()
);

comment on table public.user_settings_history is
  'Pre-image of a collection whenever an update removed printings from it. '
  'Safety net for accidental overwrites; not reachable through the Data API.';

create index if not exists user_settings_history_user_id_replaced_at_idx
  on public.user_settings_history (user_id, replaced_at desc);

-- Snapshot the OLD collection when an update loses keys.
create or replace function public.snapshot_shrinking_collection()
  returns trigger
  language plpgsql
  set search_path = ''
as $$
declare
  old_n integer := (select count(*) from jsonb_object_keys(old.collection));
  new_n integer := (select count(*) from jsonb_object_keys(new.collection));
begin
  if new.collection is distinct from old.collection and new_n < old_n then
    insert into public.user_settings_history (user_id, collection, old_keys, new_keys)
    values (old.user_id, old.collection, old_n, new_n);
  end if;
  return new;
end;
$$;

drop trigger if exists user_settings_snapshot_shrink on public.user_settings;
create trigger user_settings_snapshot_shrink
  before update on public.user_settings
  for each row execute function public.snapshot_shrinking_collection();

-- Not reachable from the browser: no grants, and RLS with no policies.
revoke all on public.user_settings_history from public;
revoke all on public.user_settings_history from authenticated, anonymous;
revoke all on sequence public.user_settings_history_id_seq from authenticated, anonymous;
alter table public.user_settings_history enable row level security;
alter table public.user_settings_history force  row level security;

commit;
