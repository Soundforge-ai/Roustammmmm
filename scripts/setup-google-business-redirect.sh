#!/bin/bash

# Script om 301-redirects in te stellen voor Google Business Profile migratie
# Dit script helpt met het instellen van redirects op de oude server

echo "🔧 Google Business Profile Redirect Setup"
echo "=========================================="
echo ""

OLD_DOMAIN="www.yannovabouw.be"
NEW_DOMAIN="www.yannova.be"

# Kleuren
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "📋 Configuratie:"
echo "   Oude domain: $OLD_DOMAIN"
echo "   Nieuwe domain: $NEW_DOMAIN"
echo ""

# Check waar de oude domain wordt gehost
echo "1️⃣  Detecteer hosting type"
echo "---------------------------"
echo ""

# Check DNS records
echo "DNS Records voor $OLD_DOMAIN:"
DNS_RECORDS=$(dig +short $OLD_DOMAIN A 2>/dev/null)
if [ -n "$DNS_RECORDS" ]; then
    echo -e "${BLUE}   A Records: $DNS_RECORDS${NC}"
else
    echo "   Geen A records gevonden"
fi

CNAME_RECORD=$(dig +short $OLD_DOMAIN CNAME 2>/dev/null)
if [ -n "$CNAME_RECORD" ]; then
    echo -e "${BLUE}   CNAME: $CNAME_RECORD${NC}"
fi
echo ""

# Check server type
echo "2️⃣  Server Type Detectie"
echo "----------------------"
HTTP_HEADERS=$(curl -sI "https://$OLD_DOMAIN" 2>/dev/null)
SERVER=$(echo "$HTTP_HEADERS" | grep -i "server:" | cut -d: -f2 | xargs)

if [ -n "$SERVER" ]; then
    echo "   Server: $SERVER"
    
    if echo "$SERVER" | grep -qi "apache"; then
        echo -e "${GREEN}   ✅ Apache server gedetecteerd${NC}"
        echo ""
        echo "📝 Apache .htaccess configuratie:"
        echo "----------------------------------"
        echo "Voeg toe aan .htaccess op de oude server:"
        echo ""
        echo "# 301 Redirect van oude naar nieuwe domain"
        echo "RewriteEngine On"
        echo "RewriteCond %{HTTP_HOST} ^(www\.)?yannovabouw\.be$ [NC]"
        echo "RewriteRule ^(.*)$ https://$NEW_DOMAIN/\$1 [R=301,L]"
        echo ""
        
    elif echo "$SERVER" | grep -qi "nginx"; then
        echo -e "${GREEN}   ✅ Nginx server gedetecteerd${NC}"
        echo ""
        echo "📝 Nginx configuratie:"
        echo "----------------------"
        echo "Voeg toe aan nginx config:"
        echo ""
        echo "server {"
        echo "    listen 80;"
        echo "    listen 443 ssl;"
        echo "    server_name $OLD_DOMAIN yannovabouw.be;"
        echo "    return 301 https://$NEW_DOMAIN\$request_uri;"
        echo "}"
        echo ""
        
    elif echo "$SERVER" | grep -qi "cloudflare"; then
        echo -e "${GREEN}   ✅ Cloudflare gedetecteerd${NC}"
        echo ""
        echo "📝 Cloudflare Redirect Rules:"
        echo "----------------------------"
        echo "1. Log in op Cloudflare Dashboard"
        echo "2. Selecteer het domein $OLD_DOMAIN"
        echo "3. Ga naar Rules → Redirect Rules"
        echo "4. Maak een nieuwe redirect rule:"
        echo "   - Match: (http.host eq \"$OLD_DOMAIN\") or (http.host eq \"yannovabouw.be\")"
        echo "   - Action: Redirect (301 Permanent)"
        echo "   - Destination: https://$NEW_DOMAIN/\$1"
        echo ""
        
    else
        echo -e "${YELLOW}   ⚠️  Server type niet herkend: $SERVER${NC}"
        echo ""
        echo "📝 Algemene redirect instructies:"
        echo "---------------------------------"
        echo "Contact je hosting provider voor 301-redirect setup"
        echo ""
    fi
else
    echo -e "${YELLOW}   ⚠️  Kan server type niet detecteren${NC}"
    echo ""
    echo "📝 Algemene instructies:"
    echo "----------------------"
    echo "Contact je hosting provider of check de server configuratie"
    echo ""
fi

# Vercel redirect info
echo "3️⃣  Vercel Redirect Configuratie"
echo "--------------------------------"
echo -e "${GREEN}✅ Redirects zijn al geconfigureerd in vercel.json${NC}"
echo ""
echo "De volgende redirects zijn actief:"
echo "  - $OLD_DOMAIN → $NEW_DOMAIN"
echo "  - yannovabouw.be → $NEW_DOMAIN"
echo ""
echo -e "${YELLOW}⚠️  BELANGRIJK:${NC}"
echo "   Deze redirects werken alleen als beide domeinen op Vercel staan."
echo "   Als $OLD_DOMAIN op een andere server staat, moet je daar de redirect instellen."
echo ""

# Test instructies
echo "4️⃣  Test de Redirects"
echo "---------------------"
echo "Run dit script om te testen:"
echo "  ./scripts/test-301-redirects.sh"
echo ""

# Google Business Profile update
echo "5️⃣  Google Business Profile Update"
echo "----------------------------------"
echo "Update handmatig via:"
echo "  1. https://www.google.com/business/"
echo "  2. Selecteer je bedrijf"
echo "  3. Klik op 'Informatie'"
echo "  4. Update:"
echo "     - Website: $NEW_DOMAIN"
echo "     - Adres: De Beemdekens 39, 2980 Zoersel, België"
echo ""

echo "✅ Setup instructies compleet!"
echo ""

