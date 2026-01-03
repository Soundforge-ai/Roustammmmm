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

