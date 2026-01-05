import {
  Hammer,
  Ruler,
  Maximize2,
  ThermometerSun,
  PaintBucket,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { ServiceItem, StepItem, BenefitItem, NavItem } from './types';

export const COMPANY_NAME = 'Yannova';
export const COMPANY_TAGLINE = 'Ramen en Deuren, Renovatie, Isolatie & Crepi in Zoersel, Antwerpen, Mechelen';

// Werkgebieden voor lokale SEO
export const SERVICE_AREAS = [
  'Antwerpen', 'Keerbergen', 'Mechelen', 'Zoersel', 'Putte', 'Heist-op-den-Berg',
  'Bonheiden', 'Tremelo', 'Haacht', 'Lier', 'Nijlen', 'Ranst',
  'Zandhoven', 'Malle', 'Schilde', 'Wijnegem', 'Wommelgem',
  'Boechout', 'Lint', 'Duffel', 'Berlaar'
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Onze Diensten', href: '/diensten' },
  { label: 'Werkregio', href: '/#werkgebied' },
  { label: '3D Showroom (in opbouw)', href: '/showroom' },
  { label: 'Projecten', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

// Admin tools - alleen zichtbaar voor admins
export const ADMIN_TOOLS: NavItem[] = [
  { label: 'Pagina Beheer', href: '/admin/pages' },
  { label: 'SEO Dashboard', href: '/seo' },
  { label: 'Jules AI', href: '/jules' },
  { label: 'Admin Panel', href: '/admin' },
];

// Admin emails
export const ALLOWED_ADMIN_EMAILS = [
  'innovar.labs7@gmail.com',
  'windowpro.be@gmail.com',
  'info@yannova.be',
  'roustamyandiev00@gmail.com',
  'aimeester777@gmail.com'
];

export const HERO_CONTENT = {
  title: 'Ramen, Deuren, Renovatie & Crepi — met zorg voor uw thuis',
  subtitle: 'We luisteren naar uw plannen, denken mee en zorgen voor een nette uitvoering. Actief in Zoersel, Antwerpen, Mechelen en omgeving.',
  cta: 'Vraag uw vrijblijvende offerte aan',
  image: '/images/c67c2ffe-a42b-477f-a67d-10100999c4f0.png',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ramen-deuren',
    title: 'Ramen en Deuren',
    description:
      'Hoogwaardige PVC en aluminium profielen. Isolerend, duurzaam en onderhoudsvriendelijk voor maximale energiebesparing.',
    image: '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.png',
    icon: Maximize2,
  },
  {
    id: 'renovatie',
    title: 'Renovatie',
    description:
      'Totaalrenovaties van ruwbouw tot afwerking. Wij zijn uw enige aanspreekpunt voor een zorgeloos traject.',
    image: '/images/16676485-bd4d-49a4-a5a6-89e07254fa23.png',
    icon: Hammer,
  },
  {
    id: 'isolatie',
    title: 'Isolatiewerken',
    description:
      'Dak-, muur- en gevelisolatie. Verlaag uw energiekosten en verhoog uw wooncomfort direct.',
    image: '/images/downloads/isolatie-1.jpg',
    icon: ThermometerSun,
  },
  {
    id: 'crepi',
    title: 'Crepi Gevelafwerking',
    description:
      'Strakke en duurzame gevelafwerking die uw woning beschermt en verfraait. Ideaal voor nieuwbouw en renovatie.',
    image: '/images/downloads/crepi-1.jpg',
    icon: PaintBucket,
  },
];


export const APPROACH_STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Intake & Opmeting',
    description: 'We komen ter plaatse voor een nauwkeurige opmeting en luisteren naar uw wensen.',
    icon: Ruler,
  },
  {
    id: 2,
    title: 'Advies op Maat',
    description: 'U ontvangt een duidelijk plan en een transparante offerte zonder verrassingen.',
    icon: MessageSquare,
  },
  {
    id: 3,
    title: 'Vakkundige Uitvoering',
    description: 'Onze ervaren vakmensen voeren de werken uit met oog voor detail en precisie.',
    icon: Hammer,
  },
  {
    id: 4,
    title: 'Nette Oplevering',
    description: 'We leveren alles proper op en controleren samen met u het eindresultaat.',
    icon: CheckCircle2,
  },
];

export const WHY_US_BENEFITS: BenefitItem[] = [
  { id: 'xp', text: 'Jarenlange ervaring in de bouwsector' },
  { id: 'agree', text: 'Correcte afspraken & planning' },
  { id: 'mat', text: 'Gebruik van duurzame, hoogwaardige materialen' },
  { id: 'fin', text: 'Propere afwerking en nette werf' },
  { id: 'reg', text: 'Actief in heel België' },
  { id: 'personal', text: 'Persoonlijke aanpak en één aanspreekpunt' },
];

import { Project, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Gevelrenovatie Villa Brasschaat',
    description: 'Volledige gevelrenovatie met crepi afwerking en nieuwe isolatie. De woning kreeg een moderne uitstraling met behoud van het oorspronkelijke karakter.',
    type: 'gevelwerken',
    images: [
      '/images/downloads/crepi-1.jpg',
      '/images/downloads/crepi-2.jpg',
    ],
    completedDate: '2024-09',
    location: 'Brasschaat',
  },
  {
    id: 'project-2',
    title: 'Totaalrenovatie Rijwoning Antwerpen',
    description: 'Complete renovatie van een rijwoning inclusief nieuwe ramen, isolatie en gevelwerken. Van ruwbouw tot afwerking in één traject.',
    type: 'renovatie',
    images: [
      '/images/16676485-bd4d-49a4-a5a6-89e07254fa23.png',
    ],
    completedDate: '2024-07',
    location: 'Antwerpen',
  },
  {
    id: 'project-3',
    title: 'Gevelisolatie Appartement Gent',
    description: 'Buitengevelisolatie met EPS en crepi afwerking. Energiebesparing van meer dan 30% gerealiseerd.',
    type: 'isolatie',
    images: [
      '/images/downloads/isolatie-1.jpg',
      '/images/downloads/isolatie-2.jpg',
      '/images/downloads/isolatie-3.jpg',
    ],
    completedDate: '2024-05',
    location: 'Gent',
  },
  {
    id: 'project-4',
    title: 'Ramen en Deuren Nieuwbouw Mechelen',
    description: 'Plaatsing van hoogwaardige PVC ramen en deuren met drievoudige beglazing voor optimale isolatie.',
    type: 'ramen-deuren',
    images: [
      '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.png',
    ],
    completedDate: '2024-03',
    location: 'Mechelen',
  },
  {
    id: 'project-5',
    title: 'Crepi Renovatie Woning Leuven',
    description: 'Vernieuwing van bestaande crepi met moderne structuur en kleur. Inclusief vochtbehandeling.',
    type: 'gevelwerken',
    images: [
      '/images/downloads/crepi-3.jpg',
    ],
    completedDate: '2024-01',
    location: 'Leuven',
  },
  {
    id: 'project-recent-auto',
    title: 'Recente Realisaties',
    description: 'Een selectie van onze meest recente projecten in de regio, waaronder diverse gevelrenovaties en isolatiewerken.',
    type: 'renovatie',
    images: [
      "/images/foto's/Gemini_Generated_Image_12huit12huit12hu.png",
      "/images/foto's/Gemini_Generated_Image_16tc0t16tc0t16tc.png",
      "/images/foto's/Gemini_Generated_Image_4f1lyg4f1lyg4f1l.png",
      "/images/foto's/Gemini_Generated_Image_4jf3fd4jf3fd4jf3.png",
      "/images/foto's/Gemini_Generated_Image_4xh3am4xh3am4xh3.png",
      "/images/foto's/Gemini_Generated_Image_73yqjc73yqjc73yq.png",
      "/images/foto's/Gemini_Generated_Image_7stbs27stbs27stb.png",
      "/images/foto's/Gemini_Generated_Image_a0290xa0290xa029.png",
      "/images/foto's/Gemini_Generated_Image_bf8tm8bf8tm8bf8t.png",
      "/images/foto's/Gemini_Generated_Image_evuy78evuy78evuy.png",
      "/images/foto's/Gemini_Generated_Image_gv2xcygv2xcygv2x.png",
      "/images/foto's/Gemini_Generated_Image_m9y450m9y450m9y4.png",
      "/images/foto's/Gemini_Generated_Image_n7s3q7n7s3q7n7s3.png",
      "/images/foto's/Gemini_Generated_Image_pqrnmbpqrnmbpqrn.png",
      "/images/foto's/Gemini_Generated_Image_tn45ittn45ittn45.png"
    ],
    completedDate: '2024-01',
    location: 'Diverse Locaties',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    customerName: 'Jan Peeters',
    projectType: 'Gevelrenovatie',
    reviewText: 'Uitstekende service van begin tot eind. Het team van Yannova heeft onze gevel volledig getransformeerd. Zeer tevreden met het resultaat en de communicatie was top!',
    rating: 5,
    date: '2024-10',
  },
  {
    id: 'testimonial-2',
    customerName: 'Marie Dubois',
    projectType: 'Ramen en Deuren',
    reviewText: 'Professionele plaatsing van onze nieuwe ramen. Het verschil in isolatie is direct merkbaar. Aanrader voor iedereen die kwaliteit zoekt.',
    rating: 5,
    date: '2024-08',
  },
  {
    id: 'testimonial-3',
    customerName: 'Peter Janssens',
    projectType: 'Totaalrenovatie',
    reviewText: 'Yannova heeft onze volledige renovatie begeleid. Één aanspreekpunt voor alles, dat maakte het zo makkelijk. Het eindresultaat overtreft onze verwachtingen.',
    rating: 5,
    date: '2024-06',
  },
  {
    id: 'testimonial-4',
    customerName: 'Sophie Van den Berg',
    projectType: 'Isolatie',
    reviewText: 'Dankzij de gevelisolatie van Yannova is onze energiefactuur flink gedaald. Vakkundig werk en netjes opgeleverd.',
    rating: 4,
    date: '2024-04',
  },
];
