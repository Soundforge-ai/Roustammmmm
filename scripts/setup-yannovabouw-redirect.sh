#!/bin/bash

# Script om yannovabouw.be DNS records te updaten naar Vercel
# Zodat de redirects naar yannova.be werken

set -e

# Cloudflare API configuratie
CLOUDFLARE_TOKEN="A6oSbAck9N2qgU1mQd2gIUqCElHeHOQuuLcrnomL"
ZONE_ID="f7f39417a08d6e09d3e4152fe93a86ba"
ACCOUNT_ID="12a96b6a01897015e4c393ccce01030a"

# Vercel IP (hetzelfde als yannova.be)
VERCEL_IP="76.76.21.21"
VERCEL_CNAME="cname.vercel-dns.com"

echo "🚀 Yannovabouw.be DNS Setup naar Vercel"
echo "======================================"
echo ""

# Test API token
echo "🔐 Testing Cloudflare API token..."
response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
  -H "Content-Type: application/json")

if echo "$response" | grep -q '"success":true'; then
    echo "✅ API token is geldig"
else
    echo "❌ API token is ongeldig"
    echo "Response: $response"
    exit 1
fi

echo ""

# Haal huidige DNS records op
echo "📋 Huidige DNS records ophalen..."
records=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
  -H "Content-Type: application/json")

echo "✅ DNS records opgehaald"
echo ""

# Zoek A record voor yannovabouw.be
echo "🔍 Zoeken naar A record voor yannovabouw.be..."
a_record_id=$(echo "$records" | grep -o '"id":"[^"]*"[^}]*"name":"yannovabouw.be"[^}]*"type":"A"' | grep -o '"id":"[^"]*"' | cut -d'"' -f4 | head -1)

if [ -n "$a_record_id" ]; then
    echo "✅ A record gevonden: $a_record_id"
    
    # Update A record naar Vercel IP
    echo "🔄 A record updaten naar Vercel IP ($VERCEL_IP)..."
    update_response=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$a_record_id" \
      -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
      -H "Content-Type: application/json" \
      --data '{
        "type": "A",
        "name": "yannovabouw.be",
        "content": "'$VERCEL_IP'",
        "ttl": 300,
        "proxied": false
      }')
    
    if echo "$update_response" | grep -q '"success":true'; then
        echo "✅ A record succesvol geüpdatet naar $VERCEL_IP"
    else
        echo "❌ A record update mislukt"
        echo "Response: $update_response"
    fi
else
    echo "⚠️  A record niet gevonden, nieuwe aanmaken..."
    
    # Maak nieuwe A record aan
    create_response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
      -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
      -H "Content-Type: application/json" \
      --data '{
        "type": "A",
        "name": "yannovabouw.be",
        "content": "'$VERCEL_IP'",
        "ttl": 300,
        "proxied": false
      }')
    
    if echo "$create_response" | grep -q '"success":true'; then
        echo "✅ A record succesvol aangemaakt: $VERCEL_IP"
    else
        echo "❌ A record aanmaken mislukt"
        echo "Response: $create_response"
    fi
fi

echo ""

# Zoek CNAME record voor www.yannovabouw.be
echo "🔍 Zoeken naar CNAME record voor www.yannovabouw.be..."
cname_record_id=$(echo "$records" | grep -o '"id":"[^"]*"[^}]*"name":"www.yannovabouw.be"[^}]*"type":"CNAME"' | grep -o '"id":"[^"]*"' | cut -d'"' -f4 | head -1)

if [ -n "$cname_record_id" ]; then
    echo "✅ CNAME record gevonden: $cname_record_id"
    
    # Update CNAME record naar Vercel
    echo "🔄 CNAME record updaten naar Vercel ($VERCEL_CNAME)..."
    update_response=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$cname_record_id" \
      -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
      -H "Content-Type: application/json" \
      --data '{
        "type": "CNAME",
        "name": "www.yannovabouw.be",
        "content": "'$VERCEL_CNAME'",
        "ttl": 300,
        "proxied": false
      }')
    
    if echo "$update_response" | grep -q '"success":true'; then
        echo "✅ CNAME record succesvol geüpdatet naar $VERCEL_CNAME"
    else
        echo "❌ CNAME record update mislukt"
        echo "Response: $update_response"
    fi
else
    echo "⚠️  CNAME record niet gevonden, nieuwe aanmaken..."
    
    # Maak nieuwe CNAME record aan
    create_response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
      -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
      -H "Content-Type: application/json" \
      --data '{
        "type": "CNAME",
        "name": "www.yannovabouw.be",
        "content": "'$VERCEL_CNAME'",
        "ttl": 300,
        "proxied": false
      }')
    
    if echo "$create_response" | grep -q '"success":true'; then
        echo "✅ CNAME record succesvol aangemaakt: $VERCEL_CNAME"
    else
        echo "❌ CNAME record aanmaken mislukt"
        echo "Response: $create_response"
    fi
fi

echo ""
echo "✨ DNS configuratie voltooid!"
echo ""
echo "📋 Volgende stappen:"
echo "1. Wacht 5-10 minuten voor DNS propagatie"
echo "2. Voeg yannovabouw.be toe aan Vercel project:"
echo "   https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains"
echo "3. Test de redirects:"
echo "   curl -I https://yannovabouw.be"
echo "   curl -I https://www.yannovabouw.be"
echo ""
echo "🎯 Na Vercel configuratie zullen de redirects automatisch werken:"
echo "   yannovabouw.be → yannova.be"
echo "   www.yannovabouw.be → www.yannova.be"