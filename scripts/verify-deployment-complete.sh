#!/bin/bash

# Volledige verificatie van Vercel deployment

echo "🔍 Volledige Deployment Verificatie"
echo "===================================="
echo ""

# Kleuren voor output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# 1. Check Vercel CLI login
echo "1️⃣  Vercel CLI Status"
echo "-------------------"
if vercel whoami >/dev/null 2>&1; then
    USER=$(vercel whoami 2>&1 | tail -1 | sed 's/.*> //' | xargs)
    echo -e "${GREEN}✅ Ingelogd als: $USER${NC}"
else
    echo -e "${RED}❌ Niet ingelogd bij Vercel${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Check deployments
echo "2️⃣  Recente Deployments"
echo "----------------------"
LATEST_DEPLOY=$(vercel ls 2>&1 | grep Ready | head -1)
if [ -n "$LATEST_DEPLOY" ]; then
    echo -e "${GREEN}✅ Laatste deployment gevonden${NC}"
    echo "$LATEST_DEPLOY" | awk '{print "   URL: https://" $3}'
else
    echo -e "${RED}❌ Geen deployments gevonden${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Check yannova.vercel.app
echo "3️⃣  Vercel Default Domain"
echo "----------------------"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://yannova.vercel.app")
if [ "$STATUS" = "200" ]; then
    SERVER=$(curl -sI "https://yannova.vercel.app" | grep -i "server:" | cut -d: -f2 | xargs)
    echo -e "${GREEN}✅ https://yannova.vercel.app is bereikbaar (HTTP $STATUS)${NC}"
    echo "   Server: $SERVER"
else
    echo -e "${RED}❌ https://yannova.vercel.app niet bereikbaar (HTTP $STATUS)${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Check yannova.be
echo "4️⃣  Custom Domain (yannova.be)"
echo "----------------------------"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://yannova.be")
if [ "$STATUS" = "200" ]; then
    SERVER=$(curl -sI "https://yannova.be" | grep -i "server:" | cut -d: -f2 | xargs)
    echo -e "${GREEN}✅ https://yannova.be is bereikbaar (HTTP $STATUS)${NC}"
    echo "   Server: $SERVER"
    
    # Check of het de juiste content serveert
    TITLE=$(curl -s "https://yannova.be" | grep -i "<title>" | sed 's/.*<title>\(.*\)<\/title>.*/\1/')
    if echo "$TITLE" | grep -qi "yannova"; then
        echo -e "${GREEN}✅ Correcte content wordt geserveerd${NC}"
        echo "   Title: $TITLE"
    else
        echo -e "${YELLOW}⚠️  Content check mislukt${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${RED}❌ https://yannova.be niet bereikbaar (HTTP $STATUS)${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 5. Check www.yannova.be
echo "5️⃣  WWW Subdomain (www.yannova.be)"
echo "---------------------------------"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.yannova.be")
if [ "$STATUS" = "200" ] || [ "$STATUS" = "307" ] || [ "$STATUS" = "301" ]; then
    LOCATION=$(curl -sI "https://www.yannova.be" | grep -i "location:" | cut -d: -f2 | xargs)
    SERVER=$(curl -sI "https://www.yannova.be" | grep -i "server:" | cut -d: -f2 | xargs)
    if [ "$STATUS" = "200" ]; then
        echo -e "${GREEN}✅ https://www.yannova.be is bereikbaar (HTTP $STATUS)${NC}"
    else
        echo -e "${GREEN}✅ https://www.yannova.be redirect (HTTP $STATUS)${NC}"
        echo "   Redirect naar: $LOCATION"
    fi
    echo "   Server: $SERVER"
else
    echo -e "${RED}❌ https://www.yannova.be niet bereikbaar (HTTP $STATUS)${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Check DNS records
echo "6️⃣  DNS Records"
echo "-------------"
TXT_RECORD=$(dig +short TXT _vercel.yannova.be 2>/dev/null)
if [ -n "$TXT_RECORD" ]; then
    if echo "$TXT_RECORD" | grep -q "vc-domain-verify"; then
        echo -e "${GREEN}✅ Verificatie TXT record aanwezig${NC}"
    else
        echo -e "${YELLOW}⚠️  TXT record aanwezig maar geen verificatie${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Geen verificatie TXT record gevonden${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

A_RECORD=$(dig +short yannova.be A 2>/dev/null | head -1)
if [ -n "$A_RECORD" ]; then
    echo "   A record: $A_RECORD"
fi

CNAME_RECORD=$(dig +short www.yannova.be CNAME 2>/dev/null)
if [ -n "$CNAME_RECORD" ]; then
    echo "   www CNAME: $CNAME_RECORD"
    if echo "$CNAME_RECORD" | grep -q "vercel"; then
        echo -e "${GREEN}   ✓ Wijst naar Vercel${NC}"
    fi
fi
echo ""

# 7. Check SSL/HTTPS
echo "7️⃣  SSL Certificaat"
echo "-----------------"
SSL_CHECK=$(echo | openssl s_client -connect yannova.be:443 -servername yannova.be 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
if [ -n "$SSL_CHECK" ]; then
    echo -e "${GREEN}✅ SSL certificaat is geldig${NC}"
    echo "$SSL_CHECK" | head -2
else
    echo -e "${YELLOW}⚠️  Kon SSL certificaat niet verifiëren${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 8. Check build status
echo "8️⃣  Build Status"
echo "--------------"
if [ -d "dist" ]; then
    if [ -f "dist/index.html" ]; then
        echo -e "${GREEN}✅ Build output aanwezig (dist/)${NC}"
        SIZE=$(du -sh dist 2>/dev/null | cut -f1)
        echo "   Grootte: $SIZE"
    else
        echo -e "${YELLOW}⚠️  dist/ bestaat maar index.html ontbreekt${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Geen dist/ directory gevonden${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Samenvatting
echo "===================================="
echo "📊 Samenvatting"
echo "===================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Alle kritieke checks geslaagd!${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS waarschuwing(en)${NC}"
    fi
    echo ""
    echo "🌐 Je website is live op:"
    echo "   - https://yannova.vercel.app"
    echo "   - https://yannova.be"
    echo "   - https://www.yannova.be"
    exit 0
else
    echo -e "${RED}❌ $ERRORS fout(en) gevonden${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS waarschuwing(en)${NC}"
    fi
    exit 1
fi

