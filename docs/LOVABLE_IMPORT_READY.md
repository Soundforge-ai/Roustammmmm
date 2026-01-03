# Lovable Import - Alles Klaar! 🚀

## ✅ Project is klaar voor import in Lovable

Het project staat in GitHub en is klaar om te worden geïmporteerd in Lovable.dev.

## 📋 Repository Informatie

- **Repository**: `Soundforge-ai/Roustammmmm`
- **URL**: https://github.com/Soundforge-ai/Roustammmmm
- **Branch**: `main`
- **Status**: ✅ Code is gepusht en up-to-date

## 🚀 Stap-voor-Stap Import in Lovable

### Stap 1: Log in op Lovable

1. Ga naar: https://lovable.dev/
2. Log in met je account (Google, GitHub, of email)

### Stap 2: Connect GitHub Account

1. Klik op je **profiel** (rechtsboven)
2. Ga naar: **Settings** → **Connectors** → **GitHub**
3. Klik op: **"Connect"** of **"Connect GitHub"**
4. Autoriseer Lovable om toegang te krijgen tot je repositories
5. Kies waar je wilt installeren:
   - ✅ **Personal account** (jouw account)
   - ✅ **Soundforge-ai organization** (als je daar toegang toe hebt)
6. Klik op: **"Authorize"** of **"Install"**

### Stap 3: Maak Nieuw Project

1. In Lovable dashboard, klik op **"New Project"** of **"Create Project"**
2. Kies template: **React + Vite** (aanbevolen)
3. Geef project een naam: **"Yannova Website"**
4. Klik op: **"Create"**

### Stap 4: Connect GitHub Repository

**In je nieuwe project:**

1. Klik op: **Settings** (⚙️ tandwiel icoon rechtsboven)
2. Zoek naar: **"GitHub"** of **"Connectors"** of **"Repository"**
3. Klik op: **"Connect Repository"** of **"Link GitHub Repository"**
4. Selecteer repository: **`Soundforge-ai/Roustammmmm`**
5. Kies: **"Connect existing repository"**
6. Bevestig de koppeling

### Stap 5: Import Code

**Lovable zou automatisch de code moeten importeren na het koppelen.**

Als dit niet automatisch gebeurt:

1. In Lovable editor, klik op **"Files"** of **"📁"** (file explorer)
2. OF gebruik de terminal in Lovable:
   - Open terminal (onderin editor)
   - Run: `git pull origin main`

### Stap 6: Installeer Dependencies

1. Open terminal in Lovable
2. Run:
```bash
npm install --legacy-peer-deps
```

### Stap 7: Configureer Environment Variables

**⚠️ BELANGRIJK: Deze stap is cruciaal!**

1. Ga naar: **Settings** → **Environment Variables**
2. Voeg de volgende variabelen toe (zie `.env.example` voor referentie):

**Verplicht:**
- `VITE_SUPABASE_URL` = `https://fwfkrbfozjlxmpfmagrt.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = [jouw Supabase anon key]
- `VITE_GLM_API_KEY` = [jouw GLM API key van naga.ac]

**Optioneel:**
- `VITE_JULES_API_KEY` = [als je Jules gebruikt]
- `VITE_GEMINI_API_KEY` = [als je Gemini gebruikt]
- `GEMINI_API_KEY` = [als je Gemini gebruikt]

3. Voor elke variabele:
   - Klik op **"Add Variable"**
   - Vul **Key** en **Value** in
   - Selecteer **Environment**: `Production` (en `Preview` als je wilt)
   - Klik **"Save"**

### Stap 8: Test de Website

1. Klik op **"Run"** of **"Preview"** in Lovable
2. Check of de website werkt
3. Open browser console (F12) en controleer:
   - ✅ Geen "Supabase credentials not found" error
   - ✅ Geen "invalid API key" errors
   - ✅ Website laadt correct

### Stap 9: Configureer Deployment (Optioneel)

1. **Settings** → **Deployment** of **Publishing**
2. Kies deployment optie:
   - **Auto-deploy**: Automatisch bij elke push naar GitHub
   - **Manual**: Handmatig deployen wanneer je wilt
3. **Configureer custom domain** (als je die hebt):
   - Settings → **Domains**
   - Voeg toe: `yannova.be` of `www.yannova.be`
   - Volg DNS instructies

## 📝 Environment Variables Checklist

Voordat je de website test, zorg dat deze variabelen zijn ingesteld:

- [ ] `VITE_SUPABASE_URL`
- [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] `VITE_GLM_API_KEY`
- [ ] `VITE_JULES_API_KEY` (optioneel)
- [ ] `VITE_GEMINI_API_KEY` (optioneel)

## 🔍 Verificatie

Na import, controleer:

- [ ] GitHub repository is gekoppeld
- [ ] Code is geïmporteerd
- [ ] Dependencies zijn geïnstalleerd (`npm install` succesvol)
- [ ] Environment variables zijn ingesteld
- [ ] Website werkt in preview
- [ ] Geen errors in browser console

## 🆘 Problemen Oplossen

### "Cannot find repository"
- **Check**: Is GitHub account verbonden?
- **Check**: Heb je toegang tot `Soundforge-ai/Roustammmmm`?
- **Oplossing**: Reconnect GitHub in Settings → Connectors

### "Dependencies not found"
- **Oplossing**: Run in terminal:
  ```bash
  npm install --legacy-peer-deps
  ```

### "Supabase credentials not found"
- **Oplossing**: Voeg environment variables toe in Settings → Environment Variables
- **Check**: Zorg dat variabelen beginnen met `VITE_`
- **Check**: Zorg dat variabelen zijn ingesteld voor **Production** environment

### "API key is invalid (401)"
- **Check**: Is `VITE_GLM_API_KEY` correct?
- **Check**: Verifieer de key op naga.ac
- **Oplossing**: Update de environment variable en herstart

### "Import not working"
- **Oplossing**: Gebruik handmatige import via terminal:
  ```bash
  git pull origin main
  npm install --legacy-peer-deps
  ```

## 📦 Wat Wordt Geïmporteerd

✅ **Wordt automatisch geïmporteerd:**
- Alle code bestanden (`src/`, `public/`, etc.)
- `package.json` en dependencies
- Configuratie bestanden (`vite.config.ts`, `tsconfig.json`, etc.)
- `vercel.json` (deployment configuratie)

⚠️ **Moet je handmatig instellen:**
- Environment variables (niet automatisch)
- Custom domains (moet je configureren)
- Deployment settings (moet je instellen)

## 🔗 Handige Links

- **Lovable Dashboard**: https://lovable.dev/
- **GitHub Repository**: https://github.com/Soundforge-ai/Roustammmmm
- **Lovable GitHub Docs**: https://docs.lovable.dev/integrations/github
- **Environment Variables Guide**: Zie `.env.example` in de repository

## 📋 Project Details

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Node Version**: 18+ (aanbevolen)

---

**Laatste Update**: 2025-01-27  
**Repository**: Soundforge-ai/Roustammmmm  
**Status**: ✅ Klaar voor import

