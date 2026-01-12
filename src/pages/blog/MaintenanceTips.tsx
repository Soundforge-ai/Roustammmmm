import React from 'react';

interface MaintenanceTip {
  id: string;
  title: string;
  category: 'ramen' | 'deuren' | 'gevel' | 'algemeen';
  season: 'lente' | 'zomer' | 'herfst' | 'winter' | 'jaarrond';
  difficulty: 'makkelijk' | 'gemiddeld' | 'moeilijk';
  timeRequired: string;
  description: string;
  steps: string[];
  materials: string[];
  warning?: string;
  frequency: string;
}

const MAINTENANCE_TIPS: MaintenanceTip[] = [
  {
    id: 'aluminium-ramen-onderhoud',
    title: 'Hoe onderhoud ik mijn zwarte aluminium ramen?',
    category: 'ramen',
    season: 'jaarrond',
    difficulty: 'makkelijk',
    timeRequired: '30 minuten',
    frequency: 'Om de 3 maanden',
    description: 'Zwarte aluminium ramen behouden hun mooie uitstraling met regelmatig onderhoud. Volg deze stappen voor optimaal resultaat.',
    steps: [
      'Verwijder eerst los vuil met een zachte borstel of stofzuiger',
      'Maak een sopje van lauwwarm water en neutrale zeep',
      'Reinig de profielen met een zachte doek, werk van boven naar beneden',
      'Spoel na met schoon water en droog direct af met een schone doek',
      'Controleer de rubbers en smeer de scharnieren indien nodig'
    ],
    materials: [
      'Neutrale zeep (geen agressieve schoonmaakmiddelen)',
      'Zachte doeken of sponsen',
      'Zachte borstel',
      'Scharnierolie of vaseline'
    ],
    warning: 'Gebruik nooit schuurmiddelen of agressieve chemicaliën op aluminium. Dit kan de coating beschadigen.'
  },
  {
    id: 'crepi-gevel-reinigen',
    title: 'Wanneer moet ik mijn crepi gevel reinigen?',
    category: 'gevel',
    season: 'lente',
    difficulty: 'gemiddeld',
    timeRequired: '2-4 uur',
    frequency: 'Om de 2-3 jaar',
    description: 'Een crepi gevel reinigen verlengt de levensduur en houdt uw woning er fris uit. Timing en methode zijn belangrijk.',
    steps: [
      'Kies een droge dag zonder wind (idealiter in het voorjaar)',
      'Dek planten en tuinmeubilair af',
      'Begin met een zachte borstel om los vuil te verwijderen',
      'Gebruik een hogedrukspuit op lage druk (max 100 bar)',
      'Werk systematisch van boven naar beneden',
      'Laat de gevel volledig drogen voordat u eventuele beschadigingen repareert'
    ],
    materials: [
      'Hogedrukspuit (max 100 bar)',
      'Zachte borstel met lange steel',
      'Afdekfolie voor planten',
      'Eventueel mild reinigingsmiddel voor hardnekkige vlekken'
    ],
    warning: 'Te hoge druk kan de crepi beschadigen. Test altijd eerst op een onopvallende plek.'
  },
  {
    id: 'raam-rubbers-onderhoud',
    title: 'Onderhoud van raamrubbers voor optimale isolatie',
    category: 'ramen',
    season: 'herfst',
    difficulty: 'makkelijk',
    timeRequired: '15 minuten per raam',
    frequency: '2x per jaar',
    description: 'Goed onderhouden raamrubbers zorgen voor optimale isolatie en voorkomen tocht. Eenvoudig zelf te doen.',
    steps: [
      'Reinig de rubbers met een vochtige doek',
      'Controleer op scheurtjes of verharding',
      'Breng rubber onderhoudsmiddel aan met een doek',
      'Laat het middel intrekken (volg instructies op verpakking)',
      'Test de raamafsluiting door het raam te openen en sluiten'
    ],
    materials: [
      'Rubber onderhoudsmiddel (bijv. glycerine of speciale rubber conditioner)',
      'Schone doeken',
      'Eventueel zachte tandenborstel voor moeilijk bereikbare plekken'
    ],
    warning: 'Vervang beschadigde rubbers tijdig om energieverlies te voorkomen.'
  },
  {
    id: 'voordeur-slot-onderhoud',
    title: 'Onderhoud van uw voordeur slot en scharnieren',
    category: 'deuren',
    season: 'winter',
    difficulty: 'makkelijk',
    timeRequired: '20 minuten',
    frequency: 'Om de 6 maanden',
    description: 'Een goed onderhouden slot en scharnieren zorgen voor soepele werking en veiligheid van uw voordeur.',
    steps: [
      'Reinig het slot met een droge borstel om stof te verwijderen',
      'Spuit grafietspray in het sleutelgat (geen olie!)',
      'Beweeg de sleutel enkele keren heen en weer',
      'Smeer de scharnieren met een druppel olie',
      'Test de deur door deze volledig te openen en sluiten',
      'Controleer de uitlijning van de deur in het kozijn'
    ],
    materials: [
      'Grafietspray voor sloten',
      'Scharnierolie of 3-in-1 olie',
      'Kleine borstel of oude tandenborstel',
      'Doek om overtollige olie weg te nemen'
    ],
    warning: 'Gebruik nooit gewone olie in het slot, dit trekt vuil aan en kan het slot blokkeren.'
  },
  {
    id: 'gevel-vochtproblemen-herkennen',
    title: 'Vochtproblemen in de gevel tijdig herkennen',
    category: 'gevel',
    season: 'jaarrond',
    difficulty: 'makkelijk',
    timeRequired: '30 minuten',
    frequency: 'Maandelijks',
    description: 'Vroege detectie van vochtproblemen bespaart dure reparaties. Leer de signalen herkennen.',
    steps: [
      'Controleer de gevel op donkere vlekken of verkleuring',
      'Let op witte uitslag (zoutuitbloei) op de muur',
      'Controleer de voegen tussen stenen of panelen',
      'Kijk naar de onderkant van raamkozijnen',
      'Controleer de dakgoot en regenpijpen',
      'Let op schimmel of algengroei op de gevel'
    ],
    materials: [
      'Verrekijker voor hoge delen',
      'Zaklamp voor donkere hoeken',
      'Notitieblok om problemen te noteren'
    ],
    warning: 'Bij twijfel over vochtproblemen, raadpleeg altijd een professional. Vroege interventie voorkomt grote schade.'
  },
  {
    id: 'raam-drainage-reinigen',
    title: 'Raam drainage gaatjes schoonhouden',
    category: 'ramen',
    season: 'herfst',
    difficulty: 'makkelijk',
    timeRequired: '10 minuten per raam',
    frequency: '2x per jaar',
    description: 'Verstopte drainage gaatjes kunnen waterschade veroorzaken. Eenvoudig preventief onderhoud.',
    steps: [
      'Lokaliseer de kleine gaatjes onderin het raamkozijn',
      'Verwijder bladeren en vuil uit de raamgoot',
      'Gebruik een dunne draad of tandenstoker om de gaatjes vrij te maken',
      'Spoel met een beetje water om te controleren of het water wegloopt',
      'Herhaal dit voor alle ramen'
    ],
    materials: [
      'Dunne draad of tandenstokers',
      'Kleine borstel',
      'Gieter met water',
      'Doek om op te ruimen'
    ],
    warning: 'Forceer niet te hard, de gaatjes kunnen beschadigen. Bij hardnekkige verstopping, raadpleeg een professional.'
  }
];

const MaintenanceTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('alle');
  const [selectedSeason, setSelectedSeason] = React.useState<string>('alle');

  const categories = [
    { value: 'alle', label: 'Alle categorieën' },
    { value: 'ramen', label: 'Ramen' },
    { value: 'deuren', label: 'Deuren' },
    { value: 'gevel', label: 'Gevelwerken' },
    { value: 'algemeen', label: 'Algemeen' }
  ];

  const seasons = [
    { value: 'alle', label: 'Alle seizoenen' },
    { value: 'lente', label: 'Lente' },
    { value: 'zomer', label: 'Zomer' },
    { value: 'herfst', label: 'Herfst' },
    { value: 'winter', label: 'Winter' },
    { value: 'jaarrond', label: 'Jaarrond' }
  ];

  const filteredTips = MAINTENANCE_TIPS.filter(tip => {
    const categoryMatch = selectedCategory === 'alle' || tip.category === selectedCategory;
    const seasonMatch = selectedSeason === 'alle' || tip.season === selectedSeason;
    return categoryMatch && seasonMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'makkelijk': return 'bg-green-100 text-green-800';
      case 'gemiddeld': return 'bg-yellow-100 text-yellow-800';
      case 'moeilijk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ramen': return '🪟';
      case 'deuren': return '🚪';
      case 'gevel': return '🏠';
      case 'algemeen': return '🔧';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Onderhoudstips voor Ramen, Deuren & Gevel
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Houd uw ramen, deuren en gevel in topconditie met onze praktische onderhoudstips. 
              Voorkom problemen en verleng de levensduur van uw investering.
            </p>
            <div className="bg-brand-accent/20 rounded-lg p-4 inline-block">
              <div className="text-2xl font-bold">Gratis advies</div>
              <div className="text-sm">van de professionals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-700">Categorie:</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-700">Seizoen:</label>
                <select 
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {seasons.map(season => (
                    <option key={season.value} value={season.value}>{season.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredTips.map((tip) => (
                <article key={tip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCategoryIcon(tip.category)}</span>
                        <div>
                          <h2 className="text-xl font-bold text-brand-dark">{tip.title}</h2>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tip.difficulty)}`}>
                              {tip.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">• {tip.timeRequired}</span>
                            <span className="text-xs text-gray-500">• {tip.frequency}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6">{tip.description}</p>

                    {/* Warning */}
                    {tip.warning && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-600 text-lg">⚠️</span>
                          <div>
                            <div className="font-semibold text-yellow-800 text-sm">Let op:</div>
                            <div className="text-yellow-700 text-sm">{tip.warning}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Materials */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-brand-dark mb-3">Benodigdheden:</h3>
                      <ul className="grid grid-cols-1 gap-1">
                        {tip.materials.map((material, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Steps */}
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-3">Stappenplan:</h3>
                      <ol className="space-y-2">
                        {tip.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="bg-brand-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredTips.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Geen tips gevonden</h3>
                <p className="text-gray-600">Probeer andere filters of bekijk alle categorieën.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Hulp nodig bij onderhoud of reparatie?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Onze vakmensen helpen u graag bij complexere onderhoudswerkzaamheden 
            of wanneer vervanging nodig is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Onderhoud aanvragen
            </a>
            <a 
              href="tel:+32489960001"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-accent transition-colors"
            >
              Direct bellen: +32 489 96 00 01
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">
              Blijf op de hoogte van onderhoudstips
            </h3>
            <p className="text-gray-600 mb-6">
              Ontvang seizoensgebonden onderhoudstips en advies van onze experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Uw e-mailadres"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              />
              <button className="px-6 py-3 bg-brand-accent text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Aanmelden
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Geen spam, alleen nuttige tips. Uitschrijven kan altijd.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaintenanceTips;