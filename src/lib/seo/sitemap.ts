/**
 * XML Sitemap Generator
 */

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = 'https://yannova.be';

// Standaard pagina's
const DEFAULT_PAGES: SitemapEntry[] = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/over-ons', changefreq: 'monthly', priority: 0.8 },
  { url: '/diensten', changefreq: 'monthly', priority: 0.9 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/aanpak', changefreq: 'monthly', priority: 0.7 },
  { url: '/partners', changefreq: 'monthly', priority: 0.6 },
  // Gevel pagina's
  { url: '/gevel', changefreq: 'monthly', priority: 0.9 },
  { url: '/gevel/gevelbepleistering', changefreq: 'monthly', priority: 0.8 },
  { url: '/gevel/gevelbescherming', changefreq: 'monthly', priority: 0.8 },
  { url: '/gevel/gevelisolatie', changefreq: 'monthly', priority: 0.8 },
  { url: '/gevel/steenstrips', changefreq: 'monthly', priority: 0.8 },
  { url: '/gevel/gevelrenovatie', changefreq: 'monthly', priority: 0.8 },
  { url: '/crepi-info', changefreq: 'monthly', priority: 0.7 },
];

/**
 * Genereer XML sitemap string
 */
export function generateSitemapXML(entries: SitemapEntry[] = DEFAULT_PAGES): string {
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
