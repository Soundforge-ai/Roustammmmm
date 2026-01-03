# yannovabouw.be Verwijderen via Lovable.dev

## 🎯 Situatie
- Website wordt gehost via **Lovable.dev** (niet GoDaddy hosting)
- Domein `yannovabouw.be` is gekoppeld aan Lovable project
- Je wilt alles verwijderen

## 📝 Stappen om Website te Verwijderen via Lovable.dev

### Stap 1: Log in op Lovable.dev

1. **Ga naar**: https://lovable.dev/
2. **Log in** met je account
3. **Zoek** het project voor `yannovabouw.be`

### Stap 2: Unpublish Website (Tijdelijk Uitschakelen)

**Optie A: Via Project Settings**

1. **Open het project** voor yannovabouw.be
2. **Klik op "Settings"** of **"⚙️"** (tandwiel icoon)
3. **Zoek naar "Unpublish Project"** of **"Remove public access"**
4. **Klik op "Unpublish"**
5. Dit maakt de website onzichtbaar, maar verwijdert hem niet volledig

**Optie B: Via Project Menu**

1. **In je project lijst**, klik op **drie puntjes (⋮)** bij het project
2. **Zoek naar "Unpublish"** of **"Remove public access"**
3. **Klik erop**

### Stap 3: Verwijder Project Volledig

**Via Project Settings:**

1. **Open het project** voor yannovabouw.be
2. **Klik op "Settings"** of **"⚙️"**
3. **Scroll naar beneden** naar **"Delete Project"** of **"Remove Project"**
4. **Klik op "Delete"**
5. **Bevestig verwijdering** (type project naam om te bevestigen)

**Via Project Menu:**

1. **In je project lijst**, klik op **drie puntjes (⋮)** bij het project
2. **Zoek naar "Delete"** of **"Remove"**
3. **Klik erop en bevestig**

### Stap 4: Verwijder Custom Domain Koppeling

**Als je het domein wilt ontkoppelen:**

1. **In Project Settings** → **"Domains"** of **"Custom Domain"**
2. **Zoek** `yannovabouw.be` in de lijst
3. **Klik op "Remove"** of **"Unlink"** naast het domein
4. **Bevestig ontkoppeling**

**⚠️ Belangrijk**: Dit ontkoppelt alleen het domein van Lovable. Het domein blijft bestaan bij GoDaddy.

### Stap 5: Verwijder Account (Als Je Alles Wilt Verwijderen)

**Als je je hele Lovable account wilt verwijderen:**

1. **Ga naar**: Settings → Your Account
2. **Scroll naar beneden**
3. **Klik op "Delete account"**
4. **⚠️ WAARSCHUWING**: Dit verwijdert permanent:
   - Alle projecten
   - Alle data
   - Account informatie
5. **Bevestig verwijdering**

## 🔍 Als Je Het Project Niet Kunt Vinden

### Check Project Lijst

1. **Log in op Lovable.dev**
2. **Kijk in je project dashboard**
3. **Zoek** naar projecten met:
   - `yannovabouw`
   - `yannova`
   - Of check alle projecten

### Check Email

1. **Zoek in je email** naar:
   - Lovable.dev emails
   - Project creation emails
   - Domain setup emails
2. **Klik op links** in emails om direct naar project te gaan

### Contact Lovable Support

Als je het project niet kunt vinden:

1. **Email**: support@lovable.dev (of check hun website voor contact)
2. **Vraag**: "Ik wil het project voor yannovabouw.be verwijderen"
3. **Geef**: Je account email en project naam

## 🌐 Domein Ontkoppelen van Lovable

Na het verwijderen van het project, moet je het domein ontkoppelen:

### Via Lovable (Als Project Nog Bestaat)

1. **Project Settings** → **"Domains"**
2. **Remove** `yannovabouw.be`

### Via GoDaddy DNS

1. **Log in op GoDaddy**: https://www.godaddy.com/nl
2. **Mijn producten** → **Domeinen** → **yannovabouw.be**
3. **DNS** → **Records**
4. **Verwijder of wijzig**:
   - CNAME records die naar Lovable wijzen
   - A records die naar Lovable IP wijzen

## 📋 Complete Checklist

- [ ] Log in op Lovable.dev
- [ ] Vind project voor yannovabouw.be
- [ ] Unpublish website (tijdelijk uitschakelen)
- [ ] Delete project volledig
- [ ] Remove custom domain koppeling
- [ ] (Optioneel) Delete Lovable account
- [ ] Ontkoppel domein via GoDaddy DNS
- [ ] Test: `curl -I https://yannovabouw.be`

## ⚠️ Belangrijk

### Wat Wordt Verwijderd
- ✅ Website content
- ✅ Project data
- ✅ Deployment history
- ✅ Custom domain koppeling

### Wat Blijft Behouden
- ✅ Domein registratie (bij GoDaddy)
- ✅ DNS records (moet je handmatig aanpassen)
- ✅ Email accounts (als je die hebt)

## 🔄 Na Verwijdering

### Optie A: Domein Verwijderen (Permanent)

1. **GoDaddy** → **Mijn producten** → **Domeinen** → **yannovabouw.be**
2. **Settings** → **Delete Domain**
3. **⚠️ PERMANENT!**

### Optie B: Domein Behouden met Redirects

1. **GoDaddy** → **Mijn producten** → **Domeinen** → **yannovabouw.be**
2. **DNS** → **Forwarding**
3. **Forward to**: `https://www.yannova.be`
4. **Type**: Permanent (301)

## 🆘 Hulp Nodig?

**Lovable Support**:
- **Website**: https://lovable.dev/
- **Documentatie**: https://docs.lovable.dev/
- **Email**: Check hun website voor support email

**GoDaddy Support** (voor domein):
- **Telefoon**: +31 20 261 4747
- **Account**: Elza Nukhanova (649689844)

---

**Laatste Update**: 2025-01-27
**Hosting**: Lovable.dev

