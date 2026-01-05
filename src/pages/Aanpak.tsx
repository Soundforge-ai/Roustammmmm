import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ClipboardList, MessageSquare, Ruler, Hammer, CheckCircle2, ArrowRight, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const Aanpak: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Vrijblijvende Kennismaking',
      description: 'Alles begint met een goed gesprek. We komen graag bij u langs in Zoersel of omgeving om uw wensen en dromen te bespreken. We luisteren naar uw ideeën, bekijken de huidige situatie en geven direct eerste advies over de mogelijkheden.',
      icon: MessageSquare,
      details: ['Persoonlijk gesprek op locatie', 'Inventarisatie van uw wensen', 'Eerste technisch advies', 'Volledig vrijblijvend']
    },
    {
      id: 2,
      title: 'Opmeting & Technisch Analyse',
      description: 'Meten is weten. Voor we een offerte maken, zorgen we dat we alle details in kaart hebben. We meten alles nauwkeurig op en kijken naar technische aandachtspunten zoals stabiliteit, isolatie en leidingen.',
      icon: Ruler,
      details: ['Nauwkeurige opmetingen', 'Technische haalbaarheidscheck', 'Foto\'s van de situatie', 'Duidelijke afspraken']
    },
    {
      id: 3,
      title: 'Transparante Offerte',
      description: 'U ontvangt een gedetailleerde offerte zonder kleine lettertjes. We splitsen alles duidelijk op zodat u precies ziet waarvoor u betaalt. Geen verrassingen achteraf, maar heldere afspraken vooraf.',
      icon: ClipboardList,
      details: ['Vaste prijzen', 'Gedetailleerde werkomschrijving', 'Duidelijke planning', 'Ruimte voor vragen']
    },
    {
      id: 4,
      title: 'Vakkundige Uitvoering',
      description: 'Na uw goedkeuring plannen we de werken in. Ons team van ervaren vakmensen gaat aan de slag met respect voor uw woning en planning. We werken met hoogwaardige materialen en zorgen voor een nette werf, elke dag opnieuw.',
      icon: Hammer,
      details: ['Ervaren vakmensen', 'Gebruik van A-merken', 'Propere werf', 'Regelmatige updates']
    },
    {
      id: 5,
      title: 'Oplevering & Nazorg',
      description: 'We zijn pas tevreden als u dat bent. Na afronding lopen we samen alles na voor de definitieve oplevering. Ook na de werken blijven we bereikbaar voor vragen of service. Garantie en vertrouwen staan centraal.',
      icon: CheckCircle2,
      details: ['Gezamenlijke rondgang', 'Garantiecertificaten', 'Service na verkoop', 'Blijvend aanspreekpunt']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Onze Werkwijze | Transparante Bouw & Renovatie in Zoersel | Yannova</title>
        <meta name="description" content="Ontdek de werkwijze van Yannova. Van vrijblijvende offerte tot vakkundige oplevering. Transparant, betrouwbaar en professioneel bouwadvies in regio Zoersel en Antwerpen." />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-brand-dark overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
              alt="Bouwplannen en overleg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent z-10"></div>

          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 text-brand-accent border border-brand-accent/30 font-medium text-sm mb-6 backdrop-blur-sm">
                <CheckCircle2 size={16} />
                <span>Transparant van A tot Z</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Zorgeloos Renoveren <br />
                <span className="text-brand-accent">Stap voor Stap</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Bij Yannova geloven we in duidelijkheid. Geen vage beloftes, maar een concreet stappenplan voor uw project.
                Zo weet u precies waar u aan toe bent, van de eerste schets tot de laatste steen.
              </p>
              <Link
                to="/contact"
                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/20 flex items-center gap-3 w-fit"
              >
                Start uw Project <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                Uw Partnerschap met Yannova
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Wij begrijpen dat bouwen of renoveren ingrijpend kan zijn. Daarom nemen wij de zorgen uit handen.
                Met duidelijke communicatie, strakke planning en vakmanschap zorgen wij voor een resultaat waar u jarenlang van geniet.
                Onze aanpak is gebaseerd op vertrouwen en kwaliteit, speciaal afgestemd op klanten in de regio Zoersel, Antwerpen en Kempen.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Timeline */}
        <section className="py-10 pb-24 bg-gray-50/50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Vertical Line (hidden on mobile) */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 top-0 rounded-full"></div>

                {steps.map((step, index) => (
                  <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 mb-16 md:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Content Side */}
                    <div className="flex-1 w-full md:w-1/2 p-6 md:p-12 hover:bg-white transition-colors rounded-2xl group">
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : ''}`}>
                        <h3 className="text-2xl font-bold text-brand-dark">{step.title}</h3>
                      </div>
                      <p className={`text-gray-600 mb-6 leading-relaxed ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {step.description}
                      </p>
                      <ul className={`space-y-2 ${index % 2 === 0 ? 'flex flex-col md:items-end' : ''}`}>
                        {step.details.map((detail, i) => (
                          <li key={i} className={`flex items-center gap-2 text-sm text-gray-500 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                            <CheckCircle2 size={16} className="text-brand-accent" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeline Center Icon */}
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-white border-4 border-brand-accent rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                      <step.icon size={28} className="text-brand-dark" />
                      <div className="absolute -top-10 font-bold text-6xl text-gray-100 -z-10 font-mono select-none">0{step.id}</div>
                    </div>

                    {/* Spacer Side */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Icons */}
        <section className="py-20 bg-brand-dark text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-accent/20">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Kwaliteitsgarantie</h3>
                <p className="text-gray-300 px-4">Wij werken uitsluitend met gecertificeerde materialen en volgen de strikte Belgische bouwnormen.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-accent/20">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Stipte Planning</h3>
                <p className="text-gray-300 px-4">Uw tijd is kostbaar. Wij plannen realistisch en houden ons aan de gemaakte afspraken.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-accent/20">
                  <HeartHandshake size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Persoonlijke Service</h3>
                <p className="text-gray-300 px-4">Één aanspreekpunt voor al uw vragen. Van start tot finish staan wij aan uw zijde.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-brand-dark mb-6">Overtuigd van onze aanpak?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Laten we samenwerken aan uw droomproject. Neem contact op voor een vrijblijvend gesprek.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-orange-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Neem Contact Op <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Aanpak;
