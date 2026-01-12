import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Shield, ThermometerSun, Layers, Home, CheckCircle, ChevronDown, Hammer, Grid } from 'lucide-react';

// FAQ data voor SEO
const FAQ_ITEMS = [
  {
    question: "Hoeveel kost crepi per m² in België?",
    answer: "Dat hangt af van het type crepi, de ondergrond en eventuele voorbereidende werken. Als richtprijs varieert crepi tussen €40 en €80 per m². Met gevelisolatie komt u meestal uit op €80-€150 per m². We komen graag langs om uw gevel te bekijken en maken daarna een duidelijke offerte op maat."
  },
  {
    question: "Wat is het verschil tussen crepi en gevelbepleistering?",
    answer: "Crepi is een type gevelbepleistering met een specifieke structuur (korrel). Gevelbepleistering is de brede term voor alle soorten pleisterwerk op gevels, zoals glad pleisterwerk, structuurpleister en crepi. We leggen u graag de verschillen uit zodat u de look kiest die bij uw woning past."
  },
  {
    question: "Hoe lang gaat crepi mee?",
    answer: "Kwalitatief aangebrachte crepi gaat doorgaans 25 tot 40 jaar mee. De levensduur hangt af van de gebruikte materialen, de uitvoering en de blootstelling aan weer en wind. Wij werken met A-merken en zorgen voor een correcte opbouw, zodat u er jarenlang zorgeloos van geniet."
  },
  {
    question: "Kan ik premies krijgen voor gevelisolatie?",
    answer: "Ja! Via de Mijn VerbouwPremie kunt u tot €5.000 premie krijgen voor gevelisolatie. Voor de laagste inkomenscategorie is dat tot 35% van de factuur, voor de middelste categorie tot 25%. Combineert u gevelisolatie met asbestverwijdering? Dan kan de premie nog met €8/m² verhoogd worden. Wij zorgen voor alle nodige attesten en helpen u met de aanvraag."
  },
  {
    question: "Werkt Yannova ook in Keerbergen, Mechelen en Zoersel?",
    answer: "Ja. Yannova is actief in heel de provincie Antwerpen en Vlaams-Brabant. We voeren gevelwerken uit in Keerbergen, Mechelen, Zoersel, Putte, Heist-op-den-Berg, Bonheiden, Lier en alle omliggende gemeenten. Stuur ons gerust uw adres, dan bevestigen we meteen of we bij u langskomen."
  },
  {
    question: "Hoelang duurt een gevelrenovatie met crepi?",
    answer: "Als richtlijn: een gevelrenovatie met crepi duurt vaak 1-2 weken voor een vrijstaande woning. Met gevelisolatie rekent u meestal 2-3 weken. De exacte timing hangt af van de grootte, de staat van de gevel en het weer. We plannen realistisch en houden u tussendoor goed op de hoogte."
  }
];

const Gevel: React.FC = () => {
  const gevelServices = [
    {
      id: 'gevelbepleistering',
      title: 'Gevelbepleistering',
      description: 'Moderne crepi en pleisterwerk voor een strakke, duurzame gevelafwerking die uw woning beschermt en verfraait.',
      icon: Palette,
      href: '/gevel/gevelbepleistering',
      image: '/images/downloads/crepi-1.jpg',
      subcategories: ['Crepi', 'Pleisterwerk', 'Gefactureerde pleister', 'Kleurrijke pleister']
    },
    {
      id: 'gevelbescherming',
      title: 'Gevelbescherming',
      description: 'Bescherm uw gevel tegen weersinvloeden, vocht en schade met onze professionele beschermingsbehandelingen.',
      icon: Shield,
      href: '/gevel/gevelbescherming',
      image: '/images/downloads/crepi-2.jpg',
      subcategories: ['Hydrofoberende behandeling', 'Impregnatie', 'Reiniging en behandeling', 'Onderhoudsbehandelingen']
    },
    {
      id: 'gevelisolatie',
      title: 'Gevelisolatie',
      description: 'Isolatie langs buiten of binnen voor maximale energiebesparing en comfort. Verlaag uw energiekosten aanzienlijk.',
      icon: ThermometerSun,
      href: '/gevel/gevelisolatie',
      image: '/images/downloads/isolatie-1.jpg',
      subcategories: ['Isolatie langs buiten', 'Isolatie langs binnen', 'Voorzetwanden', 'Isolatieplaten']
    },
    {
      id: 'steenstrips',
      title: 'Steenstrips',
      description: 'Authentieke baksteenlook met uitstekende isolatie-eigenschappen. Perfect voor renovatie en nieuwbouw.',
      icon: Layers,
      href: '/gevel/steenstrips',
      image: '/images/16676485-bd4d-49a4-a5a6-89e07254fa23.jpg',
      subcategories: ['Renovatie gevels', 'Nieuwbouw', 'Combinatie met isolatie', 'Verschillende steensoorten']
    },
    {
      id: 'gevelrenovatie',
      title: 'Gevelrenovatie',
      description: 'Complete gevelrenovatie van ruwbouw tot afwerking. Uw gevel wordt weer als nieuw met garantie.',
      icon: Home,
      href: '/gevel/gevelrenovatie',
      image: '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.jpg',
      subcategories: ['Herstel van schade', 'Isolatie toevoegen', 'Nieuwe afwerking', 'Complete transformatie']
    }
  ];

  // FAQ Schema voor Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
        <div className="absolute inset-0 bg-[url('/images/crepi-patterns.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Een gevel waar u trots op bent
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              Kleine herstelling of een complete gevelrenovatie? Wij luisteren naar uw wensen, adviseren eerlijk en zorgen voor een nette uitvoering met oog voor detail.
            </p>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ontdek de mogelijkheden voor isolatie, bescherming en afwerking — afgestemd op uw woning en budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/portfolio"
                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Bekijk realisaties
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              <strong>Uw gevel bepaalt de uitstraling én het comfort van uw woning.</strong> Met de juiste aanpak beschermt u uw muren tegen weer en wind en bespaart u energie.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
              We begeleiden u van advies tot afwerking — met duidelijke afspraken en een proper resultaat.
            </p>
          </div>
        </div>
      </section>

      {/* Geveloplossingen Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Geveloplossingen
            </h2>

            <div className="space-y-8">
              {gevelServices.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative h-64 md:h-auto min-h-[300px]">
                      <img
                        src={service.image}
                        alt={`${service.title} - ${service.description.substring(0, 60)}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <service.icon className="text-brand-accent mb-4" size={40} />
                        <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          {service.description}
                        </p>
                      </div>

                      {/* Subcategories */}
                      {service.subcategories && service.subcategories.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {service.subcategories.map((sub, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        to={service.href}
                        className="inline-flex items-center text-brand-accent font-semibold text-base hover:underline group"
                      >
                        Lees meer
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze Section - SEO Boost */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Onze Werkwijze voor Gevelrenovatie
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Gevelanalyse & Advies",
                  desc: "Wij komen ter plaatse in regio Zoersel, Antwerpen of Mechelen voor een grondige inspectie van uw gevel. We meten de oppervlakte, controleren op vochtproblemen en bespreken uw wensen qua isolatiedikte en afwerking."
                },
                {
                  step: "02",
                  title: "Voorbereiding & Stelling",
                  desc: "Veiligheid en netheid staan voorop. We plaatsen stellingen, plakken ramen en deuren zorgvuldig af en beschermen uw oprit en tuin. Eventuele barsten in de oude gevel worden hersteld."
                },
                {
                  step: "03",
                  title: "Isolatie & Wapeningsnet",
                  desc: "We plaatsen EPS-isolatieplaten (indien gewenst) zonder koudebruggen. Daarover komt een wapeningsnet ingebed in mortel, wat zorgt voor een scheurvrije en stabiele ondergrond."
                },
                {
                  step: "04",
                  title: "Voorstrijk & Pleisterwerken",
                  desc: "Na de uitdrogingsperiode brengen we een voorstrijklaag aan voor optimale hechting. Vervolgens wordt de siliconenpleister (crepi) of steenstrips vakkundig aangebracht door onze specialisten."
                },
                {
                  step: "05",
                  title: "Afwerking & Opkuis",
                  desc: "We werken de details rond ramen, dorpels en dakranden perfect af. Na de werken ruimen we alles netjes op en nemen we het bouwafval mee. U geniet direct van een propere, nieuwe gevel."
                },
                {
                  step: "06",
                  title: "Garantiemoment",
                  desc: "Samen overlopen we de uitgevoerde werken. U krijgt van ons de nodige documenten voor uw premieaanvraag en geniet van 10 jaar garantie op de hechting en kleurvastheid."
                }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-6xl font-bold text-gray-100 absolute top-4 right-4 z-0">{item.step}</span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Voordelen Section - SEO Content */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-8 text-center">
              Waarom kiezen voor Gevelisolatie & Crepi in Zoersel?
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-brand-accent mb-2">Bespaar tot 30% op uw energiefactuur</h3>
                <p className="text-gray-700">
                  Een niet-geïsoleerde gevel is de grootste oorzaak van warmteverlies. Met buitengevelisolatie houdt u de warmte binnen in de winter en buiten in de zomer. Dit resulteert in een aanzienlijke daling van uw stookkosten en een beter E-peil voor uw woning.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-brand-accent mb-2">Verhoog de waarde van uw woning</h3>
                <p className="text-gray-700">
                  Een nieuwe gevel geeft uw woning direct een moderne en frisse uitstraling. Potentiële kopers hechten veel belang aan energiezuinigheid (EPC-score) en esthetiek. Een investering in gevelrenovatie verdient zichzelf vaak terug bij verkoop.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-brand-accent mb-2">Bescherming tegen vocht</h3>
                <p className="text-gray-700">
                  Onze siliconenpleisters zijn waterafstotend en dampopen. Dit betekent dat regenwater niet in de muur dringt, maar vocht van binnenuit wel kan ontsnappen. Zo voorkomt u vochtproblemen, schimmels en schade aan uw binnenmuren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Snel en efficiënt, met oog voor kwaliteit
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Voor welk type gevelwerk u ook kiest, klein of groot, u weet op voorhand precies waar u aan toe bent.
                Onze aanpak? Eerst aandachtig luisteren: wat zijn uw wensen, uw dromen, uw budget?
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Jarenlange ervaring", description: "Ons team heeft decennia aan ervaring in gevelrenovatie en bepleistering." },
                { title: "Eerlijk en oprecht", description: "Transparante communicatie en eerlijke adviezen zonder verborgen kosten." },
                { title: "Garantie op uitgevoerde werken", description: "Wij staan achter ons werk met uitgebreide garantie op alle uitgevoerde werken." },
                { title: "Duurzame oplossingen", description: "We gebruiken alleen hoogwaardige, duurzame materialen voor langdurige resultaten." },
                { title: "Dienst na verkoop", description: "Ook na oplevering staan we klaar voor onderhoud en advies." },
                { title: "Actief in heel België", description: "Wij werken doorheen heel België voor al uw gevelprojecten." }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="text-brand-accent mt-1" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Regional Internal Linking Section - SEO */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">
              Gevelwerken in uw regio
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Yannova voert professionele gevelwerken uit in heel de provincie Antwerpen en Vlaams-Brabant.
              Ontdek wat we voor uw gemeente kunnen betekenen:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/regio/zoersel" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Crepi en gevel Zoersel</span>
              </Link>
              <Link to="/regio/antwerpen" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Gevelrenovatie Antwerpen</span>
              </Link>
              <Link to="/regio/mechelen" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Crepi en gevel Mechelen</span>
              </Link>
              <Link to="/regio/lier" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Gevelisolatie Lier</span>
              </Link>
              <Link to="/regio/malle" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Crepi Malle</span>
              </Link>
              <Link to="/regio/schilde" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Gevelwerken Schilde</span>
              </Link>
              <Link to="/regio/putte" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Crepi en isolatie Putte</span>
              </Link>
              <Link to="/regio/keerbergen" className="p-4 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors text-center group">
                <span className="font-semibold text-brand-dark group-hover:text-brand-accent">Gevelrenovatie Keerbergen</span>
              </Link>
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              Ook actief in Bonheiden, Heist-op-den-Berg, Ranst, Brecht, Zandhoven, Wommelgem en omliggende gemeenten.
            </p>
          </div>
        </div>
      </section>

      {/* Related Services - Cross-linking */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Combineert u dit met andere werken?</h2>
            <p className="text-gray-600">
              Een gevelrenovatie is vaak het ideale moment om ook uw ramen te vervangen of een volledige renovatie te plannen.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link to="/ramen-deuren" className="group bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all flex items-center gap-4">
              <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                <Grid size={24} />
              </div>
              <div>
                <h3 className="font-bold text-brand-dark group-hover:text-brand-accent transition-colors">Ramen en deuren</h3>
                <p className="text-sm text-gray-600">Nieuwe ramen voor optimale isolatie en comfort.</p>
              </div>
            </Link>
            <Link to="/renovatie" className="group bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all flex items-center gap-4">
              <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                <Hammer size={24} />
              </div>
              <div>
                <h3 className="font-bold text-brand-dark group-hover:text-brand-accent transition-colors">Totaalrenovatie</h3>
                <p className="text-sm text-gray-600">Eén aanspreekpunt voor al uw verbouwingen.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gevelwerken met Yannova?
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Wij nemen binnen één werkdag contact met u op.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Contacteer ons om uw plannen te bespreken. Yannova volgt uw gevelproject op van A tot Z.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Contacteer ons
                <ArrowRight size={20} />
              </a>
              <a
                href="tel:+32489960001"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center"
              >
                Bel Ons Direct
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// FAQ Accordion Component
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 text-center">
            Veelgestelde vragen over gevelwerken en crepi
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Antwoorden op de meest gestelde vragen over crepi, gevelisolatie en gevelrenovatie in Zoersel, Halle, Sint-Antonius en de ruime regio Antwerpen en Mechelen.
          </p>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`flex-shrink-0 text-brand-accent transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                      }`}
                    size={24}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                >
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gevel;
