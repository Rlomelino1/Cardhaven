-- 0003_limit_decks_per_user.sql
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
--
-- ---------------------------------------------------------------------------
-- Why
-- ---------------------------------------------------------------------------
-- The Data API is a public internet endpoint over a free-tier database (0.5 GB
-- storage). RLS stops a signed-in user reading or writing anyone else's rows,
-- but nothing caps how many of their OWN rows they may create. A hostile
-- stranger only has to create one email-verified account, then INSERT decks in
-- a loop until the project's storage cap is hit -- which breaks the site for
-- everyone until it is manually cleared. `user_settings` is naturally capped at
-- one row per user by its primary key; only `decks` is exposed.
--
-- This adds a per-user row-count backstop: 100 decks per account. Far above any
-- real collection (the author has a handful), low enough to bound abuse. It is
-- additive and reversible -- drop the trigger and function to undo -- and needs
-- no data migration.
--
-- ---------------------------------------------------------------------------
-- How
-- ---------------------------------------------------------------------------
-- A BEFORE INSERT trigger. It counts against public.app_user_id() -- the
-- authenticated caller from the JWT -- NOT against new.user_id, because trigger
-- fire order is alphabetical and `decks_enforce_limit` runs before
-- `decks_pin_ownership`, so new.user_id may still hold a client-supplied value
-- at this point. Counting on the real caller's id closes that gap regardless of
-- what the client put in the row.
--
-- SECURITY INVOKER (the default): the function runs as `authenticated`, which is
-- subject to RLS, so the count only sees the caller's own decks anyway. The
-- explicit user_id predicate is belt-and-suspenders. app_user_id() is already
-- SECURITY DEFINER, so it still resolves the JWT correctly here.

begin;

create or replace function public.enforce_deck_limit()
  returns trigger
  language plpgsql
  set search_path = ''
as $$
declare n integer;
begin
  select count(*) into n
    from public.decks
   where user_id = public.app_user_id();
  if n >= 100 then
    raise exception 'deck limit reached: an account may hold at most 100 decks'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

comment on function public.enforce_deck_limit() is
  'Caps decks at 100 per user. BEFORE INSERT; counts on app_user_id() (the JWT '
  'caller) because it fires before pin_ownership sets new.user_id.';

drop trigger if exists decks_enforce_limit on public.decks;
create trigger decks_enforce_limit
  before insert on public.decks
  for each row execute function public.enforce_deck_limit();

commit;
