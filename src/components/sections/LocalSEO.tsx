import React from 'react';
import { MapPin, Phone, Mail, Clock, Award, Shield, Users } from 'lucide-react';

const SERVICE_REGIONS = [
  {
    region: 'Zoersel & Omgeving',
    cities: ['Zoersel', 'Malle', 'Schilde', 'Wijnegem', 'Ranst', 'Zandhoven', 'Brecht'],
  },
  {
    region: 'Antwerpen & Rand',
    cities: ['Antwerpen', 'Wommelgem', 'Boechout', 'Lint', 'Mortsel', 'Edegem', 'Kontich'],
  },
  {
    region: 'Mechelen & Omgeving',
    cities: ['Mechelen', 'Bonheiden', 'Duffel', 'Lier', 'Berlaar', 'Nijlen', 'Heist-op-den-Berg'],
  },
  {
    region: 'Vlaams-Brabant',
    cities: ['Keerbergen', 'Tremelo', 'Haacht', 'Putte', 'Rotselaar', 'Begijnendijk'],
  },
];

const SERVICES_LIST = [
  'PVC ramen plaatsen',
  'Aluminium ramen en deuren',
  'Gevelisolatie met EPS',
  'Crepi gevelafwerking',
  'Totaalrenovatie',
  'Voordeuren op maat',
  'Schuiframen en -deuren',
  'Dakisolatie',
];

const LocalSEO: React.FC = () => {
  return (
    <section id="werkgebied" className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="block text-brand-accent font-semibold tracking-wider uppercase text-sm mb-3">
            Werkgebied
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Ramen en Deuren Specialist in Provincie Antwerpen
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Yannova Bouw is actief in <strong>Zoersel</strong>, <strong>Antwerpen</strong>, <strong>Mechelen</strong> en heel de provincie. 
            Wij plaatsen <strong>PVC ramen</strong>, <strong>aluminium ramen en deuren</strong>, verzorgen <strong>gevelisolatie</strong> en <strong>totaalrenovaties</strong>.
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SERVICE_REGIONS.map((area) => (
            <div key={area.region} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-brand-accent" size={20} />
                <h3 className="font-bold text-brand-dark">{area.region}</h3>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                {area.cities.map((city) => (
                  <li key={city}>• Ramen en deuren {city}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Services & Trust Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Services */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-brand-dark mb-6">
              Onze Diensten in Zoersel, Antwerpen & Mechelen
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES_LIST.map((service) => (
                <div key={service} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 bg-brand-accent rounded-full flex-shrink-0" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-brand-dark rounded-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">Waarom Yannova Bouw?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Award className="text-brand-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold">15+ Jaar Ervaring</p>
                  <p className="text-gray-300 text-sm">Vakmanschap in ramen, deuren en renovatie</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="text-brand-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold">10 Jaar Garantie</p>
                  <p className="text-gray-300 text-sm">Op al onze installaties en werken</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="text-brand-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold">127+ Tevreden Klanten</p>
                  <p className="text-gray-300 text-sm">4.8/5 sterren gemiddelde beoordeling</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">
                Gratis Offerte voor Ramen en Deuren?
              </h3>
              <p className="text-gray-600">
                Neem contact op voor een vrijblijvende offerte. Wij komen gratis bij u langs voor opmeting en advies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+32489960001"
                className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Phone size={18} />
                +32 489 96 00 01
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Mail size={18} />
                Offerte Aanvragen
              </a>
            </div>
          </div>
        </div>

        {/* SEO Text Block */}
        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">
            Ramen en Deuren Kopen in Zoersel, Antwerpen of Mechelen?
          </h2>
          <p className="text-gray-600 mb-4">
            Bent u op zoek naar een betrouwbare aannemer voor <strong>ramen en deuren in Zoersel</strong>, <strong>Antwerpen</strong> of <strong>Mechelen</strong>? 
            Yannova Bouw is gespecialiseerd in de plaatsing van hoogwaardige <strong>PVC ramen</strong> en <strong>aluminium ramen en deuren</strong>. 
            Wij leveren en plaatsen <strong>draaikiepramen</strong>, <strong>schuiframen</strong>, <strong>voordeuren</strong> en <strong>achterpuien</strong> met 
            <strong> driedubbele beglazing</strong> voor optimale isolatie.
          </p>
          <p className="text-gray-600 mb-4">
            Naast ramen en deuren verzorgen wij ook <strong>gevelisolatie met EPS</strong> en <strong>crepi afwerking</strong>. 
            Dankzij de <strong>Mijn VerbouwPremie</strong> kunt u tot <strong>€5.000 premie</strong> ontvangen voor gevelisolatie. 
            Wij helpen u graag met de aanvraag.
          </p>
          <p className="text-gray-600">
            Actief in <strong>Zoersel</strong>, <strong>Malle</strong>, <strong>Schilde</strong>, <strong>Wijnegem</strong>, <strong>Ranst</strong>, 
            <strong> Antwerpen</strong>, <strong>Mechelen</strong>, <strong>Lier</strong>, <strong>Heist-op-den-Berg</strong>, <strong>Keerbergen</strong>, 
            <strong> Bonheiden</strong>, <strong>Putte</strong> en heel de provincie Antwerpen en Vlaams-Brabant.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocalSEO;
