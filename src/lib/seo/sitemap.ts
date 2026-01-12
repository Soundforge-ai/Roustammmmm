/**
 * XML Sitemap Generator
 */

import { CITIES } from '../../constants/regions';
import { PROJECTS } from '../../constants';

// Helper om slugs te genereren
const slugify = (text: string) =>
  text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = 'https://www.yannova.be';

// Standaard pagina's met geoptimaliseerde SEO waarden
const DEFAULT_PAGES: SitemapEntry[] = [
  // Homepage - Hoogste prioriteit
  { url: '/', changefreq: 'weekly', priority: 1.0 },

  // Core pagina's
  { url: '/over-ons', changefreq: 'monthly', priority: 0.8 },
  { url: '/diensten', changefreq: 'weekly', priority: 0.9 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/aanpak', changefreq: 'monthly', priority: 0.7 },
  { url: '/partners', changefreq: 'monthly', priority: 0.6 },
  { url: '/portfolio', changefreq: 'weekly', priority: 0.85 },
  { url: '/showroom', changefreq: 'weekly', priority: 0.85 },

  // Hoofd diensten - Hoge prioriteit voor lead generation
  { url: '/ramen-deuren', changefreq: 'weekly', priority: 0.95 },
  { url: '/renovatie', changefreq: 'weekly', priority: 0.95 },
  { url: '/gevel', changefreq: 'weekly', priority: 0.95 },
  { url: '/tuinaanleg', changefreq: 'weekly', priority: 0.85 },
  { url: '/schilderwerken', changefreq: 'weekly', priority: 0.85 },
  { url: '/kies-product', changefreq: 'weekly', priority: 0.85 },

  // Nieuwe feature pagina's - Hoge prioriteit voor conversie
  { url: '/projecten', changefreq: 'weekly', priority: 0.9 },
  { url: '/budget-tool', changefreq: 'monthly', priority: 0.85 },
  { url: '/verbouwpremie-gids', changefreq: 'monthly', priority: 0.9 },

  // Project detail pagina's (Dynamisch gegenereerd)
  ...PROJECTS.map(project => ({
    url: `/projecten/${slugify(project.title)}`,
    changefreq: 'monthly' as const,
    priority: 0.75,
    lastmod: project.completedDate ? `${project.completedDate}-01` : undefined
  })),

  // Regionale landing pagina's - Hoge prioriteit voor lokale SEO
  { url: '/gevelrenovatie-mechelen', changefreq: 'monthly', priority: 0.85 },
  { url: '/ramen-en-deuren-keerbergen', changefreq: 'monthly', priority: 0.85 },
  { url: '/crepi-werken-leuven', changefreq: 'monthly', priority: 0.85 },

  // Gevel subpagina's
  { url: '/gevel/gevelbepleistering', changefreq: 'weekly', priority: 0.85 },
  { url: '/gevel/gevelbescherming', changefreq: 'weekly', priority: 0.8 },
  { url: '/gevel/gevelisolatie', changefreq: 'weekly', priority: 0.85 },
  { url: '/gevel/steenstrips', changefreq: 'weekly', priority: 0.8 },
  { url: '/gevel/gevelrenovatie', changefreq: 'weekly', priority: 0.85 },

  // Informatieve pagina's
  { url: '/crepi-info', changefreq: 'monthly', priority: 0.7 },

  // Blog posts - Regelmatig bijgewerkt
  { url: '/posts', changefreq: 'weekly', priority: 0.7 },
  { url: '/posts/ramen-prijzen-2025', changefreq: 'monthly', priority: 0.8 },
  { url: '/posts/pvc-vs-aluminium', changefreq: 'monthly', priority: 0.8 },
  { url: '/posts/onderhoudstips', changefreq: 'monthly', priority: 0.8 },
];

// Regio pagina's genereren uit CITIES configuratie
const REGION_PAGES: SitemapEntry[] = Object.keys(CITIES).map(citySlug => ({
  url: `/regio/${citySlug}`,
  changefreq: 'monthly',
  priority: 0.8
}));

const ALL_PAGES = [...DEFAULT_PAGES, ...REGION_PAGES];

/**
 * Genereer XML sitemap string
 */
export function generateSitemapXML(entries: SitemapEntry[] = ALL_PAGES): string {
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = entries.map(entry => {
    const fullUrl = entry.url.startsWith('http') ? entry.url : `${BASE_URL}${entry.url}`;
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${entry.lastmod || today}</lastmod>
    <changefreq>${entry.changefreq || 'monthly'}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Genereer sitemap met blog posts
 */
export function generateSitemapWithPosts(
  staticPages: SitemapEntry[] = DEFAULT_PAGES,
  blogPosts: { slug: string; updatedAt?: string }[] = []
): string {
  const postEntries: SitemapEntry[] = blogPosts.map(post => ({
    url: `/posts/${post.slug}`,
    lastmod: post.updatedAt,
    changefreq: 'weekly' as const,
    priority: 0.6,
  }));

  return generateSitemapXML([...staticPages, ...postEntries]);
}

/**
 * Download sitemap als bestand
 */
export function downloadSitemap(content: string, filename: string = 'sitemap.xml'): void {
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Kopieer sitemap naar clipboard
 */
export async function copySitemapToClipboard(content: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    return false;
  }
}

export { DEFAULT_PAGES };
