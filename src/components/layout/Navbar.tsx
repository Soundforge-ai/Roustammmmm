import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, CheckCircle2 } from 'lucide-react';
import { NAV_ITEMS, COMPANY_NAME, ADMIN_TOOLS, ALLOWED_ADMIN_EMAILS } from '../../constants';
import LanguageSwitcher from './LanguageSwitcher';
import { Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);

  const location = useLocation();
  const { user, isLoggedIn } = useAuth();
  const isHomePage = location.pathname === '/';

  // Logo drop animation on homepage load
  useEffect(() => {
    if (isHomePage) {
      // Start animation immediately
      requestAnimationFrame(() => {
        setLogoAnimated(true);
      });
    }
  }, [isHomePage]);

  // Check of de ingelogde gebruiker een admin is
  const isAdmin = isLoggedIn && user?.email && ALLOWED_ADMIN_EMAILS.includes(user.email);
  const servicesRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);



  // Throttle function implementation
  const throttle = <T extends (...args: any[]) => any>(func: T, delay: number): T => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    return ((...args: Parameters<T>) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    }) as T;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Throttle scroll events for better performance
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const textColor = 'text-gray-700';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-md ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="/images/logo-yannova-new-optimized.png"
            alt="Yannova Bouw Logo"
            loading="eager"
            fetchPriority="high"
            className={`w-auto rounded-lg transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'} ${isHomePage
                ? logoAnimated
                  ? 'translate-y-0 opacity-100 scale-100'
                  : '-translate-y-24 opacity-0 scale-[2]'
                : ''
              }`}
            style={{
              transitionTimingFunction: isHomePage && logoAnimated ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease',
              transformOrigin: 'center center'
            }}
          />
          <span className="text-xl font-bold tracking-tight text-brand-dark">
            {COMPANY_NAME}<span className="text-brand-accent">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href || (item.href.startsWith('/#') && location.pathname === '/');

            // Onze Diensten Dropdown
            if (item.label === 'Onze Diensten') {
              const isServicesActive = location.pathname.startsWith('/diensten') ||
                location.pathname === '/ramen-deuren' ||
                location.pathname === '/renovatie' ||
                location.pathname === '/tuinaanleg' ||
                location.pathname.startsWith('/gevel');

              return (
                <div
                  key={item.label}
                  className="relative flex items-center"
                  ref={servicesRef}
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setIsServicesOpen(true);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setIsServicesOpen(false);
                    }, 300);
                  }}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium hover:text-brand-accent transition-colors flex items-center gap-1 whitespace-nowrap px-2 py-1 rounded text-gray-700 ${isServicesActive ? 'text-brand-accent' : ''}`}
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Services Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 pt-2 w-64 transition-all duration-200 ease-out ${isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-2'}`}
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    role="menu"
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100]">
                      <Link
                        to="/ramen-deuren"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="font-semibold block">Ramen & Deuren</span>
                        <span className="text-xs text-gray-500">Leveren en plaatsen</span>
                      </Link>
                      <Link
                        to="/gevel"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="font-semibold block">Gevel & Isolatie</span>
                        <span className="text-xs text-gray-500">Crepi, steenstrips en isolatie</span>
                      </Link>
                      <Link
                        to="/renovatie"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="font-semibold block">Totaalrenovatie</span>
                        <span className="text-xs text-gray-500">Algemene werken en afbraak</span>
                      </Link>
                      <Link
                        to="/schilderwerken" // TODO: Create page
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="font-semibold block">Schilderwerken</span>
                        <span className="text-xs text-gray-500">Binnen en buiten</span>
                      </Link>
                      <Link
                        to="/tuinaanleg"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors rounded-b-lg"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="font-semibold block">Tuinaanleg</span>
                        <span className="text-xs text-gray-500">Tuin en oprit</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            // Werkregio Dropdown
            if (item.label === 'Werkregio') {
              return (
                <div
                  key={item.label}
                  className="relative flex items-center"
                  ref={regionRef}
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setIsRegionOpen(true);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setIsRegionOpen(false);
                    }, 300);
                  }}
                >
                  <a
                    href={item.href}
                    className={`text-sm font-medium hover:text-brand-accent transition-colors flex items-center gap-1 whitespace-nowrap px-2 py-1 rounded text-gray-700`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegionOpen(!isRegionOpen);
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isRegionOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </a>

                  {/* Region Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 pt-2 w-48 transition-all duration-200 ease-out ${isRegionOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-2'}`}
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={() => setIsRegionOpen(false)}
                    role="menu"
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100]">
                      <Link
                        to="/regio/zoersel"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsRegionOpen(false)}
                      >
                        Zoersel
                      </Link>
                      <Link
                        to="/regio/antwerpen"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsRegionOpen(false)}
                      >
                        Antwerpen
                      </Link>
                      <Link
                        to="/regio/mechelen"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsRegionOpen(false)}
                      >
                        Mechelen
                      </Link>
                      <Link
                        to="/regio/putte"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                        onClick={() => setIsRegionOpen(false)}
                      >
                        Putte
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            // Handle Hash links
            if (item.href.startsWith('/#')) {
              // If we are on home page, render as normal anchor to #id for smooth scroll (handled by browser or css)
              if (isHomePage) {
                const anchorId = item.href.replace(/^\//, ''); // Remove leading /
                return (
                  <a
                    key={item.label}
                    href={anchorId}
                    className={`text-sm font-medium hover:text-brand-accent transition-colors whitespace-nowrap px-2 py-1 flex items-center ${textColor}`}
                  >
                    {item.label}
                  </a>
                );
              } else {
                // If not on home page, use Link to go to /#id
                return (
                  <Link
                    to={item.href}
                    className="px-2 py-1 text-sm text-gray-700 hover:text-brand-accent font-medium whitespace-nowrap transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
            }

            // Normal links
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium hover:text-brand-accent transition-colors whitespace-nowrap px-2 py-1 flex items-center ${textColor} ${isActive ? 'text-brand-accent' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
          <LanguageSwitcher />

          {/* Admin Tools Dropdown - alleen zichtbaar voor admins */}
          {isAdmin && (
            <div
              className="relative"
              onMouseEnter={() => setIsAdminOpen(true)}
              onMouseLeave={() => setIsAdminOpen(false)}
            >
              <button
                className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700`}
                aria-label="Admin Tools"
              >
                <Settings size={18} />
              </button>
              <div
                className={`absolute top-full right-0 pt-2 w-48 transition-all duration-200 ${isAdminOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
              >
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  {ADMIN_TOOLS.map((tool) => (
                    <Link
                      key={tool.href}
                      to={tool.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                      onClick={() => setIsAdminOpen(false)}
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick contact buttons */}
          <a
            href="tel:+32489960001"
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border text-gray-700 border-gray-200 hover:bg-gray-50`}
            aria-label="Bel ons"
          >
            <Phone size={14} /> Bel
          </a>
          <Link
            to="/contact"
            className="bg-brand-accent hover:bg-orange-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            Offerte
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-md p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
        >
          {isOpen ? (
            <X className="text-gray-900" />
          ) : (
            <Menu className="text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {
        isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-gray-100 max-h-[80vh] overflow-y-auto"
            role="navigation"
            aria-label="Mobiel menu"
          >
            <div className="flex flex-col py-4">
              {NAV_ITEMS.map((item) => {
                if (item.label === 'Onze Diensten') {
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between px-6 py-3">
                        <Link
                          to={item.href}
                          className="font-medium text-gray-700 hover:text-brand-accent"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="p-2 focus:outline-none"
                        >
                          <ChevronDown size={16} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isServicesOpen && (
                        <div className="bg-gray-50 py-2">
                          <Link to="/ramen-deuren" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}>Ramen & Deuren</Link>
                          <Link to="/gevel" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}>Gevel & Isolatie</Link>
                          <Link to="/renovatie" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}>Totaalrenovatie</Link>
                          <Link to="/schilderwerken" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}>Schilderwerken</Link>
                          <Link to="/tuinaanleg" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}>Tuinaanleg</Link>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.label === 'Werkregio') {
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between px-6 py-3">
                        <span className="font-medium text-gray-700">
                          {item.label}
                        </span>
                        <button
                          onClick={() => setIsRegionOpen(!isRegionOpen)}
                          className="p-2 focus:outline-none"
                        >
                          <ChevronDown size={16} className={`transition-transform ${isRegionOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isRegionOpen && (
                        <div className="bg-gray-50 py-2">
                          <Link to="/regio/zoersel" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsRegionOpen(false); }}>Zoersel</Link>
                          <Link to="/regio/antwerpen" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsRegionOpen(false); }}>Antwerpen</Link>
                          <Link to="/regio/mechelen" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsRegionOpen(false); }}>Mechelen</Link>
                          <Link to="/regio/putte" className="block px-10 py-2 text-sm text-gray-600 hover:text-brand-accent" onClick={() => { setIsOpen(false); setIsRegionOpen(false); }}>Putte</Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-accent font-medium block transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="mx-6 mt-4 bg-brand-accent hover:bg-orange-700 text-white px-6 py-3 rounded-md font-semibold text-center block transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Offerte Aanvragen
              </Link>
              <div className="px-6 pt-4 border-t border-gray-100 mt-4">
                <LanguageSwitcher variant="compact" />
              </div>
            </div>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
