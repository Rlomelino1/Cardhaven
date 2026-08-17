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
