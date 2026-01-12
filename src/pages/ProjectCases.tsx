import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/ui/LazyImage';

interface ProjectCase {
  id: string;
  title: string;
  location: string;
  challenge: string;
  solution: string;
  result: string;
  beforeImage: string;
  afterImage: string;
  category: 'ramen-deuren' | 'gevel' | 'renovatie';
  energyLabel?: {
    before: string;
    after: string;
    savings: string;
  };
}

const PROJECT_CASES: ProjectCase[] = [
  {
    id: 'totaalrenovatie-keerbergen',
    title: 'Totaalrenovatie Rijwoning Keerbergen',
    location: 'Keerbergen',
    challenge: 'Oude woning uit 1960 met EPC-label F. Hoge energiekosten (€2.400/jaar), vochtproblemen in de gevel en verouderde ramen.',
    solution: 'Complete gevelisolatie met 12cm EPS, nieuwe aluminium ramen met HR+++ glas, crepi afwerking in moderne kleur, en vernieuwing van de voordeur.',
    result: 'EPC-label verbeterd naar B. Energiekosten gedaald met 40% naar €1.440/jaar. Moderne uitstraling en verhoogde woningwaarde.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_4f1lyg4f1lyg4f1l.jpg",
    afterImage: "/images/foto's/Gemini_Generated_Image_12huit12huit12hu.jpg",
    category: 'renovatie',
    energyLabel: {
      before: 'F',
      after: 'B',
      savings: '40%'
    }
  },
  {
    id: 'gevelrenovatie-mechelen',
    title: 'Gevelrenovatie Villa Mechelen',
    location: 'Mechelen',
    challenge: 'Vochtinfiltratie door beschadigde gevel, verouderde isolatie en energieverlies.',
    solution: 'Volledige gevelrenovatie met nieuwe isolatie, vochtbestrijding en moderne crepi afwerking met decoratieve accenten.',
    result: '30% energiebesparing, geen vochtproblemen meer en een moderne uitstraling die de woningwaarde verhoogde.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_73yqjc73yqjc73yq.jpg",
    afterImage: '/images/downloads/crepi-1.jpg',
    category: 'gevel',
    energyLabel: {
      before: 'E',
      after: 'C',
      savings: '30%'
    }
  },
  {
    id: 'ramen-deuren-zoersel',
    title: 'Ramen & Deuren Vervanging Zoersel',
    location: 'Zoersel',
    challenge: 'Oude houten ramen met enkele beglazing, tocht en hoge energiekosten.',
    solution: 'Vervanging door hoogwaardige PVC ramen met HR+++ glas en nieuwe aluminium voordeur met inbraakbeveiliging.',
    result: 'Drastische vermindering van geluidshinder, geen tocht meer en 25% lagere verwarmingskosten.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_bf8tm8bf8tm8bf8t.jpg",
    afterImage: '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.jpg',
    category: 'ramen-deuren'
  },
  {
    id: 'crepi-afwerking-antwerpen',
    title: 'Crepi Gevelafwerking Antwerpen',
    location: 'Antwerpen',
    challenge: 'Verouderde gevel met scheuren en verkleuring. Slechte isolatiewaarde.',
    solution: 'Nieuwe gevelisolatie met EPS platen en moderne siliconen crepi in antraciet kleur.',
    result: 'Strakke moderne uitstraling, betere isolatie en waardevermeerdering van de woning.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_7stbs27stbs27stb.jpg",
    afterImage: '/images/downloads/crepi-2.jpg',
    category: 'gevel',
    energyLabel: {
      before: 'D',
      after: 'B',
      savings: '25%'
    }
  },
  {
    id: 'isolatie-project-leuven',
    title: 'Gevelisolatie Woning Leuven',
    location: 'Leuven',
    challenge: 'Hoge stookkosten en koude muren in de winter. Condensatieproblemen.',
    solution: 'Buitengevelisolatie met 14cm EPS en dampopen pleisterafwerking.',
    result: 'Comfortabele binnentemperatuur, geen condensatie meer en 35% lagere energiekosten.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_a0290xa0290xa029.jpg",
    afterImage: '/images/downloads/isolatie-1.jpg',
    category: 'gevel',
    energyLabel: {
      before: 'E',
      after: 'B',
      savings: '35%'
    }
  },
  {
    id: 'moderne-voordeur-brasschaat',
    title: 'Moderne Voordeur Brasschaat',
    location: 'Brasschaat',
    challenge: 'Oude houten voordeur met slechte isolatie en verouderde beveiliging.',
    solution: 'Nieuwe aluminium voordeur met drievoudige beglazing en meerpuntsluiting.',
    result: 'Veilige, geïsoleerde en stijlvolle entree die de uitstraling van de woning compleet veranderde.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_evuy78evuy78evuy.jpg",
    afterImage: "/images/foto's/Gemini_Generated_Image_gv2xcygv2xcygv2x.jpg",
    category: 'ramen-deuren'
  }
];

const ProjectCases: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Onze Projecten in Detail
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ontdek hoe wij uitdagingen omzetten in succesvolle renovaties. 
              Van energielabel F naar B, van vochtproblemen naar droge muren.
            </p>
          </div>
        </div>
      </section>

      {/* Project Cases Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECT_CASES.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <LazyImage 
                    src={project.afterImage} 
                    alt={project.title}
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.location}
                    </span>
                  </div>
                  {project.energyLabel && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg p-2 text-center shadow-md">
                      <div className="text-xs text-gray-600">EPC</div>
                      <div className="font-bold text-green-600">
                        {project.energyLabel.before} → {project.energyLabel.after}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark mb-3">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-semibold text-red-600">Uitdaging:</span>
                      <p className="mt-1">{project.challenge}</p>
                    </div>
                  </div>

                  {project.energyLabel && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <div className="text-sm font-semibold text-green-800">
                        Resultaat: {project.energyLabel.savings} energiebesparing
                      </div>
                    </div>
                  )}

                  <Link 
                    to={`/projecten/${project.id}`}
                    className="inline-flex items-center text-brand-accent hover:text-orange-700 font-semibold"
                  >
                    Lees het volledige verhaal
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Klaar voor uw eigen succesverhaal?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Laat ons uw uitdaging analyseren en een oplossing op maat voorstellen.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-brand-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start uw project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectCases;