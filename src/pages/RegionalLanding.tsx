import React from 'react';
import { useParams } from 'react-router-dom';

interface RegionData {
  name: string;
  province: string;
  postalCodes: string[];
  description: string;
  localProjects: number;
  specialties: string[];
  nearbyAreas: string[];
  seoContent: {
    title: string;
    description: string;
    keywords: string;
  };
}

const REGION_DATA: Record<string, RegionData> = {
  'mechelen': {
    name: 'Mechelen',
    province: 'Antwerpen',
    postalCodes: ['2800', '2801', '2802', '2803', '2804'],
    description: 'Yannova Bouw is uw betrouwbare partner voor ramen, deuren en gevelwerken in Mechelen en omgeving.',
    localProjects: 45,
    specialties: ['Gevelrenovatie historische panden', 'Energiezuinige ramen', 'Crepi en isolatie'],
    nearbyAreas: ['Hombeek', 'Walem', 'Heffen', 'Muizen', 'Leest'],
    seoContent: {
      title: 'Ramen, Deuren & Gevelwerken Mechelen | Yannova Bouw',
      description: 'Specialist in ramen, deuren en gevelrenovatie in Mechelen. 15+ jaar ervaring, lokale service. Gratis offerte binnen 24u. ☎ +32 489 96 00 01',
      keywords: 'ramen Mechelen, deuren Mechelen, gevelwerken Mechelen, crepi Mechelen, renovatie Mechelen, bouwbedrijf Mechelen'
    }
  },
  'keerbergen': {
    name: 'Keerbergen',
    province: 'Vlaams-Brabant',
    postalCodes: ['3140'],
    description: 'In Keerbergen staan wij klaar voor al uw bouw- en renovatieprojecten met persoonlijke service.',
    localProjects: 32,
    specialties: ['Totaalrenovaties', 'PVC en aluminium ramen', 'Gevelisolatie'],
    nearbyAreas: ['Tremelo', 'Haacht', 'Boortmeerbeek', 'Kampenhout'],
    seoContent: {
      title: 'Bouwbedrijf Keerbergen | Ramen, Deuren, Renovatie | Yannova',
      description: 'Lokaal bouwbedrijf in Keerbergen voor ramen, deuren en renovaties. Persoonlijke service, vakmanschap. Bel +32 489 96 00 01 voor gratis offerte.',
      keywords: 'bouwbedrijf Keerbergen, ramen Keerbergen, renovatie Keerbergen, aannemer Keerbergen, deuren Keerbergen'
    }
  },
  'zoersel': {
    name: 'Zoersel',
    province: 'Antwerpen',
    postalCodes: ['2980'],
    description: 'Gevestigd in Zoersel, kennen wij de lokale bouwstijl en wensen van onze klanten als geen ander.',
    localProjects: 67,
    specialties: ['Moderne ramen en deuren', 'Gevelbepleistering', 'Energieadvies'],
    nearbyAreas: ['Wijnegem', 'Schilde', 'Brasschaat', 'Malle', 'Zandhoven'],
    seoContent: {
      title: 'Ramen en Deuren Zoersel | Lokaal Bouwbedrijf | Yannova',
      description: 'Yannova Bouw uit Zoersel: uw specialist voor ramen, deuren en gevelwerken. Lokale service, 15+ jaar ervaring. Gratis offerte aanvragen.',
      keywords: 'ramen Zoersel, deuren Zoersel, bouwbedrijf Zoersel, gevelwerken Zoersel, renovatie Zoersel, aannemer Zoersel'
    }
  },
  'leuven': {
    name: 'Leuven',
    province: 'Vlaams-Brabant',
    postalCodes: ['3000', '3001', '3010', '3012'],
    description: 'Ook in de studentenstad Leuven zorgen wij voor kwalitatieve renovaties en nieuwbouw.',
    localProjects: 28,
    specialties: ['Studentenhuisvesting renovatie', 'Geluidsisolatie', 'Snelle service'],
    nearbyAreas: ['Heverlee', 'Kessel-Lo', 'Wilsele', 'Wijgmaal', 'Korbeek-Lo'],
    seoContent: {
      title: 'Renovatie & Ramen Leuven | Bouwbedrijf | Yannova',
      description: 'Renovatie en ramen/deuren in Leuven. Specialisatie in studentenhuisvesting en geluidsisolatie. Ervaren team, snelle service.',
      keywords: 'renovatie Leuven, ramen Leuven, bouwbedrijf Leuven, studentenhuisvesting renovatie, geluidsisolatie Leuven'
    }
  }
};

const RegionalLanding: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const regionData = city ? REGION_DATA[city.toLowerCase()] : null;

  if (!regionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Regio niet gevonden</h1>
          <p className="text-gray-600 mb-6">
            We zijn momenteel niet actief in deze regio, maar neem gerust contact op.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-brand-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Contact opnemen
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-dark to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              📍 Actief in {regionData.name}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ramen, Deuren & Renovatie<br />
              <span className="text-brand-accent">{regionData.name}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {regionData.description} Met {regionData.localProjects}+ afgeronde projecten 
              in {regionData.name} en omgeving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-brand-accent text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Gratis offerte {regionData.name}
              </a>
              <a 
                href="tel:+32489960001"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-dark transition-colors"
              >
                📞 +32 489 96 00 01
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">
              Waarom kiezen voor Yannova in {regionData.name}?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent mb-2">
                  {regionData.localProjects}+
                </div>
                <div className="text-gray-600">Projecten in {regionData.name}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent mb-2">
                  15+
                </div>
                <div className="text-gray-600">Jaar lokale ervaring</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent mb-2">
                  24u
                </div>
                <div className="text-gray-600">Reactietijd offerte</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-brand-dark mb-6">
                Onze specialiteiten in {regionData.name}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {regionData.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-brand-light rounded-lg">
                    <div className="w-2 h-2 bg-brand-accent rounded-full" />
                    <span className="font-medium text-brand-dark">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Region */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">
              Onze diensten in {regionData.name}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: `Ramen ${regionData.name}`,
                  description: 'PVC en aluminium ramen met HR+++ glas voor optimale isolatie.',
                  icon: '🪟',
                  features: ['HR+++ glas', 'Inbraakbeveiliging', '10 jaar garantie']
                },
                {
                  title: `Deuren ${regionData.name}`,
                  description: 'Veilige voordeuren en binnendeuren in diverse stijlen.',
                  icon: '🚪',
                  features: ['Meerpuntsluiting', 'Diverse kleuren', 'Maatwerk mogelijk']
                },
                {
                  title: `Gevelwerken ${regionData.name}`,
                  description: 'Crepi, isolatie en gevelrenovatie voor een moderne uitstraling.',
                  icon: '🏠',
                  features: ['Gevelisolatie', 'Crepi afwerking', 'Premie-advies']
                },
                {
                  title: `Renovatie ${regionData.name}`,
                  description: 'Totaalrenovaties van badkamer tot zolder.',
                  icon: '🔨',
                  features: ['Totaalaanpak', 'Eén aanspreekpunt', 'Planning op maat']
                },
                {
                  title: `Isolatie ${regionData.name}`,
                  description: 'Gevel- en dakisolatie voor lagere energiekosten.',
                  icon: '🌡️',
                  features: ['EPC verbetering', 'Premie mogelijk', 'Energiebesparing']
                },
                {
                  title: `Onderhoud ${regionData.name}`,
                  description: 'Regelmatig onderhoud voor langdurige kwaliteit.',
                  icon: '🔧',
                  features: ['Preventief onderhoud', 'Snelle service', 'Vaste prijzen']
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-dark mb-8">
              Ook actief in de omgeving van {regionData.name}
            </h2>
            <p className="text-gray-700 mb-8">
              Naast {regionData.name} ({regionData.postalCodes.join(', ')}) zijn wij ook actief in:
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {regionData.nearbyAreas.map((area, index) => (
                <span 
                  key={index}
                  className="bg-white px-4 py-2 rounded-full text-brand-dark font-medium shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-brand-dark mb-4">
                Werkgebied provincie {regionData.province}
              </h3>
              <p className="text-gray-600 text-sm">
                Wij dekken de volledige provincie {regionData.province} af voor al onze diensten. 
                Twijfelt u of wij in uw gemeente actief zijn? Neem gerust contact op!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local CTA */}
      <section className="py-16 bg-brand-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Klaar voor uw project in {regionData.name}?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Lokale service, vakmanschap en persoonlijke begeleiding. 
            Vraag vandaag nog uw gratis offerte aan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Offerte aanvragen {regionData.name}
            </a>
            <a 
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-accent transition-colors"
            >
              Bekijk onze projecten
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegionalLanding;