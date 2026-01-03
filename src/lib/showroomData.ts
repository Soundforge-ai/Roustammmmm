export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  texture?: string; // 'wood' | 'matte' | 'metallic'
  category: 'aludec' | 'woodec' | 'standard';
}

export type ProductCategory = 'deuren' | 'ramen' | 'schuifsystemen' | 'muskietennetten' | 'zonwering' | 'garagepoorten' | 'hekwerken' | 'pergolas';

export interface Product {
  id: number | string;
  name: string;
  description: string;
  model?: string; // Optional for products without 3D models
  poster?: string;
  image?: string; // For products without 3D models
  color: string;
  features: string[];
  price?: string;
  category: ProductCategory;
}

// Legacy Door interface for backwards compatibility
export interface Door extends Product {
  category: 'deuren';
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
    category: 'deuren',
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
    category: 'deuren',
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
    category: 'deuren',
  },
];

// Productcategorieën gebaseerd op window4u.pl
export const PRODUCT_CATEGORIES: Record<ProductCategory, {
  name: string;
  description: string;
  icon: string;
  iconComponent?: string; // Naam van Lucide icon component
}> = {
  deuren: {
    name: 'Buitendeuren',
    description: 'Moderne en klassieke voordeuren',
    icon: '🚪',
    iconComponent: 'DoorOpen',
  },
  ramen: {
    name: 'Ramen',
    description: 'PVC en aluminium ramen',
    icon: '🪟',
    iconComponent: 'Square',
  },
  schuifsystemen: {
    name: 'Schuifsystemen',
    description: 'Schuifdeuren en schuiframen',
    icon: '↔️',
    iconComponent: 'MoveHorizontal',
  },
  muskietennetten: {
    name: 'Muskietennetten',
    description: 'Bescherming tegen insecten',
    icon: '🕸️',
    iconComponent: 'Network',
  },
  zonwering: {
    name: 'Zonwering & Rolluiken',
    description: 'Buitenzonwering en rolluiken',
    icon: '☀️',
    iconComponent: 'Sun',
  },
  garagepoorten: {
    name: 'Garagepoorten',
    description: 'Automatische en handmatige garagepoorten',
    icon: '🚗',
    iconComponent: 'Car',
  },
  hekwerken: {
    name: 'Hekwerken',
    description: 'Moderne hekwerken en poorten',
    icon: '🏡',
    iconComponent: 'Fence',
  },
  pergolas: {
    name: 'Pergola\'s',
    description: 'Tuinpergola\'s en overkappingen',
    icon: '🌿',
    iconComponent: 'Leaf',
  },
};

// Statische producten per categorie (placeholder data - kan later worden uitgebreid)
export const STATIC_PRODUCTS: Record<ProductCategory, Product[]> = {
  deuren: STATIC_DOORS,
  ramen: [
    {
      id: 'raam-1',
      name: 'PVC Raam Standaard',
      description: 'Energiezuinige PVC ramen met drievoudig glas',
      image: '/images/ramen/pvc-raam.jpg',
      color: '#ffffff',
      features: ['Drievoudig glas', 'U-waarde 0,8', 'Kunststof kozijn'],
      price: '€450 - €650 per m²',
      category: 'ramen',
    },
    {
      id: 'raam-2',
      name: 'Aluminium Raam Premium',
      description: 'Strakke aluminium ramen met smalle profielen',
      image: '/images/ramen/aluminium-raam.jpg',
      color: '#4a4a4a',
      features: ['Smalle profielen', 'Thermisch onderbroken', 'Kleur op maat'],
      price: '€650 - €950 per m²',
      category: 'ramen',
    },
  ],
  schuifsystemen: [
    {
      id: 'schuif-1',
      name: 'Schuifdeur 2-vleugelig',
      description: 'Moderne schuifdeur voor grote openingen',
      image: '/images/schuifsystemen/schuifdeur.jpg',
      color: '#2d3436',
      features: ['Grote openingen', 'Vloergleiding', 'Energiezuinig'],
      price: '€1.200 - €2.500',
      category: 'schuifsystemen',
    },
  ],
  muskietennetten: [
    {
      id: 'muskiet-1',
      name: 'Vliegenraam Standaard',
      description: 'Inzetbaar vliegenraam voor ramen en deuren',
      image: '/images/muskietennetten/vliegenraam.jpg',
      color: '#ffffff',
      features: ['Fijnmazig gaas', 'Eenvoudig te monteren', 'Verstelbaar'],
      price: '€80 - €150',
      category: 'muskietennetten',
    },
  ],
  zonwering: [
    {
      id: 'zonwering-1',
      name: 'Buitenzonwering',
      description: 'Automatische buitenzonwering met wind- en zonsensor',
      image: '/images/zonwering/buitenzonwering.jpg',
      color: '#4a4a4a',
      features: ['Automatisch', 'Wind- en zonsensor', 'Afstandsbediening'],
      price: '€400 - €800',
      category: 'zonwering',
    },
    {
      id: 'zonwering-2',
      name: 'Rolluik',
      description: 'Elektrisch rolluik met isolerende werking',
      image: '/images/zonwering/rolluik.jpg',
      color: '#2d3436',
      features: ['Elektrisch', 'Inbraakwerend', 'Isolerend'],
      price: '€300 - €600',
      category: 'zonwering',
    },
  ],
  garagepoorten: [
    {
      id: 'garage-1',
      name: 'Sectiepoort',
      description: 'Automatische sectiepoort voor garage',
      image: '/images/garagepoorten/sectiepoort.jpg',
      color: '#2d3436',
      features: ['Automatisch', 'Ruimtebesparend', 'Weerbestendig'],
      price: '€1.200 - €2.500',
      category: 'garagepoorten',
    },
    {
      id: 'garage-2',
      name: 'Kantelpoort',
      description: 'Klassieke kantelpoort met automatische bediening',
      image: '/images/garagepoorten/kantelpoort.jpg',
      color: '#4a4a4a',
      features: ['Automatisch', 'Robuust', 'Onderhoudsvriendelijk'],
      price: '€1.000 - €2.000',
      category: 'garagepoorten',
    },
  ],
  hekwerken: [
    {
      id: 'hek-1',
      name: 'Aluminium Hekwerk',
      description: 'Modern aluminium hekwerk met poort',
      image: '/images/hekwerken/aluminium-hek.jpg',
      color: '#4a4a4a',
      features: ['Onderhoudsvrij', 'Weerbestendig', 'Op maat'],
      price: '€150 - €300 per meter',
      category: 'hekwerken',
    },
  ],
  pergolas: [
    {
      id: 'pergola-1',
      name: 'Aluminium Pergola',
      description: 'Moderne pergola met verstelbare lamellen',
      image: '/images/pergolas/aluminium-pergola.jpg',
      color: '#4a4a4a',
      features: ['Verstelbare lamellen', 'Onderhoudsvrij', 'Op maat'],
      price: '€2.500 - €5.000',
      category: 'pergolas',
    },
  ],
};

export const ALUPLAST_COLORS: ColorOption[] = [
  // Aludec (Aluminium look) - Metallic afwerking
  { id: 'aludec-db703', name: 'Aludec DB 703', hex: '#4a4a4a', texture: 'metallic', category: 'aludec' },
  { id: 'aludec-anthracite', name: 'Aludec Antraciet', hex: '#383e42', texture: 'metallic', category: 'aludec' },
  { id: 'aludec-basalt', name: 'Aludec Basaltgrijs', hex: '#5b5e61', texture: 'metallic', category: 'aludec' },
  { id: 'aludec-quartz-grey', name: 'Aludec Quartz Grey', hex: '#6b6d70', texture: 'metallic', category: 'aludec' },
  { id: 'aludec-brushed-aluminum', name: 'Brushed Aluminum', hex: '#c0c0c0', texture: 'metallic', category: 'aludec' },
  { id: 'mattex-traffic-white', name: 'Mattex Traffic White (Aludec)', hex: '#f5f5f5', texture: 'metallic', category: 'aludec' },
  { id: 'mattex-window-grey', name: 'Mattex Window Grey (Aludec)', hex: '#7d8083', texture: 'metallic', category: 'aludec' },

  // Woodec (Realistische houtstructuur)
  { id: 'woodec-oak-turner-malt', name: 'Turner Oak Malt', hex: '#d4bfaa', texture: 'wood', category: 'woodec' },
  { id: 'woodec-oak-sheffield-alpine', name: 'Sheffield Oak Alpine', hex: '#a69f96', texture: 'wood', category: 'woodec' },
  { id: 'woodec-oak-sheffield-concrete', name: 'Sheffield Oak Concrete', hex: '#9a938a', texture: 'wood', category: 'woodec' },
  { id: 'woodec-oak-turner-toffee', name: 'Turner Oak Toffee', hex: '#b8956a', texture: 'wood', category: 'woodec' },
  { id: 'woodec-oak-turner-walnut', name: 'Turner Oak Walnut', hex: '#5d4037', texture: 'wood', category: 'woodec' },
  { id: 'woodec-oak-turner-amber', name: 'Turner Oak Amber', hex: '#d4a574', texture: 'wood', category: 'woodec' },
  { id: 'woodec-golden-oak', name: 'Golden Oak', hex: '#8f6c3e', texture: 'wood', category: 'woodec' },
  { id: 'woodec-walnut', name: 'Walnut', hex: '#5d4037', texture: 'wood', category: 'woodec' },
  { id: 'woodec-dark-green', name: 'Dark Green Woodgrain', hex: '#2d4a2d', texture: 'wood', category: 'woodec' },
  { id: 'woodec-dark-graphite', name: 'Dark Graphite Woodgrain', hex: '#3a3a3a', texture: 'wood', category: 'woodec' },

  // Standaard RAL kleuren
  { id: 'std-anthracite', name: 'Antraciet Grijs (RAL 7016)', hex: '#37424a', texture: 'matte', category: 'standard' },
  { id: 'std-black', name: 'Diepzwart (RAL 9005)', hex: '#1a1a1a', texture: 'matte', category: 'standard' },
  { id: 'std-white', name: 'Verkeerswit (RAL 9016)', hex: '#fdfdfd', texture: 'matte', category: 'standard' },
  { id: 'std-creme', name: 'Cremewit (RAL 9001)', hex: '#f0ece0', texture: 'matte', category: 'standard' },
  { id: 'std-grey', name: 'Grijs (RAL 7035)', hex: '#9e9e9e', texture: 'matte', category: 'standard' },
  { id: 'std-light-grey', name: 'Lichtgrijs (RAL 7035)', hex: '#c4c4c4', texture: 'matte', category: 'standard' },
  { id: 'std-dark-grey', name: 'Donkergrijs (RAL 7024)', hex: '#474a50', texture: 'matte', category: 'standard' },
  { id: 'std-brown', name: 'Bruin (RAL 8017)', hex: '#4a3728', texture: 'matte', category: 'standard' },
  { id: 'std-beige', name: 'Beige (RAL 1015)', hex: '#d6b87a', texture: 'matte', category: 'standard' },
  { id: 'std-ivory', name: 'Ivoorwit (RAL 1014)', hex: '#e6d2b8', texture: 'matte', category: 'standard' },
];
