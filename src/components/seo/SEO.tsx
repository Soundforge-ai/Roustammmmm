import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://www.yannova.be';
const DEFAULT_TITLE = 'Yannova Bouw | Ramen en Deuren, Renovatie & Crepi | Zoersel, Antwerpen, Mechelen';
const DEFAULT_DESCRIPTION = 'Yannova Bouw - Specialist in ramen en deuren, renovatie, isolatie en crepi gevelafwerking in Zoersel, Antwerpen, Mechelen en omgeving. ✓ Gratis offerte ✓ 15+ jaar ervaring ✓ Vakkundige plaatsing';
const DEFAULT_KEYWORDS = 'Yannova, Yannova Bouw, yannova ramen en deuren, ' +
  // Ramen en deuren per regio
  'ramen en deuren Zoersel, ramen en deuren Antwerpen, ramen en deuren Mechelen, ramen en deuren Malle, ramen en deuren Schilde, ramen en deuren Ranst, ramen en deuren Brecht, ramen en deuren Lier, ramen en deuren Keerbergen, ramen en deuren Putte, ' +
  'PVC ramen Zoersel, PVC ramen Antwerpen, PVC ramen Mechelen, aluminium ramen Zoersel, aluminium ramen Antwerpen, ' +
  // Renovatie per regio
  'renovatie Zoersel, renovatie Antwerpen, renovatie Mechelen, renovatie Malle, renovatie Schilde, renovatie Ranst, renovatie Lier, renovatie Bonheiden, renovatie Heist-op-den-Berg, renovatie Keerbergen, renovatie Putte, ' +
  'totaalrenovatie Zoersel, totaalrenovatie Antwerpen, verbouwing Zoersel, verbouwing Antwerpen, ' +
  // Crepi en gevel per regio
  'crepi Zoersel, crepi Antwerpen, crepi Mechelen, crepi Malle, crepi Schilde, crepi Lier, crepi Keerbergen, crepi Putte, ' +
  'gevelwerken Zoersel, gevelwerken Antwerpen, gevelwerken Mechelen, gevelrenovatie Zoersel, gevelrenovatie Antwerpen, ' +
  'gevelbepleistering Zoersel, gevelbepleistering Antwerpen, gevelbepleistering Mechelen, ' +
  // Isolatie per regio
  'isolatie werken Zoersel, isolatie werken Antwerpen, isolatie werken Mechelen, gevelisolatie Zoersel, gevelisolatie Antwerpen, gevelisolatie Mechelen, ' +
  'buitenmuurisolatie Zoersel, buitenmuurisolatie Antwerpen, spouwmuurisolatie Zoersel, ' +
  // Steenstrips
  'steenstrips Zoersel, steenstrips Antwerpen, steenstrips Mechelen, steenstrips plaatsen, ' +
  // Aannemer per regio
  'aannemer Zoersel, aannemer Antwerpen, aannemer Mechelen, aannemer Keerbergen, aannemer Malle, aannemer Schilde, ' +
  'bouwbedrijf Zoersel, bouwbedrijf Antwerpen, bouwbedrijf Mechelen, bouwbedrijf Keerbergen, ' +
  // Algemeen
  'ramen plaatsen, deuren plaatsen, energiezuinige ramen, driedubbel glas, ramen vervangen';

const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
  noindex = false
}) => {
  const location = useLocation();
  const fullTitle = title ? `${title} | Yannova` : DEFAULT_TITLE;
  const currentUrl = canonicalUrl || `${BASE_URL}${location.pathname}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags helper
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Remove meta tag helper
    const removeMeta = (name: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      const element = document.querySelector(`meta[${attr}="${name}"]`);
      if (element) element.remove();
    };

    // Robots meta tag
    if (noindex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', 'Yannova Bouw');
    updateMeta('language', 'Dutch');
    updateMeta('geo.region', 'BE-VAN');
    updateMeta('geo.placename', 'Zoersel, Antwerpen, België');
    updateMeta('geo.position', '51.2667;4.6167');
    updateMeta('ICBM', '51.2667, 4.6167');

    // Open Graph tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:url', currentUrl, true);
    updateMeta('og:image', fullOgImage, true);
    updateMeta('og:image:width', '1200', true);
    updateMeta('og:image:height', '630', true);
    updateMeta('og:image:alt', fullTitle, true);
    updateMeta('og:locale', 'nl_BE', true);
    updateMeta('og:site_name', 'Yannova', true);

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', fullOgImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // Alternate language links (if needed in future)
    // updateMeta('alternate', 'fr', true, 'hreflang');

  }, [fullTitle, description, keywords, currentUrl, fullOgImage, noindex]);

  return null;
};

export default SEO;
