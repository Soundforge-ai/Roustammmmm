# yannovabouw.be Verwijderen - Praktische Checklist

## ✅ Verwijder Checklist

Gebruik deze checklist tijdens het verwijderen. Vink af wat je hebt gedaan.

### Voorbereiding
- [ ] Backups gemaakt van belangrijke data
- [ ] Emails geëxporteerd (als nodig)
- [ ] DNS records genoteerd (voor referentie)

### Website Verwijderen
- [ ] **GoDaddy Pro**: https://hub.godaddy.com/sites
  - [ ] Klik op `yannovabouw.godaddysites.com`
  - [ ] Settings → Delete Site
  - [ ] Bevestigd

- [ ] **OF Normale GoDaddy**: https://www.godaddy.com/nl
  - [ ] Mijn producten → Websites + Marketing
  - [ ] Zoek `yannovabouw` → Beheren → Delete
  - [ ] Bevestigd

### Hosting Verwijderen
- [ ] **Mijn producten** → **Webhosting**
  - [ ] Hosting voor yannovabouw.be gevonden
  - [ ] Beheren → Cancel Subscription
  - [ ] Gekozen: Cancel Immediately
  - [ ] Bevestigd

### Email Verwijderen (Als Niet Meer Nodig)
- [ ] **Mijn producten** → **Email**
  - [ ] Email accounts gevonden (info@yannovabouw.be, etc.)
  - [ ] Email accounts verwijderd
  - [ ] OF email plan geannuleerd

### Domein Verwijderen ⚠️ PERMANENT!
- [ ] **Mijn producten** → **Domeinen** → **yannovabouw.be**
  - [ ] Settings → Delete Domain
  - [ ] **WAARSCHUWING gelezen**: Dit is permanent!
  - [ ] Bevestigd verwijdering

### DNS Records Verwijderen
- [ ] **Mijn producten** → **Domeinen** → **yannovabouw.be** → **DNS**
  - [ ] Alle A records verwijderd
  - [ ] CNAME records verwijderd
  - [ ] MX records verwijderd (als email verwijderd)
  - [ ] TXT records verwijderd (behalve verificatie)

### Abonnementen Annuleren
- [ ] **Mijn producten** → Check alle actieve abonnementen
  - [ ] Website Builder abonnement geannuleerd
  - [ ] Hosting abonnement geannuleerd
  - [ ] Email abonnement geannuleerd
  - [ ] SSL certificaat abonnement geannuleerd
  - [ ] Andere services geannuleerd

### Cloudflare (Als Applicable)
- [ ] **Cloudflare**: https://dash.cloudflare.com/
  - [ ] yannovabouw.be geselecteerd
  - [ ] Pages → Project verwijderd
  - [ ] Workers → Worker verwijderd
  - [ ] DNS records verwijderd

### Vercel (Als Applicable)
- [ ] **Vercel**: https://vercel.com/dashboard
  - [ ] Project met yannovabouw gevonden
  - [ ] Settings → Delete Project
  - [ ] Bevestigd

### Verificatie
- [ ] Website test: `curl -I https://yannovabouw.be`
  - [ ] Resultaat: 404 of niet bereikbaar ✅
- [ ] DNS test: `dig yannovabouw.be A`
  - [ ] Geen records meer ✅
- [ ] Domein test: Probeer yannovabouw.be te bezoeken
  - [ ] Website is weg ✅

## 📞 Hulp Nodig?

Als je iets niet kunt vinden:

**Bel GoDaddy Support**: **+31 20 261 4747**

**Zeg tegen support**:
- "Ik wil alles verwijderen van yannovabouw.be"
- "Account: Elza Nukhanova"
- "Klantnummer: 649689844"
- "Website, hosting, email, domein - alles"

## ⚠️ Belangrijke Notities

### Domein Verwijdering
- ⚠️ **PERMANENT**: Eenmaal verwijderd, kun je het domein niet meer terughalen
- ⚠️ **Wachttijd**: Domein wordt pas vrijgegeven na 30-60 dagen
- ⚠️ **Kosten**: Je betaalt nog wel voor de resterende periode

### Email Verwijdering
- ⚠️ **Permanent**: Alle emails gaan verloren
- ⚠️ **Backup**: Zorg dat je emails hebt geëxporteerd

### Website Verwijdering
- ⚠️ **Permanent**: Alle content gaat verloren
- ⚠️ **Backup**: Zorg dat je bestanden hebt gedownload

## ✅ Na Verwijdering

Na het voltooien van alle stappen:

1. **Wacht 24-48 uur** voor volledige propagatie
2. **Test alle URLs** om te bevestigen dat alles weg is
3. **Check GoDaddy facturen** om te zien of abonnementen zijn gestopt
4. **Bevestig** dat er geen actieve services meer zijn

---

**Gebruik deze checklist tijdens het verwijderen!**

