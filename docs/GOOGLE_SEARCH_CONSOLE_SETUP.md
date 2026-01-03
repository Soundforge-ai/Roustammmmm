# Google Search Console Setup - Stap voor Stap

## 🎯 Doel
Google Search Console geeft je inzicht in:
- Op welke zoekwoorden je gevonden wordt
- Je gemiddelde positie per keyword
- Hoeveel mensen op je site klikken
- Welke pagina's het beste presteren
- Technische problemen die Google vindt

---

## 📋 Stap 1: Account Aanmaken

1. **Ga naar Google Search Console**
   - URL: https://search.google.com/search-console
   - Log in met je Google account (gebruik het account dat je ook voor Google Analytics gebruikt, als je die hebt)

2. **Klik op "Start nu"** of "Add Property"

3. **Kies "URL-prefix"** (aanbevolen voor beginners)
   - Voer in: `https://www.yannova.be`
   - Klik op "Doorgaan"

---

## 🔐 Stap 2: Eigendom Verifiëren

Je hebt 3 opties. Kies de makkelijkste:

### Optie A: HTML-bestand (Aanbevolen - Makkelijkst)

1. **Download het verificatiebestand**
   - Google geeft je een bestand zoals: `google9a5e1445ef39384e.html`
   - Download dit bestand

2. **Upload naar je website**
   - Plaats het bestand in de `/public` folder van je project
   - Het bestand moet bereikbaar zijn via: `https://www.yannova.be/google9a5e1445ef39384e.html`

3. **Klik op "Verifiëren"** in Google Search Console

**Let op:** Als je site op Vercel staat, moet je het bestand committen en pushen naar GitHub, dan wordt het automatisch gedeployed.

### Optie B: HTML-tag (Als je toegang hebt tot index.html)

1. **Kopieer de meta-tag** die Google geeft
   - Ziet eruit als: `<meta name="google-site-verification" content="..." />`

2. **Voeg toe aan index.html**
   - Plaats in de `<head>` sectie van `index.html`

3. **Deploy je site** (als je Vercel gebruikt, gebeurt dit automatisch)

4. **Klik op "Verifiëren"**

### Optie C: Google Analytics (Als je GA al hebt)

1. Als je Google Analytics al hebt ingesteld, kan je deze methode gebruiken
2. Google gebruikt dan je bestaande GA tracking code

---

## 📊 Stap 3: Sitemap Indienen

**Na verificatie (kan 1-2 dagen duren):**

1. **Ga naar "Sitemaps"** in het linkermenu
2. **Voer in:** `sitemap.xml`
3. **Klik op "Indienen"**
4. Google begint nu je sitemap te crawlen

**Je sitemap URL:** `https://www.yannova.be/sitemap.xml`

---

## 📈 Stap 4: Rankings Bekijken

**Wacht 1-2 dagen** na verificatie (Google moet eerst data verzamelen)

1. **Ga naar "Prestaties"** in het linkermenu
2. Je ziet nu:
   - **Zoekopdrachten**: Welke keywords mensen gebruiken
   - **Vertooningen**: Hoe vaak je site getoond wordt
   - **Klikken**: Hoe vaak mensen klikken
   - **CTR**: Click-Through Rate (percentage)
   - **Gemiddelde positie**: Op welke plek je staat

### Belangrijke filters:

- **Filter op datum**: Kies laatste 3 maanden voor overzicht
- **Filter op land**: Selecteer "België" voor lokale resultaten
- **Sorteer op klikken**: Zie welke keywords het meeste verkeer brengen
- **Sorteer op positie**: Zie waar je hoog staat

---

## 🎯 Stap 5: Belangrijke Keywords Monitoren

Maak een lijstje van deze keywords en check ze regelmatig:

### Brand Keywords:
- `Yannova Bouw`
- `Yannova`
- `Yannova ramen en deuren`

### Lokale Keywords (Hoge prioriteit):
- `ramen en deuren Keerbergen`
- `ramen en deuren Zoersel`
- `ramen en deuren Mechelen`
- `crepi Keerbergen`
- `gevelisolatie Zoersel`
- `bouwbedrijf Mechelen`
- `renovatie Keerbergen`

### Product Keywords:
- `voordeuren 3D`
- `PVC ramen Keerbergen`
- `aluminium ramen Zoersel`
- `gevelrenovatie Mechelen`

**Tip:** Voeg deze keywords toe aan je favorieten in Google Search Console voor snelle monitoring.

---

## 🔍 Stap 6: URL Inspectie Tool

Gebruik dit om specifieke pagina's te indexeren:

1. **Ga naar "URL-inspectie"** (zoekbalk bovenaan)
2. **Voer een URL in**, bijv.: `https://www.yannova.be/showroom`
3. **Klik op "Indexering aanvragen"** als de pagina nog niet geïndexeerd is
4. Google indexeert de pagina meestal binnen 24-48 uur

**Belangrijke pagina's om te checken:**
- `https://www.yannova.be/`
- `https://www.yannova.be/ramen-deuren`
- `https://www.yannova.be/showroom`
- `https://www.yannova.be/gevel`
- `https://www.yannova.be/contact`

---

## ⚠️ Stap 7: Problemen Oplossen

Google Search Console toont ook problemen:

1. **Ga naar "Gebruik"** → "Core Web Vitals"
   - Zie prestatieproblemen
   - Mobile usability issues

2. **Ga naar "Beveiliging en handmatige acties"**
   - Zie of er security issues zijn
   - Check of je site niet gepenaliseerd is

3. **Ga naar "Dekking"**
   - Zie welke pagina's geïndexeerd zijn
   - Zie welke pagina's problemen hebben

---

## 📅 Monitoring Schema

### Dagelijks (5 minuten):
- Check of er nieuwe keywords zijn
- Check of er errors zijn

### Wekelijks (15 minuten):
- Bekijk top 10 keywords
- Check welke keywords verbeteren/verslechteren
- Los eventuele errors op

### Maandelijks (30 minuten):
- Volledige analyse van prestaties
- Vergelijk met vorige maand
- Identificeer nieuwe kansen
- Pas SEO strategie aan

---

## 🎯 Doelstellingen

**Na 1 maand:**
- [ ] Site volledig geverifieerd
- [ ] Sitemap ingediend en geaccepteerd
- [ ] Minimaal 10 keywords met data
- [ ] Top 20 voor "Yannova Bouw"

**Na 3 maanden:**
- [ ] Top 10 voor "ramen en deuren Keerbergen"
- [ ] Minimaal 50 keywords met data
- [ ] Regelmatig organisch verkeer

**Na 6 maanden:**
- [ ] Top 5 voor belangrijkste lokale keywords
- [ ] Minimaal 100 keywords met data
- [ ] Consistente groei in verkeer

---

## 💡 Tips & Tricks

1. **Gebruik de vergelijkingsfunctie**
   - Vergelijk verschillende periodes
   - Zie trends en patronen

2. **Exporteer data**
   - Download CSV bestanden voor Excel analyse
   - Maak je eigen rapporten

3. **Stel alerts in**
   - Krijg email notificaties bij belangrijke wijzigingen
   - Bijvoorbeeld: nieuwe keywords, errors, etc.

4. **Combineer met Google Analytics**
   - Link Search Console met Analytics
   - Zie volledig beeld van je verkeer

5. **Gebruik de mobiele app**
   - Download "Google Search Console" app
   - Check rankings onderweg

---

## 🆘 Problemen Oplossen

### "Eigendom kan niet worden geverifieerd"
- Check of het verificatiebestand bereikbaar is
- Wacht 5 minuten na upload (propagatie tijd)
- Probeer een andere verificatiemethode

### "Sitemap kan niet worden gevonden"
- Check of `https://www.yannova.be/sitemap.xml` bereikbaar is
- Check of robots.txt de sitemap vermeldt
- Wacht 24-48 uur na eerste indiening

### "Geen data beschikbaar"
- Dit is normaal de eerste 1-2 dagen
- Zorg dat je site geïndexeerd is
- Gebruik URL-inspectie om pagina's te indexeren

---

## 📞 Hulp Nodig?

Als je vastloopt:
1. Check de Google Search Console help: https://support.google.com/webmasters
2. Gebruik de "?" icoon in Search Console voor contextuele hulp
3. Laat het weten als je specifieke problemen hebt!

---

## ✅ Checklist

- [ ] Google Search Console account aangemaakt
- [ ] Website toegevoegd: `https://www.yannova.be`
- [ ] Eigendom geverifieerd
- [ ] Sitemap ingediend: `sitemap.xml`
- [ ] Belangrijke pagina's gecheckt met URL-inspectie
- [ ] Monitoring schema opgezet
- [ ] Google Analytics gekoppeld (optioneel maar aanbevolen)

**Gefeliciteerd! Je bent nu klaar om je rankings te monitoren! 🎉**

