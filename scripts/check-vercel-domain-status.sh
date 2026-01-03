#!/bin/bash

# Script om Vercel domein status te controleren

DOMAIN="yannova.be"
WWW_DOMAIN="www.yannova.be"

echo "🔍 Vercel Domein Status Check"
echo "=============================="
echo ""

# 1. Check DNS TXT record
echo "📋 DNS Verificatie Record:"
TXT_RECORD=$(dig +short TXT _vercel.$DOMAIN 2>/dev/null)
if [ -n "$TXT_RECORD" ]; then
    echo "✅ TXT record gevonden:"
    echo "   $TXT_RECORD"
    if echo "$TXT_RECORD" | grep -q "vc-domain-verify"; then
        echo "   ✓ Dit is een geldig Vercel verificatie record"
    fi
else
    echo "❌ Geen TXT record gevonden voor _vercel.$DOMAIN"
fi
echo ""

# 2. Check domeinen in Vercel account
echo "📊 Domeinen in Vercel account:"
vercel domains ls
echo ""

# 3. Probeer domein toe te voegen (om te zien wat de exacte error is)
echo "🔍 Proberen domein toe te voegen (om status te checken)..."
VERCEL_OUTPUT=$(vercel domains add "$DOMAIN" 2>&1)
if echo "$VERCEL_OUTPUT" | grep -q "Not authorized"; then
    echo "⚠️  Status: Domein is nog niet beschikbaar"
    echo ""
    echo "💡 Mogelijke redenen:"
    echo "   1. Het domein is nog gekoppeld aan een ander Vercel account"
    echo "   2. DNS verificatie is nog niet voltooid (wacht 15-30 minuten)"
    echo "   3. Het domein moet eerst worden verwijderd uit het andere account"
    echo ""
    echo "📝 Volgende stappen:"
    echo "   1. Ga naar Vercel Dashboard:"
    echo "      https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains"
    echo ""
    echo "   2. Klik op 'Add Domain' en voer in: $DOMAIN"
    echo ""
    echo "   3. Als het domein al bestaat, krijg je opties om:"
    echo "      - Het domein te verifiëren (als TXT record correct is)"
    echo "      - Het domein over te nemen (als je eigenaar bent)"
    echo ""
    echo "   4. Als het domein bij een ander account hoort:"
    echo "      - Log in op dat account"
    echo "      - Verwijder het domein daar"
    echo "      - Wacht 5-10 minuten"
    echo "      - Probeer opnieuw"
elif echo "$VERCEL_OUTPUT" | grep -qi "added\|success"; then
    echo "✅ Domein is succesvol toegevoegd!"
else
    echo "❌ Onbekende fout:"
    echo "$VERCEL_OUTPUT"
fi
echo ""

# 4. Check CNAME voor www
echo "🌐 DNS Records:"
echo "   Root domain ($DOMAIN):"
A_RECORD=$(dig +short $DOMAIN A 2>/dev/null | head -1)
if [ -n "$A_RECORD" ]; then
    echo "      A record: $A_RECORD"
fi

echo "   www subdomain ($WWW_DOMAIN):"
CNAME_RECORD=$(dig +short $WWW_DOMAIN CNAME 2>/dev/null)
if [ -n "$CNAME_RECORD" ]; then
    echo "      CNAME: $CNAME_RECORD"
    if echo "$CNAME_RECORD" | grep -q "vercel"; then
        echo "      ✓ Wijst naar Vercel"
    fi
else
    echo "      ⚠️  Geen CNAME record gevonden"
fi
echo ""

# 5. Check of site bereikbaar is
echo "🌐 Website bereikbaarheid:"
if curl -s -o /dev/null -w "%{http_code}" "https://yannova.vercel.app" | grep -q "200"; then
    echo "✅ Vercel deployment is actief: https://yannova.vercel.app"
else
    echo "⚠️  Vercel deployment niet bereikbaar"
fi
echo ""

echo "✨ Check voltooid!"

