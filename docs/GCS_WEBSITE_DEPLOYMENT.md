# Google Cloud Storage - Website Deployment

## ✅ Ja, Google Cloud Storage kan je website hosten!

Google Cloud Storage kan statische websites hosten. Dit is perfect voor React/Vite apps zoals Yannova.

## 🚀 Quick Start

### Optie 1: Via Deployment Script (Aanbevolen)

```bash
./scripts/deploy-to-gcs.sh
```

Dit script doet automatisch:
1. ✅ Build de applicatie (`npm run build`)
2. ✅ Maakt bucket aan (als deze niet bestaat)
3. ✅ Configureert website hosting
4. ✅ Upload alle bestanden
5. ✅ Maakt bucket publiek

### Optie 2: Handmatig

Zie onderstaande stappen voor handmatige deployment.

---

## 📋 Stap-voor-Stap Deployment

### Stap 1: Build de Applicatie

```bash
npm run build
```

Dit maakt een `dist/` folder met alle statische bestanden.

### Stap 2: Maak Bucket Aan

**Via Google Cloud Console**:
1. Ga naar: https://console.cloud.google.com/storage/browser?project=gen-lang-client-0141118397
2. Klik "CREATE BUCKET"
3. Vul in:
   - **Name**: `yannova-website` (of een andere naam)
   - **Location**: `europe-west1` (Belgium)
   - **Storage class**: `Standard`
   - **Access control**: `Uniform`
4. Klik "CREATE"

**Via gcloud CLI** (als je rechten hebt):
```bash
gcloud storage buckets create gs://yannova-website \
  --project=gen-lang-client-0141118397 \
  --location=europe-west1 \
  --uniform-bucket-level-access
```

### Stap 3: Configureer Website Hosting

**Via Google Cloud Console**:
1. Ga naar je bucket
2. Klik "Edit website configuration"
3. Vul in:
   - **Main page**: `index.html`
   - **404 page**: `index.html` (voor SPA routing)
4. Klik "Save"

**Via gcloud CLI**:
```bash
gsutil web set -m index.html -e index.html gs://yannova-website
```

### Stap 4: Upload Bestanden

**Via gcloud CLI**:
```bash
gsutil -m rsync -r -d dist/ gs://yannova-website/
```

**Via Google Cloud Console**:
1. Ga naar je bucket
2. Klik "UPLOAD FILES"
3. Upload alle bestanden uit de `dist/` folder
4. Zorg dat `index.html` in de root staat

### Stap 5: Maak Bucket Publiek

**Via Google Cloud Console**:
1. Ga naar bucket → "Permissions" tab
2. Klik "GRANT ACCESS"
3. Principal: `allUsers`
4. Role: `Storage Object Viewer`
5. Klik "SAVE"

**Via gcloud CLI**:
```bash
# Eerst: Public Access Prevention uitschakelen
gcloud storage buckets update gs://yannova-website \
  --public-access-prevention=inherited \
  --project=gen-lang-client-0141118397

# Dan: Publieke toegang toevoegen
gcloud storage buckets add-iam-policy-binding gs://yannova-website \
  --member=allUsers \
  --role=roles/storage.objectViewer \
  --project=gen-lang-client-0141118397
```

### Stap 6: Test Website

Je website is nu live op:
```
https://storage.googleapis.com/yannova-website/index.html
```

Of direct:
```
https://storage.googleapis.com/yannova-website/
```

---

## 🌐 Custom Domain Koppelen (yannova.be)

Om je eigen domein te gebruiken, heb je een **Cloud Load Balancer** nodig:

### Stap 1: Maak Load Balancer Aan

1. Ga naar: https://console.cloud.google.com/net-services/load-balancing
2. Klik "CREATE LOAD BALANCER"
3. Kies "HTTP(S) Load Balancing"
4. Configureer:
   - **Backend**: Cloud Storage bucket (`yannova-website`)
   - **Frontend**: IP adres en SSL certificate
   - **Host and path rules**: Route naar bucket

### Stap 2: Configureer DNS

Voeg een A record toe in Cloudflare:
- **Type**: A
- **Name**: `@` (of `www`)
- **Content**: [IP adres van Load Balancer]
- **Proxy**: DNS only (grijze wolk)

### Stap 3: SSL Certificate

Google Cloud kan automatisch SSL certificates aanmaken via Let's Encrypt.

---

## 💰 Kosten Vergelijking

### Google Cloud Storage
- **Storage**: ~$0.02 per GB/maand
- **Bandwidth**: ~$0.12 per GB (eerste 10GB gratis)
- **Load Balancer**: ~$18/maand (vereist voor custom domain)
- **Totaal**: ~$20-30/maand (met custom domain)

### Vercel (Huidige Setup)
- **Hobby Plan**: Gratis (met beperkingen)
- **Pro Plan**: $20/maand
- **Custom Domain**: Inbegrepen
- **SSL**: Automatisch

### Firebase Hosting
- **Spark Plan**: Gratis (met beperkingen)
- **Blaze Plan**: Pay-as-you-go
- **Custom Domain**: Inbegrepen
- **SSL**: Automatisch

---

## ⚖️ Vergelijking: GCS vs Vercel

### Google Cloud Storage Voordelen
- ✅ Volledige controle
- ✅ Goedkoop voor grote hoeveelheden data
- ✅ Geïntegreerd met andere Google Cloud services
- ✅ Geen vendor lock-in

### Google Cloud Storage Nadelen
- ❌ Complexer setup (Load Balancer nodig voor custom domain)
- ❌ Duurder voor kleine sites (Load Balancer ~$18/maand)
- ❌ Geen automatische deployments
- ❌ Geen preview deployments

### Vercel Voordelen
- ✅ Eenvoudige setup
- ✅ Automatische deployments (Git push)
- ✅ Preview deployments
- ✅ Gratis tier beschikbaar
- ✅ Custom domain inbegrepen
- ✅ SSL automatisch

### Vercel Nadelen
- ❌ Vendor lock-in
- ❌ Beperkte controle

---

## 🎯 Aanbeveling

**Voor Yannova website**: Blijf bij **Vercel** omdat:
1. ✅ Je bent al ingesteld en werkt
2. ✅ Gratis tier is voldoende
3. ✅ Automatische deployments
4. ✅ Custom domain werkt al (na verificatie)

**Gebruik Google Cloud Storage voor**:
- ✅ Foto/media opslag (zoals je nu doet)
- ✅ Grote bestanden
- ✅ Backup storage

---

## 🔧 Troubleshooting

### Website toont "404 Not Found"

**Oplossing**: 
- Zorg dat `index.html` in de root van de bucket staat
- Configureer website hosting (Stap 3)

### Website werkt niet met custom domain

**Oplossing**:
- Je hebt een Load Balancer nodig (niet alleen bucket)
- Zie "Custom Domain Koppelen" sectie hierboven

### "Permission denied" bij deployment

**Oplossing**:
- Gebruik Google Cloud Console voor handmatige stappen
- Vraag project administrator om rechten

---

## 📚 Meer Informatie

- **Google Cloud Storage Website Hosting**: https://cloud.google.com/storage/docs/hosting-static-website
- **Load Balancer Setup**: https://cloud.google.com/load-balancing/docs/https
- **Custom Domain**: https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless

---

**Laatste update**: 25 december 2025

