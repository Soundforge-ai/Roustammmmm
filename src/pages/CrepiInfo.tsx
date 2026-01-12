import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Home, Palette } from 'lucide-react';

const CrepiInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/crepi-patterns.jpg')] bg-cover bg-center" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Crepi met ingebouwde patronen
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Geef uw woning een warme, unieke uitstraling — met het comfort en de bescherming van moderne crepi.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <img
              src="/images/crepi-patterns.jpg"
              alt="Crepi gevel met ingebouwde patronen"
              className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/images/downloads/crepi-1.jpg';
              }}
            />
          </div>
        </div>
      </section>

      {/* Wat is crepi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
              Wat is crepi met ingebouwde patronen?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              <strong>
                Crepi met ingebouwde patronen is een innovatieve techniek waarbij tijdens het aanbrengen van de
                pleisterlaag een specifiek motief wordt gecreëerd, meestal in de vorm van een baksteenpatroon.
              </strong>
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Het resultaat is een gevel die de authentieke uitstraling heeft van traditioneel metselwerk, maar geniet
              van alle technische voordelen van moderne gevelbepleistering. U krijgt het beste van beide werelden: de
              warme uitstraling van baksteen gecombineerd met de superieure isolatie en bescherming van crepi.
            </p>
          </div>
        </div>
      </section>

      {/* Technieken */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-8">
              Technieken voor het aanbrengen van patronen
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">1. Inkrassen van voegen</h3>
                <p className="text-gray-700 leading-relaxed">
                  Bij deze vakmanschappelijke techniek wordt na het aanbrengen van de pleisterlaag handmatig een
                  metselpatroon ingekrast voordat de pleister volledig is uitgehard. Deze methode vereist precisie en
                  ervaring, maar levert uitzonderlijk realistische resultaten op.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">2. Gebruik van mallen</h3>
                <p className="text-gray-700 leading-relaxed">
                  Een alternatieve methode maakt gebruik van speciaal ontworpen mallen die in de nog natte pleister
                  worden gedrukt. Deze techniek zorgt voor een nauwkeurig en uniform baksteenmotief over de hele gevel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12">
              Voordelen van crepi met ingebouwde patronen
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Palette,
                  title: 'Esthetische meerwaarde',
                  description:
                    'Geef uw gevel een unieke, authentieke uitstraling zonder daadwerkelijk nieuwe bakstenen te hoeven metsen.',
                },
                {
                  icon: Home,
                  title: 'Superieure isolatie',
                  description:
                    'Combineer crepi met buitengevelisolatie voor optimale energiebesparing. Tot wel 30% minder energieverbruik.',
                },
                {
                  icon: Shield,
                  title: 'Weerbestendig en duurzaam',
                  description:
                    'Uitstekende bescherming tegen regen, wind en temperatuurschommelingen. Voorkomt vochtproblemen en vorstschade.',
                },
                {
                  icon: CheckCircle,
                  title: 'Onderhoudsvriendelijk',
                  description:
                    'Door het waterafstotende karakter blijft uw gevel jarenlang mooi zonder zorgen over algen- of mosgroei.',
                },
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <benefit.icon className="text-brand-accent" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-3">{benefit.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ontwerpvrijheid */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">Onbeperkte ontwerpvrijheid</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Naast het klassieke baksteenmotief kunt u spelen met verschillende voegbreedtes, reliëfs en kleurnuances
              om het perfecte effect te bereiken.
            </p>
            <ul className="space-y-3">
              {[
                'Kies uw favoriete korreldikte voor de gewenste textuur',
                'Verschillende voegbreedtes voor subtiel of opvallend effect',
                'Reliëfpatronen voor extra dimensie en karakter',
                'Kleuren op maat die perfect aansluiten bij uw woning',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-brand-accent flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Premie Informatie */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Bespaar met Mijn VerbouwPremie</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Wist u dat u voor gevelisolatie in combinatie met crepi in aanmerking komt voor de <strong>Mijn VerbouwPremie</strong>?
              De Vlaamse overheid stimuleert energiebesparende investeringen. Afhankelijk van uw inkomenscategorie kan de premie oplopen tot
              <strong> 50% van de factuur</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Yannova Bouw bezorgt u alle nodige attesten en documenten voor een vlotte aanvraag.
            </p>
            <a href="https://www.vlaanderen.be/mijn-verbouwpremie" target="_blank" rel="noopener noreferrer" className="text-brand-accent font-semibold hover:underline inline-flex items-center gap-2">
              Meer info over premies <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-10 text-center">Veelgestelde vragen over Crepi</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-brand-dark mb-2">Heb ik een vergunning nodig voor crepi?</h3>
                <p className="text-gray-600">Als u de voorgevel aanpast of isoleert waardoor de rooilijn wordt overschreden (meestal bij isolatie dikker dan 14cm uit de rooilijn), is een vergunning nodig. Voor zij- en achtergevels is vaak geen vergunning nodig, maar dit hangt af van uw gemeente. Wij zoeken dit graag voor u uit.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-brand-dark mb-2">Hoe lang gaat een crepi gevel mee?</h3>
                <p className="text-gray-600">Een professioneel aangebrachte crepi gevel gaat gemiddeld 20 tot 30 jaar mee. Met siliconenpleister (wat wij standaard gebruiken) blijft de gevel langer proper en waterafstotend dan met goedkopere minerale pleisters.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-brand-dark mb-2">Is crepi onderhoudsvriendelijk?</h3>
                <p className="text-gray-600">Ja, maar niet onderhoudsvrij. Wij raden aan om de gevel elke 5-10 jaar te laten reinigen om algen en mos (groene aanslag) te verwijderen. Siliconenpleister is hier wel veel beter tegen bestand dan traditionele pleister.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-brand-dark mb-2">Kan ik crepi combineren met isolatie?</h3>
                <p className="text-gray-600">Absoluut, dit is zelfs de meest gekozen combinatie. Buitengevelisolatie (ETICS) met crepi afwerking is de efficiëntste manier om uw woning te isoleren zonder ruimteverlies binnen. U voldoet zo ook makkelijker aan de energienormen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Klaar voor een nieuwe gevel met crepi?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Vertel ons kort wat u wil bereiken. We geven eerlijk advies en werken een duidelijke, vrijblijvende offerte uit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Vraag een vrijblijvende offerte aan <ArrowRight size={20} />
              </Link>
              <a
                href="tel:+32489960001"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center"
              >
                Bel ons
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrepiInfo;
