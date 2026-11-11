-- Island Journey · Supabase schema
-- Run this once in the Supabase SQL editor (or via `supabase db execute`).
-- Everything is public read-only for visitors; edits happen in the dashboard.

create table if not exists public.site_profile (
  id text primary key default 'main',
  name text not null,
  first_name text,
  role text,
  location text,
  timezone text,
  email text,
  availability text,
  tagline text,
  intro text,
  long_story text[] default '{}',
  stats jsonb default '[]'::jsonb,
  education jsonb default '[]'::jsonb,
  achievements jsonb default '[]'::jsonb,
  timeline jsonb default '[]'::jsonb,
  facts text[] default '{}',
  socials jsonb default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.skill_groups (
  id text primary key,
  label text not null,
  blurb text,
  accent text default '#2f7f74',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id text primary key,
  group_id text not null references public.skill_groups (id) on delete cascade,
  name text not null,
  icon text not null default 'code',
  level int not null default 70 check (level between 0 and 100),
  years int not null default 1 check (years >= 0),
  description text,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id text primary key,
  company text not null,
  role text not null,
  period text,
  location text,
  summary text,
  highlights text[] default '{}',
  technologies text[] default '{}',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  title text not null,
  kicker text,
  epoch text,
  summary text,
  description text[] default '{}',
  role text,
  timeline text,
  team text,
  status text,
  metrics jsonb default '[]'::jsonb,
  technologies text[] default '{}',
  architecture text[] default '{}',
  challenges jsonb default '[]'::jsonb,
  features text[] default '{}',
  responsibilities text[] default '{}',
  gallery jsonb default '[]'::jsonb,
  links jsonb default '{}'::jsonb,
  artwork jsonb default '{}'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists skills_group_idx on public.skills (group_id, sort_order);
create index if not exists skill_groups_order_idx on public.skill_groups (sort_order);
create index if not exists experience_order_idx on public.experience (sort_order);
create index if not exists projects_order_idx on public.projects (sort_order) where published;

-- Keep updated_at honest so webhooks and debugging can trust it.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  target text;
begin
  foreach target in array array['site_profile', 'skill_groups', 'skills', 'experience', 'projects']
  loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', target);
    execute format(
      'create trigger touch_%1$s before update on public.%1$s for each row execute function public.touch_updated_at()',
      target
    );
  end loop;
end;
$$;

-- Public read-only access. Writes stay with the service role (dashboard, CLI).
do $$
declare
  target text;
begin
  foreach target in array array['site_profile', 'skill_groups', 'skills', 'experience', 'projects']
  loop
    execute format('alter table public.%I enable row level security', target);
    execute format('drop policy if exists "Public read" on public.%I', target);
    execute format(
      'create policy "Public read" on public.%I for select to anon, authenticated using (true)',
      target
    );
    execute format('grant select on public.%I to anon, authenticated', target);
  end loop;
end;
$$;
