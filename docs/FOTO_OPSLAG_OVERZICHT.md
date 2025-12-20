# Foto Opslag Overzicht - Yannova Project

## 📸 Huidige Situatie

### ✅ Foto's die AL zijn toegevoegd:

**Locatie 1: `public/images/` folder** (14 PNG + 9 JPG bestanden)
- ✅ 14 PNG bestanden (o.a. `003a3c82-53d0-4c81-8d96-4ae5ad333f15.png`, etc.)
- ✅ 9 JPG bestanden (testimonials, team foto, crepi patterns)
- ✅ 7 extra foto's in `public/images/downloads/` subfolder

**Totaal: ~23 foto's lokaal opgeslagen**

**Locatie 2: Externe URLs** (in code gebruikt)
- Sommige componenten gebruiken URLs van `lovable-uploads`:
  - `https://www.yannovabouw.be/lovable-uploads/...`
- Deze worden gebruikt als fallback in sommige componenten

---

## 📍 Waar worden foto's opgeslagen?

### 1. **Lokale Public Folder** ✅ (Huidig)
**Locatie**: `/public/images/`
- ✅ Foto's worden direct geserveerd via de website
- ✅ Toegankelijk via: `https://www.yannova.be/images/foto-naam.png`
- ✅ Gebruikt in componenten zoals: `/images/crepi-patterns.png`

**Voordelen:**
- ✅ Eenvoudig te gebruiken
- ✅ Geen extra kosten
- ✅ Snelle laadtijden (lokaal)

**Nadelen:**
- ❌ Beperkte opslagruimte (wordt meegedeeld met code)
- ❌ Moeilijker te beheren bij veel foto's
- ❌ Geen CDN (langzamer voor internationale bezoekers)

---

### 2. **Browser LocalStorage** ⚠️ (Voor Admin Dashboard)
**Locatie**: Browser LocalStorage (key: `yannova_media`)
- ⚠️ Foto's worden opgeslagen als Base64 strings
- ⚠️ Alleen zichtbaar in de Admin Dashboard Media tab
- ⚠️ Beperkt tot ~4MB totaal

**Status**: 
- ❌ **Niet aanbevolen** voor productie
- ❌ Alleen voor tijdelijke previews
- ❌ Verloren bij browser data wissen

**Bestand**: `src/lib/mediaStorage.ts`

---

### 3. **Google Cloud Storage** ⚠️ (Geconfigureerd, maar nog niet gebruikt)
**Locatie**: Google Cloud Storage bucket `yannova-media`
- ⚠️ Bucket is geconfigureerd in code
- ❌ **Nog geen foto's geüpload** (geen `upload-results.json` gevonden)
- ⚠️ Upload script bestaat: `scripts/upload-photos-to-gcs.mjs`

**Configuratie:**
- Bucket naam: `yannova-media`
- Project ID: `gen-lang-client-0141118397`
- Base URL: `https://storage.googleapis.com/yannova-media`

**Status**: 
- ⚠️ **Nog niet actief** - foto's moeten eerst worden geüpload
- ✅ Code is klaar om GCS te gebruiken
- ✅ Upload script is beschikbaar

---

## 🔄 Migratie Status

### Huidige Situatie:
1. ✅ Foto's staan in `public/images/` (lokaal)
2. ⚠️ Google Cloud Storage is geconfigureerd maar leeg
3. ⚠️ Admin Dashboard kan foto's tonen uit LocalStorage (beperkt)

### Aanbevolen Actie:
**Optie A: Blijf lokaal gebruiken** (voor kleine websites)
- ✅ Foto's blijven in `public/images/`
- ✅ Geen extra setup nodig
- ✅ Werkt direct

**Optie B: Migreer naar Google Cloud Storage** (aanbevolen voor schaalbaarheid)
- ✅ Upload foto's naar GCS bucket
- ✅ Gebruik GCS URLs in plaats van lokale paths
- ✅ Betere performance en schaalbaarheid

---

## 📋 Wat moet er nog gebeuren?

### Als je Google Cloud Storage wilt gebruiken:

#### Stap 1: Bucket Aanmaken in Google Cloud Console
- [ ] Ga naar [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Selecteer project: `gen-lang-client-0141118397`
- [ ] Ga naar **Cloud Storage** > **Buckets**
- [ ] Maak bucket aan: `yannova-media`
- [ ] Configureer als publiek (voor publieke foto's)

#### Stap 2: Foto's Uploaden
- [ ] Zet foto's in: `/Users/innovarslabo/Desktop/foto's`
- [ ] Run upload script: `node scripts/upload-photos-to-gcs.mjs`
- [ ] Controleer `upload-results.json` voor URLs

#### Stap 3: Foto's Importeren in Admin Dashboard
- [ ] Ga naar Admin Dashboard > Media tab
- [ ] Klik op **Importeer GCS** of **Importeer URLs**
- [ ] Voeg GCS URLs toe aan media library

#### Stap 4: Code Aanpassen (optioneel)
- [ ] Vervang lokale `/images/` paths met GCS URLs
- [ ] Update componenten om GCS URLs te gebruiken

---

## 📊 Foto's Overzicht

### Foto's in `public/images/`:

**PNG Bestanden (14):**
- `003a3c82-53d0-4c81-8d96-4ae5ad333f15.png`
- `005d23fa-cfcb-4c94-b456-61095a509cd1.png`
- `0cb768cc-52ef-4b8f-9b32-249c9076ffaa.png`
- `16676485-bd4d-49a4-a5a6-89e07254fa23.png`
- `40a68d97-92af-47fc-99b7-090c694c48d7.png`
- `468e0e4e-64fe-49bf-a2e2-345479f6e558.png`
- `685b5cb6-a070-44b8-b78d-28f5b9ca4860.png`
- `74c53167-5228-4721-8431-57c49690f929.png`
- `9678ebf6-952f-45fd-a507-50b06b6a2a06.png`
- `9c3419f4-1d52-4136-a0fb-fe5df6717942.png`
- `ab28966c-9a91-4f93-bb29-8291a542b636.png`
- `c042e299-3e07-4212-b6a2-5c6297e61d69.png`
- `c67c2ffe-a42b-477f-a67d-10100999c4f0.png`

**JPG Bestanden (9):**
- `crepi-patterns.jpg`
- `crepi-patterns.png`
- `testimonial-joris-vermeiren.jpg`
- `testimonial-lucas-maertens.jpg`
- `testimonial-sofie-janssens.jpg`
- `yannova-team.jpg`
- Plus 7 in `downloads/` subfolder

**Totaal: ~23 foto's**

---

## 🔗 Waar worden foto's gebruikt?

### Componenten die foto's gebruiken:

1. **`src/components/CrepiInfo.tsx`**
   - Gebruikt: `/images/crepi-patterns.png`
   - Fallback: `lovable-uploads` URL

2. **`src/components/WhyUs.tsx`**
   - Gebruikt: `/images/16676485-bd4d-49a4-a5a6-89e07254fa23.png`

3. **`src/constants/index.tsx`**
   - Gebruikt: Meerdere `lovable-uploads` URLs

4. **`src/components/Gevel.tsx`**
   - Gebruikt: Meerdere `lovable-uploads` URLs

5. **Admin Dashboard Media Tab**
   - Toont foto's uit LocalStorage
   - Kan GCS URLs importeren

---

## 💡 Aanbevelingen

### Voor Nu (Kleine Website):
✅ **Blijf lokaal gebruiken** - Foto's in `public/images/` werken prima
- Eenvoudig te beheren
- Geen extra kosten
- Snelle laadtijden

### Voor Later (Schaalbaarheid):
✅ **Migreer naar Google Cloud Storage** wanneer:
- Je meer dan 50 foto's hebt
- Je foto's dynamisch wilt uploaden via Admin Dashboard
- Je betere performance wilt voor internationale bezoekers
- Je CDN wilt gebruiken

---

## 🛠️ Handige Commands

### Foto's Uploaden naar GCS:
```bash
# Zet foto's in deze map:
/Users/innovarslabo/Desktop/foto's

# Run upload script:
node scripts/upload-photos-to-gcs.mjs
```

### Foto's Controleren:
```bash
# Lijst alle foto's in public/images:
ls -la public/images/

# Check upload results (als GCS gebruikt):
cat upload-results.json
```

---

## 📚 Gerelateerde Documentatie

- `docs/GOOGLE_CLOUD_STORAGE_SETUP.md` - GCS setup instructies
- `docs/DATA_STORAGE.md` - Algemeen data opslag overzicht
- `src/lib/mediaStorage.ts` - Media storage implementatie
- `scripts/upload-photos-to-gcs.mjs` - Upload script

---

**Laatste update**: $(date)

