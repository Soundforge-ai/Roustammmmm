import React from 'react';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Modern gerenoveerde woning met nieuwe ramen en gevelbekleding"
                className="w-full h-full object-cover min-h-[500px]"
                loading="lazy"
              />
              {/* Experience Badge - Linksonder op de afbeelding */}
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4 rounded-lg shadow-xl">
                <p className="text-4xl font-bold text-brand-dark text-center">15+</p>
                <p className="text-gray-600 font-medium text-center">Jaren ervaring</p>
            </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-brand-accent font-semibold tracking-wider uppercase text-sm mb-3">OVER YANNOVA</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
              Vakmanschap en vertrouwen in elk project
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Bij Yannova geloven we dat bouwen en renoveren meer is dan alleen stenen stapelen. Het gaat om het creëren van een thuis. Met jarenlange ervaring in de Belgische bouwsector staan wij garant voor een persoonlijke aanpak, correcte planning en glasheldere communicatie.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Of het nu gaat om het plaatsen van nieuwe ramen, gevelisolatie of een totaalrenovatie: wij werken elk detail af met de grootste zorg.
            </p>

            <ul className="space-y-4">
              {[
                "Persoonlijke begeleiding van A tot Z",
                "Eén aanspreekpunt voor uw project",
                "Focus op energiezuinige oplossingen"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-brand-accent flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;