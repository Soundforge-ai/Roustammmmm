#!/bin/bash

# Script om de status van Google Cloud Storage bucket te controleren

PROJECT_ID="gen-lang-client-0141118397"
BUCKET_NAME="yannova-media"

echo "🔍 Google Cloud Storage Bucket Status Check"
echo "============================================"
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
gcloud config set project $PROJECT_ID > /dev/null 2>&1

echo "📋 Status Controle:"
echo "-------------------"

# Controleer Public Access Prevention
echo ""
echo "1️⃣  Public Access Prevention:"
PAP=$(gcloud storage buckets describe gs://$BUCKET_NAME \
    --format="get(iamConfiguration.publicAccessPrevention)" \
    --project=$PROJECT_ID 2>&1)

if [ -z "$PAP" ] || [ "$PAP" = "inherited" ]; then
    echo "   ✅ Status: Inherited (publieke toegang mogelijk)"
elif [ "$PAP" = "enforced" ]; then
    echo "   ❌ Status: Enforced (blokkeert publieke toegang)"
    echo "   ⚠️  Moet worden gewijzigd naar 'Inherited'"
else
    echo "   ⚠️  Status: $PAP"
fi

# Controleer IAM Policies
echo ""
echo "2️⃣  IAM Policies (Publieke Toegang):"
IAM=$(gcloud storage buckets get-iam-policy gs://$BUCKET_NAME \
    --project=$PROJECT_ID 2>&1)

if echo "$IAM" | grep -q "allUsers"; then
    echo "   ✅ Publieke toegang is toegevoegd (allUsers)"
    echo "$IAM" | grep -A 2 "allUsers"
elif echo "$IAM" | grep -q "allAuthenticatedUsers"; then
    echo "   ⚠️  Alleen geauthenticeerde gebruikers (allAuthenticatedUsers)"
    echo "   ⚠️  Voor volledige publieke toegang, gebruik 'allUsers'"
else
    echo "   ❌ Geen publieke toegang gevonden"
    echo "   ⚠️  Moet 'allUsers' met rol 'Storage Object Viewer' toevoegen"
fi

# Test een bestand
echo ""
echo "3️⃣  Test Bestand Toegankelijkheid:"
TEST_URL="https://storage.googleapis.com/$BUCKET_NAME/images/Gemini_Generated_Image_12huit12huit12hu.png"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$TEST_URL" 2>/dev/null)

if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Bestand is publiek toegankelijk (HTTP $HTTP_CODE)"
elif [ "$HTTP_CODE" = "403" ]; then
    echo "   ❌ Bestand is NIET publiek toegankelijk (HTTP $HTTP_CODE)"
    echo "   ⚠️  Bucket moet publiek worden gemaakt"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "   ⚠️  Bestand niet gevonden (HTTP $HTTP_CODE)"
else
    echo "   ⚠️  Onbekende status (HTTP $HTTP_CODE)"
fi

# Samenvatting
echo ""
echo "📊 Samenvatting:"
echo "-----------------"

if [ "$PAP" = "enforced" ]; then
    echo "❌ Public Access Prevention is 'Enforced'"
    echo "   → Moet worden gewijzigd naar 'Inherited'"
    NEEDS_FIX=true
else
    echo "✅ Public Access Prevention is OK"
fi

if ! echo "$IAM" | grep -q "allUsers"; then
    echo "❌ Geen publieke IAM policy gevonden"
    echo "   → Moet 'allUsers' met rol 'Storage Object Viewer' toevoegen"
    NEEDS_FIX=true
else
    echo "✅ Publieke IAM policy is aanwezig"
fi

if [ "$HTTP_CODE" != "200" ]; then
    echo "❌ Bestanden zijn niet publiek toegankelijk"
    NEEDS_FIX=true
else
    echo "✅ Bestanden zijn publiek toegankelijk"
fi

if [ "$NEEDS_FIX" = true ]; then
    echo ""
    echo "🔧 OPLOSSING:"
    echo "============="
    echo ""
    echo "Volg deze stappen in Google Cloud Console:"
    echo ""
    echo "1. Ga naar:"
    echo "   https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID"
    echo ""
    echo "2. Klik op 'Permissions' tab"
    echo ""
    if [ "$PAP" = "enforced" ]; then
        echo "3. Public Access Prevention uitschakelen:"
        echo "   - Klik 'Edit' naast 'Public access prevention'"
        echo "   - Wijzig van 'Enforced' naar 'Inherited'"
        echo "   - Klik 'Save'"
        echo ""
    fi
    if ! echo "$IAM" | grep -q "allUsers"; then
        echo "4. Publieke toegang toevoegen:"
        echo "   - Klik 'GRANT ACCESS'"
        echo "   - Principal: allUsers"
        echo "   - Role: Storage Object Viewer"
        echo "   - Klik 'SAVE'"
        echo ""
    fi
    echo "5. Test opnieuw met:"
    echo "   curl -I $TEST_URL"
    echo ""
else
    echo ""
    echo "✅ Alles is correct geconfigureerd!"
fi

