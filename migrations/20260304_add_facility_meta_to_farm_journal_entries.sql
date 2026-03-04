alter table public.farm_journal_entries
add column if not exists facility_meta jsonb not null default '{}'::jsonb;
