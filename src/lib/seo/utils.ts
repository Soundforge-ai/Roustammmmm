/**
 * SEO Utility Functions
 * Hulpprogramma's voor SEO optimalisatie in de applicatie
 */

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Genereer geoptimaliseerde paginatitel met fallback
 */
export function generatePageTitle(
  title: string,
  suffix: string = ' | Yannova Bouw'
): string {
  const maxLength = 60;
  const fullTitle = `${title}${suffix}`;
  
  if (fullTitle.length <= maxLength) {
    return fullTitle;
  }
  
  // Als de titel te lang is, gebruik alleen de titel
  return title.length <= maxLength ? title : title.substring(0, maxLength - 3) + '...';
}

/**
 * Genereer geoptimaliseerde meta description
 */
export function generateDescription(
  description: string,
  maxLength: number = 160
): string {
  if (description.length <= maxLength) {
    return description;
  }
  
  // Vind de laatste spatie binnen de limiet
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Genereer keywords string uit array
 */
export function generateKeywords(keywords: string[]): string {
  return keywords.join(', ');
}

/**
 * Genereer canonical URL
 */
export function generateCanonical(path: string): string {
  const baseUrl = 'https://www.yannova.be';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Genereer Open Graph URL
 */
export function generateOGUrl(path: string): string {
  return generateCanonical(path);
}

/**
 * Genereer breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.yannova.be${item.path}`
    }))
  };
  
  return JSON.stringify(schema);
}

/**
 * Genereer FAQ structured data
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
  
  return JSON.stringify(schema);
}

/**
 * Genereer Article structured data voor blog posts
 */
export interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  path: string;
}

export function generateArticleSchema(props: ArticleSchemaProps): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    image: props.image,
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    author: {
      '@type': 'Person',
      name: props.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yannova Bouw',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.yannova.be/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': generateCanonical(props.path)
    }
  };
  
  return JSON.stringify(schema);
}

/**
 * Genereer Product/Service structured data
 */
export interface ServiceSchemaProps {
  name: string;
  description: string;
  image?: string;
  price?: string;
  priceCurrency?: string;
  category?: string;
}

export function generateServiceSchema(props: ServiceSchemaProps): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: props.name,
    description: props.description,
    provider: {
      '@type': 'Organization',
      name: 'Yannova Bouw',
      url: 'https://www.yannova.be'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 51.2667,
        longitude: 4.6167
      },
      geoRadius: '50000'
    }
  };
  
  if (props.image) {
    schema.image = props.image;
  }
  
  if (props.price) {
    schema.offers = {
      '@type': 'Offer',
      price: props.price,
      priceCurrency: props.priceCurrency || 'EUR'
    };
  }
  
  return JSON.stringify(schema);
}

/**
 * Genereer LocalBusiness structured data voor specifieke dienst
 */
export interface LocalServiceProps {
  serviceName: string;
  description: string;
  areaServed: string[];
}

export function generateLocalServiceSchema(props: LocalServiceProps): string {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Yannova Bouw',
    description: props.description,
    url: 'https://www.yannova.be',
    telephone: '+32489960001',
    email: 'info@yannova.be',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'De Beemdekens 39',
      addressLocality': 'Zoersel',
      addressRegion': 'Antwerpen',
      postalCode: '2980',
      addressCountry': 'BE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.2667,
      longitude: 4.6167
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '13:00'
      }
    ],
    areaServed: props.areaServed.map(city => ({
      '@type': 'City',
      name: city
    }))
  };
  
  return JSON.stringify(schema);
}

/**
 * Formatteer datum voor SEO
 */
export function formatDateForSEO(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Genereer slug voor URL
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Valideer URL structuur
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Genereer alternatieve taal tags
 */
export function generateHreflangTags(
  currentPath: string,
  languages: { code: string; path: string }[] = [
    { code: 'nl-BE', path: '' },
    { code: 'nl', path: '' }
  ]
): { code: string; url: string }[] {
  const baseUrl = 'https://www.yannova.be';
  
  return languages.map(lang => ({
    code: lang.code,
    url: `${baseUrl}${lang.path || currentPath}`
  }));
}

/**
 * Extract keywords uit tekst
 */
export function extractKeywords(
  text: string,
  minWordLength: number = 3,
  maxKeywords: number = 10
): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= minWordLength);
  
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Genereer social sharing URL
 */
export function generateShareUrl(
  platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp',
  url: string,
  title?: string
): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = title ? encodeURIComponent(title) : '';
  
  const platformUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };
  
  return platformUrls[platform];
}

/**
 * Check of pagina geïndexeerd moet worden
 */
export function shouldIndexPage(path: string): boolean {
  const noIndexPaths = [
    '/admin',
    '/dashboard',
    '/api',
    '/auth',
    '/test',
    '/dev'
  ];
  
  return !noIndexPaths.some(noIndexPath => 
    path.startsWith(noIndexPath)
  );
}

/**
 * Genereer robots meta tag content
 */
export function generateRobotsContent(
  index: boolean = true,
  follow: boolean = true
): string {
  const directives: string[] = [];
  
  if (!index) directives.push('noindex');
  if (!follow) directives.push('nofollow');
  
  return directives.length > 0 
    ? directives.join(', ') 
    : 'index, follow';
}