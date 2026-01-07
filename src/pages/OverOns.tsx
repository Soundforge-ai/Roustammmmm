import React from 'react';
import { CheckCircle, Users, Award, Clock, Target, Heart } from 'lucide-react';

const OverOns: React.FC = () => {
  const teamValues = [
    {
      icon: Target,
      title: 'Onze Missie',
      description:
        'We willen dat u met een gerust gevoel aan uw project begint. Daarom combineren we vakmanschap met duidelijke afspraken en een nette uitvoering.',
    },
    {
      icon: Heart,
      title: 'Onze Visie',
      description:
        'Een toekomst waarin elk huis comfortabel, energiezuinig en mooi afgewerkt is — en waar renovatie vooral een positieve ervaring is.',
    },
    {
      icon: Award,
      title: 'Onze Waarden',
      description:
        'Eerlijkheid, transparantie en respect. U weet altijd waar u aan toe bent — in planning, uitvoering en budget.',
    },
  ];

  const stats = [
    { number: '15+', label: 'Jaren ervaring' },
    { number: '500+', label: 'Tevreden klanten' },
    { number: '1000+', label: 'Projecten voltooid' },
    { number: '100%', label: 'Klanttevredenheid' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Over Yannova Bouw
              <span className="block text-brand-accent mt-2 text-2xl md:text-3xl">Uw aannemer in Zoersel, Antwerpen & Mechelen</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Al meer dan 15 jaar helpen we klanten in Zoersel, Antwerpen, Mechelen en omgeving met renovatie- en bouwprojecten — met oog voor detail, duidelijke communicatie en een proper resultaat.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Modern gerenoveerde woning met nieuwe ramen en gevelbekleding"
                className="rounded-xl shadow-2xl w-full"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                Vakmanschap en vertrouwen in elk project
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Bij Yannova geloven we dat bouwen en renoveren vooral gaat om één ding: een plek waar u zich écht thuis voelt.
                Daarom luisteren we naar uw wensen, denken we praktisch mee en communiceren we helder — van de eerste opmeting tot de laatste afwerking.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Of het nu gaat om nieuwe ramen, gevelisolatie of een totaalrenovatie: we werken netjes, met respect voor uw woning.
                Zo blijft het traject overzichtelijk — en geniet u straks van een resultaat waar u trots op bent.
              </p>
              <ul className="space-y-3">
                {['Persoonlijke begeleiding van A tot Z', 'Eén aanspreekpunt voor uw project', 'Focus op energiezuinige oplossingen'].map(
                  (item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="text-brand-accent flex-shrink-0" size={20} />
                      <span className="text-brand-primary font-medium">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-brand-accent mb-2">{stat.number}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Waar wij voor staan
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamValues.map((value, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-brand-accent" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">Ons Team</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Ons team bestaat uit ervaren vakmensen die met passie en precisie werken. U merkt het in de communicatie,
              de netheid op de werf en de afwerking tot in de details.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Users className="text-brand-accent" size={48} />
              <div className="text-left">
                <p className="text-2xl font-bold text-brand-dark">20+ Vakmensen</p>
                <p className="text-gray-500">Klaar om uw project mee te dragen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Waarom kiezen voor Yannova?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Clock, title: 'Stipte planning', desc: 'We plannen realistisch en houden u op de hoogte van elke stap.' },
                { icon: Award, title: 'Kwaliteitsgarantie', desc: 'We staan achter ons werk en leveren met zorg en degelijke materialen.' },
                { icon: Users, title: 'Persoonlijk contact', desc: 'U heeft één aanspreekpunt dat uw dossier écht kent.' },
                { icon: CheckCircle, title: 'Transparante prijzen', desc: 'Duidelijke offertes, heldere afspraken — zonder verrassingen.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-white p-6 rounded-xl">
                  <div className="flex-shrink-0">
                    <item.icon className="text-brand-accent" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverOns;
