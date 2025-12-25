# Vercel Verificatie - Stap voor Stap

## 📋 Wat moet je kopiëren?

### Stap 1: Open het Edit paneel
1. In het Vercel Dashboard, klik op de **"Edit"** knop naast **`www.yannova.be`**
   - (Niet `yannova.be`, want die redirect naar www)

### Stap 2: Zoek de verificatie sectie
2. In het edit paneel dat opent, scroll naar beneden
3. Je zou een sectie moeten zien met de titel:
   - **"Domain Verification"** of
   - **"Verify Domain"** of
   - **"DNS Configuration"**

### Stap 3: Kopieer de TXT record waarde
4. In die sectie zie je iets zoals:

```
Domain Verification
Add this TXT record to your DNS:

Name: _vercel
Value: vc-domain-verify=www.yannova.be,XXXXXXXXXXXXX
```

5. **Kopieer de volledige "Value" waarde**
   - Dit is de tekst die begint met `vc-domain-verify=www.yannova.be,`
   - Kopieer ALLES, inclusief alles na de komma

### Stap 4: Als je de waarde niet ziet
Als je de verificatiecode niet ziet in het edit paneel:

1. Klik op **"Learn more"** naast "Verification Needed"
2. Of klik op **"Refresh"** naast het domein
3. Vercel zou dan de verificatiecode moeten tonen

## 📝 Voorbeeld

Als Vercel dit toont:
```
Value: vc-domain-verify=www.yannova.be,RwFdQnQR9TzEOvQT5tJxUlRD
```

Dan moet je **precies deze tekst kopiëren**:
```
vc-domain-verify=www.yannova.be,RwFdQnQR9TzEOvQT5tJxUlRD
```

## 🔧 Wat daarna?

1. Ga naar Cloudflare: https://dash.cloudflare.com/
2. Selecteer domein: `yannova.be`
3. DNS → Records
4. Zoek het `_vercel` TXT record
5. Klik op "Edit"
6. Plak de gekopieerde waarde in het "Content" veld
7. Zorg dat Proxy status "DNS only" is (grijze wolk)
8. Klik op "Save"

## ❓ Kan je het niet vinden?

Als je de verificatiecode niet kunt vinden:
1. Klik op "Refresh" naast `www.yannova.be` in Vercel
2. Wacht 10 seconden
3. Klik opnieuw op "Edit"
4. De verificatiecode zou nu moeten verschijnen

Of:
1. Klik op "Learn more" naast "Verification Needed"
2. Daar zou je instructies moeten zien met de verificatiecode

