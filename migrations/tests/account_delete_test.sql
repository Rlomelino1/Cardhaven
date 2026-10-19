-- Account deletion tests for 0008: delete_my_account().
-- Everything runs inside one transaction that is ROLLED BACK.
--
-- Two accounts, G (deletes itself) and K (bystander), each with a deck, a
-- settings row and a history row. Runs as `authenticated`, like the real RPC.

begin;

insert into neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
values ('aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa','Test G','g@example.invalid',true,now(),now()),
       ('bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb','Test K','k@example.invalid',true,now(),now());

create temp table results(test text, pass boolean);
grant insert on results to authenticated, anonymous;

-- Seed both accounts as the owner, pinning ownership through the stub.
create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select 'bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb'::uuid $$;
insert into public.decks (name, payload) values ('K deck', '{}');
insert into public.user_settings (collection) values ('{"a":1}');
insert into public.user_settings_history (user_id, collection, old_keys, new_keys)
  values ('bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb', '{"a":1,"b":1}', 2, 1);

create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa'::uuid $$;
insert into public.decks (name, payload) values ('G deck', '{}');
insert into public.user_settings (collection) values ('{"a":1}');
insert into public.user_settings_history (user_id, collection, old_keys, new_keys)
  values ('aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa', '{"a":1,"b":1}', 2, 1);

-- D1: anonymous may not call it at all
set local role anonymous;
do $$
begin
  perform public.delete_my_account();
  insert into results values ('D1 anonymous cannot execute delete_my_account', false);
exception when insufficient_privilege then
  insert into results values ('D1 anonymous cannot execute delete_my_account', true);
end $$;
reset role;

-- D2: authenticated without a usable JWT subject is refused and deletes nothing
create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select null::uuid $$;
set local role authenticated;
do $$
begin
  perform public.delete_my_account();
  insert into results values ('D2 no JWT subject is refused', false);
exception when insufficient_privilege then
  insert into results values ('D2 no JWT subject is refused', true);
end $$;
reset role;
insert into results
select 'D2b a refused call deleted nothing', count(*) = 2
  from neon_auth."user"
 where id in ('aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa', 'bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb');

-- D3-D5: G deletes itself
create or replace function public.app_user_id() returns uuid
  language sql stable as $$ select 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa'::uuid $$;
set local role authenticated;
select public.delete_my_account();
reset role;

insert into results
select 'D3 the account row is gone', count(*) = 0
  from neon_auth."user" where id = 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa';
insert into results
select 'D4 decks, settings and collection history are gone',
  (select count(*) from public.decks where user_id = 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa')
  + (select count(*) from public.user_settings where user_id = 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa')
  + (select count(*) from public.user_settings_history where user_id = 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa')
  = 0;
insert into results
select 'D5 sessions and linked sign-ins are gone',
  (select count(*) from neon_auth.session where "userId" = 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa')
  + (select count(*) from neon_auth.account where "userId" = 'aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa')
  = 0;

-- D6: the bystander keeps everything
insert into results
select 'D6 another account is untouched',
  (select count(*) from neon_auth."user" where id = 'bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb') = 1
  and (select count(*) from public.decks where user_id = 'bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb') = 1
  and (select count(*) from public.user_settings where user_id = 'bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb') = 1
  and (select count(*) from public.user_settings_history where user_id = 'bbbbbbbb-8888-4888-8888-bbbbbbbbbbbb') = 1;

select test, pass from results order by test;

rollback;
