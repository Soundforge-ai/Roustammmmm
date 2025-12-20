/**
 * AI-powered SEO Service
 * Gebruikt DeepSeek API voor het genereren van SEO content
 */

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  suggestions: string[];
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
}

interface AIResponse {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

/**
 * Genereer SEO meta tags met AI
 */
export async function generateSEOWithAI(
  pageContent: string,
  pageUrl: string,
  language: 'nl' | 'fr' = 'nl'
): Promise<SEOData> {
  // Eerst proberen met AI, anders fallback naar templates
  try {
    const prompt = language === 'nl' 
      ? `Je bent een SEO expert. Analyseer de volgende pagina content en genereer geoptimaliseerde SEO meta tags.

Pagina URL: ${pageUrl}
Content: ${pageContent.substring(0, 2000)}

Genereer JSON met:
- title: SEO titel (max 60 karakters, inclusief "| Yannova")
- description: Meta description (max 155 karakters, call-to-action)
- keywords: Array van 5-8 relevante keywords
- ogTitle: Open Graph titel voor social media
- ogDescription: Open Graph description (max 200 karakters)

Focus op Belgische bouw/renovatie sector. Antwoord ALLEEN met valid JSON.`
      : `Tu es un expert SEO. Analyse le contenu suivant et génère des meta tags SEO optimisés.

URL: ${pageUrl}
Contenu: ${pageContent.substring(0, 2000)}

Génère JSON avec:
- title: Titre SEO (max 60 caractères, incluant "| Yannova")
- description: Meta description (max 155 caractères, call-to-action)
- keywords: Array de 5-8 mots-clés pertinents
- ogTitle: Titre Open Graph pour réseaux sociaux
- ogDescription: Description Open Graph (max 200 caractères)

Focus sur le secteur construction/rénovation belge. Réponds UNIQUEMENT avec du JSON valide.`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'nex-agi/DeepSeek-V3.1-Nex-N1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.warn('AI API niet beschikbaar, gebruik fallback templates');
      return generateFallbackSEO(pageContent, pageUrl, language);
    }

    const data = await response.json();
    
    if (data.error) {
      console.warn('AI API error:', data.error);
      return generateFallbackSEO(pageContent, pageUrl, language);
    }
    
    const content = data.choices?.[0]?.message?.content || '';
    
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return generateFallbackSEO(pageContent, pageUrl, language);
    }
    
    const aiResult: AIResponse = JSON.parse(jsonMatch[0]);

    return {
      title: aiResult.title || '',
      description: aiResult.description || '',
      keywords: aiResult.keywords || [],
      ogTitle: aiResult.ogTitle || aiResult.title || '',
      ogDescription: aiResult.ogDescription || aiResult.description || '',
      canonicalUrl: pageUrl,
    };
  } catch (error) {
    console.error('SEO AI error, using fallback:', error);
    return generateFallbackSEO(pageContent, pageUrl, language);
  }
}

/**
 * Fallback SEO generator wanneer AI niet beschikbaar is
 */
function generateFallbackSEO(
  pageContent: string,
  pageUrl: string,
  language: 'nl' | 'fr'
): SEOData {
  // Extract page name from URL
  const pageName = pageUrl.split('/').pop() || 'home';
  const pageNameClean = pageName.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());
  
  // Extract keywords from content
  const words = pageContent.toLowerCase().split(/\s+/);
  const keywordCandidates = ['gevel', 'renovatie', 'isolatie', 'crepi', 'ramen', 'deuren', 'bouw', 'België', 'Yannova'];
  const foundKeywords = keywordCandidates.filter(kw => 
    words.some(w => w.includes(kw.toLowerCase()))
  );
  
  const templates: Record<string, Record<'nl' | 'fr', SEOData>> = {
    home: {
      nl: {
        title: 'Yannova | Bouw & Renovatie België',
        description: 'Yannova is uw betrouwbare partner voor bouw, renovatie, gevelwerken en isolatie in België. Vraag vandaag nog een gratis offerte aan!',
        keywords: ['bouw België', 'renovatie', 'gevelwerken', 'isolatie', 'Yannova', 'crepi', 'ramen deuren'],
        ogTitle: 'Yannova - Bouw & Renovatie Specialist',
        ogDescription: 'Professionele bouw- en renovatiediensten in heel België. Gevelwerken, isolatie, ramen & deuren.',
        canonicalUrl: pageUrl,
      },
      fr: {
        title: 'Yannova | Construction & Rénovation Belgique',
        description: 'Yannova est votre partenaire fiable pour la construction, rénovation et isolation en Belgique. Demandez un devis gratuit!',
        keywords: ['construction Belgique', 'rénovation', 'façade', 'isolation', 'Yannova', 'crépi'],
        ogTitle: 'Yannova - Spécialiste Construction & Rénovation',
        ogDescription: 'Services professionnels de construction et rénovation en Belgique.',
        canonicalUrl: pageUrl,
      },
    },
    diensten: {
      nl: {
        title: 'Onze Diensten | Yannova Bouw & Renovatie',
        description: 'Ontdek onze diensten: ramen & deuren, renovatie, isolatie en gevelwerken. Kwaliteitswerk door ervaren vakmensen.',
        keywords: ['diensten', 'ramen deuren', 'renovatie', 'isolatie', 'gevelwerken', 'Yannova'],
        ogTitle: 'Diensten - Yannova',
        ogDescription: 'Ramen, deuren, renovatie, isolatie en gevelwerken door Yannova.',
        canonicalUrl: pageUrl,
      },
      fr: {
        title: 'Nos Services | Yannova Construction',
        description: 'Découvrez nos services: fenêtres, portes, rénovation, isolation et façades. Travail de qualité.',
        keywords: ['services', 'fenêtres', 'portes', 'rénovation', 'isolation', 'façade'],
        ogTitle: 'Services - Yannova',
        ogDescription: 'Fenêtres, portes, rénovation, isolation et façades par Yannova.',
        canonicalUrl: pageUrl,
      },
    },
    gevel: {
      nl: {
        title: 'Gevelwerken België | Yannova Specialist',
        description: 'Professionele gevelwerken: crepi, isolatie, steenstrips en renovatie. Bescherm en verfraai uw gevel met Yannova.',
        keywords: ['gevelwerken', 'crepi', 'gevelisolatie', 'steenstrips', 'gevelrenovatie', 'België'],
        ogTitle: 'Gevelwerken - Yannova',
        ogDescription: 'Specialist in gevelbepleistering, isolatie en renovatie in België.',
        canonicalUrl: pageUrl,
      },
      fr: {
        title: 'Travaux de Façade Belgique | Yannova',
        description: 'Travaux de façade professionnels: crépi, isolation, briquettes. Protégez et embellissez votre façade.',
        keywords: ['façade', 'crépi', 'isolation façade', 'briquettes', 'rénovation façade'],
        ogTitle: 'Travaux de Façade - Yannova',
        ogDescription: 'Spécialiste en crépi, isolation et rénovation de façade en Belgique.',
        canonicalUrl: pageUrl,
      },
    },
    contact: {
      nl: {
        title: 'Contact | Yannova - Gratis Offerte',
        description: 'Neem contact op met Yannova voor een gratis offerte. Wij helpen u graag met uw bouw- of renovatieproject.',
        keywords: ['contact', 'offerte', 'Yannova', 'bouw', 'renovatie', 'België'],
        ogTitle: 'Contact Yannova',
        ogDescription: 'Vraag een gratis offerte aan voor uw bouw- of renovatieproject.',
        canonicalUrl: pageUrl,
      },
      fr: {
        title: 'Contact | Yannova - Devis Gratuit',
        description: 'Contactez Yannova pour un devis gratuit. Nous vous aidons avec votre projet de construction ou rénovation.',
        keywords: ['contact', 'devis', 'Yannova', 'construction', 'rénovation'],
        ogTitle: 'Contact Yannova',
        ogDescription: 'Demandez un devis gratuit pour votre projet.',
        canonicalUrl: pageUrl,
      },
    },
  };

  // Find matching template or use default
  const templateKey = Object.keys(templates).find(key => 
    pageName.toLowerCase().includes(key)
  ) || 'home';

  const template = templates[templateKey]?.[language] || templates.home[language];
  
  // Add found keywords
  if (foundKeywords.length > 0) {
    template.keywords = [...new Set([...template.keywords, ...foundKeywords])].slice(0, 8);
  }

  return template;
}

/**
 * Analyseer bestaande SEO en geef score
 */
export function analyzeSEO(seoData: Partial<SEOData>, pageContent: string): SEOAnalysis {
  const issues: SEOIssue[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Title checks
  if (!seoData.title) {
    issues.push({ type: 'error', message: 'Geen title tag gevonden', field: 'title' });
    score -= 20;
  } else {
    if (seoData.title.length < 30) {
      issues.push({ type: 'warning', message: 'Title is te kort (min 30 karakters)', field: 'title' });
      score -= 5;
    }
    if (seoData.title.length > 60) {
      issues.push({ type: 'warning', message: 'Title is te lang (max 60 karakters)', field: 'title' });
      score -= 5;
    }
  }

  // Description checks
  if (!seoData.description) {
    issues.push({ type: 'error', message: 'Geen meta description gevonden', field: 'description' });
    score -= 15;
  } else {
    if (seoData.description.length < 120) {
      issues.push({ type: 'warning', message: 'Description is te kort (min 120 karakters)', field: 'description' });
      score -= 5;
    }
    if (seoData.description.length > 160) {
      issues.push({ type: 'warning', message: 'Description is te lang (max 160 karakters)', field: 'description' });
      score -= 5;
    }
  }

  // Keywords checks
  if (!seoData.keywords || seoData.keywords.length === 0) {
    issues.push({ type: 'warning', message: 'Geen keywords gedefinieerd', field: 'keywords' });
    score -= 5;
  } else if (seoData.keywords.length < 3) {
    issues.push({ type: 'info', message: 'Voeg meer keywords toe (min 3-5)', field: 'keywords' });
    score -= 3;
  }

  // Open Graph checks
  if (!seoData.ogTitle) {
    issues.push({ type: 'warning', message: 'Geen Open Graph title', field: 'ogTitle' });
    score -= 5;
  }
  if (!seoData.ogDescription) {
    issues.push({ type: 'warning', message: 'Geen Open Graph description', field: 'ogDescription' });
    score -= 5;
  }

  // Content checks
  if (pageContent.length < 300) {
    issues.push({ type: 'warning', message: 'Pagina content is te kort voor goede SEO' });
    score -= 10;
    suggestions.push('Voeg meer content toe (min 300 woorden)');
  }

  // Suggestions based on issues
  if (issues.some(i => i.field === 'title')) {
    suggestions.push('Gebruik AI om een geoptimaliseerde title te genereren');
  }
  if (issues.some(i => i.field === 'description')) {
    suggestions.push('Genereer een aantrekkelijke meta description met call-to-action');
  }
  if (score >= 80) {
    suggestions.push('Goede SEO! Overweeg structured data toe te voegen voor rich snippets');
  }

  return {
    score: Math.max(0, score),
    issues,
    suggestions,
  };
}

/**
 * Genereer structured data (JSON-LD)
 */
export function generateStructuredData(
  type: 'LocalBusiness' | 'Service' | 'Article' | 'FAQPage',
  data: Record<string, any>
): object {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'LocalBusiness':
      return {
        ...baseData,
        name: data.name || 'Yannova',
        description: data.description,
        url: data.url || 'https://yannova.be',
        telephone: data.phone || '+32 XXX XX XX XX',
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.street,
          addressLocality: data.city,
          postalCode: data.postalCode,
          addressCountry: 'BE',
        },
        geo: data.lat && data.lng ? {
          '@type': 'GeoCoordinates',
          latitude: data.lat,
          longitude: data.lng,
        } : undefined,
        openingHours: data.openingHours,
        priceRange: data.priceRange || '€€',
      };

    case 'Service':
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Yannova',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Belgium',
        },
      };

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: 'Yannova',
        },
        datePublished: data.publishDate,
        dateModified: data.modifiedDate || data.publishDate,
      };

    case 'FAQPage':
      return {
        ...baseData,
        mainEntity: (data.faqs || []).map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };

    default:
      return baseData;
  }
}
