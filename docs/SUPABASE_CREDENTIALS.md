# Supabase Credentials Configuratie

## ✅ Credentials Toegevoegd

De Supabase credentials zijn toegevoegd aan `.env.local`:

```env
VITE_SUPABASE_URL=https://gbseiuwcrengbdexculs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2VpdXdjcmVuZ2JkZXhjdWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNzgyMTAsImV4cCI6MjA4MTY1NDIxMH0.yN_WAgsiNDeDcAACPiYcs9yJfrZgPp9JaaJ0bfAk5o0
```

## 📍 Project Details

**Project URL:** https://gbseiuwcrengbdexculs.supabase.co  
**Project Reference:** `gbseiuwcrengbdexculs`  
**Project ID:** `47bd9da9-2439-4817-a5f1-7987d18c79f4`

**Dashboard:** https://supabase.com/dashboard/project/gbseiuwcrengbdexculs

## 🔄 Na Toevoegen

1. **Herstart de development server:**
   ```bash
   # Stop de server (Ctrl+C)
   # Start opnieuw
   npm run dev
   ```

2. **Verificatie:**
   - Open browser console (F12)
   - Check of er geen "Supabase credentials not found" warning is
   - Test Admin Dashboard → data zou nu uit Supabase moeten komen

## ⚠️ Belangrijk

- `.env.local` is al in `.gitignore` - credentials worden niet gecommit
- Deze credentials zijn voor **client-side** gebruik (anon key)
- **Service Role Key** mag NOOIT in client-side code staan

## 🔧 Troubleshooting

### "Supabase credentials not found"
**Oplossing:**
1. Controleer of `.env.local` bestaat
2. Controleer of variabelen beginnen met `VITE_`
3. Herstart de development server

### "Supabase not available"
**Oplossing:**
1. Check of project niet gepauzeerd is (zie `docs/SUPABASE_PROJECT_PAUSED.md`)
2. Check of credentials correct zijn
3. Check browser console voor specifieke errors

---

**Laatste Update:** 25 december 2025

