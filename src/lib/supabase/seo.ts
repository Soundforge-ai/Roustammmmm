/**
 * SEO Data Storage in Supabase
 */
import { supabase } from './client';

export interface StoredSEOData {
  id?: string;
  page_url: string;
  page_name: string;
  title: string;
  description: string;
  keywords: string[];
  og_title: string;
  og_description: string;
  og_image?: string;
  canonical_url?: string;
  structured_data?: object;
  language: 'nl' | 'fr';
  created_at?: string;
  updated_at?: string;
}

/**
 * Haal SEO data op voor een pagina
 */
export async function getSEOForPage(pageUrl: string, language: 'nl' | 'fr' = 'nl'): Promise<StoredSEOData | null> {
  const { data, error } = await supabase
    .from('seo_data')
    .select('*')
    .eq('page_url', pageUrl)
    .eq('language', language)
    .single();

  if (error) {
    console.error('Error fetching SEO data:', error);
    return null;
  }

  return data;
}

/**
 * Haal alle SEO data op
 */
export async function getAllSEOData(): Promise<StoredSEOData[]> {
  const { data, error } = await supabase
    .from('seo_data')
    .select('*')
    .order('page_name', { ascending: true });

  if (error) {
    console.error('Error fetching all SEO data:', error);
    return [];
  }

  return data || [];
}

/**
 * Sla SEO data op of update bestaande
 */
export async function saveSEOData(seoData: Omit<StoredSEOData, 'id' | 'created_at' | 'updated_at'>): Promise<StoredSEOData | null> {
  // Check of er al data bestaat voor deze pagina/taal
  const existing = await getSEOForPage(seoData.page_url, seoData.language);

  if (existing) {
    // Update bestaande
    const { data, error } = await supabase
      .from('seo_data')
      .update({
        ...seoData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating SEO data:', error);
      return null;
    }
    return data;
  } else {
    // Insert nieuwe
    const { data, error } = await supabase
      .from('seo_data')
      .insert({
        ...seoData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting SEO data:', error);
      return null;
    }
    return data;
  }
}

/**
 * Verwijder SEO data
 */
export async function deleteSEOData(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('seo_data')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting SEO data:', error);
    return false;
  }
  return true;
}
