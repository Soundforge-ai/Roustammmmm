# Google Cloud Storage Deployment - Quick Start

## ✅ Build Succesvol!

Je build is succesvol voltooid. Nu moet je alleen de bucket handmatig aanmaken (1 minuut werk).

## 🚀 Stap 1: Maak Bucket Aan

1. **Open Google Cloud Console**:
   ```
   https://console.cloud.google.com/storage/browser?project=gen-lang-client-0141118397
   ```

2. **Klik "CREATE BUCKET"** (of "BUCKET MAKEN")

3. **Vul in**:
   - **Name**: `yannova-website`
   - **Location type**: `Region`
   - **Location**: `europe-west1` (Belgium)
   - **Storage class**: `Standard`
   - **Access control**: `Uniform`

4. **Klik "CREATE"**

## 🚀 Stap 2: Run Deployment Opnieuw

Na het aanmaken van de bucket, run het deployment script opnieuw:

```bash
npm run deploy:gcs
```

Het script zal nu automatisch:
- ✅ Bucket vinden
- ✅ Website hosting configureren
- ✅ Bestanden uploaden
- ✅ Bucket publiek maken

## 🌐 Resultaat

Na deployment is je website live op:
```
https://storage.googleapis.com/yannova-website/
```

## ⚠️ Belangrijk: Custom Domain

Voor `yannova.be` heb je een **Cloud Load Balancer** nodig (~$18/maand).

**Zonder Load Balancer**:
- Website werkt alleen via: `https://storage.googleapis.com/yannova-website/`
- Geen custom domain mogelijk

**Met Load Balancer**:
- Custom domain mogelijk
- SSL certificaat automatisch
- Cloud CDN voor betere performance

Zie `docs/GCS_WEBSITE_DEPLOYMENT.md` voor Load Balancer setup.

## 💡 Aanbeveling

**Voor nu**: Blijf bij **Vercel** voor de website (gratis, eenvoudig, custom domain werkt).

**Gebruik Google Cloud Storage voor**:
- ✅ Foto/media opslag (zoals je nu doet met `yannova-media`)
- ✅ Backup storage
- ✅ Grote bestanden

---

**Laatste update**: 25 december 2025

