-- 0007_collection_safety_net_must_not_block_writes.sql
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
--
-- ---------------------------------------------------------------------------
-- Why
-- ---------------------------------------------------------------------------
-- On 2026-08-22, every collection write from the browser started failing with
-- HTTP 403. Reproduced against the live row and the live role:
--
--   42501: permission denied for table user_settings_history
--   where: insert into public.user_settings_history (...)
--   PL/pgSQL function public.snapshot_shrinking_collection() line 7
--
-- The safety net from 0004 was blocking the writes it exists to protect.
--
-- Two independent faults, both of which this migration fixes.
--
-- 1. THE TRIGGER RAN AS THE CALLER.
--    snapshot_shrinking_collection() was SECURITY INVOKER, so its INSERT ran as
--    `authenticated` — the one role deliberately denied every privilege on
--    user_settings_history ("This table must never be reachable through the
--    Data API", 0004). So the moment the trigger actually fired, the whole
--    UPDATE aborted. The net could only ever break the write it guarded; it
--    had simply never fired in anger before.
--
--    A trigger that writes to a table the caller must not touch has to be
--    SECURITY DEFINER. That is the entire shape of a safety net.
--
-- 2. IT WAS COUNTING THE WRONG THING.
--    0004 measured shrinkage as the number of TOP-LEVEL KEYS of the collection,
--    which in stage 6 were card refs: {"ogn-001-298": 3, ...}. Stage 9 nested
--    the blob by game: {"riftbound": {...}, "pokemon": {...}}. Top-level keys
--    became GAMES, so:
--      - the first nested write over a pre-stage-9 flat blob reads as a
--        collapse (the live row: 5 cards -> 2 games) and fires every time,
--        which is what made fault 1 reachable at all; and
--      - once nested, the count is 1 or 2 forever, so losing every card in a
--        game while keeping its key would NOT be snapshotted. The net was
--        about to become both trigger-happy and blind.
--    It now counts CARDS, across either shape.
--
-- ---------------------------------------------------------------------------
-- Exposure
-- ---------------------------------------------------------------------------
-- SECURITY DEFINER widens what the trigger can do, so it is worth being exact
-- about what a caller gains: nothing it can steer. The inserted row's columns
-- all come from OLD/NEW of the row being written, and the caller can only reach
-- that row at all by passing the user_settings RLS policies, which pin
-- user_id = app_user_id(). So a user can cause a snapshot of their own previous
-- collection and nothing else. search_path is pinned to '' as everywhere else,
-- so the body cannot be redirected by a caller-set search_path.
--
-- user_settings_history keeps its zero grants and its RLS-with-no-policies:
-- still unreachable through the Data API, which is the point.

begin;

-- ---------------------------------------------------------------------------
-- How many CARDS a collection holds, in either shape.
--   flat   {ref: qty}                      -> the number of refs
--   nested {game: {ref: qty}}              -> the refs summed over games
-- A value whose entries are objects is nested; anything else is flat. An empty
-- object answers 0 either way. Mixed shapes (never written by the app, but a
-- hand-edited row could hold one) count the object entries' cards plus the
-- scalar entries themselves, so the answer stays monotonic in real content.
-- ---------------------------------------------------------------------------
create or replace function public.collection_card_count(c jsonb)
  returns integer
  language sql
  immutable
  set search_path = ''
as $$
  select coalesce(sum(
    case when jsonb_typeof(e.value) = 'object'
      then (select count(*) from jsonb_object_keys(e.value))
      else 1
    end
  ), 0)::integer
  from jsonb_each(coalesce(c, '{}'::jsonb)) e
$$;

comment on function public.collection_card_count(jsonb) is
  'Cards in a collection blob, counting either the flat {ref:qty} shape or the '
  'nested {game:{ref:qty}} one. Used by the shrink safety net so that nesting '
  'the blob by game does not read as data loss.';

-- ---------------------------------------------------------------------------
-- The safety net, now able to actually write its snapshot.
-- ---------------------------------------------------------------------------
create or replace function public.snapshot_shrinking_collection()
  returns trigger
  language plpgsql
  security definer
  set search_path = ''
as $$
declare
  old_n integer := public.collection_card_count(old.collection);
  new_n integer := public.collection_card_count(new.collection);
begin
  if new.collection is distinct from old.collection and new_n < old_n then
    insert into public.user_settings_history (user_id, collection, old_keys, new_keys)
    values (old.user_id, old.collection, old_n, new_n);
  end if;
  return new;
end;
$$;

-- Definer rights are the owner's, so be explicit about who that is rather than
-- inheriting whoever happened to run this file.
alter function public.snapshot_shrinking_collection() owner to neondb_owner;
alter function public.collection_card_count(jsonb) owner to neondb_owner;

-- A SECURITY DEFINER function is executable by PUBLIC by default. The trigger
-- calls it as the table owner regardless, so nothing needs to call it directly.
revoke all on function public.snapshot_shrinking_collection() from public;
revoke all on function public.collection_card_count(jsonb) from public;
grant execute on function public.collection_card_count(jsonb) to neondb_owner;

commit;
