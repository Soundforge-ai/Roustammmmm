#!/bin/bash

# Script om Google Cloud Storage bucket publiek te maken
# Vereist: storage.buckets.update en storage.buckets.setIamPolicy rechten

PROJECT_ID="gen-lang-client-0141118397"
BUCKET_NAME="yannova-media"

echo "🌐 Google Cloud Storage Bucket Publiek Maken"
echo "============================================="
echo ""
echo "Bucket: gs://$BUCKET_NAME"
echo "Project: $PROJECT_ID"
echo ""

# Controleer of gcloud CLI is geïnstalleerd
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is niet geïnstalleerd."
    exit 1
fi

# Stel project in
gcloud config set project $PROJECT_ID

echo "📋 Stap 1: Public Access Prevention uitschakelen..."
echo "---------------------------------------------------"

if gcloud storage buckets update gs://$BUCKET_NAME \
    --public-access-prevention=inherited 2>&1; then
    echo "✅ Public Access Prevention uitgeschakeld"
else
    echo "❌ Kon Public Access Prevention niet uitschakelen"
    echo ""
    echo "📋 HANDMATIGE INSTRUCTIES:"
    echo "=========================="
    echo "1. Ga naar: https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID"
    echo "2. Klik op 'Permissions' tab"
    echo "3. Klik op 'Edit' naast 'Public access prevention'"
    echo "4. Selecteer 'Enforced' → 'Inherited'"
    echo "5. Klik 'Save'"
    echo ""
    exit 1
fi

echo ""
echo "📋 Stap 2: Publieke toegang toevoegen..."
echo "----------------------------------------"

if gcloud storage buckets add-iam-policy-binding gs://$BUCKET_NAME \
    --member=allUsers \
    --role=roles/storage.objectViewer 2>&1; then
    echo "✅ Publieke toegang toegevoegd"
    echo ""
    echo "✅ Bucket is nu publiek toegankelijk!"
    echo ""
    echo "🔗 Test een URL:"
    echo "   https://storage.googleapis.com/$BUCKET_NAME/images/[bestandsnaam]"
else
    echo "❌ Kon publieke toegang niet toevoegen"
    echo ""
    echo "📋 HANDMATIGE INSTRUCTIES:"
    echo "=========================="
    echo "1. Ga naar: https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID"
    echo "2. Klik op 'Permissions' tab"
    echo "3. Klik op 'GRANT ACCESS'"
    echo "4. Voeg toe:"
    echo "   - Principal: allUsers"
    echo "   - Role: Storage Object Viewer"
    echo "5. Klik 'SAVE'"
    echo ""
    exit 1
fi

echo ""
echo "✨ Klaar! Alle bestanden in de bucket zijn nu publiek toegankelijk."

