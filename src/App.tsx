import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { I18nProvider } from './contexts/I18nContext';
import { AuthProvider } from './contexts/AuthContext';
import { Lead } from './types';
import { TESTIMONIALS } from './constants';

// Lazy load components
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Services = lazy(() => import('./components/sections/Services'));
const Approach = lazy(() => import('./components/sections/Approach'));
const WhyUs = lazy(() => import('./components/sections/WhyUs'));
const TestimonialsCarousel = lazy(() => import('./components/sections/TestimonialsCarousel'));
const QuoteCalculator = lazy(() => import('./components/sections/QuoteCalculator'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const NotFound = lazy(() => import('./components/layout/NotFound'));

// Lazy load pages
const OverOns = lazy(() => import('./pages/OverOns'));
const Diensten = lazy(() => import('./pages/Diensten'));
const CrepiInfoPage = lazy(() => import('./pages/CrepiInfo'));
const Aanpak = lazy(() => import('./pages/Aanpak'));
const Partners = lazy(() => import('./pages/Partners'));
const Contact = lazy(() => import('./pages/Contact'));
const Posts = lazy(() => import('./pages/Posts'));
const Post = lazy(() => import('./pages/Post'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Showroom = lazy(() => import('./components/features/Showroom'));

// Lazy load gevel pages
const Gevel = lazy(() => import('./components/features/Gevel'));
const Gevelbepleistering = lazy(() => import('./components/features/gevel/Gevelbepleistering'));
const Gevelbescherming = lazy(() => import('./components/features/gevel/Gevelbescherming'));
const Gevelisolatie = lazy(() => import('./components/features/gevel/Gevelisolatie'));
const Steenstrips = lazy(() => import('./components/features/gevel/Steenstrips'));
const Gevelrenovatie = lazy(() => import('./components/features/gevel/Gevelrenovatie'));

// Nieuwe hoofdpagina's
// Nieuwe hoofdpagina's
const RamenDeuren = lazy(() => import('./pages/RamenDeuren'));
const Tuinaanleg = lazy(() => import('./pages/Tuinaanleg'));
const Renovatie = lazy(() => import('./pages/Renovatie'));
const KiesProduct = lazy(() => import('./pages/KiesProduct'));
const Schilderwerken = lazy(() => import('./pages/Schilderwerken'));
const RegioPage = lazy(() => import('./pages/Regio'));

// Lazy load dashboard pages
const EditorPage = lazy(() => import('./pages/dashboard/editor/EditorPageWrapper'));
const SiteView = lazy(() => import('./pages/SiteView'));
const DynamicPageRenderer = lazy(() => import('./components/features/DynamicPageRenderer'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const SEODashboardPage = lazy(() => import('./pages/SEODashboard'));
const SEORankingMonitor = lazy(() => import('./components/seo/SEORankingMonitor'));
const PageManagerPage = lazy(() => import('./pages/admin/PageManagerPage'));

const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-light">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Laden...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleUpdateStatus = async (id: string, newStatus: Lead['status']) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const handleDeleteLead = async (id: string) => {
    setLeads((currentLeads) => currentLeads.filter((lead) => lead.id !== id));
  };

  // Admin route component wrapper
  const AdminRoute: React.FC = () => (
    <AdminDashboard leads={leads} onUpdateStatus={handleUpdateStatus} onDeleteLead={handleDeleteLead} onLogout={() => window.location.href = '/'} />
  );

  if (view === 'admin') {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminDashboard leads={leads} onUpdateStatus={handleUpdateStatus} onDeleteLead={handleDeleteLead} onLogout={() => setView('public')} />
      </Suspense>
    );
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <I18nProvider>
          <Router>
            <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-200 selection:text-orange-900">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Admin Route - Direct URL access */}
                  <Route
                    path="/admin"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <AdminRoute />
                      </Suspense>
                    }
                  />

                  {/* Admin Pages Route */}
                  <Route
                    path="/admin/pages"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PageManagerPage />
                      </Suspense>
                    }
                  />

                  {/* Home */}
                  <Route
                    path="/"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Ramen, Deuren & Renovatie Antwerpen - Yannova Bouw',
                          description: 'Specialist in ramen, deuren en totaalrenovaties in regio Antwerpen & Zoersel. Vraag uw gratis offerte in 2 min. 15+ jaar ervaring.',
                          keywords: 'Yannova, Yannova Bouw, ramen en deuren Keerbergen, ramen en deuren Mechelen, ramen en deuren Zoersel, ramen en deuren Putte, PVC ramen, aluminium ramen, renovatie Keerbergen, renovatie Mechelen, renovatie Zoersel, bouwbedrijf Keerbergen, bouwbedrijf Mechelen, crepi gevel, gevelisolatie, gevelbepleistering, isolatiewerken, ramen plaatsen Antwerpen, deuren plaatsen, gevelrenovatie, energiezuinige ramen, ramen Heist-op-den-Berg, ramen Bonheiden, ramen Lier, ramen Nijlen, renovatie Putte, renovatie Heist-op-den-Berg, bouwbedrijf Antwerpen provincie, ramen Tremelo, ramen Haacht, renovatie Bonheiden, crepi Keerbergen, crepi Mechelen, gevel Zoersel'
                        }}
                      >
                        <Hero />
                        <About />
                        <Services />
                        <QuoteCalculator />
                        <Approach />
                        <WhyUs />
                        <TestimonialsCarousel testimonials={TESTIMONIALS} />
                      </Layout>
                    }
                  />

                  {/* Main Pages */}
                  <Route
                    path="/over-ons"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Over Ons | Bouwbedrijf Zoersel, Antwerpen & Mechelen | Yannova',
                          description: 'Maak kennis met Yannova Bouw: 15+ jaar ervaring in ramen, deuren, renovatie en gevelwerken. Vakmanschap en persoonlijke begeleiding in Zoersel, Antwerpen en Mechelen.',
                          keywords: 'Yannova Bouw, bouwbedrijf Zoersel, aannemer Antwerpen, renovatie Mechelen, over ons, team bouwbedrijf'
                        }}
                      >
                        <OverOns />
                      </Layout>
                    }
                  />
                  <Route
                    path="/diensten"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Diensten | Ramen, Deuren, Renovatie & Gevelwerken | Yannova',
                          description: 'Ontdek onze diensten: ramen en deuren, totaalrenovatie, gevelisolatie met crepi en tuinaanleg in Zoersel, Antwerpen, Mechelen en omgeving. Gratis offerte aanvragen.',
                          keywords: 'ramen en deuren Zoersel, renovatie Antwerpen, gevelisolatie Mechelen, crepi, diensten bouwbedrijf, aannemer'
                        }}
                      >
                        <Diensten />
                      </Layout>
                    }
                  />
                  <Route
                    path="/crepi-info"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Crepi Info | Gevelbepleistering Zoersel, Antwerpen | Yannova',
                          description: 'Alles over crepi en gevelbepleistering: soorten, kleuren, prijzen en onderhoud. Professionele crepi afwerking in Zoersel, Antwerpen en Mechelen. Gratis advies.',
                          keywords: 'crepi Zoersel, crepi Antwerpen, gevelbepleistering Mechelen, crepi info, crepi patronen, crepi prijs per m2'
                        }}
                      >
                        <CrepiInfoPage />
                      </Layout>
                    }
                  />
                  <Route
                    path="/aanpak"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Onze Aanpak | Van Offerte tot Oplevering | Yannova',
                          description: 'Zo werkt Yannova: van eerste contact tot oplevering. Transparante werkwijze, heldere planning en vakkundige uitvoering in Zoersel, Antwerpen en Mechelen.',
                          keywords: 'werkwijze bouwbedrijf, aanpak renovatie, offerte aanvragen, Yannova aanpak, bouwproces'
                        }}
                      >
                        <Aanpak />
                      </Layout>
                    }
                  />
                  <Route
                    path="/partners"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Partners - Kwaliteitsleveranciers Ramen en Materialen',
                          description: 'Onze partners en leveranciers voor hoogwaardige ramen, deuren en bouwmaterialen. Yannova werkt alleen met de beste merken.',
                          keywords: 'partners bouwbedrijf, leveranciers ramen, kwaliteitsmaterialen, Yannova partners'
                        }}
                      >
                        <Partners />
                      </Layout>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        showContactCTA={false}
                        seo={{
                          title: 'Contact | Gratis Offerte Aanvragen Zoersel, Antwerpen | Yannova',
                          description: 'Neem contact op met Yannova Bouw voor een gratis offerte. Gevestigd in Zoersel, actief in Antwerpen, Mechelen en heel Vlaanderen. Bel +32 489 96 00 01 of mail ons.',
                          keywords: 'contact Yannova, gratis offerte, offerte ramen en deuren, contact bouwbedrijf Zoersel, aannemer Antwerpen'
                        }}
                      >
                        <Contact />
                      </Layout>
                    }
                  />

                  {/* Portfolio */}
                  <Route
                    path="/portfolio"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Portfolio - Projecten Ramen, Renovatie, Crepi',
                          description: 'Bekijk onze afgeronde projecten: ramen en deuren, renovaties en crepi gevelwerken in Keerbergen, Mechelen, Zoersel en omgeving.',
                          keywords: 'portfolio bouwbedrijf, projecten ramen en deuren, renovatie projecten, crepi voorbeelden'
                        }}
                      >
                        <Portfolio />
                      </Layout>
                    }
                  />

                  {/* Showroom - 3D Voordeuren */}
                  <Route
                    path="/showroom"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: '3D Deuren Configurator & Showroom | Yannova',
                          description: 'Bekijk uw nieuwe voordeur direct op uw eigen huis via onze 3D tool. Ontwerp online uw droomdeur en ontvang een prijsindicatie.',
                          keywords: 'voordeuren 3D, virtuele showroom, AR deuren bekijken, aluminium voordeur, voordeuren Keerbergen, voordeuren Zoersel, 3D showroom ramen en deuren, deuren configurator'
                        }}
                      >
                        <Showroom />
                      </Layout>
                    }
                  />

                  {/* Auth Callback */}
                  <Route
                    path="/auth/callback"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <AuthCallback />
                      </Suspense>
                    }
                  />

                  {/* SEO Dashboard */}
                  <Route
                    path="/seo"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{ title: 'SEO Dashboard', description: 'AI-powered SEO optimalisatie voor uw website.' }}
                      >
                        <SEODashboardPage />
                      </Layout>
                    }
                  />

                  {/* SEO Ranking Monitor */}
                  <Route
                    path="/seo/rankings"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{ title: 'SEO Rankings Monitor | Yannova', description: 'Monitor je Google rankings voor belangrijke keywords. Track je positie en verbeter je SEO.' }}
                      >
                        <SEORankingMonitor />
                      </Layout>
                    }
                  />

                  {/* Posts */}
                  <Route
                    path="/posts"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{ title: 'Posts', description: 'Blog posts and articles.' }}
                      >
                        <Posts />
                      </Layout>
                    }
                  />
                  <Route
                    path="/posts/:slug"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{ title: 'Post', description: 'Blog post.' }}
                      >
                        <Post />
                      </Layout>
                    }
                  />

                  {/* Gevel Pages */}
                  <Route
                    path="/gevel"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Gevelrenovatie & Crepi Antwerpen | Met Premiegarantie',
                          description: 'Laat uw gevel bepleisteren (crepi) of isoleren. Bespaar tot 30% energie. Wij helpen met uw premie-aanvraag tot €5.000.',
                          keywords: 'gevelwerken Zoersel, gevel Antwerpen, gevelrenovatie Mechelen, crepi gevel, gevelisolatie, premie gevelisolatie'
                        }}
                      >
                        <Gevel />
                      </Layout>
                    }
                  />
                  <Route
                    path="/gevel/gevelbepleistering"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Gevelbepleistering & Crepi Zoersel, Antwerpen | Yannova',
                          description: 'Professionele gevelbepleistering en crepi afwerking in Zoersel, Antwerpen, Mechelen. Siliconen- en silikaatpleister. Diverse structuren en kleuren. Gratis offerte.',
                          keywords: 'gevelbepleistering Zoersel, crepi Antwerpen, gevelpleister Mechelen, crepi afwerking, crepi prijs per m2'
                        }}
                      >
                        <Gevelbepleistering />
                      </Layout>
                    }
                  />
                  <Route
                    path="/gevel/gevelbescherming"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Gevelbescherming Keerbergen, Mechelen - Vochtwerend',
                          description: 'Bescherm uw gevel tegen vocht en weersinvloeden. Gevelbescherming in Keerbergen, Mechelen, Zoersel. Hydrofuge behandeling en coating.',
                          keywords: 'gevelbescherming Keerbergen, gevel impregneren Mechelen, vochtbestrijding gevel, hydrofuge behandeling'
                        }}
                      >
                        <Gevelbescherming />
                      </Layout>
                    }
                  />
                  <Route
                    path="/gevel/gevelisolatie"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Gevelisolatie Zoersel, Antwerpen & Mechelen | Tot €5.000 Premie | Yannova',
                          description: 'Bespaar tot 30% energie met professionele gevelisolatie in Zoersel, Antwerpen, Mechelen. EPS isolatie met crepi. Tot €5.000 Mijn VerbouwPremie. Gratis offerte.',
                          keywords: 'gevelisolatie Zoersel, buitenisolatie Antwerpen, EPS isolatie gevel Mechelen, gevelisolatie premie, energiebesparing'
                        }}
                      >
                        <Gevelisolatie />
                      </Layout>
                    }
                  />
                  <Route
                    path="/gevel/steenstrips"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Steenstrips Zoersel, Antwerpen & Mechelen | Baksteenlook | Yannova',
                          description: 'Authentieke baksteenlook met steenstrips in Zoersel, Antwerpen, Mechelen. Diverse kleuren en structuren. Duurzaam, onderhoudsvriendelijk en isolerend.',
                          keywords: 'steenstrips Zoersel, steenstrips gevel Antwerpen, baksteenstrips Mechelen, gevelbekleding steenstrips'
                        }}
                      >
                        <Steenstrips />
                      </Layout>
                    }
                  />
                  <Route
                    path="/gevel/gevelrenovatie"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Gevelrenovatie Zoersel, Antwerpen & Mechelen | Yannova',
                          description: 'Complete gevelrenovatie van A tot Z in Zoersel, Antwerpen, Mechelen. Van vochtbehandeling tot isolatie en crepi afwerking. 10 jaar garantie. Gratis offerte.',
                          keywords: 'gevelrenovatie Zoersel, gevel renoveren Antwerpen, gevel opknappen Mechelen, gevelrenovatie prijs'
                        }}
                      >
                        <Gevelrenovatie />
                      </Layout>
                    }
                  />

                  {/* Product Selectie Pagina */}
                  <Route
                    path="/kies-product"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Kies uw Product - Yannova Bouw',
                          description: 'Selecteer een productcategorie: ramen en deuren, gevelwerken, renovatie, tuinaanleg en meer. Bekijk onze producten en start uw configuratie.',
                          keywords: 'producten Yannova, ramen en deuren, gevelwerken, renovatie, tuinaanleg, product selectie'
                        }}
                      >
                        <KiesProduct />
                      </Layout>
                    }
                  />

                  {/* Nieuwe Hoofdcategorieën */}
                  <Route
                    path="/ramen-deuren"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Ramen en Deuren Kopen Zoersel? PVC & Alu | Yannova',
                          description: 'Hoogwaardige PVC en Aluminium ramen & deuren. Inbraakveilig en top-isolatie. Bekijk onze realisaties of bezoek de showroom.',
                          keywords: 'ramen en deuren Zoersel, ramen en deuren Antwerpen, ramen en deuren Mechelen, PVC ramen, aluminium ramen, ramen vervangen, voordeuren, schuiframen, hoogrendementsglas'
                        }}
                      >
                        <RamenDeuren />
                      </Layout>
                    }
                  />
                  <Route
                    path="/schilderwerken"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Schilderwerken Binnen & Buiten Zoersel, Antwerpen | Yannova',
                          description: 'Professionele schilderwerken voor interieur en gevel in Zoersel, Antwerpen, Mechelen en omgeving. Kwalitatief schilderwerk met 10 jaar garantie.',
                          keywords: 'schilderwerken Zoersel, huisschilder Antwerpen, binnenschilder, buitenschilder, gevel schilderen Mechelen'
                        }}
                      >
                        <Schilderwerken />
                      </Layout>
                    }
                  />
                  <Route
                    path="/tuinaanleg"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Tuinaanleg & Opritten Zoersel, Antwerpen, Mechelen | Yannova',
                          description: 'Professionele tuinaanleg, opritten en terrassen in Zoersel, Antwerpen, Mechelen en omgeving. Klinkers, natuursteen en groenvoorziening. Gratis offerte.',
                          keywords: 'tuinaanleg Zoersel, opritten Antwerpen, klinkers leggen Mechelen, terras aanleggen, tuinarchitect'
                        }}
                      >
                        <Tuinaanleg />
                      </Layout>
                    }
                  />
                  <Route
                    path="/renovatie"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        seo={{
                          title: 'Totaalrenovatie & Aannemer Zoersel / Antwerpen | Yannova',
                          description: 'Uw woning professioneel verbouwen? Van ruwbouw tot afwerking. Eén aanspreekpunt voor uw totaalrenovatie in provincie Antwerpen.',
                          keywords: 'totaalrenovatie Zoersel, renovatie Antwerpen, badkamer renovatie Mechelen, gyprocwerken, zolderinrichting, verbouwing, aannemer renovatie'
                        }}
                      >
                        <Renovatie />
                      </Layout>
                    }
                  />

                  {/* Regio Pagina's (Dynamisch) */}
                  <Route
                    path="/regio/:city"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                        // SEO wordt hier dynamisch maar we geven een fallback
                        seo={{
                          title: 'Yannova Bouw - Uw Partner in de Regio',
                          description: 'Bouw- en renovatiewerken in uw regio. Ramen, deuren, isolatie en gevelwerken door lokale vakmensen.',
                        }}
                      >
                        <RegioPage />
                      </Layout>
                    }
                  />

                  {/* Dashboard & Editor Routes */}
                  <Route
                    path="/dashboard/editor/:siteId"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <EditorPage />
                      </Suspense>
                    }
                  />

                  {/* Public Site View */}
                  <Route
                    path="/site/:siteId"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <SiteView />
                      </Suspense>
                    }
                  />

                  {/* Dynamic Pages */}
                  <Route
                    path="/p/:slug"
                    element={
                      <Layout
                        onAdminClick={() => window.location.href = '/admin'}
                      >
                        <DynamicPageRenderer />
                      </Layout>
                    }
                  />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </I18nProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
