import React from 'react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  Hammer,
  PaintBucket,
  Trees,
  ArrowRight,
  Home,
  ThermometerSun,
  LayoutDashboard
} from 'lucide-react';

const Diensten: React.FC = () => {
  const allServices = [
    {
      id: 'ramen-deuren',
      title: 'Ramen & Deuren',
      description: 'Hoogwaardige PVC en aluminium profielen voor elke woning. Kies voor isolatie, veiligheid en design. Wij plaatsen ramen, voordeuren, schuiframen en garagepoorten.',
      link: '/ramen-deuren',
      icon: Maximize2,
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
      features: ['PVC & Aluminium', 'Hoogisolerend glas', 'Inbraakwerend', 'Maatwerk']
    },
    {
      id: 'renovatie',
      title: 'Totaalrenovatie',
      description: 'Van afbraak tot afwerking. Wij transformeren uw woning volledig naar uw wensen. Badkamers, keukens, zolders of complete uitbreidingen.',
      link: '/renovatie',
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
      features: ['Totaalprojecten', 'Badkamer & Keuken', 'Gyprocwerken', 'Vloerwerken']
    },
    {
      id: 'gevel',
      title: 'Gevelwerken & Crepi',
      description: 'Geef uw woning een nieuwe look en bespaar op energie. Wij zijn experts in gevelisolatie, crepi (sierpleister) en steenstrips.',
      link: '/gevel',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80',
      features: ['Gevelisolatie', 'Crepi / Sierpleister', 'Steenstrips', 'Gevelreiniging']
    },
    {
      id: 'tuin',
      title: 'Tuinaanleg',
      description: 'Uw droomtuin van A tot Z. Opritten, terrassen, afsluitingen en groenaanleg. Wij zorgen voor een buitenomgeving waar u tot rust komt.',
      link: '/tuinaanleg',
      icon: Trees,
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80',
      features: ['Opritten & Terrassen', 'Tuinontwerp', 'Afsluitingen', 'Grondwerken']
    },
    {
      id: 'schilder',
      title: 'Schilderwerken',
      description: 'Professionele schilderwerken voor binnen en buiten. Strak lakwerk, muren en plafonds, of het kaleien van uw gevel.',
      link: '/schilderwerken',
      icon: PaintBucket,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80',
      features: ['Binnenschilderwerken', 'Buitenschilderwerken', 'Kleuradvies', 'Decoratieve technieken']
    },
    {
      id: 'isolatie',
      title: 'Isolatiewerken',
      description: 'Verlaag uw energiefactuur direct. Wij isoleren daken, muren en vloeren volgens de strengste normen. Goed voor het milieu en uw portemonnee.',
      link: '/gevel/gevelisolatie',
      icon: ThermometerSun,
      image: 'https://images.unsplash.com/photo-1629081822818-450f37c357f4?auto=format&fit=crop&q=80',
      features: ['Dakisolatie', 'Muurisolatie', 'Vloerisolatie', 'Attesten & Premies']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1621251336069-7977ba2add63?auto=format&fit=crop&q=80"
            alt="Yannova Diensten"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900 z-10"></div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Alles voor uw Woning <br />
            <span className="text-brand-accent">Onder één Dak</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Waarom werken met meerdere aannemers als het ook overzichtelijk kan? Bij Yannova vindt u alle expertise onder één dak.
            Van ramen en deuren tot renovatie en gevelwerken — wij denken mee, plannen helder en werken netjes.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100">
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 text-white flex items-center gap-3">
                    <service.icon size={24} className="text-brand-accent" />
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="mb-8 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-brand-accent font-bold hover:text-orange-700 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Meer Informatie <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-brand-dark rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold mb-4">Niet zeker waar te starten?</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Vertel ons kort wat u wil aanpakken. We luisteren, geven eerlijk advies en bekijken samen de beste oplossing
                  voor uw woning en budget.
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-white text-brand-dark px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Plan een vrijblijvend gesprek
                </Link>
              </div>
              <div className="hidden md:block">
                <LayoutDashboard size={120} className="text-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Diensten;
