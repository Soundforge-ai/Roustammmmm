import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, UserCheck, Star, Award, Clock, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WaaromWij: React.FC = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Kwaliteit zonder Compromis',
      text: 'Wij geloven dat goed werk zichzelf terugbetaalt. Daarom besparen wij nooit op materialen of afwerking. Wat we doen, doen we goed.'
    },
    {
      icon: UserCheck,
      title: 'Één Aanspreekpunt',
      text: 'Geen eindeloos doorverbinden. Bij ons heeft u één vaste contactpersoon die uw dossier van A tot Z kent en bereikbaar is.'
    },
    {
      icon: Clock,
      title: 'Afspraak is Afspraak',
      text: 'In de bouw is timing cruciaal. Wij respecteren uw agenda, communiceren helder over de planning en leveren tijdig op.'
    },
    {
      icon: Award,
      title: 'Jarenlange Expertise',
      text: 'Ons team bestaat uit vakmensen met jarenlange ervaring in hun specifieke vakgebied, van schrijnwerkers tot stukadoors.'
    },
    {
      icon: HeartHandshake,
      title: 'Transparante Prijzen',
      text: 'Niemand houdt van verrassingen op de factuur. Onze offertes zijn gedetailleerd en duidelijk, zodat u precies weet waar u aan toe bent.'
    },
    {
      icon: Star,
      title: 'Klanttevredenheid',
      text: 'Onze beste reclame bent u. Wij gaan pas naar huis als u 100% tevreden bent met het resultaat. Lees gerust onze reviews.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Waarom Yannova? | Kwaliteit & Vertrouwen in Zoersel | Aannemer</title>
        <meta name="description" content="Kies voor zekerheid. Ontdek waarom klanten in Zoersel en omgeving kiezen voor Yannova. Kwaliteit, transparantie en vakmanschap staan centraal." />
      </Helmet>

      <div className="bg-white">
        {/* Hero */}
        <section className="relative py-24 bg-brand-dark overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* Abstract or team background */}
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80"
              alt="Bouwteam overleg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-brand-dark/90 z-10"></div>

          <div className="container mx-auto px-6 relative z-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bouwen op <span className="text-brand-accent">Vertrouwen</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Uw huis is waarschijnlijk uw kostbaarste bezit. Daar gaan wij respectvol mee om.
              Ontdek wat Yannova anders maakt dan de rest.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {values.map((val, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-2xl transition-all hover:-translate-y-2 hover:shadow-lg border border-gray-100 group">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm text-brand-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <val.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">{val.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {val.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team / Story Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl skew-y-3 transform md:translate-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1581094794329-cd1361ddee25?auto=format&fit=crop&q=80"
                    alt="Vakmanschap in detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  Gedreven door Passie
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Yannova is niet zomaar een bouwbedrijf. Het is ontstaan uit passie voor mooie materialen en technisch vernuft.
                  Of het nu gaat om het perfect afstellen van een raam of het strak aanbrengen van crepi: wij genieten van ons werk.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Wij werken voornamelijk in de regio <strong>Zoersel, Antwerpen, Mechelen en de Kempen</strong>.
                  Doordat we lokaal verankerd zijn, zijn we snel ter plaatse en kennen we de streek.
                </p>
                <Link
                  to="/contact"
                  className="text-brand-accent font-bold text-lg flex items-center gap-2 hover:text-orange-700 transition-colors"
                >
                  Maak kennis met ons <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-accent text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Zullen we uw plannen bespreken?</h2>
            <p className="text-xl text-white/90 mb-8">Een eerste afspraak is en blijft altijd 100% vrijblijvend.</p>
            <Link
              to="/contact"
              className="bg-white text-brand-accent px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors"
            >
              Neem Contact Op
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default WaaromWij;
