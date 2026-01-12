import React from 'react';
import BudgetWizard from '../components/features/BudgetWizard';

const BudgetTool: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Budget Indicatie Tool
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Krijg in 2 minuten een realistische prijsindicatie voor uw project. 
              Beantwoord enkele vragen en ontvang direct een budgetschatting.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold text-brand-dark mb-2">Snel resultaat</h3>
                <p className="text-sm text-gray-600">In 2 minuten een prijsindicatie</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-brand-dark mb-2">Nauwkeurig</h3>
                <p className="text-sm text-gray-600">Gebaseerd op echte projectprijzen</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold text-brand-dark mb-2">Premie-advies</h3>
                <p className="text-sm text-gray-600">Inclusief mogelijke subsidies</p>
              </div>
            </div>
          </div>

          {/* Budget Wizard */}
          <BudgetWizard />

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-brand-dark mb-4">
                Waarom een budget indicatie?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2" />
                  <span>Plan uw renovatie budget realistisch</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2" />
                  <span>Vergelijk verschillende opties</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2" />
                  <span>Ontdek mogelijke premies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2" />
                  <span>Geen verrassingen achteraf</span>
                </li>
              </ul>
            </div>

            <div className="bg-brand-light rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-brand-dark mb-4">
                Na uw budget indicatie
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark">Gratis plaatsbezoek</div>
                    <div className="text-sm text-gray-600">We komen langs voor een exacte opmeting</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark">Gedetailleerde offerte</div>
                    <div className="text-sm text-gray-600">Binnen 48u een uitgebreide prijsofferte</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark">Premie-ondersteuning</div>
                    <div className="text-sm text-gray-600">Hulp bij het aanvragen van subsidies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-lg text-gray-700 italic mb-4">
              "De budget tool gaf ons een perfect beeld van de kosten. 
              De uiteindelijke prijs kwam exact overeen met de indicatie!"
            </blockquote>
            <div className="font-semibold text-brand-dark">— Familie Janssens, Keerbergen</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTool;