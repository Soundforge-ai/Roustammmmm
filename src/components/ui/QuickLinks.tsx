import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks: React.FC = () => {
  const quickLinks = [
    {
      category: 'Populaire Pagina\'s',
      links: [
        { label: 'Budget Tool', href: '/budget-tool', icon: '🧮' },
        { label: 'Premie Gids 2026', href: '/verbouwpremie-gids', icon: '💰' },
        { label: 'Onze Projecten', href: '/projecten', icon: '📸' },
        { label: 'Onderhoudstips', href: '/posts/onderhoudstips', icon: '🔧' }
      ]
    },
    {
      category: 'Diensten',
      links: [
        { label: 'Ramen & Deuren', href: '/ramen-deuren', icon: '🪟' },
        { label: 'Gevelwerken', href: '/gevel', icon: '🏠' },
        { label: 'Renovatie', href: '/renovatie', icon: '🔨' },
        { label: 'Schilderwerken', href: '/schilderwerken', icon: '🎨' }
      ]
    },
    {
      category: 'Regio\'s',
      links: [
        { label: 'Gevelrenovatie Mechelen', href: '/gevelrenovatie-mechelen', icon: '📍' },
        { label: 'Ramen Keerbergen', href: '/ramen-en-deuren-keerbergen', icon: '📍' },
        { label: 'Crepi Werken Leuven', href: '/crepi-werken-leuven', icon: '📍' },
        { label: 'Alle Regio\'s', href: '/diensten#regio', icon: '🗺️' }
      ]
    }
  ];

  return (
    <section className="py-12 bg-gray-100 border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">
            Snelle Links
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {quickLinks.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-brand-dark mb-4 text-center">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href}
                        className="flex items-center gap-3 text-gray-700 hover:text-brand-accent transition-colors group"
                      >
                        <span className="text-lg group-hover:scale-110 transition-transform">
                          {link.icon}
                        </span>
                        <span className="text-sm font-medium">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-brand-light rounded-xl p-8 text-center border border-orange-200">
            <h3 className="text-xl font-bold text-brand-dark mb-4">
              Niet gevonden wat u zoekt?
            </h3>
            <p className="text-gray-600 mb-6">
              Neem direct contact op voor persoonlijk advies over uw project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-brand-accent text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Contact opnemen
              </Link>
              <a 
                href="tel:+32489960001"
                className="inline-flex items-center px-6 py-3 border-2 border-brand-accent text-brand-accent rounded-lg font-semibold hover:bg-brand-accent hover:text-white transition-colors"
              >
                📞 +32 489 96 00 01
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;