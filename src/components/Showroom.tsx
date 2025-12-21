import React, { useState } from 'react';
import '@google/model-viewer';
import { ChevronLeft, ChevronRight, RotateCcw, Maximize2, Smartphone } from 'lucide-react';

// TypeScript declaration for model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'shadow-intensity'?: string;
          'environment-image'?: string;
          exposure?: string;
          poster?: string;
          loading?: string;
        },
        HTMLElement
      >;
    }
  }
}

/*
 * ============================================
 * VOORDEUREN CONFIGURATIE
 * ============================================
 * 
 * HOE NIEUWE DEUREN TOEVOEGEN:
 * 1. Plaats je .glb bestand in: public/models/
 * 2. Voeg een nieuwe entry toe aan DOORS array hieronder
 * 3. Optioneel: voeg een poster image toe in public/images/ voor snellere loading
 * 
 * VOORBEELD:
 * {
 *   id: 4,
 *   name: 'Mijn Nieuwe Deur',
 *   description: 'Beschrijving van de deur',
 *   model: '/models/mijn-deur.glb',        // Pad naar je 3D model
 *   poster: '/images/mijn-deur-thumb.jpg', // Optioneel: preview image
 *   color: '#333333',                       // Kleur voor selector button
 *   features: ['Feature 1', 'Feature 2'],
 *   price: '€2.500 - €3.500',              // Optioneel: prijsindicatie
 * }
 * 
 * 3D MODEL TIPS:
 * - Exporteer vanuit Blender als .glb (File → Export → glTF 2.0)
 * - Houd bestandsgrootte onder 5MB voor snelle loading
 * - Zorg dat de deur gecentreerd is op origin (0,0,0)
 * - Schaal: 1 unit = 1 meter
 */

interface Door {
  id: number;
  name: string;
  description: string;
  model: string;
  poster?: string;
  color: string;
  features: string[];
  price?: string;
}

const DOORS: Door[] = [
  {
    id: 1,
    name: 'Modern Antraciet',
    description: 'Strakke aluminium voordeur met zijlicht',
    model: '/models/deur-antraciet.glb', // Plaats je model hier
    poster: '/images/deur-antraciet-poster.jpg',
    color: '#2d3436',
    features: ['Drievoudig glas', 'RC3 inbraakwerend', 'Thermisch onderbroken'],
    price: '€2.800 - €3.500',
  },
  {
    id: 2,
    name: 'Klassiek Eiken',
    description: 'Warme houten uitstraling met modern comfort',
    model: '/models/deur-eiken.glb',
    poster: '/images/deur-eiken-poster.jpg',
    color: '#8B4513',
    features: ['Massief eiken look', 'Isolerend', 'Onderhoudsvrij'],
    price: '€2.200 - €2.900',
  },
  {
    id: 3,
    name: 'Design Wit',
    description: 'Minimalistische witte voordeur',
    model: '/models/deur-wit.glb',
    poster: '/images/deur-wit-poster.jpg',
    color: '#ffffff',
    features: ['RAL 9016', 'Verborgen scharnieren', 'Smart lock ready'],
    price: '€2.500 - €3.200',
  },
];

const Showroom: React.FC = () => {
  const [currentDoor, setCurrentDoor] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelError, setModelError] = useState(false);

  const door = DOORS[currentDoor];

  // Fallback naar demo model als lokaal model niet bestaat
  const modelSrc = modelError 
    ? 'https://modelviewer.dev/shared-assets/models/Astronaut.glb' 
    : door.model;

  const nextDoor = () => {
    setModelError(false);
    setCurrentDoor((prev) => (prev + 1) % DOORS.length);
  };
  const prevDoor = () => {
    setModelError(false);
    setCurrentDoor((prev) => (prev - 1 + DOORS.length) % DOORS.length);
  };

  return (
    <section id="showroom" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 font-medium text-sm mb-4">
            VIRTUELE SHOWROOM
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bekijk onze voordeuren in 3D
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Draai, zoom en bekijk elke deur vanuit alle hoeken. Gebruik AR om de deur in uw eigen woning te projecteren.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 3D Viewer */}
          <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900' : ''}`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 shadow-2xl">
              <model-viewer
                src={modelSrc}
                alt={door.name}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                exposure="0.8"
                loading="eager"
                poster={door.poster}
                onError={() => setModelError(true)}
                style={{
                  width: '100%',
                  height: isFullscreen ? '100vh' : '500px',
                  borderRadius: '12px',
                  backgroundColor: '#1e293b',
                }}
              />
              
              {/* Model status indicator */}
              {modelError && (
                <div className="absolute top-8 left-8 bg-yellow-500/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                  ⚠️ Demo model - plaats .glb in /public/models/
                </div>
              )}
              
              {/* Controls overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  onClick={prevDoor}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
                  aria-label="Vorige deur"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
                  aria-label="Volledig scherm"
                >
                  <Maximize2 size={24} />
                </button>
                <button
                  onClick={nextDoor}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
                  aria-label="Volgende deur"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* AR Button hint */}
              <div className="absolute top-8 right-8 flex items-center gap-2 bg-amber-500/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                <Smartphone size={18} />
                AR beschikbaar
              </div>
            </div>
          </div>

          {/* Door Info */}
          <div className="space-y-6">
            {/* Door selector */}
            <div className="flex gap-3 flex-wrap">
              {DOORS.map((d, index) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setModelError(false);
                    setCurrentDoor(index);
                  }}
                  className={`w-16 h-16 rounded-xl border-2 transition-all ${
                    index === currentDoor
                      ? 'border-amber-500 scale-110'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  style={{ backgroundColor: d.color }}
                  aria-label={d.name}
                />
              ))}
            </div>

            {/* Current door info */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{door.name}</h3>
              <p className="text-gray-400 text-lg">{door.description}</p>
              {door.price && (
                <p className="text-amber-400 font-semibold text-xl mt-2">{door.price}</p>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Kenmerken:</h4>
              <ul className="space-y-2">
                {door.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all text-center"
              >
                Offerte aanvragen
              </a>
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all">
                <RotateCcw size={20} />
                Reset weergave
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-slate-700/50 rounded-xl p-4 text-sm text-gray-400">
              <p className="font-medium text-white mb-2">💡 Tip:</p>
              <p>
                Gebruik uw muis om te draaien en te zoomen. Op mobiel kunt u de AR-knop gebruiken om de deur in uw eigen woning te bekijken!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showroom;
