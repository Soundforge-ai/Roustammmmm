-- ============================================
-- SUPABASE MIGRATIES - ALLE IN ÉÉN BESTAND
-- ============================================
-- Voer dit bestand uit in Supabase SQL Editor
-- Project: fwfkrbfozjlxmpfmagrt
-- Dashboard: https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt
-- ============================================

-- ============================================
-- MIGRATIE 1: SHARED FUNCTIONS (EERST!)
-- ============================================
-- Gedeelde functies voor alle tabellen
-- Deze functie wordt gebruikt door meerdere triggers

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- ============================================
-- MIGRATIE 2: CHATS TABEL
-- ============================================
-- Maak de chats tabel aan voor chat gesprekken
create table if not exists public.chat_sessions (
  id text primary key,
  start_time timestamp with time zone default timezone('utc'::text, now()) not null,
  last_message_time timestamp with time zone default timezone('utc'::text, now()) not null,
  messages jsonb default '[]'::jsonb not null,
  preview text default 'Nieuw gesprek gestart',
  status text default 'active' check (status in ('active', 'closed')),
  tags jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Maak indexes aan
create index if not exists chat_sessions_status_idx on public.chat_sessions(status);
create index if not exists chat_sessions_last_message_time_idx on public.chat_sessions(last_message_time desc);

-- Enable Row Level Security
alter table public.chat_sessions enable row level security;

-- Policy: Alleen geauthenticeerde gebruikers kunnen chats zien
create policy "Authenticated users can view chats"
  on public.chat_sessions
  for select
  using (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen chats aanmaken
create policy "Authenticated users can insert chats"
  on public.chat_sessions
  for insert
  with check (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen chats updaten
create policy "Authenticated users can update chats"
  on public.chat_sessions
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen chats verwijderen
create policy "Authenticated users can delete chats"
  on public.chat_sessions
  for delete
  using (auth.role() = 'authenticated');

-- Trigger voor updated_at
create trigger set_chat_sessions_updated_at
  before update on public.chat_sessions
  for each row
  execute function public.handle_updated_at();

-- ============================================
-- MIGRATIE 3: PAGES TABEL
-- ============================================
-- Maak de pages tabel aan voor dynamische pagina's
create table if not exists public.pages (
  id text primary key,
  slug text not null unique,
  title text not null,
  content jsonb default '{"root": {}, "content": []}'::jsonb not null,
  status text default 'draft' check (status in ('published', 'draft')),
  parent_id text references public.pages(id) on delete set null,
  seo jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Maak indexes aan
create index if not exists pages_slug_idx on public.pages(slug);
create index if not exists pages_status_idx on public.pages(status);
create index if not exists pages_parent_id_idx on public.pages(parent_id);
create index if not exists pages_created_at_idx on public.pages(created_at desc);

-- Enable Row Level Security
alter table public.pages enable row level security;

-- Policy: Alleen geauthenticeerde gebruikers kunnen pages zien
create policy "Authenticated users can view pages"
  on public.pages
  for select
  using (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen pages aanmaken
create policy "Authenticated users can insert pages"
  on public.pages
  for insert
  with check (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen pages updaten
create policy "Authenticated users can update pages"
  on public.pages
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen pages verwijderen
create policy "Authenticated users can delete pages"
  on public.pages
  for delete
  using (auth.role() = 'authenticated');

-- Trigger voor updated_at
create trigger set_pages_updated_at
  before update on public.pages
  for each row
  execute function public.handle_updated_at();

-- ============================================
-- MIGRATIE 4: SETTINGS TABEL
-- ============================================
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

-- ============================================
-- ✅ MIGRATIES VOLTOOID
-- ============================================
-- Controleer in Table Editor of deze tabellen bestaan:
-- - chat_sessions
-- - pages
-- - app_settings
-- ============================================

