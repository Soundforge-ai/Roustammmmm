import React from 'react';
import { PaintBucket, CheckCircle2, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

import SEO from '@/components/seo/SEO';
import OptimizedImage from '@/components/ui/OptimizedImage';

const Schilderwerken: React.FC = () => {
    return (
        <div className="bg-white">
            <SEO
                title="Schilderwerken Binnen & Buiten"
                description="Professionele schilderwerken in Zoersel en Antwerpen. Voor binnen- en buitenschilderwerk, muren, plafonds en gevels. Vraag uw gratis offerte."
                keywords="schilderwerken, binnenhuis schilder, buitenschilder, schilder Zoersel, schilder Antwerpen, gevel schilderen, muren schilderen"
            />
            {/* Hero Section */}
            <section className="relative py-20 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
                    {/* Note: In a real implementation, you'd want a specific image for painting here */}
                    <OptimizedImage
                        src="/images/c67c2ffe-a42b-477f-a67d-10100999c4f0.jpg"
                        alt="Schilderwerken"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Professionele Schilderwerken
                            <span className="block text-brand-accent mt-2">Binnen en Buiten</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                            Een nieuwe kleur doet wonderen. Van muren en plafonds tot gevels en houtwerk: wij zorgen voor een strakke afwerking en een resultaat dat lang mooi blijft.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                            >
                                Plan een vrijblijvende bespreking <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light text-brand-accent font-medium text-sm mb-6">
                                <PaintBucket size={16} />
                                <span>Binnenschilderwerken</span>
                            </div>
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">
                                Sfeer en Kwaliteit in uw Interieur
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Een nieuw kleurtje kan wonderen doen voor uw interieur. Of het nu gaat om het schilderen van muren,
                                plafonds, deuren of trappen: wij leveren maatwerk met oog voor detail. Wij adviseren u graag
                                over de juiste kleurkeuze en verfsoorten voor een duurzaam resultaat.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Muren en plafonds',
                                    'Lakwerk van deuren en ramen',
                                    'Trappenhuis schilderen',
                                    'Decoratieve technieken',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-brand-accent flex-shrink-0" size={20} />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl group">
                            <OptimizedImage
                                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80"
                                alt="Binnenschilderwerken interieur"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white font-medium">Binnenschilderwerk</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative h-96 rounded-2xl overflow-hidden shadow-xl group">
                            <OptimizedImage
                                src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80"
                                alt="Buitenschilderwerken gevel"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white font-medium">Buitenschilderwerk</div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light text-brand-accent font-medium text-sm mb-6">
                                <Home size={16} />
                                <span>Buitenschilderwerken</span>
                            </div>
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">
                                Bescherming en Uitstraling
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Buitenschilderwerk is essentieel voor de bescherming van uw woning tegen weersinvloeden.
                                Wij schilderen gevels, ramen, deuren, goten en houtwerk met hoogwaardige buitenverf die
                                jarenlang meegaat en bestand is tegen zon en regen.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Gevels schilderen of kaleien',
                                    'Buitenschrijnwerk (ramen, deuren)',
                                    'Dakgoten en kroonlijsten',
                                    'Tuinhuizen en schuttingen',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-brand-accent flex-shrink-0" size={20} />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">Waarom Kiezen voor Onze Schilderwerken?</h2>
                        <p className="text-gray-600">We combineren vakmanschap met kwaliteitsverf en een propere werf — voor een resultaat waar u trots op bent.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: 'Kwaliteitsverf',
                                desc: 'Wij werken enkel met professionele verfmerken zoals Sigma, Sikkens en Trimetal voor een duurzaam resultaat.',
                            },
                            {
                                icon: CheckCircle2,
                                title: 'Nette Uitvoering',
                                desc: 'Wij dekken alles zorgvuldig af en laten uw woning netjes achter na de werken. Respect voor uw interieur staat centraal.',
                            },
                            {
                                icon: PaintBucket,
                                title: 'Kleuradvies',
                                desc: 'Twijfelt u over de kleur? Wij geven professioneel kleuradvies aan huis, afgestemd op uw lichtinval en inrichting.',
                            },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-brand-light text-brand-accent rounded-lg flex items-center justify-center mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-accent text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Klaar voor een Nieuwe Look?</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Vertel ons kort wat u wil laten schilderen. We denken mee, geven eerlijk advies en bezorgen een duidelijke offerte.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-white text-brand-accent px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Vraag een vrijblijvende offerte aan
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Schilderwerken;
