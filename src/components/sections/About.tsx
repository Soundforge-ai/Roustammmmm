import React from 'react';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Gerenoveerde woning met nieuwe PVC ramen en crepi gevel in Zoersel"
                className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]"
                loading="lazy"
              />
              {/* Experience Badge - Linksonder op de afbeelding */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-xl">
                <p className="text-3xl sm:text-4xl font-bold text-brand-dark text-center">15+</p>
                <p className="text-gray-600 font-medium text-center text-sm sm:text-base">Jaren ervaring</p>
            </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-brand-accent font-semibold tracking-wider uppercase text-sm mb-3">BOUWBEDRIJF ZOERSEL & ANTWERPEN</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4 sm:mb-6">
              Uw specialist voor ramen, deuren en renovatie
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              <strong>Yannova Bouw</strong> is uw betrouwbare aannemer voor <strong>ramen en deuren</strong>, <strong>gevelisolatie</strong>, <strong>crepi</strong> en <strong>totaalrenovatie</strong> in <strong>Zoersel</strong>, <strong>Antwerpen</strong>, <strong>Mechelen</strong> en omgeving. Met meer dan 15 jaar ervaring leveren wij vakmanschap waar u op kunt rekenen.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Of u nu <strong>nieuwe ramen wilt plaatsen</strong>, uw <strong>gevel wilt isoleren met EPS en crepi</strong>, of een <strong>volledige renovatie</strong> plant: wij begeleiden u van offerte tot oplevering. Profiteer van <strong>energiepremies tot €5.000</strong> via Mijn VerbouwPremie.
            </p>

            <ul className="space-y-4">
              {[
                "Gratis advies en opmeting aan huis",
                "Eén aanspreekpunt voor uw volledige project",
                "Energiezuinige PVC en aluminium ramen",
                "Hulp bij premie-aanvraag Mijn VerbouwPremie"
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