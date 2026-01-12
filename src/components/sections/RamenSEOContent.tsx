import React from 'react';
import { Check } from 'lucide-react';

export const RamenSEOContent = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <article className="prose prose-lg mx-auto text-gray-700">
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                        Ramen en Deuren op Maat in Vlaanderen – Yannova Bouw
                    </h1>

                    <p className="mb-8 font-medium text-lg leading-relaxed">
                        Yannova Bouw is uw betrouwbare partner voor het plaatsen en vervangen van ramen en deuren in
                        heel Vlaanderen. Wij combineren vakmanschap, kwalitatieve materialen en een persoonlijke
                        aanpak voor elk renovatie- of nieuwbouwproject.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">Uw Partner voor Ramen en Deuren</h2>
                    <p className="mb-6">
                        Yannova Bouw is een betrouwbare bouwpartner gespecialiseerd in ramen en deuren. Wij
                        begeleiden u van advies tot perfecte plaatsing, met focus op kwaliteit, isolatie en afwerking.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-8">
                        <div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Onze Diensten</h3>
                            <ul className="space-y-2">
                                {[
                                    'PVC ramen',
                                    'Houten ramen',
                                    'Ramen vervangen',
                                    'Renovatie & nieuwbouw',
                                    'Aluminium ramen',
                                    'Voordeuren & achterdeuren',
                                    'Ramen en deuren op maat',
                                    'Energiezuinige oplossingen'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-brand-accent flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Waarom kiezen voor Yannova Bouw?</h3>
                            <ul className="space-y-2">
                                {[
                                    'Vakmanschap en ervaring',
                                    'Duidelijke en eerlijke offertes',
                                    'Perfecte afwerking',
                                    'Actief in heel Vlaanderen'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-brand-accent flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">Hoogwaardige Materialen</h2>
                    <p className="mb-6">
                        Wij werken uitsluitend met duurzame materialen die voldoen aan de Belgische normen voor
                        isolatie, veiligheid en levensduur.
                    </p>

                    <div className="bg-brand-light/10 p-6 rounded-lg border-l-4 border-brand-accent mt-8">
                        <p className="font-semibold text-brand-dark m-0">
                            Vraag vandaag nog uw gratis offerte aan. Persoonlijk advies & plaatsbezoek mogelijk.
                        </p>
                    </div>
                </article>
            </div>
        </section>
    );
};
