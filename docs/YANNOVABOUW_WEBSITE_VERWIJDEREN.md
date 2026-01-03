# yannovabouw.be Website Verwijderen - Domein Behouden

## 📋 Situatie

De website `yannovabouw.be` is nog actief en toont een volledige website. Je wilt:
- ✅ De website verwijderen
- ✅ Het domein behouden (voor redirects naar yannova.be)

## 🔍 Huidige Status

- **Domein**: yannovabouw.be
- **IP Adres**: 185.158.133.1
- **Status**: Website is nog actief (HTTP 200)
- **Domein Registrar**: GoDaddy (name servers: ns63.domaincontrol.com, ns64.domaincontrol.com)
- **Hosting**: Via Cloudflare (achterliggende hosting waarschijnlijk bij GoDaddy)

## 📝 Stappenplan

### Stap 1: Bepaal Waar de Website Wordt Gehost

✅ **Bevestigd**: Het domein wordt beheerd door **GoDaddy** (name servers: ns63.domaincontrol.com, ns64.domaincontrol.com)

De website kan worden gehost bij:
- **GoDaddy Webhosting** (meest waarschijnlijk)
- **Cloudflare Pages/Workers** (via GoDaddy DNS)
- **Andere hosting provider** (via DNS records)

**Check dit door:**
1. Log in op je GoDaddy account
2. Ga naar "Mijn producten" → "Webhosting"
3. Check of er een hosting account is voor yannovabouw.be

### Stap 2: Verwijder Website bij Hosting Provider

#### Optie A: Als Hosting bij GoDaddy is

1. **Log in op GoDaddy**
   - Ga naar: https://www.godaddy.com/nl
   - Account: Elza Nukhanova (Klantnummer: 649689844)

2. **Ga naar Webhosting**
   - Klik op "Mijn producten"
   - Zoek naar "Webhosting" of "Website Builder"
   - Selecteer het hosting account voor yannovabouw.be

3. **Verwijder Website Bestanden**
   - Ga naar "File Manager" of "FTP"
   - Verwijder alle bestanden in de `public_html` of `www` folder
   - **OF** verwijder alle inhoud behalve een lege `index.html`

4. **Maak Lege Index Pagina (Optioneel)**
   Als je wilt dat het domein een lege pagina toont:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <title>yannovabouw.be</title>
   </head>
   <body>
   </body>
   </html>
   ```

#### Optie B: Als Hosting bij Andere Provider is

1. Log in op je hosting control panel
2. Verwijder alle website bestanden
3. Of maak een lege index.html

#### Optie C: Via FTP

Als je FTP toegang hebt:

```bash
# Connect via FTP en verwijder alle bestanden
# Of gebruik een FTP client zoals FileZilla
```

### Stap 3: Configureer Domein voor Redirects (Aanbevolen)

In plaats van een lege pagina, kun je het domein laten redirecten naar yannova.be:

#### Via GoDaddy DNS Forwarding

1. **Log in op GoDaddy**
2. **Ga naar DNS Instellingen**
   - Mijn producten → Domeinen → yannovabouw.be → DNS
3. **Verwijder A Records** (als die er zijn)
4. **Voeg Forwarding toe**
   - Scroll naar "Forwarding" sectie
   - Klik op "Toevoegen"
   - Forward from: `yannovabouw.be`
   - Forward to: `https://www.yannova.be`
   - Type: Permanent (301)
   - Herhaal voor `www.yannovabouw.be`

#### Via Cloudflare (als domein bij Cloudflare is)

1. **Log in op Cloudflare**
   - https://dash.cloudflare.com/
2. **Selecteer yannovabouw.be**
3. **Ga naar Rules → Redirect Rules**
4. **Maak redirect rule:**
   - Match: `(http.host eq "yannovabouw.be") or (http.host eq "www.yannovabouw.be")`
   - Action: 301 Permanent Redirect
   - Destination: `https://www.yannova.be/$1`

### Stap 4: Verwijder Website van Vercel (als die daar staat)

Als de website ook op Vercel staat:

1. **Check Vercel Dashboard**
   - https://vercel.com/dashboard
   - Zoek naar project met yannovabouw.be
2. **Verwijder Project** (als je het niet meer nodig hebt)
   - Of verwijder het domein uit het project

**Let op**: De redirects in `vercel.json` moeten blijven staan als je het domein op Vercel wilt gebruiken voor redirects.

### Stap 5: Verificatie

Na het verwijderen, test:

```bash
# Test of website weg is
curl -I https://yannovabouw.be

# Test redirect (als je redirects hebt ingesteld)
curl -I https://yannovabouw.be
# Moet 301 redirect geven naar yannova.be
```

## ⚠️ Belangrijke Overwegingen

### SEO Impact
- Als je de website verwijdert zonder redirects, verlies je mogelijk SEO waarde
- **Aanbevolen**: Gebruik 301 redirects naar yannova.be

### Email Accounts
- Als je email gebruikt via yannovabouw.be (bijv. info@yannovabouw.be), blijft dit werken
- Email is onafhankelijk van website hosting

### SSL Certificaat
- SSL certificaat blijft werken zolang het domein actief is
- Bij redirects via GoDaddy/Cloudflare wordt SSL automatisch afgehandeld

## 🔄 Alternatief: Alleen Redirects (Aanbevolen)

In plaats van de website volledig verwijderen, kun je:

1. **Verwijder alle website bestanden**
2. **Stel alleen redirects in** (via DNS Forwarding of Cloudflare)
3. **Domein blijft actief** maar toont alleen redirects

Dit is beter voor:
- ✅ SEO (301 redirects behouden link waarde)
- ✅ Gebruikers die oude links hebben
- ✅ Google indexing

## 📞 Hulp Nodig?

Als je niet zeker weet waar de website wordt gehost:

1. **Check GoDaddy Account**
   - Log in en check "Mijn producten"
   - Zoek naar hosting, website builder, of domein instellingen

2. **Check DNS Records**
   ```bash
   dig yannovabouw.be A
   dig yannovabouw.be NS
   ```

3. **Contact Hosting Provider**
   - Als je niet weet waar het wordt gehost, contact de provider van IP 185.158.133.1

## ✅ Checklist

- [ ] Bepaal waar website wordt gehost
- [ ] Verwijder website bestanden bij hosting provider
- [ ] Stel redirects in (aanbevolen) of maak lege pagina
- [ ] Test of website weg is
- [ ] Test redirects (als ingesteld)
- [ ] Verwijder project van Vercel (als van toepassing)
- [ ] Update documentatie (verwijder oude referenties)

---

**Laatste Update**: 2025-01-27
**Status**: Website verwijderen, domein behouden voor redirects

