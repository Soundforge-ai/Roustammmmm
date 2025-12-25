#!/bin/bash

# Script om Vercel verificatie TXT record bij te werken met nieuwe code

DOMAIN="yannova.be"
VERIFICATION_CODE="RwFdQnQR9TzEOvQT5tJxUlRD"
TXT_VALUE="vc-domain-verify=${DOMAIN},${VERIFICATION_CODE}"

echo "🔧 Vercel Domain Verificatie Update (v2)"
echo "===================================="
echo ""
echo "Domein: $DOMAIN"
echo "Nieuwe verificatiecode: $VERIFICATION_CODE"
echo ""

echo "📋 Huidige TXT record (moet worden geüpdatet):"
echo "----------------------------------------"
CURRENT_TXT=$(dig +short TXT _vercel.${DOMAIN} 2>/dev/null)
if [ -n "$CURRENT_TXT" ]; then
    echo "⚠️  Huidige waarde: $CURRENT_TXT"
    echo "   (Dit is de oude waarde - moet worden geüpdatet)"
else
    echo "⚠️  Geen TXT record gevonden"
fi

echo ""
echo "✅ NIEUWE TXT record waarde (gebruik deze):"
echo "----------------------------------------"
echo "Type: TXT"
echo "Name: _vercel"
echo "Content: $TXT_VALUE"
echo "TTL: Auto"
echo "Proxy: DNS only (grijze wolk)"
echo ""

echo "🔧 Stappen om te updaten in Cloudflare:"
echo "----------------------------------------"
echo "1. Ga naar: https://dash.cloudflare.com/"
echo "2. Selecteer domein: $DOMAIN"
echo "3. Ga naar: DNS → Records"
echo "4. Zoek het _vercel TXT record"
echo "5. Klik op 'Edit'"
echo "6. Update de Content waarde naar:"
echo ""
echo "   $TXT_VALUE"
echo ""
echo "7. Zorg dat Proxy status 'DNS only' is (grijze wolk)"
echo "8. Klik op 'Save'"
echo ""

echo "⏳ Na het updaten:"
echo "----------------------------------------"
echo "1. Wacht 2-3 minuten voor DNS propagatie"
echo "2. Controleer met: dig +short TXT _vercel.${DOMAIN}"
echo "3. Ga naar Vercel Dashboard"
echo "4. Klik op 'Refresh' naast $DOMAIN"
echo "5. Status zou moeten veranderen naar 'Valid Configuration' ✅"
echo ""

echo "🔍 Controleren na update:"
echo "----------------------------------------"
echo "Voer dit commando uit om te controleren:"
echo "  dig +short TXT _vercel.${DOMAIN}"
echo ""
echo "Je zou moeten zien:"
echo "  \"$TXT_VALUE\""
echo ""

