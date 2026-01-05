import React from 'react';
import { APPROACH_STEPS } from '@/constants';

const Approach: React.FC = () => {
  return (
    <section id="approach" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-brand-accent font-semibold tracking-wider uppercase text-sm mb-3">Zo gaan we te werk</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark">
            Van eerste gesprek tot een oplevering waar u trots op bent
          </h3>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {APPROACH_STEPS.map((step) => (
              <div key={step.id} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm hover:border-brand-accent/30 transition-colors text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-brand-light rounded-full flex items-center justify-center text-brand-accent mb-4 sm:mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300 relative border-4 border-white shadow-sm">
                   <step.icon size={24} className="sm:w-8 sm:h-8" />
                   <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-brand-dark text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-white">
                     {step.id}
                   </div>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-brand-dark mb-2 sm:mb-3">{step.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;