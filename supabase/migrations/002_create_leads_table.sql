-- Maak de leads tabel aan voor klantgegevens
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  project text not null,
  status text not null default 'Nieuw' check (status in ('Nieuw', 'Contact Gehad', 'Offerte Verzonden', 'Afgerond')),
  notes jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Maak indexes aan voor snellere queries
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_email_idx on public.leads(email);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Policy: Alleen geauthenticeerde gebruikers kunnen leads zien
create policy "Authenticated users can view leads"
  on public.leads
  for select
  using (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen leads aanmaken
create policy "Authenticated users can insert leads"
  on public.leads
  for insert
  with check (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen leads updaten
create policy "Authenticated users can update leads"
  on public.leads
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen leads verwijderen
create policy "Authenticated users can delete leads"
  on public.leads
  for delete
  using (auth.role() = 'authenticated');

-- Functie om updated_at automatisch bij te werken
create or replace function public.handle_leads_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger om updated_at automatisch bij te werken bij updates
create trigger set_leads_updated_at
  before update on public.leads
  for each row
  execute function public.handle_leads_updated_at();

