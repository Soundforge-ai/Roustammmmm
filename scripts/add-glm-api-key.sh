#!/bin/bash

# Script om VITE_GLM_API_KEY toe te voegen

echo "🔑 GLM API Key Toevoegen"
echo "========================"
echo ""

ENV_FILE=".env.local"

# Check of .env.local bestaat
if [ ! -f "$ENV_FILE" ]; then
    echo "📄 .env.local bestaat niet, wordt aangemaakt..."
    touch "$ENV_FILE"
fi

# Check of VITE_GLM_API_KEY al bestaat
if grep -q "^VITE_GLM_API_KEY=" "$ENV_FILE"; then
    echo "⚠️  VITE_GLM_API_KEY bestaat al in .env.local"
    echo ""
    read -p "Wil je deze overschrijven? (j/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[JjYy]$ ]]; then
        echo "❌ Geannuleerd"
        exit 0
    fi
    # Verwijder oude regel
    sed -i.bak '/^VITE_GLM_API_KEY=/d' "$ENV_FILE"
fi

echo ""
echo "📝 Voer je GLM API Key in (van naga.ac):"
echo "   (De key wordt niet getoond tijdens typen)"
read -s GLM_KEY

if [ -z "$GLM_KEY" ]; then
    echo "❌ Geen key ingevoerd"
    exit 1
fi

# Voeg toe aan .env.local
echo "" >> "$ENV_FILE"
echo "# GLM API Key (Naga.ac)" >> "$ENV_FILE"
echo "VITE_GLM_API_KEY=$GLM_KEY" >> "$ENV_FILE"

echo ""
echo "✅ VITE_GLM_API_KEY toegevoegd aan .env.local"
echo ""

# Vraag of het ook naar Vercel moet
read -p "Wil je deze ook direct toevoegen aan Vercel? (j/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[JjYy]$ ]]; then
    echo ""
    echo "🚀 Toevoegen aan Vercel..."
    OUTPUT=$(echo "$GLM_KEY" | vercel env add VITE_GLM_API_KEY production 2>&1)
    if echo "$OUTPUT" | grep -q "Added\|already exists\|Environment Variable"; then
        echo "✅ VITE_GLM_API_KEY toegevoegd aan Vercel"
    else
        echo "⚠️  Kon niet automatisch toevoegen. Output:"
        echo "$OUTPUT" | grep -v "Enter" | head -3
        echo ""
        echo "Voeg handmatig toe via het dashboard (zie instructies hieronder)"
    fi
    echo ""
    echo "🔄 Redeploy nodig om de wijzigingen actief te maken:"
    echo "   ./scripts/redeploy.sh"
else
    echo ""
    echo "📝 Om handmatig toe te voegen aan Vercel:"
    echo "   1. Ga naar: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/environment-variables"
    echo "   2. Klik 'Add New'"
    echo "   3. Key: VITE_GLM_API_KEY"
    echo "   4. Value: [je API key]"
    echo "   5. Environment: Production"
    echo "   6. Save"
    echo ""
    echo "   Daarna: ./scripts/redeploy.sh"
fi

echo ""
echo "✨ Klaar!"

