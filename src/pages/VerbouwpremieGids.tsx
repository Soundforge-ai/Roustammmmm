import React, { useState } from 'react';

interface PremieData {
  category: string;
  maxAmount: number;
  percentage: number;
  conditions: string[];
  examples: string[];
}

const PREMIE_DATA_2026: PremieData[] = [
  {
    category: 'Gevelisolatie',
    maxAmount: 5000,
    percentage: 30,
    conditions: [
      'Minimum R-waarde van 3,5 m²K/W',
      'Uitvoering door erkende aannemer',
      'EPC-verbetering van minimum 20 punten'
    ],
    examples: [
      'EPS isolatie + crepi: €3.500 premie op €12.000',
      'Steenstrips met isolatie: €4.200 premie op €14.000'
    ]
  },
  {
    category: 'Ramen en Deuren',
    maxAmount: 3500,
    percentage: 25,
    conditions: [
      'U-waarde ramen ≤ 1,1 W/m²K',
      'U-waarde deuren ≤ 1,5 W/m²K',
      'Vervanging van minimum 3 ramen'
    ],
    examples: [
      '8 PVC ramen: €2.800 premie op €11.200',
      '6 aluminium ramen + voordeur: €3.200 premie op €12.800'
    ]
  },
  {
    category: 'Dakisolatie',
    maxAmount: 4000,
    percentage: 35,
    conditions: [
      'Minimum R-waarde van 6,0 m²K/W',
      'Isolatie van minimum 50m²',
      'Professionele dampscherm installatie'
    ],
    examples: [
      'Dakisolatie 120m²: €3.200 premie op €9.100',
      'Zoldervloerisolatie: €2.400 premie op €6.800'
    ]
  }
];

const INCOME_CATEGORIES = [
  {
    name: 'Laag inkomen',
    description: 'Tot €35.000 bruto gezinsinkomen',
    multiplier: 1.5,
    color: 'bg-green-100 text-green-800'
  },
  {
    name: 'Midden inkomen',
    description: '€35.000 - €65.000 bruto gezinsinkomen',
    multiplier: 1.0,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Hoog inkomen',
    description: 'Boven €65.000 bruto gezinsinkomen',
    multiplier: 0.7,
    color: 'bg-orange-100 text-orange-800'
  }
];

const VerbouwpremieGids: React.FC = () => {
  const [selectedIncome, setSelectedIncome] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const calculatePremie = (baseAmount: number, percentage: number, maxAmount: number) => {
    const multiplier = INCOME_CATEGORIES[selectedIncome].multiplier;
    const calculatedPremie = (baseAmount * percentage / 100) * multiplier;
    return Math.min(calculatedPremie, maxAmount * multiplier);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mijn VerbouwPremie Gids 2026
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Ontdek hoeveel premie u kunt krijgen voor uw renovatie. 
              Actuele bedragen en voorwaarden voor Vlaanderen.
            </p>
            <div className="bg-white/10 rounded-lg p-4 inline-block">
              <div className="text-2xl font-bold">Tot €5.000</div>
              <div className="text-sm">premie mogelijk</div>
            </div>
          </div>
        </div>
      </section>

      {/* Income Selector */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Selecteer uw inkomenscategorie voor een nauwkeurige berekening
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {INCOME_CATEGORIES.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIncome(index)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedIncome === index 
                      ? 'border-brand-accent bg-brand-light' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${category.color}`}>
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-600">{category.description}</div>
                  <div className="text-lg font-bold text-brand-dark mt-2">
                    {category.multiplier === 1.5 ? '+50% premie' : 
                     category.multiplier === 1.0 ? 'Standaard premie' : 
                     '-30% premie'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premie Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Premie-overzicht per categorie
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {PREMIE_DATA_2026.map((premie, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all cursor-pointer ${
                    selectedCategory === premie.category 
                      ? 'border-brand-accent' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === premie.category ? '' : premie.category)}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">
                      {premie.category}
                    </h3>
                    <div className="text-3xl font-bold text-green-600">
                      €{Math.round(premie.maxAmount * INCOME_CATEGORIES[selectedIncome].multiplier).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">maximum premie</div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Premiepercentage</div>
                      <div className="text-lg font-bold text-brand-accent">
                        {Math.round(premie.percentage * INCOME_CATEGORIES[selectedIncome].multiplier)}%
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Voorwaarden</div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {premie.conditions.map((condition, idx) => (
                          <li key={idx}>• {condition}</li>
                        ))}
                      </ul>
                    </div>

                    {selectedCategory === premie.category && (
                      <div className="border-t pt-4">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Voorbeelden</div>
                        <div className="space-y-2">
                          {premie.examples.map((example, idx) => (
                            <div key={idx} className="text-xs bg-green-50 p-2 rounded">
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combination Benefits */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-dark mb-8">
              Combineer voor maximale premie
            </h2>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">
                    Totaalrenovatie Pakket
                  </h3>
                  <ul className="text-left space-y-2 text-gray-700">
                    <li>✓ Gevelisolatie + crepi</li>
                    <li>✓ Nieuwe ramen en voordeur</li>
                    <li>✓ Dakisolatie verbetering</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    €{Math.round((5000 + 3500 + 4000) * INCOME_CATEGORIES[selectedIncome].multiplier).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">totale premie mogelijk</div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Besparing: €{Math.round(12500 * INCOME_CATEGORIES[selectedIncome].multiplier).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Zo vraagt u uw premie aan
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Offerte aanvragen',
                  description: 'Vraag een gedetailleerde offerte aan bij Yannova',
                  icon: '📋'
                },
                {
                  step: '2',
                  title: 'Premie aanvragen',
                  description: 'Dien uw aanvraag in via mijnverbouwpremie.be',
                  icon: '💻'
                },
                {
                  step: '3',
                  title: 'Werken uitvoeren',
                  description: 'Wij voeren de werken vakkundig uit',
                  icon: '🔨'
                },
                {
                  step: '4',
                  title: 'Premie ontvangen',
                  description: 'Ontvang uw premie binnen 3 maanden',
                  icon: '💰'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-brand-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="font-bold text-brand-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Klaar om uw premie te claimen?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Wij helpen u van A tot Z met uw premie-aanvraag. 
            Geen gedoe, gewoon uw renovatie en uw premie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Gratis premie-advies
            </a>
            <a 
              href="tel:+32489960001"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-accent transition-colors"
            >
              Bel direct: +32 489 96 00 01
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
            <p>
              * Premiebedragen zijn indicatief en gebaseerd op de regelgeving van 2026. 
              Definitieve bedragen zijn afhankelijk van uw specifieke situatie en de goedkeuring door de Vlaamse overheid. 
              Yannova helpt u graag bij het correct indienen van uw aanvraag.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerbouwpremieGids;