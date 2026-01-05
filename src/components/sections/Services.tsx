import React from 'react';
import { SERVICES } from '@/constants';
import { ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-12 sm:py-20 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="block text-brand-accent font-semibold tracking-wider uppercase text-sm mb-3">Onze Diensten</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Alles voor uw woning onder één dak
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Van een kleine verbetering tot een complete renovatie: wij begeleiden u stap voor stap en zorgen voor een resultaat waar u elke dag van geniet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-40 sm:h-48 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={`${service.title} - Voorbeeld door Yannova Bouw`}
                  width="400"
                  height="300"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 bg-brand-accent text-white p-2 rounded-lg">
                  <service.icon size={24} />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold text-brand-dark mb-2 sm:mb-3">{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
                  {service.description}
                </p>
                <a href="#contact" className="inline-flex items-center text-brand-accent font-semibold text-sm hover:underline">
                  Bespreek uw project <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;