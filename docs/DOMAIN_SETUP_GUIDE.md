# Domein Setup Gids - yannova.be

## 📋 Situatie

Het domein `yannova.be` is momenteel gekoppeld aan een ander Vercel account/project en toont een onderhoudspagina. We moeten het domein verifiëren en toevoegen aan het huidige Vercel project.

## 🎯 Doel

- Domein `yannova.be` toevoegen aan Vercel project: `roustamyandiev9-gmailcoms-projects/yannova`
- Domein `www.yannova.be` toevoegen aan hetzelfde project
- De onderhoudspagina vervangen door de nieuwe deployment

## 📝 Stappen

### Stap 1: Ga naar Vercel Dashboard

1. Open: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains
2. Of ga naar: Vercel Dashboard → Project `yannova` → Settings → Domains

### Stap 2: Voeg domein toe

1. Klik op **"Add Domain"** knop
2. Voer in: `yannova.be`
3. Klik op **"Add"**

### Stap 3: Verificatie TXT Record

Vercel zal een verificatie TXT record tonen. Het ziet er zo uit:
```
vc-domain-verify=yannova.be,XXXXXXXXXXXXX
```

**Kopieer deze volledige waarde!**

### Stap 4: Voeg TXT record toe in Cloudflare

1. **Log in op Cloudflare**
   - Ga naar: https://dash.cloudflare.com/
   - Selecteer het account waar `yannova.be` staat

2. **Selecteer het domein**
   - Klik op `yannova.be` in je dashboard

3. **Ga naar DNS instellingen**
   - Klik op **DNS** in de linker navigatie
   - Klik op **Records**

4. **Verwijder oude TXT record (als die er is)**
   - Zoek naar een TXT record met Name: `_vercel`
   - Als deze bestaat en van een ander account is, verwijder deze eerst

5. **Voeg nieuw TXT record toe**
   - Klik op **Add record**
   - Vul in:
     - **Type**: `TXT`
     - **Name**: `_vercel` (alleen `_vercel`, niet `_vercel.yannova.be`)
     - **Content/Value**: Plak de volledige waarde die je hebt gekopieerd uit Vercel
     - **TTL**: `Auto` of `3600`
     - **Proxy status**: Zorg dat de wolk **grijs** is (DNS only), niet oranje (proxied)
   - Klik op **Save**

### Stap 5: Wacht op DNS propagatie

- DNS wijzigingen kunnen 1-15 minuten duren om te propageren
- Soms kan het langer duren (tot 24 uur, maar meestal veel sneller)

### Stap 6: Verifieer in Vercel

1. Ga terug naar het Vercel Dashboard
2. Klik op **"Refresh"** naast het domein `yannova.be`
3. Als de verificatie succesvol is, zie je een groene checkmark ✅

### Stap 7: Herhaal voor www.yannova.be

Herhaal stappen 2-6 voor `www.yannova.be`:
- Voeg `www.yannova.be` toe in Vercel
- Voeg een nieuw TXT record toe in Cloudflare (of update het bestaande)
- Verifieer in Vercel

### Stap 8: Controleer DNS Records

Na verificatie moeten de volgende DNS records correct zijn:

**Voor yannova.be:**
- A record: `76.76.21.21` (of Vercel IP)
- Of CNAME naar Vercel (als Vercel dat aangeeft)

**Voor www.yannova.be:**
- CNAME: `a41093cb64c5c9a2.vercel-dns-017.com.` (of nieuwe Vercel waarde)

### Stap 9: Redeploy (via CLI)

Zodra het domein is geverifieerd, redeploy de website. Je kunt dit handmatig doen of het automatische script gebruiken:

**Optie 1: Automatisch script (aanbevolen)**
```bash
./scripts/setup-vercel-domain-cli.sh
```

Dit script:
- Controleert DNS verificatie status
- Voegt het domein toe zodra het beschikbaar is
- Build en deployt automatisch naar productie

**Optie 2: Handmatig**
```bash
npm run build
vercel --prod
```

## 🔍 Controleren of het werkt

### Controleer TXT record:
```bash
dig +short TXT _vercel.yannova.be
```

Je zou de verificatiewaarde moeten zien.

### Controleer of domein werkt:
```bash
curl -I https://yannova.be
```

Je zou `server: Vercel` moeten zien in de headers.

### Gebruik de verificatie scripts:

**Status check (alleen controleren):**
```bash
./scripts/check-vercel-domain-status.sh
```

**Volledige setup (automatisch):**
```bash
./scripts/setup-vercel-domain-cli.sh
```

**DNS verificatie check:**
```bash
./scripts/verify-vercel-domain.sh
```

## ⚠️ Belangrijke opmerkingen

- **Proxy status**: Het TXT record moet **DNS only** zijn (grijze wolk), niet geproxied (oranje wolk)
- **Name veld**: Gebruik alleen `_vercel`, niet `_vercel.yannova.be` (Cloudflare voegt automatisch het domein toe)
- **Volledige waarde**: Zorg dat je de **volledige** verificatiewaarde kopieert, inclusief alles na de komma
- **Oude records**: Verwijder oude TXT records van andere Vercel accounts voordat je nieuwe toevoegt

## 🐛 Problemen oplossen

### "Not authorized to use yannova.be (403)"
- Het domein is gekoppeld aan een ander Vercel account
- Volg de verificatiestappen hierboven
- Als het domein al in gebruik is bij een ander account, moet je het eerst daar verwijderen

### Het TXT record wordt niet gevonden
- Wacht 5-10 minuten en probeer opnieuw
- Controleer of de proxy status op "DNS only" staat
- Verifieer dat de Name exact `_vercel` is
- Controleer of je de volledige waarde hebt gekopieerd

### Vercel toont nog steeds "Verification Needed"
- Klik op **Refresh** in Vercel
- Wacht nog een paar minuten
- Controleer of het TXT record correct is met: `dig +short TXT _vercel.yannova.be`
- Zorg dat er geen oude TXT records zijn die conflicteren

### Het domein werkt niet na verificatie
- Controleer of de DNS records correct zijn gepropageerd
- Controleer of het CNAME record voor `www.yannova.be` correct is
- Zorg dat de deployment succesvol is: `vercel --prod`
- Controleer of er geen conflicterende records zijn in Cloudflare

### Onderhoudspagina wordt nog steeds getoond
- Dit betekent dat het domein nog naar een oude deployment wijst
- Zorg dat het domein is geverifieerd en gekoppeld aan het juiste project
- Redeploy de website: `npm run build && vercel --prod`
- Controleer in Vercel Dashboard welke deployment actief is

## 🚀 CLI Alternatief

Als je liever alles via de command line doet:

1. **Check huidige status:**
   ```bash
   ./scripts/check-vercel-domain-status.sh
   ```

2. **Voeg domein toe en deploy (automatisch):**
   ```bash
   ./scripts/setup-vercel-domain-cli.sh
   ```

Het script controleert automatisch of het domein kan worden toegevoegd en deployt daarna automatisch.

## 📞 Hulp nodig?

Als het na 30 minuten nog steeds niet werkt:
1. Controleer de DNS records met: `./scripts/check-vercel-domain-status.sh`
2. Neem contact op met Vercel support
3. Controleer of er geen conflicterende records zijn in Cloudflare
4. Verifieer dat het domein is gekoppeld aan het juiste Vercel project

## 🔗 Handige Links

- [Vercel Dashboard - Domains](https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)

