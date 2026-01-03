#!/bin/bash

# Script om 301-redirects in te stellen via Cloudflare
# Voor www.yannovabouw.be → www.yannova.be

echo "☁️  Cloudflare 301-Redirect Setup"
echo "=================================="
echo ""

OLD_DOMAIN="www.yannovabouw.be"
OLD_DOMAIN_NO_WWW="yannovabouw.be"
NEW_DOMAIN="www.yannova.be"

# Kleuren
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo "📋 Configuratie:"
echo "   Oude domain: $OLD_DOMAIN"
echo "   Nieuwe domain: $NEW_DOMAIN"
echo ""

# Check of Cloudflare API credentials beschikbaar zijn
if [ -z "$CLOUDFLARE_API_TOKEN" ] && [ -z "$CLOUDFLARE_EMAIL" ] && [ -z "$CLOUDFLARE_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  Cloudflare API credentials niet gevonden${NC}"
    echo ""
    echo "📝 HANDMATIGE SETUP VIA CLOUDFLARE DASHBOARD:"
    echo "=============================================="
    echo ""
    echo "1️⃣  Log in op Cloudflare"
    echo "   → https://dash.cloudflare.com/"
    echo ""
    echo "2️⃣  Selecteer het domein: $OLD_DOMAIN"
    echo ""
    echo "3️⃣  Ga naar: Rules → Redirect Rules"
    echo ""
    echo "4️⃣  Klik op: 'Create rule'"
    echo ""
    echo "5️⃣  Vul in:"
    echo ""
    echo -e "${BLUE}   Rule name:${NC} Redirect yannovabouw.be to yannova.be"
    echo ""
    echo -e "${BLUE}   If:${NC}"
    echo "   (http.host eq \"$OLD_DOMAIN\") or (http.host eq \"$OLD_DOMAIN_NO_WWW\")"
    echo ""
    echo -e "${BLUE}   Then:${NC}"
    echo "   Status code: 301 - Permanent Redirect"
    echo "   Destination URL: https://$NEW_DOMAIN/\$1"
    echo "   Preserve query string: ✅ (aan)"
    echo "   Preserve path: ✅ (aan)"
    echo ""
    echo "6️⃣  Klik op: 'Deploy'"
    echo ""
    echo "7️⃣  Test de redirect:"
    echo "   curl -I https://$OLD_DOMAIN"
    echo ""
    echo "   Je zou moeten zien:"
    echo "   HTTP/2 301"
    echo "   location: https://$NEW_DOMAIN/"
    echo ""
    
    # Check of Cloudflare CLI beschikbaar is
    if command -v wrangler &> /dev/null; then
        echo ""
        echo "💡 TIP: Je kunt ook Cloudflare API gebruiken met wrangler CLI"
        echo "   Installeer: npm install -g wrangler"
        echo "   Authenticeer: wrangler login"
    fi
    
    exit 0
fi

# Als API credentials beschikbaar zijn, probeer automatisch
echo "🔧 Automatische setup met Cloudflare API..."
echo ""

# Check of curl beschikbaar is
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ curl is niet geïnstalleerd${NC}"
    exit 1
fi

# Haal zone ID op
echo "1️⃣  Haal Zone ID op voor $OLD_DOMAIN..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$OLD_DOMAIN_NO_WWW" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$ZONE_ID" ]; then
    echo -e "${RED}❌ Kon Zone ID niet ophalen${NC}"
    echo "   Controleer je API credentials"
    exit 1
fi

echo -e "${GREEN}✅ Zone ID: $ZONE_ID${NC}"
echo ""

# Maak redirect rule
echo "2️⃣  Maak redirect rule..."
RULE_DATA=$(cat <<EOF
{
  "name": "Redirect yannovabouw.be to yannova.be",
  "status": "active",
  "priority": 1,
  "action": "redirect",
  "action_parameters": {
    "from": {
      "value": "(http.host eq \"$OLD_DOMAIN\" or http.host eq \"$OLD_DOMAIN_NO_WWW\")"
    },
    "to": {
      "value": "https://$NEW_DOMAIN/\$1",
      "status_code": 301,
      "preserve_query_string": true
    }
  },
  "expression": "(http.host eq \"$OLD_DOMAIN\" or http.host eq \"$OLD_DOMAIN_NO_WWW\")"
}
EOF
)

RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_redirect/entrypoint" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$RULE_DATA")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Redirect rule succesvol aangemaakt!${NC}"
    echo ""
    echo "3️⃣  Test de redirect..."
    sleep 2
    ./scripts/test-301-redirects.sh
else
    echo -e "${RED}❌ Fout bij aanmaken redirect rule${NC}"
    echo "   Response: $RESPONSE"
    echo ""
    echo "   Gebruik handmatige setup via dashboard (zie boven)"
    exit 1
fi

