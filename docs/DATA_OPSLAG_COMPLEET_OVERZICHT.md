# Data Opslag Compleet Overzicht - Yannova Website

**Laatste Update:** 25 december 2025

---

## 📊 Overzicht Alle Data Locaties

### ✅ 1. KLANTGEGEVENS (Leads) - Supabase Database

**Locatie:** Supabase PostgreSQL Database  
**Project:** `sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b`  
**Dashboard:** https://supabase.com/dashboard/project/sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b

**Tabel:** `public.leads`

**Wat wordt opgeslagen:**
- Naam klant
- Email adres
- Telefoonnummer
- Project beschrijving
- Status (Nieuw, Contact Gehad, Offerte Verzonden, Afgerond)
- Notities
- Datum aanmaak/update

**Bestand:** `src/lib/supabase/leads.ts`

**Status:** ✅ **PERMANENT OPGESLAGEN** - Veilig en toegankelijk vanaf elke browser

---

### ⚠️ 2. CHAT GESPREKKEN - Browser LocalStorage (tijdelijk)

**Locatie:** Browser LocalStorage  
**Key:** `yannova_chat_sessions`

**Wat wordt opgeslagen:**
- Chat berichten tussen bezoekers en chatbot
- Chat sessie historie
- Timestamps
- Status en tags

**Bestand:** `src/lib/chatStorage.ts`

**Status:** ⚠️ **TIJDELIJK** - Alleen op deze browser, verloren bij wissen  
**Migratie:** ✅ Code klaar voor Supabase (`003_create_chats_table.sql`)

---

### ⚠️ 3. DYNAMISCHE PAGINA'S - Browser LocalStorage (tijdelijk)

**Locatie:** Browser LocalStorage  
**Key:** `yannova_pages`

**Wat wordt opgeslagen:**
- Pagina's gemaakt met Puck editor
- SEO instellingen per pagina
- Pagina content (HTML/JSON)
- Status (draft/published)

**Bestand:** `src/lib/pageStorage.ts`

**Status:** ⚠️ **TIJDELIJK** - Alleen op deze browser, verloren bij wissen  
**Migratie:** ✅ Code klaar voor Supabase (`004_create_pages_table.sql`)

---

### ⚠️ 4. APP INSTELLINGEN - Browser LocalStorage (tijdelijk)

**Locatie:** Browser LocalStorage  
**Key:** `yannova_app_settings`

**Wat wordt opgeslagen:**
- AI Provider configuratie (Naga, Gemini, etc.)
- API keys voor AI modellen
- Chatbot naam en system prompt
- Kennisbank documenten (RAG)
- 3D API URL

**Bestand:** `src/lib/settingsStorage.ts`

**Status:** ⚠️ **TIJDELIJK** - Alleen op deze browser, verloren bij wissen  
**Migratie:** ✅ Code klaar voor Supabase (`005_create_settings_table.sql`)

---

### 📸 5. FOTO'S & MEDIA - Meerdere Locaties

#### A. Lokale Public Folder ✅
**Locatie:** `/public/images/`  
**Bestanden:** ~25 foto's (PNG, JPG)

**Wat wordt opgeslagen:**
- Website afbeeldingen
- Testimonials
- Team foto's
- Crepi patterns
- 3D model previews

**Toegankelijk via:** `https://yannova.be/images/foto-naam.png`

**Status:** ✅ **PERMANENT** - Wordt meegedeeld met website code

---

#### B. Browser LocalStorage ⚠️ (Admin Dashboard)
**Locatie:** Browser LocalStorage  
**Key:** `yannova_media`

**Wat wordt opgeslagen:**
- Geüploade afbeeldingen als Base64 (beperkt tot ~4MB)
- Media metadata
- Alleen zichtbaar in Admin Dashboard

**Bestand:** `src/lib/mediaStorage.ts`

**Status:** ⚠️ **TIJDELIJK** - Alleen voor previews, niet voor productie

---

#### C. Google Cloud Storage ⚠️ (Geconfigureerd, nog niet gebruikt)
**Locatie:** Google Cloud Storage  
**Bucket:** `yannova-media`  
**Project:** `gen-lang-client-0141118397`

**Wat kan worden opgeslagen:**
- Foto's en documenten
- Publieke URLs: `https://storage.googleapis.com/yannova-media/images/...`

**Upload Script:** `scripts/upload-photos-to-gcs.mjs`

**Status:** ⚠️ **GECONFIGUREERD** - Bucket bestaat, maar nog geen foto's geüpload

---

### 🗄️ 6. DATABASE TABELLEN (Supabase)

**Project:** `sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b`

**Bestaande Tabellen:**
1. ✅ `public.leads` - Klantgegevens (ACTIEF)
2. ✅ `public.sites` - Site content (Puck editor)
3. ✅ `public.seo_data` - SEO metadata
4. ⏳ `public.chat_sessions` - Chat gesprekken (migratie klaar, nog uitvoeren)
5. ⏳ `public.pages` - Dynamische pagina's (migratie klaar, nog uitvoeren)
6. ⏳ `public.app_settings` - App instellingen (migratie klaar, nog uitvoeren)

**Migratie Bestanden:**
- `supabase/migrations/001_create_sites_table.sql`
- `supabase/migrations/002_create_leads_table.sql` ✅
- `supabase/migrations/003_create_chats_table.sql` ⏳
- `supabase/migrations/004_create_pages_table.sql` ⏳
- `supabase/migrations/005_create_settings_table.sql` ⏳
- `supabase/migrations/20251220_create_seo_data.sql` ✅

---

## 📍 Waar Kun Je Data Bekijken?

### Supabase Database (Klantgegevens)
1. Ga naar: https://supabase.com/dashboard
2. Selecteer project: `sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b`
3. Klik op **Table Editor**
4. Selecteer tabel (bijv. `leads`)

### Browser LocalStorage (Tijdelijke Data)
1. Open browser Developer Tools (F12)
2. Ga naar **Application** tab (Chrome) of **Storage** tab (Firefox)
3. Klik op **Local Storage**
4. Selecteer `yannova.be` of `localhost:3002`
5. Zoek naar:
   - `yannova_chat_sessions` - Chat gesprekken
   - `yannova_pages` - Pagina's
   - `yannova_media` - Media items
   - `yannova_app_settings` - Instellingen

### Google Cloud Storage (Foto's)
1. Ga naar: https://console.cloud.google.com/storage/browser?project=gen-lang-client-0141118397
2. Selecteer bucket: `yannova-media`
3. Bekijk foto's in `images/` folder

### Lokale Foto's
**Locatie:** `/public/images/` folder in project  
**Bekijken:** Direct in code editor of via website URLs

---

## ⚠️ Belangrijke Opmerkingen

### Data die VERLOREN kan gaan:
- ❌ Chat gesprekken (LocalStorage) - alleen op deze browser
- ❌ Dynamische pagina's (LocalStorage) - alleen op deze browser
- ❌ App instellingen (LocalStorage) - alleen op deze browser
- ❌ Media previews (LocalStorage) - alleen op deze browser

### Data die VEILIG is:
- ✅ Klantgegevens (Supabase) - permanent opgeslagen
- ✅ Lokale foto's (`public/images/`) - in code repository
- ✅ Website code - in Git repository

---

## 🔄 Migratie Status

| Data Type | Huidige Locatie | Doel Locatie | Status |
|-----------|----------------|--------------|--------|
| **Klantgegevens** | ✅ Supabase | ✅ Supabase | ✅ **KLAAR** |
| **Chat Gesprekken** | ⚠️ LocalStorage | ✅ Supabase | ⏳ Code klaar, migratie nodig |
| **Pagina's** | ⚠️ LocalStorage | ✅ Supabase | ⏳ Code klaar, migratie nodig |
| **Instellingen** | ⚠️ LocalStorage | ✅ Supabase | ⏳ Code klaar, migratie nodig |
| **Foto's (lokaal)** | ✅ `/public/images/` | ✅ Blijft lokaal | ✅ **KLAAR** |
| **Foto's (GCS)** | ⚠️ Nog niet gebruikt | ✅ Google Cloud Storage | ⏳ Geconfigureerd, upload nodig |

---

## 🎯 Aanbevelingen

### Prioriteit 1: Migreer Tijdelijke Data naar Supabase
1. Voer migraties uit in Supabase Dashboard:
   - `003_create_chats_table.sql`
   - `004_create_pages_table.sql`
   - `005_create_settings_table.sql`

2. Data wordt automatisch gemigreerd wanneer Supabase beschikbaar is

### Prioriteit 2: Foto's naar Google Cloud Storage
1. Upload foto's via: `node scripts/upload-photos-to-gcs.mjs`
2. Gebruik GCS URLs in plaats van lokale paths
3. Betere performance en schaalbaarheid

### Prioriteit 3: Backup Strategie
1. **Supabase:** Automatische backups (afhankelijk van plan)
2. **LocalStorage:** Export via browser Developer Tools
3. **Foto's:** Backup van `/public/images/` folder

---

## 📞 Contact & Support

Voor vragen over data opslag:
- Supabase Dashboard: https://supabase.com/dashboard
- Google Cloud Console: https://console.cloud.google.com/
- Project Docs: `/docs/DATA_STORAGE.md`

---

**Laatste Update:** 25 december 2025

