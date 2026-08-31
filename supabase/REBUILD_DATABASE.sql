-- ============================================================
--  Weekly Performance Book — FULL DATABASE REBUILD
--  Run this ONLY if the Supabase project was deleted and you had
--  to create a NEW one. Paste the whole file into:
--     Supabase -> SQL Editor -> New query -> Run.
--
--  Order: (1) base schema + roles + invites + RLS + first-login trigger,
--         (2) team-lead columns/policies, (3) invite-eligibility function.
--
--  NOTE: This creates empty tables. Your companies re-import their Excel
--  workbooks after logging in (data lives in agency_data.data as JSON).
--  Change the owner email below if it is no longer cjgioia@yahoo.ca.
-- ============================================================

-- ======================= (1) BASE SCHEMA v2 =======================
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.my_role() cascade;
drop function if exists public.my_agency_id() cascade;
drop function if exists public.is_email_invited(text) cascade;
drop table if exists public.agency_data cascade;
drop table if exists public.invites cascade;
drop table if exists public.profiles cascade;
drop table if exists public.agencies cascade;

create table public.agencies (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  role       text not null default 'pending',   -- super_admin | admin | team_lead | viewer | pending
  agency_id  uuid references public.agencies(id) on delete set null,
  team_id    text,                              -- matches a key inside agency_data.data.teams
  created_at timestamptz default now()
);

create table public.agency_data (
  agency_id  uuid primary key references public.agencies(id) on delete cascade,
  data       jsonb,
  updated_by uuid references auth.users(id),
  updated_at timestamptz default now()
);

create table public.invites (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  role        text not null,                     -- admin | viewer | team_lead
  agency_id   uuid references public.agencies(id) on delete cascade,
  team_id     text,                              -- pre-assigned team for a team_lead invite
  invited_by  uuid references auth.users(id),
  created_at  timestamptz default now(),
  consumed_at timestamptz
);
create unique index invites_email_pending
  on public.invites (lower(email)) where consumed_at is null;

create or replace function public.my_role() returns text
  language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid() $$;

create or replace function public.my_agency_id() returns uuid
  language sql stable security definer set search_path = public as $$
  select agency_id from public.profiles where id = auth.uid() $$;

alter table public.agencies    enable row level security;
alter table public.profiles    enable row level security;
alter table public.agency_data enable row level security;
alter table public.invites     enable row level security;

-- agencies
create policy agencies_read on public.agencies for select
  using ( id = public.my_agency_id() or public.my_role() = 'super_admin' or created_by = auth.uid() );
create policy agencies_insert on public.agencies for insert
  with check ( public.my_role() = 'super_admin' );
create policy agencies_update on public.agencies for update
  using ( public.my_role() = 'super_admin' or (public.my_role() = 'admin' and id = public.my_agency_id()) );

-- profiles
create policy profiles_read on public.profiles for select
  using ( id = auth.uid() or agency_id = public.my_agency_id() or public.my_role() = 'super_admin' );
create policy profiles_self_update on public.profiles for update
  using ( id = auth.uid() );
-- admins may (re)assign role/team for members of their own company (team-lead assignment)
create policy profiles_admin_update on public.profiles for update
  using ( public.my_role() in ('admin','super_admin') and agency_id = public.my_agency_id() )
  with check ( public.my_role() in ('admin','super_admin') and agency_id = public.my_agency_id() );

-- agency_data (admins/super/team_lead write; everyone in the company reads)
create policy data_read on public.agency_data for select
  using ( agency_id = public.my_agency_id() or public.my_role() = 'super_admin' );
create policy data_insert on public.agency_data for insert
  with check ( agency_id = public.my_agency_id() and public.my_role() in ('admin','super_admin','team_lead') );
create policy data_update on public.agency_data for update
  using ( agency_id = public.my_agency_id() and public.my_role() in ('admin','super_admin','team_lead') );

-- invites (super invites admins; admins invite viewers/team_leads into their own company)
create policy invites_read on public.invites for select
  using ( public.my_role() = 'super_admin' or invited_by = auth.uid() or agency_id = public.my_agency_id() );
create policy invites_insert on public.invites for insert
  with check (
    (public.my_role() = 'super_admin' and role = 'admin')
    or (public.my_role() = 'admin' and role in ('viewer','team_lead') and agency_id = public.my_agency_id())
  );
create policy invites_delete on public.invites for delete
  using (
    public.my_role() = 'super_admin'
    or invited_by = auth.uid()
    or (public.my_role() = 'admin' and agency_id = public.my_agency_id())
  );

-- ======================= (3) INVITE ELIGIBILITY (called by the login screen, anon) =======================
create or replace function public.is_email_invited(check_email text)
  returns boolean
  language sql stable security definer set search_path = public as $$
  select
    lower(check_email) = 'cjgioia@yahoo.ca'          -- platform owner can always register
    or exists (
      select 1 from public.invites
      where lower(email) = lower(check_email) and consumed_at is null
    );
$$;
grant execute on function public.is_email_invited(text) to anon, authenticated;

-- ======================= (2) FIRST LOGIN: assign role/company/team from the invite =======================
create or replace function public.handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
declare
  inv         public.invites%rowtype;
  super_email text := 'cjgioia@yahoo.ca';   -- <- the platform owner
  uname       text := coalesce(new.raw_user_meta_data->>'full_name',
                               new.raw_user_meta_data->>'name', '');
begin
  if lower(new.email) = lower(super_email) then
    insert into public.profiles (id, email, full_name, role, agency_id, team_id)
    values (new.id, new.email, uname, 'super_admin', null, null)
    on conflict (id) do update set role = 'super_admin', email = excluded.email;
    return new;
  end if;

  select * into inv from public.invites
    where lower(email) = lower(new.email) and consumed_at is null
    order by created_at desc limit 1;

  if inv.id is not null then
    insert into public.profiles (id, email, full_name, role, agency_id, team_id)
    values (new.id, new.email, uname, inv.role, inv.agency_id, inv.team_id)
    on conflict (id) do update
      set role = excluded.role, agency_id = excluded.agency_id, team_id = excluded.team_id, email = excluded.email;
    update public.invites set consumed_at = now() where id = inv.id;
  else
    insert into public.profiles (id, email, full_name, role, agency_id, team_id)
    values (new.id, new.email, uname, 'pending', null, null)
    on conflict (id) do nothing;
  end if;

  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
