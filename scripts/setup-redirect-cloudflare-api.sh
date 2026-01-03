#!/bin/bash

# Script om automatisch 301-redirect in te stellen via Cloudflare API
# Voor www.yannovabouw.be → www.yannova.be

echo "☁️  Cloudflare 301-Redirect Setup (API)"
echo "========================================"
echo ""

# API Token (kan ook via environment variable)
# Default token (kan worden overschreven via environment variable)
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-iDAjJrNgFl1Dgvlbj4CUPhBNzbDbNsl42N4Qx2tu}"

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

# Check of jq geïnstalleerd is
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq is niet geïnstalleerd. Installeer met: brew install jq${NC}"
    echo "   Of gebruik de handmatige methode via dashboard"
    exit 1
fi

# Verifieer API token
echo "1️⃣  Verifieer API token..."
TOKEN_CHECK=$(curl -s "https://api.cloudflare.com/client/v4/user/tokens/verify" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

if echo "$TOKEN_CHECK" | jq -e '.success == true' > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API token is geldig${NC}"
else
    echo -e "${RED}❌ API token is ongeldig${NC}"
    echo "   Response: $TOKEN_CHECK"
    exit 1
fi
echo ""

# Haal Zone ID op voor yannovabouw.be
echo "2️⃣  Zoek Zone ID voor $OLD_DOMAIN_NO_WWW..."
ZONE_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones?name=$OLD_DOMAIN_NO_WWW" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].id // empty')
ZONE_NAME=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].name // empty')

if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" = "null" ]; then
    echo -e "${RED}❌ Zone niet gevonden voor $OLD_DOMAIN_NO_WWW${NC}"
    echo ""
    echo "⚠️  BELANGRIJK:"
    echo "   $OLD_DOMAIN_NO_WWW staat niet in dit Cloudflare account."
    echo "   Je moet inloggen op het Cloudflare account waar $OLD_DOMAIN_NO_WWW staat."
    echo ""
    echo "   Opties:"
    echo "   1. Log in op het andere Cloudflare account"
    echo "   2. Maak een nieuwe API token voor dat account"
    echo "   3. Run dit script opnieuw met die token"
    echo ""
    echo "   Of gebruik handmatige setup:"
    echo "   → Ga naar Cloudflare Dashboard voor $OLD_DOMAIN_NO_WWW"
    echo "   → Rules → Redirect Rules → Create rule"
    exit 1
fi

echo -e "${GREEN}✅ Zone gevonden: $ZONE_NAME (ID: $ZONE_ID)${NC}"
echo ""

# Check of Redirect Rules API beschikbaar is
echo "3️⃣  Check Redirect Rules API..."
RULESETS_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

# Zoek naar http_request_redirect phase
REDIRECT_PHASE=$(echo "$RULESETS_RESPONSE" | jq -r '.result[] | select(.phase == "http_request_redirect") | .id // empty')

if [ -z "$REDIRECT_PHASE" ]; then
    echo -e "${YELLOW}⚠️  Redirect Rules API niet direct beschikbaar${NC}"
    echo ""
    echo "📝 Gebruik handmatige setup via dashboard:"
    echo "   1. Ga naar: https://dash.cloudflare.com/"
    echo "   2. Selecteer: $OLD_DOMAIN_NO_WWW"
    echo "   3. Rules → Redirect Rules → Create rule"
    echo "   4. Match: (http.host eq \"$OLD_DOMAIN\") or (http.host eq \"$OLD_DOMAIN_NO_WWW\")"
    echo "   5. Action: 301 Permanent Redirect naar https://$NEW_DOMAIN/\$1"
    exit 0
fi

echo -e "${GREEN}✅ Redirect Rules API beschikbaar${NC}"
echo ""

# Maak redirect rule
echo "4️⃣  Maak redirect rule..."
RULE_DATA=$(cat <<EOF
{
  "rules": [
    {
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
      "expression": "(http.host eq \"$OLD_DOMAIN\" or http.host eq \"$OLD_DOMAIN_NO_WWW\")",
      "description": "Redirect yannovabouw.be to yannova.be"
    }
  ]
}
EOF
)

# Probeer redirect rule aan te maken
CREATE_RESPONSE=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_redirect/entrypoint" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$RULE_DATA")

if echo "$CREATE_RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Redirect rule succesvol aangemaakt!${NC}"
    echo ""
    echo "5️⃣  Test de redirect..."
    sleep 3
    ./scripts/test-301-redirects.sh
else
    echo -e "${YELLOW}⚠️  Kon redirect rule niet automatisch aanmaken${NC}"
    echo "   Response: $(echo "$CREATE_RESPONSE" | jq -r '.errors // .')"
    echo ""
    echo "📝 Gebruik handmatige setup via dashboard:"
    echo "   1. Ga naar: https://dash.cloudflare.com/"
    echo "   2. Selecteer: $OLD_DOMAIN_NO_WWW"
    echo "   3. Rules → Redirect Rules → Create rule"
    echo "   4. Match: (http.host eq \"$OLD_DOMAIN\") or (http.host eq \"$OLD_DOMAIN_NO_WWW\")"
    echo "   5. Action: 301 Permanent Redirect naar https://$NEW_DOMAIN/\$1"
fi

echo ""
echo "✅ Script voltooid!"

