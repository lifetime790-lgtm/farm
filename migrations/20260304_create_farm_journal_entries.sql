create extension if not exists pgcrypto;

create table if not exists public.farm_journal_entries (
  id uuid primary key default gen_random_uuid(),
  site_id text not null default 'default-farm',
  work_date_time timestamptz not null,
  time_band text not null default '오전',
  crop_name text,
  field_name text,
  weather_condition text,
  temperature numeric,
  rainfall numeric,
  humidity numeric,
  sunshine numeric,
  task_details text not null,
  materials text,
  crop_status text,
  labor_people numeric,
  labor_hours numeric,
  special_notes text,
  cost numeric not null default 0,
  revenue numeric not null default 0,
  pest_observation text,
  next_plan text,
  facility_meta jsonb not null default '{}'::jsonb,
  photos jsonb not null default '[]'::jsonb,
  saved_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists farm_journal_entries_site_date_idx
  on public.farm_journal_entries (site_id, work_date_time desc);

create or replace function public.set_farm_journal_entries_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_farm_journal_entries_updated_at on public.farm_journal_entries;
create trigger trg_farm_journal_entries_updated_at
before update on public.farm_journal_entries
for each row
execute function public.set_farm_journal_entries_updated_at();

alter table public.farm_journal_entries enable row level security;

drop policy if exists farm_journal_entries_select_all on public.farm_journal_entries;
drop policy if exists farm_journal_entries_insert_all on public.farm_journal_entries;
drop policy if exists farm_journal_entries_update_all on public.farm_journal_entries;
drop policy if exists farm_journal_entries_delete_all on public.farm_journal_entries;

create policy farm_journal_entries_select_all
on public.farm_journal_entries
for select
to anon
using (true);

create policy farm_journal_entries_insert_all
on public.farm_journal_entries
for insert
to anon
with check (true);

create policy farm_journal_entries_update_all
on public.farm_journal_entries
for update
to anon
using (true)
with check (true);

create policy farm_journal_entries_delete_all
on public.farm_journal_entries
for delete
to anon
using (true);
