import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  const fullTitle = title ? (title.toLowerCase().includes('yannova') ? title : `${title} | Yannova`) : DEFAULT_TITLE;
  const currentUrl = canonicalUrl || `${BASE_URL}${location.pathname}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Yannova Bouw" />
      <meta name="language" content="Dutch" />

      {/* Robots */}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
      />

      {/* Geo Tags */}
      <meta name="geo.region" content="BE-VAN" />
      <meta name="geo.placename" content="Zoersel, Antwerpen, België" />
      <meta name="geo.position" content="51.2667;4.6167" />
      <meta name="ICBM" content="51.2667, 4.6167" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="nl_BE" />
      <meta property="og:site_name" content="Yannova" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;