# yannovabouw.be - Complete Verwijder Gids (Lovable.dev + GoDaddy)

## 🎯 Situatie
- **Website**: Gehost via **Lovable.dev**
- **Domein**: Beheerd door **GoDaddy**
- **Doel**: Alles verwijderen

## 📋 Complete Verwijder Checklist

### Deel 1: Lovable.dev (Website)

#### Stap 1: Log in op Lovable.dev
- [ ] Ga naar: https://lovable.dev/
- [ ] Log in met je account
- [ ] Vind project voor `yannovabouw.be`

#### Stap 2: Unpublish Website
- [ ] Open project → Settings
- [ ] Klik op "Unpublish Project" of "Remove public access"
- [ ] Bevestig

#### Stap 3: Verwijder Project
- [ ] Settings → Scroll naar beneden
- [ ] Klik op "Delete Project"
- [ ] Type project naam om te bevestigen
- [ ] Bevestig verwijdering

#### Stap 4: Ontkoppel Domein
- [ ] Settings → "Domains" of "Custom Domain"
- [ ] Remove `yannovabouw.be` uit de lijst
- [ ] Bevestig ontkoppeling

#### Stap 5: (Optioneel) Verwijder Account
- [ ] Settings → Your Account
- [ ] Scroll naar beneden → "Delete account"
- [ ] ⚠️ WAARSCHUWING: Permanent!
- [ ] Bevestig

### Deel 2: GoDaddy (Domein & Services)

#### Stap 6: Ontkoppel DNS van Lovable
- [ ] Log in op GoDaddy: https://www.godaddy.com/nl
- [ ] Mijn producten → Domeinen → yannovabouw.be
- [ ] DNS → Records
- [ ] Verwijder CNAME records die naar Lovable wijzen
- [ ] Verwijder A records die naar Lovable IP wijzen

#### Stap 7: Verwijder GoDaddy Pro Site (Als Applicable)
- [ ] Ga naar: https://hub.godaddy.com/sites
- [ ] Zoek `yannovabouw.godaddysites.com`
- [ ] Delete Site (als die er is)

#### Stap 8: Verwijder Hosting (Als Applicable)
- [ ] Mijn producten → Webhosting
- [ ] Zoek hosting voor yannovabouw.be
- [ ] Cancel Subscription → Cancel Immediately

#### Stap 9: Verwijder Email (Als Niet Meer Nodig)
- [ ] Mijn producten → Email
- [ ] Zoek email accounts (info@yannovabouw.be, etc.)
- [ ] Delete email accounts
- [ ] OF annuleer email plan

#### Stap 10: Domein Beslissing

**Optie A: Domein Verwijderen (Permanent!)**
- [ ] Mijn producten → Domeinen → yannovabouw.be
- [ ] Settings → Delete Domain
- [ ] ⚠️ WAARSCHUWING: PERMANENT!
- [ ] Bevestig verwijdering

**Optie B: Domein Behouden met Redirects (Aanbevolen)**
- [ ] Mijn producten → Domeinen → yannovabouw.be
- [ ] DNS → Forwarding
- [ ] Forward from: `yannovabouw.be`
- [ ] Forward to: `https://www.yannova.be`
- [ ] Type: Permanent (301)
- [ ] Herhaal voor `www.yannovabouw.be`

#### Stap 11: Annuleer Abonnementen
- [ ] Mijn producten → Check alle actieve abonnementen
- [ ] Voor elk: Beheren → Cancel Subscription
- [ ] Kies: Cancel Immediately

### Deel 3: Andere Services

#### Stap 12: Cloudflare (Als Applicable)
- [ ] Log in: https://dash.cloudflare.com/
- [ ] Selecteer yannovabouw.be (als die er staat)
- [ ] Pages → Delete project
- [ ] Workers → Delete worker
- [ ] DNS → Verwijder records

#### Stap 13: Vercel (Als Applicable)
- [ ] Log in: https://vercel.com/dashboard
- [ ] Zoek project met yannovabouw
- [ ] Settings → Delete Project

## ✅ Verificatie

Na verwijdering, test alles:

```bash
# Test website (moet 404 of redirect geven)
curl -I https://www.yannovabouw.be
curl -I https://yannovabouw.be

# Test DNS
dig yannovabouw.be A
dig www.yannovabouw.be A

# Test redirect (als ingesteld)
curl -I https://yannovabouw.be
# Moet 301 redirect geven naar yannova.be
```

## 🆘 Hulp Nodig?

### Lovable Support
- **Website**: https://lovable.dev/
- **Documentatie**: https://docs.lovable.dev/
- **Email**: Check website voor support

### GoDaddy Support
- **Telefoon**: +31 20 261 4747
- **Account**: Elza Nukhanova
- **Klantnummer**: 649689844
- **Zeg**: "Ik wil alles verwijderen van yannovabouw.be"

## ⚠️ Belangrijke Waarschuwingen

### Voordat Je Verwijdert:
1. ✅ **Backup maken** van belangrijke data
2. ✅ **Emails exporteren** (als je die nodig hebt)
3. ✅ **DNS records noteren** (voor referentie)
4. ✅ **Beslis over domein** (verwijderen of behouden)

### Na Verwijdering:
1. ⚠️ **Domein verwijdering is PERMANENT**
2. ⚠️ **Email verwijdering is PERMANENT**
3. ⚠️ **Website verwijdering is PERMANENT**
4. ⚠️ **Wacht 24-48 uur** voor volledige propagatie

## 📝 Snelle Links

- **Lovable.dev**: https://lovable.dev/
- **GoDaddy**: https://www.godaddy.com/nl
- **GoDaddy Pro**: https://hub.godaddy.com/sites
- **Cloudflare**: https://dash.cloudflare.com/
- **Vercel**: https://vercel.com/dashboard

---

**Laatste Update**: 2025-01-27
**Hosting**: Lovable.dev + GoDaddy

