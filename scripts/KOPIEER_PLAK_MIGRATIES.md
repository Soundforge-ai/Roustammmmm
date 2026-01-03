# 🚀 Kopieer & Plak Migraties - Supabase

## 📍 Stap 1: Open Supabase SQL Editor

1. Ga naar: https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt
2. Klik op **SQL Editor** in het linker menu
3. Klik op **New Query**

**💡 SNEL:** Open `scripts/ALL_MIGRATIONS_COMBINED.sql` - alle migraties in één bestand!

---

## ✅ Migratie 1: Shared Functions (EERST!)

**Kopieer deze code en plak in SQL Editor:**

```sql
-- Gedeelde functies voor alle tabellen
-- Deze functie wordt gebruikt door meerdere triggers

-- Functie om updated_at automatisch bij te werken
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;
```

**Klik op Run** (of druk Ctrl+Enter)

✅ **Verwacht resultaat:** "Success. No rows returned"

---

## ✅ Migratie 2: Chats Tabel

**Kopieer deze code en plak in SQL Editor:**

```sql
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
```

**Klik op Run**

✅ **Verwacht resultaat:** "Success. No rows returned"

---

## ✅ Migratie 3: Pages Tabel

**Kopieer deze code en plak in SQL Editor:**

```sql
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
```

**Klik op Run**

✅ **Verwacht resultaat:** "Success. No rows returned"

---

## ✅ Migratie 4: Settings Tabel

**Kopieer deze code en plak in SQL Editor:**

```sql
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
```

**Klik op Run**

✅ **Verwacht resultaat:** "Success. No rows returned"

---

## ✅ Verificatie

### Controleer Tabellen

1. Ga naar **Table Editor** in Supabase Dashboard
2. Controleer of deze tabellen bestaan:
   - ✅ `chat_sessions`
   - ✅ `pages`
   - ✅ `app_settings`

### Test Automatische Migratie

1. Open je website
2. Ga naar Admin Dashboard
3. Open Browser Console (F12)
4. Zoek naar: `🔄 Starting automatic migration to Supabase...`
5. Controleer of je ziet: `✅ Migration completed`

---

## 🎉 Klaar!

Als alle 4 migraties zijn uitgevoerd:
- ✅ Data wordt nu permanent opgeslagen
- ✅ Automatische migratie werkt
- ✅ Toegankelijk vanaf elke browser

---

## ⚠️ Problemen?

### "function handle_updated_at() does not exist"
→ Voer eerst Migratie 1 uit!

### "relation already exists"
→ Dit is OK! Tabel bestaat al, skip deze migratie.

### "permission denied"
→ Controleer of je ingelogd bent in Supabase Dashboard.

---

**Succes! 🚀**

