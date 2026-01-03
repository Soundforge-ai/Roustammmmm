# Domein Setup Gids - yannovabouw.be

## 📋 Situatie

Het domein `yannovabouw.be` moet worden toegevoegd aan het Vercel project zodat de website ook op dit domein beschikbaar is. De redirects zijn verwijderd uit `vercel.json`.

## 🎯 Doel

- Domein `yannovabouw.be` toevoegen aan Vercel project: `roustamyandiev9-gmailcoms-projects/yannova`
- Domein `www.yannovabouw.be` toevoegen aan hetzelfde project
- Dezelfde website beschikbaar maken op beide domeinen (yannova.be en yannovabouw.be)

## 📝 Stappen

### Stap 1: Ga naar Vercel Dashboard

1. Open: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains
2. Of ga naar: Vercel Dashboard → Project `yannova` → Settings → Domains

### Stap 2: Voeg domein toe

1. Klik op **"Add Domain"** knop
2. Voer in: `yannovabouw.be`
3. Klik op **"Add"**

### Stap 3: Verificatie TXT Record

Vercel zal een verificatie TXT record tonen. Het ziet er zo uit:
```
vc-domain-verify=yannovabouw.be,XXXXXXXXXXXXX
```

**Kopieer deze volledige waarde!**

### Stap 4: Voeg TXT record toe in DNS (GoDaddy of Cloudflare)

**Als het domein bij GoDaddy staat:**

1. **Log in op GoDaddy**
   - Ga naar: https://www.godaddy.com/nl
   - Account: Elza Nukhanova (Klantnummer: 649689844)

2. **Selecteer het domein**
   - Ga naar "Mijn producten" → "Domeinen" → `yannovabouw.be`
   - Klik op `yannovabouw.be`

3. **Ga naar DNS instellingen**
   - Klik op **DNS** of **DNS Records**

4. **Verwijder oude TXT record (als die er is)**
   - Zoek naar een TXT record met Name: `_vercel`
   - Als deze bestaat, verwijder deze eerst

5. **Voeg nieuw TXT record toe**
   - Klik op **Add** of **Toevoegen**
   - Vul in:
     - **Type**: `TXT`
     - **Name**: `_vercel` (alleen `_vercel`, niet `_vercel.yannovabouw.be`)
     - **Value/Content**: Plak de volledige waarde die je hebt gekopieerd uit Vercel
     - **TTL**: `600` of `3600`
   - Klik op **Save** of **Opslaan**

**Als het domein bij Cloudflare staat:**

1. **Log in op Cloudflare**
   - Ga naar: https://dash.cloudflare.com/
   - Selecteer het account waar `yannovabouw.be` staat

2. **Selecteer het domein**
   - Klik op `yannovabouw.be` in je dashboard

3. **Ga naar DNS instellingen**
   - Klik op **DNS** in de linker navigatie
   - Klik op **Records**

4. **Verwijder oude TXT record (als die er is)**
   - Zoek naar een TXT record met Name: `_vercel`
   - Als deze bestaat, verwijder deze eerst

5. **Voeg nieuw TXT record toe**
   - Klik op **Add record**
   - Vul in:
     - **Type**: `TXT`
     - **Name**: `_vercel` (alleen `_vercel`, niet `_vercel.yannovabouw.be`)
     - **Content/Value**: Plak de volledige waarde die je hebt gekopieerd uit Vercel
     - **TTL**: `Auto` of `3600`
     - **Proxy status**: Zorg dat de wolk **grijs** is (DNS only), niet oranje (proxied)
   - Klik op **Save**

### Stap 5: Wacht op DNS propagatie

- DNS wijzigingen kunnen 1-15 minuten duren om te propageren
- Soms kan het langer duren (tot 24 uur, maar meestal veel sneller)

### Stap 6: Verifieer in Vercel

1. Ga terug naar het Vercel Dashboard
2. Klik op **"Refresh"** naast het domein `yannovabouw.be`
3. Als de verificatie succesvol is, zie je een groene checkmark ✅

### Stap 7: Herhaal voor www.yannovabouw.be

Herhaal stappen 2-6 voor `www.yannovabouw.be`:
- Voeg `www.yannovabouw.be` toe in Vercel
- Voeg een nieuw TXT record toe in DNS (of update het bestaande)
- Verifieer in Vercel

### Stap 8: Controleer DNS Records

Na verificatie moeten de volgende DNS records correct zijn:

**Voor yannovabouw.be:**
- A record: Vercel IP (zoals aangegeven door Vercel)
- Of CNAME naar Vercel (als Vercel dat aangeeft)

**Voor www.yannovabouw.be:**
- CNAME: Vercel CNAME waarde (zoals aangegeven door Vercel)

### Stap 9: Redeploy

Zodra het domein is geverifieerd, redeploy de website:

**Optie 1: Automatisch script (aanbevolen)**
```bash
./scripts/add-vercel-domain-yannovabouw.sh
```

**Optie 2: Handmatig**
```bash
npm run build
vercel --prod
```

## 🔍 Controleren of het werkt

### Controleer TXT record:
```bash
dig +short TXT _vercel.yannovabouw.be
```

Je zou de verificatiewaarde moeten zien.

### Controleer of domein werkt:
```bash
curl -I https://yannovabouw.be
```

Je zou `server: Vercel` moeten zien in de headers.

### Gebruik het setup script:
```bash
./scripts/add-vercel-domain-yannovabouw.sh
```

## ⚠️ Belangrijke opmerkingen

- **Proxy status** (Cloudflare): Het TXT record moet **DNS only** zijn (grijze wolk), niet geproxied (oranje wolk)
- **Name veld**: Gebruik alleen `_vercel`, niet `_vercel.yannovabouw.be` (DNS providers voegen automatisch het domein toe)
- **Volledige waarde**: Zorg dat je de **volledige** verificatiewaarde kopieert, inclusief alles na de komma
- **Oude records**: Verwijder oude TXT records van andere accounts voordat je nieuwe toevoegt

## 🐛 Problemen oplossen

### "Not authorized to use yannovabouw.be (403)"
- Het domein is gekoppeld aan een ander Vercel account
- Volg de verificatiestappen hierboven
- Als het domein al in gebruik is bij een ander account, moet je het eerst daar verwijderen

### Het TXT record wordt niet gevonden
- Wacht 5-10 minuten en probeer opnieuw
- Controleer of de proxy status op "DNS only" staat (Cloudflare)
- Verifieer dat de Name exact `_vercel` is
- Controleer of je de volledige waarde hebt gekopieerd

### Vercel toont nog steeds "Verification Needed"
- Klik op **Refresh** in Vercel
- Wacht nog een paar minuten
- Controleer of het TXT record correct is met: `dig +short TXT _vercel.yannovabouw.be`
- Zorg dat er geen oude TXT records zijn die conflicteren

### Het domein werkt niet na verificatie
- Controleer of de DNS records correct zijn gepropageerd
- Controleer of het CNAME record voor `www.yannovabouw.be` correct is
- Zorg dat de deployment succesvol is: `vercel --prod`
- Controleer of er geen conflicterende records zijn in DNS

## 🚀 CLI Alternatief

Gebruik het automatische script:

```bash
./scripts/add-vercel-domain-yannovabouw.sh
```

Het script controleert automatisch of het domein kan worden toegevoegd en geeft instructies.

## 📞 Hulp nodig?

Als het na 30 minuten nog steeds niet werkt:
1. Controleer de DNS records met: `dig +short TXT _vercel.yannovabouw.be`
2. Neem contact op met Vercel support
3. Controleer of er geen conflicterende records zijn in DNS
4. Verifieer dat het domein is gekoppeld aan het juiste Vercel project

## 🔗 Handige Links

- [Vercel Dashboard - Domains](https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains)
- [GoDaddy DNS](https://www.godaddy.com/nl)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)

---

**Laatste Update**: 2025-01-27

