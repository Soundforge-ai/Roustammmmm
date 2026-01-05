import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Hammer, PaintBucket, Ruler, Home, CheckCircle, Bath, ChevronDown, Layers, Grid } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

// FAQ data voor SEO
const FAQ_ITEMS = [
    {
        question: "Hoeveel kost een totaalrenovatie per m²?",
        answer: "Een totaalrenovatie kost gemiddeld €800 tot €1.500 per m², afhankelijk van de staat van de woning, de gekozen materialen en de omvang van de werken. Wij maken altijd een gedetailleerde offerte op maat na een plaatsbezoek."
    },
    {
        question: "Hoe lang duurt een volledige renovatie?",
        answer: "Een totaalrenovatie van een gemiddelde woning duurt 3 tot 6 maanden. Een badkamerrenovatie duurt 2-3 weken, een zolderinrichting 2-4 weken. De exacte duur hangt af van de omvang en complexiteit van het project."
    },
    {
        question: "Kan ik in mijn woning blijven wonen tijdens de renovatie?",
        answer: "Bij kleinere renovaties zoals een badkamer of zolder is dat meestal mogelijk. Bij een totaalrenovatie raden we aan om tijdelijk elders te verblijven voor uw comfort en om de werken sneller te laten verlopen."
    },
    {
        question: "Welke premies kan ik krijgen voor renovatie?",
        answer: "Voor energiebesparende renovaties (isolatie, hoogrendementsbeglazing, warmtepomp) kunt u premies krijgen van de Vlaamse overheid en uw netbeheerder. Ook voor sloop en heropbouw bestaan er BTW-voordelen. Wij adviseren u graag over de mogelijkheden."
    },
    {
        question: "Werkt Yannova ook in Zoersel, Mechelen en Antwerpen?",
        answer: "Ja, Yannova voert renovatiewerken uit in heel de provincie Antwerpen en Vlaams-Brabant. We zijn actief in Zoersel, Mechelen, Antwerpen, Putte, Heist-op-den-Berg, Bonheiden, Lier en alle omliggende gemeenten."
    },
    {
        question: "Verzorgt Yannova ook de vergunningen?",
        answer: "Wij begeleiden u bij het aanvragen van de nodige vergunningen. Voor bepaalde werken is een omgevingsvergunning nodig. Wij werken samen met architecten en kunnen u doorverwijzen indien nodig."
    }
];

const Renovatie: React.FC = () => {
    const services = [
        {
            id: 'totaalrenovatie',
            title: 'Totaalrenovatie',
            description: 'Uw woning compleet vernieuwd. Wij strippen de woning en bouwen alles opnieuw op volgens de nieuwste normen. Eén aanspreekpunt voor alle werken.',
            icon: Home,
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
            subcategories: ['Sloopwerken', 'Nieuwe indeling', 'Technieken', 'Afwerking']
        },
        {
            id: 'badkamer',
            title: 'Badkamerrenovatie',
            description: 'Van oude badkamer naar wellness oase. Wij verzorgen sanitair, tegelwerken, en meubelplaatsing voor een perfecte afwerking.',
            icon: Bath, // Using Bath icon (or similar if not available, Bath exists in Lucide)
            image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80',
            subcategories: ['Inloopdouches', 'Wandtegels', 'Sanitair', 'Badkamermeubels']
        },
        {
            id: 'gyproc',
            title: 'Gyproc & Isolatie',
            description: 'Strakke muren en plafonds met Gyproc. Combineer met isolatie voor een energiezuinige en comfortabele woning.',
            icon: Ruler,
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80',
            subcategories: ['Scheidingswanden', 'Verlaagde plafonds', 'Zolderinrichting', 'Thermische isolatie']
        },
        {
            id: 'zolder',
            title: 'Zolderinrichting',
            description: 'Maak van uw zolder een volwaardige leefruimte. Wij isoleren het dak, plaatsen dakramen en werken alles netjes af.',
            icon: Hammer,
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80',
            subcategories: ['Dakisolatie', 'Velux dakramen', 'Vloerplaten', 'Schilderwerken']
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-slate-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80')] opacity-30 bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Totaalrenovatie & Verbouwingen
                            <span className="block text-brand-accent mt-2">in Antwerpen & Mechelen</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Van badkamer tot totaalproject. Yannova coördineert en realiseert uw verbouwing met vakmensen en kwaliteitsmaterialen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/portfolio"
                                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                Onze Realisaties
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
                            <strong>Verbouwen is een investering in uw toekomst.</strong>
                            Het verhoogt niet alleen de waarde van uw woning, maar ook uw wooncomfort.
                            Wij nemen de stress van de verbouwing weg door een strakke planning en heldere communicatie.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">
                            Renovatiewerken
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
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
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                                                >
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>

                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center text-brand-dark font-bold hover:text-brand-accent transition-colors"
                                        >
                                            Bespreek uw project
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
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                            Uw partner in renovatie
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: "Eén aanspreekpunt", description: "Geen gedoe met verschillende aannemers. Wij coördineren alle werken voor u." },
                                { title: "Strakke Planning", description: "Wij houden ons aan de afgesproken termijnen, zodat u niet onnodig lang in de rommel zit." },
                                { title: "Nette Afwerking", description: "Wij laten de werf elke dag netjes achter en werken tot in de puntjes af." },
                                { title: "Budgetcontrole", description: "Duidelijke offertes zonder verrassingen achteraf." }
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="text-brand-accent mt-1" size={24} />
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

            {/* Related Services - Internal Linking */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Onze andere specialisaties</h2>
                        <p className="text-gray-600">
                            Yannova is meer dan enkel renovatie. Bekijk ook onze specifieke diensten voor gevels en schrijnwerk.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Link to="/gevel" className="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all flex items-center gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-accent transition-colors">Gevelrenovatie & Crepi</h3>
                                <p className="text-sm text-gray-600 mt-1">Isolatie en afwerking voor een nieuwe look.</p>
                            </div>
                            <ArrowRight className="ml-auto text-gray-400 group-hover:text-brand-accent transform group-hover:translate-x-1 transition-all" size={20} />
                        </Link>
                        <Link to="/ramen-deuren" className="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all flex items-center gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                <Grid size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-accent transition-colors">Ramen & Deuren</h3>
                                <p className="text-sm text-gray-600 mt-1">PVC en Aluminium schrijnwerk op maat.</p>
                            </div>
                            <ArrowRight className="ml-auto text-gray-400 group-hover:text-brand-accent transform group-hover:translate-x-1 transition-all" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* CTA Section */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Plannen om te verbouwen?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Groot of klein project? Wij denken graag met u mee voor de beste oplossing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            Vraag advies aan
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
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
                        Veelgestelde Vragen over Renovatie
                    </h2>
                    <p className="text-gray-600 text-center mb-12">
                        Antwoorden op de meest gestelde vragen over renoveren in Zoersel, Mechelen en omgeving.
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

export default Renovatie;
