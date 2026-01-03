#!/bin/bash

# Script om ALLES te verwijderen van yannovabouw.be
# Website, hosting, email, alles

echo "🗑️  yannovabouw.be - ALLES Verwijderen"
echo "========================================"
echo ""

DOMAIN="yannovabouw.be"
WWW_DOMAIN="www.yannovabouw.be"
NEW_DOMAIN="www.yannova.be"

# Kleuren
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo "⚠️  WAARSCHUWING: Dit script helpt je met het verwijderen van ALLES"
echo "   Website, hosting, email, services - alles van yannovabouw.be"
echo ""
echo -e "${RED}⚠️  BELANGRIJK:${NC}"
echo "   - Maak eerst backups van belangrijke data"
echo "   - Exporteer emails als je die nodig hebt"
echo "   - Beslis of je het domein wilt behouden of verwijderen"
echo ""

read -p "Wil je doorgaan? (ja/nee): " CONFIRM
if [ "$CONFIRM" != "ja" ]; then
    echo "Geannuleerd."
    exit 0
fi

echo ""
echo "📋 Checklist - Wat Moet Worden Verwijderd:"
echo "=========================================="
echo ""
echo "1. ✅ Website (GoDaddy Pro Sites)"
echo "2. ✅ Hosting Account"
echo "3. ✅ Email Accounts (optioneel)"
echo "4. ✅ SSL Certificaten (automatisch)"
echo "5. ✅ DNS Records (of redirects instellen)"
echo "6. ✅ Abonnementen"
echo "7. ⚠️  Domein (kies: verwijderen OF behouden)"
echo ""

# Check huidige status
echo "🔍 Huidige Status"
echo "----------------"
echo ""

# Check DNS
echo "DNS Records:"
A_RECORDS=$(dig +short $DOMAIN A 2>/dev/null)
if [ -n "$A_RECORDS" ]; then
    echo -e "${BLUE}   A Record:${NC} $A_RECORDS"
else
    echo "   Geen A records gevonden"
fi

NS_RECORDS=$(dig +short $DOMAIN NS 2>/dev/null)
if [ -n "$NS_RECORDS" ]; then
    echo -e "${BLUE}   Name Servers:${NC}"
    echo "$NS_RECORDS" | while read ns; do
        echo "      → $ns"
    done
fi
echo ""

# Check website status
echo "Website Status:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${YELLOW}   ⚠️  Website is nog actief (HTTP $HTTP_CODE)${NC}"
elif [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}   ✅ Redirect actief (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${BLUE}   Status: HTTP $HTTP_CODE${NC}"
fi
echo ""

# Stappenplan
echo "📝 Stappenplan"
echo "============="
echo ""

echo "1️⃣  Verwijder Website"
echo "-------------------"
echo ""
echo "Via GoDaddy Pro:"
echo "   1. Ga naar: https://hub.godaddy.com/sites"
echo "   2. Klik op: yannovabouw.godaddysites.com"
echo "   3. Zoek: Settings → Delete Site"
echo "   4. Bevestig verwijdering"
echo ""
echo "OF via Normale GoDaddy:"
echo "   1. Ga naar: https://www.godaddy.com/nl"
echo "   2. Mijn producten → Websites + Marketing"
echo "   3. Zoek yannovabouw → Beheren → Delete"
echo ""

echo "2️⃣  Verwijder Hosting"
echo "-------------------"
echo ""
echo "   1. Mijn producten → Webhosting"
echo "   2. Zoek hosting voor yannovabouw.be"
echo "   3. Beheren → Cancel Subscription"
echo "   4. Kies: Cancel Immediately"
echo ""

echo "3️⃣  Verwijder Email (Als Niet Meer Nodig)"
echo "----------------------------------------"
echo ""
echo "   1. Mijn producten → Email"
echo "   2. Zoek email accounts (info@yannovabouw.be, etc.)"
echo "   3. Delete email accounts"
echo "   4. OF annuleer email plan"
echo ""

echo "4️⃣  Domein Beslissing"
echo "-------------------"
echo ""
read -p "Wil je het domein ook verwijderen? (ja/nee): " DELETE_DOMAIN

if [ "$DELETE_DOMAIN" = "ja" ]; then
    echo ""
    echo -e "${RED}⚠️  WAARSCHUWING: Domein verwijdering is PERMANENT!${NC}"
    echo ""
    echo "   1. Mijn producten → Domeinen → yannovabouw.be"
    echo "   2. Settings → Delete Domain"
    echo "   3. Bevestig verwijdering"
    echo ""
else
    echo ""
    echo "✅ Domein behouden - Stel redirects in:"
    echo ""
    echo "   1. Mijn producten → Domeinen → yannovabouw.be"
    echo "   2. DNS → Forwarding"
    echo "   3. Forward from: yannovabouw.be"
    echo "   4. Forward to: https://$NEW_DOMAIN"
    echo "   5. Type: Permanent (301)"
    echo "   6. Herhaal voor www.yannovabouw.be"
    echo ""
fi

echo "5️⃣  Verwijder DNS Records"
echo "----------------------"
echo ""
echo "   1. Mijn producten → Domeinen → yannovabouw.be"
echo "   2. DNS → Records"
echo "   3. Verwijder alle A records"
echo "   4. Verwijder CNAME records (behalve als je redirects gebruikt)"
echo "   5. Verwijder MX records (als je email verwijdert)"
echo ""

echo "6️⃣  Annuleer Abonnementen"
echo "----------------------"
echo ""
echo "   1. Mijn producten → Check alle actieve abonnementen"
echo "   2. Voor elk: Beheren → Cancel Subscription"
echo "   3. Kies: Cancel Immediately"
echo ""

echo "7️⃣  Verwijder van Cloudflare (Als Applicable)"
echo "--------------------------------------------"
echo ""
echo "   1. Ga naar: https://dash.cloudflare.com/"
echo "   2. Selecteer: yannovabouw.be"
echo "   3. Pages → Delete project"
echo "   4. Workers → Delete worker"
echo ""

echo "8️⃣  Verwijder van Vercel (Als Applicable)"
echo "-----------------------------------------"
echo ""
echo "   1. Ga naar: https://vercel.com/dashboard"
echo "   2. Zoek project met yannovabouw"
echo "   3. Settings → Delete Project"
echo ""

# Test instructies
echo "9️⃣  Verificatie"
echo "-------------"
echo ""
echo "Test na verwijdering:"
echo ""
echo "# Test website"
echo "curl -I https://$DOMAIN"
echo ""
echo "# Test DNS"
echo "dig $DOMAIN A"
echo ""
echo "# Test redirect (als ingesteld)"
echo "curl -I https://$DOMAIN"
echo ""

# Support info
echo "🆘 Hulp Nodig?"
echo "-------------"
echo ""
echo "Als je iets niet kunt vinden of verwijderen:"
echo ""
echo "📞 Bel GoDaddy Support: +31 20 261 4747"
echo ""
echo "Zeg tegen support:"
echo "   - 'Ik wil alles verwijderen van yannovabouw.be'"
echo "   - 'Account: Elza Nukhanova'"
echo "   - 'Klantnummer: 649689844'"
echo "   - 'Website, hosting, email, alles'"
echo ""

echo "✅ Stappenplan compleet!"
echo ""
echo -e "${YELLOW}⚠️  Onthoud:${NC}"
echo "   - Maak backups voordat je verwijdert"
echo "   - Beslis over domein (verwijderen of behouden)"
echo "   - Test na verwijdering"
echo ""

