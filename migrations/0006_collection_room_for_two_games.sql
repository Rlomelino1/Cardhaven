-- 0006_collection_room_for_two_games.sql
--
-- RUN OVER THE UNPOOLED ENDPOINT (DATABASE_URL_UNPOOLED).
--
-- ---------------------------------------------------------------------------
-- Why
-- ---------------------------------------------------------------------------
-- Stage 9 adds Pokémon, and the collection blob stops being one flat map. Its
-- stored shape becomes nested by game:
--
--   {"riftbound": {"ogn-039-298": 3}, "pokemon": {"sv1-1": 4}}
--
-- The 64 KB ceiling from 0001 was sized for "352 cards, plus several future
-- Riftbound sets". Pokémon changes the arithmetic: 20,444 English printings,
-- and a completionist logs one entry per printing.
--
-- MEASURED, not estimated. Every real card id from the vendored search index,
-- each carrying a quantity, nested under its game:
--
--   select pg_column_size('{"riftbound":{},"pokemon":{ …20,444 ids… }}'::jsonb)
--     ->  480,812 bytes
--   the same value as JSON *text* is 255,908 bytes
--
-- jsonb is not JSON text: it stores a key-offset table per object, which here
-- costs about 88% on top of the text. Sizing this constraint from the text
-- length is the mistake to avoid — it under-reads by nearly half, and it is how
-- this migration was first drafted at 512 KB.
--
-- So: 64 KB starts rejecting writes at roughly 2,500 logged printings, an
-- eighth of the way in, silently, as a failed sync. 512 KB leaves a complete
-- collection 3% of headroom, which is not headroom.
--
-- 1 MB it is. That is ~2.2x a complete Pokémon collection, with room for
-- Riftbound (a few KB) and for the sets Pokémon has not printed yet, and it is
-- still nowhere near large enough for a client that accidentally posts card
-- OBJECTS instead of counts — 20,444 slim records are ~6.7 MB — which is the
-- failure this constraint exists to catch. Removing the cap would remove that
-- guard, so it is not removed.
--
-- Transfer footprint, for the record: the collection is written whole, so a
-- user at 100% Pokémon completion costs ~470 KB per sync. The sync engine
-- debounces to one write two seconds after the last tap, so a long binder
-- session is tens of writes, not thousands, and the free tier's 5 GB/month is
-- ~10,000 such writes. Worth knowing; not worth splitting the blob for.
--
-- ---------------------------------------------------------------------------
-- What this does NOT change, and why
-- ---------------------------------------------------------------------------
-- * The `is_object` check stays exactly as it is. Both shapes are objects, and
--   BOTH must keep passing: every row in production today is flat, and the
--   client lifts a flat blob to nested in memory and writes it back nested on
--   the next sync. A constraint demanding the nested shape would reject the
--   data that already exists.
-- * No key-name constraint. Game ids are a client concept — the same reasoning
--   as 0005's refusal to pin a list of games in the schema. Adding a game must
--   stay a client change, not a migration.
-- * `settings` and its 16 KB cap are untouched.
-- * The 0004 history trigger is untouched and keeps working on the new shape:
--   it counts TOP-LEVEL keys, so the one-time flat -> nested rewrite goes from
--   N keys to 1 or 2 and therefore registers as a shrink, archiving the flat
--   pre-image exactly once per user. That is a correct and useful snapshot of
--   the last flat value, it costs one row per account, and it is deliberately
--   not special-cased: a trigger that tried to understand the nesting would be
--   a second implementation of the shape rule, in SQL, drifting from the
--   client's. Covered by H7/H7b in tests/history_test.sql.
--
-- ---------------------------------------------------------------------------
-- Safety
-- ---------------------------------------------------------------------------
-- Widening a CHECK. Every existing row already satisfies the new bound, so the
-- validation scan cannot fail, and nothing is rewritten. Reversible by
-- re-adding the constraint with the old number, provided no row has since grown
-- past 64 KB.
--
-- Free-tier storage is 0.5 GB per project. One 1 MB row per account is not a
-- number that matters at this scale, and this cap plus the per-user deck cap
-- (0003) are together the whole abuse story for a table with one row per user.

begin;

alter table public.user_settings
  drop constraint if exists user_settings_collection_size;

alter table public.user_settings
  add constraint user_settings_collection_size
  check (pg_column_size(collection) <= 1048576);

comment on column public.user_settings.collection is
  'Owned-card counts, nested by Card Haven game id: {game: {card_ref: qty}}. '
  'Pre-stage-9 rows are a single flat Riftbound map; the client lifts those on '
  'read and writes back nested. 1 MB cap: a complete Pokemon collection measures '
  '480,812 bytes of jsonb (20,444 printings), so this fits it about twice over '
  'and still rejects a client that posts card objects instead of counts.';

commit;
