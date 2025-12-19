# Data Opslag Overzicht - Admin Panel

## Overzicht

De gegevens in het admin panel worden op verschillende locaties opgeslagen:

## 1. Leads (Klantgegevens) - Supabase Database ✅

**Locatie:** Supabase PostgreSQL Database  
**Project Reference:** `sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b`

**Tabel:** `public.leads`

**Velden:**
- `id` (uuid)
- `name` (text)
- `email` (text)
- `phone` (text)
- `project` (text)
- `status` (text)
- `notes` (jsonb)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Voordelen:**
- ✅ Permanente opslag (niet verloren bij browser sluiten)
- ✅ Beveiligd met Row Level Security
- ✅ Toegankelijk vanaf elke browser/device
- ✅ Backup en recovery mogelijk
- ✅ Schaalbaar

**Bestand:** `src/lib/supabase/leads.ts`

---

## 2. Chat Gesprekken - Browser LocalStorage

**Locatie:** Browser LocalStorage  
**Key:** `yannova_chat_sessions`

**Opslag:**
- Chat sessies met berichten
- Timestamps
- Status en tags

**Nadelen:**
- ❌ Alleen op deze browser/computer
- ❌ Verloren bij browser data wissen
- ❌ Niet toegankelijk vanaf andere devices
- ❌ Beperkte opslagruimte (~5-10MB)

**Bestand:** `src/lib/chatStorage.ts`

**Aanbeveling:** Migreer naar Supabase voor permanente opslag

---

## 3. Pagina's - Browser LocalStorage

**Locatie:** Browser LocalStorage  
**Key:** `yannova_pages`

**Opslag:**
- Dynamische pagina's (Puck editor content)
- SEO instellingen
- Pagina status (draft/published)

**Nadelen:**
- ❌ Alleen op deze browser/computer
- ❌ Verloren bij browser data wissen
- ❌ Niet toegankelijk vanaf andere devices

**Bestand:** `src/lib/pageStorage.ts`

**Aanbeveling:** Migreer naar Supabase voor permanente opslag

---

## 4. Media & Foto's - Browser LocalStorage

**Locatie:** Browser LocalStorage  
**Key:** `yannova_media`

**Opslag:**
- Geüploade afbeeldingen (als Base64)
- Documenten
- Metadata (naam, type, grootte)

**Nadelen:**
- ❌ Alleen op deze browser/computer
- ❌ Beperkte opslagruimte (max ~4MB)
- ❌ Verloren bij browser data wissen
- ❌ Base64 is inefficiënt voor grote bestanden

**Bestand:** `src/lib/mediaStorage.ts`

**Aanbeveling:** 
- Migreer naar Supabase Storage voor bestanden
- Of gebruik externe storage (AWS S3, Cloudinary, etc.)

---

## 5. Instellingen - Browser LocalStorage

**Locatie:** Browser LocalStorage  
**Key:** `yannova_app_settings`

**Opslag:**
- AI Provider configuratie (API keys, models)
- Chatbot instellingen (naam, system prompt)
- Kennisbank documenten

**Nadelen:**
- ❌ Alleen op deze browser/computer
- ❌ Verloren bij browser data wissen
- ❌ API keys in localStorage (niet ideaal voor security)

**Bestand:** `src/lib/settingsStorage.ts`

**Aanbeveling:** 
- Migreer naar Supabase voor instellingen
- API keys moeten in environment variables of Supabase secrets

---

## Supabase Project Details

**Project Reference:** `sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b`

**Dashboard:** https://supabase.com/dashboard/project/sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b

**Huidige Tabellen:**
1. `public.sites` - Voor site content (Puck editor)
2. `public.leads` - Voor klantgegevens/leads ✅

---

## Migratie Prioriteiten

### Hoge Prioriteit (Kritieke Data)
1. ✅ **Leads** - Al geïmplementeerd in Supabase
2. **Pagina's** - Belangrijk voor website content
3. **Instellingen** - Belangrijk voor configuratie

### Medium Prioriteit
4. **Chat Gesprekken** - Handig voor historie
5. **Media** - Kan naar Supabase Storage

---

## Hoe Data Bekijken

### Supabase (Leads)
1. Ga naar: https://supabase.com/dashboard
2. Selecteer je project
3. Ga naar **Table Editor**
4. Selecteer `leads` tabel

### LocalStorage (Andere Data)
1. Open browser Developer Tools (F12)
2. Ga naar **Application** tab (Chrome) of **Storage** tab (Firefox)
3. Klik op **Local Storage**
4. Selecteer je website domain
5. Zoek naar:
   - `yannova_chat_sessions`
   - `yannova_pages`
   - `yannova_media`
   - `yannova_app_settings`

---

## Backup Aanbevelingen

### Supabase
- Automatische backups via Supabase (afhankelijk van plan)
- Handmatige export via SQL Editor

### LocalStorage
- Export via browser Developer Tools
- Of maak export functionaliteit in admin panel

---

## Volgende Stappen

1. ✅ Leads migratie naar Supabase - **VOLTOOID**
2. ⏳ Pagina's migratie naar Supabase
3. ⏳ Instellingen migratie naar Supabase
4. ⏳ Chat gesprekken migratie naar Supabase
5. ⏳ Media migratie naar Supabase Storage

