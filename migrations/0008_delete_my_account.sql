-- 0008_delete_my_account.sql
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
--
-- ---------------------------------------------------------------------------
-- Why
-- ---------------------------------------------------------------------------
-- A signed-in user can delete their own account from the app. The only way to
-- do that from the browser is the Data API, and the Data API roles cannot touch
-- neon_auth."user", so the deletion runs here, as the owner, through one RPC:
--
--   POST /rpc/delete_my_account
--
-- What goes, in one transaction (any failure removes nothing):
--   - the caller's user_settings_history rows, which have no FK to the user
--     (0004) and would otherwise outlive the account;
--   - the caller's neon_auth."user" row, which cascades to their decks and
--     user_settings (0001, covered by C10) and to their Neon Auth sessions and
--     linked sign-in accounts (Better Auth's own FKs).
--
-- Better Auth's client deleteUser() was the other option. It is off unless the
-- auth server enables it, Managed Better Auth gives no documented switch for it,
-- and it would still leave user_settings_history behind.
--
-- ---------------------------------------------------------------------------
-- Exposure
-- ---------------------------------------------------------------------------
-- SECURITY DEFINER, so be exact about what a caller can steer: nothing. The
-- function takes no arguments. Whose rows go is app_user_id(), the verified JWT
-- subject, the same value every RLS policy here trusts. A caller with no valid
-- JWT gets NULL and an error, not a delete. search_path is pinned to '' as
-- everywhere else. Only `authenticated` may execute it.

begin;

create or replace function public.delete_my_account()
  returns void
  language plpgsql
  security definer
  set search_path = ''
as $$
declare
  uid uuid := public.app_user_id();
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  delete from public.user_settings_history where user_id = uid;
  delete from neon_auth."user" where id = uid;
end;
$$;

comment on function public.delete_my_account() is
  'Deletes the calling user: their account, sessions, decks, settings, collection '
  'and collection history. Irreversible. Called from the app''s account panel.';

alter function public.delete_my_account() owner to neondb_owner;

revoke all on function public.delete_my_account() from public;
revoke all on function public.delete_my_account() from anonymous;
grant execute on function public.delete_my_account() to authenticated;

commit;
