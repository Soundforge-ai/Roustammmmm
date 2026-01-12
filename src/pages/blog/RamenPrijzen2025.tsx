import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import QuoteCalculator from '../../components/sections/QuoteCalculator';

const RamenPrijzen2025: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Wat kosten nieuwe ramen in 2025? Prijzen & Premies | Yannova</title>
        <meta 
          name="description" 
          content="Actuele prijzen voor PVC en aluminium ramen in 2025. Ontdek hoeveel u betaalt per m² en op welke premies u recht heeft. Inclusief handige calculator." 
        />
        <meta 
          name="keywords" 
          content="ramen prijzen 2025, kosten nieuwe ramen, pvc ramen prijs, aluminium ramen prijs, premie ramen 2025, ramen vervangen kosten" 
        />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-brand-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-sm font-bold mb-6">
            <Info size={16} />
            <span>UPDATE 2025</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Wat kosten nieuwe ramen in 2025? <br/>
            <span className="text-brand-accent">Een compleet overzicht van prijzen & premies.</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
            Bent u van plan om uw ramen te vervangen? Een slimme investering! 
            In dit artikel ontdekt u de exacte prijzen per m², het verschil tussen PVC en aluminium, 
            en hoe u tot €1.280 premie terugkrijgt.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Intro */}
        <div className="prose prose-lg max-w-none text-gray-600 mb-12">
          <p>
            De energieprijzen blijven schommelen en de EPB-eisen worden strenger. 
            Het vervangen van enkel of oud dubbel glas door **hoogrendementsglas (HR++)** of driedubbel glas 
            is daarom één van de beste investeringen die u in 2025 kunt doen. 
            Maar wat kost dat nu precies?
          </p>
        </div>

        {/* Prijstabel */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
            <Calculator className="text-brand-accent" />
            Richtprijzen Ramen 2025 (incl. plaatsing & BTW)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 px-4 font-bold text-brand-dark">Type Raam</th>
                  <th className="py-4 px-4 font-bold text-brand-dark">Materiaal</th>
                  <th className="py-4 px-4 font-bold text-brand-dark">Prijs per m² (gemiddeld)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-4">Vast raam</td>
                  <td className="py-4 px-4">PVC</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">€250 - €400</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-4">Draaikiep raam</td>
                  <td className="py-4 px-4">PVC</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">€350 - €600</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-4">Vast raam</td>
                  <td className="py-4 px-4">Aluminium</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">€400 - €650</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-4">Draaikiep raam</td>
                  <td className="py-4 px-4">Aluminium</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">€600 - €900</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-4">Schuifraam</td>
                  <td className="py-4 px-4">PVC/Alu</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">€900 - €1.600</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            * Dit zijn richtprijzen. De exacte prijs hangt af van afmetingen, kleur, glas (HR++ of Triple) en afwerking.
          </p>
        </div>

        {/* Content Secties */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Waarom kiezen voor PVC?</h3>
            <ul className="space-y-3">
              {[
                'Uitstekende prijs-kwaliteitverhouding',
                'Hoogste isolatiewaarde',
                'Onderhoudsarm',
                'Beschikbaar in houtlook (folie)'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Waarom kiezen voor Aluminium?</h3>
            <ul className="space-y-3">
              {[
                'Slanke, moderne profielen',
                'Oersterk (ideaal voor grote ramen)',
                'Kleurvast en duurzaam',
                'Strakke, industriële look'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="text-brand-accent flex-shrink-0 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Premie Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-xl mb-16">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">💰 Premies in 2025: Mijn VerbouwPremie</h3>
          <p className="text-blue-800 mb-4 text-lg">
            De Vlaamse overheid geeft nog steeds flinke subsidies voor het vervangen van glas en schrijnwerk.
          </p>
          <ul className="space-y-2 text-blue-800 mb-6">
            <li>• <strong>Tot 50% terugbetaald</strong> voor de laagste inkomens.</li>
            <li>• <strong>Tot 35% terugbetaald</strong> voor middeninkomens.</li>
            <li>• Maximaal premiebedrag: <strong>€ 5.500</strong> (afhankelijk van categorie).</li>
          </ul>
          <div className="bg-white p-4 rounded-lg border border-blue-100 text-sm text-blue-700">
            <strong>⚠️ Let op:</strong> Vanaf 1 juli 2025 is het verplicht om bij vervanging van ramen ook 
            ventilatieroosters te plaatsen (of een ventilatiesysteem te hebben) om de premie te krijgen!
          </div>
        </div>

        {/* Calculator Sectie */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Bereken direct uw prijs</h2>
          <QuoteCalculator />
        </div>

        {/* CTA */}
        <div className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Wilt u de exacte prijs voor uw woning weten?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Wij komen gratis bij u langs in Zoersel, Antwerpen of Mechelen voor een opmeting en advies op maat.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Gratis offerte aanvragen <ArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RamenPrijzen2025;
