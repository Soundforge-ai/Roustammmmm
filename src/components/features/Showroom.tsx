import React, { useState, useRef, useEffect } from 'react';
import '@google/model-viewer';
import { ChevronLeft, ChevronRight, RotateCcw, Maximize2, Smartphone, Sun, Moon, Lightbulb, Loader2, AlertTriangle, Info, Share2, Save, Calculator, Grid3x3, DoorOpen, Square, MoveHorizontal, Network, Sun as SunIcon, Car, Fence, Leaf } from 'lucide-react';
import { getShowroomModels, ShowroomModel } from '@/lib/ai/3d-api';
import { STATIC_DOORS, Door, ProductCategory, PRODUCT_CATEGORIES, STATIC_PRODUCTS, Product } from '@/lib/showroomData';
import { useI18n } from '@/hooks/useI18n';

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

// Belichting presets voor verschillende sferen
type LightingPreset = 'studio' | 'warm' | 'outdoor' | 'dramatic';

const LIGHTING_PRESETS: Record<LightingPreset, {
  name: string;
  icon: React.ReactNode;
  environment: string;
  exposure: string;
  shadowIntensity: string;
  shadowSoftness: string;
}> = {
  studio: {
    name: 'Studio',
    icon: <Lightbulb size={18} />,
    environment: 'neutral',
    exposure: '1.0',
    shadowIntensity: '1.2',
    shadowSoftness: '0.8',
  },
  warm: {
    name: 'Warm',
    icon: <Sun size={18} />,
    environment: 'legacy',
    exposure: '1.2',
    shadowIntensity: '0.8',
    shadowSoftness: '1.0',
  },
  outdoor: {
    name: 'Buiten',
    icon: <Sun size={18} />,
    environment: 'legacy',
    exposure: '0.9',
    shadowIntensity: '1.5',
    shadowSoftness: '0.5',
  },
  dramatic: {
    name: 'Dramatisch',
    icon: <Moon size={18} />,
    environment: 'neutral',
    exposure: '0.6',
    shadowIntensity: '2.0',
    shadowSoftness: '0.3',
  },
};

const Showroom: React.FC = () => {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('deuren');
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lighting, setLighting] = useState<LightingPreset>('studio');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [dynamicModels, setDynamicModels] = useState<ShowroomModel[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const modelViewerRef = useRef<any>(null);
  
  // Configurator states
  const [material, setMaterial] = useState<'pvc' | 'aluminium' | 'wood'>('pvc');
  const [doorClass, setDoorClass] = useState<DoorClass>(DOOR_CLASSES[1]);
  const [width, setWidth] = useState<number>(1000);
  const [height, setHeight] = useState<number>(2000);
  const [selectedPattern, setSelectedPattern] = useState<DoorPattern>(DOOR_PATTERNS[0]);
  const [patternPage, setPatternPage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [showConfigurator, setShowConfigurator] = useState<boolean>(true);

  // Load dynamic models from admin panel
  useEffect(() => {
    const published = getShowroomModels().filter(m => m.published);
    setDynamicModels(published);
  }, []);

  // Functie om patroon toe te passen op 3D model
  const applyPatternToModel = React.useCallback(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    // @ts-ignore
    const model = viewer.model;
    if (!model || !model.materials) return;

    const patternColor = PATTERN_COLORS[selectedPattern.id] || '#808080';
    const hexToRgba = (hex: string, brightness: number = 1.0) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      // Pas brightness aan voor betere weergave in 3D
      return [
        Math.min(1.0, r * brightness),
        Math.min(1.0, g * brightness),
        Math.min(1.0, b * brightness),
        1.0
      ];
    };

    // Pas brightness aan op basis van patroon type voor betere zichtbaarheid
    let brightness = 1.0;
    if (selectedPattern.id === 'ek19' || selectedPattern.id === 'ek42') {
      // Lichte patronen: iets donkerder maken voor contrast
      brightness = 0.95;
    } else if (selectedPattern.id === 'ek111' || selectedPattern.id === 'ek66') {
      // Donkere patronen: iets lichter maken voor detail
      brightness = 1.05;
    }

    const color = hexToRgba(patternColor, brightness);

    // @ts-ignore
    model.materials.forEach((material: any) => {
      const name = material.name ? material.name.toLowerCase() : '';

      // Skip glass, handles, etc.
      if (
        name.includes('glass') ||
        name.includes('glas') ||
        name.includes('window') ||
        name.includes('handle') ||
        name.includes('kruk') ||
        name.includes('slot') ||
        name.includes('hinge') ||
        name.includes('transparant')
      ) return;

      const pbr = material.pbrMetallicRoughness;
      if (pbr) {
        // Pas patroon kleur toe
        pbr.setBaseColorFactor(color);

        // Stel material properties in op basis van patroon type
        // Hout-achtige patronen: minder metallic, meer ruw
        if (selectedPattern.id.includes('ek01') || selectedPattern.id.includes('ek54') || selectedPattern.id.includes('ek25')) {
          pbr.setMetallicFactor(0.1);
          pbr.setRoughnessFactor(0.8);
        } else if (selectedPattern.id.includes('ek47') || selectedPattern.id.includes('ek111')) {
          // Elegant/Luxe: meer metallic
          pbr.setMetallicFactor(0.5);
          pbr.setRoughnessFactor(0.4);
        } else {
          // Standaard: matte finish
          pbr.setMetallicFactor(0.2);
          pbr.setRoughnessFactor(0.5);
        }
      }
    });
  }, [selectedPattern]);

  // Handle custom events for model-viewer
  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      // Model loaded successfully
      setIsLoading(false);
      setModelError(false);
      // Pas patroon toe zodra model geladen is
      setTimeout(() => {
        applyPatternToModel();
      }, 200);
    };

    const handleError = () => {
      // Model loading error occurred
      setIsLoading(false);
      setModelError(true);
    };

    // @ts-ignore
    viewer.addEventListener('load', handleLoad);
    // @ts-ignore
    viewer.addEventListener('error', handleError);

    return () => {
      if (viewer) {
        // @ts-ignore
        viewer.removeEventListener('load', handleLoad);
        // @ts-ignore
        viewer.removeEventListener('error', handleError);
      }
    };
  }, [applyPatternToModel]);


  // Bereken prijs op basis van configuratie
  useEffect(() => {
    const basePrice = doorClass.basePrice;
    const area = (width * height) / 1000000; // mm² naar m²
    const areaMultiplier = Math.max(1, area / 2); // Basis 2m²
    
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

  const patternPages = Math.ceil(DOOR_PATTERNS.length / 10);
  const visiblePatterns = DOOR_PATTERNS.slice(
    patternPage * 10,
    (patternPage + 1) * 10
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevProduct();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextProduct();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoRotating(prev => !prev);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          resetCamera();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          setIsFullscreen(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Pas patroon toe wanneer patroon wordt geselecteerd of model geladen is
  useEffect(() => {
    if (isLoading || modelError) return;
    
    // Wacht even zodat model volledig geladen is
    const timer = setTimeout(() => {
      applyPatternToModel();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedPattern, isLoading, modelError]);

  // Get products for selected category
  const getProductsForCategory = React.useCallback((category: ProductCategory): Product[] => {
    if (category === 'deuren') {
      // Combine static and dynamic doors
      return [
        ...STATIC_DOORS,
        ...dynamicModels.map((m, idx) => ({
          id: `dynamic-${idx}`,
          name: m.name,
          description: m.description,
          model: m.modelPath,
          poster: undefined,
          color: '#4A5568',
          features: m.features,
          price: m.price,
          category: 'deuren' as ProductCategory,
        })),
      ];
    }
    return STATIC_PRODUCTS[category] || [];
  }, [dynamicModels]);

  const allProducts = getProductsForCategory(selectedCategory);

  // Ensure currentProduct is within bounds
  const safeCurrentProduct = allProducts.length > 0 
    ? Math.max(0, Math.min(currentProduct, allProducts.length - 1))
    : 0;
  
  const product = allProducts[safeCurrentProduct] || allProducts[0];
  const lightingConfig = LIGHTING_PRESETS[lighting];

  // Reset to first product when category changes
  useEffect(() => {
    setCurrentProduct(0);
    setModelError(false);
    // Only set loading if product has a 3D model
    const products = getProductsForCategory(selectedCategory);
    if (products.length > 0 && products[0]?.model) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [selectedCategory, getProductsForCategory]);

  // Reset loading state when product changes with smooth transition
  useEffect(() => {
    setIsTransitioning(true);
    setModelError(false);
    // Only set loading if product has a 3D model
    if (product?.model) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [currentProduct, product]);

  const handleSaveConfig = () => {
    const config = {
      material,
      doorClass: doorClass.id,
      width,
      height,
      pattern: selectedPattern.id,
      price,
      productId: product.id,
      productName: product.name,
      category: selectedCategory,
    };
    
    localStorage.setItem('productConfig', JSON.stringify(config));
    
    const params = new URLSearchParams({
      type: `${selectedCategory}-configuratie`,
      prijs: price.toString(),
      materiaal: material,
      klasse: doorClass.id,
      breedte: width.toString(),
      hoogte: height.toString(),
      product: product.name,
      categorie: PRODUCT_CATEGORIES[selectedCategory].name,
    });
    
    window.location.href = `/contact?${params.toString()}`;
  };

  // Early return if no products available
  if (!product || allProducts.length === 0) {
    return (
      <section id="showroom" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">Geen producten beschikbaar in deze categorie.</p>
        </div>
      </section>
    );
  }

  const nextProduct = () => {
    if (allProducts.length === 0) return;
    setModelError(false);
    setIsLoading(true);
    setCurrentProduct((prev) => (prev + 1) % allProducts.length);
  };

  const prevProduct = () => {
    if (allProducts.length === 0) return;
    setModelError(false);
    setIsLoading(true);
    setCurrentProduct((prev) => (prev - 1 + allProducts.length) % allProducts.length);
  };

  // Reset camera naar beginpositie
  const resetCamera = () => {
    if (modelViewerRef.current) {
      // @ts-ignore - custom element properties
      modelViewerRef.current.cameraOrbit = '0deg 75deg 105%';
      // @ts-ignore
      modelViewerRef.current.fieldOfView = '30deg';
    }
  };



  return (
    <section id="showroom" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 font-medium text-sm mb-4">
            {t('showroom.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('showroom.title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            {t('showroom.subtitle')}
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-start gap-3 text-left bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-4">
              <Info className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-white font-semibold">
                  {t('showroom.notice.title')}
                </p>
                <p className="text-gray-300 text-sm sm:text-base mt-1">
                  {t('showroom.notice.body')}
                </p>
              </div>
            </div>
          </div>
        </div>
          
        {/* Category Selector - Window4u style horizontal bar */}
        <div className="mb-12">
          <div className="bg-slate-800/50 rounded-2xl p-4 backdrop-blur-sm border border-slate-700/50">
            <div className="flex flex-wrap justify-center gap-3 overflow-x-auto pb-2">
              {(Object.keys(PRODUCT_CATEGORIES) as ProductCategory[]).map((category) => {
                const IconComponent = {
                  'DoorOpen': DoorOpen,
                  'Square': Square,
                  'MoveHorizontal': MoveHorizontal,
                  'Network': Network,
                  'Sun': SunIcon,
                  'Car': Car,
                  'Fence': Fence,
                  'Leaf': Leaf,
                }[PRODUCT_CATEGORIES[category].iconComponent || ''] || DoorOpen;
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50 scale-105'
                        : 'bg-slate-700/80 text-white/90 hover:bg-slate-600/80 hover:scale-105'
                    }`}
                  >
                    <IconComponent 
                      size={18} 
                      className={selectedCategory === category ? 'text-white' : 'text-gray-300'}
                    />
                    <span>{PRODUCT_CATEGORIES[category].name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start lg:items-center">
          {/* 3D Viewer */}
          <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 p-4' : ''}`}>
            {/* Lighting selector */}
            <div className="flex gap-2 mb-4 justify-center lg:justify-start flex-wrap">
              {(Object.keys(LIGHTING_PRESETS) as LightingPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setLighting(preset)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${lighting === preset
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50 scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:scale-105'
                    }`}
                >
                  {LIGHTING_PRESETS[preset].icon}
                  <span className="hidden sm:inline">{LIGHTING_PRESETS[preset].name}</span>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 shadow-2xl relative overflow-hidden h-[500px] lg:h-auto lg:aspect-[4/3]">
              {/* Decoratieve lichtstralen achtergrond */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 left-1/2 w-48 h-24 bg-amber-400/15 rounded-full blur-2xl" />
              </div>

              {/* Transition overlay */}
              {isTransitioning && (
                <div className="absolute inset-0 z-10 bg-slate-900/30 backdrop-blur-[2px] transition-opacity duration-300" />
              )}

              {/* Loading Indicator - only show for products with 3D models */}
              {isLoading && !modelError && product.model && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-800/50 backdrop-blur-sm transition-opacity duration-300">
                  <Loader2 size={48} className="text-amber-500 animate-spin mb-4" />
                  <p className="text-white font-medium animate-pulse">Model laden...</p>
                </div>
              )}

              {/* Error State */}
              {modelError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-800/90 text-center p-6">
                  <div className="bg-red-500/10 p-4 rounded-full mb-4">
                    <AlertTriangle size={48} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Kon 3D model niet laden</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Het model "{product.name}" is momenteel niet beschikbaar of kon niet worden geladen.
                  </p>
                  <button
                    onClick={nextProduct}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    Volgende model proberen
                  </button>
                </div>
              )}

              {/* 3D Model Viewer - only show if product has a model */}
              {product.model ? (
                // @ts-ignore - model-viewer is a custom web component
                <model-viewer
                  ref={modelViewerRef}
                  src={product.model}
                  alt={product.name}
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  camera-controls
                  auto-rotate={isAutoRotating}
                  auto-rotate-delay="0"
                  rotation-per-second="20deg"
                  interaction-prompt="auto"
                  shadow-intensity={lightingConfig.shadowIntensity}
                  shadow-softness={lightingConfig.shadowSoftness}
                  exposure={lightingConfig.exposure}
                  environment-image={lightingConfig.environment}
                  camera-orbit="0deg 75deg 105%"
                  min-camera-orbit="auto auto 50%"
                  max-camera-orbit="auto auto 200%"
                  field-of-view="30deg"
                  min-field-of-view="20deg"
                  max-field-of-view="45deg"
                  touch-action="pan-y"
                  loading="eager"
                  {...(product.poster && { poster: product.poster })}
                  style={{
                    width: '100%',
                    height: isFullscreen ? 'calc(100vh - 100px)' : '100%',
                    minHeight: '400px',
                    borderRadius: '12px',
                    backgroundColor: lighting === 'dramatic' ? '#0f172a' : '#1e293b',
                    transition: 'opacity 0.3s ease-in-out',
                    opacity: isTransitioning ? 0.7 : 1,
                  }}
                />
              ) : (
                // Image fallback for products without 3D models
                <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded-lg overflow-hidden relative">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onLoad={() => setIsLoading(false)}
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        setIsLoading(false);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center p-8">
                      <Grid3x3 size={64} className="text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 font-semibold text-lg">{product.name}</p>
                      <p className="text-gray-500 text-sm mt-2">{product.description}</p>
                      <p className="text-gray-600 text-xs mt-4">Afbeelding binnenkort beschikbaar</p>
                    </div>
                  )}
                </div>
              )}

              {/* Controls overlay - only show for products with 3D models */}
              {product.model && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  <button
                    onClick={prevProduct}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                    aria-label="Vorige product"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className={`p-3 backdrop-blur-md rounded-full text-white transition-all hover:scale-110 ${isAutoRotating ? 'bg-amber-500/80 hover:bg-amber-600/80' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    aria-label={isAutoRotating ? 'Stop rotatie' : 'Start rotatie'}
                    title={isAutoRotating ? 'Klik om te stoppen' : 'Klik om te draaien'}
                  >
                    <RotateCcw size={24} className={isAutoRotating ? 'animate-spin' : ''} style={{ animationDuration: '3s' }} />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                    aria-label="Volledig scherm"
                  >
                    <Maximize2 size={24} />
                  </button>
                  <button
                    onClick={resetCamera}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                    aria-label="Reset camera"
                    title="Reset weergave"
                  >
                    <RotateCcw size={24} />
                  </button>
                  <button
                    onClick={nextProduct}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                    aria-label="Volgende product"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
              
              {/* Navigation buttons for products without 3D models */}
              {!product.model && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  <button
                    onClick={prevProduct}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                    aria-label="Vorige product"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextProduct}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                    aria-label="Volgende product"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}

              {/* AR Button hint - only for products with 3D models */}
              {!isLoading && !modelError && product.model && (
                <div className="absolute top-8 right-8 flex items-center gap-2 bg-amber-500/90 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse z-20">
                  <Smartphone size={18} />
                  AR beschikbaar
                </div>
              )}

              {/* Fullscreen close button */}
              {isFullscreen && (
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 p-3 bg-red-500/80 hover:bg-red-600 rounded-full text-white transition-all z-40"
                  aria-label="Sluiten"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Sidebar - Controls & Info */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto lg:sticky lg:top-24 custom-scrollbar">
              <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(251, 146, 60, 0.5);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(251, 146, 60, 0.7);
                }
              `}</style>

              {/* Product Info */}
              <div className="space-y-6">
            {/* Product selector */}
            <div className="flex gap-3 flex-wrap">
              {allProducts.map((p, index) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setModelError(false);
                    setIsLoading(true);
                    setCurrentProduct(index);
                  }}
                  className={`w-16 h-16 rounded-xl border-2 transition-all relative group bg-slate-700 flex items-center justify-center ${index === currentProduct
                    ? 'border-amber-500 scale-110 shadow-lg shadow-amber-500/50'
                    : 'border-white/20 hover:border-white/40 hover:scale-105'
                    }`}
                  aria-label={p.name}
                  title={p.name}
                >
                  {/* Toon eerste letter van product naam */}
                  <span className="text-white text-xs font-bold">{p.name.charAt(0)}</span>
                  {index === currentProduct && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                  {/* Product name tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-amber-500/30">
                    {p.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-900 border-r border-b border-amber-500/30 rotate-45" />
                  </div>
                </button>
              ))}
            </div>

            {/* Current product info */}
            <div className="transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-3xl font-bold text-white">{product.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `${product.name} - Yannova`,
                          text: product.description,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link gekopieerd naar klembord!');
                      }
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all hover:scale-110"
                    aria-label="Deel dit product"
                    title="Deel"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-lg mb-3">{product.description}</p>
              {product.price && (
                <div className="relative group">
                  <p className="text-amber-400 font-semibold text-xl mt-2 inline-flex items-center gap-2">
                    {product.price}
                    <Info 
                      size={16} 
                      className="text-amber-400/70 cursor-help"
                    />
                  </p>
                  <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-slate-800 border border-amber-500/30 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                    <p className="font-semibold text-amber-400 mb-1">Prijzen zijn indicatief</p>
                    <p>De exacte prijs hangt af van maatwerk, opties en installatie. Vraag een gratis offerte aan voor een exacte prijsopgave.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Configurator Toggle - only show for doors */}
            {selectedCategory === 'deuren' && (
              <>
                <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-700">
                  <h4 className="text-white font-semibold">Configuratie</h4>
                  <button
                    onClick={() => setShowConfigurator(!showConfigurator)}
                    className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                  >
                    {showConfigurator ? 'Verberg' : 'Toon'} Configuratie
                  </button>
                </div>

                {showConfigurator && (
              <>
                {/* Materiaal Selectie */}
                <div className="space-y-3 mb-4">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Materiaal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['pvc', 'aluminium', 'wood'] as const).map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setMaterial(mat)}
                        className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                          material === mat
                            ? 'border-amber-500 bg-amber-500/20 text-white'
                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                        }`}
                      >
                        {mat === 'pvc' ? 'PVC' : mat === 'aluminium' ? 'Alu' : 'Hout'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Klasse Selectie */}
                <div className="space-y-3 mb-4">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Klasse</label>
                  <div className="space-y-2">
                    {DOOR_CLASSES.map((cls) => (
                      <button
                        key={cls.id}
                        onClick={() => setDoorClass(cls)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          doorClass.id === cls.id
                            ? 'border-amber-500 bg-amber-500/20'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-semibold text-white">{cls.name}</div>
                            <div className="text-xs text-gray-400">{cls.description}</div>
                          </div>
                          <div className="text-sm font-bold text-amber-400">
                            €{cls.basePrice.toLocaleString('nl-BE')}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afmetingen */}
                <div className="space-y-4 mb-5 bg-slate-700/30 rounded-lg p-3">
                  <label className="text-xs text-gray-300 uppercase tracking-wider font-semibold flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    Afmetingen
                  </label>
                  
                  {/* Breedte */}
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-200">Breedte</span>
                      <div className="flex items-center gap-2 bg-slate-700 px-3 py-1.5 rounded-lg">
                        <input
                          type="number"
                          min="900"
                          max="1100"
                          step="10"
                          value={width}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= 900 && val <= 1100) setWidth(val);
                          }}
                          className="w-16 px-2 py-1 bg-transparent border-0 text-white text-sm text-center font-semibold focus:outline-none"
                        />
                        <span className="text-xs text-gray-400">mm</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="900"
                      max="1100"
                      step="10"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>900 mm</span>
                      <span className="text-amber-400 font-semibold">{width} mm</span>
                      <span>1100 mm</span>
                    </div>
                  </div>

                  {/* Hoogte */}
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-200">Hoogte</span>
                      <div className="flex items-center gap-2 bg-slate-700 px-3 py-1.5 rounded-lg">
                        <input
                          type="number"
                          min="2000"
                          max="2300"
                          step="10"
                          value={height}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= 2000 && val <= 2300) setHeight(val);
                          }}
                          className="w-16 px-2 py-1 bg-transparent border-0 text-white text-sm text-center font-semibold focus:outline-none"
                        />
                        <span className="text-xs text-gray-400">mm</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="2300"
                      step="10"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>2000 mm</span>
                      <span className="text-amber-400 font-semibold">{height} mm</span>
                      <span>2300 mm</span>
                    </div>
                  </div>
                </div>

                {/* Patroon Selectie */}
                <div className="space-y-3 mb-5 bg-slate-700/30 rounded-lg p-3" style={{ margin: '0 -0.5rem', padding: '1rem calc(1rem + 0.5rem)' }}>
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-gray-300 uppercase tracking-wider font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                      Patroon
                    </label>
                    <span className="text-xs text-gray-500 bg-slate-800 px-2 py-1 rounded">{patternPage + 1} / {patternPages}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPatternPage(Math.max(0, patternPage - 1))}
                      disabled={patternPage === 0}
                      className="p-2 rounded-lg border border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 text-white transition-all hover:scale-110 flex-shrink-0"
                      aria-label="Vorige patronen"
                    >
                      ←
                    </button>
                    <div className="grid grid-cols-5 gap-2 flex-1" style={{ padding: '0.5rem' }}>
                      {visiblePatterns.map((pattern) => (
                        <button
                          key={pattern.id}
                          onClick={() => setSelectedPattern(pattern)}
                          className={`aspect-square rounded-lg border-2 transition-all relative group ${
                            selectedPattern.id === pattern.id
                              ? 'border-amber-500 scale-110 shadow-lg ring-2 ring-amber-500/50 z-20'
                              : 'border-gray-600 hover:scale-105 hover:border-gray-500 z-10'
                          }`}
                          style={{ 
                            transformOrigin: 'center center'
                          }}
                          title={pattern.name}
                        >
                          <div 
                            className="w-full h-full flex items-center justify-center text-xs font-medium text-white relative rounded-lg overflow-hidden"
                            style={{ 
                              backgroundColor: PATTERN_COLORS[pattern.id] || '#808080',
                              backgroundImage: `linear-gradient(135deg, ${PATTERN_COLORS[pattern.id] || '#808080'} 0%, ${PATTERN_COLORS[pattern.id] ? PATTERN_COLORS[pattern.id] + 'dd' : '#606060'} 100%)`
                            }}
                          >
                            <span className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            <span className="relative z-10 text-center px-1 text-[10px] font-semibold">{pattern.name}</span>
                          </div>
                          {selectedPattern.id === pattern.id && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-800">
                              <span className="text-white text-[10px] font-bold">✓</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setPatternPage(Math.min(patternPages - 1, patternPage + 1))}
                      disabled={patternPage === patternPages - 1}
                      className="p-2 rounded-lg border border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 text-white transition-all hover:scale-110"
                      aria-label="Volgende patronen"
                    >
                      →
                    </button>
                  </div>
                </div>
                </>
                )}
              </>
            )}

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Kenmerken:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-700 sticky bottom-0 bg-slate-800 pb-2">
              <button
                onClick={handleSaveConfig}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transform hover:scale-105"
              >
                <Save size={20} />
                Opslaan & Offerte Aanvragen
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Calculator size={16} />
                  Offerte
                </a>
                <button
                  onClick={resetCamera}
                  className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-slate-700/50 rounded-xl p-4 text-sm text-gray-400 border border-gray-600/50">
              <p className="font-medium text-white mb-2 flex items-center gap-2">
                <Info size={16} className="text-amber-400" />
                Bediening
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">🖱️</span>
                  <span><strong>Muis slepen:</strong> Deur draaien</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">🔍</span>
                  <span><strong>Scrollen:</strong> In- en uitzoomen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">🔄</span>
                  <span><strong>Auto-rotate:</strong> Rustig ronddraaien (Spatie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">📱</span>
                  <span><strong>AR:</strong> Bekijk in uw eigen woning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">💡</span>
                  <span><strong>Belichting:</strong> Kies sfeer bovenaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">⌨️</span>
                  <span><strong>Toetsen:</strong> ← → (navigeren), R (reset), F (fullscreen)</span>
                </li>
              </ul>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showroom;