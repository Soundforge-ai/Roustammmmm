# yannovabouw.be Website Verwijderen via GoDaddy Pro

## 🎯 Wat je ziet

Je bent ingelogd op **GoDaddy Pro** en ziet:
- `yannovas.godaddysites.com`
- `yannovabouw.godaddysites.com` ← **Dit is de website die je wilt verwijderen**

## 📝 Stappen om Website te Verwijderen

### Stap 1: Selecteer de Website

1. In de **Sites** lijst, klik op **`yannovabouw.godaddysites.com`**
   - Of klik op de checkbox naast de website
   - Of klik op de drie puntjes (⋮) rechts bij de website

### Stap 2: Verwijder de Website

**Optie A: Via de Website Instellingen**

1. Klik op **`yannovabouw.godaddysites.com`** om de website te openen
2. Zoek naar **"Settings"** of **"Instellingen"** (tandwiel icoon)
3. Scroll naar beneden naar **"Delete Site"** of **"Website Verwijderen"**
4. Klik op **"Delete"** of **"Verwijderen"**
5. Bevestig de verwijdering

**Optie B: Via de Drie Puntjes Menu**

1. Klik op de **drie puntjes (⋮)** rechts bij `yannovabouw.godaddysites.com`
2. Selecteer **"Delete"** of **"Remove"** of **"Verwijderen"**
3. Bevestig de verwijdering

**Optie C: Via Bulk Acties**

1. Vink de checkbox aan bij `yannovabouw.godaddysites.com`
2. Kijk boven de lijst naar een **"Delete"** of **"Remove"** knop
3. Klik erop en bevestig

### Stap 3: Domein Ontkoppelen (Belangrijk!)

Na het verwijderen van de website, moet je het domein `yannovabouw.be` ontkoppelen:

1. **Ga naar GoDaddy Domeinen** (niet GoDaddy Pro)
   - Log uit van GoDaddy Pro
   - Ga naar: https://www.godaddy.com/nl
   - Log in met hetzelfde account

2. **Ga naar Mijn Producten**
   - Klik op je account menu (rechtsboven)
   - Klik op **"Mijn producten"**

3. **Zoek yannovabouw.be**
   - In de lijst met domeinen
   - Klik op **yannovabouw.be**

4. **DNS Instellingen**
   - Klik op **"DNS"** of **"DNS beheren"**
   - Verwijder of wijzig A records die naar de oude website wijzen

5. **Stel Redirects in (Aanbevolen)**
   - Scroll naar **"Forwarding"** sectie
   - Klik op **"Toevoegen"**
   - Forward from: `yannovabouw.be`
   - Forward to: `https://www.yannova.be`
   - Type: **Permanent (301)**
   - Herhaal voor `www.yannovabouw.be`

## 🔍 Als je "Delete" niet kunt vinden

### Alternatief: Website Uitschakelen

Als je de website niet direct kunt verwijderen:

1. Klik op **`yannovabouw.godaddysites.com`**
2. Zoek naar **"Publish Settings"** of **"Publicatie Instellingen"**
3. **Unpublish** of **"Niet publiceren"** de website
4. Dit maakt de website onzichtbaar, maar verwijdert hem niet volledig

### Alternatief: Contact GoDaddy Support

Als je de website niet kunt verwijderen:

1. Klik op **"Contact Us"** (onderaan links in de sidebar)
2. Of bel: **+31 20 261 4747**
3. Vraag om:
   - "Ik wil de website yannovabouw.godaddysites.com verwijderen"
   - "Account: Elza Nukhanova (Klantnummer: 649689844)"

## ⚠️ Belangrijk

- **Domein blijft behouden**: Het verwijderen van de website verwijdert NIET het domein `yannovabouw.be`
- **Email blijft werken**: Als je email gebruikt via yannovabouw.be, blijft dit werken
- **Redirects aanbevolen**: Stel redirects in naar yannova.be voor SEO

## ✅ Na Verwijdering

Test of de website weg is:

```bash
curl -I https://yannovabouw.be
```

Als je redirects hebt ingesteld, moet je een **301 redirect** zien naar `yannova.be`.

---

**Laatste Update**: 2025-01-27
**Interface**: GoDaddy Pro Sites

