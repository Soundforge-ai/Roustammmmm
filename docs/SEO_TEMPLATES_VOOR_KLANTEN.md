# SEO Templates voor Klanten

Hier zijn de twee voorbeelden die je direct kunt kopiëren en aanpassen voor je klanten.

## 1. Meta-tags (Basis SEO)

Deze code zet je in de `<head>` sectie van je HTML. Het bepaalt wat mensen zien in de zoekresultaten van Google.

```html
<title>Bedrijfsnaam | Wat doet het bedrijf en waar?</title>

<meta name="description" content="Hier schrijf je een pakkende tekst van maximaal 155 tekens die mensen verleidt om te klikken.">
```

### Tips voor Meta-tags:
- **Title**: Maximaal 60 tekens, bevat belangrijkste zoekwoorden
- **Description**: Maximaal 155 tekens, schrijf een pakkende tekst met call-to-action
- Plaats de belangrijkste zoekwoorden vooraan in de title
- Gebruik de locatie van het bedrijf in de title (bijv. "Keerbergen, Mechelen")

---

## 2. JSON-LD (Voor een lokaal bedrijf)

Dit script helpt Google om belangrijke gegevens (zoals adres en telefoonnummer) direct te herkennen. Dit vergroot de kans op een mooie vermelding in de zoekresultaten.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Naam van de Klant",
  "image": "https://www.website.nl/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Straatnaam 12",
    "addressLocality": "Stad",
    "postalCode": "1234 AB",
    "addressCountry": "NL"
  },
  "telephone": "+31612345678",
  "priceRange": "$$"
}
</script>
```

**Waarom dit werkt:** Google begrijpt code beter dan tekst. Door deze "gestructureerde data" te gebruiken, geef je de informatie op een presenteerblaadje aan de zoekmachine.

### Uitgebreide versie met meer velden:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Naam van de Klant",
  "image": "https://www.website.nl/logo.png",
  "url": "https://www.website.nl",
  "telephone": "+31612345678",
  "email": "info@website.nl",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Straatnaam 12",
    "addressLocality": "Stad",
    "postalCode": "1234 AB",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.1234",
    "longitude": "4.5678"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "50"
  }
}
</script>
```

### Waar plaats je dit?
- In de `<head>` sectie van je HTML
- Direct na de meta-tags
- Één keer per pagina (meestal op de homepage)

### Belangrijke velden om aan te passen:
- `name`: Bedrijfsnaam
- `image`: URL naar logo of bedrijfsfoto
- `address`: Volledig adres
- `telephone`: Telefoonnummer met landcode
- `priceRange`: `$` (goedkoop), `$$` (gemiddeld), `$$$` (duur), `$$$$` (zeer duur)
- `openingHoursSpecification`: Openingstijden (optioneel maar aanbevolen)
- `aggregateRating`: Beoordelingen (optioneel maar aanbevolen)

---

## Voorbeeld: Yannova Bouw

Hier is hoe het eruit ziet voor Yannova Bouw:

```html
<title>Yannova Bouw | Ramen en Deuren, Renovatie & Crepi | Keerbergen, Mechelen, Zoersel</title>

<meta name="description" content="Yannova Bouw - Specialist in ramen en deuren, renovatie, isolatie en crepi gevelafwerking in Keerbergen, Mechelen, Zoersel, Putte en omgeving. ✓ Gratis offerte ✓ 15+ jaar ervaring ✓ Vakkundige plaatsing">
```

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Yannova Bouw",
  "image": "https://www.yannova.be/images/yannova-team.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "De Beemdekens 39",
    "addressLocality": "Zoersel",
    "postalCode": "2980",
    "addressCountry": "BE"
  },
  "telephone": "+32489960001",
  "priceRange": "€€"
}
</script>
```

---

## Checklist voor implementatie

- [ ] Title tag aangepast met bedrijfsnaam en locatie
- [ ] Meta description geschreven (max 155 tekens)
- [ ] JSON-LD script toegevoegd met correcte bedrijfsgegevens
- [ ] Adres volledig en correct ingevuld
- [ ] Telefoonnummer met landcode
- [ ] Logo/bedrijfsfoto URL correct
- [ ] PriceRange ingesteld (optioneel)
- [ ] Openingstijden toegevoegd (optioneel maar aanbevolen)
- [ ] Getest met [Google's Rich Results Test](https://search.google.com/test/rich-results)

---

## Hulp bij implementatie

1. **Test je structured data**: Gebruik [Google's Rich Results Test](https://search.google.com/test/rich-results) om te controleren of alles correct is
2. **Valideer JSON**: Gebruik een [JSON validator](https://jsonlint.com/) om te controleren of de JSON geldig is
3. **Controleer in Google Search Console**: Na implementatie kan het enkele dagen duren voordat Google de wijzigingen ziet

---

## Extra tips

- **Consistentie**: Gebruik dezelfde bedrijfsnaam en gegevens overal
- **Actualiteit**: Houd openingstijden en contactgegevens up-to-date
- **Lokale SEO**: Voeg altijd de stad/regio toe aan je title en description
- **Call-to-action**: Gebruik woorden zoals "Gratis offerte", "Bel nu", "Vraag advies" in je description

