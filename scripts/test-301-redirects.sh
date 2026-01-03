#!/bin/bash

# Script om 301-redirects te testen
# Test of www.yannovabouw.be correct redirect naar www.yannova.be

echo "🔍 301-Redirect Test"
echo "==================="
echo ""

OLD_DOMAIN="www.yannovabouw.be"
NEW_DOMAIN="www.yannova.be"

# Kleuren voor output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check of oude domain redirect geeft
echo "1️⃣  Test redirect van $OLD_DOMAIN"
echo "----------------------------------------"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "https://$OLD_DOMAIN" 2>/dev/null)
REDIRECT_URL=$(curl -s -o /dev/null -w "%{redirect_url}" -L "https://$OLD_DOMAIN" 2>/dev/null)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}✅ HTTP Status: $HTTP_CODE${NC}"
    
    # Check of redirect naar nieuwe domain gaat
    FINAL_URL=$(curl -s -o /dev/null -w "%{url_effective}" -L "https://$OLD_DOMAIN" 2>/dev/null)
    if echo "$FINAL_URL" | grep -q "$NEW_DOMAIN"; then
        echo -e "${GREEN}✅ Redirect werkt: $OLD_DOMAIN → $NEW_DOMAIN${NC}"
    else
        echo -e "${YELLOW}⚠️  Redirect gaat naar: $FINAL_URL${NC}"
        echo -e "${YELLOW}   Verwacht: $NEW_DOMAIN${NC}"
    fi
else
    echo -e "${RED}❌ HTTP Status: $HTTP_CODE${NC}"
    echo -e "${YELLOW}   Redirect werkt mogelijk niet of domein is niet bereikbaar${NC}"
fi
echo ""

# Test 2: Check met headers voor 301 status
echo "2️⃣  Check 301 Status Code"
echo "-------------------------"
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" -I "https://$OLD_DOMAIN" 2>/dev/null)
if [ "$STATUS_CODE" = "301" ]; then
    echo -e "${GREEN}✅ Correct 301 (Permanent Redirect) status code${NC}"
elif [ "$STATUS_CODE" = "302" ]; then
    echo -e "${YELLOW}⚠️  302 (Temporary Redirect) - overweeg 301 voor SEO${NC}"
else
    echo -e "${RED}❌ Status code: $STATUS_CODE (verwacht 301)${NC}"
fi
echo ""

# Test 3: Check Location header
echo "3️⃣  Check Location Header"
echo "-------------------------"
LOCATION=$(curl -s -I "https://$OLD_DOMAIN" 2>/dev/null | grep -i "location:" | cut -d' ' -f2 | tr -d '\r')
if [ -n "$LOCATION" ]; then
    if echo "$LOCATION" | grep -q "$NEW_DOMAIN"; then
        echo -e "${GREEN}✅ Location header correct: $LOCATION${NC}"
    else
        echo -e "${YELLOW}⚠️  Location header: $LOCATION${NC}"
        echo -e "${YELLOW}   Verwacht: https://$NEW_DOMAIN${NC}"
    fi
else
    echo -e "${RED}❌ Geen Location header gevonden${NC}"
fi
echo ""

# Test 4: Test zonder www
echo "4️⃣  Test yannovabouw.be (zonder www)"
echo "-------------------------------------"
HTTP_CODE_NO_WWW=$(curl -s -o /dev/null -w "%{http_code}" -L "https://yannovabouw.be" 2>/dev/null)
if [ "$HTTP_CODE_NO_WWW" = "200" ] || [ "$HTTP_CODE_NO_WWW" = "301" ] || [ "$HTTP_CODE_NO_WWW" = "302" ]; then
    FINAL_URL_NO_WWW=$(curl -s -o /dev/null -w "%{url_effective}" -L "https://yannovabouw.be" 2>/dev/null)
    if echo "$FINAL_URL_NO_WWW" | grep -q "$NEW_DOMAIN"; then
        echo -e "${GREEN}✅ yannovabouw.be redirect werkt${NC}"
    else
        echo -e "${YELLOW}⚠️  yannovabouw.be redirect naar: $FINAL_URL_NO_WWW${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  yannovabouw.be geeft status: $HTTP_CODE_NO_WWW${NC}"
fi
echo ""

# Samenvatting
echo "===================================="
echo "📊 Samenvatting"
echo "===================================="
echo "Oude domain: $OLD_DOMAIN"
echo "Nieuwe domain: $NEW_DOMAIN"
echo ""
echo "⚠️  BELANGRIJK:"
echo "   Als de redirects niet werken, moet je de redirect instellen op de server"
echo "   waar www.yannovabouw.be wordt gehost (niet op Vercel)."
echo ""
echo "   Voor Apache servers, voeg toe aan .htaccess:"
echo "   Redirect 301 / https://$NEW_DOMAIN/"
echo ""
echo "   Voor Nginx, voeg toe aan config:"
echo "   return 301 https://$NEW_DOMAIN\$request_uri;"
echo ""

