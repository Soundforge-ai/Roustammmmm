# Deployment Status - Google Cloud Storage

## ✅ Huidige Status

- ✅ **Build**: Succesvol voltooid
- ❌ **Bucket**: `yannova-website` bestaat nog niet
- ⏳ **Wachten op**: Handmatige bucket aanmaak

## 🚀 Volgende Stap: Maak Bucket Aan

### Via Google Cloud Console (1 minuut)

1. **Open deze link**:
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

5. **Run deployment opnieuw**:
   ```bash
   npm run deploy:gcs
   ```

## 📋 Wat Het Script Dan Doet

Na het aanmaken van de bucket, zal het script automatisch:

1. ✅ Bucket vinden
2. ✅ Website hosting configureren (`index.html` als main page)
3. ✅ Alle bestanden uploaden uit `dist/` folder
4. ✅ Public Access Prevention uitschakelen
5. ✅ Publieke toegang toevoegen (allUsers → Storage Object Viewer)

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

**Aanbeveling**: Blijf bij **Vercel** voor de website (gratis, eenvoudig, custom domain werkt).

---

**Laatste update**: 25 december 2025

