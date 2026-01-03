#!/bin/bash

# Script om yannovabouw.be toe te voegen aan Vercel project
# Dit script helpt met het verificatieproces

PROJECT_NAME="yannova"
DOMAIN="yannovabouw.be"
WWW_DOMAIN="www.yannovabouw.be"

echo "🌐 Vercel Domain Toevoegen - $DOMAIN"
echo "===================================="
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

# Stap 1: Probeer het domein toe te voegen via CLI
echo "📝 Stap 1: Probeer domein toe te voegen via Vercel CLI..."
echo "------------------------------------------------------------"

VERCEL_ADD_OUTPUT=$(vercel domains add "$DOMAIN" 2>&1)
echo "$VERCEL_ADD_OUTPUT"

if echo "$VERCEL_ADD_OUTPUT" | grep -qi "verification"; then
    echo ""
    echo "✅ Verificatie vereist - ga verder met stap 2"
    VERIFICATION_NEEDED=true
elif echo "$VERCEL_ADD_OUTPUT" | grep -qi "error\|not authorized\|403"; then
    echo ""
    echo "⚠️  Domein kan niet direct worden toegevoegd (mogelijk al gekoppeld aan ander account)"
    echo ""
    echo "📋 Volg deze stappen handmatig:"
    echo ""
    echo "1. Ga naar Vercel Dashboard:"
    echo "   https://vercel.com/roustamyandiev9-gmailcoms-projects/$PROJECT_NAME/settings/domains"
    echo ""
    echo "2. Klik op 'Add Domain' en voer in: $DOMAIN"
    echo ""
    echo "3. Vercel zal een TXT record geven voor verificatie"
    echo "   Het ziet er zo uit: vc-domain-verify=$DOMAIN,XXXXXXXXX"
    echo ""
    echo "4. Voeg dit TXT record toe in DNS (GoDaddy of Cloudflare):"
    echo ""
    echo "   **GoDaddy:**"
    echo "   - Ga naar: https://www.godaddy.com/nl"
    echo "   - Mijn producten → Domeinen → $DOMAIN → DNS"
    echo "   - Add record → Type: TXT"
    echo "   - Name: _vercel"
    echo "   - Value: [plak de volledige waarde van Vercel]"
    echo ""
    echo "   **Cloudflare:**"
    echo "   - Ga naar: https://dash.cloudflare.com/"
    echo "   - Selecteer domein: $DOMAIN"
    echo "   - DNS → Records → Add record"
    echo "   - Type: TXT"
    echo "   - Name: _vercel"
    echo "   - Content: [plak de volledige waarde van Vercel]"
    echo "   - Proxy: DNS only (grijze wolk)"
    echo ""
    echo "5. Wacht 5-10 minuten en klik op 'Refresh' in Vercel"
    echo ""
    echo "6. Herhaal voor $WWW_DOMAIN"
    exit 0
elif echo "$VERCEL_ADD_OUTPUT" | grep -qi "already\|exists"; then
    echo ""
    echo "✅ Domein is al toegevoegd aan dit project!"
    DOMAIN_ADDED=true
else
    echo ""
    echo "✅ Domein succesvol toegevoegd!"
    DOMAIN_ADDED=true
fi

echo ""
echo "📝 Stap 2: Controleer DNS configuratie"
echo "------------------------------------------------------------"

# Controleer huidige DNS
echo "Huidige A record voor $DOMAIN:"
dig +short $DOMAIN A | head -1 || echo "   Geen A record gevonden"

echo ""
echo "Huidige CNAME voor $WWW_DOMAIN:"
dig +short $WWW_DOMAIN CNAME | head -1 || echo "   Geen CNAME gevonden"

echo ""
echo "Huidige TXT record voor _vercel.$DOMAIN:"
TXT_RECORD=$(dig +short TXT _vercel.$DOMAIN 2>/dev/null)
if [ -n "$TXT_RECORD" ]; then
    echo "   $TXT_RECORD"
else
    echo "   Geen TXT record gevonden"
fi

echo ""
echo "✅ Script voltooid!"
echo ""
echo "💡 Tip: Als het domein niet werkt na verificatie, controleer:"
echo "   - Of de DNS records correct zijn gepropageerd (kan 5-30 minuten duren)"
echo "   - Of het domein is geverifieerd in Vercel Dashboard"
echo "   - Of er geen conflicterende records zijn in DNS"
echo ""
echo "📖 Zie ook: docs/YANNOVABOUW_DOMAIN_SETUP.md voor gedetailleerde instructies"

