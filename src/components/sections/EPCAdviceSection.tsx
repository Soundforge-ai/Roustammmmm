import React from 'react';

const EPCAdviceSection: React.FC = () => {
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              EPC-Advies & Renovatieplicht
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Wij denken mee met uw EPC-label
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sinds de renovatieplicht in Vlaanderen is de link tussen bouw en energie-advies onlosmakelijk. 
              Yannova helpt u de juiste keuzes maken voor een optimaal EPC-label.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: EPC Information */}
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-6">
                Renovatieplicht Vlaanderen
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-700 mb-2">Verplichte renovatie</h4>
                  <p className="text-gray-700 text-sm">
                    Woningen met EPC-label E of F moeten tegen 2030 gerenoveerd worden naar minimum label D.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-700 mb-2">Energiekosten</h4>
                  <p className="text-gray-700 text-sm">
                    Een woning met label F kost gemiddeld €2.400/jaar aan energie. 
                    Na renovatie naar label B daalt dit naar €1.200/jaar.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-700 mb-2">Woningwaarde</h4>
                  <p className="text-gray-700 text-sm">
                    Een beter EPC-label verhoogt de waarde van uw woning met 5-15%. 
                    Bovendien verkoopt uw woning sneller.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-brand-light rounded-lg p-6 border border-orange-200">
                <h4 className="font-semibold text-brand-dark mb-3">
                  🏆 Yannova's EPC-aanpak
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Samenwerking met gecertificeerde energiedeskundigen</li>
                  <li>✓ Advies over de beste volgorde van isoleren</li>
                  <li>✓ Maximale premies en subsidies benutten</li>
                  <li>✓ Eén aanspreekpunt voor uw volledige traject</li>
                </ul>
              </div>
            </div>

            {/* Right: EPC Scale & Calculator */}
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-brand-dark mb-6 text-center">
                  EPC-Schaal & Energiekosten
                </h3>

                <div className="space-y-3 mb-8">
                  {[
                    { label: 'A++', color: 'bg-green-700', cost: '€600', description: 'Passief huis niveau' },
                    { label: 'A+', color: 'bg-green-600', cost: '€800', description: 'Zeer energiezuinig' },
                    { label: 'A', color: 'bg-green-500', cost: '€1.000', description: 'Energiezuinig' },
                    { label: 'B', color: 'bg-lime-500', cost: '€1.200', description: 'Goed geïsoleerd' },
                    { label: 'C', color: 'bg-yellow-500', cost: '€1.500', description: 'Matig geïsoleerd' },
                    { label: 'D', color: 'bg-orange-500', cost: '€1.800', description: 'Minimum vereist 2030' },
                    { label: 'E', color: 'bg-red-500', cost: '€2.100', description: 'Slecht geïsoleerd' },
                    { label: 'F', color: 'bg-red-700', cost: '€2.400', description: 'Zeer slecht geïsoleerd' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`${item.color} text-white px-3 py-2 rounded font-bold text-sm w-12 text-center`}>
                        {item.label}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{item.description}</span>
                          <span className="font-semibold text-brand-dark">{item.cost}/jaar</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    * Gemiddelde energiekosten voor een rijwoning van 150m²
                  </div>
                  <div className="text-xs text-gray-500">
                    Gebaseerd op energieprijzen 2024
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <a 
                  href="/verbouwpremie-gids"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Ontdek uw premies
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">
              Klaar om uw EPC-label te verbeteren?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Laat ons uw huidige situatie analyseren en een stappenplan opstellen 
              voor de meest kostenefficiënte renovatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-brand-accent text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Gratis EPC-advies aanvragen
              </a>
              <a 
                href="/budget-tool"
                className="inline-flex items-center px-6 py-3 border-2 border-brand-accent text-brand-accent rounded-lg font-semibold hover:bg-brand-light transition-colors"
              >
                Budget berekenen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EPCAdviceSection;