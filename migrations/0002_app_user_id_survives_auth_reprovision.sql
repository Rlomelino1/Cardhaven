-- 0002_app_user_id_survives_auth_reprovision.sql
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
--
-- ---------------------------------------------------------------------------
-- What broke
-- ---------------------------------------------------------------------------
-- On 2026-08-16 every Data API request against decks/user_settings returned
-- 403 with `permission denied for schema auth` (42501). Measured, not
-- inferred: `has_schema_privilege('authenticated', 'auth', 'USAGE')` had
-- become false for both Data API roles, even though 0001 granted it inside
-- the same committed transaction that created the tables.
--
-- The auth schema belongs to Neon's pg_session_jwt plumbing. Neon
-- re-provisioning it (extension update, Data API redeploy) evidently rebuilt
-- the schema without our grant. Nothing in this repo revoked it.
--
-- ---------------------------------------------------------------------------
-- The fix
-- ---------------------------------------------------------------------------
-- Make public.app_user_id() SECURITY DEFINER, so the policies stop depending
-- on the *caller* holding rights on Neon's schema at all. If Neon rebuilds
-- the auth schema again, the app keeps working.
--
-- A plain re-grant is NOT possible anymore, and the attempt below is kept
-- only as self-healing in case Neon restores it: when this migration was
-- applied (2026-08-16), `grant usage on schema auth` from neondb_owner was
-- silently ineffective — Postgres downgrades a grant the grantor has no
-- right to make into a warning, and has_schema_privilege stayed false right
-- after the committed GRANT. neondb_owner evidently lost its grant privilege
-- on that schema in the same re-provision that dropped the original grant.
--
-- SECURITY DEFINER is safe here and only here because the function already
-- follows the hygiene it requires: it takes no arguments, reads only the
-- caller's own JWT session state (no tables), and pins `search_path = ''`.
-- The owner is neondb_owner; its BYPASSRLS is irrelevant to a function that
-- touches no tables.

begin;

grant usage on schema auth to authenticated, anonymous;  -- see note above

alter function public.app_user_id() security definer;

comment on function public.app_user_id() is
  'Current Data API user as uuid, or NULL when unauthenticated / sub is not a uuid. '
  'SECURITY DEFINER so RLS policies keep working if Neon re-provisions the auth '
  'schema and drops the USAGE grant again (happened 2026-08-16).';

commit;
