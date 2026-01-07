import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight, Phone, Building2, ShieldCheck, Clock, Star, Users, Award } from 'lucide-react';
import GoogleMap from '../components/ui/GoogleMap';
import OptimizedImage from '@/components/ui/OptimizedImage';
import GoogleBusinessCard from '../components/seo/GoogleBusinessCard';
import { CITIES } from '../constants/regions';

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
                "name": `Doen jullie ook renovaties in ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Zeker! Naast ramen en deuren verzorgen wij ook totaalrenovaties in ${cityData.name}. Van kleine verbouwingen tot complete renovatieprojecten - wij zijn uw lokale partner voor alle bouwwerken.`
                }
            },
            {
                "@type": "Question",
                "name": `Plaatsen jullie crepi in ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Ja, wij zijn specialist in crepi en gevelbepleistering in ${cityData.name} en omgeving. Wij bieden verschillende soorten crepi aan: siliconenpleister, korrelpleister en schuurpleister. Inclusief eventuele gevelisolatie.`
                }
            },
            {
                "@type": "Question",
                "name": `Doen jullie isolatie werken in ${cityData.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Absoluut! Wij verzorgen gevelisolatie, buitenmuurisolatie en spouwmuurisolatie in ${cityData.name}. Dit kan gecombineerd worden met crepi of steenstrips voor een mooie afwerking én lagere energiekosten.`
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
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `Diensten in ${cityData.name}`,
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `Ramen en Deuren ${cityData.name}`,
                        "description": `Levering en plaatsing van PVC en aluminium ramen en deuren in ${cityData.name}`
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `Renovatie ${cityData.name}`,
                        "description": `Totaalrenovatie en verbouwingen in ${cityData.name} en omgeving`
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `Crepi ${cityData.name}`,
                        "description": `Crepi en gevelbepleistering in ${cityData.name}`
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `Isolatie werken ${cityData.name}`,
                        "description": `Gevelisolatie en buitenmuurisolatie in ${cityData.name}`
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `Gevelwerken ${cityData.name}`,
                        "description": `Gevelrenovatie, steenstrips en gevelbescherming in ${cityData.name}`
                    }
                }
            ]
        },
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

    // Direct initialisatie in plaats van useEffect om race condition te voorkomen
    const cityKey = city?.toLowerCase() || '';
    const cityData = CITIES[cityKey] || null;
    const isValidCity = cityKey && CITIES[cityKey];

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
        document.title = `Ramen en Deuren ${cityData.name} | Renovatie, Crepi & Isolatie | Yannova Bouw`;

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `Specialist in ramen en deuren, renovatie, crepi en isolatie werken in ${cityData.name} (${cityData.zip}). ${cityData.description} ✓ Gratis offerte ✓ Lokale vakmannen ✓ 10 jaar garantie`);
        }

        // Update keywords for this specific city
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content',
                `ramen en deuren ${cityData.name}, renovatie ${cityData.name}, crepi ${cityData.name}, ` +
                `isolatie werken ${cityData.name}, gevelwerken ${cityData.name}, gevelisolatie ${cityData.name}, ` +
                `aannemer ${cityData.name}, bouwbedrijf ${cityData.name}, PVC ramen ${cityData.name}, ` +
                `aluminium ramen ${cityData.name}, totaalrenovatie ${cityData.name}, verbouwing ${cityData.name}, ` +
                `gevelbepleistering ${cityData.name}, steenstrips ${cityData.name}, ramen plaatsen ${cityData.name}, ` +
                (cityData.deelgemeenten ? cityData.deelgemeenten.map(d => `renovatie ${d}, ramen ${d}`).join(', ') + ', ' : '') +
                `Yannova Bouw ${cityData.name}`
            );
        }

        // Cleanup on unmount
        return () => {
            const existingFaq = document.querySelector(`script[data-schema="faq-${cityData.name.toLowerCase()}"]`);
            const existingLb = document.querySelector(`script[data-schema="localbusiness-${cityData.name.toLowerCase()}"]`);
            if (existingFaq) existingFaq.remove();
            if (existingLb) existingLb.remove();
        };
    }, [cityData]);

    // Als de stad niet bestaat, toon 404 pagina (niet redirect naar contact!)
    if (!isValidCity) {
        // Redirect naar NotFound in plaats van contact
        return <Navigate to="/404" replace />;
    }

    // cityData is hier gegarandeerd niet null dankzij isValidCity check
    if (!cityData) return null;

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
                            {/* Gebruik unieke localIntro indien beschikbaar, anders fallback */}
                            {cityData.content?.localIntro || cityData.longDescription}
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
                        {/* Lokale CTA subtekst */}
                        {cityData.content?.ctaSubtext && (
                            <p className="text-gray-400 text-sm mt-4">{cityData.content.ctaSubtext}</p>
                        )}
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
                                {/* Unieke dienst-beschrijving of fallback */}
                                {cityData.content?.serviceHighlights?.ramen ||
                                    `Levering en plaatsing van hoogwaardige PVC en Aluminium ramen en deuren in ${cityData.name}. Uitstekende isolatie en veiligheid.`}
                            </p>
                            <Link to="/ramen-deuren" className="text-brand-accent font-medium hover:underline flex items-center gap-1">
                                Bekijk onze ramen en deuren <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand-accent mb-6">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Gevelrenovatie</h3>
                            <p className="text-gray-600 mb-6">
                                {/* Unieke dienst-beschrijving of fallback */}
                                {cityData.content?.serviceHighlights?.gevel ||
                                    `Geef uw gevel in ${cityData.name} een nieuwe look met crepi, steenstrips of gevelisolatie. Duurzaam en energiebesparend.`}
                            </p>
                            <Link to="/gevel" className="text-brand-accent font-medium hover:underline flex items-center gap-1">
                                Ontdek onze gevelwerken <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand-accent mb-6">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Totaalrenovatie</h3>
                            <p className="text-gray-600 mb-6">
                                {/* Unieke dienst-beschrijving of fallback */}
                                {cityData.content?.serviceHighlights?.renovatie ||
                                    `Van afbraak tot afwerking: wij coördineren uw volledige verbouwing in ${cityData.name}. Eén aanspreekpunt voor al uw werken.`}
                            </p>
                            <Link to="/renovatie" className="text-brand-accent font-medium hover:underline flex items-center gap-1">
                                Meer over renovatie <ArrowRight size={16} />
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
                            <h2 className="text-3xl font-bold mb-6">
                                {cityData.content?.ctaText || `Uw Lokale Partner in ${cityData.name}`}
                            </h2>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                Waarom kiezen voor een aannemer van ver, als u lokale kwaliteit kunt krijgen?
                                Yannova Bouw kent de regio {cityData.name} en staat garant voor een persoonlijke service.
                            </p>
                            {/* Gebruik unieke USPs indien beschikbaar, anders fallback */}
                            <ul className="space-y-4">
                                {(cityData.content?.localUSPs || [
                                    `Snel ter plaatse in ${cityData.name} en de regio ${cityData.zip}`,
                                    'Gratis opmeting en offerte op maat',
                                    'Ervaring met lokale bouwstijlen en voorschriften',
                                    'Nederlandstalige aanspreekpunt en vakmannen'
                                ]).map((usp, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-brand-accent flex-shrink-0" size={24} />
                                        <span>{usp}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <Link to="/contact" className="bg-white text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors inline-block">
                                    Afspraak Maken
                                </Link>
                            </div>
                        </div>

                        <div className="relative space-y-6">
                            {/* Google Business Card for Local SEO */}
                            <GoogleBusinessCard cityName={cityData.name} />

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

            {/* Local Project Highlight - alleen tonen als er een project is */}
            {cityData.content?.localProject && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                                        <Award className="text-brand-accent" size={24} />
                                    </div>
                                    <div>
                                        <span className="text-sm text-brand-accent font-medium uppercase tracking-wide">Referentieproject in {cityData.name}</span>
                                        <h3 className="text-xl font-bold text-brand-dark mt-1 mb-2">{cityData.content.localProject.title}</h3>
                                        <p className="text-gray-600">{cityData.content.localProject.description}</p>
                                        <Link to="/portfolio" className="text-brand-accent font-medium hover:underline flex items-center gap-1 mt-4">
                                            Bekijk meer projecten <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Local */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-brand-dark mb-10 text-center">Veelgestelde vragen in {cityData.name}</h2>

                    <div className="space-y-6">
                        {/* Lokale FAQ's eerst (indien beschikbaar) */}
                        {cityData.content?.localFAQs?.map((faq, index) => (
                            <div key={`local-${index}`} className="bg-brand-accent/5 p-6 rounded-lg border-l-4 border-brand-accent">
                                <h3 className="text-lg font-bold text-brand-dark mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}

                        {/* Standaard FAQ's */}
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
