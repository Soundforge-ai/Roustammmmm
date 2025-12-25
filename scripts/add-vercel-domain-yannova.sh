#!/bin/bash

# Script om yannova.be toe te voegen aan Vercel project
# Dit script helpt met het verificatieproces

PROJECT_NAME="yannova"
DOMAIN="yannova.be"
WWW_DOMAIN="www.yannova.be"

echo "🌐 Vercel Domain Toevoegen - $DOMAIN"
echo "===================================="
echo ""

# Stap 1: Probeer het domein toe te voegen via CLI
echo "📝 Stap 1: Probeer domein toe te voegen via Vercel CLI..."
echo "------------------------------------------------------------"

if vercel domains add $DOMAIN 2>&1 | grep -q "verification"; then
    echo "✅ Verificatie vereist - ga verder met stap 2"
elif vercel domains add $DOMAIN 2>&1 | grep -q "Error"; then
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
    echo "4. Voeg dit TXT record toe in Cloudflare:"
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
else
    echo "✅ Domein succesvol toegevoegd!"
fi

echo ""
echo "📝 Stap 2: Controleer DNS configuratie"
echo "------------------------------------------------------------"

# Controleer huidige DNS
echo "Huidige A record voor $DOMAIN:"
dig +short $DOMAIN A | head -1

echo ""
echo "Huidige CNAME voor $WWW_DOMAIN:"
dig +short $WWW_DOMAIN CNAME | head -1

echo ""
echo "Huidige TXT record voor _vercel.$DOMAIN:"
dig +short TXT _vercel.$DOMAIN

echo ""
echo "✅ Script voltooid!"
echo ""
echo "💡 Tip: Als het domein niet werkt na verificatie, controleer:"
echo "   - Of de DNS records correct zijn gepropageerd (kan 5-30 minuten duren)"
echo "   - Of het domein is geverifieerd in Vercel Dashboard"
echo "   - Of er geen conflicterende records zijn in Cloudflare"

