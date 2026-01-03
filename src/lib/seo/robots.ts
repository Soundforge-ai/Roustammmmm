/**
 * Robots.txt Generator
 */

export interface RobotsConfig {
  allowAll: boolean;
  disallowPaths: string[];
  allowPaths: string[];
  sitemapUrl: string;
  crawlDelay?: number;
}

const DEFAULT_CONFIG: RobotsConfig = {
  allowAll: true,
  disallowPaths: [
    '/admin',
    '/admin/*',
    '/dashboard/*',
    '/api/*',
    '/*.json',
    '/seo',
    '/jules',
  ],
  allowPaths: [
    '/',
    '/over-ons',
    '/diensten',
    '/contact',
    '/gevel/*',
    '/posts/*',
  ],
  sitemapUrl: 'https://www.yannova.be/sitemap.xml',
};

/**
 * Genereer robots.txt content
 */
export function generateRobotsTxt(config: Partial<RobotsConfig> = {}): string {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const lines: string[] = [
    '# Robots.txt voor Yannova',
    '# Gegenereerd door SEO Dashboard',
    '',
    'User-agent: *',
  ];

  if (finalConfig.allowAll) {
    // Eerst allow rules
    finalConfig.allowPaths.forEach(path => {
      lines.push(`Allow: ${path}`);
    });
    
    // Dan disallow rules
    finalConfig.disallowPaths.forEach(path => {
      lines.push(`Disallow: ${path}`);
    });
  } else {
    lines.push('Disallow: /');
  }

  if (finalConfig.crawlDelay) {
    lines.push(`Crawl-delay: ${finalConfig.crawlDelay}`);
  }

  lines.push('');
  lines.push(`Sitemap: ${finalConfig.sitemapUrl}`);
  lines.push('');

  // Extra regels voor specifieke bots
  lines.push('# Google specifiek');
  lines.push('User-agent: Googlebot');
  lines.push('Allow: /');
  lines.push('');
  
  lines.push('# Bing specifiek');
  lines.push('User-agent: Bingbot');
  lines.push('Allow: /');
  lines.push('');

  // Block bad bots
  lines.push('# Block bad bots');
  lines.push('User-agent: AhrefsBot');
  lines.push('Disallow: /');
  lines.push('');
  lines.push('User-agent: SemrushBot');
  lines.push('Disallow: /');

  return lines.join('\n');
}

/**
 * Download robots.txt als bestand
 */
export function downloadRobotsTxt(content: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export { DEFAULT_CONFIG };
