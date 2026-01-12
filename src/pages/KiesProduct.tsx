import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Maximize2, 
  Home, 
  Hammer, 
  PaintBucket, 
  TreePine,
  Boxes
} from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  image: string;
  featured?: boolean;
}

const KiesProduct: React.FC = () => {
  const { t } = useI18n();
  
  const productCategories: ProductCategory[] = [
    {
      id: 'ramen-deuren',
      title: 'Ramen en Deuren',
      description: 'PVC en Aluminium ramen en deuren',
      href: '/ramen-deuren',
      icon: Maximize2,
      image: '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.jpg',
      featured: true,
    },
    {
      id: 'voordeuren',
      title: 'Voordeuren',
      description: 'Bekijk onze voordeuren in 3D',
      href: '/showroom',
      icon: Home,
      image: '/images/c67c2ffe-a42b-477f-a67d-10100999c4f0.jpg',
      featured: true,
    },
    {
      id: 'gevelwerken',
      title: 'Gevelwerken',
      description: 'Crepi, isolatie en gevelrenovatie',
      href: '/gevel',
      icon: PaintBucket,
      image: '/images/downloads/crepi-1.jpg',
    },
    {
      id: 'renovatie',
      title: 'Renovatie',
      description: 'Totaalrenovaties en badkamers',
      href: '/renovatie',
      icon: Hammer,
      image: '/images/16676485-bd4d-49a4-a5a6-89e07254fa23.jpg',
    },
    {
      id: 'tuinaanleg',
      title: 'Tuinaanleg',
      description: 'Tuinontwerp en opritten',
      href: '/tuinaanleg',
      icon: TreePine,
      image: '/images/downloads/isolatie-1.jpg',
    },
    {
      id: 'isolatie',
      title: 'Isolatiewerken',
      description: 'Dak-, muur- en gevelisolatie',
      href: '/gevel/gevelisolatie',
      icon: Boxes,
      image: '/images/downloads/isolatie-1.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('productSelect.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {t('productSelect.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {productCategories.map((product) => {
                const IconComponent = product.icon;
                return (
                  <Link
                    key={product.id}
                    to={product.href}
                    className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComponent size={64} className="text-gray-400" />
                        </div>
                      )}
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 left-4 bg-brand-accent text-white p-3 rounded-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center text-brand-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t('productSelect.viewMore')}
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-2 right-2 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                        {t('productSelect.popular')}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('productSelect.cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('productSelect.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                {t('productSelect.cta.contact')}
              </Link>
              <Link
                to="/aanpak"
                className="bg-white hover:bg-gray-50 text-brand-dark border-2 border-brand-dark px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                {t('productSelect.cta.approach')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KiesProduct;

