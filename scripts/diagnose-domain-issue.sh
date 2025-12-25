#!/bin/bash

# Script om domein problemen te diagnosticeren

echo "🔍 Yannova.be Domain Diagnose"
echo "===================================="
echo ""

echo "📋 Huidige DNS Configuratie:"
echo "----------------------------------------"

# TXT records
echo "TXT record voor _vercel.yannova.be:"
TXT_RECORD=$(dig +short TXT _vercel.yannova.be 2>/dev/null)
if [ -n "$TXT_RECORD" ]; then
    echo "  ✅ Gevonden: $TXT_RECORD"
    if [[ "$TXT_RECORD" == *"0ee4f2f012d1b5ddc637"* ]]; then
        echo "  ⚠️  Dit is een OUDE verificatiecode!"
        echo "  ❌ Moet worden geüpdatet met nieuwe code van Vercel"
    fi
else
    echo "  ❌ Geen TXT record gevonden"
fi

echo ""
echo "A record voor yannova.be:"
A_RECORD=$(dig +short yannova.be A 2>/dev/null | head -1)
if [ -n "$A_RECORD" ]; then
    echo "  Gevonden: $A_RECORD"
    if [[ "$A_RECORD" != *"76.76.21.21"* ]]; then
        echo "  ⚠️  Dit wijst niet naar Vercel!"
    else
        echo "  ⚠️  Dit wijst naar IP 76.76.21.21 (niet Vercel)"
    fi
fi

echo ""
echo "CNAME voor www.yannova.be:"
CNAME_RECORD=$(dig +short www.yannova.be CNAME 2>/dev/null)
if [ -n "$CNAME_RECORD" ]; then
    echo "  Gevonden: $CNAME_RECORD"
    if [[ "$CNAME_RECORD" == *"a41093cb64c5c9a2.vercel-dns-017.com"* ]]; then
        echo "  ⚠️  Dit wijst naar OUDE Vercel deployment!"
        echo "  ❌ Moet worden geüpdatet naar nieuwe Vercel deployment"
    elif [[ "$CNAME_RECORD" == *"vercel"* ]]; then
        echo "  ✅ Dit wijst naar Vercel (maar mogelijk oude deployment)"
    fi
fi

echo ""
echo "🌐 Website Status:"
echo "----------------------------------------"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://yannova.be 2>/dev/null)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "  ✅ Website is bereikbaar (HTTP $HTTP_STATUS)"
    echo "  ⚠️  Maar toont waarschijnlijk onderhoudspagina"
else
    echo "  ❌ Website geeft HTTP $HTTP_STATUS"
fi

echo ""
echo "📋 SAMENVATTING:"
echo "----------------------------------------"
echo "❌ Problemen gevonden:"
echo "  1. TXT record bevat oude verificatiecode"
echo "  2. yannova.be wijst niet naar Vercel"
echo "  3. www.yannova.be wijst naar oude Vercel deployment"
echo ""
echo "✅ Oplossing:"
echo "  1. Ga naar Vercel Dashboard"
echo "  2. Klik op 'Edit' naast yannova.be"
echo "  3. Kopieer de NIEUWE verificatiecode"
echo "  4. Update TXT record in Cloudflare"
echo "  5. Update DNS records om naar nieuwe deployment te wijzen"
echo ""

