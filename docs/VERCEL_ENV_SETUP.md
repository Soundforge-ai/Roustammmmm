# Vercel Environment Variables Setup

## 🔧 Probleem

De website toont errors omdat environment variables ontbreken in Vercel:
- ❌ Supabase credentials niet gevonden
- ❌ GLM API Key invalid (401 error)
- ❌ Chatbot werkt niet

## ✅ Oplossing

### Stap 1: Controleer lokale .env.local

Zorg dat je `.env.local` de volgende variabelen bevat:

```env
VITE_SUPABASE_URL=https://fwfkrbfozjlxmpfmagrt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_GLM_API_KEY=je_glm_api_key_hier
```

### Stap 2: Voeg toe aan Vercel

**Optie A: Automatisch via script (aanbevolen)**

```bash
./scripts/setup-vercel-env.sh
```

Dit script:
- Controleert welke variabelen in `.env.local` staan
- Voegt ze automatisch toe aan Vercel via CLI
- Geeft instructies voor handmatige setup als nodig

**Optie B: Handmatig via Dashboard**

1. Ga naar: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/environment-variables
2. Klik op **"Add New"** voor elke variabele
3. Voeg toe:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: `https://fwfkrbfozjlxmpfmagrt.supabase.co`
   - **Environment**: `Production` (en `Preview` als je wilt)
   - Klik **"Save"**

   Herhaal voor:
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GLM_API_KEY`

### Stap 3: GLM API Key toevoegen

Als `VITE_GLM_API_KEY` ontbreekt:

```bash
./scripts/add-glm-api-key.sh
```

Dit script:
- Vraagt om je GLM API key (van naga.ac)
- Voegt deze toe aan `.env.local`
- Optioneel: voegt direct toe aan Vercel

### Stap 4: Redeploy

Na het toevoegen van environment variables, redeploy de website:

```bash
./scripts/redeploy.sh
```

Of handmatig:

```bash
npm run build
vercel --prod
```

## 🔍 Verificatie

Na redeploy, controleer in de browser console:
- ✅ Geen "Supabase credentials not found" error
- ✅ Geen "invalid API key" errors
- ✅ Chatbot werkt

## 📋 Benodigde Variabelen

### Verplicht:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_GLM_API_KEY` - GLM/Naga.ac API key voor chatbot

### Optioneel:
- `VITE_JULES_API_KEY` - Jules assistant API key
- `VITE_GEMINI_API_KEY` - Gemini API key (voor image generation)

## 🐛 Troubleshooting

### "Supabase credentials not found"
- Check of variabelen correct zijn toegevoegd in Vercel
- Check of ze beginnen met `VITE_`
- Redeploy na toevoegen

### "API key is invalid (401)"
- Check of `VITE_GLM_API_KEY` correct is
- Verifieer de key op naga.ac
- Wacht enkele minuten na toevoegen (propagatie)

### Variabelen werken niet na redeploy
- Check of variabelen zijn toegevoegd aan **Production** environment
- Check of er geen typos zijn in de key namen
- Forceer een nieuwe deployment

## 🔗 Links

- [Vercel Environment Variables](https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/environment-variables)
- [Supabase Dashboard](https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt)
- [Naga.ac API Keys](https://naga.ac/)

