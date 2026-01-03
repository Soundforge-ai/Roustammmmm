# www.yannovabouw.be Verwijderen - Exacte Stappen

## 🎯 Je Situatie
- Je bent in **GoDaddy Pro** → **Sites**
- Je ziet: `yannovabouw.godaddysites.com`
- Je wilt: `www.yannovabouw.be` verwijderen

## 📝 Exacte Stappen (Volg Deze Precies)

### Methode 1: Via GoDaddy Pro Sites (Aanbevolen)

#### Stap 1: Klik op de Website
1. In de **Sites** lijst, klik op **`yannovabouw.godaddysites.com`**
   - Klik op de naam zelf (niet de checkbox)

#### Stap 2: Zoek Delete/Remove Optie
Op de website detail pagina:

**Optie A: Settings Menu**
- Kijk rechtsboven of links voor een **"Settings"** of **"⚙️"** (tandwiel) icoon
- Klik erop
- Scroll naar beneden
- Zoek naar **"Delete Site"**, **"Remove Site"**, of **"Verwijder Website"**

**Optie B: Drie Puntjes Menu**
- Kijk rechtsboven voor **"⋮"** (drie puntjes) of **"More"** knop
- Klik erop
- Zoek naar **"Delete"**, **"Remove"**, of **"Verwijderen"**

**Optie C: Website Actions**
- Kijk boven de website preview voor knoppen zoals:
  - **"Delete"**
  - **"Remove"**
  - **"Unpublish"** (tijdelijk uitschakelen)

### Methode 2: Via Normale GoDaddy Interface (Als Pro niet werkt)

#### Stap 1: Ga naar Normale GoDaddy
1. **Open nieuw tabblad** of **log uit van GoDaddy Pro**
2. **Ga naar**: https://www.godaddy.com/nl
3. **Log in** met hetzelfde account

#### Stap 2: Ga naar Mijn Producten
1. **Klik op je account menu** (rechtsboven, je naam/avatar)
2. **Klik op "Mijn producten"** of **"My Products"**

#### Stap 3: Zoek Website
1. **Scroll naar beneden** naar **"Websites + Marketing"** sectie
2. **Zoek** `yannovabouw` in de lijst
3. **Klik op "Beheren"** of **"Manage"** naast de website

#### Stap 4: Verwijder Website
1. In de website editor, kijk naar:
   - **"Settings"** menu (links of rechts)
   - **"Website Settings"** of **"Site Settings"**
2. Scroll naar beneden naar **"Delete Website"** of **"Verwijder Website"**
3. Klik erop en bevestig

### Methode 3: Via GoDaddy Managed WordPress (Als het WordPress is)

Als de website een Managed WordPress site is:

1. **Ga naar Mijn Producten**
2. **Zoek naar "Managed WordPress"** of **"Managed Hosting for WordPress"**
3. **Klik op "Manage All"** of **"Beheer Alles"**
4. **Zoek** `yannovabouw` in de lijst
5. **Klik op "⋮"** (drie puntjes) rechts bij de website
6. **Selecteer "Remove"** of **"Verwijderen"**
7. **Type "Remove"** om te bevestigen
8. **Klik op "Remove"** opnieuw

### Methode 4: Via GoDaddy Support (Als Niets Werkt)

Als je de website nergens kunt vinden of verwijderen:

1. **Bel GoDaddy Support**: **+31 20 261 4747**
2. **Zeg tegen support**:
   - "Ik wil de website www.yannovabouw.be verwijderen"
   - "Account: Elza Nukhanova"
   - "Klantnummer: 649689844"
   - "Ik zie yannovabouw.godaddysites.com in GoDaddy Pro maar kan het niet verwijderen"

3. **Of gebruik Live Chat**:
   - Ga naar: https://www.godaddy.com/nl/help
   - Klik op **"Contact opnemen"** of **"Live Chat"**
   - Vraag om website verwijdering

## 🔍 Waar Zoeken in GoDaddy Pro

Als je in GoDaddy Pro bent, zoek op deze plaatsen:

1. **Sites → Sites List**
   - Klik op `yannovabouw.godaddysites.com`
   - Kijk in de website detail pagina

2. **Sites → Overview**
   - Check of er een delete optie is

3. **All Products**
   - Klik op "All Products" in de sidebar
   - Zoek naar "Websites" of "Website Builder"
   - Zoek `yannovabouw`

## ⚠️ Belangrijk: Domein Ontkoppelen

Na het verwijderen van de website:

1. **Ga naar GoDaddy Domeinen**:
   - https://www.godaddy.com/nl
   - Mijn producten → Domeinen → yannovabouw.be

2. **DNS Instellingen**:
   - Klik op **yannovabouw.be**
   - Klik op **"DNS"** of **"DNS beheren"**
   - Verwijder A records die naar de website wijzen

3. **Stel Redirects in** (Aanbevolen):
   - Scroll naar **"Forwarding"** sectie
   - Klik op **"Toevoegen"**
   - Forward from: `yannovabouw.be`
   - Forward to: `https://www.yannova.be`
   - Type: **Permanent (301)**
   - Herhaal voor `www.yannovabouw.be`

## ✅ Test na Verwijdering

```bash
curl -I https://www.yannovabouw.be
```

Moet een **301 redirect** geven naar `yannova.be` (als je redirects hebt ingesteld).

## 🆘 Als Je Het Nog Steeds Niet Kunt Vinden

**Mogelijke redenen:**
1. Website staat in een ander GoDaddy account
2. Website wordt beheerd door iemand anders
3. Website is al verwijderd maar DNS wijst nog naar oude locatie

**Oplossing:**
- Bel GoDaddy support: **+31 20 261 4747**
- Vraag om alle websites te zien die gekoppeld zijn aan account 649689844
- Vraag om `yannovabouw.be` te verwijderen

---

**Laatste Update**: 2025-01-27
**Interface**: GoDaddy Pro Sites + Normale GoDaddy Interface

