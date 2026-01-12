import React from 'react';
import BeforeAfterSlider from '../ui/BeforeAfterSlider';
import GoogleReviewsWidget from '../ui/GoogleReviewsWidget';

const ShowcaseSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Zie het verschil dat wij maken
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van verouderde gevels tot moderne, energiezuinige woningen. 
              Ontdek hoe wij huizen transformeren en wat onze klanten ervan vinden.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Before/After Slider */}
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-6">
                Voor & Na: Gevelrenovatie Keerbergen
              </h3>
              <BeforeAfterSlider
                beforeImage="/images/foto's/Gemini_Generated_Image_4f1lyg4f1lyg4f1l.jpg"
                afterImage="/images/foto's/Gemini_Generated_Image_12huit12huit12hu.jpg"
                beforeLabel="Voor renovatie"
                afterLabel="Na renovatie"
                className="mb-6"
              />
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600 mb-1">EPC F</div>
                    <div className="text-sm text-gray-600">Voor renovatie</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">EPC B</div>
                    <div className="text-sm text-gray-600">Na renovatie</div>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 text-center">
                  <div className="text-lg font-semibold text-brand-accent">40% energiebesparing</div>
                  <div className="text-sm text-gray-600">€960 per jaar minder energiekosten</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <a 
                  href="/projecten"
                  className="inline-flex items-center text-brand-accent hover:text-orange-700 font-semibold"
                >
                  Bekijk meer projecten
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Google Reviews */}
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-6">
                Wat onze klanten zeggen
              </h3>
              <GoogleReviewsWidget 
                maxReviews={3}
                showHeader={true}
                compact={false}
              />
              
              <div className="mt-6 bg-brand-light rounded-lg p-6 border border-orange-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold text-brand-accent">5.0</div>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-700">Gebaseerd op 50+ Google reviews</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>100% van onze klanten</strong> beveelt Yannova aan voor ramen, deuren en gevelwerken.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                Klaar om te starten?
              </h3>
              <p className="text-gray-600">
                Kies hoe u contact wilt opnemen voor uw gratis advies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <a 
                href="/budget-tool"
                className="bg-brand-light border border-orange-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow group"
              >
                <div className="text-3xl mb-3">🧮</div>
                <h4 className="font-semibold text-brand-dark mb-2">Budget Tool</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Krijg in 2 minuten een prijsindicatie
                </p>
                <div className="text-brand-accent font-medium group-hover:text-orange-700">
                  Start calculator →
                </div>
              </a>

              <a 
                href="/contact"
                className="bg-brand-accent text-white rounded-lg p-6 text-center hover:bg-orange-700 transition-colors group"
              >
                <div className="text-3xl mb-3">📋</div>
                <h4 className="font-semibold mb-2">Offerte Aanvragen</h4>
                <p className="text-sm text-orange-100 mb-3">
                  Gedetailleerde offerte binnen 24u
                </p>
                <div className="text-white font-medium">
                  Naar formulier →
                </div>
              </a>

              <a 
                href="tel:+32489960001"
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow group"
              >
                <div className="text-3xl mb-3">📞</div>
                <h4 className="font-semibold text-green-800 mb-2">Direct Bellen</h4>
                <p className="text-sm text-green-700 mb-3">
                  Persoonlijk advies aan de telefoon
                </p>
                <div className="text-green-600 font-medium group-hover:text-green-700">
                  +32 489 96 00 01
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;