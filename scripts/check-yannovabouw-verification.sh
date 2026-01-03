#!/bin/bash

# Script om verificatie status te controleren voor yannovabouw.be domeinen

DOMAIN="yannovabouw.be"
WWW_DOMAIN="www.yannovabouw.be"

echo "🔍 Verificatie Status Check - yannovabouw.be"
echo "============================================="
echo ""

# Controleer TXT records
echo "📋 DNS Verificatie Records:"
echo "----------------------------------------"

echo ""
echo "1️⃣  _vercel.$DOMAIN:"
TXT_RECORD=$(dig +short TXT "_vercel.$DOMAIN" 2>/dev/null)
if [ -n "$TXT_RECORD" ]; then
    echo "   ✅ TXT record gevonden:"
    echo "   $TXT_RECORD"
    if echo "$TXT_RECORD" | grep -q "vc-domain-verify"; then
        echo "   ✓ Dit is een Vercel verificatie record"
    fi
else
    echo "   ❌ Geen TXT record gevonden"
    echo "   ⚠️  Je moet nog een TXT record toevoegen in DNS"
fi

echo ""
echo "2️⃣  _vercel.$WWW_DOMAIN:"
TXT_RECORD_WWW=$(dig +short TXT "_vercel.$WWW_DOMAIN" 2>/dev/null)
if [ -n "$TXT_RECORD_WWW" ]; then
    echo "   ✅ TXT record gevonden:"
    echo "   $TXT_RECORD_WWW"
    if echo "$TXT_RECORD_WWW" | grep -q "vc-domain-verify"; then
        echo "   ✓ Dit is een Vercel verificatie record"
    fi
else
    echo "   ❌ Geen TXT record gevonden"
    echo "   ⚠️  Je moet nog een TXT record toevoegen in DNS"
fi

echo ""
echo "📝 Volgende Stappen:"
echo "----------------------------------------"
echo ""
echo "1. Ga naar Vercel Dashboard:"
echo "   https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains"
echo ""
echo "2. Klik op 'Edit' naast $DOMAIN"
echo "   - Scroll naar beneden naar 'Domain Verification'"
echo "   - Kopieer de volledige 'Value' waarde"
echo "   - Bijvoorbeeld: vc-domain-verify=$DOMAIN,XXXXXXXXXXXXX"
echo ""
echo "3. Voeg TXT record toe in DNS:"
echo ""
echo "   **Als domein bij GoDaddy staat:**"
echo "   - Ga naar: https://www.godaddy.com/nl"
echo "   - Mijn producten → Domeinen → $DOMAIN → DNS"
echo "   - Add record → Type: TXT"
echo "   - Name: _vercel"
echo "   - Value: [plak de volledige waarde van Vercel]"
echo "   - TTL: 600 of 3600"
echo "   - Save"
echo ""
echo "   **Als domein bij Cloudflare staat:**"
echo "   - Ga naar: https://dash.cloudflare.com/"
echo "   - Selecteer domein: $DOMAIN"
echo "   - DNS → Records → Add record"
echo "   - Type: TXT"
echo "   - Name: _vercel"
echo "   - Content: [plak de volledige waarde van Vercel]"
echo "   - Proxy: DNS only (grijze wolk)"
echo "   - Save"
echo ""
echo "4. Herhaal voor $WWW_DOMAIN (klik op 'Edit' naast www.yannovabouw.be)"
echo ""
echo "5. Wacht 5-10 minuten voor DNS propagatie"
echo ""
echo "6. Klik op 'Refresh' in Vercel Dashboard naast elk domein"
echo ""
echo "7. Voer dit script opnieuw uit om te controleren:"
echo "   ./scripts/check-yannovabouw-verification.sh"
echo ""

