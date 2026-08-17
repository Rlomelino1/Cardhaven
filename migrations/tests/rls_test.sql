-- RLS verification. Everything runs inside one transaction that is ROLLED BACK,
-- so no test user, test deck, or stubbed function survives.
--
-- app_user_id() is temporarily redefined to return a fixed uuid. That stands in
-- for a signed JWT (pg_session_jwt needs a real signed token to populate
-- auth.user_id()). It exercises exactly what is under test -- the policy
-- predicates and the ownership trigger. The JWT -> uuid step is covered
-- separately by the cast tests in cast_test.sql.

begin;

insert into neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
values
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa', 'Test A', 'a@example.invalid', true, now(), now()),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb', 'Test B', 'b@example.invalid', true, now(), now());

-- T0 runs BEFORE the stub below replaces app_user_id(): the REAL function
-- must be executable by the Data API roles. The stub is exactly how this
-- suite passed 24/24 while production returned 403 `permission denied for
-- schema auth` (2026-08-16) — Neon had re-provisioned the auth schema and
-- dropped the USAGE grant, and nothing here called auth.user_id() as
-- authenticated. With no JWT session the real function returns NULL; the
-- failure mode under test raises 42501 instead, which aborts the suite.
set local role authenticated;
select 'T0 real app_user_id() executable as authenticated (no 42501)' as test,
       (public.app_user_id() is null) as pass;
reset role;
set local role anonymous;
select 'T0b real app_user_id() executable as anonymous (no 42501)' as test,
       (public.app_user_id() is null) as pass;
reset role;

create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select 'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa'::uuid $$;

set local role authenticated;

-- user_id deliberately NOT supplied: the trigger must pin it
insert into public.decks (name, payload) values ('A deck', '{"zones":{"main":[]}}');
-- ownership forgery attempt: hand it B's id explicitly
insert into public.decks (user_id, name, payload)
  values ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb', 'A forged', '{}');

select 'T1 trigger pins user_id on insert' as test,
       (user_id = 'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa') as pass
  from public.decks where name = 'A deck';

select 'T2 client-supplied user_id overridden, not honoured' as test,
       (user_id = 'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa') as pass
  from public.decks where name = 'A forged';

select 'T3 A sees exactly its own 2 rows' as test, (count(*) = 2) as pass
  from public.decks;

reset role;

create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select 'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb'::uuid $$;

set local role authenticated;

insert into public.decks (name, payload) values ('B deck', '{"zones":{"main":[]}}');

select 'T4 B sees only its own row, not A''s' as test,
       (count(*) = 1 and min(name) = 'B deck') as pass
  from public.decks;

with u as (update public.decks set name = 'hijacked'
            where name in ('A deck','A forged') returning 1)
select 'T5 B cannot UPDATE A''s rows' as test, (count(*) = 0) as pass from u;

with d as (delete from public.decks
            where name in ('A deck','A forged') returning 1)
select 'T6 B cannot DELETE A''s rows' as test, (count(*) = 0) as pass from d;

reset role;

-- confirm A's rows are genuinely untouched by T5/T6
select 'T7 A''s rows survived B''s update and delete attempts' as test,
       (count(*) = 2) as pass
  from public.decks
 where name in ('A deck','A forged');

create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select null::uuid $$;

set local role authenticated;
select 'T8 authenticated with no JWT sees zero rows' as test, (count(*) = 0) as pass
  from public.decks;
reset role;

-- Prove RLS alone is sufficient, independent of table grants: give anonymous
-- full DML and confirm it STILL reads nothing, because no policy names it.
grant select, insert, update, delete on public.decks to anonymous;
set local role anonymous;
select 'T9 anonymous returns zero rows EVEN WITH full table grants' as test,
       (count(*) = 0) as pass
  from public.decks;
reset role;

-- neondb_owner holds BYPASSRLS, which beats FORCE. Assert the true behaviour
-- rather than the hoped-for one: the admin role sees everything, and the three
-- roles the Data API actually uses do not bypass. Scoped to the test users:
-- the live table carries real decks now (since 2026-08-16), and an unscoped
-- count(*) breaks the moment anyone saves one.
select 'T10 admin role bypasses RLS (BYPASSRLS beats FORCE) - sees all 3' as test,
       (count(*) = 3) as pass
  from public.decks
 where user_id in ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa',
                   'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb');

select 'T10b no Data API role can bypass RLS' as test,
       (count(*) = 0) as pass
  from pg_roles
 where rolname in ('authenticator','authenticated','anonymous')
   and rolbypassrls;

-- Control: every zero above must be RLS filtering, not an empty table. Lift
-- FORCE for the owner only, count, and let the rollback restore it.
alter table public.decks no force row level security;
select 'T11 control: 3 rows really exist, so the zeros above were RLS' as test,
       (count(*) = 3) as pass
  from public.decks
 where user_id in ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa',
                   'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb');

rollback;
