import { ProjectType } from '../types';

export interface PriceRange {
  min: number;
  max: number;
  currency: 'EUR';
}

export interface CalculatorInput {
  projectType: ProjectType;
  surfaceArea: number;
}

interface PriceConfig {
  projectType: ProjectType;
  basePrice: number; // per m²
  minPrice: number;
  maxMultiplier: number;
}

const PRICE_CONFIG: PriceConfig[] = [
  { projectType: 'gevelwerken', basePrice: 45, minPrice: 500, maxMultiplier: 1.4 },
  { projectType: 'renovatie', basePrice: 150, minPrice: 2000, maxMultiplier: 1.5 },
  { projectType: 'isolatie', basePrice: 35, minPrice: 400, maxMultiplier: 1.3 },
  { projectType: 'ramen-deuren', basePrice: 250, minPrice: 800, maxMultiplier: 1.4 },
];

export function calculatePriceRange(input: CalculatorInput): PriceRange {
  const config = PRICE_CONFIG.find(c => c.projectType === input.projectType);
  
  if (!config) {
    throw new Error(`Unknown project type: ${input.projectType}`);
  }

  if (input.surfaceArea <= 0) {
    throw new Error('Surface area must be positive');
  }

  const baseTotal = config.basePrice * input.surfaceArea;
  const minPrice = Math.max(config.minPrice, Math.round(baseTotal * 0.9));
  const maxPrice = Math.round(baseTotal * config.maxMultiplier);

  return {
    min: minPrice,
    max: Math.max(minPrice, maxPrice),
    currency: 'EUR',
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceRange(range: PriceRange): string {
  return `${formatPrice(range.min)} - ${formatPrice(range.max)}`;
}

export function isValidCalculatorInput(input: Partial<CalculatorInput>): input is CalculatorInput {
  return (
    typeof input.projectType === 'string' &&
    ['gevelwerken', 'renovatie', 'isolatie', 'ramen-deuren'].includes(input.projectType) &&
    typeof input.surfaceArea === 'number' &&
    input.surfaceArea > 0
  );
}
