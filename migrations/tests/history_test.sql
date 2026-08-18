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

rollback;
