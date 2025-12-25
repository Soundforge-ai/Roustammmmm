# Fix: Meerdere _vercel TXT Records

## ❌ Probleem

Er zijn **meerdere `_vercel` TXT records** in Cloudflare, wat verwarring veroorzaakt voor Vercel verificatie.

## ✅ Oplossing: Verwijder oude records en voeg één nieuwe toe

### Stap 1: Verwijder ALLE oude `_vercel` TXT records

1. Ga naar Cloudflare: https://dash.cloudflare.com/
2. Selecteer domein: `yannova.be`
3. Ga naar: **DNS → Records**
4. Zoek alle records met:
   - **Type**: `TXT`
   - **Name**: `_vercel`
5. Voor elk `_vercel` TXT record:
   - Klik op **"Edit"**
   - Klik op **"Delete"** (onderaan)
   - Bevestig de verwijdering

### Stap 2: Haal de NIEUWE verificatiecode op van Vercel

1. Ga naar: https://vercel.com/roustamyandiev9-gmailcoms-projects/yannova/settings/domains
2. Klik op **"Edit"** naast `www.yannova.be`
3. Scroll naar beneden naar **"Domain Verification"**
4. Kopieer de volledige **"Value"** waarde
   - Bijvoorbeeld: `vc-domain-verify=www.yannova.be,XXXXXXXXXXXXX`

### Stap 3: Voeg EEN nieuwe `_vercel` TXT record toe

1. In Cloudflare, klik op **"Add record"**
2. Vul in:
   - **Type**: `TXT`
   - **Name**: `_vercel` (alleen `_vercel`, niet `_vercel.yannova.be`)
   - **Content**: Plak de volledige waarde die je hebt gekopieerd uit Vercel
   - **TTL**: `Auto`
   - **Proxy status**: Zorg dat de wolk **grijs** is (DNS only), niet oranje
3. Klik op **"Save"**

### Stap 4: Verifieer in Vercel

1. Wacht 2-3 minuten voor DNS propagatie
2. Ga terug naar Vercel Dashboard
3. Klik op **"Refresh"** naast `www.yannova.be`
4. De status zou moeten veranderen naar **"Valid Configuration"** ✅

## ⚠️ Belangrijk

- **Verwijder ALLE oude `_vercel` records eerst**
- **Voeg daarna EEN nieuwe toe** met de juiste verificatiecode
- **Gebruik alleen `_vercel` als Name** (niet `_vercel.yannova.be`)
- **Zorg dat Proxy status "DNS only" is** (grijze wolk)

## 🔍 Controleren

Na het toevoegen, controleer met:
```bash
dig +short TXT _vercel.yannova.be
```

Je zou **EEN** record moeten zien met de nieuwe verificatiecode.

