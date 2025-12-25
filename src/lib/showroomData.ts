export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  texture?: string; // 'wood' | 'matte' | 'metallic'
  category: 'aludec' | 'woodec' | 'standard';
}

export interface Door {
  id: number | string; // Support both static (number) and dynamic (string) IDs
  name: string;
  description: string;
  model: string;
  poster?: string;
  color: string;
  features: string[];
  price?: string;
}

export const STATIC_DOORS: Door[] = [
  {
    id: 1,
    name: 'Modern Antraciet',
    description: 'Strakke aluminium voordeur met zijlicht',
    model: '/models/deur-antraciet.glb',
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

export const ALUPLAST_COLORS: ColorOption[] = [
  // Aludec (Aluminium look)
  { id: 'aludec-db703', name: 'Aludec DB 703', hex: '#4a4a4a', texture: 'metallic', category: 'aludec' },
  { id: 'aludec-anthracite', name: 'Aludec Antraciet', hex: '#383e42', texture: 'metallic', category: 'aludec' },
  { id: 'aludec-basalt', name: 'Aludec Basaltgrijs', hex: '#5b5e61', texture: 'metallic', category: 'aludec' },

  // Woodec (Realistische houtstructuur)
  { id: 'woodec-oak-turner', name: 'Turner Oak Malt', hex: '#d4bfaa', texture: 'wood', category: 'woodec' },
  { id: 'woodec-oak-sheffield', name: 'Sheffield Oak Alpine', hex: '#a69f96', texture: 'wood', category: 'woodec' },
  { id: 'woodec-golden-oak', name: 'Golden Oak', hex: '#8f6c3e', texture: 'wood', category: 'woodec' },
  { id: 'woodec-walnut', name: 'Walnut', hex: '#5d4037', texture: 'wood', category: 'woodec' },

  // Standaard
  { id: 'std-anthracite', name: 'Antraciet Grijs (7016)', hex: '#37424a', texture: 'matte', category: 'standard' },
  { id: 'std-black', name: 'Diepzwart (9005)', hex: '#1a1a1a', texture: 'matte', category: 'standard' },
  { id: 'std-white', name: 'Verkeerswit (9016)', hex: '#fdfdfd', texture: 'matte', category: 'standard' },
  { id: 'std-creme', name: 'Cremewit (9001)', hex: '#f0ece0', texture: 'matte', category: 'standard' },
];
