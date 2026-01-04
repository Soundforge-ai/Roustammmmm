import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Werkgebieden voor lokale SEO - Zoersel en omgeving als focus
const SERVICE_AREAS = [
  // Hoofdgebieden - Zoersel eerst voor lokale SEO
  { name: 'Zoersel', type: 'City' },
  { name: 'Antwerpen', type: 'City' },
  { name: 'Keerbergen', type: 'City' },
  { name: 'Mechelen', type: 'City' },
  { name: 'Putte', type: 'City' },
  // Omliggende gemeenten Zoersel
  { name: 'Malle', type: 'City' },
  { name: 'Schilde', type: 'City' },
  { name: 'Wijnegem', type: 'City' },
  { name: 'Ranst', type: 'City' },
  { name: 'Brecht', type: 'City' },
  { name: 'Zandhoven', type: 'City' },
  { name: 'Wommelgem', type: 'City' },
  // Overige gemeenten
  { name: 'Heist-op-den-Berg', type: 'City' },
  { name: 'Bonheiden', type: 'City' },
  { name: 'Tremelo', type: 'City' },
  { name: 'Haacht', type: 'City' },
  { name: 'Lier', type: 'City' },
  { name: 'Nijlen', type: 'City' },
  { name: 'Boechout', type: 'City' },
  { name: 'Lint', type: 'City' },
  { name: 'Duffel', type: 'City' },
  { name: 'Berlaar', type: 'City' },
  // Deelgemeenten Zoersel
  { name: 'Halle (Zoersel)', type: 'Place' },
  { name: 'Sint-Antonius', type: 'Place' },
  // Provincies
  { name: 'Antwerpen', type: 'State' },
  { name: 'Vlaams-Brabant', type: 'State' },
];

// Pagina configuratie voor breadcrumbs
const PAGE_CONFIG: Record<string, { name: string; parent?: string }> = {
  '/': { name: 'Home' },
  '/over-ons': { name: 'Over Ons', parent: '/' },
  '/diensten': { name: 'Diensten', parent: '/' },
  '/contact': { name: 'Contact', parent: '/' },
  '/aanpak': { name: 'Onze Aanpak', parent: '/' },
  '/partners': { name: 'Partners', parent: '/' },
  '/portfolio': { name: 'Portfolio', parent: '/' },
  '/showroom': { name: 'Showroom', parent: '/' },
  '/regio/zoersel': { name: 'Ramen en Deuren Zoersel', parent: '/' },
  '/regio/antwerpen': { name: 'Ramen en Deuren Antwerpen', parent: '/' },
  '/regio/mechelen': { name: 'Ramen en Deuren Mechelen', parent: '/' },
  '/regio/keerbergen': { name: 'Ramen en Deuren Keerbergen', parent: '/' },
  '/regio/malle': { name: 'Ramen en Deuren Malle', parent: '/' },
  '/regio/schilde': { name: 'Ramen en Deuren Schilde', parent: '/' },
  '/regio/wijnegem': { name: 'Ramen en Deuren Wijnegem', parent: '/' },
  '/regio/ranst': { name: 'Ramen en Deuren Ranst', parent: '/' },
  '/regio/brecht': { name: 'Ramen en Deuren Brecht', parent: '/' },
  '/regio/zandhoven': { name: 'Ramen en Deuren Zandhoven', parent: '/' },
  '/regio/wommelgem': { name: 'Ramen en Deuren Wommelgem', parent: '/' },
  '/regio/putte': { name: 'Ramen en Deuren Putte', parent: '/' },
  '/regio/heist-op-den-berg': { name: 'Ramen en Deuren Heist-op-den-Berg', parent: '/' },
  '/regio/bonheiden': { name: 'Ramen en Deuren Bonheiden', parent: '/' },
  '/regio/lier': { name: 'Ramen en Deuren Lier', parent: '/' },
  '/ramen-deuren': { name: 'Ramen en Deuren', parent: '/diensten' },
  '/tuinaanleg': { name: 'Tuinaanleg', parent: '/diensten' },
  '/renovatie': { name: 'Renovatie', parent: '/diensten' },
  '/kies-product': { name: 'Kies Product', parent: '/' },
  '/crepi-info': { name: 'Crepi Info', parent: '/gevel' },
  '/gevel': { name: 'Gevelwerken', parent: '/diensten' },
  '/gevel/gevelbepleistering': { name: 'Gevelbepleistering', parent: '/gevel' },
  '/gevel/gevelbescherming': { name: 'Gevelbescherming', parent: '/gevel' },
  '/gevel/gevelisolatie': { name: 'Gevelisolatie', parent: '/gevel' },
  '/gevel/steenstrips': { name: 'Steenstrips', parent: '/gevel' },
  '/gevel/gevelrenovatie': { name: 'Gevelrenovatie', parent: '/gevel' },
};

const StructuredData: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.yannova.be/#organization",
      "name": "Yannova Bouw",
      "alternateName": ["Yannova", "Yannova Ramen en Deuren"],
      "description": "Yannova Bouw - Specialist in ramen en deuren, renovatie, isolatie en crepi gevelafwerking in Keerbergen, Mechelen, Zoersel, Putte en omgeving.",
      "url": "https://www.yannova.be",
      "telephone": "+32489960001",
      "email": "info@yannova.be",
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Keerbergen",
        "addressRegion": "Vlaams-Brabant",
        "postalCode": "3140",
        "addressCountry": "BE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.0031",
        "longitude": "4.6314"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "areaServed": SERVICE_AREAS.map(area => ({
        "@type": area.type,
        "name": area.name
      })),
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "13:00"
        }
      ],
      "image": [
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
        "https://www.yannova.be/lovable-uploads/c67c2ffe-a42b-477f-a67d-10100999c4f0.png"
      ],
      "logo": "https://www.yannova.be/images/logo.png",
      "sameAs": [
        "https://www.facebook.com/yannova",
        "https://www.instagram.com/yannova",
        "https://www.linkedin.com/company/yannova"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Bouw- en Renovatiediensten",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ramen en Deuren",
              "description": "Hoogwaardige PVC en aluminium ramen en deuren plaatsen in Keerbergen, Mechelen, Zoersel en omgeving",
              "areaServed": "Antwerpen, Vlaams-Brabant"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Renovatie",
              "description": "Totaalrenovaties van ruwbouw tot afwerking in Keerbergen, Mechelen, Zoersel, Putte",
              "areaServed": "Antwerpen, Vlaams-Brabant"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Isolatiewerken",
              "description": "Dak-, muur- en gevelisolatie voor energiebesparing",
              "areaServed": "Antwerpen, Vlaams-Brabant"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Crepi Gevelafwerking",
              "description": "Professionele crepi en gevelbepleistering in Keerbergen, Mechelen, Zoersel",
              "areaServed": "Antwerpen, Vlaams-Brabant"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Gevelisolatie",
              "description": "Buitengevelisolatie met EPS en crepi afwerking",
              "areaServed": "Antwerpen, Vlaams-Brabant"
            }
          }
        ]
      }
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Yannova Bouw",
      "alternateName": "Yannova",
      "url": "https://www.yannova.be",
      "logo": "https://www.yannova.be/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+32489960001",
        "contactType": "customer service",
        "availableLanguage": ["Dutch", "French"]
      }
    };

    // WebSite Schema for sitelinks search
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Yannova Bouw",
      "alternateName": "Yannova Ramen en Deuren",
      "url": "https://www.yannova.be",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.yannova.be/zoeken?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // BreadcrumbList Schema - wordt nu dynamisch gegenereerd
    // Zie buildBreadcrumbs functie hieronder

    // FAQ Schema voor veelgestelde vragen
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Wat kost ramen en deuren plaatsen in Keerbergen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "De prijs voor ramen en deuren hangt af van het type (PVC of aluminium), de afmetingen en het aantal. Gemiddeld kost PVC ramen €300-€600 per m², aluminium €400-€800 per m². Vraag een gratis offerte aan voor een exacte prijsberekening."
          }
        },
        {
          "@type": "Question",
          "name": "Werkt Yannova ook in Mechelen en Zoersel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, Yannova Bouw is actief in heel de provincie Antwerpen en Vlaams-Brabant, inclusief Mechelen, Zoersel, Putte, Heist-op-den-Berg, Bonheiden, Lier, Nijlen en omgeving."
          }
        },
        {
          "@type": "Question",
          "name": "Hoelang duurt een gevelrenovatie met crepi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Een gemiddelde gevelrenovatie met crepi duurt 1-2 weken, afhankelijk van de grootte van de woning en de weersomstandigheden. Bij gevelisolatie met crepi rekent u best op 2-3 weken."
          }
        },
        {
          "@type": "Question",
          "name": "Biedt Yannova gratis offertes aan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, wij komen gratis ter plaatse voor een opmeting en bezorgen u een vrijblijvende offerte op maat. Bel ons op +32 489 96 00 01 of vul het contactformulier in."
          }
        },
        {
          "@type": "Question",
          "name": "Wat is het verschil tussen PVC en aluminium ramen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PVC ramen zijn goedkoper, onderhoudsvriendelijk en bieden uitstekende isolatie. Aluminium ramen zijn duurder maar hebben slankere profielen, zijn sterker en ideaal voor grote glaspartijen. Beide types zijn beschikbaar in vele kleuren."
          }
        },
        {
          "@type": "Question",
          "name": "Hoeveel kan ik besparen met gevelisolatie?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Met buitengevelisolatie kunt u tot 30% besparen op uw energiefactuur. Bovendien komt u mogelijk in aanmerking voor premies van de Vlaamse overheid. Wij adviseren u graag over de mogelijkheden."
          }
        },
        {
          "@type": "Question",
          "name": "Welke garantie geeft Yannova op ramen en deuren?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wij bieden 10 jaar garantie op al onze ramen en deuren. Dit omvat zowel de materialen als de plaatsing door onze eigen vakmensen."
          }
        }
      ]
    };

    // Review Schema met echte testimonials
    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Yannova Bouw",
      "@id": "https://www.yannova.be/#reviews",
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Jan Peeters"
          },
          "datePublished": "2024-10-15",
          "reviewBody": "Uitstekende service van begin tot eind. Het team van Yannova heeft onze gevel volledig getransformeerd. Zeer tevreden met het resultaat en de communicatie was top!",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Marie Dubois"
          },
          "datePublished": "2024-08-20",
          "reviewBody": "Professionele plaatsing van onze nieuwe ramen. Het verschil in isolatie is direct merkbaar. Aanrader voor iedereen die kwaliteit zoekt.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Peter Janssens"
          },
          "datePublished": "2024-06-10",
          "reviewBody": "Yannova heeft onze volledige renovatie begeleid. Één aanspreekpunt voor alles, dat maakte het zo makkelijk. Het eindresultaat overtreft onze verwachtingen.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sophie Van den Berg"
          },
          "datePublished": "2024-04-05",
          "reviewBody": "Dankzij de gevelisolatie van Yannova is onze energiefactuur flink gedaald. Vakkundig werk en netjes opgeleverd.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          }
        }
      ]
    };

    // Uitgebreide Service Schemas per dienst
    const serviceSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.yannova.be/ramen-deuren#service",
        "name": "Ramen en Deuren Plaatsen",
        "alternateName": ["PVC Ramen", "Aluminium Ramen", "Voordeuren", "Schuiframen"],
        "description": "Professionele plaatsing van hoogwaardige PVC en aluminium ramen en deuren in Keerbergen, Mechelen, Zoersel en omgeving. Inclusief drievoudige beglazing voor optimale isolatie.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Yannova Bouw",
          "@id": "https://www.yannova.be/#organization"
        },
        "areaServed": SERVICE_AREAS.filter(a => a.type === 'City').map(a => ({
          "@type": "City",
          "name": a.name
        })),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Ramen en Deuren Assortiment",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "PVC Ramen",
                "description": "Onderhoudsvriendelijke PVC ramen met uitstekende isolatiewaarde"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Aluminium Ramen",
                "description": "Slanke aluminium profielen voor moderne woningen"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Voordeuren",
                "description": "Veilige en isolerende voordeuren in PVC of aluminium"
              }
            }
          ]
        },
        "serviceType": "Ramen en Deuren Installatie",
        "termsOfService": "https://www.yannova.be/voorwaarden",
        "url": "https://www.yannova.be/ramen-deuren"
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.yannova.be/gevel#service",
        "name": "Gevelwerken en Crepi",
        "alternateName": ["Crepi", "Gevelbepleistering", "Gevelisolatie", "Steenstrips"],
        "description": "Complete gevelwerken inclusief crepi, gevelisolatie, gevelbepleistering en steenstrips in Keerbergen, Mechelen, Zoersel en heel de provincie Antwerpen.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Yannova Bouw",
          "@id": "https://www.yannova.be/#organization"
        },
        "areaServed": SERVICE_AREAS.filter(a => a.type === 'City').map(a => ({
          "@type": "City",
          "name": a.name
        })),
        "serviceType": "Gevelrenovatie",
        "url": "https://www.yannova.be/gevel"
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.yannova.be/renovatie#service",
        "name": "Totaalrenovatie",
        "alternateName": ["Renovatie", "Verbouwing", "Badkamerrenovatie"],
        "description": "Totaalrenovaties van ruwbouw tot afwerking. Eén aanspreekpunt voor uw volledige verbouwing in Keerbergen, Mechelen, Zoersel en omgeving.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Yannova Bouw",
          "@id": "https://www.yannova.be/#organization"
        },
        "areaServed": SERVICE_AREAS.filter(a => a.type === 'City').map(a => ({
          "@type": "City",
          "name": a.name
        })),
        "serviceType": "Woningrenovatie",
        "url": "https://www.yannova.be/renovatie"
      }
    ];

    // Dynamische Breadcrumb Schema gebaseerd op huidige pagina
    const buildBreadcrumbs = (path: string) => {
      const items: Array<{ name: string; url: string }> = [];
      let currentPath = path;

      while (currentPath && PAGE_CONFIG[currentPath]) {
        const config = PAGE_CONFIG[currentPath];
        items.unshift({
          name: config.name,
          url: `https://www.yannova.be${currentPath === '/' ? '' : currentPath}`
        });
        currentPath = config.parent || '';
      }

      // Zorg dat Home altijd eerste is
      if (items.length === 0 || items[0].name !== 'Home') {
        items.unshift({ name: 'Home', url: 'https://www.yannova.be' });
      }

      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
    };

    const breadcrumbSchema = buildBreadcrumbs(currentPath);

    // Helper function to add schema
    const addSchema = (schema: object, id: string) => {
      const existingScript = document.querySelector(`script[data-schema="${id}"]`);
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', id);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    };

    // Add all schemas
    const scripts = [
      addSchema(localBusinessSchema, 'local-business'),
      addSchema(organizationSchema, 'organization'),
      addSchema(websiteSchema, 'website'),
      addSchema(breadcrumbSchema, 'breadcrumb'),
      addSchema(faqSchema, 'faq'),
      addSchema(reviewSchema, 'reviews'),
      ...serviceSchemas.map((schema, i) => addSchema(schema, `service-${i}`)),
    ];

    return () => {
      scripts.forEach(script => script.remove());
    };
  }, [currentPath]);

  return null;
};

export default StructuredData;
