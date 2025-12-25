import React, { useState, useRef, useEffect } from 'react';
import '@google/model-viewer';
import { ChevronLeft, ChevronRight, RotateCcw, Maximize2, Smartphone, Sun, Moon, Lightbulb, Loader2, AlertTriangle } from 'lucide-react';
import { getShowroomModels, ShowroomModel } from '../lib/ai/3d-api';
import { STATIC_DOORS, Door, ALUPLAST_COLORS, ColorOption } from '../lib/showroomData';

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
  const [currentDoor, setCurrentDoor] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(ALUPLAST_COLORS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state for model
  const [lighting, setLighting] = useState<LightingPreset>('studio');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [dynamicModels, setDynamicModels] = useState<ShowroomModel[]>([]);
  const modelViewerRef = useRef<HTMLElement>(null);

  // Load dynamic models from admin panel
  useEffect(() => {
    const published = getShowroomModels().filter(m => m.published);
    setDynamicModels(published);
  }, []);

  // Handle custom events for model-viewer
  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      console.log('Model loaded');
      setIsLoading(false);
      setModelError(false);
    };

    const handleError = (error: any) => {
      console.error('Model error:', error);
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
  }, []);

  // Reset loading state when door changes
  useEffect(() => {
    setIsLoading(true);
    setModelError(false);
  }, [currentDoor]);

  // Update model color when selection changes
  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer || isLoading || modelError) return;

    // Helper to convert hex to [r,g,b,a]
    const hexToRgba = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b, 1.0];
    };

    const applyColor = () => {
      // @ts-ignore
      const model = viewer.model;
      if (!model || !model.materials) return;

      const color = hexToRgba(selectedColor.hex);

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
          pbr.setBaseColorFactor(color);

          // Texture Handling: Preserve texture for wood, hide for solid colors
          if (pbr.baseColorTexture) {
            // Store original texture reference if not yet stored
            if (material._originalTexture === undefined) {
              material._originalTexture = pbr.baseColorTexture.texture;
            }

            if (selectedColor.texture === 'wood') {
              // Restore original texture for wood look (tinted)
              pbr.baseColorTexture.setTexture(material._originalTexture);
            } else {
              // Remove texture for solid color look (pure color)
              pbr.baseColorTexture.setTexture(null);
            }
          } else if (selectedColor.texture === 'wood' && material._originalTexture) {
            // Restore if possible
            if (pbr.baseColorTexture) {
              pbr.baseColorTexture.setTexture(material._originalTexture);
            }
          }

          // Adjust finish based on category/texture
          if (selectedColor.texture === 'wood') {
            pbr.setMetallicFactor(0.1);
            pbr.setRoughnessFactor(0.8);
          } else if (selectedColor.texture === 'metallic') {
            pbr.setMetallicFactor(0.7);
            pbr.setRoughnessFactor(0.3);
          } else {
            // Matte / Standard
            pbr.setMetallicFactor(0.2);
            pbr.setRoughnessFactor(0.5);
          }
        }
      });
    };

    // Apply immediately if already loaded
    applyColor();
  }, [selectedColor, isLoading, modelError]);

  // Combine static and dynamic doors
  const allDoors: Door[] = [
    ...STATIC_DOORS,
    ...dynamicModels.map((m, idx) => ({
      id: `dynamic-${idx}`,
      name: m.name,
      description: m.description,
      model: m.modelPath,
      poster: undefined, // Dynamic models don't have posters yet
      color: m.color,
      features: m.features,
      price: m.price,
    })),
  ];

  // Ensure currentDoor is within bounds
  const safeCurrentDoor = allDoors.length > 0 
    ? Math.max(0, Math.min(currentDoor, allDoors.length - 1))
    : 0;
  
  const door = allDoors[safeCurrentDoor] || allDoors[0];
  const lightingConfig = LIGHTING_PRESETS[lighting];

  // Early return if no doors available
  if (!door || allDoors.length === 0) {
    return (
      <section id="showroom" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">Geen deuren beschikbaar in de showroom.</p>
        </div>
      </section>
    );
  }

  const nextDoor = () => {
    if (allDoors.length === 0) return;
    setModelError(false);
    setIsLoading(true); // Start loading next model
    setCurrentDoor((prev) => (prev + 1) % allDoors.length);
  };

  const prevDoor = () => {
    if (allDoors.length === 0) return;
    setModelError(false);
    setIsLoading(true); // Start loading previous model
    setCurrentDoor((prev) => (prev - 1 + allDoors.length) % allDoors.length);
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
          <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 p-4' : ''}`}>
            {/* Lighting selector */}
            <div className="flex gap-2 mb-4 justify-center lg:justify-start">
              {(Object.keys(LIGHTING_PRESETS) as LightingPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setLighting(preset)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${lighting === preset
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  {LIGHTING_PRESETS[preset].icon}
                  {LIGHTING_PRESETS[preset].name}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 shadow-2xl relative overflow-hidden h-[500px] lg:h-auto lg:aspect-[4/3]">
              {/* Decoratieve lichtstralen achtergrond */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 left-1/2 w-48 h-24 bg-amber-400/15 rounded-full blur-2xl" />
              </div>

              {/* Loading Indicator */}
              {isLoading && !modelError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-800/50 backdrop-blur-sm transition-opacity duration-300">
                  <Loader2 size={48} className="text-amber-500 animate-spin mb-4" />
                  <p className="text-white font-medium">Model laden...</p>
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
                    Het model "{door.name}" is momenteel niet beschikbaar of kon niet worden geladen.
                  </p>
                  <button
                    onClick={nextDoor}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    Volgende model proberen
                  </button>
                </div>
              )}

              <model-viewer
                ref={modelViewerRef as any}
                src={door.model}
                alt={door.name}
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
                {...(door.poster && { poster: door.poster })}
                style={{
                  width: '100%',
                  height: isFullscreen ? 'calc(100vh - 100px)' : '100%',
                  minHeight: '400px',
                  borderRadius: '12px',
                  backgroundColor: lighting === 'dramatic' ? '#0f172a' : '#1e293b',
                }}
              />

              {/* Controls overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                <button
                  onClick={prevDoor}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                  aria-label="Vorige deur"
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
                  onClick={nextDoor}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
                  aria-label="Volgende deur"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* AR Button hint */}
              {!isLoading && !modelError && (
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

          {/* Door Info */}
          <div className="space-y-6">
            {/* Door selector */}
            <div className="flex gap-3 flex-wrap">
              {allDoors.map((d, index) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setModelError(false);
                    setIsLoading(true);
                    setCurrentDoor(index);
                  }}
                  className={`w-16 h-16 rounded-xl border-2 transition-all ${index === currentDoor
                    ? 'border-amber-500 scale-110'
                    : 'border-white/20 hover:border-white/40'
                    }`}
                  style={{ backgroundColor: d.color }}
                  aria-label={d.name}
                  title={d.name}
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

            {/* Kleur Selector */}
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-semibold">Kleur & Afwerking:</h4>
                <span className="text-amber-400 text-sm font-medium">{selectedColor.name}</span>
              </div>

              <div className="space-y-4">
                {/* Aludec */}
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Aludec (Aluminium look)</p>
                  <div className="flex gap-2 flex-wrap">
                    {ALUPLAST_COLORS.filter(c => c.category === 'aludec').map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative group ${selectedColor.id === c.id ? 'border-amber-500 scale-110' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor.id === c.id && <div className="absolute inset-0 rounded-full ring-2 ring-white/20" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Woodec */}
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Woodec (Houtstructuur)</p>
                  <div className="flex gap-2 flex-wrap">
                    {ALUPLAST_COLORS.filter(c => c.category === 'woodec').map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative group ${selectedColor.id === c.id ? 'border-amber-500 scale-110' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor.id === c.id && <div className="absolute inset-0 rounded-full ring-2 ring-white/20" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Standard */}
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Standaard Kleuren</p>
                  <div className="flex gap-2 flex-wrap">
                    {ALUPLAST_COLORS.filter(c => c.category === 'standard').map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative group ${selectedColor.id === c.id ? 'border-amber-500 scale-110' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor.id === c.id && <div className="absolute inset-0 rounded-full ring-2 ring-white/20" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
              <button
                onClick={resetCamera}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                <RotateCcw size={20} />
                Reset weergave
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-slate-700/50 rounded-xl p-4 text-sm text-gray-400">
              <p className="font-medium text-white mb-2">💡 Bediening:</p>
              <ul className="space-y-1">
                <li>🖱️ <strong>Muis slepen:</strong> Deur draaien</li>
                <li>🔍 <strong>Scrollen:</strong> In- en uitzoomen</li>
                <li>🔄 <strong>Auto-rotate:</strong> Rustig ronddraaien</li>
                <li>📱 <strong>AR:</strong> Bekijk in uw eigen woning</li>
                <li>💡 <strong>Belichting:</strong> Kies sfeer bovenaan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showroom;