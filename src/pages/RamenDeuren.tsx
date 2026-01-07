import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize, Shield, Grid, Layers, Home, CheckCircle, Wind, ChevronDown, Zap, CheckCircle2 } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import QuoteCalculator from '@/components/sections/QuoteCalculator';

// FAQ data voor SEO
const FAQ_ITEMS = [
    {
        question: "Wat kost het om ramen te laten plaatsen in Zoersel of Mechelen?",
        answer: "Dat hangt af van het type raam (PVC of aluminium), de afmetingen en het aantal ramen. Als richtprijs: PVC ramen kosten gemiddeld €300-€600 per m² en aluminium €400-€800 per m². We komen graag gratis langs voor een exacte opmeting en een duidelijke offerte op maat, zodat u meteen weet waar u aan toe bent."
    },
    {
        question: "Wat is het verschil tussen PVC en aluminium ramen?",
        answer: "PVC ramen zijn meestal voordeliger, isoleren uitstekend en vragen weinig onderhoud. Aluminium ramen hebben slankere profielen, zijn extra sterk en ideaal voor grote glaspartijen of een strakke, moderne look. Beide opties zijn beschikbaar in veel kleuren en bieden vandaag een heel goede isolatie — we helpen u graag kiezen wat het best past bij uw woning en budget."
    },
    {
        question: "Hoe lang duurt het plaatsen van nieuwe ramen?",
        answer: "Voor een gemiddelde woning met 8-10 ramen rekenen we meestal op 2-3 werkdagen. Grotere projecten of een volledige renovatie kunnen wat langer duren. We plannen alles in overleg en zorgen voor een nette werf, zodat u zo weinig mogelijk hinder ondervindt."
    },
    {
        question: "Welke garantie krijg ik op mijn nieuwe ramen en deuren?",
        answer: "U krijgt 10 jaar garantie op onze ramen en deuren. Dat omvat zowel de materialen (profielen, beglazing, beslag) als de vakkundige plaatsing door ons eigen team. Zo kan u met een gerust gevoel investeren in comfort en energiezuinigheid."
    },
    {
        question: "Komen jullie ook in Zoersel, Putte en omgeving?",
        answer: "Ja. Yannova is actief in heel de provincie Antwerpen en Vlaams-Brabant. We werken onder andere in Zoersel, Mechelen, Antwerpen, Putte, Heist-op-den-Berg, Bonheiden, Lier, Nijlen en alle omliggende gemeenten. Twijfelt u of we bij u langskomen? Stuur ons gerust uw adres, dan bevestigen we het meteen."
    },
    {
        question: "Kan ik premies krijgen voor nieuwe ramen?",
        answer: "Ja! Voor ramen met hoogrendementsglas (Uw ≤ 1.5 W/m²K) krijgt u via de Mijn VerbouwPremie €30-50 per m² terug, met een maximum van €1.280. Let op: vanaf juli 2025 moet u ook ventilatieroosters hebben in droge kamers om de volledige premie te krijgen. Wij regelen de attesten en helpen u bij de aanvraag."
    },
    {
        question: "Moeten er ventilatieroosters in mijn nieuwe ramen?",
        answer: "Ja, dit is een belangrijke voorwaarde voor de Mijn VerbouwPremie. Vanaf 1 juli 2025 geldt voor iedereen: geen ventilatie = geen premie. In droge kamers (slaapkamers, living, bureau) moeten ventilatieroosters aanwezig zijn — in het raamkozijn, in de muur, of via een ventilatiesysteem. Onze ramen kunnen standaard met geïntegreerde ventilatieroosters geleverd worden, zodat u automatisch aan deze voorwaarde voldoet."
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

    // FAQ Schema voor Google Rich Snippets
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* FAQ Schema for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Nieuwe Ramen en Deuren in Zoersel?
                            <span className="block text-brand-accent mt-2">Comfort dat u elke dag voelt, jaar na jaar.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Warmer in de winter, koeler in de zomer — en vooral: meer rust in huis. Vanuit Zoersel plaatsen wij hoogwaardige PVC en aluminium ramen en deuren in Halle, Sint-Antonius, Antwerpen, Mechelen en de omliggende gemeenten.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/showroom"
                                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                Bekijk onze showroom (in opbouw)
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            <strong>Een warm huis begint bij goede isolatie.</strong> Met onze ramen en deuren geniet u niet alleen van een
                            prachtige uitstraling, maar ook van rust en veiligheid. Of u nu in het centrum van Zoersel woont, in Halle,
                            Sint-Antonius of in de ruimere regio Antwerpen en Mechelen: wij zorgen voor een oplossing op maat van uw woning.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            We denken met u mee over oriëntatie, inkijk, ventilatie en premies, zodat uw investering vandaag al klaar is voor
                            de EPB-normen van morgen. Tijdens de plaatsing blijft uw woning bewoonbaar en laten we de werf elke dag netjes achter.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
                            Kies wat bij uw woning past
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
                                            Bespreek dit met ons <ArrowRight className="ml-2" size={20} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Technische Specificaties - SEO & Trust */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
                            Sterke prestaties, elke dag opnieuw
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                                    <Zap className="text-brand-accent" />
                                    Isolatiewaarden
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">PVC Profielen</span>
                                        <span className="font-bold text-brand-dark">Uf tot 0.89 W/m²K</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Aluminium Profielen</span>
                                        <span className="font-bold text-brand-dark">Uf tot 0.96 W/m²K</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Beglazing (HR++)</span>
                                        <span className="font-bold text-brand-dark">Ug = 1.0 W/m²K</span>
                                    </li>
                                    <li className="flex justify-between items-center pb-2">
                                        <span className="text-gray-600">Beglazing (Triple)</span>
                                        <span className="font-bold text-brand-dark">Ug = 0.5 W/m²K</span>
                                    </li>
                                </ul>
                                <p className="mt-6 text-sm text-gray-500 italic">
                                    * Waarden afhankelijk van profiel en glastype. We adviseren u graag zodat u kiest wat écht bij uw woning en budget past.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                                    <Shield className="text-brand-accent" />
                                    Veiligheid & Comfort
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="bg-orange-50 p-3 rounded-lg h-fit">
                                            <CheckCircle2 className="text-brand-accent" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-1">Inbraakwerend</h4>
                                            <p className="text-gray-600 text-sm">Standaard voorzien van inbraakwerend beslag en paddenstoelnokken. Optioneel veiligheidsglas voor extra gemoedsrust.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-orange-50 p-3 rounded-lg h-fit">
                                            <Maximize className="text-brand-accent" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-1">Geluidsisolatie</h4>
                                            <p className="text-gray-600 text-sm">Houd straatlawaai buiten met onze akoestische beglazing. Ideaal voor woningen in drukke centra of langs steenwegen.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Werkwijze Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
                            Onze werkwijze: duidelijk, proper en zonder stress
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                {
                                    step: "01",
                                    title: "Gratis Opmeting",
                                    desc: "We komen bij u langs in Zoersel, Antwerpen, Mechelen en omgeving voor een nauwkeurige opmeting en helder advies."
                                },
                                {
                                    step: "02",
                                    title: "Offerte op Maat",
                                    desc: "U krijgt een duidelijke offerte zonder verrassingen, met alle opties netjes uitgelegd."
                                },
                                {
                                    step: "03",
                                    title: "Productie",
                                    desc: "Uw ramen en deuren worden op maat gemaakt met hoogwaardige profielen (Schüco, Reynaers, ...)."
                                },
                                {
                                    step: "04",
                                    title: "Vakkundige Plaatsing",
                                    desc: "Ons eigen team plaatst uw nieuwe ramen en werkt alles netjes af — met respect voor uw woning."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="relative p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white group">
                                    <div className="text-5xl font-bold text-gray-100 mb-4 group-hover:text-orange-100 transition-colors">{item.step}</div>
                                    <h3 className="text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
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
            {/* Calculator Section */}
            <QuoteCalculator />

            <FAQSection />

            {/* Regional Internal Linking Section - SEO */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">
                            Ramen en deuren in uw regio
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Yannova plaatst hoogwaardige ramen en deuren in heel de provincie Antwerpen en Vlaams-Brabant.
                            Ontdek wat we voor uw gemeente kunnen betekenen:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link to="/regio/zoersel" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Zoersel</span>
                            </Link>
                            <Link to="/regio/antwerpen" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Antwerpen</span>
                            </Link>
                            <Link to="/regio/mechelen" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Mechelen</span>
                            </Link>
                            <Link to="/regio/lier" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Lier</span>
                            </Link>
                            <Link to="/regio/malle" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Malle</span>
                            </Link>
                            <Link to="/regio/schilde" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Schilde</span>
                            </Link>
                            <Link to="/regio/putte" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Putte</span>
                            </Link>
                            <Link to="/regio/bonheiden" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Ramen en deuren Bonheiden</span>
                            </Link>
                        </div>
                        <p className="text-sm text-gray-500 text-center mt-6">
                            Ook actief in Keerbergen, Heist-op-den-Berg, Ranst, Brecht, Zandhoven, Wommelgem en omliggende gemeenten.
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Services - Cross-linking */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">Combineert u dit met andere werken?</h2>
                        <p className="text-gray-600">
                            Veel klanten combineren nieuwe ramen met gevelwerken of een totaalrenovatie. Dat is vaak voordeliger en efficiënter.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <Link to="/gevel" className="group bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all flex items-center gap-4">
                            <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-dark group-hover:text-brand-accent transition-colors">Gevelisolatie met crepi</h3>
                                <p className="text-sm text-gray-600">Combineer met buitenisolatie voor extra besparing.</p>
                            </div>
                        </Link>
                        <Link to="/renovatie" className="group bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all flex items-center gap-4">
                            <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                <Home size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-dark group-hover:text-brand-accent transition-colors">Totaalrenovatie</h3>
                                <p className="text-sm text-gray-600">Eén aanspreekpunt voor al uw verbouwingen.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-dark text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Zullen we uw ramen samen bekijken?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Vraag een vrijblijvende offerte aan. We komen graag langs voor opmeting en eerlijk advies, zodat u met zekerheid kiest.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            Plan een vrijblijvende opmeting
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
                        Snel duidelijkheid over prijzen, materialen en plaatsing in Zoersel, Mechelen en omgeving.
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
