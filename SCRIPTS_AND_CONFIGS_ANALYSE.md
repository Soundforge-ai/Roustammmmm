# Scripts & Configuratie Bestanden Analyse

**Datum**: 25 december 2025  
**Focus**: Alle `.sh` scripts, deployment configs, en verificatie bestanden

---

## 📜 SCRIPTS ANALYSE

### 1. `scripts/add-vercel-domain.sh`
- **Actief gebruikt?**: ❌ **NEE**
- **Door welk proces?**: Geen
- **Status**: Verouderd - verwijst naar verkeerd Vercel account (`onyx-web`)
- **Vervangen door**: `add-vercel-domain-yannova.sh`
- **Actie**: ✅ **VEILIG TE VERWIJDEREN**

### 2. `scripts/add-vercel-domain-yannova.sh`
- **Actief gebruikt?**: ✅ **JA** (handmatig)
- **Door welk proces?**: Handmatige uitvoering voor domein setup
- **Status**: Actueel - verwijst naar correct account (`roustamyandiev9-gmailcoms-projects`)
- **Actie**: ✅ **MOET BLIJVEN**

### 3. `scripts/verify-vercel-domain.sh`
- **Actief gebruikt?**: ✅ **JA** (handmatig)
- **Door welk proces?**: Handmatige verificatie van DNS records
- **Status**: Nuttig voor troubleshooting
- **Actie**: ✅ **MOET BLIJVEN**

### 4. `scripts/diagnose-domain-issue.sh`
- **Actief gebruikt?**: ✅ **JA** (handmatig)
- **Door welk proces?**: Handmatige diagnose van domein problemen
- **Status**: Recent aangemaakt, nuttig voor troubleshooting
- **Actie**: ✅ **MOET BLIJVEN**

### 5. `scripts/update-vercel-verification.sh`
- **Actief gebruikt?**: ❌ **NEE**
- **Door welk proces?**: Geen
- **Status**: Verouderd - bevat hardcoded oude verificatiecode `9UqkK8yxOvyIPig7mXTz8Lpt`
- **Actie**: ✅ **VEILIG TE VERWIJDEREN** (vervangen door v2, maar die is ook verouderd)

### 6. `scripts/update-vercel-verification-v2.sh`
- **Actief gebruikt?**: ❌ **NEE**
- **Door welk proces?**: Geen
- **Status**: Verouderd - bevat hardcoded oude verificatiecode `RwFdQnQR9TzEOvQT5tJxUlRD`
- **Reden**: Tijdelijke scripts voor specifieke verificatie, niet meer nodig
- **Actie**: ✅ **VEILIG TE VERWIJDEREN**

### 7. `scripts/upload-photos-to-gcs.mjs`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: Via `npm run upload-photos` (gedefinieerd in package.json)
- **Status**: Actief script voor foto upload naar Google Cloud Storage
- **Probleem**: ⚠️ Verwijst naar niet-bestaand credentials bestand `client_secret_280989454844-*.json`
- **Actie**: ✅ **MOET BLIJVEN** (maar fix credentials path)

### 8. `scripts/colab_3d_server.ipynb`
- **Actief gebruikt?**: ⚠️ **ONDUIDELIJK**
- **Door welk proces?**: Jupyter notebook voor 3D server
- **Status**: Development/experimenteel
- **Actie**: 🟡 **MOGELIJK TE VERWIJDEREN** (als niet meer gebruikt) of verplaatsen naar `scripts/dev/`

### 9. `scripts/notebooks/yannova_3d.ipynb`
- **Actief gebruikt?**: ⚠️ **ONDUIDELIJK**
- **Door welk proces?**: Jupyter notebook
- **Status**: Development/experimenteel
- **Actie**: 🟡 **MOGELIJK TE VERWIJDEREN** (als niet meer gebruikt) of verplaatsen naar `scripts/dev/`

---

## ⚙️ CONFIGURATIE BESTANDEN ANALYSE

### 1. `vercel.json`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: Vercel deployment (automatisch bij `vercel --prod`)
- **Status**: ✅ **ACTIEF** - huidige deployment platform
- **Configuratie**:
  - Build command: `npm run build`
  - Output: `dist/`
  - Framework: `vite`
  - Rewrites voor SPA routing
  - Headers voor sitemap.xml, robots.txt
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

### 2. `firebase.json`
- **Actief gebruikt?**: ❌ **NEE**
- **Door welk proces?**: Geen
- **Status**: Firebase wordt niet gebruikt
- **Configuratie**: Firebase Hosting config (public: dist, rewrites, headers)
- **Actie**: 🟡 **MOGELIJK TE VERWIJDEREN** (als Firebase niet gebruikt wordt)

### 3. `app.yaml`
- **Actief gebruikt?**: ❌ **NEE**
- **Door welk proces?**: Geen (geen rechten voor Google Cloud)
- **Status**: Google Cloud App Engine config, maar niet actief
- **Configuratie**: App Engine handlers voor statische files en SPA routing
- **Actie**: 🟡 **MOGELIJK TE VERWIJDEREN** (als Google Cloud niet gebruikt wordt) of behouden voor toekomstig gebruik

### 4. `package.json`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: npm scripts, dependency management
- **Scripts**:
  - `dev`: ✅ Actief
  - `build`: ✅ Actief
  - `preview`: ✅ Actief
  - `test`: ✅ Actief
  - `upload-photos`: ✅ Actief (gebruikt `scripts/upload-photos-to-gcs.mjs`)
- **Dependencies**: Alle actief gebruikt
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

### 5. `tsconfig.json`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: TypeScript compiler
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

### 6. `vite.config.ts`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: Vite build tool
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

### 7. `tailwind.config.js`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: Tailwind CSS compiler
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

### 8. `postcss.config.js`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: PostCSS processor
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

### 9. `vitest.config.ts`
- **Actief gebruikt?**: ✅ **JA**
- **Door welk proces?**: Vitest test runner
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

### 10. `client_secret_2_581904069709-4ailt53gith1jk6g4n3j8rtuaorb7gg0.apps.googleusercontent.com(1).json`
- **Actief gebruikt?**: ⚠️ **SECURITY RISK**
- **Door welk proces?**: Mogelijk gebruikt door `upload-photos-to-gcs.mjs` (maar script verwijst naar ander bestand)
- **Status**: ⚠️ **OAuth credentials in repository - SECURITY RISK!**
- **Probleem**: 
  - Staat in `.gitignore` maar zit wel in repository
  - Moet verwijderd worden EN credentials geroteerd
- **Actie**: 🔴 **ONMIDDELLIJK VERWIJDEREN** + roteer credentials

---

## 🔍 SUPABASE CONFIGURATIE

### Supabase Setup
- **Configuratie locatie**: `src/lib/supabase/client.ts`
- **Environment variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **Migrations**: `supabase/migrations/` (6 SQL files)
- **Status**: ✅ **ACTIEF** - gebruikt voor leads, chats, pages, settings
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

---

## 🔍 VERCEL CONFIGURATIE

### Vercel Setup
- **Configuratie**: `vercel.json`
- **API Routes**: `api/auth/google/callback.ts` (actieve OAuth handler)
- **Environment variables**: Via Vercel Dashboard
- **Status**: ✅ **ACTIEF** - primaire deployment platform
- **Actie**: ✅ **MOET BLIJVEN** (kritiek)

---

## 🔍 FIREBASE CONFIGURATIE

### Firebase Setup
- **Configuratie**: `firebase.json`
- **Project ID**: `numeric-zoo-481517-s3` (verouderd)
- **Status**: ❌ **NIET ACTIEF** - Firebase wordt niet gebruikt
- **Actie**: 🟡 **MOGELIJK TE VERWIJDEREN**

---

## 🔍 GOOGLE CLOUD CONFIGURATIE

### Google Cloud Setup
- **Configuratie**: `app.yaml` (App Engine)
- **Project ID**: `gen-lang-client-0141118397` (actueel)
- **Scripts**: `deploy-gcloud.sh`, `upload-photos-to-gcs.mjs`
- **Status**: ⚠️ **NIET ACTIEF** - geen rechten, maar scripts bestaan
- **Actie**: 🟡 **MOGELIJK TE VERWIJDEREN** (of behouden voor toekomstig gebruik)

---

## 📊 SAMENVATTING PER CATEGORIE

### ✅ MOET BLIJVEN (Kritiek)

1. `vercel.json` - Actieve deployment
2. `package.json` - Dependency management
3. `tsconfig.json` - TypeScript config
4. `vite.config.ts` - Build config
5. `tailwind.config.js` - Styling
6. `postcss.config.js` - CSS processing
7. `vitest.config.ts` - Testing
8. `scripts/add-vercel-domain-yannova.sh` - Actueel domain script
9. `scripts/verify-vercel-domain.sh` - Troubleshooting
10. `scripts/diagnose-domain-issue.sh` - Troubleshooting
11. `scripts/upload-photos-to-gcs.mjs` - Actief gebruikt (via npm script)

### 🔴 VEILIG TE VERWIJDEREN

1. `scripts/add-vercel-domain.sh` - Verouderd (verkeerd account)
2. `scripts/update-vercel-verification.sh` - Verouderd (oude code)
3. `scripts/update-vercel-verification-v2.sh` - Verouderd (oude code)
4. `client_secret_*.json` - **SECURITY RISK** (onmiddellijk verwijderen!)

### 🟡 MOGELIJK TE VERWIJDEREN

1. `firebase.json` - Niet gebruikt
2. `app.yaml` - Niet actief (geen rechten)
3. `scripts/colab_3d_server.ipynb` - Development/experimenteel
4. `scripts/notebooks/yannova_3d.ipynb` - Development/experimenteel

---

## 🎯 AANBEVELINGEN

### Prioriteit 1 (Security)

1. **Verwijder onmiddellijk**: `client_secret_*.json` bestanden
2. **Roteer OAuth credentials** in Google Cloud Console
3. **Fix `upload-photos-to-gcs.mjs`**: Update credentials path of gebruik environment variables

### Prioriteit 2 (Cleanup)

1. **Verwijder verouderde Vercel scripts**: 
   - `add-vercel-domain.sh`
   - `update-vercel-verification.sh`
   - `update-vercel-verification-v2.sh`

2. **Beslis over deployment platforms**:
   - Als alleen Vercel gebruikt wordt: verwijder `firebase.json` en `app.yaml`
   - Als backup nodig: verplaats naar `docs/deployment/archive/`

3. **Organiseer development scripts**:
   - Verplaats naar `scripts/dev/`: notebooks

### Prioriteit 3 (Optimalisatie)

1. **Consolideer domain scripts**: 
   - Behouden: `add-vercel-domain-yannova.sh`, `verify-vercel-domain.sh`, `diagnose-domain-issue.sh`
   - Deze kunnen eventueel samengevoegd worden tot één master script

2. **Update `upload-photos-to-gcs.mjs`**:
   - Gebruik environment variables i.p.v. hardcoded credentials path
   - Of gebruik Application Default Credentials

---

## ⚠️ LET OP

- **Verwijder NIET** zonder backup als je niet zeker bent
- **Test** na verwijdering of alles nog werkt
- **Commit** wijzigingen in aparte commits per categorie
- **Documenteer** waarom bestanden verwijderd zijn

---

**Gegenereerd op**: 25 december 2025

