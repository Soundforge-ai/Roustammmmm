# Repository Analyse - Yannova

**Datum**: 25 december 2025  
**Doel**: Identificeren van onnodige, verouderde of dubbele bestanden

---

## 🔴 VEILIG TE VERWIJDEREN

### 1. Build Output & Generated Files
- **`dist/`** folder (hele directory)
  - **Reden**: Build output, staat al in `.gitignore`, wordt automatisch gegenereerd bij `npm run build`
  - **Impact**: Geen - wordt opnieuw gegenereerd bij build

### 2. Oude/Tijdelijke Vercel Verificatie Scripts
- **`scripts/update-vercel-verification.sh`**
  - **Reden**: Bevat hardcoded oude verificatiecode `9UqkK8yxOvyIPig7mXTz8Lpt` die niet meer geldig is
  - **Impact**: Geen - vervangen door v2 versie
  
- **`scripts/update-vercel-verification-v2.sh`**
  - **Reden**: Bevat hardcoded oude verificatiecode `RwFdQnQR9TzEOvQT5tJxUlRD` die niet meer geldig is
  - **Impact**: Geen - tijdelijke scripts voor specifieke verificatie, niet meer nodig

- **`scripts/add-vercel-domain.sh`**
  - **Reden**: Verwijst naar verouderd Vercel account (`onyx-web`), vervangen door `add-vercel-domain-yannova.sh`
  - **Impact**: Geen - nieuwere versie bestaat al

### 3. Security Risk - OAuth Credentials
- **`client_secret_2_581904069709-4ailt53gith1jk6g4n3j8rtuaorb7gg0.apps.googleusercontent.com(1).json`**
  - **Reden**: OAuth credentials mogen NIET in repository staan (security risk)
  - **Impact**: **KRITIEK** - moet verwijderd worden, credentials moeten via environment variables
  - **Actie**: Verwijder bestand EN roteer de client secret in Google Cloud Console

### 4. Lege/Ongebruikte Bestanden
- **`index.css`** (root level)
  - **Reden**: Leeg bestand, styling gebeurt via `src/index.css` en Tailwind
  - **Impact**: Geen

- **`metadata.json`**
  - **Reden**: Bevat alleen basis metadata, niet gebruikt in codebase
  - **Impact**: Mogelijk gebruikt door externe tools, check eerst

### 5. Verouderde Documentatie
- **`docs/JAVA_GENAI_SETUP.md`**
  - **Reden**: Verwijst naar `java-genai/` folder die al verwijderd is
  - **Impact**: Geen - Java project bestaat niet meer

- **`docs/GOOGLE_CLOUD_SETUP.md`**
  - **Reden**: Verwijst naar verouderd project `numeric-zoo-481517-s3`, nieuwe project is `gen-lang-client-0141118397`
  - **Impact**: Verwarring - update of verwijder

### 6. Dubbele Documentatie
- **`docs/VERCEL_DOMAIN_VERIFICATION.md`** en **`docs/VERCEL_VERIFICATION_STAP_VOOR_STAP.md`**
  - **Reden**: Beide behandelen hetzelfde onderwerp (Vercel verificatie)
  - **Impact**: Verwarring - consolideer tot één document

- **`docs/DOMAIN_SETUP_GUIDE.md`** en **`docs/FIX_MULTIPLE_VERCEL_RECORDS.md`**
  - **Reden**: Overlappend materiaal over domein setup
  - **Impact**: Consolideer tot één complete gids

---

## 🟡 MOGELIJK TE VERWIJDEREN (met uitleg)

### 1. Deployment Configuraties (Kies één primaire)

**Huidige situatie**: 3 deployment configuraties
- `vercel.json` - ✅ **ACTIEF** (huidige deployment)
- `firebase.json` - ⚠️ **NIET ACTIEF** (Firebase wordt niet gebruikt)
- `app.yaml` - ⚠️ **NIET ACTIEF** (Google Cloud App Engine, geen rechten)

**Aanbeveling**:
- **Behoud**: `vercel.json` (actief gebruikt)
- **Overweeg te verwijderen**: `firebase.json` en `app.yaml` als je zeker weet dat je ze niet gaat gebruiken
- **Of**: Bewaar als backup/reference in `docs/deployment/` folder

### 2. Deployment Scripts

**Huidige situatie**: 3 deployment scripts
- `scripts/deploy-firebase.sh` - ⚠️ Niet gebruikt (Firebase niet actief)
- `scripts/deploy-gcloud.sh` - ⚠️ Niet gebruikt (geen rechten)
- Vercel deployment gebeurt via `vercel --prod` CLI

**Aanbeveling**:
- **Behoud**: `scripts/deploy-gcloud.sh` (mogelijk toekomstig gebruik)
- **Overweeg te verwijderen**: `scripts/deploy-firebase.sh` als Firebase niet gebruikt wordt

### 3. Google Cloud Documentatie

**Huidige situatie**: Veel Google Cloud docs, maar Google Cloud wordt niet actief gebruikt
- `docs/GOOGLE_CLOUD_DEPLOYMENT.md` - Uitgebreide deployment gids
- `docs/GOOGLE_CLOUD_SETUP.md` - Setup gids (verouderd project ID)
- `docs/google/GCS_BUCKET_SETUP.md`
- `docs/google/GOOGLE_CLOUD_CONSOLE_STAPPEN.md`
- `docs/google/GOOGLE_CLOUD_STORAGE_SETUP.md`
- `docs/google/GOOGLE_OAUTH_SETUP.md`
- `docs/google/GOOGLE_TODO_CHECKLIST.md`
- `docs/google/README_GCS.md`

**Aanbeveling**:
- **Consolideer**: Alle Google Cloud docs in één folder
- **Update**: Verouderde project IDs
- **Of verwijder**: Als Google Cloud niet gebruikt wordt

### 4. Scripts - Mogelijk Ongebruikt

- **`scripts/colab_3d_server.ipynb`**
  - **Reden**: Jupyter notebook, mogelijk alleen voor development/testing
  - **Check**: Wordt dit nog gebruikt voor 3D model generatie?
  - **Impact**: Mogelijk nog nodig voor 3D functionaliteit

- **`scripts/generate-3d-model.ts`**
  - **Reden**: TypeScript script voor 3D model generatie
  - **Check**: Wordt dit gebruikt of alleen development?
  - **Impact**: Mogelijk nog nodig

- **`scripts/generate_image_gemini.py`**
  - **Reden**: Python script voor image generatie
  - **Check**: Wordt dit gebruikt of alleen development?
  - **Impact**: Mogelijk nog nodig

- **`scripts/download_images.sh`**
  - **Reden**: Script om images te downloaden
  - **Check**: Wordt dit nog gebruikt?
  - **Impact**: Mogelijk nog nodig voor maintenance

- **`scripts/notebooks/yannova_3d.ipynb`**
  - **Reden**: Jupyter notebook
  - **Check**: Wordt dit nog gebruikt?
  - **Impact**: Mogelijk nog nodig

### 5. Documentatie - Mogelijk Verouderd

- **`docs/migration/MIGRATION_STATUS.md`**
  - **Reden**: Status document, mogelijk verouderd
  - **Check**: Is migratie voltooid? Zo ja, archiveer of verwijder
  - **Impact**: Mogelijk nog referentie waarde

- **`docs/migration/MIGRATION_GUIDE.md`**
  - **Reden**: Migratie gids
  - **Check**: Is migratie voltooid? Zo ja, archiveer
  - **Impact**: Mogelijk nog referentie waarde

- **`docs/jules/`** folder (5 bestanden)
  - **Reden**: Jules AI assistant documentatie
  - **Check**: Wordt Jules nog gebruikt?
  - **Impact**: Als Jules actief gebruikt wordt, behouden

---

## ✅ MOET BLIJVEN (met reden)

### Core Application Files
- **`src/`** - Volledige source code
- **`public/`** - Statische assets (images, models, videos, documents)
- **`package.json`** - Dependencies en scripts
- **`vite.config.ts`** - Build configuratie
- **`tsconfig.json`** - TypeScript configuratie
- **`tailwind.config.js`** - Tailwind CSS configuratie
- **`postcss.config.js`** - PostCSS configuratie
- **`vitest.config.ts`** - Test configuratie
- **`index.html`** - Entry point HTML

### Actieve Configuraties
- **`vercel.json`** - ✅ Actieve deployment configuratie
- **`.gitignore`** - Git ignore regels
- **`README.md`** - Project documentatie

### Database & API
- **`supabase/migrations/`** - Database migraties (6 SQL files)
- **`api/auth/google/callback.ts`** - ✅ Actieve OAuth callback handler
- **`schemas/`** - TypeScript schemas

### Actieve Scripts
- **`scripts/upload-photos-to-gcs.mjs`** - ✅ Gebruikt in package.json (`upload-photos`)
- **`scripts/diagnose-domain-issue.sh`** - ✅ Nuttig voor troubleshooting
- **`scripts/add-vercel-domain-yannova.sh`** - ✅ Actuele Vercel domain script
- **`scripts/verify-vercel-domain.sh`** - ✅ Nuttig voor verificatie

### Essentiële Documentatie
- **`docs/AGENTS.md`** - Agent documentatie
- **`docs/DATA_STORAGE.md`** - Data storage uitleg
- **`docs/SEO_GUIDE.md`** - SEO documentatie
- **`docs/setup/PUCK_SETUP.md`** - Puck editor setup
- **`docs/setup/SUPABASE_SETUP.md`** - Supabase setup
- **`docs/FOTO_OPSLAG_OVERZICHT.md`** - Foto opslag uitleg

---

## 📊 Samenvatting

### Totaal te verwijderen: ~15-20 bestanden/mappen
- **Security Risk**: 1 bestand (client_secret JSON)
- **Build Output**: 1 map (dist/)
- **Verouderde Scripts**: 3-4 scripts
- **Dubbele/Verouderde Docs**: 5-7 documenten
- **Lege/Ongebruikte**: 2-3 bestanden

### Mogelijk te verwijderen: ~10-15 bestanden
- **Niet-actieve Deployment Configs**: 2 bestanden
- **Niet-actieve Scripts**: 1-2 scripts
- **Verouderde Docs**: 5-8 documenten

### Moet blijven: ~50+ bestanden
- Alle source code
- Actieve configuraties
- Essentiële documentatie
- Database migraties

---

## 🎯 Aanbevelingen

### Prioriteit 1 (Security & Cleanup)
1. **Verwijder onmiddellijk**: `client_secret_*.json` bestanden
2. **Roteer OAuth credentials** in Google Cloud Console
3. **Verwijder `dist/`** folder (staat al in .gitignore maar zit in repo)

### Prioriteit 2 (Consolidatie)
1. **Consolideer Vercel verificatie docs** tot 1 document
2. **Consolideer domein setup docs** tot 1 document
3. **Update verouderde project IDs** in Google Cloud docs

### Prioriteit 3 (Optimalisatie)
1. **Beslis over Firebase/Google Cloud**: Verwijder of archiveer als niet gebruikt
2. **Archiveer migratie docs** als migratie voltooid is
3. **Organiseer scripts**: Verplaats development-only scripts naar `scripts/dev/`

---

## ⚠️ Let Op

- **Verwijder NIET** zonder backup als je niet zeker bent
- **Test** na verwijdering of alles nog werkt
- **Commit** wijzigingen in aparte commits per categorie
- **Documenteer** waarom bestanden verwijderd zijn

---

**Gegenereerd op**: 25 december 2025  
**Analyse uitgevoerd door**: AI Assistant

