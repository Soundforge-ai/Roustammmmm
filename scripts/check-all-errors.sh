#!/bin/bash

# Script om alle potentiële fouten te vinden

echo "🔍 Fouten Check"
echo "=============="
echo ""

ERRORS=0
WARNINGS=0

# 1. Check script syntax
echo "1️⃣  Script Syntax Check"
echo "---------------------"
for script in scripts/*.sh; do
    if [ -f "$script" ]; then
        if bash -n "$script" 2>&1; then
            echo "   ✅ $(basename $script)"
        else
            echo "   ❌ $(basename $script) - Syntax fout!"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done
echo ""

# 2. Check environment variables
echo "2️⃣  Environment Variables Check"
echo "------------------------------"
ENV_FILE=".env.local"
if [ -f "$ENV_FILE" ]; then
    REQUIRED_VARS=("VITE_SUPABASE_URL" "VITE_SUPABASE_ANON_KEY" "VITE_GLM_API_KEY")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" "$ENV_FILE"; then
            echo "   ✅ $var"
        else
            echo "   ❌ $var - ONTBREEKT"
            ERRORS=$((ERRORS + 1))
        fi
    done
else
    echo "   ⚠️  .env.local niet gevonden"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 3. Check Vercel CLI
echo "3️⃣  Vercel CLI Check"
echo "-------------------"
if command -v vercel &> /dev/null; then
    if vercel whoami >/dev/null 2>&1; then
        echo "   ✅ Vercel CLI geïnstalleerd en ingelogd"
    else
        echo "   ⚠️  Vercel CLI geïnstalleerd maar niet ingelogd"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo "   ❌ Vercel CLI niet geïnstalleerd"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Check TypeScript/JavaScript errors
echo "4️⃣  TypeScript Check"
echo "-------------------"
if command -v npm &> /dev/null; then
    if npm run build >/dev/null 2>&1; then
        echo "   ✅ Build succesvol (geen TypeScript errors)"
    else
        echo "   ⚠️  Build heeft mogelijk errors (check handmatig)"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo "   ⚠️  npm niet gevonden, kan build niet checken"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 5. Check voor hardcoded credentials
echo "5️⃣  Security Check (hardcoded credentials)"
echo "------------------------------------------"
if grep -r "api.*key.*=.*['\"][a-zA-Z0-9]\{20,\}" src/ 2>/dev/null | grep -v "env\|process.env\|import.meta.env" | head -5; then
    echo "   ⚠️  Mogelijk hardcoded API keys gevonden"
    WARNINGS=$((WARNINGS + 1))
else
    echo "   ✅ Geen hardcoded credentials gevonden"
fi
echo ""

# Samenvatting
echo "===================================="
echo "📊 Samenvatting"
echo "===================================="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ Geen fouten gevonden!"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  $WARNINGS waarschuwing(en) gevonden"
    exit 0
else
    echo "❌ $ERRORS fout(en) gevonden"
    if [ $WARNINGS -gt 0 ]; then
        echo "⚠️  $WARNINGS waarschuwing(en) gevonden"
    fi
    exit 1
fi


