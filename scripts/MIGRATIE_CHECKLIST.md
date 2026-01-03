# ✅ Migratie Checklist - Supabase

## 📋 Stap-voor-stap Checklist

### Voorbereiding
- [ ] Supabase Dashboard geopend: https://supabase.com/dashboard/project/sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b
- [ ] SQL Editor geopend in Supabase Dashboard

---

### Migratie 1: Shared Functions (VERPLICHT EERST!)
- [ ] Bestand geopend: `supabase/migrations/000_shared_functions.sql`
- [ ] Volledige inhoud gekopieerd
- [ ] Ingeplakt in SQL Editor
- [ ] Op **Run** geklikt (of Ctrl+Enter)
- [ ] ✅ Resultaat: "Success. No rows returned"

**⚠️ BELANGRIJK:** Deze moet EERST worden uitgevoerd!

---

### Migratie 2: Chats Tabel
- [ ] Bestand geopend: `supabase/migrations/003_create_chats_table.sql`
- [ ] Volledige inhoud gekopieerd
- [ ] Ingeplakt in SQL Editor
- [ ] Op **Run** geklikt
- [ ] ✅ Resultaat: "Success. No rows returned"

---

### Migratie 3: Pages Tabel
- [ ] Bestand geopend: `supabase/migrations/004_create_pages_table.sql`
- [ ] Volledige inhoud gekopieerd
- [ ] Ingeplakt in SQL Editor
- [ ] Op **Run** geklikt
- [ ] ✅ Resultaat: "Success. No rows returned"

---

### Migratie 4: Settings Tabel
- [ ] Bestand geopend: `supabase/migrations/005_create_settings_table.sql`
- [ ] Volledige inhoud gekopieerd
- [ ] Ingeplakt in SQL Editor
- [ ] Op **Run** geklikt
- [ ] ✅ Resultaat: "Success. No rows returned"

---

### Verificatie
- [ ] Naar **Table Editor** gegaan in Supabase Dashboard
- [ ] Tabel `chat_sessions` bestaat ✅
- [ ] Tabel `pages` bestaat ✅
- [ ] Tabel `app_settings` bestaat ✅

---

### Testen
- [ ] Website geopend
- [ ] Admin Dashboard geopend
- [ ] Browser Console geopend (F12)
- [ ] Gecontroleerd of migratie bericht zichtbaar is
- [ ] **Chats** tab getest - bestaande chats zichtbaar?
- [ ] **Pagina's** tab getest - bestaande pagina's zichtbaar?
- [ ] **Instellingen** tab getest - instellingen behouden?

---

## 🎉 Klaar!

Als alle stappen zijn voltooid:
- ✅ Data wordt nu permanent opgeslagen in Supabase
- ✅ Toegankelijk vanaf elke browser/device
- ✅ Automatische backup en recovery
- ✅ Veilig en schaalbaar

---

## ⚠️ Problemen?

Zie `docs/MIGRATIE_INSTRUCTIES.md` voor troubleshooting.

