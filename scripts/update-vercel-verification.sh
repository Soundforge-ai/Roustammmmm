#!/bin/bash

# Script om Vercel verificatie TXT record bij te werken

DOMAIN="yannova.be"
VERIFICATION_CODE="9UqkK8yxOvyIPig7mXTz8Lpt"
TXT_VALUE="vc-domain-verify=${DOMAIN},${VERIFICATION_CODE}"

echo "🔧 Vercel Domain Verificatie Update"
echo "===================================="
echo ""
echo "Domein: $DOMAIN"
echo "Verificatiecode: $VERIFICATION_CODE"
echo ""
echo "📋 Huidige TXT record:"
echo "----------------------------------------"
CURRENT_TXT=$(dig +short TXT _vercel.${DOMAIN} 2>/dev/null)
if [ -n "$CURRENT_TXT" ]; then
    echo "✅ Huidige waarde: $CURRENT_TXT"
else
    echo "⚠️  Geen TXT record gevonden"
fi

echo ""
echo "📝 Nieuwe TXT record waarde:"
echo "----------------------------------------"
echo "Type: TXT"
echo "Name: _vercel"
echo "Content: $TXT_VALUE"
echo "TTL: Auto"
echo "Proxy: DNS only (grijze wolk)"
echo ""

echo "🔧 Instructies voor Cloudflare:"
echo "----------------------------------------"
echo "1. Ga naar: https://dash.cloudflare.com/"
echo "2. Selecteer domein: $DOMAIN"
echo "3. Ga naar: DNS → Records"
echo "4. Zoek het bestaande _vercel TXT record"
echo "5. Klik op 'Edit'"
echo "6. Update de Content waarde naar:"
echo "   $TXT_VALUE"
echo "7. Zorg dat Proxy status 'DNS only' is (grijze wolk)"
echo "8. Klik op 'Save'"
echo ""
echo "⏳ Na het updaten:"
echo "1. Wacht 1-2 minuten voor DNS propagatie"
echo "2. Ga naar Vercel Dashboard"
echo "3. Klik op 'Refresh' naast $DOMAIN"
echo "4. De status zou moeten veranderen naar 'Valid Configuration' ✅"
echo ""

echo "🔍 Controleren na update:"
echo "----------------------------------------"
echo "Voer dit commando uit om te controleren:"
echo "  dig +short TXT _vercel.${DOMAIN}"
echo ""
echo "Je zou moeten zien:"
echo "  \"$TXT_VALUE\""
echo ""

