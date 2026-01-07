/**
 * BLOG CONTENT STRATEGIE - Yannova Bouw
 * =====================================
 * 
 * Dit bestand definieert de long-tail keyword strategie voor de blog.
 * Elk blogpost target een specifiek zoekwoord met hoog conversie-potentieel.
 * 
 * STRUCTUUR:
 * - Topic clusters per dienst
 * - Long-tail keywords met zoekvolume-indicatie
 * - Content briefs per artikel
 */

export interface BlogTopic {
    id: string;
    title: string;
    slug: string;
    targetKeyword: string;
    secondaryKeywords: string[];
    searchIntent: 'informational' | 'commercial' | 'transactional';
    estimatedVolume: 'low' | 'medium' | 'high';
    priority: 1 | 2 | 3; // 1 = hoogste prioriteit
    contentBrief: string;
    ctaType: 'quote_request' | 'call' | 'showroom_visit';
    relatedServices: string[];
    targetLocations?: string[];
}

// ============================================
// TOPIC CLUSTER 1: RAMEN EN DEUREN
// ============================================
export const RAMEN_TOPICS: BlogTopic[] = [
    {
        id: 'ramen-prijzen-2025',
        title: 'Hoeveel kosten nieuwe ramen in 2025? Prijzen per m² + calculator',
        slug: 'ramen-prijzen-2025',
        targetKeyword: 'ramen prijzen per m2',
        secondaryKeywords: ['pvc ramen prijs', 'aluminium ramen kosten', 'ramen vervangen prijs', 'nieuwe ramen kosten'],
        searchIntent: 'commercial',
        estimatedVolume: 'high',
        priority: 1,
        contentBrief: `
            - Intro: waarom ramen vervangen (energiebesparing, comfort, waarde)
            - Prijsoverzicht PVC vs Aluminium per m²
            - Factoren die de prijs beïnvloeden (glastype, afmetingen, beslag)
            - Interactieve calculator/tabel
            - Premies Mijn VerbouwPremie uitleggen
            - Yannova voordelen: gratis opmeting, offerte in 48u
            - CTA: offerte aanvragen
        `,
        ctaType: 'quote_request',
        relatedServices: ['ramen-deuren'],
        targetLocations: ['Zoersel', 'Antwerpen', 'Mechelen']
    },
    {
        id: 'pvc-vs-aluminium',
        title: 'PVC of Aluminium ramen? Eerlijke vergelijking voor jouw woning',
        slug: 'pvc-of-aluminium-ramen-vergelijking',
        targetKeyword: 'pvc of aluminium ramen',
        secondaryKeywords: ['verschil pvc aluminium', 'pvc ramen nadelen', 'aluminium ramen voordelen'],
        searchIntent: 'informational',
        estimatedVolume: 'medium',
        priority: 1,
        contentBrief: `
            - Intro: de meest gestelde vraag bij klanten
            - Vergelijkingstabel: isolatie, prijs, onderhoud, levensduur, esthetiek
            - Wanneer kiezen voor PVC (budget, standaard formaten)
            - Wanneer kiezen voor aluminium (grote partijen, modern design)
            - Yannova advies: we zijn onafhankelijk en helpen kiezen
            - CTA: gratis adviesgesprek
        `,
        ctaType: 'call',
        relatedServices: ['ramen-deuren']
    },
    {
        id: 'premies-ramen-2025',
        title: 'Premies voor nieuwe ramen in 2025: alles wat je moet weten',
        slug: 'premies-ramen-2025-belgie',
        targetKeyword: 'premie nieuwe ramen',
        secondaryKeywords: ['mijn verbouwpremie ramen', 'subsidie ramen', 'premie dubbel glas'],
        searchIntent: 'informational',
        estimatedVolume: 'high',
        priority: 1,
        contentBrief: `
            - Intro: welke premies bestaan er nog in 2025?
            - Mijn VerbouwPremie: bedragen per inkomenscategorie
            - Voorwaarden: Uw-waarde, ventilatie, attesten
            - BELANGRIJK: wijzigingen vanaf juli 2025 (ventilatieroosters)
            - Hoe aanvragen? Stappen uitleggen
            - Yannova regelt de attesten voor u
            - CTA: offerte met premie-berekening
        `,
        ctaType: 'quote_request',
        relatedServices: ['ramen-deuren', 'renovatie']
    }
];

// ============================================
// TOPIC CLUSTER 2: GEVELWERKEN
// ============================================
export const GEVEL_TOPICS: BlogTopic[] = [
    {
        id: 'crepi-prijs-m2',
        title: 'Crepi prijs per m² in 2025: realistische kosten voor jouw gevel',
        slug: 'crepi-prijs-per-m2-2025',
        targetKeyword: 'crepi prijs per m2',
        secondaryKeywords: ['gevelpleister kosten', 'crepi aanbrengen prijs', 'crepi met isolatie prijs'],
        searchIntent: 'commercial',
        estimatedVolume: 'high',
        priority: 1,
        contentBrief: `
            - Intro: wat bepaalt de prijs van crepi?
            - Prijsoverzicht: alleen crepi vs crepi met isolatie
            - Factoren: oppervlakte, staat gevel, type crepi
            - Vergelijking: siliconen vs acryl vs mineraal
            - Premies voor gevelisolatie
            - Yannova: gratis gevelanalyse
            - CTA: offerte aanvragen
        `,
        ctaType: 'quote_request',
        relatedServices: ['gevel'],
        targetLocations: ['Zoersel', 'Keerbergen', 'Putte']
    },
    {
        id: 'gevelisolatie-langs-buiten',
        title: 'Gevelisolatie langs buiten: voordelen, nadelen en kosten',
        slug: 'gevelisolatie-langs-buiten-voordelen-nadelen',
        targetKeyword: 'gevelisolatie langs buiten',
        secondaryKeywords: ['buitenisolatie gevel', 'eps isolatie gevel', 'muurisolatie buiten'],
        searchIntent: 'informational',
        estimatedVolume: 'medium',
        priority: 2,
        contentBrief: `
            - Intro: waarom isoleren langs buiten beter is dan binnen
            - Voordelen: geen ruimteverlies, koudebruggen, ventilatie
            - Nadelen: vergunning nodig, uitzicht verandert
            - Materialen: EPS, PIR, minerale wol
            - Afwerking: crepi, steenstrips
            - Kosten indicatie per m²
            - CTA: gratis gevelanalyse
        `,
        ctaType: 'quote_request',
        relatedServices: ['gevel']
    }
];

// ============================================
// TOPIC CLUSTER 3: RENOVATIE
// ============================================
export const RENOVATIE_TOPICS: BlogTopic[] = [
    {
        id: 'renovatie-kosten-2025',
        title: 'Renovatiekosten 2025: wat kost een volledige verbouwing?',
        slug: 'renovatie-kosten-2025-belgie',
        targetKeyword: 'renovatie kosten',
        secondaryKeywords: ['verbouwing prijs per m2', 'huis renoveren kosten', 'renovatie budget'],
        searchIntent: 'commercial',
        estimatedVolume: 'high',
        priority: 1,
        contentBrief: `
            - Intro: renoveren is een grote investering — wees voorbereid
            - Kostenraming per type: licht/gemiddeld/grondig
            - Richtprijzen per ruimte (keuken, badkamer, etc.)
            - Onvoorziene kosten: waar rekening mee houden
            - Financieren: lening, premies, timing
            - Yannova begeleidt van plan tot oplevering
            - CTA: vrijblijvend gesprek plannen
        `,
        ctaType: 'call',
        relatedServices: ['renovatie']
    },
    {
        id: 'oude-woning-renoveren',
        title: 'Oude woning renoveren of afbreken? Zo maak je de juiste keuze',
        slug: 'oude-woning-renoveren-of-afbreken',
        targetKeyword: 'oude woning renoveren',
        secondaryKeywords: ['woning afbreken en herbouwen', 'renovatie vs nieuwbouw', 'huis uit jaren 70 renoveren'],
        searchIntent: 'informational',
        estimatedVolume: 'medium',
        priority: 2,
        contentBrief: `
            - Intro: een typisch dilemma bij aankoop
            - Wanneer renoveren: structuur goed, karakter behouden
            - Wanneer afbreken: structurele problemen, EPC F, kosten te hoog
            - Vergelijking kostenplaatje
            - BTW verschil (6% vs 21%)
            - Case study uit Zoersel/Mechelen
            - CTA: gratis haalbaarheidscheck
        `,
        ctaType: 'quote_request',
        relatedServices: ['renovatie']
    }
];

// ============================================
// LOKALE CONTENT
// ============================================
export const LOKALE_TOPICS: BlogTopic[] = [
    {
        id: 'aannemer-zoersel',
        title: 'Zoekt u een betrouwbare aannemer in Zoersel? Dit moet u weten',
        slug: 'aannemer-zoersel-vinden',
        targetKeyword: 'aannemer zoersel',
        secondaryKeywords: ['bouwfirma zoersel', 'renovatie zoersel', 'aannemer halle sint-antonius'],
        searchIntent: 'transactional',
        estimatedVolume: 'low',
        priority: 2,
        contentBrief: `
            - Intro: waarom een lokale aannemer kiezen?
            - Checklist: waar op letten (attest, referenties, offerte)
            - Voordelen lokaal: snelle service, kennis regio
            - Yannova introductie: kantoor in de regio, 15+ jaar ervaring
            - Referenties uit Zoersel tonen
            - CTA: kennismakingsgesprek
        `,
        ctaType: 'call',
        relatedServices: ['renovatie', 'ramen-deuren', 'gevel'],
        targetLocations: ['Zoersel', 'Halle', 'Sint-Antonius']
    }
];

// ============================================
// GECOMBINEERDE CONTENT KALENDER
// ============================================
export const CONTENT_CALENDAR: BlogTopic[] = [
    ...RAMEN_TOPICS,
    ...GEVEL_TOPICS,
    ...RENOVATIE_TOPICS,
    ...LOKALE_TOPICS
].sort((a, b) => a.priority - b.priority);

// Helper functie: haal topics per prioriteit
export const getTopicsByPriority = (priority: 1 | 2 | 3): BlogTopic[] => {
    return CONTENT_CALENDAR.filter(t => t.priority === priority);
};

// Helper: haal topics per dienst
export const getTopicsByService = (service: string): BlogTopic[] => {
    return CONTENT_CALENDAR.filter(t => t.relatedServices.includes(service));
};
