import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_CONTENT } from '@/constants';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Welkom bij Yannova"
    >
      {/* Background Video with Overlay */}
      {/* Background Media */}
      <div className="absolute inset-0 z-0 bg-slate-900" aria-hidden="true">
        {/* Mobile Image (shown on small screens) */}
        <div className="block md:hidden w-full h-full">
          <img
            src={HERO_CONTENT.image}
            alt="Yannova Bouw Project"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Desktop Video (shown on medium+ screens) */}
        <div className="hidden md:block w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
            poster={HERO_CONTENT.image}
            aria-hidden="true"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            {/* Fallback image inside video tag for very old browsers is fine, but poster handles most */}
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 z-10 relative pt-16 sm:pt-20">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-brand-accent/20 border border-brand-accent/30 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
            <span className="text-orange-400 font-medium text-xs sm:text-sm tracking-wide uppercase">Uw Partner in Bouw & Renovatie</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            {HERO_CONTENT.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-10 max-w-xl leading-relaxed">
            {HERO_CONTENT.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
            <a
              href="#contact"
              className="bg-brand-accent hover:bg-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              {HERO_CONTENT.cta}
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a
              href="#services"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all flex items-center justify-center"
            >
              Ontdek onze diensten
            </a>
            <a
              href="/showroom"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 border-2 border-amber-400/50 animate-pulse hover:animate-none"
            >
              🏠 SHOWROOM (in opbouw)
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;