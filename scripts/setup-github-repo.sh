#!/bin/bash

# Script om website naar nieuwe GitHub repository te pushen
# Repository naam: Roustammmmm

echo "🚀 GitHub Repository Setup - Roustammmmm"
echo "========================================="
echo ""

REPO_NAME="Roustammmmm"
GITHUB_USER=$(git config user.name 2>/dev/null || echo "jouw-gebruikersnaam")

# Kleuren
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo "📋 Configuratie:"
echo "   Repository naam: $REPO_NAME"
echo "   GitHub gebruiker: $GITHUB_USER"
echo ""

# Check of GitHub CLI is geïnstalleerd
if command -v gh &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI gevonden${NC}"
    echo ""
    echo "Optie A: Automatisch via GitHub CLI"
    echo "-----------------------------------"
    echo ""
    read -p "Wil je de repository automatisch aanmaken via GitHub CLI? (ja/nee): " USE_CLI
    
    if [ "$USE_CLI" = "ja" ]; then
        echo ""
        echo "1️⃣  Maak repository aan..."
        gh repo create "$REPO_NAME" --public --source=. --remote=new-origin --push
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✅ Repository succesvol aangemaakt en code gepusht!${NC}"
            echo ""
            echo "Repository URL:"
            gh repo view "$REPO_NAME" --web
            exit 0
        else
            echo -e "${RED}❌ Fout bij aanmaken repository${NC}"
            echo "Probeer handmatig (zie Optie B hieronder)"
        fi
    fi
fi

echo ""
echo "Optie B: Handmatig via GitHub Website"
echo "-------------------------------------"
echo ""
echo "1️⃣  Maak repository aan op GitHub:"
echo ""
echo "   a) Ga naar: https://github.com/new"
echo "   b) Repository name: $REPO_NAME"
echo "   c) Kies: Public of Private"
echo "   d) ⚠️  NIET: 'Initialize with README' aanvinken"
echo "   e) Klik: 'Create repository'"
echo ""
read -p "Druk op Enter wanneer je de repository hebt aangemaakt..."

echo ""
echo "2️⃣  Wijzig remote naar nieuwe repository..."
echo ""

# Vraag om GitHub gebruikersnaam
read -p "Wat is je GitHub gebruikersnaam? [$GITHUB_USER]: " USER_INPUT
if [ -n "$USER_INPUT" ]; then
    GITHUB_USER="$USER_INPUT"
fi

# Vraag of HTTPS of SSH
echo ""
echo "Kies verbindingsmethode:"
echo "  1) HTTPS (aanbevolen, eenvoudiger)"
echo "  2) SSH (als je SSH keys hebt ingesteld)"
read -p "Kies (1 of 2): " CONNECTION_TYPE

if [ "$CONNECTION_TYPE" = "2" ]; then
    NEW_REMOTE="git@github.com:$GITHUB_USER/$REPO_NAME.git"
else
    NEW_REMOTE="https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

echo ""
echo "3️⃣  Remote URL: $NEW_REMOTE"
echo ""

# Verwijder oude remote (als die er is)
if git remote get-url origin &> /dev/null; then
    echo "Verwijder oude remote 'origin'..."
    git remote remove origin
fi

# Voeg nieuwe remote toe
echo "Voeg nieuwe remote toe..."
git remote add origin "$NEW_REMOTE"

# Check remote
echo ""
echo "4️⃣  Controleer remote:"
git remote -v
echo ""

# Push naar nieuwe repository
echo "5️⃣  Push code naar nieuwe repository..."
echo ""
read -p "Druk op Enter om te pushen naar $REPO_NAME..."

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Code succesvol gepusht naar GitHub!${NC}"
    echo ""
    echo "Repository URL:"
    echo "https://github.com/$GITHUB_USER/$REPO_NAME"
    echo ""
    echo "Je kunt de repository nu bekijken op:"
    echo "https://github.com/$GITHUB_USER/$REPO_NAME"
else
    echo ""
    echo -e "${RED}❌ Fout bij pushen${NC}"
    echo ""
    echo "Mogelijke oorzaken:"
    echo "  - Repository bestaat nog niet op GitHub"
    echo "  - Je hebt geen toegang tot de repository"
    echo "  - Authenticatie problemen"
    echo ""
    echo "Oplossing:"
    echo "  1. Maak de repository eerst aan op GitHub"
    echo "  2. Check of je ingelogd bent: gh auth login"
    echo "  3. Of gebruik HTTPS en voer credentials in"
fi

echo ""
echo "✅ Script voltooid!"

