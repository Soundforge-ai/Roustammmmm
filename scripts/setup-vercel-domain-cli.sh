#!/bin/bash

# Script om Vercel domein setup volledig via CLI te doen
# Dit script voegt het domein toe zodra de verificatie is voltooid

set -e

DOMAIN="yannova.be"
WWW_DOMAIN="www.yannova.be"
PROJECT_DIR="/Users/innovarslabo/Desktop/yannova"

echo "🚀 Vercel Domain Setup via CLI"
echo "=============================="
echo ""

# Controleer of vercel CLI geïnstalleerd is
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is niet geïnstalleerd"
    echo "   Installeer met: npm i -g vercel"
    exit 1
fi

echo "✅ Vercel CLI gevonden: $(vercel --version)"
echo ""

# Controleer of gebruiker is ingelogd
echo "🔐 Controleren Vercel login status..."
if vercel whoami >/dev/null 2>&1; then
    VERCEL_USER=$(vercel whoami 2>&1 | tail -1 | sed 's/.*> //' | xargs)
    if [ -n "$VERCEL_USER" ] && [ "$VERCEL_USER" != "Vercel CLI" ]; then
        echo "✅ Ingelogd als: $VERCEL_USER"
    else
        echo "⚠️  Login status onduidelijk, maar doorgaan..."
    fi
else
    echo "❌ Je bent niet ingelogd bij Vercel"
    echo "   Log in met: vercel login"
    exit 1
fi
echo ""

# Controleer of we in het juiste project zijn
cd "$PROJECT_DIR"

# Stap 1: Controleer huidige domeinen
echo "📋 Huidige domeinen in dit account:"
vercel domains ls
echo ""

# Stap 2: Controleer DNS verificatie status
echo "🔍 Controleren DNS verificatie voor $DOMAIN..."
TXT_RECORD=$(dig +short TXT _vercel.$DOMAIN 2>/dev/null | grep -i "vc-domain-verify" || echo "")

if [ -z "$TXT_RECORD" ]; then
    echo "⚠️  Geen verificatie TXT record gevonden voor _vercel.$DOMAIN"
    echo ""
    echo "📝 Volg deze stappen:"
    echo "   1. Ga naar: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains"
    echo "   2. Klik op 'Add Domain' en voer in: $DOMAIN"
    echo "   3. Kopieer de verificatie TXT record waarde"
    echo "   4. Voeg deze toe in Cloudflare:"
    echo "      - Type: TXT"
    echo "      - Name: _vercel"
    echo "      - Content: [plak de volledige waarde]"
    echo "      - Proxy: DNS only (grijze wolk)"
    echo "   5. Wacht 5-10 minuten voor DNS propagatie"
    echo "   6. Voer dit script opnieuw uit"
    echo ""
    exit 0
else
    echo "✅ Verificatie TXT record gevonden:"
    echo "   $TXT_RECORD"
    echo ""
fi

# Stap 3: Probeer domein toe te voegen
echo "➕ Proberen domein $DOMAIN toe te voegen..."
VERCEL_ADD_OUTPUT=$(vercel domains add "$DOMAIN" 2>&1)
echo "$VERCEL_ADD_OUTPUT" | tee /tmp/vercel-add-output.txt

if echo "$VERCEL_ADD_OUTPUT" | grep -q "Not authorized"; then
    echo "⚠️  Domein is nog niet beschikbaar (mogelijk nog gekoppeld aan ander account)"
    echo ""
    echo "💡 Mogelijke oplossingen:"
    echo "   1. Wacht tot DNS verificatie is voltooid (kan 15-30 minuten duren)"
    echo "   2. Controleer in Vercel Dashboard of verificatie is geslaagd"
    echo "   3. Als het domein bij een ander account hoort, verwijder het daar eerst"
    echo ""
    echo "   Dashboard: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains"
    echo ""
    echo "🔄 Doorgaan met deployment (domein kan later worden toegevoegd)..."
    DOMAIN_ADDED=false
elif echo "$VERCEL_ADD_OUTPUT" | grep -qi "error"; then
    echo "❌ Fout bij toevoegen domein:"
    echo "$VERCEL_ADD_OUTPUT"
    DOMAIN_ADDED=false
else
    echo "✅ Domein $DOMAIN succesvol toegevoegd!"
    DOMAIN_ADDED=true
fi

echo ""

# Stap 4: Voeg www subdomain toe (alleen als hoofddomain is toegevoegd)
if [ "$DOMAIN_ADDED" = true ]; then
    echo "➕ Proberen subdomain $WWW_DOMAIN toe te voegen..."
    WWW_OUTPUT=$(vercel domains add "$WWW_DOMAIN" 2>&1)
    echo "$WWW_OUTPUT" | tee /tmp/vercel-add-www-output.txt
    
    if echo "$WWW_OUTPUT" | grep -q "Not authorized"; then
        echo "⚠️  $WWW_DOMAIN kan nog niet worden toegevoegd"
        echo "   Dit is normaal - voeg het later toe via het dashboard"
    elif echo "$WWW_OUTPUT" | grep -qi "error"; then
        echo "⚠️  Fout bij toevoegen $WWW_DOMAIN:"
        echo "$WWW_OUTPUT"
    else
        echo "✅ Subdomain $WWW_DOMAIN succesvol toegevoegd!"
    fi
else
    echo "⏭️  Sla $WWW_DOMAIN over (hoofddomein is nog niet toegevoegd)"
fi

echo ""

# Stap 5: Controleer domein status
echo "📊 Domein status:"
vercel domains ls
echo ""

if [ "$DOMAIN_ADDED" = false ]; then
    echo "⚠️  Let op: Het domein is nog niet toegevoegd aan Vercel"
    echo "   Zodra de DNS verificatie is voltooid, voer dit script opnieuw uit"
    echo "   Of voeg het domein handmatig toe via het dashboard"
    echo ""
fi

# Stap 6: Build en deploy
echo "🏗️  Building project..."
if npm run build; then
    echo "✅ Build succesvol!"
    echo ""
    echo "🚀 Deployen naar productie..."
    if vercel --prod; then
        echo ""
        echo "✅ Deployment succesvol!"
        echo ""
        if [ "$DOMAIN_ADDED" = true ]; then
            echo "🌐 Je website zou nu beschikbaar moeten zijn op:"
            echo "   - https://$DOMAIN"
            echo "   - https://$WWW_DOMAIN"
            echo ""
            echo "⏳ Het kan enkele minuten duren voordat DNS volledig is gepropageerd"
        else
            echo "🌐 Je website is gedeployed op:"
            echo "   - https://yannova.vercel.app"
            echo ""
            echo "⚠️  Zodra het domein is toegevoegd, zal het ook beschikbaar zijn op:"
            echo "   - https://$DOMAIN"
            echo "   - https://$WWW_DOMAIN"
        fi
    else
        echo "❌ Deployment mislukt"
        exit 1
    fi
else
    echo "❌ Build mislukt"
    exit 1
fi

# Cleanup
rm -f /tmp/vercel-add-output.txt /tmp/vercel-add-www-output.txt

echo ""
echo "✨ Klaar!"

