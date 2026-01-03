#!/bin/bash
# Supabase Migraties Uitvoeren via CLI

set -e

echo "🚀 Supabase Migraties Uitvoeren via CLI"
echo ""

# Project gegevens
PROJECT_REF="fwfkrbfozjlxmpfmagrt"
ACCESS_TOKEN="1kiSpjdye7H84tYvKpL3juQ5grx7lhG0RKiadx9zRxAR+4G21/JbrsguYPKqySEF7xG/vXeogZplwyjEVFjWpA=="
DB_PASSWORD="Privet007.@.@."

# Export access token
export SUPABASE_ACCESS_TOKEN="$ACCESS_TOKEN"

echo "📦 Project: $PROJECT_REF"
echo "🔗 Dashboard: https://supabase.com/dashboard/project/$PROJECT_REF"
echo ""

# Check of Supabase CLI is geïnstalleerd
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI niet gevonden. Installeer met:"
    echo "   brew install supabase/tap/supabase"
    exit 1
fi

echo "✅ Supabase CLI gevonden: $(supabase --version)"
echo ""

# Link project
echo "🔗 Project linken..."
if supabase link --project-ref "$PROJECT_REF" 2>&1; then
    echo "✅ Project gelinkt!"
else
    echo "⚠️  Project linken mislukt, probeer handmatig:"
    echo "   supabase link --project-ref $PROJECT_REF"
    echo ""
    echo "Of voer migraties handmatig uit via Dashboard:"
    echo "   https://supabase.com/dashboard/project/$PROJECT_REF"
    exit 1
fi

echo ""

# Push migraties
echo "📤 Migraties pushen..."
if supabase db push 2>&1; then
    echo ""
    echo "✅ Migraties succesvol uitgevoerd!"
    echo ""
    echo "📋 Verificatie:"
    echo "   1. Ga naar: https://supabase.com/dashboard/project/$PROJECT_REF"
    echo "   2. Klik op 'Table Editor'"
    echo "   3. Controleer of deze tabellen bestaan:"
    echo "      - chat_sessions"
    echo "      - pages"
    echo "      - app_settings"
else
    echo ""
    echo "⚠️  Migraties pushen mislukt"
    echo ""
    echo "💡 Alternatief: Voer migraties handmatig uit:"
    echo "   1. Ga naar: https://supabase.com/dashboard/project/$PROJECT_REF"
    echo "   2. Klik op 'SQL Editor'"
    echo "   3. Open: scripts/ALL_MIGRATIONS_COMBINED.sql"
    echo "   4. Kopieer en voer uit"
    exit 1
fi

echo ""
echo "🎉 Klaar!"

