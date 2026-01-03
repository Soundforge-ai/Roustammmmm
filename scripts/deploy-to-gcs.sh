#!/bin/bash

# Script om Yannova website te deployen naar Google Cloud Storage
# Dit maakt de website live op Google Cloud Storage

set -e

PROJECT_ID="gen-lang-client-0141118397"
BUCKET_NAME="yannova-website"  # Aparte bucket voor website (niet media)
REGION="europe-west1"

echo "🚀 Yannova Website Deployment naar Google Cloud Storage"
echo "======================================================"
echo ""
echo "Project: $PROJECT_ID"
echo "Bucket: $BUCKET_NAME"
echo "Regio: $REGION"
echo ""

# Controleer of gcloud CLI is geïnstalleerd
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is niet geïnstalleerd."
    echo "   Installeer via: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Controleer of je bent ingelogd
echo "🔐 Controleren authenticatie..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "⚠️  Je bent niet ingelogd. Log in met:"
    echo "   gcloud auth login"
    exit 1
fi

# Stel project in
echo "📋 Project instellen: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Build de applicatie
echo ""
echo "🔨 Building applicatie..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build mislukt - dist folder niet gevonden"
    exit 1
fi

echo "✅ Build succesvol"
echo ""

# Controleer of bucket bestaat
echo "📦 Bucket controleren..."
if ! gsutil ls -b gs://$BUCKET_NAME &> /dev/null; then
    echo "❌ Bucket bestaat niet: $BUCKET_NAME"
    echo ""
    echo "📋 HANDMATIGE INSTRUCTIES (Bucket Aanmaken):"
    echo "============================================"
    echo ""
    echo "1. Open Google Cloud Console:"
    echo "   https://console.cloud.google.com/storage/browser?project=$PROJECT_ID"
    echo ""
    echo "2. Klik 'CREATE BUCKET' (of 'BUCKET MAKEN')"
    echo ""
    echo "3. Vul in:"
    echo "   - Name: $BUCKET_NAME"
    echo "   - Location type: Region"
    echo "   - Location: $REGION (Belgium)"
    echo "   - Storage class: Standard"
    echo "   - Access control: Uniform"
    echo ""
    echo "4. Klik 'CREATE'"
    echo ""
    echo "5. Na het aanmaken, run dit script opnieuw:"
    echo "   npm run deploy:gcs"
    echo ""
    echo "⚠️  Het script zal dan automatisch verder gaan met uploaden"
    exit 0
else
    echo "✅ Bucket bestaat al: $BUCKET_NAME"
fi

# Configureer bucket voor website hosting
echo ""
echo "⚙️  Website hosting configureren..."
gsutil web set -m index.html -e index.html gs://$BUCKET_NAME 2>&1 || {
    echo "⚠️  Website hosting configuratie mislukt (mogelijk geen rechten)"
    echo "   Dit kan handmatig worden gedaan in Google Cloud Console"
}

# Upload bestanden
echo ""
echo "📤 Bestanden uploaden naar Cloud Storage..."
gsutil -m rsync -r -d dist/ gs://$BUCKET_NAME/ 2>&1 || {
    echo "❌ Upload mislukt"
    echo ""
    echo "📋 HANDMATIGE INSTRUCTIES:"
    echo "=========================="
    echo "1. Ga naar: https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID"
    echo "2. Klik 'UPLOAD FILES'"
    echo "3. Upload alle bestanden uit de dist/ folder"
    exit 1
}

echo ""
echo "✅ Upload voltooid!"
echo ""

# Maak bucket publiek (voor website toegang)
echo "🌐 Bucket publiek maken..."
echo "   (Dit is nodig zodat bezoekers de website kunnen zien)"

# Eerst: Public Access Prevention uitschakelen
if gcloud storage buckets update gs://$BUCKET_NAME \
    --public-access-prevention=inherited \
    --project=$PROJECT_ID 2>&1 | grep -q "Updated"; then
    echo "✅ Public Access Prevention uitgeschakeld"
else
    echo "⚠️  Public Access Prevention kon niet worden uitgeschakeld (mogelijk al OK)"
fi

# Dan: Publieke toegang toevoegen
if gcloud storage buckets add-iam-policy-binding gs://$BUCKET_NAME \
    --member=allUsers \
    --role=roles/storage.objectViewer \
    --project=$PROJECT_ID 2>&1 | grep -q "Updated"; then
    echo "✅ Publieke toegang toegevoegd"
else
    echo "⚠️  Publieke toegang kon niet worden toegevoegd (mogelijk al aanwezig of geen rechten)"
    echo ""
    echo "📋 HANDMATIGE INSTRUCTIES:"
    echo "=========================="
    echo "1. Ga naar: https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID"
    echo "2. Klik 'Permissions' tab"
    echo "3. Klik 'GRANT ACCESS'"
    echo "4. Principal: allUsers"
    echo "5. Role: Storage Object Viewer"
    echo "6. Klik 'SAVE'"
fi

echo ""
echo "✨ Deployment voltooid!"
echo ""
echo "🌐 Je website is nu live op:"
echo "   https://storage.googleapis.com/$BUCKET_NAME/index.html"
echo ""
echo "📝 Om een custom domain (yannova.be) te koppelen:"
echo "   1. Maak een Cloud Load Balancer aan"
echo "   2. Configureer Cloud CDN (optioneel, voor betere performance)"
echo "   3. Koppel je domein via DNS records"
echo ""
echo "💡 Zie docs/GCS_WEBSITE_DEPLOYMENT.md voor volledige instructies"

