#!/bin/bash

# Script om environment variables toe te voegen aan Vercel

set -e

echo "🔧 Vercel Environment Variables Setup"
echo "====================================="
echo ""

# Check of .env.local bestaat
ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  .env.local niet gevonden"
    echo "   Maak eerst .env.local aan met de benodigde variabelen"
    exit 1
fi

echo "📋 Benodigde Environment Variables:"
echo "-----------------------------------"
echo ""

# Lijst van benodigde variabelen
REQUIRED_VARS=(
    "VITE_SUPABASE_URL"
    "VITE_SUPABASE_ANON_KEY"
    "VITE_GLM_API_KEY"
)

OPTIONAL_VARS=(
    "VITE_JULES_API_KEY"
    "VITE_GEMINI_API_KEY"
    "GEMINI_API_KEY"
)

# Check welke variabelen in .env.local staan
echo "✅ Verplichte variabelen:"
for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "^${var}=" "$ENV_FILE"; then
        VALUE=$(grep "^${var}=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
        PREVIEW="${VALUE:0:20}..."
        echo "   ✓ $var = $PREVIEW"
    else
        echo "   ❌ $var = NIET GEVONDEN"
    fi
done

echo ""
echo "📝 Optionele variabelen:"
for var in "${OPTIONAL_VARS[@]}"; do
    if grep -q "^${var}=" "$ENV_FILE"; then
        VALUE=$(grep "^${var}=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
        PREVIEW="${VALUE:0:20}..."
        echo "   ✓ $var = $PREVIEW"
    else
        echo "   ⚠️  $var = niet geconfigureerd (optioneel)"
    fi
done

echo ""
echo "===================================="
echo "📝 Toevoegen aan Vercel"
echo "===================================="
echo ""
echo "Je kunt environment variables toevoegen via:"
echo ""
echo "1️⃣  Via Vercel Dashboard (aanbevolen):"
echo "   https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/environment-variables"
echo ""
echo "2️⃣  Via Vercel CLI (automatisch):"
echo ""

# Vraag of gebruiker automatisch wil toevoegen
read -p "Wil je de variabelen automatisch toevoegen via CLI? (j/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[JjYy]$ ]]; then
    echo ""
    echo "🚀 Variabelen toevoegen via CLI..."
    echo ""
    
    # Loop door alle variabelen
    ALL_VARS=("${REQUIRED_VARS[@]}" "${OPTIONAL_VARS[@]}")
    
    for var in "${ALL_VARS[@]}"; do
        if grep -q "^${var}=" "$ENV_FILE"; then
            VALUE=$(grep "^${var}=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
            
            echo "➕ Toevoegen: $var"
            # Gebruik echo met pipe in plaats van process substitution voor betere compatibiliteit
            OUTPUT=$(echo "$VALUE" | vercel env add "$var" production 2>&1)
            if echo "$OUTPUT" | grep -q "Added\|already exists\|Environment Variable"; then
                echo "   ✅ $var toegevoegd"
            else
                echo "   ⚠️  $var kon niet worden toegevoegd"
                echo "      Output: $(echo "$OUTPUT" | head -2)"
            fi
        fi
    done
    
    echo ""
    echo "✅ Klaar! Redeploy de website:"
    echo "   ./scripts/redeploy.sh"
else
    echo ""
    echo "📋 Handmatige instructies:"
    echo ""
    echo "1. Ga naar: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/environment-variables"
    echo ""
    echo "2. Klik op 'Add New' voor elke variabele"
    echo ""
    echo "3. Voeg toe:"
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" "$ENV_FILE"; then
            VALUE=$(grep "^${var}=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
            PREVIEW="${VALUE:0:30}..."
            echo "   - Key: $var"
            echo "     Value: $PREVIEW"
            echo "     Environment: Production (en Preview als je wilt)"
            echo ""
        fi
    done
    
    echo "4. Klik op 'Save'"
    echo ""
    echo "5. Redeploy: ./scripts/redeploy.sh"
fi

echo ""
echo "✨ Klaar!"

