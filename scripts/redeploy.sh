#!/bin/bash

# Snel redeploy script voor Vercel

set -e

echo "🚀 Vercel Redeploy"
echo "=================="
echo ""

# Build
echo "🏗️  Building project..."
if npm run build; then
    echo "✅ Build succesvol!"
    echo ""
    
    # Deploy
    echo "🚀 Deployen naar productie..."
    if vercel --prod; then
        echo ""
        echo "✅ Redeploy succesvol!"
        echo ""
        echo "🌐 Je website is nu live op:"
        echo "   - https://yannova.vercel.app"
        echo "   - https://yannova.be"
        echo "   - https://www.yannova.be"
    else
        echo "❌ Deployment mislukt"
        exit 1
    fi
else
    echo "❌ Build mislukt"
    exit 1
fi

echo ""
echo "✨ Klaar!"

