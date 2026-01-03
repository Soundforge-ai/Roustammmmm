#!/bin/bash

# Script om www.yannova.be te fixen en cache te legen

echo "🔧 Fix www.yannova.be Domain"
echo "============================"
echo ""

DOMAIN="yannova.be"
WWW_DOMAIN="www.yannova.be"

# 1. Check huidige situatie
echo "1️⃣  Huidige Status"
echo "-----------------"
echo "DNS CNAME voor $WWW_DOMAIN:"
CNAME=$(dig +short $WWW_DOMAIN CNAME)
echo "   $CNAME"

if echo "$CNAME" | grep -q "a41093cb64c5c9a2.vercel-dns-017.com"; then
    echo "   ⚠️  Dit wijst naar een OUDE Vercel deployment!"
else
    echo "   ✓ CNAME lijkt correct"
fi
echo ""

# 2. Check of www.yannova.be in Vercel staat
echo "2️⃣  Vercel Domain Status"
echo "----------------------"
vercel domains ls
echo ""

# 3. Probeer toe te voegen
echo "3️⃣  Proberen $WWW_DOMAIN toe te voegen..."
echo "----------------------------------------"
if vercel domains add "$WWW_DOMAIN" 2>&1 | tee /tmp/www-add-output.txt; then
    echo "✅ $WWW_DOMAIN succesvol toegevoegd!"
    WWW_ADDED=true
else
    ERROR_OUTPUT=$(cat /tmp/www-add-output.txt)
    if echo "$ERROR_OUTPUT" | grep -q "Not authorized"; then
        echo "⚠️  $WWW_DOMAIN kan nog niet worden toegevoegd (nog gekoppeld aan ander account)"
        echo ""
        echo "📝 Volg deze stappen:"
        echo ""
        echo "1. Ga naar Vercel Dashboard:"
        echo "   https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains"
        echo ""
        echo "2. Klik op 'Add Domain' en voer in: $WWW_DOMAIN"
        echo ""
        echo "3. Vercel zal een verificatie TXT record geven"
        echo "   (of het domein direct toevoegen als het al geverifieerd is)"
        echo ""
        echo "4. Na toevoegen, Vercel zal een NIEUWE CNAME waarde geven"
        echo "   Update het CNAME record in Cloudflare naar deze nieuwe waarde"
        echo ""
        echo "5. Wacht 5-10 minuten voor DNS propagatie"
        echo ""
        echo "6. Voer dit script opnieuw uit om te verifiëren"
        WWW_ADDED=false
    else
        echo "❌ Onbekende fout:"
        echo "$ERROR_OUTPUT"
        WWW_ADDED=false
    fi
fi
echo ""

# 4. Cache clearing instructies
echo "4️⃣  Cache Clearing"
echo "-----------------"
echo "Na het toevoegen van $WWW_DOMAIN aan Vercel:"
echo ""
echo "1. Wacht 5-10 minuten voor DNS propagatie"
echo ""
echo "2. Test de website:"
echo "   curl -I https://$WWW_DOMAIN"
echo ""
echo "3. Als de cache nog oude content toont:"
echo "   - Vercel cache wordt automatisch geleegd na enkele minuten"
echo "   - Of forceer een nieuwe deployment:"
echo "     ./scripts/redeploy.sh"
echo ""

# 5. Check huidige content versies
echo "5️⃣  Content Versie Check"
echo "----------------------"
echo "yannova.be content hash:"
YANNOVA_HASH=$(curl -sI "https://$DOMAIN" | grep -i "etag\|last-modified" | head -2)
echo "$YANNOVA_HASH"

echo ""
echo "www.yannova.be redirect:"
WWW_REDIRECT=$(curl -sI "https://$WWW_DOMAIN" | grep -i "location\|server" | head -2)
echo "$WWW_REDIRECT"
echo ""

# Cleanup
rm -f /tmp/www-add-output.txt

echo "✨ Check voltooid!"

