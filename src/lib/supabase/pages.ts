import { supabase } from './client';
import { PageData } from '../pageStorage';

// Converteer database page naar PageData type
function dbPageToPageData(dbPage: any): PageData {
  return {
    id: dbPage.id,
    slug: dbPage.slug,
    title: dbPage.title,
    content: dbPage.content,
    createdAt: new Date(dbPage.created_at),
    updatedAt: new Date(dbPage.updated_at),
    status: dbPage.status as 'published' | 'draft',
    parentId: dbPage.parent_id || undefined,
    seo: dbPage.seo || undefined
  };
}

// Haal alle pagina's op
export async function getPages(): Promise<PageData[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }

  return data ? data.map(dbPageToPageData) : [];
}

// Haal een specifieke pagina op (by id of slug)
export async function getPage(idOrSlug: string): Promise<PageData | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching page:', error);
    throw error;
  }

  return data ? dbPageToPageData(data) : null;
}

// Sla een pagina op of update
export async function savePage(page: PageData): Promise<PageData> {
  const { data, error } = await supabase
    .from('pages')
    .upsert({
      id: page.id,
      slug: page.slug,
      title: page.title,
      content: page.content,
      status: page.status,
      parent_id: page.parentId || null,
      seo: page.seo || null
    }, {
      onConflict: 'id'
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving page:', error);
    throw error;
  }

  return dbPageToPageData(data);
}

// Verwijder een pagina
export async function deletePage(id: string): Promise<void> {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
}

