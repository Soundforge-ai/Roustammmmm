# yannovabouw.be Verwijderen - Stap voor Stap

## 🎯 Je bent nu hier:
- **GoDaddy Pro** → **Sites** → Je ziet `yannovabouw.godaddysites.com`

## 📸 Stap-voor-Stap Instructies

### Stap 1: Klik op de Website

1. **Klik direct op** `yannovabouw.godaddysites.com` (de tekst zelf, niet de checkbox)
2. Dit opent de website details pagina

### Stap 2: Zoek naar Delete/Verwijderen

Op de website details pagina, zoek naar:

**Optie A: Settings Menu**
- Klik op **"Settings"** of **"Instellingen"** (tandwiel icoon)
- Scroll naar beneden
- Zoek naar **"Delete Site"**, **"Remove Site"**, of **"Website Verwijderen"**

**Optie B: Website Menu**
- Kijk rechtsboven op de pagina
- Zoek naar een **drie puntjes menu (⋮)** of **"More"** knop
- Klik erop en zoek naar **"Delete"**

**Optie C: Website Status**
- Zoek naar **"Publish"** of **"Unpublish"** knop
- Klik op **"Unpublish"** om de website offline te halen
- Dit is een tijdelijke oplossing

### Stap 3: Als je het niet kunt vinden

**Ga naar de normale GoDaddy interface:**

1. **Log uit van GoDaddy Pro** (of open een nieuw tabblad)
2. **Ga naar**: https://www.godaddy.com/nl
3. **Log in** met hetzelfde account
4. **Klik op je account menu** (rechtsboven, je naam/avatar)
5. **Klik op "Mijn producten"**
6. **Zoek naar "Websites"** of **"Website Builder"**
7. **Zoek** `yannovabouw` in de lijst
8. **Klik erop** en zoek naar **"Verwijderen"** of **"Delete"**

### Stap 4: Via GoDaddy Support (Als niets werkt)

Als je de website nergens kunt verwijderen:

1. **Klik op "Contact Us"** (onderaan links in GoDaddy Pro sidebar)
2. **Of bel direct**: +31 20 261 4747
3. **Zeg tegen support**:
   - "Ik wil de website yannovabouw.godaddysites.com verwijderen"
   - "Account: Elza Nukhanova"
   - "Klantnummer: 649689844"

## 🔄 Alternatief: Website Uitschakelen (Tijdelijk)

Als verwijderen niet lukt, kun je de website tijdelijk uitschakelen:

1. Klik op `yannovabouw.godaddysites.com`
2. Zoek naar **"Publish"** of **"Publiceren"** instellingen
3. Klik op **"Unpublish"** of **"Niet publiceren"**
4. Dit maakt de website onzichtbaar voor bezoekers

## ⚠️ Belangrijk: Domein Ontkoppelen

Na het verwijderen van de website:

1. **Ga naar GoDaddy Domeinen** (niet Pro)
   - https://www.godaddy.com/nl
   - Mijn producten → Domeinen → yannovabouw.be

2. **DNS Instellingen**
   - Klik op yannovabouw.be
   - Klik op "DNS" of "DNS beheren"
   - Verwijder A records die naar de website wijzen

3. **Stel Redirects in** (Aanbevolen)
   - Scroll naar "Forwarding"
   - Forward to: `https://www.yannova.be`
   - Type: Permanent (301)

## ✅ Test na Verwijdering

```bash
curl -I https://yannovabouw.be
```

Moet een 301 redirect geven naar yannova.be (als je redirects hebt ingesteld).

---

**Probleem?** Bel GoDaddy support: +31 20 261 4747

