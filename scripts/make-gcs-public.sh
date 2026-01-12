#!/bin/bash

# Script om Google Cloud Storage bucket publiek toegankelijk te maken
# Dit lost de "Access denied" foutmelding op

set -e

PROJECT_ID="gen-lang-client-0141118397"
BUCKET_NAME="yannova-media"

echo "🔓 Google Cloud Storage Bucket Publiek Maken"
echo "=============================================="
echo ""
echo "Project: $PROJECT_ID"
echo "Bucket: $BUCKET_NAME"
echo ""

# Controleer of gcloud CLI is geïnstalleerd
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is niet geïnstalleerd."
    echo "   Installeer via: https://cloud.google.com/sdk/docs/install"
    echo ""
    echo "📋 ALTERNATIEF: Gebruik Google Cloud Console:"
    echo "   1. Ga naar: https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID"
    echo "   2. Klik 'Permissions' tab"
    echo "   3. Klik 'GRANT ACCESS'"
    echo "   4. Principal: allUsers"
    echo "   5. Role: Storage Object Viewer"
    echo "   6. Klik 'SAVE'"
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

# Controleer of bucket bestaat
echo ""
echo "📦 Controleren of bucket bestaat..."
if ! gsutil ls -b gs://$BUCKET_NAME &> /dev/null; then
    echo "❌ Bucket bestaat niet: $BUCKET_NAME"
    echo ""
    echo "📋 Maak eerst de bucket aan:"
    echo "   1. Ga naar: https://console.cloud.google.com/storage/browser?project=$PROJECT_ID"
    echo "   2. Klik 'CREATE BUCKET'"
    echo "   3. Name: $BUCKET_NAME"
    echo "   4. Location: europe-west1 (of andere)"
    echo "   5. Klik 'CREATE'"
    echo "   6. Run dit script opnieuw"
    exit 1
else
    echo "✅ Bucket bestaat: $BUCKET_NAME"
fi

# Schakel Public Access Prevention uit
echo ""
echo "🔓 Public Access Prevention uitschakelen..."
if gcloud storage buckets update gs://$BUCKET_NAME \
    --public-access-prevention=inherited \
    --project=$PROJECT_ID 2>&1 | grep -q "Updated"; then
    echo "✅ Public Access Prevention uitgeschakeld"
else
    echo "⚠️  Public Access Prevention kon niet worden uitgeschakeld (mogelijk al OK)"
fi

# Voeg publieke toegang toe
echo ""
echo "🌐 Publieke toegang toevoegen..."
if gcloud storage buckets add-iam-policy-binding gs://$BUCKET_NAME \
    --member=allUsers \
    --role=roles/storage.objectViewer \
    --project=$PROJECT_ID 2>&1 | grep -q "Updated"; then
    echo "✅ Publieke toegang toegevoegd (allUsers heeft Storage Object Viewer)"
else
    echo "⚠️  Publieke toegang kon niet worden toegevoegd"
    echo "   Mogelijk heeft allUsers al toegang"
fi

# Toon huidige IAM policy
echo ""
echo "📋 Huidige IAM Policy:"
gcloud storage buckets get-iam-policy gs://$BUCKET_NAME \
    --format="flattened(bindings[].members,bindings[].roles)" \
    --project=$PROJECT_ID 2>&1 || true

echo ""
echo "✅ Voltooid!"
echo ""
echo "🌐 De bucket is nu publiek toegankelijk"
echo "   URL: https://storage.googleapis.com/$BUCKET_NAME/"
echo ""
echo "🧪 Test de toegang:"
echo "   curl https://storage.googleapis.com/$BUCKET_NAME/"
echo ""
echo "⚠️  BELANGRIJK:"
echo "   - Iedereen kan nu bestanden in deze bucket LEZEN"
echo "   - Dit is veilig voor publieke afbeeldingen/showroom"
echo "   - Gebruik NIET voor gevoelige data!"