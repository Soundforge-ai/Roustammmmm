import React, { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { ProjectType } from '@/types';
import { calculatePriceRange, formatPriceRange, PriceRange, CalculatorInput } from '@/utils/calculator';
import { Calculator, ArrowRight, AlertCircle, Home, Wrench, Thermometer, PaintBucket, Gift } from 'lucide-react';

interface QuoteCalculatorProps {
  onRequestQuote?: (input: CalculatorInput, priceRange: PriceRange) => void;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onRequestQuote }) => {
  const { t } = useI18n();
  const [projectType, setProjectType] = useState<ProjectType | ''>('');
  const [houseType, setHouseType] = useState<string>('');
  const [surfaceArea, setSurfaceArea] = useState<string>('');
  const [includePremie, setIncludePremie] = useState<boolean>(false);
  const [result, setResult] = useState<PriceRange | null>(null);
  const [premieAmount, setPremieAmount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const projectTypes = [
    { value: 'ramen-deuren', label: 'Ramen & Deuren', icon: Home, description: 'PVC of aluminium ramen en deuren' },
    { value: 'gevelwerken', label: 'Crepi & Gevel', icon: PaintBucket, description: 'Gevelisolatie met crepi afwerking' },
    { value: 'isolatie', label: 'Isolatiewerken', icon: Thermometer, description: 'Dak-, muur- en gevelisolatie' },
    { value: 'renovatie', label: 'Totaalrenovatie', icon: Wrench, description: 'Complete renovatie van A tot Z' },
  ];

  const houseTypes = [
    { value: 'rijwoning', label: 'Rijwoning', description: 'Woning tussen andere woningen' },
    { value: 'halfopen', label: 'Halfopen Woning', description: 'Woning met één zijgevel vrij' },
    { value: 'open', label: 'Open Woning', description: 'Vrijstaande woning' },
  ];

  const calculatePremie = (projectType: ProjectType, area: number): number => {
    if (projectType === 'gevelwerken' || projectType === 'isolatie') {
      // Mijn VerbouwPremie berekening (vereenvoudigd)
      const premiePerM2 = 25; // €25 per m² gevelisolatie
      return Math.min(area * premiePerM2, 5000); // Max €5.000
    }
    if (projectType === 'ramen-deuren') {
      // Premie voor hoogrendementsglas
      return Math.min(area * 15, 2500); // Max €2.500
    }
    return 0;
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);
    setPremieAmount(0);

    if (!projectType) {
      setError('Kies eerst het type project.');
      return;
    }

    if (!houseType) {
      setError('Selecteer het type woning.');
      return;
    }

    const area = parseFloat(surfaceArea);
    if (isNaN(area) || area <= 0) {
      setError('Vul een geldige oppervlakte in (m²).');
      return;
    }

    try {
      const priceRange = calculatePriceRange({
        projectType,
        surfaceArea: area,
      });
      
      // Adjust price based on house type
      const multiplier = houseType === 'open' ? 1.2 : houseType === 'halfopen' ? 1.1 : 1.0;
      const adjustedRange = {
        min: Math.round(priceRange.min * multiplier),
        max: Math.round(priceRange.max * multiplier),
      };

      setResult(adjustedRange);

      if (includePremie) {
        const premie = calculatePremie(projectType, area);
        setPremieAmount(premie);
      }
    } catch (err) {
      setError('Er ging iets mis bij de berekening. Probeer het opnieuw.');
    }
  };

  const handleRequestQuote = () => {
    if (result && projectType) {
      const params = new URLSearchParams({
        project: projectType,
        houseType: houseType,
        area: surfaceArea,
        estimate: formatPriceRange(result),
        premie: premieAmount.toString(),
      });
      window.location.href = `/contact?${params.toString()}`;
    }
  };

  return (
    <section id="calculator" className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/10 rounded-full mb-6">
              <Calculator className="text-brand-accent w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Bereken je Besparing & Investering
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Krijg direct een <strong>realistische prijsindicatie</strong> en ontdek hoeveel je kunt <strong>besparen op je energiefactuur</strong>. 
              Inclusief berekening van mogelijke <strong>premies tot €5.000</strong>.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="space-y-8">
              
              {/* Step 1: Project Type */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-brand-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  Wat wil je laten doen?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {projectTypes.map(({ value, label, icon: Icon, description }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setProjectType(value as ProjectType);
                        setResult(null);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                        projectType === value
                          ? 'border-brand-accent bg-brand-accent/5'
                          : 'border-gray-200 hover:border-brand-accent/50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-3 ${projectType === value ? 'text-brand-accent' : 'text-gray-400'}`} />
                      <h4 className="font-semibold text-gray-900 mb-1">{label}</h4>
                      <p className="text-xs text-gray-500">{description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: House Type */}
              {projectType && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-brand-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    Type woning
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {houseTypes.map(({ value, label, description }) => (
                      <button
                        key={value}
                        onClick={() => {
                          setHouseType(value);
                          setResult(null);
                        }}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          houseType === value
                            ? 'border-brand-accent bg-brand-accent/5'
                            : 'border-gray-200 hover:border-brand-accent/50'
                        }`}
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">{label}</h4>
                        <p className="text-xs text-gray-500">{description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Surface Area */}
              {houseType && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-brand-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    Oppervlakte (schatting)
                  </h3>
                  <div className="max-w-md">
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={surfaceArea}
                        onChange={(e) => {
                          setSurfaceArea(e.target.value);
                          setResult(null);
                        }}
                        placeholder="bijv. 50"
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                        m²
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {projectType === 'ramen-deuren' ? 'Totale oppervlakte van alle ramen en deuren' : 
                       projectType === 'gevelwerken' || projectType === 'isolatie' ? 'Geveloppervlakte die geïsoleerd wordt' :
                       'Vloeroppervlakte van de te renoveren ruimtes'}
                    </p>
                  </div>
                </div>
              )}

              {/* Premie Checkbox */}
              {surfaceArea && (projectType === 'gevelwerken' || projectType === 'isolatie' || projectType === 'ramen-deuren') && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePremie}
                      onChange={(e) => setIncludePremie(e.target.checked)}
                      className="mt-1 w-5 h-5 text-brand-accent border-gray-300 rounded focus:ring-brand-accent"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Bereken ook mijn Mijn VerbouwPremie</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        {projectType === 'gevelwerken' || projectType === 'isolatie' 
                          ? 'Tot €5.000 premie voor gevelisolatie'
                          : 'Tot €2.500 premie voor hoogrendementsglas'
                        }
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-4 rounded-lg border border-red-200">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Calculate Button */}
              {surfaceArea && (
                <button
                  onClick={handleCalculate}
                  className="w-full bg-brand-accent hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
                >
                  <Calculator size={24} />
                  Bereken mijn investering
                </button>
              )}

              {/* Result */}
              {result && (
                <div className="bg-gradient-to-r from-brand-accent/5 to-blue-50 border border-brand-accent/20 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">💰 Investering</h4>
                      <p className="text-3xl font-bold text-brand-dark mb-2">
                        {formatPriceRange(result)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Inclusief materiaal, plaatsing en BTW
                      </p>
                    </div>
                    
                    {includePremie && premieAmount > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-green-800 mb-2">🎁 Mogelijke Premie</h4>
                        <p className="text-3xl font-bold text-green-600 mb-2">
                          €{premieAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-700">
                          Via Mijn VerbouwPremie
                        </p>
                      </div>
                    )}
                  </div>

                  {(projectType === 'gevelwerken' || projectType === 'isolatie' || projectType === 'ramen-deuren') && (
                    <div className="mt-6 p-4 bg-white/50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">📈 Jouw Voordelen:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Tot 30% lagere energiekosten per jaar</li>
                        <li>• Hogere woningwaarde (+€15.000 tot €25.000)</li>
                        <li>• Meer wooncomfort (geen tocht, betere temperatuur)</li>
                        <li>• 10 jaar garantie op alle werken</li>
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRequestQuote}
                      className="flex-1 bg-brand-dark hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Vraag gedetailleerde offerte aan
                      <ArrowRight size={18} />
                    </button>
                    <a
                      href="tel:+32489960001"
                      className="flex-1 bg-white border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Bel direct: +32 489 96 00 01
                    </a>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Deze prijzen zijn indicatief en kunnen wijzigen na een gratis opmeting ter plaatse. 
                    Premies zijn afhankelijk van uw situatie en geldende regelgeving.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
