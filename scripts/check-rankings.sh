#!/bin/bash

# SEO Ranking Check Script voor Yannova
# Dit script helpt je om snel te checken of je site geïndexeerd is

echo "🔍 Yannova SEO Ranking Check"
echo "=============================="
echo ""

# Kleuren voor output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check 1: Site indexering
echo "1️⃣  Check: Is je site geïndexeerd in Google?"
echo "   Zoek op: site:www.yannova.be"
echo "   Open: https://www.google.com/search?q=site:www.yannova.be"
echo ""

# Check 2: Sitemap toegankelijk
echo "2️⃣  Check: Is sitemap toegankelijk?"
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.yannova.be/sitemap.xml)
if [ "$SITEMAP_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✓ Sitemap is toegankelijk (HTTP $SITEMAP_STATUS)${NC}"
    echo "   URL: https://www.yannova.be/sitemap.xml"
else
    echo -e "   ${RED}✗ Sitemap niet toegankelijk (HTTP $SITEMAP_STATUS)${NC}"
fi
echo ""

# Check 3: Robots.txt toegankelijk
echo "3️⃣  Check: Is robots.txt toegankelijk?"
ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.yannova.be/robots.txt)
if [ "$ROBOTS_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✓ Robots.txt is toegankelijk (HTTP $ROBOTS_STATUS)${NC}"
    echo "   URL: https://www.yannova.be/robots.txt"
else
    echo -e "   ${RED}✗ Robots.txt niet toegankelijk (HTTP $ROBOTS_STATUS)${NC}"
fi
echo ""

# Check 4: Belangrijke pagina's
echo "4️⃣  Check: Belangrijke pagina's"
PAGES=(
    "https://www.yannova.be/"
    "https://www.yannova.be/ramen-deuren"
    "https://www.yannova.be/showroom"
    "https://www.yannova.be/gevel"
    "https://www.yannova.be/contact"
)

for page in "${PAGES[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$page")
    if [ "$STATUS" = "200" ]; then
        echo -e "   ${GREEN}✓${NC} $page (HTTP $STATUS)"
    else
        echo -e "   ${RED}✗${NC} $page (HTTP $STATUS)"
    fi
done
echo ""

# Check 5: Keywords om te testen
echo "5️⃣  Keywords om handmatig te testen:"
echo ""
echo "   📌 Brand keywords:"
echo "      • Yannova Bouw"
echo "      • Yannova"
echo ""
echo "   📌 Lokale keywords:"
echo "      • ramen en deuren Keerbergen"
echo "      • ramen en deuren Zoersel"
echo "      • ramen en deuren Mechelen"
echo "      • crepi Keerbergen"
echo "      • gevelisolatie Zoersel"
echo "      • bouwbedrijf Mechelen"
echo ""
echo "   📌 Product keywords:"
echo "      • voordeuren 3D"
echo "      • PVC ramen Keerbergen"
echo "      • aluminium ramen Zoersel"
echo ""

# Check 6: Google Search Console
echo "6️⃣  Google Search Console:"
echo "   📊 Ga naar: https://search.google.com/search-console"
echo "   📈 Check 'Prestaties' voor ranking data"
echo "   🗺️  Submit sitemap: https://www.yannova.be/sitemap.xml"
echo ""

# Check 7: Mobile-friendly test
echo "7️⃣  Mobile-friendly test:"
echo "   🔗 https://search.google.com/test/mobile-friendly?url=https://www.yannova.be"
echo ""

# Check 8: PageSpeed Insights
echo "8️⃣  PageSpeed test:"
echo "   🔗 https://pagespeed.web.dev/report?url=https://www.yannova.be"
echo ""

echo "=============================="
echo "✅ Check voltooid!"
echo ""
echo "💡 Tip: Gebruik een incognito venster om niet-gepersonaliseerde"
echo "   zoekresultaten te krijgen bij handmatig testen."
echo ""

