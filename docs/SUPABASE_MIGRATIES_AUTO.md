# Supabase Migraties Automatisch Uitvoeren

## ✅ Credentials Geconfigureerd

De Supabase credentials zijn gevonden in MCP config:

**Project URL:** https://fwfkrbfozjlxmpfmagrt.supabase.co  
**Project Reference:** `fwfkrbfozjlxmpfmagrt`  
**Dashboard:** https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt

---

## 🚀 Automatische Setup

### Stap 1: Environment Variables Bijwerken

Het script heeft automatisch `.env.local` bijgewerkt met de Supabase credentials.

**Verificatie:**
```bash
cat .env.local | grep SUPABASE
```

### Stap 2: Migraties Uitvoeren

**⚠️ BELANGRIJK:** Supabase Management API ondersteunt geen directe SQL execution via REST API voor security redenen.

**Je moet de migraties handmatig uitvoeren via Supabase Dashboard:**

1. **Ga naar Dashboard:**
   - https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt

2. **Klik op SQL Editor** in het linker menu

3. **Voer migraties uit in deze volgorde:**

#### ✅ Migratie 1: Shared Functions (EERST!)
```sql
-- Gedeelde functies voor alle tabellen
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;
```

#### ✅ Migratie 2: Chats Tabel
Open: `supabase/migrations/003_create_chats_table.sql`
Kopieer volledige inhoud en voer uit

#### ✅ Migratie 3: Pages Tabel
Open: `supabase/migrations/004_create_pages_table.sql`
Kopieer volledige inhoud en voer uit

#### ✅ Migratie 4: Settings Tabel
Open: `supabase/migrations/005_create_settings_table.sql`
Kopieer volledige inhoud en voer uit

---

## 📋 Quick Reference

**Alle SQL queries staan klaar in:**
- `scripts/KOPIEER_PLAK_MIGRATIES.md` - Alle queries klaar om te kopiëren

**Checklist:**
- `scripts/MIGRATIE_CHECKLIST.md` - Stap-voor-stap checklist

---

## ✅ Na Migraties

1. **Verificatie:**
   - Ga naar **Table Editor** in Supabase Dashboard
   - Controleer of tabellen bestaan: `chat_sessions`, `pages`, `app_settings`

2. **Test App:**
   - Herstart development server: `npm run dev`
   - Open Admin Dashboard
   - Check browser console voor migratie status

3. **Automatische Migratie:**
   - De app migreert automatisch localStorage data naar Supabase
   - Check console voor: `🔄 Starting automatic migration to Supabase...`

---

## 🔧 Troubleshooting

### "Supabase credentials not found"
**Oplossing:**
1. Check `.env.local` bevat `VITE_SUPABASE_URL` en `VITE_SUPABASE_ANON_KEY`
2. Herstart development server

### "Project is paused"
**Oplossing:**
1. Ga naar Supabase Dashboard
2. Klik op **"Restore project"**
3. Wacht 1-2 minuten

### "function handle_updated_at() does not exist"
**Oplossing:**
- Voer eerst Migratie 1 (Shared Functions) uit!

---

**Laatste Update:** 25 december 2025

