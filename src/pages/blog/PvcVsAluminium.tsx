import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, ShieldCheck, Zap, Palette } from 'lucide-react';

const PvcVsAluminium: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>PVC of Aluminium ramen kiezen? De complete vergelijking (2025) | Yannova</title>
        <meta 
          name="description" 
          content="Twijfelt u tussen PVC en aluminium ramen? Wij vergelijken prijs, isolatie, levensduur en uitstraling. Lees ons eerlijk advies en maak de juiste keuze voor uw woning." 
        />
        <meta 
          name="keywords" 
          content="pvc of aluminium ramen, verschil pvc aluminium, beste ramen 2025, ramen kiezen, isolatiewaarde pvc vs aluminium, prijsverschil ramen" 
        />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent/10 opacity-20 pattern-grid-lg"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
            KEUZEHULP
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            PVC of Aluminium ramen? <br/>
            <span className="text-brand-accent">De definitieve vergelijking.</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
            Het is de meest gestelde vraag in onze toonzaal: "Wat is beter?" 
            Het eerlijke antwoord? Er is geen "beter", er is alleen "beter voor úw situatie". 
            Wij zetten alle feiten op een rij.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Quick Comparison Summary */}
        <div className="bg-brand-light/30 border border-brand-accent/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">In het kort: wanneer kiest u wat?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-brand-dark mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">P</div>
                Kies voor PVC als:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1" /> U de beste isolatie wilt voor de beste prijs.</li>
                <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1" /> U een onderhoudsarm product zoekt.</li>
                <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1" /> U een klassieke of landelijke stijl wilt (houtlook).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-brand-dark mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">A</div>
                Kies voor Aluminium als:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1" /> U grote raampartijen of schuiframen wilt.</li>
                <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1" /> U houdt van ultra-slanke profielen.</li>
                <li className="flex gap-2"><Check size={18} className="text-green-500 mt-1" /> U een strakke, moderne "steellook" zoekt.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <h2 className="text-3xl font-bold text-brand-dark mb-8">De Grote Vergelijking</h2>
        <div className="overflow-x-auto mb-16 shadow-lg rounded-xl border border-gray-100">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-5 px-6 font-bold text-brand-dark w-1/3">Eigenschap</th>
                <th className="py-5 px-6 font-bold text-brand-dark w-1/3">PVC</th>
                <th className="py-5 px-6 font-bold text-brand-dark w-1/3">Aluminium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-brand-accent" /> Levensduur
                </td>
                <td className="py-4 px-6 text-gray-600">Gemiddeld 25-35 jaar</td>
                <td className="py-4 px-6 text-gray-600">Gemiddeld 40-50+ jaar</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-2">
                  <Zap size={18} className="text-brand-accent" /> Isolatie (Uw-waarde)
                </td>
                <td className="py-4 px-6 text-gray-600">Uitstekend (tot 0.75 W/m²K)</td>
                <td className="py-4 px-6 text-gray-600">Zeer goed (tot 0.85 W/m²K)</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-2">
                  <Palette size={18} className="text-brand-accent" /> Uitstraling
                </td>
                <td className="py-4 px-6 text-gray-600">Robuuster, diverse folies (houtnerf)</td>
                <td className="py-4 px-6 text-gray-600">Strak, slank, poedercoating in alle RAL-kleuren</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-medium text-gray-900">Prijsindicatie</td>
                <td className="py-4 px-6 text-green-600 font-bold">€€ (Voordeligst)</td>
                <td className="py-4 px-6 text-orange-600 font-bold">€€€ (+20% tot +30%)</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-medium text-gray-900">Onderhoud</td>
                <td className="py-4 px-6 text-gray-600">Zeer laag (af en toe reinigen)</td>
                <td className="py-4 px-6 text-gray-600">Zeer laag (zeer krasbestendig)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deep Dive Sections */}
        <div className="space-y-12 mb-16">
          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Isolatie: De winnaar is PVC (maar nipt)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PVC is van nature een isolerend materiaal. Aluminium is een metaal en geleidt dus warmte en koude. 
              Vroeger was aluminium daardoor een slechte keuze voor isolatie, maar dat is verleden tijd.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Moderne aluminium profielen hebben een "thermische onderbreking" (een kunststof kern), waardoor ze uitstekend isoleren. 
              Toch blijft PVC de kampioen als u streeft naar de allerlaagste energierekening of een passiefhuis bouwt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">2. Prijsverschil: Waar betaalt u voor?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aluminium is een duurdere grondstof en het productieproces is complexer. Hierdoor ligt de prijs voor aluminium ramen 
              gemiddeld <strong>20% tot 30% hoger</strong> dan voor PVC.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Is aluminium dat waard? Ja, als u houdt van grote glasoppervlakken. Aluminium is oersterk, waardoor de profielen 
              veel slanker kunnen zijn dan bij PVC om hetzelfde gewicht aan glas te dragen. U krijgt dus letterlijk "meer raam" en meer licht.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Twijfelt u nog steeds?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Kom de verschillen voelen en bekijken. Wij hebben zowel topklasse PVC als Aluminium stalen. 
              Of vraag een offerte voor beide opties aan, zodat u de prijs exact kunt vergelijken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
              >
                Vraag een vergelijkende offerte <ArrowRight />
              </Link>
              <Link 
                to="/showroom" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                Bekijk voorbeelden
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PvcVsAluminium;
