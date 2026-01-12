import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LazyImage from '../components/ui/LazyImage';

interface ProjectDetailData {
  id: string;
  title: string;
  location: string;
  completionDate: string;
  duration: string;
  challenge: string;
  solution: string;
  result: string;
  beforeImage: string;
  afterImage: string;
  galleryImages: string[];
  category: string;
  energyLabel?: {
    before: string;
    after: string;
    savings: string;
    annualSavings: string;
  };
  technicalDetails: {
    materials: string[];
    techniques: string[];
    certifications: string[];
  };
  clientTestimonial?: {
    name: string;
    text: string;
    rating: number;
  };
}

// Mock data - in real app this would come from API/CMS
const PROJECT_DETAILS: Record<string, ProjectDetailData> = {
  'totaalrenovatie-keerbergen': {
    id: 'totaalrenovatie-keerbergen',
    title: 'Totaalrenovatie Rijwoning Keerbergen',
    location: 'Keerbergen',
    completionDate: 'September 2024',
    duration: '6 weken',
    challenge: 'Deze rijwoning uit 1960 had een EPC-label F en hoge energiekosten van €2.400 per jaar. De eigenaren kampten met vochtproblemen in de gevel, tocht door oude ramen en een verouderde voordeur zonder inbraakbeveiliging.',
    solution: 'We hebben een complete gevelrenovatie uitgevoerd met 12cm EPS isolatie, gevolgd door een moderne crepi afwerking. Alle ramen werden vervangen door hoogwaardige aluminium ramen met HR+++ glas. De voordeur werd vervangen door een veilige aluminium deur met meerpuntsluiting.',
    result: 'Het EPC-label verbeterde van F naar B. De energiekosten daalden met 40% naar €1.440 per jaar. De woning kreeg een moderne uitstraling en de waarde steeg aanzienlijk.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_4f1lyg4f1lyg4f1l.jpg",
    afterImage: "/images/foto's/Gemini_Generated_Image_12huit12huit12hu.jpg",
    galleryImages: [
      "/images/foto's/Gemini_Generated_Image_16tc0t16tc0t16tc.jpg",
      "/images/foto's/Gemini_Generated_Image_4jf3fd4jf3fd4jf3.jpg",
      "/images/foto's/Gemini_Generated_Image_4xh3am4xh3am4xh3.jpg",
      '/images/downloads/crepi-2.jpg'
    ],
    category: 'Totaalrenovatie',
    energyLabel: {
      before: 'F',
      after: 'B',
      savings: '40%',
      annualSavings: '€960 per jaar'
    },
    technicalDetails: {
      materials: [
        '12cm EPS isolatieplaten',
        'Siliconen crepi afwerking',
        'Aluminium ramen met HR+++ glas',
        'Aluminium voordeur met meerpuntsluiting'
      ],
      techniques: [
        'Volledige gevelisolatie systeem',
        'Professionele crepi applicatie',
        'Precisie raamplaatsing',
        'Luchtdichte afwerking'
      ],
      certifications: [
        'EPB-verslaggever gecertificeerd',
        'Kwaliteitslabel Gevelisolatie',
        'CE-markering materialen'
      ]
    },
    clientTestimonial: {
      name: 'Familie Janssens',
      text: 'Yannova heeft ons huis getransformeerd. Niet alleen ziet het er prachtig uit, maar onze energiefactuur is drastisch gedaald. Het team was professioneel en hield zich perfect aan de planning.',
      rating: 5
    }
  },
  'gevelrenovatie-mechelen': {
    id: 'gevelrenovatie-mechelen',
    title: 'Gevelrenovatie Villa Mechelen',
    location: 'Mechelen',
    completionDate: 'Juli 2024',
    duration: '4 weken',
    challenge: 'Vochtinfiltratie door beschadigde gevel, verouderde isolatie en energieverlies. De villa had dringend een opknapbeurt nodig.',
    solution: 'Volledige gevelrenovatie met nieuwe isolatie, vochtbestrijding en moderne crepi afwerking met decoratieve accenten.',
    result: '30% energiebesparing, geen vochtproblemen meer en een moderne uitstraling die de woningwaarde verhoogde.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_73yqjc73yqjc73yq.jpg",
    afterImage: '/images/downloads/crepi-1.jpg',
    galleryImages: [
      '/images/downloads/crepi-2.jpg',
      '/images/downloads/crepi-3.jpg',
      "/images/foto's/Gemini_Generated_Image_7stbs27stbs27stb.jpg",
      "/images/foto's/Gemini_Generated_Image_a0290xa0290xa029.jpg"
    ],
    category: 'Gevelrenovatie',
    energyLabel: {
      before: 'E',
      after: 'C',
      savings: '30%',
      annualSavings: '€720 per jaar'
    },
    technicalDetails: {
      materials: [
        '10cm EPS isolatieplaten',
        'Silikaatpleister afwerking',
        'Vochtwerend membraan',
        'Decoratieve profielen'
      ],
      techniques: [
        'Vochtbehandeling gevel',
        'Buitengevelisolatie',
        'Crepi spuittechniek',
        'Detailafwerking ramen'
      ],
      certifications: [
        'ATG-certificaat isolatie',
        'Kwaliteitslabel Gevelwerken'
      ]
    },
    clientTestimonial: {
      name: 'Peter Van den Berg',
      text: 'Eindelijk geen vochtproblemen meer! De gevel ziet er fantastisch uit en we merken direct het verschil in comfort.',
      rating: 5
    }
  },
  'ramen-deuren-zoersel': {
    id: 'ramen-deuren-zoersel',
    title: 'Ramen & Deuren Vervanging Zoersel',
    location: 'Zoersel',
    completionDate: 'Mei 2024',
    duration: '2 weken',
    challenge: 'Oude houten ramen met enkele beglazing, tocht en hoge energiekosten. De bewoners hadden last van geluidsoverlast en koude tocht.',
    solution: 'Vervanging door hoogwaardige PVC ramen met HR+++ glas en nieuwe aluminium voordeur met inbraakbeveiliging.',
    result: 'Drastische vermindering van geluidshinder, geen tocht meer en 25% lagere verwarmingskosten.',
    beforeImage: "/images/foto's/Gemini_Generated_Image_bf8tm8bf8tm8bf8t.jpg",
    afterImage: '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.jpg',
    galleryImages: [
      "/images/foto's/Gemini_Generated_Image_evuy78evuy78evuy.jpg",
      "/images/foto's/Gemini_Generated_Image_gv2xcygv2xcygv2x.jpg",
      "/images/foto's/Gemini_Generated_Image_m9y450m9y450m9y4.jpg",
      "/images/foto's/Gemini_Generated_Image_n7s3q7n7s3q7n7s3.jpg"
    ],
    category: 'Ramen & Deuren',
    technicalDetails: {
      materials: [
        'PVC profielen 5-kamer systeem',
        'HR+++ drievoudige beglazing',
        'Aluminium voordeur',
        'Meerpuntsluiting RC2'
      ],
      techniques: [
        'Precisie opmeting',
        'Luchtdichte montage',
        'Professionele afkitting',
        'Ventilatieroosters integratie'
      ],
      certifications: [
        'CE-markering ramen',
        'SKG*** veiligheidscertificaat',
        'Uw-waarde 0.8 W/m²K'
      ]
    },
    clientTestimonial: {
      name: 'Marie Dubois',
      text: 'Het verschil is dag en nacht! Geen tocht meer, veel stiller en de ramen zien er prachtig uit. Zeer tevreden met de service.',
      rating: 5
    }
  }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const project = id ? PROJECT_DETAILS[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project niet gevonden</h1>
          <Link to="/projecten" className="text-brand-accent hover:underline">
            Terug naar projecten
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Before/After Slider */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage 
            src={project.afterImage} 
            alt={project.title}
            className="w-full h-full opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/projecten" className="text-orange-300 hover:text-orange-200">
                ← Terug naar projecten
              </Link>
              <span className="bg-brand-accent px-3 py-1 rounded-full text-sm font-semibold">
                {project.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-gray-300">Voltooid:</span> {project.completionDate}
              </div>
              <div>
                <span className="text-gray-300">Duur:</span> {project.duration}
              </div>
              <div>
                <span className="text-gray-300">Categorie:</span> {project.category}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-4">De Uitdaging</h2>
                <p className="text-gray-700 leading-relaxed">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Onze Oplossing</h2>
                <p className="text-gray-700 leading-relaxed">{project.solution}</p>
              </div>

              {/* Result */}
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">Het Resultaat</h2>
                <p className="text-gray-700 leading-relaxed">{project.result}</p>
              </div>

              {/* Technical Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-brand-dark mb-6">Technische Details</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Materialen</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {project.technicalDetails.materials.map((material, index) => (
                        <li key={index}>• {material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technieken</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {project.technicalDetails.techniques.map((technique, index) => (
                        <li key={index}>• {technique}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Certificeringen</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {project.technicalDetails.certifications.map((cert, index) => (
                        <li key={index}>• {cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Energy Label Card */}
              {project.energyLabel && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-4">Energieprestatie</h3>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {project.energyLabel.before} → {project.energyLabel.after}
                      </div>
                      <div className="text-sm text-green-700">EPC Label</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Energiebesparing:</span>
                      <span className="font-semibold">{project.energyLabel.savings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jaarlijkse besparing:</span>
                      <span className="font-semibold text-green-600">{project.energyLabel.annualSavings}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Client Testimonial */}
              {project.clientTestimonial && (
                <div className="bg-brand-light border border-orange-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-brand-dark mb-4">Klantervaring</h3>
                  
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < project.clientTestimonial!.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-3">
                    "{project.clientTestimonial.text}"
                  </blockquote>
                  
                  <div className="text-sm font-semibold text-brand-dark">
                    — {project.clientTestimonial.name}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-brand-accent rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-bold mb-3">Vergelijkbaar project?</h3>
                <p className="text-sm text-orange-100 mb-4">
                  Laat ons uw situatie bekijken en een oplossing op maat voorstellen.
                </p>
                <Link 
                  to="/contact"
                  className="inline-block bg-white text-brand-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Gratis advies aanvragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Projectfoto's</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group cursor-pointer" onClick={() => setSelectedImage(project.beforeImage)}>
              <LazyImage 
                src={project.beforeImage} 
                alt="Voor renovatie"
                className="w-full h-48 rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Voor</span>
              </div>
            </div>
            
            <div className="relative group cursor-pointer" onClick={() => setSelectedImage(project.afterImage)}>
              <LazyImage 
                src={project.afterImage} 
                alt="Na renovatie"
                className="w-full h-48 rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Na</span>
              </div>
            </div>
            
            {project.galleryImages.map((image, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => setSelectedImage(image)}>
                <LazyImage 
                  src={image} 
                  alt={`Project detail ${index + 1}`}
                  className="w-full h-48 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Project detail"
              className="max-w-full max-h-full object-contain"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;