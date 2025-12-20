import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { ProjectType } from '../types';
import { calculatePriceRange, formatPriceRange, PriceRange, CalculatorInput } from '../utils/calculator';
import { Calculator, ArrowRight, AlertCircle } from 'lucide-react';

interface QuoteCalculatorProps {
  onRequestQuote?: (input: CalculatorInput, priceRange: PriceRange) => void;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onRequestQuote }) => {
  const { t } = useI18n();
  const [projectType, setProjectType] = useState<ProjectType | ''>('');
  const [surfaceArea, setSurfaceArea] = useState<string>('');
  const [result, setResult] = useState<PriceRange | null>(null);
  const [error, setError] = useState<string>('');

  const projectTypes: { value: ProjectType; labelKey: string }[] = [
    { value: 'gevelwerken', labelKey: 'portfolio.filter.gevelwerken' },
    { value: 'renovatie', labelKey: 'portfolio.filter.renovatie' },
    { value: 'isolatie', labelKey: 'portfolio.filter.isolatie' },
    { value: 'ramen-deuren', labelKey: 'portfolio.filter.ramenDeuren' },
  ];

  const handleCalculate = () => {
    setError('');
    setResult(null);

    if (!projectType) {
      setError('Selecteer een type project');
      return;
    }

    const area = parseFloat(surfaceArea);
    if (isNaN(area) || area <= 0) {
      setError('Voer een geldige oppervlakte in');
      return;
    }

    try {
      const priceRange = calculatePriceRange({
        projectType,
        surfaceArea: area,
      });
      setResult(priceRange);
    } catch (err) {
      setError('Er is een fout opgetreden bij de berekening');
    }
  };

  const handleRequestQuote = () => {
    if (result && projectType && onRequestQuote) {
      onRequestQuote(
        { projectType, surfaceArea: parseFloat(surfaceArea) },
        result
      );
    } else if (result && projectType) {
      // Navigate to contact with pre-filled data
      const params = new URLSearchParams({
        project: projectType,
        area: surfaceArea,
        estimate: formatPriceRange(result),
      });
      window.location.href = `/contact?${params.toString()}`;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/10 rounded-full mb-4">
              <Calculator className="text-brand-accent" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('calculator.title')}
            </h2>
            <p className="text-gray-600">
              {t('calculator.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Project Type */}
              <div>
                <label 
                  htmlFor="projectType" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('calculator.projectType')}
                </label>
                <select
                  id="projectType"
                  value={projectType}
                  onChange={(e) => {
                    setProjectType(e.target.value as ProjectType);
                    setResult(null);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                >
                  <option value="">Selecteer type project</option>
                  {projectTypes.map(({ value, labelKey }) => (
                    <option key={value} value={value}>
                      {t(labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Surface Area */}
              <div>
                <label 
                  htmlFor="surfaceArea" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('calculator.surfaceArea')}
                </label>
                <div className="relative">
                  <input
                    id="surfaceArea"
                    type="number"
                    min="1"
                    step="0.1"
                    value={surfaceArea}
                    onChange={(e) => {
                      setSurfaceArea(e.target.value);
                      setResult(null);
                    }}
                    placeholder="bijv. 50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    m²
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-brand-accent hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                {t('calculator.calculate')}
              </button>

              {/* Result */}
              {result && (
                <div className="mt-6 p-6 bg-brand-accent/5 border border-brand-accent/20 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">{t('calculator.result')}</p>
                  <p className="text-3xl font-bold text-brand-dark mb-4">
                    {formatPriceRange(result)}
                  </p>
                  <p className="text-xs text-gray-500 mb-6">
                    {t('calculator.disclaimer')}
                  </p>
                  <button
                    onClick={handleRequestQuote}
                    className="w-full bg-brand-dark hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {t('calculator.requestQuote')}
                    <ArrowRight size={18} />
                  </button>
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
