# Google Cloud Storage Access Probleem - Oplossing

## Probleem
Je krijgt deze foutmelding bij toegang tot Google Cloud Storage:
```
Access denied.
Anonymous caller does not have storage.objects.get access to the Google Cloud Storage object.
```

## Oorzaak
1. Google Cloud Storage credentials ontbreken in `.env.local`
2. De applicatie probeert anoniem toegang te krijgen, wat niet is toegestaan
3. De huidige implementatie is niet correct voor een Vite/React app

## Oplossing 1: Bucket Publiek Maken (Aanbevolen voor Lezen)

Maak de GCS bucket publiek toegankelijk zodat bezoekers bestanden kunnen zien zonder authenticatie.

### Stappen:

1. **Ga naar Google Cloud Console:**
   https://console.cloud.google.com/storage/browser?project=gen-lang-client-0141118397

2. **Selecteer de bucket** `yannova-media` (of maak deze aan)

3. **Ga naar het tabblad "Permissions"**

4. **Klik op "GRANT ACCESS"**

5. **Voeg de volgende toegang toe:**
   - Principal: `allUsers`
   - Role: `Storage Object Viewer` (of `roles/storage.objectViewer`)

6. **Klik op "SAVE"**

7. **Optioneel: Schakel Public Access Prevention uit:**
   - Klik op de bucket naam → "Configuration" tab
   - Zet "Public access prevention" op "Inherited"

### Via command line (als je gcloud CLI hebt):

```bash
# Maak bucket publiek (lezen)
gsutil iam ch allUsers:objectViewer gs://yannova-media

# Schakel public access prevention uit
gcloud storage buckets update gs://yannova-media \
  --public-access-prevention=inherited \
  --project=gen-lang-client-0141118397
```

## Oplossing 2: Service Account Gebruiken (Voor Uploaden)

Als je bestanden wilt uploaden vanuit de applicatie, heb je een service account nodig.

### Stappen:

1. **Maak een Service Account aan:**
   - Ga naar: https://console.cloud.google.com/iam-admin/serviceaccounts?project=gen-lang-client-0141118397
   - Klik "CREATE SERVICE ACCOUNT"
   - Naam: `yannova-app`
   - Klik "CREATE AND CONTINUE"

2. **Geef rechten:**
   - Role: `Storage Object Admin` (of beperk tot wat je nodig hebt)
   - Klik "CONTINUE" en "DONE"

3. **Maak een service account key aan:**
   - Klik op de service account naam
   - Ga naar "Keys" tab
   - Klik "ADD KEY" → "Create new key"
   - Selecteer "JSON"
   - Download de key file

4. **Voeg de key toe aan je project:**
   ```bash
   # Plaats de JSON key file in een veilige locatie
   # Of converteer naar environment variables
   ```

5. **Update `.env.local`:**
   ```bash
   # Voor server-side gebruik (NIET client-side!)
   GOOGLE_APPLICATION_CREDENTIALS=/pad/naar/key.json
   
   # Of gebruik environment variables voor de service account
   GCS_PROJECT_ID=gen-lang-client-0141118397
   GCS_BUCKET_NAME=yannova-media
   GCS_KEY_FILE=/pad/naar/key.json
   ```

⚠️ **BELANGRIJK:** Plaats NOOIT service account credentials in client-side code (VITE_* variabelen) omdat deze zichtbaar zijn in de browser!

## Oplossing 3: Gebruik Backend API (Beste Praktijk)

De beste oplossing is om bestand uploads via een backend API te doen:

1. **Maak een API endpoint** (bijv. Vercel serverless function of Express route)
2. **Laat de frontend bestanden uploaden naar je backend**
3. **De backend uploadt vervolgens naar GCS** met service account credentials

### Voorbeeld Backend API:

```typescript
// api/upload-image.ts (Vercel/Next.js)
import { Storage } from '@google-cloud/storage';

export default async function handler(req, res) {
  const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILE,
  });
  
  const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
  
  // Upload bestand
  const file = bucket.file(req.file.name);
  await file.save(req.file.buffer, { public: true });
  
  res.json({ url: file.publicUrl() });
}
```

## Aanbevolen Configuratie voor Yannova

Voor jouw project raad ik aan:

1. **Voor lezen van afbeeldingen (showroom, etc.):**
   - Maak de bucket `yannova-media` publiek toegankelijk (Oplossing 1)
   - Hierdoor kunnen bezoekers afbeeldingen zien zonder authenticatie

2. **Voor uploaden (admin dashboard, etc.):**
   - Gebruik een backend API endpoint (Oplossing 3)
   - Upload bestanden via de backend naar GCS
   - Zorg dat alleen geauthenticeerde admin users kunnen uploaden

## Controleer Huidige Status

```bash
# Controleer of bucket publiek is
gsutil iam get gs://yannova-media

# Controleer public access prevention
gcloud storage buckets describe gs://yannova-media \
  --format="value(publicAccessPrevention)"
```

## Snelle Fix voor Nu

Als je nu snel wilt testen, maak de bucket publiek:

```bash
# Via Google Cloud Console:
# 1. Ga naar: https://console.cloud.google.com/storage/browser/yannova-media
# 2. Klik "Permissions" tab
# 3. Voeg toe: Principal="allUsers", Role="Storage Object Viewer"
# 4. Klik "SAVE"
```

Dit lost je "Access denied" probleem op voor het lezen van bestanden.