
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { generateSitemapXML, DEFAULT_PAGES, SitemapEntry } from '../src/lib/seo/sitemap';
import { CITIES } from '../src/constants/regions';

async function generateSitemap() {
    console.log('🗺️  Generating sitemap...');

    try {
        // 1. Verzamel alle pagina's
        // De regio pagina's worden hier opnieuw gegenereerd om zeker te zijn dat we de laatste CITIES data hebben
        const regionPages: SitemapEntry[] = Object.keys(CITIES).map(citySlug => ({
            url: `/regio/${citySlug}`,
            changefreq: 'monthly',
            priority: 0.8
        }));

        // Voeg dynamische blog posts toe indien nodig (later fase)
        // Voor nu gebruiken we de default pages + regio pages
        const allPages = [...DEFAULT_PAGES, ...regionPages];

        // 2. Genereer XML
        const xmlContent = generateSitemapXML(allPages);

        // 3. Schrijf naar file
        // We schrijven naar de public folder zodat Vite het meeneemt in de build
        const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
        await writeFile(outputPath, xmlContent, 'utf-8');

        console.log(`✅ Sitemap successfully generated at: ${outputPath}`);
        console.log(`   Total URLs: ${allPages.length}`);

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
