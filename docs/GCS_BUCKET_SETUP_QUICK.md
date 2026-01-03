# Google Cloud Storage Bucket Setup - Quick Guide

## ✅ Status

- ✅ Authenticatie werkt (`gcloud auth application-default login` succesvol)
- ❌ Bucket `yannova-media` bestaat nog niet
- ⚠️ Geen rechten om bucket automatisch aan te maken

## 🚀 Snelle Oplossing

### Optie 1: Via Google Cloud Console (Aanbevolen)

1. **Open Google Cloud Console**:
   ```
   https://console.cloud.google.com/storage/browser?project=gen-lang-client-0141118397
   ```

2. **Klik "CREATE BUCKET"**

3. **Vul in**:
   - **Name**: `yannova-media`
   - **Location type**: `Region`
   - **Location**: `europe-west1` (Belgium)
   - **Storage class**: `Standard`
   - **Access control**: `Uniform`

4. **Klik "CREATE"**

5. **(Optioneel) Maak publiek** (voor publieke foto's):
   - Klik op bucket naam `yannova-media`
   - Tab "Permissions"
   - Klik "GRANT ACCESS"
   - Principal: `allUsers`
   - Role: `Storage Object Viewer`
   - Klik "SAVE"

6. **Test upload**:
   ```bash
   npm run upload-photos
   ```

### Optie 2: Via Helper Script

```bash
./scripts/create-gcs-bucket.sh
```

Dit script probeert de bucket aan te maken, en geeft handmatige instructies als je geen rechten hebt.

## 📋 Wat is er al gedaan?

- ✅ `gcloud auth application-default login` - Authenticatie werkt
- ✅ Upload script gebruikt nu Application Default Credentials
- ✅ Geen hardcoded credentials meer

## ⚠️ Waarschuwing over Quota Project

Je ziet mogelijk deze waarschuwing:
```
WARNING: Cannot add the project "gen-lang-client-0141118397" to ADC as the quota project
```

Dit is **niet kritiek** - het betekent alleen dat je mogelijk quota errors krijgt als je veel API calls maakt. Om dit op te lossen:

```bash
gcloud auth application-default set-quota-project gen-lang-client-0141118397
```

Maar dit vereist ook rechten. Als je geen problemen hebt, kun je dit negeren.

## ✅ Na Bucket Aanmaken

Zodra de bucket bestaat, werkt het upload script automatisch:

```bash
npm run upload-photos
```

Het script zal:
- ✅ Foto's uit `public/images/` uploaden
- ✅ Foto's uit `Desktop/foto's` uploaden (als deze map bestaat)
- ✅ Publieke URLs genereren
- ✅ Resultaten opslaan in `upload-results.json`

---

**Laatste update**: 25 december 2025

