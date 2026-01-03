# yannovabouw.be - Alles Verwijderen (Complete Gids)

## 🎯 Wat Je Wilt
- ✅ Website verwijderen
- ✅ Hosting verwijderen
- ✅ Alle services verwijderen
- ⚠️ **Domein**: Kies of je het domein ook wilt verwijderen of behouden voor redirects

## 📋 Complete Checklist

### Stap 1: Verwijder Website bij GoDaddy

#### Via GoDaddy Pro (Waar je nu bent)
1. **Log in op GoDaddy Pro**: https://hub.godaddy.com/sites
2. **Klik op** `yannovabouw.godaddysites.com`
3. **Zoek naar**:
   - Settings (⚙️) → Delete Site
   - Of drie puntjes (⋮) → Delete/Remove
   - Of Website Actions → Delete
4. **Bevestig verwijdering**

#### Via Normale GoDaddy Interface
1. **Ga naar**: https://www.godaddy.com/nl
2. **Log in** (Account: Elza Nukhanova, Klantnummer: 649689844)
3. **Klik op account menu** (rechtsboven) → **"Mijn producten"**
4. **Scroll naar "Websites + Marketing"**
5. **Zoek** `yannovabouw` → **Klik op "Beheren"**
6. **Settings** → **"Delete Website"** of **"Verwijder Website"**
7. **Bevestig verwijdering**

### Stap 2: Verwijder Hosting Account

1. **In "Mijn producten"**, zoek naar:
   - **"Webhosting"**
   - **"Managed WordPress"**
   - **"Managed Hosting"**
   - **"Website Builder"**

2. **Voor elk hosting account dat yannovabouw.be gebruikt**:
   - Klik op **"Beheren"** of **"Manage"**
   - Zoek naar **"Cancel"**, **"Delete"**, of **"Verwijderen"**
   - **OF** ga naar **"Account Settings"** → **"Cancel Subscription"**

3. **Bevestig annulering**

### Stap 3: Verwijder van Cloudflare (Als Applicable)

Als de website via Cloudflare wordt gehost:

1. **Log in op Cloudflare**: https://dash.cloudflare.com/
2. **Selecteer** `yannovabouw.be` (als het daar staat)
3. **Verwijder**:
   - **Pages**: Projects → Delete project
   - **Workers**: Workers → Delete worker
   - **DNS**: Verwijder alle records (behalve als je domein wilt behouden)

### Stap 4: Verwijder Email Accounts (Als Je Die Niet Meer Nodig Hebt)

1. **In GoDaddy "Mijn producten"**
2. **Zoek naar "Email"** of **"Microsoft 365"** of **"Workspace Email"**
3. **Voor elk email account** (bijv. info@yannovabouw.be):
   - Klik op **"Beheren"**
   - **Delete** of **"Verwijderen"** email account
   - **OF** annuleer het hele email plan

### Stap 5: Verwijder SSL Certificaten (Automatisch na hosting verwijdering)

SSL certificaten worden meestal automatisch verwijderd wanneer hosting wordt verwijderd.

### Stap 6: Domein - Kies Een Optie

**⚠️ BELANGRIJK**: Beslis wat je met het domein wilt doen:

#### Optie A: Domein Ook Verwijderen (Permanent!)
1. **In "Mijn producten"** → **"Domeinen"**
2. **Klik op** `yannovabouw.be`
3. **Settings** → **"Delete Domain"** of **"Verwijder Domein"**
4. **⚠️ WAARSCHUWING**: Dit is permanent! Je kunt het domein niet meer terughalen.

#### Optie B: Domein Behouden voor Redirects (Aanbevolen)
1. **In "Mijn producten"** → **"Domeinen"** → `yannovabouw.be`
2. **DNS Instellingen**:
   - Verwijder alle A records
   - Verwijder CNAME records die naar website wijzen
3. **Stel Redirects in**:
   - Scroll naar **"Forwarding"**
   - Forward from: `yannovabouw.be` → Forward to: `https://www.yannova.be`
   - Type: **Permanent (301)**
   - Herhaal voor `www.yannovabouw.be`

#### Optie C: Domein Behouden maar Niets Doen
- Laat het domein gewoon staan
- Het wijst nergens meer naar
- Je betaalt nog wel domein kosten

### Stap 7: Verwijder van Vercel (Als Applicable)

Als de website ook op Vercel staat:

1. **Log in op Vercel**: https://vercel.com/dashboard
2. **Zoek project** met `yannovabouw`
3. **Project Settings** → **"Delete Project"**
4. **Bevestig verwijdering**

### Stap 8: Verwijder DNS Records

1. **In GoDaddy "Mijn producten"** → **"Domeinen"** → `yannovabouw.be`
2. **Klik op "DNS"** of **"DNS beheren"**
3. **Verwijder alle records**:
   - A records
   - CNAME records (behalve als je redirects gebruikt)
   - MX records (als je email verwijdert)
   - TXT records (behalve verificatie records)

### Stap 9: Annuleer Abonnementen

1. **In "Mijn producten"**, check alle actieve abonnementen:
   - Website Builder abonnement
   - Hosting abonnement
   - Email abonnement
   - SSL certificaat abonnement
   - Andere services

2. **Voor elk abonnement**:
   - Klik op **"Beheren"**
   - **"Cancel Subscription"** of **"Abonnement opzeggen"**
   - Kies **"Cancel Immediately"** (niet aan einde van periode)

### Stap 10: Verwijder van GoDaddy Pro

1. **In GoDaddy Pro** (https://hub.godaddy.com/sites)
2. **Klik op** `yannovabouw.godaddysites.com`
3. **Delete Site** of **Remove Site**
4. **Bevestig**

## 🔍 Verificatie - Test Alles

Na verwijdering, test of alles weg is:

```bash
# Test website (moet 404 of redirect geven)
curl -I https://www.yannovabouw.be
curl -I https://yannovabouw.be

# Test DNS
dig yannovabouw.be A
dig www.yannovabouw.be A

# Test email (als je email verwijdert)
# Probeer te mailen naar info@yannovabouw.be (moet falen)
```

## 📞 GoDaddy Support (Als Je Het Niet Kunt Vinden)

Als je bepaalde items niet kunt vinden of verwijderen:

**Bel GoDaddy Support**: **+31 20 261 4747**

**Zeg tegen support**:
- "Ik wil alles verwijderen van yannovabouw.be"
- "Account: Elza Nukhanova"
- "Klantnummer: 649689844"
- "Ik wil verwijderen: website, hosting, email, alles"
- "Domein: [vertel of je het wilt behouden of verwijderen]"

**Of gebruik Live Chat**:
- https://www.godaddy.com/nl/help
- Klik op "Contact opnemen"

## ⚠️ Belangrijke Waarschuwingen

### Voordat Je Alles Verwijdert:

1. **Backup maken**: Download alle belangrijke bestanden/data
2. **Email exporteren**: Als je email gebruikt, exporteer belangrijke emails
3. **DNS records noteren**: Schrijf alle DNS records op (voor later gebruik)
4. **SSL certificaten**: Noteer SSL details (als je die later nodig hebt)

### Na Verwijdering:

1. **Domein verwijdering is permanent**: Je kunt het niet meer terughalen
2. **Email verwijdering**: Alle emails gaan verloren
3. **Website verwijdering**: Alle content gaat verloren
4. **SEO impact**: Als je geen redirects instelt, verlies je SEO waarde

## ✅ Aanbevolen Volgorde

1. ✅ Backup maken van alles
2. ✅ Website verwijderen
3. ✅ Hosting annuleren
4. ✅ Email verwijderen (als niet meer nodig)
5. ✅ DNS records aanpassen (redirects instellen OF alles verwijderen)
6. ✅ Domein beslissing (verwijderen OF behouden met redirects)
7. ✅ Abonnementen annuleren
8. ✅ Verificatie testen

## 📝 Wat Blijft Behouden (Als Je Domein Behoudt)

Als je het domein behoudt:
- ✅ Domein registratie (je betaalt nog wel jaarlijkse kosten)
- ✅ Mogelijkheid om later weer iets te koppelen
- ✅ Redirects naar nieuwe website (SEO behoud)

## 🗑️ Wat Wordt Volledig Verwijderd

- ❌ Website content
- ❌ Hosting account
- ❌ Email accounts (als je ze verwijdert)
- ❌ SSL certificaten (automatisch)
- ❌ Website bestanden
- ❌ Database (als applicable)
- ❌ Abonnementen (als je ze annuleert)
- ❌ Domein (alleen als je kiest voor verwijdering)

---

**Laatste Update**: 2025-01-27
**Status**: Complete verwijdering gids

