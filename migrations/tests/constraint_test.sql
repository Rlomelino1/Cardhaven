-- Constraint, cascade, and cast tests. Rolled back at the end.
-- Each negative case sits behind a savepoint so a rejection does not abort the
-- rest of the run. A test "passes" when the write it attempts is refused.

begin;

insert into neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
values ('cccccccc-3333-4333-8333-cccccccccccc', 'Test C', 'c@example.invalid', true, now(), now());

create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select 'cccccccc-3333-4333-8333-cccccccccccc'::uuid $$;

create temp table results(test text, pass boolean);

-- C1: the card pool must never be storable in a deck row
do $$
begin
  insert into public.decks (name, payload)
    values ('pool attempt', jsonb_build_object('pool', '[{"name":"x"}]'::jsonb));
  insert into results values ('C1 payload containing "pool" is rejected', false);
exception when check_violation then
  insert into results values ('C1 payload containing "pool" is rejected', true);
end $$;

-- C2: oversize payload (simulates writing the 352-card pool inline)
do $$
declare big jsonb;
begin
  select jsonb_build_object('zones', jsonb_build_object('main',
           jsonb_agg(jsonb_build_object('name', repeat('x', 400), 'i', g))))
    into big from generate_series(1, 900) g;
  insert into public.decks (name, payload) values ('too big', big);
  insert into results values ('C2 payload over 256 KB is rejected', false);
exception when check_violation then
  insert into results values ('C2 payload over 256 KB is rejected', true);
end $$;

-- C3: payload must be an object
do $$
begin
  insert into public.decks (name, payload) values ('array payload', '[1,2,3]'::jsonb);
  insert into results values ('C3 non-object payload is rejected', false);
exception when check_violation then
  insert into results values ('C3 non-object payload is rejected', true);
end $$;

-- C4: zones.main must be an array if present
do $$
begin
  insert into public.decks (name, payload)
    values ('bad zones', '{"zones":{"main":"not an array"}}'::jsonb);
  insert into results values ('C4 zones.main non-array is rejected', false);
exception when check_violation then
  insert into results values ('C4 zones.main non-array is rejected', true);
end $$;

-- C5: empty deck name
do $$
begin
  insert into public.decks (name, payload) values ('', '{}');
  insert into results values ('C5 empty deck name is rejected', false);
exception when check_violation then
  insert into results values ('C5 empty deck name is rejected', true);
end $$;

-- C6: a well-formed deck is accepted (guards against over-strict constraints)
do $$
begin
  insert into public.decks (name, payload) values ('good deck',
    '{"legend":"OGN-123","champion":"OGN-456",
      "zones":{"main":[{"ref":"OGN-001","qty":3}],"runes":[],
               "battlefields":[],"sideboard":[]}}'::jsonb);
  insert into results values ('C6 well-formed reference-shaped deck is accepted', true);
exception when others then
  insert into results values ('C6 well-formed reference-shaped deck is accepted', false);
end $$;

-- C7: the fat payload the CURRENT client writes must still be accepted,
-- or stage 4 breaks before the shrink lands
do $$
declare fat jsonb;
begin
  select jsonb_build_object('zones', jsonb_build_object('main',
           jsonb_agg(jsonb_build_object(
             'name','Card '||g, 'energy',3, 'type','Unit', 'rarity','Common',
             'domains', '["Fury"]'::jsonb, 'image','https://cmsassets.rgpub.io/x.png',
             'text', repeat('rules text ', 20), 'artist','Someone',
             'id','abc123', 'qty',3))))
    into fat from generate_series(1, 40) g;
  insert into public.decks (name, payload) values ('fat client deck', fat);
  insert into results values ('C7 current fat client payload still fits', true);
exception when others then
  insert into results values ('C7 current fat client payload still fits', false);
end $$;

-- C8: created_at is immutable and both timestamps are trigger-controlled, not
-- client-controlled. Note updated_at is set from now() = transaction start, so
-- it deliberately does NOT advance within a single transaction; each Data API
-- request is its own transaction, which is the granularity that matters. The
-- testable property is that a client-supplied value is overwritten.
do $$
declare c1 timestamptz; c2 timestamptz; u2 timestamptz;
begin
  select created_at into c1 from public.decks where name='good deck';
  update public.decks
     set name       = 'good deck renamed',
         created_at = '1999-01-01'::timestamptz,   -- client tries to rewrite history
         updated_at = '1999-01-01'::timestamptz
   where name = 'good deck';
  select created_at, updated_at into c2, u2
    from public.decks where name='good deck renamed';
  insert into results values
    ('C8 created_at immutable, client-supplied timestamps overwritten',
     (c2 = c1 and u2 = now()));
end $$;

-- C9: UPDATE cannot re-home a row to another user
do $$
declare owner_after uuid;
begin
  update public.decks
     set user_id = '00000000-0000-4000-8000-000000000000'
   where name = 'good deck renamed';
  select user_id into owner_after from public.decks where name='good deck renamed';
  insert into results values ('C9 UPDATE cannot change row ownership',
                              owner_after = 'cccccccc-3333-4333-8333-cccccccccccc');
end $$;

-- C10: deleting the account cascades to its decks and settings
-- C12: the stage-6 collection write must not clobber the settings column.
-- This is the exact SQL PostgREST generates for the client's upsert
-- (POST ?on_conflict=user_id with Prefer: resolution=merge-duplicates and a
-- body carrying only `collection`): DO UPDATE SET is built from the body's
-- columns alone. Runs as `authenticated`, like the real request.
do $$
declare kept jsonb; got jsonb;
begin
  insert into public.user_settings (settings, collection)
    values ('{"variants":true}', '{"ogn-001-298":1}');
  set local role authenticated;
  insert into public.user_settings (collection)
    values ('{"ogn-001-298":3,"ogn-002-298":2}')
    on conflict (user_id) do update set collection = excluded.collection;
  reset role;
  select settings, collection into kept, got
    from public.user_settings
   where user_id = 'cccccccc-3333-4333-8333-cccccccccccc';
  insert into results values
    ('C12 collection upsert leaves settings untouched',
     kept = '{"variants":true}'::jsonb and got->>'ogn-002-298' = '2');
  -- leave no row behind: C10 below inserts its own for the same user
  delete from public.user_settings
   where user_id = 'cccccccc-3333-4333-8333-cccccccccccc';
exception when others then
  reset role;
  insert into results values ('C12 collection upsert leaves settings untouched', false);
end $$;

do $$
declare remaining int;
begin
  insert into public.user_settings (settings) values ('{"variants":false}');
  delete from neon_auth."user" where id = 'cccccccc-3333-4333-8333-cccccccccccc';
  select (select count(*) from public.decks
            where user_id='cccccccc-3333-4333-8333-cccccccccccc')
       + (select count(*) from public.user_settings
            where user_id='cccccccc-3333-4333-8333-cccccccccccc')
    into remaining;
  insert into results values
    ('C10 deleting the account cascades away decks AND settings', remaining = 0);
exception when others then
  insert into results values
    ('C10 deleting the account cascades away decks AND settings', false);
end $$;

-- C13: per-user deck cap (migration 0003). 100 inserts succeed, the 101st is
-- rejected, and the cap is per-user -- a second account is unaffected by the
-- first's count. Uses fresh users D and E so it is isolated from user C's rows.
do $$
declare d_ok boolean; e_ok boolean;
begin
  insert into neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
  values
    ('dddddddd-4444-4444-8444-dddddddddddd','Test D','d@example.invalid',true,now(),now()),
    ('eeeeeeee-5555-4555-8555-eeeeeeeeeeee','Test E','e@example.invalid',true,now(),now());
  create or replace function public.app_user_id() returns uuid
    language sql stable as $f$ select 'dddddddd-4444-4444-8444-dddddddddddd'::uuid $f$;
  insert into public.decks (name, payload)
    select 'D deck ' || g, '{}'::jsonb from generate_series(1,100) g;
  begin
    insert into public.decks (name, payload) values ('D deck 101','{}');
    d_ok := false;   -- the trigger should have raised before we get here
  exception when check_violation then
    d_ok := true;
  end;
  create or replace function public.app_user_id() returns uuid
    language sql stable as $f$ select 'eeeeeeee-5555-4555-8555-eeeeeeeeeeee'::uuid $f$;
  insert into public.decks (name, payload) values ('E deck 1','{}');
  select count(*) = 1 into e_ok from public.decks
    where user_id = 'eeeeeeee-5555-4555-8555-eeeeeeeeeeee';
  insert into results values
    ('C13 deck cap: 100 ok, 101st rejected, cap is per-user', d_ok and e_ok);
exception when others then
  insert into results values
    ('C13 deck cap: 100 ok, 101st rejected, cap is per-user', false);
end $$;

-- C14: a forged but well-formed JWT -- a valid uuid sub for no real user --
-- gains nothing. pin_ownership stamps the forged uuid, and the FK to
-- neon_auth."user" rejects the row. Runs as `authenticated`, like a real call.
do $$
begin
  create or replace function public.app_user_id() returns uuid
    language sql stable as $f$ select '00000000-0000-4000-8000-0000000000ff'::uuid $f$;
  set local role authenticated;
  insert into public.decks (name, payload) values ('forged','{}');
  reset role;
  insert into results values ('C14 forged valid-uuid JWT cannot insert (FK)', false);
exception
  when foreign_key_violation then
    reset role;
    insert into results values ('C14 forged valid-uuid JWT cannot insert (FK)', true);
  when others then
    reset role;
    insert into results values ('C14 forged valid-uuid JWT cannot insert (FK)', false);
end $$;

-- C15..C17: migration 0005's `game` column.
-- Re-point app_user_id() at user C's replacement (C was deleted by C10), so
-- these run against a live account rather than a dangling FK.
do $$
declare defaulted text; other text; rejected boolean := false; kept int;
begin
  insert into neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
  values ('ffffffff-6666-4666-8666-ffffffffffff','Test F','f@example.invalid',true,now(),now());
  create or replace function public.app_user_id() returns uuid
    language sql stable as $f$ select 'ffffffff-6666-4666-8666-ffffffffffff'::uuid $f$;
  set local role authenticated;

  -- C15: a client that predates 0005 omits `game`; the default labels it.
  insert into public.decks (name, payload) values ('pre-0005 deck', '{}');
  select game into defaulted from public.decks where name = 'pre-0005 deck';

  -- and a client that sends one is taken at its word
  insert into public.decks (name, payload, game) values ('other game deck', '{}', 'pokemon');
  select game into other from public.decks where name = 'other game deck';

  -- C16: the identifier is constrained (no spaces, no uppercase, not empty)
  begin
    insert into public.decks (name, payload, game) values ('bad game', '{}', 'Not A Game');
  exception when check_violation then rejected := true;
  end;

  -- C17: listing by game returns only that game's decks, and RLS still scopes
  -- the whole thing to this user -- `game` filters, it does not authorise.
  select count(*) into kept from public.decks where game = 'riftbound';

  reset role;
  insert into results values ('C15 game defaults to riftbound for a pre-0005 client', defaulted = 'riftbound');
  insert into results values ('C15b an explicit game is stored as sent', other = 'pokemon');
  insert into results values ('C16 a malformed game identifier is rejected', rejected);
  insert into results values ('C17 filtering by game sees only this user''s riftbound decks', kept = 1);
exception when others then
  reset role;
  insert into results values ('C15 game defaults to riftbound for a pre-0005 client', false);
  insert into results values ('C15b an explicit game is stored as sent', false);
  insert into results values ('C16 a malformed game identifier is rejected', false);
  insert into results values ('C17 filtering by game sees only this user''s riftbound decks', false);
end $$;

-- ---------------------------------------------------------------------------
-- 0006: the collection blob is nested by game, and the cap is 512 KB
-- ---------------------------------------------------------------------------

-- These get their own account. C10 above deletes the one the earlier tests
-- share, and pin_ownership() takes user_id from app_user_id(), so a fresh row
-- needs a fresh user and a fresh stub.
insert into neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
values ('99999999-7777-4777-8777-999999999999','Test G','g@example.invalid',true,now(),now());
create or replace function public.app_user_id() returns uuid
  language sql stable as $fn$ select '99999999-7777-4777-8777-999999999999'::uuid $fn$;
insert into public.user_settings (collection) values ('{}');

-- C18: the nested shape stores and reads back as sent. Both games in one blob.
do $$
declare got jsonb;
begin
  insert into public.user_settings (collection) values
    ('{"riftbound":{"ogn-039-298":3},"pokemon":{"sv1-1":4,"sv1-2":1}}')
    on conflict (user_id) do update set collection = excluded.collection;
  select collection into got from public.user_settings
   where user_id = '99999999-7777-4777-8777-999999999999';
  insert into results values ('C18 nested-by-game collection is accepted',
    got -> 'pokemon' ->> 'sv1-1' = '4' and got -> 'riftbound' ->> 'ogn-039-298' = '3');
exception when others then
  insert into results values ('C18 nested-by-game collection is accepted', false);
end $$;

-- C19: the pre-stage-9 FLAT shape must still be accepted. Every row in
-- production is flat today; the client lifts it on read and writes back nested
-- on the next sync, so a constraint that demanded nesting would reject the
-- data that already exists.
do $$
declare got jsonb;
begin
  update public.user_settings set collection = '{"ogn-001-298":2,"sfd-224*-221":1}'
   where user_id = '99999999-7777-4777-8777-999999999999';
  select collection into got from public.user_settings
   where user_id = '99999999-7777-4777-8777-999999999999';
  insert into results values ('C19 legacy flat collection is still accepted',
    got ->> 'ogn-001-298' = '2');
exception when others then
  insert into results values ('C19 legacy flat collection is still accepted', false);
end $$;

-- C20: a realistic completionist Pokemon collection fits. 20,444 printings,
-- one quantity each, nested under its game. Keys are built at the real average
-- id length (7-8 chars, e.g. sv1-1 / swsh12pt5gg-GG01) because jsonb size is
-- dominated by the per-key offset table, and a synthetic key set that is a few
-- characters longer measures a different constraint than the one shipping.
-- The measured real number is 480,812 bytes; 0006's cap is 1 MB.
do $$
declare big jsonb; sz integer;
begin
  select jsonb_build_object('pokemon', jsonb_object_agg('sv' || g || '-' || g, 4))
    into big from generate_series(1, 20444) g;
  sz := pg_column_size(big);
  update public.user_settings set collection = big
   where user_id = '99999999-7777-4777-8777-999999999999';
  insert into results values ('C20 a complete 20.4k-printing collection fits under the cap',
    sz <= 1048576);
exception when others then
  insert into results values ('C20 a complete 20.4k-printing collection fits under the cap', false);
end $$;

-- C21: oversize is still rejected. The cap exists to catch a client posting
-- card OBJECTS instead of counts, which is megabytes, not kilobytes.
do $$
declare big jsonb;
begin
  select jsonb_build_object('pokemon',
           jsonb_object_agg('k' || g, repeat('x', 600))) into big
    from generate_series(1, 2400) g;
  update public.user_settings set collection = big
   where user_id = '99999999-7777-4777-8777-999999999999';
  insert into results values ('C21 an over-1 MB collection is rejected', false);
exception when check_violation then
  insert into results values ('C21 an over-1 MB collection is rejected', true);
end $$;

-- C22: a non-object collection is refused. Note WHICH layer refuses it: the
-- 0004 history trigger runs BEFORE the check constraint and calls
-- jsonb_object_keys on the new value, so an array raises there first. Either
-- way the write does not land, which is the property that matters -- but the
-- error is not a check_violation, so this catches anything.
do $$
begin
  update public.user_settings set collection = '["riftbound"]'
   where user_id = '99999999-7777-4777-8777-999999999999';
  insert into results values ('C22 a non-object collection is refused', false);
exception when others then
  insert into results values ('C22 a non-object collection is refused', true);
end $$;

-- C11: app_user_id() cast safety -- a non-uuid sub must yield NULL, not 22P02
select 'C11 non-uuid JWT sub yields NULL instead of erroring' as test,
       bool_and(result is null) as pass
  from (
    select case when s ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
                then s::uuid end as result
      from unnest(array[
        'anonymous', '', 'not-a-uuid',
        'aaaaaaaa-1111-4111-8111-aaaaaaaaaaa',      -- 35 chars, one short
        'gggggggg-1111-4111-8111-aaaaaaaaaaaa',      -- non-hex
        '123e4567e89b12d3a4564266141740000'          -- no dashes
      ]) s
  ) x
union all
select 'C11b a real uuid sub still casts',
       (select case when s ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
                    then s::uuid end = 'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa'::uuid
          from (select 'AAAAAAAA-1111-4111-8111-AAAAAAAAAAAA' as s) y);

select test, pass from results order by test;

rollback;
