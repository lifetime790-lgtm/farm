alter table public.predictions
    add column if not exists analysis_text text;
