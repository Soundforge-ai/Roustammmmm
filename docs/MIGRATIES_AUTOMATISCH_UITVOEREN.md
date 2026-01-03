# ⚠️ Automatische Migraties - Status

## 🔍 Wat is Geprobeerd

### ❌ Supabase REST API
- **Probleem:** Supabase REST API ondersteunt geen directe SQL execution voor security redenen
- **Status:** Niet mogelijk

### ❌ Supabase CLI
- **Probleem:** Access token in MCP heeft verkeerd formaat
- **Vereist:** Token moet beginnen met `sbp_` (bijv. `sbp_0102...1920`)
- **Status:** Niet mogelijk zonder juiste token

### ❌ Directe PostgreSQL Connectie
- **Probleem:** Database connectie faalt ("Tenant or user not found")
- **Mogelijke oorzaken:**
  - Project is gepauzeerd
  - Database URL is incorrect
  - Wachtwoord is incorrect
- **Status:** Niet mogelijk

---

## ✅ AANBEVOLEN OPLOSSING: Handmatig via Dashboard

**Dit is de meest betrouwbare en veilige methode!**

### Stap 1: Open Supabase Dashboard
1. Ga naar: https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt
2. **Check of project actief is** (niet gepauzeerd)
3. Als gepauzeerd: klik op **"Restore project"** en wacht 1-2 minuten

### Stap 2: Open SQL Editor
1. Klik op **SQL Editor** in het linker menu
2. Klik op **New Query**

### Stap 3: Voer Migraties Uit
1. Open bestand: `scripts/ALL_MIGRATIONS_COMBINED.sql`
2. **Kopieer ALLE inhoud** (184 regels)
3. Plak in SQL Editor
4. Klik op **Run** (of druk Ctrl+Enter)
5. ✅ **Resultaat:** "Success. No rows returned"

### Stap 4: Verificatie
1. Ga naar **Table Editor**
2. Controleer of deze tabellen bestaan:
   - ✅ `chat_sessions`
   - ✅ `pages`
   - ✅ `app_settings`

---

## 🔧 Alternatief: Supabase CLI (Als Je Juiste Token Hebt)

Als je een `sbp_` access token hebt:

```bash
# Export access token
export SUPABASE_ACCESS_TOKEN="sbp_0102...1920"

# Link project
supabase link --project-ref fwfkrbfozjlxmpfmagrt

# Push migraties
supabase db push
```

**Waar vind je het juiste token?**
1. Ga naar Supabase Dashboard
2. Settings → Access Tokens
3. Maak een nieuw access token aan
4. Kopieer het token (begint met `sbp_`)

---

## 📋 Bestanden Klaar

Alle migraties staan klaar in:
- ✅ `scripts/ALL_MIGRATIONS_COMBINED.sql` - Alle migraties in één bestand
- ✅ `scripts/EXECUTE_MIGRATIONS.md` - Snelle instructies
- ✅ `docs/SUPABASE_SETUP_COMPLEET.md` - Uitgebreide gids

---

## ⏱️ Tijd: ~2 Minuten

Handmatige uitvoering duurt slechts 2 minuten:
1. Open Dashboard (30 sec)
2. Kopieer SQL (30 sec)
3. Voer uit (30 sec)
4. Verificatie (30 sec)

**Totaal: ~2 minuten** ⚡

---

**Laatste Update:** 25 december 2025

