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

-- Trigger voor updated_at (gebruikt gedeelde functie)
-- Let op: Deze functie moet bestaan (uit 000_shared_functions.sql of 001_create_sites_table.sql)
create trigger set_chat_sessions_updated_at
  before update on public.chat_sessions
  for each row
  execute function public.handle_updated_at();

