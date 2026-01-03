# Migratie Instructies - LocalStorage naar Supabase

## 🎯 Doel

Migreer alle tijdelijke data (chats, pagina's, instellingen) van Browser LocalStorage naar Supabase voor permanente opslag.

---

## 🚀 Quick Start

**Voor de snelle start, gebruik:** `scripts/KOPIEER_PLAK_MIGRATIES.md`

Dit bestand bevat alle SQL queries klaar om te kopiëren en plakken!

---

## 📋 Stap 1: Database Migraties Uitvoeren

### Ga naar Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b
2. Klik op **SQL Editor** in het linker menu

### Voer Migraties Uit (in deze volgorde!)

#### ✅ Migratie 1: Shared Functions (EERST!)
1. Open bestand: `supabase/migrations/000_shared_functions.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run** (of druk Ctrl+Enter)
5. ✅ Controleer: "Success. No rows returned"

**Belangrijk:** Deze functie is nodig voor alle andere migraties!

#### ✅ Migratie 2: Chats Tabel
1. Open bestand: `supabase/migrations/003_create_chats_table.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run**
5. ✅ Controleer: "Success. No rows returned"

#### ✅ Migratie 3: Pages Tabel
1. Open bestand: `supabase/migrations/004_create_pages_table.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run**
5. ✅ Controleer: "Success. No rows returned"

#### ✅ Migratie 4: Settings Tabel
1. Open bestand: `supabase/migrations/005_create_settings_table.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run**
5. ✅ Controleer: "Success. No rows returned"

---

## ✅ Stap 2: Verificatie

### Controleer Tabellen
1. Ga naar **Table Editor** in Supabase Dashboard
2. Controleer of deze tabellen bestaan:
   - ✅ `chat_sessions`
   - ✅ `pages`
   - ✅ `app_settings`

### Controleer Functies
1. Ga naar **Database** → **Functions** in Supabase Dashboard
2. Controleer of deze functie bestaat:
   - ✅ `handle_updated_at()`

---

## 🔄 Stap 3: Automatische Migratie

### Wat gebeurt er automatisch?

1. **Bij eerste keer Admin Dashboard openen:**
   - De app detecteert dat er nog geen migratie is uitgevoerd
   - Probeert automatisch localStorage data naar Supabase te migreren
   - Toont status in browser console

2. **Na succesvolle migratie:**
   - Data wordt permanent opgeslagen in Supabase
   - LocalStorage wordt als backup behouden
   - Alle nieuwe data gaat direct naar Supabase

### Handmatige Migratie (optioneel)

Als je handmatig wilt migreren:

1. Open browser Developer Tools (F12)
2. Ga naar **Console** tab
3. Voer uit:
```javascript
import('./lib/migrateToSupabase').then(m => {
  m.migrateAll().then(results => {
    console.log('✅ Migratie voltooid:', results);
  });
});
```

---

## 🔍 Stap 4: Testen

### Test Chat Gesprekken
1. Open Admin Dashboard → **Chats** tab
2. Controleer of bestaande chats zichtbaar zijn
3. Start een nieuwe chat
4. Controleer of deze wordt opgeslagen

### Test Pagina's
1. Open Admin Dashboard → **Pagina's** tab
2. Controleer of bestaande pagina's zichtbaar zijn
3. Maak een test pagina
4. Controleer of deze wordt opgeslagen

### Test Instellingen
1. Open Admin Dashboard → **Instellingen** tab
2. Wijzig een instelling (bijv. chatbot naam)
3. Sla op
4. Refresh de pagina
5. Controleer of instellingen behouden zijn

---

## ⚠️ Troubleshooting

### "function handle_updated_at() does not exist"
**Oorzaak:** De shared functions migratie is niet uitgevoerd.

**Oplossing:**
1. Voer eerst `000_shared_functions.sql` uit
2. Of voer `001_create_sites_table.sql` uit (bevat ook deze functie)

### "relation already exists"
**Oorzaak:** Tabel bestaat al.

**Oplossing:** Dit is OK! De tabel bestaat al, skip deze migratie.

### "permission denied"
**Oorzaak:** Je bent niet ingelogd of hebt geen rechten.

**Oplossing:**
1. Controleer of je ingelogd bent in Supabase Dashboard
2. Controleer of je de juiste project hebt geselecteerd

### "Supabase not available" in console
**Oorzaak:** Supabase credentials zijn niet geconfigureerd.

**Oplossing:**
1. Controleer `.env.local` of `.env` bestand:
   ```
   VITE_SUPABASE_URL=je-supabase-url
   VITE_SUPABASE_ANON_KEY=je-supabase-anon-key
   ```
2. Refresh de browser na het toevoegen van credentials

### Data wordt niet gemigreerd
**Oorzaak:** Migraties zijn niet uitgevoerd of Supabase is niet beschikbaar.

**Oplossing:**
1. Controleer of alle 4 migraties zijn uitgevoerd
2. Controleer browser console voor errors
3. Controleer Supabase Dashboard → Table Editor of tabellen bestaan

### Migratie loopt vast
**Oorzaak:** Te veel data of netwerkproblemen.

**Oplossing:**
1. Check browser console voor specifieke errors
2. Probeer handmatige migratie (zie Stap 3)
3. Migreer in delen (eerst chats, dan pages, dan settings)

---

## 📊 Wat wordt gemigreerd?

| Data Type | Van | Naar | Status |
|-----------|-----|------|--------|
| **Chat Gesprekken** | LocalStorage | `chat_sessions` tabel | ✅ Automatisch |
| **Pagina's** | LocalStorage | `pages` tabel | ✅ Automatisch |
| **Instellingen** | LocalStorage | `app_settings` tabel | ✅ Automatisch |
| **Media** | LocalStorage | Blijft LocalStorage | ⏳ Toekomst: Supabase Storage |

---

## ✅ Checklist

- [ ] Migratie 000 (shared functions) uitgevoerd
- [ ] Migratie 003 (chats) uitgevoerd
- [ ] Migratie 004 (pages) uitgevoerd
- [ ] Migratie 005 (settings) uitgevoerd
- [ ] Tabellen gecontroleerd in Table Editor
- [ ] Admin Dashboard geopend
- [ ] Automatische migratie voltooid (check console)
- [ ] Chats getest
- [ ] Pagina's getest
- [ ] Instellingen getest

---

## 🎉 Na Migratie

### Voordelen:
- ✅ Data is permanent opgeslagen
- ✅ Toegankelijk vanaf elke browser/device
- ✅ Backup en recovery mogelijk
- ✅ Schaalbaar voor groei
- ✅ Beveiligd met Row Level Security

### LocalStorage:
- LocalStorage blijft als backup
- Nieuwe data gaat direct naar Supabase
- Oude LocalStorage data kan worden verwijderd (optioneel)

---

**Laatste Update:** 25 december 2025  
**Status:** Klaar voor migratie

