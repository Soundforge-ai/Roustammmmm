import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Euro, Thermometer } from 'lucide-react';

interface BeforeAfterProject {
  id: string;
  title: string;
  location: string;
  type: string;
  beforeImage: string;
  afterImage: string;
  savings: {
    energy: string;
    cost: string;
    comfort: string;
  };
  investment: string;
  description: string;
}

const BEFORE_AFTER_PROJECTS: BeforeAfterProject[] = [
  {
    id: 'project-1',
    title: 'Gevelisolatie + Crepi',
    location: 'Zoersel',
    type: 'Gevelwerken',
    beforeImage: '/images/downloads/isolatie-1.jpg',
    afterImage: '/images/downloads/crepi-1.jpg',
    savings: {
      energy: '35% minder verbruik',
      cost: '€850/jaar besparing',
      comfort: 'Geen tocht meer'
    },
    investment: '€18.500',
    description: 'Complete gevelisolatie met EPS 12cm + siliconen crepi afwerking. Dankzij Mijn VerbouwPremie €4.200 teruggekregen.'
  },
  {
    id: 'project-2',
    title: 'Nieuwe PVC Ramen',
    location: 'Antwerpen',
    type: 'Ramen & Deuren',
    beforeImage: '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.jpg',
    afterImage: '/images/c67c2ffe-a42b-477f-a67d-10100999c4f0.jpg',
    savings: {
      energy: '28% minder verbruik',
      cost: '€620/jaar besparing',
      comfort: 'Stiller & warmer'
    },
    investment: '€12.800',
    description: 'Vervanging van 12 ramen met driedubbele beglazing. Woningwaarde gestegen met €15.000.'
  },
  {
    id: 'project-3',
    title: 'Totaalrenovatie',
    location: 'Mechelen',
    type: 'Renovatie',
    beforeImage: '/images/16676485-bd4d-49a4-a5a6-89e07254fa23.jpg',
    afterImage: '/images/downloads/crepi-2.jpg',
    savings: {
      energy: '45% minder verbruik',
      cost: '€1.200/jaar besparing',
      comfort: 'Volledig nieuw gevoel'
    },
    investment: '€35.000',
    description: 'Ramen, gevelisolatie, crepi en dak in één traject. EPC-score verbeterd van E naar B.'
  }
];

const BeforeAfter: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % BEFORE_AFTER_PROJECTS.length);
    setShowAfter(false);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + BEFORE_AFTER_PROJECTS.length) % BEFORE_AFTER_PROJECTS.length);
    setShowAfter(false);
  };

  const project = BEFORE_AFTER_PROJECTS[currentProject];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Echte Resultaten van Echte Klanten
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Zie hoe onze klanten hun <strong>energiekosten verlaagden</strong>, hun <strong>wooncomfort verhoogden</strong> en de <strong>waarde van hun woning</strong> lieten stijgen.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Before/After Images */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={showAfter ? project.afterImage : project.beforeImage}
                  alt={`${showAfter ? 'Na' : 'Voor'} - ${project.title} in ${project.location}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Before/After Toggle */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 flex">
                    <button
                      onClick={() => setShowAfter(false)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        !showAfter 
                          ? 'bg-brand-accent text-white' 
                          : 'text-gray-600 hover:text-brand-accent'
                      }`}
                    >
                      Voor
                    </button>
                    <button
                      onClick={() => setShowAfter(true)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        showAfter 
                          ? 'bg-brand-accent text-white' 
                          : 'text-gray-600 hover:text-brand-accent'
                      }`}
                    >
                      Na
                    </button>
                  </div>
                </div>

                {/* Project Navigation */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4">
                  <button
                    onClick={prevProject}
                    className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <button
                    onClick={nextProject}
                    className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Project Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {BEFORE_AFTER_PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentProject(index);
                      setShowAfter(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentProject ? 'bg-brand-accent' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-sm font-semibold">
                    {project.type}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{project.location}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <Thermometer className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-700 font-medium">Energiebesparing</p>
                  <p className="text-lg font-bold text-green-800">{project.savings.energy}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <Euro className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-700 font-medium">Jaarlijkse Besparing</p>
                  <p className="text-lg font-bold text-blue-800">{project.savings.cost}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-purple-700 font-medium">Comfort</p>
                  <p className="text-lg font-bold text-purple-800">{project.savings.comfort}</p>
                </div>
              </div>

              {/* Investment */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Totale Investering</p>
                    <p className="text-2xl font-bold text-brand-dark">{project.investment}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Terugverdientijd</p>
                    <p className="text-lg font-semibold text-green-600">
                      {Math.round(parseInt(project.investment.replace(/[€.,]/g, '')) / parseInt(project.savings.cost.replace(/[€/jaar.,]/g, '')))} jaar
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#calculator"
                  className="flex-1 bg-brand-accent hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Bereken mijn besparing
                </a>
                <a
                  href="/portfolio"
                  className="flex-1 bg-white border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Meer projecten
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;