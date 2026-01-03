#!/bin/bash

# Script om Google Cloud Storage bucket aan te maken
# Let op: Vereist storage.buckets.create rechten

PROJECT_ID="gen-lang-client-0141118397"
BUCKET_NAME="yannova-media"
REGION="europe-west1"

echo "📦 Google Cloud Storage Bucket Aanmaken"
echo "========================================"
echo ""
echo "Bucket naam: $BUCKET_NAME"
echo "Project: $PROJECT_ID"
echo "Regio: $REGION"
echo ""

# Controleer of gcloud CLI is geïnstalleerd
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is niet geïnstalleerd."
    echo "   Installeer via: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Controleer of je bent ingelogd
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "⚠️  Je bent niet ingelogd. Log in met:"
    echo "   gcloud auth login"
    exit 1
fi

# Stel project in
echo "📋 Project instellen: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Probeer bucket aan te maken
echo ""
echo "🔨 Bucket aanmaken..."
if gcloud storage buckets create gs://$BUCKET_NAME \
    --project=$PROJECT_ID \
    --location=$REGION \
    --uniform-bucket-level-access 2>&1; then
    echo ""
    echo "✅ Bucket succesvol aangemaakt: gs://$BUCKET_NAME"
    echo ""
    echo "📝 Volgende stappen:"
    echo "   1. Maak bucket publiek (optioneel, voor publieke foto's):"
    echo "      gcloud storage buckets add-iam-policy-binding gs://$BUCKET_NAME \\"
    echo "        --member=allUsers --role=roles/storage.objectViewer"
    echo ""
    echo "   2. Test upload script:"
    echo "      npm run upload-photos"
else
    echo ""
    echo "❌ Bucket aanmaken mislukt (geen rechten)"
    echo ""
    echo "📋 HANDMATIGE INSTRUCTIES:"
    echo "=========================="
    echo ""
    echo "1. Ga naar Google Cloud Console:"
    echo "   https://console.cloud.google.com/storage/browser?project=$PROJECT_ID"
    echo ""
    echo "2. Klik op 'CREATE BUCKET' (of 'BUCKET MAKEN')"
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
    echo "5. (Optioneel) Maak bucket publiek voor publieke foto's:"
    echo "   - Klik op de bucket naam"
    echo "   - Ga naar 'Permissions' tab"
    echo "   - Klik 'GRANT ACCESS'"
    echo "   - Principal: allUsers"
    echo "   - Role: Storage Object Viewer"
    echo "   - Klik 'SAVE'"
    echo ""
    echo "6. Test upload script:"
    echo "   npm run upload-photos"
    echo ""
fi

