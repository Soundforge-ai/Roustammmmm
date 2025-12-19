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

