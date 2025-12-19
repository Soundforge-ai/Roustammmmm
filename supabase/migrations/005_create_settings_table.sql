-- Maak de settings tabel aan voor app instellingen
create table if not exists public.app_settings (
  id text primary key default 'default',
  active_provider text default 'naga' check (active_provider in ('naga', 'huggingface', 'cloudflare', 'gemini', 'siliconflow', 'custom')),
  providers jsonb default '{}'::jsonb not null,
  bot_name text default 'Yannova Assistent',
  system_prompt text default '',
  knowledge_base jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.app_settings enable row level security;

-- Policy: Alleen geauthenticeerde gebruikers kunnen settings zien
create policy "Authenticated users can view settings"
  on public.app_settings
  for select
  using (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen settings aanmaken
create policy "Authenticated users can insert settings"
  on public.app_settings
  for insert
  with check (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen settings updaten
create policy "Authenticated users can update settings"
  on public.app_settings
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Trigger voor updated_at
create trigger set_app_settings_updated_at
  before update on public.app_settings
  for each row
  execute function public.handle_updated_at();

