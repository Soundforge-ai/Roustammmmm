import React from 'react';
import { Check, MapPin, Star, ArrowRight } from 'lucide-react';

export const SEOContent = () => {
    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 max-w-4xl">
                <article className="prose prose-lg mx-auto text-gray-700">

                    {/* H1 */}
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                        Ramen en Deuren op Maat in Vlaanderen – Yannova Bouw
                    </h1>

                    {/* Introductie */}
                    <div className="mb-10 text-lg leading-relaxed">
                        <p className="mb-4">
                            Yannova Bouw is uw betrouwbare partner voor <strong>ramen en deuren</strong> in Vlaanderen en heel België.
                            Wij plaatsen en vervangen <strong>ramen en deuren op maat</strong>, met focus op energiezuinigheid en kwaliteit.
                            Of het nu gaat om renovatie of nieuwbouw, wij zorgen voor een perfecte afwerking van uw woning.
                        </p>
                        <p>
                            Bent u op zoek naar ervaren vakmannen voor <strong>ramen en deuren plaatsen</strong>? Dan bent u bij Yannova Bouw aan het juiste adres.
                        </p>
                    </div>

                    {/* Diensten & Materialen */}
                    <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">Ramen en deuren op maat</h2>
                    <p className="mb-4">
                        Elke woning is uniek. Daarom leveren wij uitsluitend <strong>ramen en deuren op maat</strong>, passend bij uw stijl, budget en isolatie-eisen.
                        Onze materialen en diensten omvatten:
                    </p>
                    <ul className="mb-8 space-y-2 not-prose text-gray-700">
                        {[
                            'Energiezuinige PVC ramen',
                            'Duurzame aluminium ramen',
                            'Klassieke houten ramen',
                            'Stijlvolle voordeuren en achterdeuren',
                            'Plaatsing en vervanging bij renovatie en nieuwbouw'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Waarom Yannova Bouw */}
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 my-10">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                            <Star className="w-6 h-6 text-brand-accent fill-current" />
                            Waarom Kiezen voor Yannova Bouw?
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-4 not-prose text-gray-700">
                            {[
                                'Gespecialiseerd in ramen en deuren met jarenlange ervaring',
                                'Transparante offertes en persoonlijk advies',
                                'Hoogwaardige materialen en perfecte afwerking',
                                'Actief in heel Vlaanderen en omstreken',
                                'Betrouwbare service van begin tot eind'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 font-medium">
                                    <Check className="w-5 h-5 text-brand-accent flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lokale SEO */}
                    <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-brand-accent" />
                        Actief in heel Vlaanderen
                    </h2>
                    <p className="mb-8">
                        Yannova Bouw is actief in onder meer <strong>Antwerpen, Mechelen, Keerbergen</strong> en omliggende regio’s.
                        Woon je elders in Vlaanderen? Geen probleem, wij komen graag langs voor een vrijblijvend plaatsbezoek.
                    </p>

                    {/* CTA */}
                    <div className="bg-brand-dark text-white p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Wilt u uw ramen en deuren laten vervangen of nieuwe plaatsen?</h3>
                        <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                            Neem vandaag nog contact op met Yannova Bouw voor een <strong>gratis offerte</strong> en <strong>persoonlijk advies</strong>.
                        </p>
                        <a href="#contact" className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
                            <span>Vraag nu uw offerte aan!</span>
                            <ArrowRight size={20} />
                        </a>
                    </div>

                </article>
            </div>
        </section>
    );
};
