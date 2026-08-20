-- Safety-net tests for 0004: the collection history trigger.
-- Everything runs inside one transaction that is ROLLED BACK.
--
-- Context: on 2026-08-17 a collection was replaced with {} by a client bug, and
-- recovery depended on Neon's 6-hour instant-restore window. 0004 snapshots the
-- previous value whenever an update removes printings, so a repeat is a SELECT
-- away instead of a race. H1 is the one that keeps it cheap: ordinary
-- collecting only ever adds, and must write no history at all.

begin;

insert into neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
values ('ffffffff-6666-4666-8666-ffffffffffff','Test F','f@example.invalid',true,now(),now());

create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select 'ffffffff-6666-4666-8666-ffffffffffff'::uuid $$;

create temp table results(test text, pass boolean);

insert into public.user_settings (collection) values ('{"a":1,"b":2,"c":3}');

-- H1: growing a collection writes no history (the common case stays free)
update public.user_settings set collection = '{"a":1,"b":2,"c":3,"d":1}'
 where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
select 'H1 growth writes no history' as test, (count(*) = 0) as pass
  from public.user_settings_history
 where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';

-- H2: a wipe snapshots the previous value, with before/after key counts
update public.user_settings set collection = '{}'
 where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
select 'H2 wipe snapshots the previous collection' as test,
       (count(*) = 1
        and min(collection::text) = '{"a": 1, "b": 2, "c": 3, "d": 1}'
        and min(old_keys) = 4 and min(new_keys) = 0) as pass
  from public.user_settings_history
 where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';

-- H3: the recovery query a human would actually run
select 'H3 last non-empty value is retrievable' as test,
       (collection = '{"a":1,"b":2,"c":3,"d":1}'::jsonb) as pass
  from public.user_settings_history
 where user_id = 'ffffffff-6666-4666-8666-ffffffffffff'
 order by replaced_at desc limit 1;

-- H4: the Data API roles hold no privileges on the history table
select 'H4 authenticated/anonymous have no grants on the history table' as test,
       (count(*) = 0) as pass
  from information_schema.role_table_grants
 where table_schema='public' and table_name='user_settings_history'
   and grantee in ('authenticated','anonymous');

-- H5: RLS on and forced with zero policies, so it stays empty even if a grant
-- is ever added by accident
select 'H5 RLS enabled+forced with zero policies' as test,
       (c.relrowsecurity and c.relforcerowsecurity
        and (select count(*) from pg_policies
              where schemaname='public' and tablename='user_settings_history') = 0) as pass
  from pg_class c where c.oid = 'public.user_settings_history'::regclass;

-- H6: the client's ensureSettingsRow() must not be able to clobber a real
-- collection. This is the exact SQL PostgREST generates for
-- .upsert({collection:{}}, {onConflict:'user_id', ignoreDuplicates:true}) --
-- Prefer: resolution=ignore-duplicates, i.e. ON CONFLICT DO NOTHING. Run as
-- `authenticated`, like the real request. If this ever regresses to
-- merge-duplicates it becomes the wipe again, so the test is the guard.
do $$
declare kept jsonb;
begin
  update public.user_settings set collection = '{"ogn-073-298":1,"ogn-119-298":2}'
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
  set local role authenticated;
  insert into public.user_settings (collection) values ('{}')
    on conflict (user_id) do nothing;
  reset role;
  select collection into kept from public.user_settings
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
  insert into results values
    ('H6 ensureSettingsRow cannot overwrite an existing collection',
     kept = '{"ogn-073-298":1,"ogn-119-298":2}'::jsonb);
exception when others then
  reset role;
  insert into results values
    ('H6 ensureSettingsRow cannot overwrite an existing collection', false);
end $$;

-- H7 (0006): the one-time flat -> nested rewrite. The trigger counts TOP-LEVEL
-- keys, so N flat refs becoming one "riftbound" key reads as a shrink and the
-- flat pre-image is archived. That is intended: it is a free, correct snapshot
-- of the last flat value, one row per account, and it means the migration to
-- the nested shape is itself recoverable. What must NOT happen is a snapshot on
-- every subsequent nested write, so the second update is asserted silent.
do $$
declare before_n integer; after_n integer; archived jsonb; then_n integer;
begin
  update public.user_settings
     set collection = '{"ogn-001-298":1,"ogn-002-298":2,"ogn-003-298":3}'
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
  select count(*) into before_n from public.user_settings_history
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';

  -- the lift: same data, nested under its game
  update public.user_settings
     set collection = '{"riftbound":{"ogn-001-298":1,"ogn-002-298":2,"ogn-003-298":3}}'
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
  select count(*) into after_n from public.user_settings_history
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
  select collection into archived from public.user_settings_history
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff'
   order by replaced_at desc, id desc limit 1;

  -- an ordinary nested write afterwards: two games is not fewer than one
  update public.user_settings
     set collection = '{"riftbound":{"ogn-001-298":1,"ogn-002-298":2,"ogn-003-298":3},"pokemon":{"sv1-1":4}}'
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';
  select count(*) into then_n from public.user_settings_history
   where user_id = 'ffffffff-6666-4666-8666-ffffffffffff';

  insert into results values ('H7 the flat->nested lift archives the flat value once',
    after_n = before_n + 1 and archived ->> 'ogn-002-298' = '2');
  insert into results values ('H7b nested writes afterwards add no history',
    then_n = after_n);
exception when others then
  insert into results values ('H7 the flat->nested lift archives the flat value once', false);
  insert into results values ('H7b nested writes afterwards add no history', false);
end $$;

select test, pass from results order by test;

rollback;
