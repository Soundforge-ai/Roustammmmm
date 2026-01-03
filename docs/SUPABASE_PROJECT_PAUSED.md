# Supabase Project Gepauzeerd - Oplossing

## ⚠️ Waarom is het project gepauzeerd?

Supabase pauzeert **gratis (FREE) projecten** automatisch na **7 dagen inactiviteit** om kosten te besparen.

Dit betekent:
- ❌ Database is niet toegankelijk
- ❌ API endpoints werken niet
- ❌ Migraties kunnen niet worden uitgevoerd
- ❌ Data kan niet worden opgehaald

---

## ✅ Oplossing: Project Reactiveren

### Stap 1: Ga naar Supabase Dashboard

1. Open: https://supabase.com/dashboard
2. Log in met je account
3. Je ziet je projecten (waarschijnlijk met "Project is paused" status)

### Stap 2: Selecteer het Project

1. Klik op **"Yannova Bouw (Website)"** project in de sidebar
2. Of klik op het project in de project lijst

### Stap 3: Reactiveren

1. Je ziet een melding: **"Project is paused"**
2. Klik op de knop **"Restore project"** of **"Resume project"**
3. Wacht even (ongeveer 1-2 minuten) tot het project weer actief is
4. Je ziet een groene status indicator wanneer het project actief is

---

## 🔍 Welk Project Moet Je Reactiveren?

**Project URL:** https://gbseiuwcrengbdexculs.supabase.co  
**Project Reference:** `gbseiuwcrengbdexculs`  
**Project ID:** `47bd9da9-2439-4817-a5f1-7987d18c79f4`

**Project Naam:** "Yannova Bouw (Website)" of mogelijk "info@yannova.be"

**Dashboard:** https://supabase.com/dashboard/project/gbseiuwcrengbdexculs

**Let op:** Als je meerdere projecten ziet, controleer welk project de juiste is door:
- De project reference te vergelijken
- Of de project naam te controleren

---

## ⏱️ Na Reactivatie

### Wacht Even
- Het project heeft 1-2 minuten nodig om volledig op te starten
- Je ziet een loading indicator tijdens het opstarten

### Verificatie
1. Ga naar **Table Editor** in Supabase Dashboard
2. Controleer of je de `leads` tabel ziet
3. Als je de tabel ziet, is het project actief ✅

### Test Database Connectie
1. Open je website
2. Ga naar Admin Dashboard
3. Check browser console (F12) voor errors
4. Als er geen "Supabase not available" errors zijn, werkt het ✅

---

## 💡 Voorkom Pauseren in de Toekomst

### Optie 1: Regelmatig Gebruik
- Gebruik het project minstens 1x per week
- Dit voorkomt automatisch pauseren

### Optie 2: Upgrade naar Betaal Plan
- Betaalde plannen worden niet gepauzeerd
- Zie: https://supabase.com/pricing

### Optie 3: Keep-Alive Script (Geavanceerd)
- Maak een script dat periodiek de database aanroept
- Dit voorkomt inactiviteit

---

## 🔧 Troubleshooting

### "Restore project" knop werkt niet
**Oplossing:**
- Refresh de pagina
- Log uit en log weer in
- Probeer een andere browser

### Project start niet op
**Oplossing:**
- Wacht 5 minuten
- Check Supabase status: https://status.supabase.com/
- Neem contact op met Supabase support

### Kan project niet vinden
**Oplossing:**
- Check of je ingelogd bent met het juiste account
- Controleer of je toegang hebt tot het project
- Vraag de project owner om toegang

---

## 📝 Na Reactivatie: Migraties Uitvoeren

Zodra het project actief is:

1. ✅ Voer de migraties uit (zie `scripts/KOPIEER_PLAK_MIGRATIES.md`)
2. ✅ Test of data wordt opgeslagen
3. ✅ Controleer Admin Dashboard

---

## ⚠️ Belangrijk

- **Gratis projecten pauzeren automatisch** na 7 dagen inactiviteit
- Dit is normaal gedrag van Supabase
- Je data blijft behouden, alleen de database is tijdelijk niet actief
- Na reactivatie is alles weer beschikbaar

---

**Laatste Update:** 25 december 2025

