import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { HERO_CONTENT } from '@/constants';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden"
      aria-label="Yannova Bouw - Ramen en Deuren, Gevelisolatie en Renovatie in Zoersel, Antwerpen en Mechelen"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-slate-900" aria-hidden="true">
        {/* Mobile Image */}
        <div className="block md:hidden w-full h-full">
          <img
            src={HERO_CONTENT.image}
            alt="Ramen en deuren plaatsen Zoersel - Yannova Bouw renovatieproject"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Desktop Video */}
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
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 z-10 relative pt-16 sm:pt-20">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-brand-accent/20 border border-brand-accent/30 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
            <span className="text-orange-400 font-medium text-xs sm:text-sm tracking-wide uppercase">Ramen & Deuren • Gevelisolatie • Crepi • Renovatie</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Ramen, Deuren & Totaalrenovatie in regio <span className="text-brand-accent">Antwerpen & Kempen</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
            Yannova combineert <strong>15 jaar vakmanschap</strong> met de nieuwste isolatietechnieken. Van <strong>hoogisolerende ramen</strong> tot een strakke <strong>crepi-gevel</strong>: wij verhogen je wooncomfort en de waarde van je huis.
          </p>

          {/* Trust bullets */}
          <ul className="grid grid-cols-2 gap-2 sm:gap-3 text-white/90 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl">
            {['Tot 30% lagere energiekosten', 'Hogere woningwaarde', 'Meer wooncomfort', 'Driedubbele beglazing', 'Zoersel, Antwerpen, Mechelen', '10 jaar garantie'].map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15 border border-white/20 text-xs">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* CTA's */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
            <a
              href="#calculator"
              className="bg-brand-accent hover:bg-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Bereken mijn besparing
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a
              href="/portfolio"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2"
            >
              Bekijk realisaties
            </a>
            <a
              href="https://wa.me/32489960001"
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;