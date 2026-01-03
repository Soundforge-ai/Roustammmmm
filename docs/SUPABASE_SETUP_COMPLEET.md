# ✅ Supabase Setup Compleet - Alle Stappen

## 🎯 Project Gegevens

**Project URL:** https://fwfkrbfozjlxmpfmagrt.supabase.co  
**Project Reference:** `fwfkrbfozjlxmpfmagrt`  
**Dashboard:** https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt

**Credentials:** ✅ Geconfigureerd in MCP en `.env.local`

---

## 📋 Stap 1: Environment Variables

### ✅ Automatisch Bijgewerkt

Het script heeft `.env.local` bijgewerkt met:
```env
VITE_SUPABASE_URL=https://fwfkrbfozjlxmpfmagrt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Verificatie:**
```bash
cat .env.local | grep SUPABASE
```

---

## 🚀 Stap 2: Database Migraties Uitvoeren

### Optie A: Alle Migraties in Één Keer (Aanbevolen)

1. **Open Supabase Dashboard:**
   - https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt

2. **Klik op SQL Editor**

3. **Open bestand:** `scripts/ALL_MIGRATIONS_COMBINED.sql`

4. **Kopieer ALLE inhoud** en plak in SQL Editor

5. **Klik op Run** (of Ctrl+Enter)

6. ✅ **Resultaat:** "Success. No rows returned"

**Dit voert alle 4 migraties in één keer uit!**

---

### Optie B: Migraties Apart Uitvoeren

Als je migraties apart wilt uitvoeren, volg `scripts/KOPIEER_PLAK_MIGRATIES.md`

---

## ✅ Stap 3: Verificatie

### Controleer Tabellen

1. Ga naar **Table Editor** in Supabase Dashboard
2. Controleer of deze tabellen bestaan:
   - ✅ `chat_sessions`
   - ✅ `pages`
   - ✅ `app_settings`
   - ✅ `leads` (al eerder aangemaakt)

### Controleer Functies

1. Ga naar **Database** → **Functions**
2. Controleer of deze functie bestaat:
   - ✅ `handle_updated_at()`

---

## 🔄 Stap 4: Test App

### Herstart Development Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Test Admin Dashboard

1. Open Admin Dashboard
2. Open Browser Console (F12)
3. Zoek naar: `🔄 Starting automatic migration to Supabase...`
4. Check of je ziet: `✅ Migration completed`

### Test Functionaliteit

- ✅ **Chats tab** - bestaande chats zichtbaar?
- ✅ **Pagina's tab** - bestaande pagina's zichtbaar?
- ✅ **Instellingen tab** - instellingen behouden?

---

## 📊 Wat is Gemigreerd?

| Data Type | Van | Naar | Status |
|-----------|-----|------|--------|
| **Chat Gesprekken** | LocalStorage | `chat_sessions` tabel | ✅ Automatisch |
| **Pagina's** | LocalStorage | `pages` tabel | ✅ Automatisch |
| **Instellingen** | LocalStorage | `app_settings` tabel | ✅ Automatisch |
| **Klantgegevens** | Supabase | Supabase | ✅ Al actief |

---

## 🎉 Klaar!

Na het uitvoeren van de migraties:
- ✅ Alle data wordt permanent opgeslagen
- ✅ Toegankelijk vanaf elke browser/device
- ✅ Automatische backup en recovery
- ✅ Beveiligd met Row Level Security

---

## ⚠️ Troubleshooting

### "Supabase credentials not found"
**Oplossing:**
1. Check `.env.local` bevat credentials
2. Herstart development server

### "Project is paused"
**Oplossing:**
1. Ga naar Dashboard
2. Klik op **"Restore project"**

### "function handle_updated_at() does not exist"
**Oplossing:**
- Voer eerst Migratie 1 uit (Shared Functions)

---

**Laatste Update:** 25 december 2025

