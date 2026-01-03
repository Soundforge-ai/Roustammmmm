#!/bin/bash

# Script om te helpen met het verwijderen van yannovabouw.be website
# Domein blijft behouden, website wordt verwijderd

echo "🗑️  yannovabouw.be Website Verwijderen"
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

echo "📋 Configuratie:"
echo "   Te verwijderen website: $DOMAIN"
echo "   Domein blijft behouden: ✅"
echo "   Redirect naar: $NEW_DOMAIN"
echo ""

# Check huidige status
echo "1️⃣  Huidige Status Check"
echo "----------------------"
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
else
    echo "   Geen name servers gevonden"
fi
echo ""

# Check website status
echo "Website Status:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${YELLOW}   ⚠️  Website is nog actief (HTTP $HTTP_CODE)${NC}"
    echo "   → Website moet worden verwijderd bij hosting provider"
elif [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}   ✅ Redirect actief (HTTP $HTTP_CODE)${NC}"
    echo "   → Website is al verwijderd, alleen redirects actief"
else
    echo -e "${BLUE}   Status: HTTP $HTTP_CODE${NC}"
fi
echo ""

# Detect hosting provider
echo "2️⃣  Hosting Provider Detectie"
echo "----------------------------"
echo ""

SERVER=$(curl -sI "https://$DOMAIN" 2>/dev/null | grep -i "server:" | cut -d: -f2 | xargs)
if [ -n "$SERVER" ]; then
    echo -e "${BLUE}   Server:${NC} $SERVER"
    
    if echo "$SERVER" | grep -qi "cloudflare"; then
        echo -e "${GREEN}   ✅ Cloudflare gedetecteerd${NC}"
        echo ""
        echo "📝 Actie vereist:"
        echo "   1. Log in op Cloudflare: https://dash.cloudflare.com/"
        echo "   2. Selecteer domein: $DOMAIN"
        echo "   3. Verwijder website via:"
        echo "      - Pages: Verwijder project"
        echo "      - Workers: Verwijder worker"
        echo "      - Of stel redirects in via Rules → Redirect Rules"
        echo ""
        
    elif echo "$NS_RECORDS" | grep -qi "godaddy\|domaincontrol"; then
        echo -e "${GREEN}   ✅ GoDaddy Name Servers gedetecteerd${NC}"
        echo ""
        echo "📝 Actie vereist via GoDaddy:"
        echo "   1. Log in op: https://www.godaddy.com/nl"
        echo "   2. Account: Elza Nukhanova (Klantnummer: 649689844)"
        echo "   3. Ga naar: Mijn producten → Webhosting"
        echo "   4. Selecteer hosting voor $DOMAIN"
        echo "   5. Verwijder alle bestanden via File Manager"
        echo "   6. OF stel DNS Forwarding in:"
        echo "      - DNS → Forwarding → Toevoegen"
        echo "      - Forward to: https://$NEW_DOMAIN"
        echo "      - Type: Permanent (301)"
        echo ""
        
    else
        echo -e "${YELLOW}   ⚠️  Hosting provider niet herkend${NC}"
        echo ""
        echo "📝 Algemene instructies:"
        echo "   1. Log in op je hosting control panel"
        echo "   2. Verwijder alle website bestanden"
        echo "   3. OF stel redirects in via DNS instellingen"
        echo ""
    fi
else
    echo -e "${YELLOW}   ⚠️  Kan server niet detecteren${NC}"
fi
echo ""

# Opties
echo "3️⃣  Opties voor Website Verwijderen"
echo "----------------------------------"
echo ""
echo "Optie A: Website Volledig Verwijderen (Lege Pagina)"
echo "   → Verwijder alle bestanden bij hosting provider"
echo "   → Domein toont lege pagina"
echo ""
echo "Optie B: Alleen Redirects (Aanbevolen voor SEO)"
echo "   → Verwijder website bestanden"
echo "   → Stel 301 redirects in naar $NEW_DOMAIN"
echo "   → Behoudt SEO waarde en link waarde"
echo ""
echo -e "${GREEN}✅ Aanbevolen: Optie B (Redirects)${NC}"
echo ""

# Vercel check
echo "4️⃣  Vercel Configuratie"
echo "---------------------"
echo ""
if [ -f "vercel.json" ]; then
    if grep -q "yannovabouw" vercel.json; then
        echo -e "${GREEN}✅ Redirects zijn al geconfigureerd in vercel.json${NC}"
        echo "   → Deze redirects werken alleen als domein op Vercel staat"
        echo ""
        echo "   Huidige redirects:"
        echo "   - $WWW_DOMAIN → $NEW_DOMAIN"
        echo "   - $DOMAIN → $NEW_DOMAIN"
        echo ""
    else
        echo -e "${YELLOW}⚠️  Geen redirects gevonden in vercel.json${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  vercel.json niet gevonden${NC}"
fi
echo ""

# Test instructies
echo "5️⃣  Test na Verwijdering"
echo "----------------------"
echo ""
echo "Test commando's:"
echo ""
echo "# Test of website weg is:"
echo "curl -I https://$DOMAIN"
echo ""
echo "# Test redirect (als ingesteld):"
echo "curl -I https://$DOMAIN"
echo "# Moet 301 redirect geven naar $NEW_DOMAIN"
echo ""
echo "# Of gebruik test script:"
echo "./scripts/test-301-redirects.sh"
echo ""

echo "✅ Instructies compleet!"
echo ""
echo -e "${YELLOW}⚠️  BELANGRIJK:${NC}"
echo "   - Verwijder website bestanden bij hosting provider"
echo "   - Stel redirects in (aanbevolen) of maak lege pagina"
echo "   - Test na verwijdering"
echo ""

