import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize, Shield, Grid, Layers, Home, CheckCircle, Wind, ChevronDown } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

// FAQ data voor SEO
const FAQ_ITEMS = [
    {
        question: "Wat kost het om ramen te laten plaatsen in Keerbergen of Mechelen?",
        answer: "De prijs hangt af van het type raam (PVC of aluminium), de afmetingen en het aantal. Gemiddeld kost PVC ramen €300-€600 per m², aluminium €400-€800 per m². Wij komen gratis langs voor een exacte opmeting en offerte op maat."
    },
    {
        question: "Wat is het verschil tussen PVC en aluminium ramen?",
        answer: "PVC ramen zijn goedkoper, zeer goed isolerend en onderhoudsvriendelijk. Aluminium ramen hebben slankere profielen, zijn sterker en ideaal voor grote glaspartijen. Beide zijn beschikbaar in vele kleuren en bieden uitstekende isolatie."
    },
    {
        question: "Hoe lang duurt het plaatsen van nieuwe ramen?",
        answer: "Voor een gemiddelde woning met 8-10 ramen rekent u op 2-3 werkdagen. Grotere projecten of volledige renovaties kunnen langer duren. Wij plannen altijd in overleg zodat u minimale hinder ondervindt."
    },
    {
        question: "Welke garantie krijg ik op mijn nieuwe ramen en deuren?",
        answer: "Wij bieden 10 jaar garantie op al onze ramen en deuren. Dit omvat zowel de materialen (profielen, beglazing, beslag) als de vakkundige plaatsing door onze eigen monteurs."
    },
    {
        question: "Komen jullie ook in Zoersel, Putte en omgeving?",
        answer: "Ja, Yannova is actief in heel de provincie Antwerpen en Vlaams-Brabant. We werken in Keerbergen, Mechelen, Zoersel, Putte, Heist-op-den-Berg, Bonheiden, Lier, Nijlen en alle omliggende gemeenten."
    },
    {
        question: "Kan ik premies krijgen voor nieuwe ramen?",
        answer: "Ja, voor energiezuinige ramen met een Uw-waarde ≤ 1.5 W/m²K kunt u in aanmerking komen voor premies van de Vlaamse overheid en uw netbeheerder. Wij adviseren u graag over de mogelijkheden en helpen met de aanvraag."
    }
];

const RamenDeuren: React.FC = () => {
    const services = [
        {
            id: 'pvc',
            title: 'PVC Ramen & Deuren',
            description: 'Uitstekende isolatie voor een voordelige prijs. Onze PVC ramen zijn duurzaam, onderhoudsvriendelijk en beschikbaar in talloze kleuren en houtstructuren.',
            icon: Shield,
            href: '/contact', // Linking to contact for quote since specific subpage doesn't exist yet
            image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&q=80',
            subcategories: ['Hoog isolerend', 'Onderhoudsarm', 'Houtlook beschikbaar', 'Budgetvriendelijk']
        },
        {
            id: 'alu',
            title: 'Aluminium Ramen & Deuren',
            description: 'Strak, modern en oersterk. Aluminium profielen zijn slank en laten maximaal licht binnen. Ideaal voor grote raampartijen en moderne woningen.',
            icon: Grid,
            href: '/contact',
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
            subcategories: ['Ultraslanke profielen', 'Grote glasoppervlakken', 'Steellook mogelijk', 'Levenslang kleurvast']
        },
        {
            id: 'voordeuren',
            title: 'Voordeuren & Inkom',
            description: 'Uw voordeur is het visitekaartje van uw woning. Kies uit onze veilige, isolerende en stijlvolle voordeuren in PVC of Aluminium.',
            icon: Home,
            href: '/showroom', // Linking to showroom
            image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?auto=format&fit=crop&q=80',
            subcategories: ['Inbraakveilig', 'Design panelen', 'Glaspartijen', 'Toegangscontrole']
        },
        {
            id: 'schuiframen',
            title: 'Schuiframen & Veranda\'s',
            description: 'Haal buiten naar binnen met onze soepel lopende schuiframen. Verkrijgbaar als hefschuif of mono-rail voor een naadloze overgang naar uw tuin.',
            icon: Maximize,
            href: '/contact',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80',
            subcategories: ['Hefschuifsystemen', 'Vlakke drempels', 'Panoramisch zicht', 'Optimale isolatie']
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Nieuwe Ramen en Deuren?
                            <span className="block text-brand-accent mt-2">Kies voor Kwaliteit en Comfort.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Bespaar direct op uw energiefactuur en verhoog de veiligheid van uw woning.
                            Wij plaatsen hoogwaardige PVC en Aluminium ramen in regio Keerbergen, Mechelen & Zoersel.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/showroom"
                                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                Bekijk onze Showroom
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            <strong>Een warm huis begint bij goede isolatie.</strong> Met onze ramen en deuren geniet u niet alleen van een
                            prachtige uitstraling, maar ook van rust en veiligheid. Of u nu kiest voor de moderne look van aluminium
                            of de warmte van PVC met houtlook: wij garanderen een perfecte plaatsing en afwerking tot in de kleinste details.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
                            Ons Aanbod
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <OptimizedImage
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <service.icon className="text-brand-accent mb-3" size={32} />
                                            <h3 className="text-2xl font-bold">{service.title}</h3>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                            {service.description}
                                        </p>

                                        {/* Subcategories */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {service.subcategories.map((sub, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium"
                                                >
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>

                                        <Link
                                            to={service.href}
                                            className="inline-flex items-center text-brand-accent font-bold hover:text-orange-700 transition-colors"
                                        >
                                            Meer informatie aanvragen
                                            <ArrowRight size={18} className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
                            Waarom Yannova voor uw Ramen & Deuren?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: "Topmerken & Kwaliteit", description: "Wij werken uitsluitend met gerenommeerde A-merken zoals Aluplast, Schüco en Reynaers voor gegarandeerde kwaliteit." },
                                { title: "Eigen Plaatsingsdienst", description: "Geen onderaannemers. Onze eigen vakmensen plaatsen uw ramen met oog voor detail en luchtdichtheid." },
                                { title: "EPB-Conform", description: "Al onze ramen voldoen aan de strengste isolatienormen voor nieuwbouw en renovatie." },
                                { title: "10 Jaar Garantie", description: "Zorgeloos genieten van uw nieuwe ramen en deuren dankzij onze uitgebreide waarborg." }
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="text-green-500 mt-1" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* CTA Section */}
            <section className="py-20 bg-brand-dark text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Klaar voor nieuwe ramen?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Vraag vandaag nog uw gratis offerte aan. Wij komen vrijblijvend langs voor opmeting en advies op maat.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            Gratis Offerte Aanvragen
                            <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

// FAQ Accordion Component
const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 text-center">
                        Veelgestelde Vragen over Ramen en Deuren
                    </h2>
                    <p className="text-gray-600 text-center mb-12">
                        Antwoorden op de meest gestelde vragen over ramen en deuren plaatsen in Keerbergen, Mechelen en omgeving.
                    </p>

                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    aria-expanded={openIndex === index}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                        {item.question}
                                    </h3>
                                    <ChevronDown
                                        className={`flex-shrink-0 text-brand-accent transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                            }`}
                                        size={24}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                        }`}
                                >
                                    <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RamenDeuren;
