# 🚀 Supabase Migraties Uitvoeren - SNELSTE WEG

## ✅ Credentials Geconfigureerd

**Project:** `fwfkrbfozjlxmpfmagrt`  
**Dashboard:** https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt

---

## 🎯 SNELSTE METHODE: Alle Migraties in Één Keer

### Stap 1: Open Supabase Dashboard
1. Ga naar: https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt
2. Klik op **SQL Editor** in het linker menu
3. Klik op **New Query**

### Stap 2: Kopieer ALLE Migraties
1. Open bestand: `scripts/ALL_MIGRATIONS_COMBINED.sql`
2. **Kopieer de VOLLEDIGE inhoud** (alles van begin tot eind)
3. Plak in SQL Editor
4. Klik op **Run** (of druk Ctrl+Enter)

### Stap 3: ✅ Klaar!
- Je ziet: "Success. No rows returned"
- Alle 4 migraties zijn uitgevoerd!

---

## 📋 Wat Wordt Aangemaakt?

1. ✅ **Shared Functions** - `handle_updated_at()` functie
2. ✅ **chat_sessions** tabel - Voor chat gesprekken
3. ✅ **pages** tabel - Voor dynamische pagina's
4. ✅ **app_settings** tabel - Voor app instellingen

---

## ✅ Verificatie

Na het uitvoeren:
1. Ga naar **Table Editor** in Supabase Dashboard
2. Controleer of deze tabellen bestaan:
   - `chat_sessions` ✅
   - `pages` ✅
   - `app_settings` ✅

---

## 🔄 Na Migraties

1. **Herstart development server:**
   ```bash
   npm run dev
   ```

2. **Open Admin Dashboard**
   - De app migreert automatisch localStorage data naar Supabase
   - Check browser console voor status

---

## ⚠️ Problemen?

### "relation already exists"
→ Tabel bestaat al, dit is OK! Skip deze migratie.

### "function handle_updated_at() does not exist"
→ Voer eerst het begin van `ALL_MIGRATIONS_COMBINED.sql` uit (de functie definitie)

### "permission denied"
→ Controleer of je ingelogd bent in Supabase Dashboard

---

**💡 Tip:** Het bestand `scripts/ALL_MIGRATIONS_COMBINED.sql` bevat ALLES wat je nodig hebt!

