import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight, Phone, Building2, ShieldCheck, Clock } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';

// Configuratie voor ondersteunde steden
const CITIES: Record<string, {
    name: string;
    zip: string;
    description: string;
    coordinates: { lat: number; lng: number };
}> = {
    zoersel: {
        name: 'Zoersel',
        zip: '2980',
        description: 'Specialist in ramen, deuren en renovaties in Zoersel en deelgemeenten. Lokale vakmannen, snelle service.',
        coordinates: { lat: 51.2667, lng: 4.6167 },
    },
    antwerpen: {
        name: 'Antwerpen',
        zip: '2000',
        description: 'Uw partner voor bouw- en renovatiewerken in regio Antwerpen. Van stadscentrum tot havengebied.',
        coordinates: { lat: 51.2194, lng: 4.4025 },
    },
    mechelen: {
        name: 'Mechelen',
        zip: '2800',
        description: 'Renovatie en schrijnwerk in Mechelen. Kwalitatieve ramen en deuren voor elke woningstijl.',
        coordinates: { lat: 51.0259, lng: 4.4776 },
    },
    putte: {
        name: 'Putte',
        zip: '2580',
        description: 'Bouwbedrijf actief in Putte. Wij verzorgen uw gevelwerken en totaalrenovaties tot in de puntjes.',
        coordinates: { lat: 51.0556, lng: 4.6307 },
    },
    'heist-op-den-berg': {
        name: 'Heist-op-den-Berg',
        zip: '2220',
        description: 'Ramen, deuren en renovatie in Heist-op-den-Berg. Vraag uw gratis offerte aan bij uw lokale specialist.',
        coordinates: { lat: 51.0762, lng: 4.7226 },
    },
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

    if (!cityData) {
        // Fallback if city not found, redirecting to contact or generic page is also an option, 
        // but render not found content is safer for SEO than redirect loops if logic fails.
        // Better yet, redirect to home or show generic "Werkgebied" info.
        // For now, let's redirect to home if invalid city (or keep simple error message)
        if (city) return <Navigate to="/contact" replace />;
        return null;
    }

    return (
        <div className="bg-white">
            {/* City Specific Hero */}
            <section className="relative py-24 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {/* Generic background pattern or map image could go here */}
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
                            {cityData.description}
                            <br className="hidden md:block" />
                            Yannova Bouw is uw betrouwbare aannemer in de regio {cityData.name}.
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
                            <p className="text-gray-600">Ja, wij werken in heel {cityData.name} ({cityData.zip}) en de omliggende deelgemeenten. Of u nu in het centrum, een woonwijk of landelijk woont, wij komen graag bij u langs.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-brand-dark mb-2">Komen jullie langs voor een vrijblijvende offerte in {cityData.name}?</h3>
                            <p className="text-gray-600">Absoluut. Wij komen gratis ter plaatse in {cityData.name} om de werken te bekijken, opmetingen te doen en uw wensen te bespreken. Daarna ontvangt u een gedetailleerde offerte zonder verplichtingen.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-brand-dark mb-2">Doen jullie ook kleine renovaties in {cityData.name}?</h3>
                            <p className="text-gray-600">Zeker! Naast totaalrenovaties helpen wij u ook graag met kleinere projecten zoals het vervangen van één raam, het isoleren van een gevel of het schilderen van uw woning in {cityData.name}.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegioPage;
