import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight, Phone, Building2, ShieldCheck, Clock, Star, Users, Award } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';

// Uitgebreide configuratie voor alle ondersteunde steden
const CITIES: Record<string, {
    name: string;
    zip: string;
    description: string;
    longDescription: string;
    coordinates: { lat: number; lng: number };
    deelgemeenten?: string[];
    landmarks?: string[];
    population?: string;
}> = {
    zoersel: {
        name: 'Zoersel',
        zip: '2980',
        description: 'Specialist in ramen, deuren en renovaties in Zoersel en deelgemeenten. Lokale vakmannen, snelle service.',
        longDescription: 'Yannova Bouw is uw betrouwbare partner voor alle bouw- en renovatiewerken in Zoersel. Met ons kantoor in de regio kennen wij de lokale bouwstijlen en voorschriften als geen ander. Of u nu woont in het centrum van Zoersel, in Halle of Sint-Antonius, wij staan voor u klaar met vakkundige service.',
        coordinates: { lat: 51.2667, lng: 4.6167 },
        deelgemeenten: ['Halle', 'Sint-Antonius'],
        landmarks: ['Kasteel van Zoersel', 'Zoerselbos', 'Gemeentehuis Zoersel'],
        population: '22.000',
    },
    antwerpen: {
        name: 'Antwerpen',
        zip: '2000',
        description: 'Uw partner voor bouw- en renovatiewerken in regio Antwerpen. Van stadscentrum tot havengebied.',
        longDescription: 'In de bruisende stad Antwerpen verzorgt Yannova Bouw renovaties en ramen- en deurenplaatsing voor zowel historische panden als moderne appartementen. Wij kennen de specifieke uitdagingen van bouwen in de stad en werken nauw samen met de stedelijke diensten.',
        coordinates: { lat: 51.2194, lng: 4.4025 },
        deelgemeenten: ['Berchem', 'Borgerhout', 'Deurne', 'Ekeren', 'Hoboken', 'Merksem', 'Wilrijk'],
        landmarks: ['Centraal Station', 'Grote Markt', 'MAS Museum'],
        population: '530.000',
    },
    mechelen: {
        name: 'Mechelen',
        zip: '2800',
        description: 'Renovatie en schrijnwerk in Mechelen. Kwalitatieve ramen en deuren voor elke woningstijl.',
        longDescription: 'Mechelen, de stad tussen Brussel en Antwerpen, kent een mix van historische architectuur en moderne nieuwbouw. Yannova Bouw heeft ruime ervaring met renovaties in de Mechelse binnenstad en de omliggende wijken. Van Sint-Romboutstoren tot Nekkerspoel, wij zijn uw lokale specialist.',
        coordinates: { lat: 51.0259, lng: 4.4776 },
        deelgemeenten: ['Battel', 'Heffen', 'Hombeek', 'Leest', 'Muizen', 'Walem'],
        landmarks: ['Sint-Romboutskathedraal', 'Grote Markt Mechelen', 'Technopolis'],
        population: '87.000',
    },
    putte: {
        name: 'Putte',
        zip: '2580',
        description: 'Bouwbedrijf actief in Putte. Wij verzorgen uw gevelwerken en totaalrenovaties tot in de puntjes.',
        longDescription: 'In de landelijke gemeente Putte, gelegen tussen Mechelen en Lier, biedt Yannova Bouw een volledig gamma aan bouw- en renovatiediensten. De typische Kempense woningen in Putte en Beerzel vragen om vakmanschap dat wij met trots leveren.',
        coordinates: { lat: 51.0556, lng: 4.6307 },
        deelgemeenten: ['Beerzel', 'Grasheide', 'Peulis'],
        landmarks: ['Sint-Niklaaskerk Putte', 'Putte Kapellen'],
        population: '17.000',
    },
    'heist-op-den-berg': {
        name: 'Heist-op-den-Berg',
        zip: '2220',
        description: 'Ramen, deuren en renovatie in Heist-op-den-Berg. Vraag uw gratis offerte aan bij uw lokale specialist.',
        longDescription: 'Heist-op-den-Berg, de grootste gemeente van de provincie Antwerpen qua oppervlakte, kent diverse deelgemeenten waar Yannova Bouw actief is. Van Hallaar tot Itegem, van Booischot tot Wiekevorst - overal leveren wij kwaliteitswerk.',
        coordinates: { lat: 51.0762, lng: 4.7226 },
        deelgemeenten: ['Hallaar', 'Itegem', 'Booischot', 'Wiekevorst', 'Schriek'],
        landmarks: ['Bergom', 'Heistse Berg'],
        population: '43.000',
    },
    // Nieuwe gemeenten rond Zoersel
    malle: {
        name: 'Malle',
        zip: '2390',
        description: 'Ramen en deuren specialist in Malle. Vakkundige plaatsing en renovatie in Oostmalle en Westmalle.',
        longDescription: 'De gemeente Malle, bestaande uit Oostmalle en Westmalle, is bekend om zijn landelijke karakter en de beroemde Trappistenabdij. Yannova Bouw verzorgt hier renovaties en ramen- en deurenplaatsing met oog voor de lokale bouwstijl.',
        coordinates: { lat: 51.2944, lng: 4.6944 },
        deelgemeenten: ['Oostmalle', 'Westmalle'],
        landmarks: ['Abdij van Westmalle', 'Kasteel de Renesse'],
        population: '15.000',
    },
    schilde: {
        name: 'Schilde',
        zip: '2970',
        description: 'Hoogwaardige renovaties en ramen in Schilde. Specialist voor villa\'s en karakterwoningen.',
        longDescription: 'Schilde staat bekend als een welvarende residentiële gemeente met prachtige villa\'s en karaktervolle woningen. Yannova Bouw heeft ruime ervaring met renovaties die het karakter van deze woningen respecteren en versterken.',
        coordinates: { lat: 51.2500, lng: 4.5833 },
        deelgemeenten: ['\'s-Gravenwezel'],
        landmarks: ['Kasteel van Schilde', 'Gemeentepark'],
        population: '20.000',
    },
    wijnegem: {
        name: 'Wijnegem',
        zip: '2110',
        description: 'Bouwbedrijf actief in Wijnegem. Ramen, deuren en gevelwerken voor woningen en appartementen.',
        longDescription: 'Wijnegem, gelegen aan de rand van Antwerpen, combineert stedelijke voorzieningen met een dorps karakter. Yannova Bouw is hier actief voor zowel renovaties van bestaande woningen als afwerking van nieuwbouwprojecten.',
        coordinates: { lat: 51.2333, lng: 4.5167 },
        landmarks: ['Wijnegem Shopping Center', 'Fort van Wijnegem'],
        population: '9.500',
    },
    ranst: {
        name: 'Ranst',
        zip: '2520',
        description: 'Renovatie en ramen specialist in Ranst. Actief in Broechem, Emblem en Oelegem.',
        longDescription: 'De gemeente Ranst omvat de deelgemeenten Broechem, Emblem en Oelegem. Yannova Bouw kent deze regio goed en levert er kwaliteitsvolle renovaties en ramen- en deurenplaatsing.',
        coordinates: { lat: 51.1833, lng: 4.5500 },
        deelgemeenten: ['Broechem', 'Emblem', 'Oelegem'],
        landmarks: ['Kasteel van Ranst', 'Zevenbergenbos'],
        population: '19.000',
    },
    brecht: {
        name: 'Brecht',
        zip: '2960',
        description: 'Ramen en deuren in Brecht en Sint-Job-in-\'t-Goor. Lokale vakmannen voor uw renovatie.',
        longDescription: 'Brecht is een uitgestrekte gemeente in de Noorderkempen met diverse deelgemeenten. Yannova Bouw is hier actief voor renovaties, gevelwerken en ramen- en deurenplaatsing.',
        coordinates: { lat: 51.3500, lng: 4.6333 },
        deelgemeenten: ['Sint-Job-in-\'t-Goor', 'Sint-Lenaarts', 'Overbroek'],
        landmarks: ['Gemeentehuis Brecht', 'Brechtse Heide'],
        population: '29.000',
    },
    zandhoven: {
        name: 'Zandhoven',
        zip: '2240',
        description: 'Bouwbedrijf in Zandhoven. Specialist in ramen, deuren en totaalrenovaties.',
        longDescription: 'Zandhoven, gelegen tussen Antwerpen en de Kempen, is een groene gemeente waar Yannova Bouw graag werkt. Wij verzorgen hier renovaties en nieuwbouwafwerking met aandacht voor kwaliteit.',
        coordinates: { lat: 51.2167, lng: 4.6667 },
        deelgemeenten: ['Pulderbos', 'Pulle', 'Massenhoven', 'Viersel'],
        landmarks: ['Kasteel van Zandhoven'],
        population: '13.000',
    },
    wommelgem: {
        name: 'Wommelgem',
        zip: '2160',
        description: 'Renovatie en ramen plaatsen in Wommelgem. Snelle service, lokale vakmannen.',
        longDescription: 'Wommelgem ligt strategisch tussen Antwerpen en de Kempen. Yannova Bouw is hier actief voor renovaties van zowel oudere woningen als moderne nieuwbouw.',
        coordinates: { lat: 51.2000, lng: 4.5167 },
        landmarks: ['Fort van Wommelgem', 'Gemeentehuis'],
        population: '13.500',
    },
    bonheiden: {
        name: 'Bonheiden',
        zip: '2820',
        description: 'Ramen en deuren in Bonheiden en Rijmenam. Vakkundige renovatie door lokale specialisten.',
        longDescription: 'Bonheiden, gelegen tussen Mechelen en Keerbergen, is een aangename woongemeente waar Yannova Bouw graag projecten uitvoert. Van klassieke renovaties tot moderne nieuwbouw.',
        coordinates: { lat: 51.0333, lng: 4.5333 },
        deelgemeenten: ['Rijmenam'],
        landmarks: ['Bonheiden centrum', 'Rijmenamse Vijvers'],
        population: '15.500',
    },
    lier: {
        name: 'Lier',
        zip: '2500',
        description: 'Bouwbedrijf actief in Lier. Renovatie, ramen en gevelwerken in de Pallieterstad.',
        longDescription: 'Lier, de historische Pallieterstad, kent een prachtig stadscentrum met veel karaktervolle woningen. Yannova Bouw heeft ervaring met renovaties die het historische karakter respecteren.',
        coordinates: { lat: 51.1333, lng: 4.5667 },
        deelgemeenten: ['Koningshooikt'],
        landmarks: ['Zimmertoren', 'Grote Markt Lier', 'Begijnhof'],
        population: '36.000',
    },
    keerbergen: {
        name: 'Keerbergen',
        zip: '3140',
        description: 'Uw lokale bouwpartner in Keerbergen. Ramen, deuren, renovatie en gevelwerken.',
        longDescription: 'Keerbergen, bekend om zijn vijvers en villawijken, is een van onze thuisregio\'s. Yannova Bouw kent hier elke straat en levert al jaren kwaliteitswerk voor de inwoners van Keerbergen.',
        coordinates: { lat: 51.0031, lng: 4.6314 },
        landmarks: ['Keerbergse vijvers', 'Gemeentehuis Keerbergen'],
        population: '13.500',
    },
};

// FAQ Schema generator voor lokale SEO
const generateFAQSchema = (cityData: typeof CITIES['zoersel']) => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Plaatsen jullie ook ramen en deuren in het centrum van ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Ja, wij werken in heel ${cityData.name} (${cityData.zip})${cityData.deelgemeenten ? ` en de deelgemeenten ${cityData.deelgemeenten.join(', ')}` : ''}. Of u nu in het centrum of landelijk woont, wij komen graag bij u langs.`
                }
            },
            {
                "@type": "Question",
                "name": `Komen jullie langs voor een vrijblijvende offerte in ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Absoluut. Wij komen gratis ter plaatse in ${cityData.name} om de werken te bekijken, opmetingen te doen en uw wensen te bespreken. Daarna ontvangt u een gedetailleerde offerte zonder verplichtingen.`
                }
            },
            {
                "@type": "Question",
                "name": `Wat kost ramen plaatsen in ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `De prijs voor ramen en deuren in ${cityData.name} hangt af van het type (PVC of aluminium), de afmetingen en het aantal. Gemiddeld kost PVC ramen €300-€600 per m², aluminium €400-€800 per m². Vraag een gratis offerte aan voor een exacte prijsberekening.`
                }
            },
            {
                "@type": "Question",
                "name": `Doen jullie ook kleine renovaties in ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Zeker! Naast totaalrenovaties helpen wij u ook graag met kleinere projecten zoals het vervangen van één raam, het isoleren van een gevel of het schilderen van uw woning in ${cityData.name}.`
                }
            },
            {
                "@type": "Question",
                "name": `Hoelang duurt een gevelrenovatie in ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Een gemiddelde gevelrenovatie met crepi in ${cityData.name} duurt 1-2 weken, afhankelijk van de grootte van de woning en de weersomstandigheden. Bij gevelisolatie met crepi rekent u best op 2-3 weken.`
                }
            }
        ]
    };
};

// LocalBusiness Schema voor specifieke stad
const generateLocalBusinessSchema = (cityData: typeof CITIES['zoersel']) => {
    return {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "@id": `https://www.yannova.be/regio/${cityData.name.toLowerCase().replace(/\s+/g, '-')}#localbusiness`,
        "name": `Yannova Bouw ${cityData.name}`,
        "description": cityData.longDescription,
        "url": `https://www.yannova.be/regio/${cityData.name.toLowerCase().replace(/\s+/g, '-')}`,
        "telephone": "+32489960001",
        "email": "info@yannova.be",
        "priceRange": "€€",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": cityData.name,
            "postalCode": cityData.zip,
            "addressCountry": "BE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": cityData.coordinates.lat.toString(),
            "longitude": cityData.coordinates.lng.toString()
        },
        "areaServed": [
            { "@type": "City", "name": cityData.name },
            ...(cityData.deelgemeenten?.map(d => ({ "@type": "Place", "name": d })) || [])
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5"
        },
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
        ]
    };
};

const RegioPage: React.FC = () => {
    const { city } = useParams<{ city: string }>();
    const [cityData, setCityData] = useState<typeof CITIES['zoersel'] | null>(null);

    useEffect(() => {
        if (city && CITIES[city.toLowerCase()]) {
            setCityData(CITIES[city.toLowerCase()]);
        } else {
            setCityData(null);
        }
    }, [city]);

    // Inject structured data schemas
    useEffect(() => {
        if (!cityData) return;

        const faqSchema = generateFAQSchema(cityData);
        const localBusinessSchema = generateLocalBusinessSchema(cityData);

        // Add FAQ Schema
        const faqScript = document.createElement('script');
        faqScript.type = 'application/ld+json';
        faqScript.setAttribute('data-schema', `faq-${cityData.name.toLowerCase()}`);
        faqScript.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(faqScript);

        // Add LocalBusiness Schema
        const lbScript = document.createElement('script');
        lbScript.type = 'application/ld+json';
        lbScript.setAttribute('data-schema', `localbusiness-${cityData.name.toLowerCase()}`);
        lbScript.textContent = JSON.stringify(localBusinessSchema);
        document.head.appendChild(lbScript);

        // Update page title and meta description
        document.title = `Ramen en Deuren ${cityData.name} | Renovatie & Gevelwerken | Yannova Bouw`;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `${cityData.longDescription} ✓ Gratis offerte ✓ Lokale vakmannen ✓ 10 jaar garantie`);
        }

        // Cleanup on unmount
        return () => {
            const existingFaq = document.querySelector(`script[data-schema="faq-${cityData.name.toLowerCase()}"]`);
            const existingLb = document.querySelector(`script[data-schema="localbusiness-${cityData.name.toLowerCase()}"]`);
            if (existingFaq) existingFaq.remove();
            if (existingLb) existingLb.remove();
        };
    }, [cityData]);

    if (!cityData) {
        if (city) return <Navigate to="/contact" replace />;
        return null;
    }

    // Nabijgelegen steden voor interne linking
    const nearbyCities = Object.entries(CITIES)
        .filter(([key]) => key !== city?.toLowerCase())
        .slice(0, 6)
        .map(([key, data]) => ({ slug: key, ...data }));

    return (
        <div className="bg-white">
            {/* City Specific Hero */}
            <section className="relative py-24 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-brand-accent/20 pattern-grid-lg"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 mb-6">
                            <MapPin size={16} className="text-brand-accent" />
                            <span className="text-sm font-medium">Actief in {cityData.name} ({cityData.zip})</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Ramen, Deuren & Renovaties in <span className="text-brand-accent">{cityData.name}</span>
                        </h1>
                        <p className="text-xl text-gray-200 leading-relaxed mb-8">
                            {cityData.longDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                            >
                                Offerte Aanvragen in {cityData.name} <ArrowRight size={20} />
                            </Link>
                            <a
                                href="tel:+32489960001"
                                className="bg-white text-brand-dark hover:bg-gray-50 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors border border-gray-200"
                            >
                                <Phone size={20} className="text-brand-accent" /> Bel Direct
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gray-50 border-b">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="flex items-center justify-center mb-2">
                                <Star className="text-brand-accent" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-brand-dark">4.8/5</div>
                            <div className="text-gray-600 text-sm">Klanttevredenheid</div>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-2">
                                <Users className="text-brand-accent" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-brand-dark">500+</div>
                            <div className="text-gray-600 text-sm">Tevreden klanten</div>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-2">
                                <Award className="text-brand-accent" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-brand-dark">15+</div>
                            <div className="text-gray-600 text-sm">Jaar ervaring</div>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-2">
                                <ShieldCheck className="text-brand-accent" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-brand-dark">10 jaar</div>
                            <div className="text-gray-600 text-sm">Garantie</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deelgemeenten Section - alleen tonen als er deelgemeenten zijn */}
            {cityData.deelgemeenten && cityData.deelgemeenten.length > 0 && (
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <h2 className="text-2xl font-bold text-brand-dark mb-4">Ook actief in de deelgemeenten</h2>
                            <p className="text-gray-600">
                                Naast {cityData.name} centrum zijn wij ook actief in alle deelgemeenten:
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {cityData.deelgemeenten.map((deelgemeente) => (
                                <span 
                                    key={deelgemeente}
                                    className="px-4 py-2 bg-gray-100 rounded-full text-brand-dark font-medium"
                                >
                                    {deelgemeente}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Local Services Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">Onze Diensten in {cityData.name}</h2>
                        <p className="text-gray-600">
                            Woont u in {cityData.name} of omgeving? Wij bieden een totaalpakket aan diensten
                            voor uw nieuwbouw- of renovatieproject.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand-accent mb-6">
                                <Building2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Ramen en Deuren</h3>
                            <p className="text-gray-600 mb-6">
                                Levering en plaatsing van hoogwaardige PVC en Aluminium ramen en deuren in {cityData.name}.
                                Uitstekende isolatie en veiligheid.
                            </p>
                            <Link to="/ramen-deuren" className="text-brand-accent font-medium hover:underline flex items-center gap-1">
                                Meer info <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand-accent mb-6">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Gevelrenovatie</h3>
                            <p className="text-gray-600 mb-6">
                                Geef uw gevel in {cityData.name} een nieuwe look met crepi, steenstrips of gevelisolatie.
                                Duurzaam en energiebesparend.
                            </p>
                            <Link to="/gevel" className="text-brand-accent font-medium hover:underline flex items-center gap-1">
                                Meer info <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand-accent mb-6">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Totaalrenovatie</h3>
                            <p className="text-gray-600 mb-6">
                                Van afbraak tot afwerking: wij coördineren uw volledige verbouwing in {cityData.name}.
                                Eén aanspreekpunt voor al uw werken.
                            </p>
                            <Link to="/renovatie" className="text-brand-accent font-medium hover:underline flex items-center gap-1">
                                Meer info <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Local */}
            <section className="bg-brand-dark text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Uw Lokale Partner in {cityData.name}</h2>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                Waarom kiezen voor een aannemer van ver, als u lokale kwaliteit kunt krijgen?
                                Yannova Bouw kent de regio {cityData.name} en staat garant voor een persoonlijke service.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-brand-accent flex-shrink-0" size={24} />
                                    <span>Snel ter plaatse in {cityData.name} en de regio {cityData.zip}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-brand-accent flex-shrink-0" size={24} />
                                    <span>Gratis opmeting en offerte op maat</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-brand-accent flex-shrink-0" size={24} />
                                    <span>Ervaring met lokale bouwstijlen en voorschriften</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-brand-accent flex-shrink-0" size={24} />
                                    <span>Nederlandstalige aanspreekpunt en vakmannen</span>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <Link to="/contact" className="bg-white text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors inline-block">
                                    Afspraak Maken
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Map Component pointing to coordinates of city */}
                            <div className="h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
                                <GoogleMap
                                    address={`${cityData.name}, België`}
                                    coordinates={cityData.coordinates}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Local */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-brand-dark mb-10 text-center">Veelgestelde vragen in {cityData.name}</h2>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-brand-dark mb-2">Plaatsen jullie ook ramen en deuren in het centrum van {cityData.name}?</h3>
                            <p className="text-gray-600">Ja, wij werken in heel {cityData.name} ({cityData.zip}){cityData.deelgemeenten ? ` en de deelgemeenten ${cityData.deelgemeenten.join(', ')}` : ''}. Of u nu in het centrum of landelijk woont, wij komen graag bij u langs.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-brand-dark mb-2">Komen jullie langs voor een vrijblijvende offerte in {cityData.name}?</h3>
                            <p className="text-gray-600">Absoluut. Wij komen gratis ter plaatse in {cityData.name} om de werken te bekijken, opmetingen te doen en uw wensen te bespreken. Daarna ontvangt u een gedetailleerde offerte zonder verplichtingen.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-brand-dark mb-2">Wat kost ramen plaatsen in {cityData.name}?</h3>
                            <p className="text-gray-600">De prijs voor ramen en deuren in {cityData.name} hangt af van het type (PVC of aluminium), de afmetingen en het aantal. Gemiddeld kost PVC ramen €300-€600 per m², aluminium €400-€800 per m². Vraag een gratis offerte aan voor een exacte prijsberekening.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-brand-dark mb-2">Doen jullie ook kleine renovaties in {cityData.name}?</h3>
                            <p className="text-gray-600">Zeker! Naast totaalrenovaties helpen wij u ook graag met kleinere projecten zoals het vervangen van één raam, het isoleren van een gevel of het schilderen van uw woning in {cityData.name}.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-brand-dark mb-2">Hoelang duurt een gevelrenovatie in {cityData.name}?</h3>
                            <p className="text-gray-600">Een gemiddelde gevelrenovatie met crepi in {cityData.name} duurt 1-2 weken, afhankelijk van de grootte van de woning en de weersomstandigheden. Bij gevelisolatie met crepi rekent u best op 2-3 weken.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nearby Cities - Internal Linking voor SEO */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">Ook actief in de regio</h2>
                        <p className="text-gray-600">
                            Naast {cityData.name} zijn wij ook actief in deze omliggende gemeenten:
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {nearbyCities.map((nearbyCity) => (
                            <Link
                                key={nearbyCity.slug}
                                to={`/regio/${nearbyCity.slug}`}
                                className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow border border-gray-100"
                            >
                                <MapPin size={20} className="text-brand-accent mx-auto mb-2" />
                                <span className="font-medium text-brand-dark block">{nearbyCity.name}</span>
                                <span className="text-sm text-gray-500">{nearbyCity.zip}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegioPage;
