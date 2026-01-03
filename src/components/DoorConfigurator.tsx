import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Save, Maximize2, Smartphone, Calculator, ArrowRight } from 'lucide-react';
// Kleuren verwijderd - alleen patronen worden gebruikt
import { useI18n } from '../hooks/useI18n';

interface DoorPattern {
  id: string;
  name: string;
  image: string;
}

interface DoorClass {
  id: 'economic' | 'standard' | 'premium';
  name: string;
  description: string;
  basePrice: number;
}

const DOOR_CLASSES: DoorClass[] = [
  {
    id: 'economic',
    name: 'Economisch',
    description: 'Compromis tussen prijs en kwaliteit',
    basePrice: 1500,
  },
  {
    id: 'standard',
    name: 'Standaard',
    description: 'Bewezen oplossing',
    basePrice: 2200,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Voor veeleisende klanten',
    basePrice: 3200,
  },
];

const DOOR_PATTERNS: DoorPattern[] = [
  { id: 'ek01', name: 'Klassiek', image: '/images/patterns/ek01.jpg' },
  { id: 'ek104', name: 'Modern', image: '/images/patterns/ek104.jpg' },
  { id: 'ek19', name: 'Minimalistisch', image: '/images/patterns/ek19.jpg' },
  { id: 'ek54', name: 'Traditioneel', image: '/images/patterns/ek54.jpg' },
  { id: 'ek66', name: 'Design', image: '/images/patterns/ek66.jpg' },
  { id: 'ek42', name: 'Strak', image: '/images/patterns/ek42.jpg' },
  { id: 'ek47', name: 'Elegant', image: '/images/patterns/ek47.jpg' },
  { id: 'ek111', name: 'Luxe', image: '/images/patterns/ek111.jpg' },
  { id: 'ek50', name: 'Contemporain', image: '/images/patterns/ek50.jpg' },
  { id: 'ek25', name: 'Rustiek', image: '/images/patterns/ek25.jpg' },
];

// Patroon kleuren voor visuele weergave (als images niet beschikbaar zijn)
const PATTERN_COLORS: Record<string, string> = {
  'ek01': '#9B7D5F', // Klassiek - warme bruine houttint
  'ek104': '#3D3D3D', // Modern - donkergrijs/antraciet
  'ek19': '#F8F8F8', // Minimalistisch - zuiver wit met subtiele warmte
  'ek54': '#7A6B5A', // Traditioneel - rijke donkerbruine houttint
  'ek66': '#1F1F1F', // Design - diep zwart
  'ek42': '#D8D8D8', // Strak - lichtgrijs met koele ondertoon
  'ek47': '#C9A961', // Elegant - warm goud/brons
  'ek111': '#0D0D0D', // Luxe - zeer donker zwart
  'ek50': '#7A7A7A', // Contemporain - medium grijs
  'ek25': '#B8956A', // Rustiek - warme beige/bruine houttint
};

const DoorConfigurator: React.FC = () => {
  const { t } = useI18n();
  const [material, setMaterial] = useState<'pvc' | 'aluminium' | 'wood'>('pvc');
  const [doorClass, setDoorClass] = useState<DoorClass>(DOOR_CLASSES[1]); // Standard als default
  const [width, setWidth] = useState<number>(1000);
  const [height, setHeight] = useState<number>(2000);
  const [selectedPattern, setSelectedPattern] = useState<DoorPattern>(DOOR_PATTERNS[0]);
  const [patternPage, setPatternPage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const PATTERNS_PER_PAGE = 10;

  // Bereken prijs op basis van configuratie
  useEffect(() => {
    const basePrice = doorClass.basePrice;
    const area = (width * height) / 1000000; // mm² naar m²
    const areaMultiplier = Math.max(1, area / 2); // Basis 2m²
    
    // Materiaal multiplier
    const materialMultiplier = {
      pvc: 1.0,
      aluminium: 1.3,
      wood: 1.5,
    }[material];

    const calculatedPrice = Math.round(
      basePrice * areaMultiplier * materialMultiplier
    );

    setPrice(calculatedPrice);
  }, [material, doorClass, width, height]);

  const patternPages = Math.ceil(DOOR_PATTERNS.length / PATTERNS_PER_PAGE);

  const visiblePatterns = DOOR_PATTERNS.slice(
    patternPage * PATTERNS_PER_PAGE,
    (patternPage + 1) * PATTERNS_PER_PAGE
  );

  const handleSave = () => {
    const config = {
      material,
      doorClass: doorClass.id,
      width,
      height,
      pattern: selectedPattern.id,
      price,
    };
    
    // Opslaan in localStorage of naar backend
    localStorage.setItem('doorConfig', JSON.stringify(config));
    
    // Navigeer naar contact met configuratie
    const params = new URLSearchParams({
      type: 'deur-configuratie',
      prijs: price.toString(),
      materiaal: material,
      klasse: doorClass.id,
      breedte: width.toString(),
      hoogte: height.toString(),
    });
    
    window.location.href = `/contact?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {t('configurator.title')}
              </h1>
              <p className="text-gray-200">
                {t('configurator.subtitle')}
              </p>
            </div>
            <Link
              to="/showroom"
              className="hidden md:flex items-center gap-2 bg-brand-accent hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Smartphone size={20} />
              Open in AR
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Linker kolom - Configuratie */}
          <div className="lg:col-span-2 space-y-6">
            {/* Materiaal Selectie */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">{t('configurator.material')}</h2>
              <div className="grid grid-cols-3 gap-4">
                {(['pvc', 'aluminium', 'wood'] as const).map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setMaterial(mat)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      material === mat
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-brand-dark capitalize">
                      {mat === 'pvc' ? 'PVC' : mat === 'aluminium' ? 'Aluminium' : 'Hout'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Klasse Selectie */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">{t('configurator.class')}</h2>
              <div className="space-y-3">
                {DOOR_CLASSES.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => setDoorClass(cls)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      doorClass.id === cls.id
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-brand-dark">{t(`configurator.classes.${cls.id}`)}</div>
                        <div className="text-sm text-gray-600">{t(`configurator.classes.${cls.id}Desc`)}</div>
                      </div>
                      <div className="text-lg font-bold text-brand-accent">
                        €{cls.basePrice.toLocaleString('nl-BE')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Afmetingen */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">{t('configurator.dimensions')}</h2>
              
              {/* Breedte */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">{t('configurator.width')}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="900"
                      max="1100"
                      step="10"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <span className="text-sm text-gray-600">mm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="900"
                  max="1100"
                  step="10"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>900 mm</span>
                  <span>1100 mm</span>
                </div>
              </div>

              {/* Hoogte */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">{t('configurator.height')}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="2000"
                      max="2300"
                      step="10"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <span className="text-sm text-gray-600">mm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="2300"
                  step="10"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2000 mm</span>
                  <span>2300 mm</span>
                </div>
              </div>
            </div>

            {/* Patroon Selectie */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-brand-dark">{t('configurator.pattern')}</h2>
                <div className="text-sm text-gray-500">
                  {patternPage + 1} / {patternPages}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setPatternPage(Math.max(0, patternPage - 1))}
                  disabled={patternPage === 0}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ←
                </button>
                <div className="grid grid-cols-5 gap-2 flex-1">
                  {visiblePatterns.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => setSelectedPattern(pattern)}
                      className={`aspect-square rounded-lg border-2 overflow-hidden transition-all relative group ${
                        selectedPattern.id === pattern.id
                          ? 'border-brand-accent scale-105 shadow-lg ring-2 ring-brand-accent/50'
                          : 'border-gray-300 hover:scale-105 hover:border-gray-400'
                      }`}
                      title={pattern.name}
                    >
                      <div 
                        className="w-full h-full flex items-center justify-center text-xs font-medium text-white relative"
                        style={{ 
                          backgroundColor: PATTERN_COLORS[pattern.id] || '#808080',
                          backgroundImage: `linear-gradient(135deg, ${PATTERN_COLORS[pattern.id] || '#808080'} 0%, ${PATTERN_COLORS[pattern.id] ? PATTERN_COLORS[pattern.id] + 'dd' : '#606060'} 100%)`
                        }}
                      >
                        <span className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        <span className="relative z-10 text-center px-1">{pattern.name}</span>
                      </div>
                      {selectedPattern.id === pattern.id && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-brand-accent rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPatternPage(Math.min(patternPages - 1, patternPage + 1))}
                  disabled={patternPage === patternPages - 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Rechter kolom - Prijs & Acties */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-brand-dark mb-4">{t('configurator.price')}</h2>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-brand-accent mb-2">
                  €{price.toLocaleString('nl-BE')}
                </div>
                <p className="text-sm text-gray-600">
                  {t('configurator.priceNote')}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full bg-brand-accent hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {t('configurator.save')}
                </button>
                
                <Link
                  to="/showroom"
                  className="w-full bg-white hover:bg-gray-50 text-brand-dark border-2 border-brand-dark font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Smartphone size={20} />
                  {t('configurator.viewAR')}
                </Link>
              </div>

              {/* Configuratie Samenvatting */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-brand-dark mb-3">{t('configurator.summary')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materiaal:</span>
                    <span className="font-medium capitalize">{material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Klasse:</span>
                    <span className="font-medium">{doorClass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Afmetingen:</span>
                    <span className="font-medium">{width} × {height} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patroon:</span>
                    <span className="font-medium">{selectedPattern.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoorConfigurator;

