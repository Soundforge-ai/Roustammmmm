import React, { useState } from 'react';

interface WizardStep {
  id: string;
  title: string;
  question: string;
  type: 'choice' | 'range' | 'input';
  options?: { value: string; label: string; price?: number }[];
  min?: number;
  max?: number;
  unit?: string;
}

interface WizardData {
  service: string;
  area: number;
  quality: string;
  extras: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'service',
    title: 'Stap 1',
    question: 'Wat wilt u laten doen?',
    type: 'choice',
    options: [
      { value: 'ramen', label: 'Ramen vervangen', price: 450 },
      { value: 'deuren', label: 'Deuren plaatsen', price: 1200 },
      { value: 'ramen-deuren', label: 'Ramen + Deuren', price: 400 },
      { value: 'gevel', label: 'Gevelwerken (crepi/isolatie)', price: 85 },
      { value: 'renovatie', label: 'Totaalrenovatie', price: 1200 }
    ]
  },
  {
    id: 'area',
    title: 'Stap 2',
    question: 'Wat is de geschatte oppervlakte?',
    type: 'range',
    min: 10,
    max: 500,
    unit: 'm²'
  },
  {
    id: 'quality',
    title: 'Stap 3',
    question: 'Welk kwaliteitsniveau wenst u?',
    type: 'choice',
    options: [
      { value: 'basis', label: 'Basis kwaliteit', price: 0.8 },
      { value: 'comfort', label: 'Comfort kwaliteit', price: 1.0 },
      { value: 'premium', label: 'Premium kwaliteit', price: 1.3 }
    ]
  },
  {
    id: 'extras',
    title: 'Stap 4',
    question: 'Gewenste extra\'s? (optioneel)',
    type: 'choice',
    options: [
      { value: 'inbraakbeveiliging', label: 'Inbraakbeveiliging', price: 200 },
      { value: 'zonwering', label: 'Zonwering', price: 150 },
      { value: 'ventilatie', label: 'Ventilatieroosters', price: 75 },
      { value: 'kleur', label: 'Speciale kleur/afwerking', price: 100 }
    ]
  }
];

const BudgetWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<Partial<WizardData>>({
    extras: []
  });
  const [showResults, setShowResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const currentStepData = WIZARD_STEPS[currentStep];
  const isLastStep = currentStep === WIZARD_STEPS.length - 1;

  const handleChoice = (value: string) => {
    if (currentStepData.id === 'extras') {
      const currentExtras = wizardData.extras || [];
      const newExtras = currentExtras.includes(value)
        ? currentExtras.filter(e => e !== value)
        : [...currentExtras, value];
      
      setWizardData({ ...wizardData, extras: newExtras });
    } else {
      setWizardData({ ...wizardData, [currentStepData.id]: value });
    }
  };

  const handleRangeChange = (value: number) => {
    setWizardData({ ...wizardData, [currentStepData.id]: value });
  };

  const handleNext = () => {
    if (isLastStep) {
      setShowResults(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateBudget = () => {
    const service = WIZARD_STEPS[0].options?.find(o => o.value === wizardData.service);
    const quality = WIZARD_STEPS[2].options?.find(o => o.value === wizardData.quality);
    const area = wizardData.area || 50;
    
    if (!service || !quality) return { min: 0, max: 0 };

    let basePrice = service.price * area * quality.price;
    
    // Add extras
    const extrasPrice = (wizardData.extras || []).reduce((total, extra) => {
      const extraOption = WIZARD_STEPS[3].options?.find(o => o.value === extra);
      return total + (extraOption?.price || 0);
    }, 0);

    basePrice += extrasPrice;

    return {
      min: Math.round(basePrice * 0.85),
      max: Math.round(basePrice * 1.15)
    };
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Budget request submitted:', { wizardData, budget: calculateBudget() });
    alert('Bedankt! We sturen u binnen 24 uur een gedetailleerde prijsindicatie.');
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setWizardData({ extras: [] });
    setShowResults(false);
    setShowContactForm(false);
  };

  if (showContactForm) {
    const budget = calculateBudget();
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-2">
            Uw geschatte budget
          </h2>
          <div className="text-4xl font-bold text-brand-accent mb-2">
            €{budget.min.toLocaleString()} - €{budget.max.toLocaleString()}
          </div>
          <p className="text-gray-600">
            Laat uw gegevens achter voor een gedetailleerde offerte
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Naam *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                onChange={(e) => setWizardData({
                  ...wizardData,
                  contact: { ...wizardData.contact, name: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefoon *
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                onChange={(e) => setWizardData({
                  ...wizardData,
                  contact: { ...wizardData.contact, phone: e.target.value }
                })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail *
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              onChange={(e) => setWizardData({
                ...wizardData,
                contact: { ...wizardData.contact, email: e.target.value }
              })}
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Uw selectie:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Service: {WIZARD_STEPS[0].options?.find(o => o.value === wizardData.service)?.label}</li>
              <li>• Oppervlakte: {wizardData.area}m²</li>
              <li>• Kwaliteit: {WIZARD_STEPS[2].options?.find(o => o.value === wizardData.quality)?.label}</li>
              {wizardData.extras && wizardData.extras.length > 0 && (
                <li>• Extra's: {wizardData.extras.map(e => 
                  WIZARD_STEPS[3].options?.find(o => o.value === e)?.label
                ).join(', ')}</li>
              )}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowContactForm(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Terug
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              Verstuur aanvraag
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (showResults) {
    const budget = calculateBudget();
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">
            Uw geschatte budget
          </h2>
          <div className="text-5xl font-bold text-brand-accent mb-4">
            €{budget.min.toLocaleString()} - €{budget.max.toLocaleString()}
          </div>
          <p className="text-gray-600 mb-6">
            Dit is een indicatieve prijsvork gebaseerd op uw selectie. 
            Voor een exacte offerte nemen we graag contact met u op.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="text-green-800 font-semibold mb-2">
              💡 Wist u dat u premie kunt krijgen?
            </div>
            <div className="text-sm text-green-700">
              Voor dit type werk kunt u mogelijk tot €3.500 premie ontvangen. 
              Wij helpen u graag bij de aanvraag!
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={resetWizard}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Opnieuw beginnen
          </button>
          <button
            onClick={() => setShowContactForm(true)}
            className="flex-1 px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            Exacte offerte aanvragen
          </button>
        </div>
      </div>
    );
  }

  const canProceed = () => {
    const value = wizardData[currentStepData.id as keyof WizardData];
    if (currentStepData.id === 'extras') return true; // Extras are optional
    return value !== undefined && value !== '';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-600">
            {currentStepData.title} van {WIZARD_STEPS.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / WIZARD_STEPS.length) * 100)}% voltooid
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">
          {currentStepData.question}
        </h2>

        {/* Choice Type */}
        {currentStepData.type === 'choice' && (
          <div className="space-y-3">
            {currentStepData.options?.map((option) => {
              const isSelected = currentStepData.id === 'extras' 
                ? wizardData.extras?.includes(option.value)
                : wizardData[currentStepData.id as keyof WizardData] === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleChoice(option.value)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    isSelected 
                      ? 'border-brand-accent bg-brand-light' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{option.label}</span>
                    {option.price && (
                      <span className="text-sm text-gray-600">
                        {currentStepData.id === 'service' || currentStepData.id === 'gevel' 
                          ? `vanaf €${option.price}/m²` 
                          : `+€${option.price}`}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Range Type */}
        {currentStepData.type === 'range' && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-brand-accent">
                {wizardData[currentStepData.id as keyof WizardData] || currentStepData.min} {currentStepData.unit}
              </span>
            </div>
            <input
              type="range"
              min={currentStepData.min}
              max={currentStepData.max}
              value={wizardData[currentStepData.id as keyof WizardData] as number || currentStepData.min}
              onChange={(e) => handleRangeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{currentStepData.min} {currentStepData.unit}</span>
              <span>{currentStepData.max} {currentStepData.unit}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vorige
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isLastStep ? 'Toon resultaat' : 'Volgende'}
        </button>
      </div>
    </div>
  );
};

export default BudgetWizard;