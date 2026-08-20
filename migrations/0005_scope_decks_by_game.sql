-- 0005_scope_decks_by_game.sql
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
--
-- ---------------------------------------------------------------------------
-- Why
-- ---------------------------------------------------------------------------
-- Card Haven hosts one game today (Riftbound) and intends to host others. A
-- deck belongs to exactly one game: its payload holds refs like "ogn-039-298"
-- that only mean anything inside that game's card pool. Without a `game`
-- column, the day a second game ships, every account's Riftbound decks appear
-- in the new game's deck list holding refs it cannot resolve -- which the
-- client would render as a deck full of unresolved entries.
--
-- Adding the column now, while Riftbound is the only game and every existing
-- row is by definition a Riftbound deck, makes that a non-event. Doing it later
-- would mean backfilling live data.
--
-- ---------------------------------------------------------------------------
-- What this does NOT touch, and why
-- ---------------------------------------------------------------------------
-- `user_settings` stays unscoped. Its `collection` map is keyed by full,
-- set-prefixed refs ("ogn-039-298", "sfd-224*-221"), so a second game's refs
-- live in their own key space inside the same jsonb object and cannot collide
-- with Riftbound's unless that game happened to use the identical ref format
-- AND identical set codes. Splitting it would multiply the collection sync
-- engine's states and drag the wipe-recovery machinery (COL_READY, the no-row
-- resolution path, the 0004 history trigger) into a change that buys nothing
-- today. Revisit only if a real second game's refs could actually collide.
--
-- ---------------------------------------------------------------------------
-- Safety
-- ---------------------------------------------------------------------------
-- Additive and non-destructive: one nullable-free column WITH a default, so
-- existing rows are labelled without a rewrite of any application logic, and
-- every client that predates this migration keeps working (it omits `game`,
-- the default fills it in). Reversible with `alter table ... drop column game`.
--
-- No RLS change. Ownership is still the only thing a policy tests; `game` is a
-- filter the client applies on top, never a security boundary. The existing
-- four policies per table are untouched, deliberately: a user may read their
-- own decks in every game, and narrowing by game in a policy would make the
-- Data API answer "no such deck" for a row the user owns.

begin;

alter table public.decks
  add column if not exists game text not null default 'riftbound';

comment on column public.decks.game is
  'Which Card Haven game this deck belongs to. Defaults to riftbound, the only '
  'game as of migration 0005; the payload''s card refs are meaningless outside it.';

-- Keep the identifier sane without pinning a list of games in the schema: a new
-- game must be a client change, not a migration.
alter table public.decks
  drop constraint if exists decks_game_len;
alter table public.decks
  add constraint decks_game_len
  check (game ~ '^[a-z0-9][a-z0-9_-]{0,31}$');

-- The client's deck list is `where user_id = ... and game = ... order by
-- updated_at desc`. Replace the two-column index with the three-column one that
-- serves it; the old index's prefix is subsumed, so nothing else regresses.
create index if not exists decks_user_id_game_updated_at_idx
  on public.decks (user_id, game, updated_at desc);
drop index if exists decks_user_id_updated_at_idx;

commit;
