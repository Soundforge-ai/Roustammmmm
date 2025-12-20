-- SEO Data Table
CREATE TABLE IF NOT EXISTS seo_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url TEXT NOT NULL,
  page_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  keywords TEXT[] DEFAULT '{}',
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  structured_data JSONB,
  language TEXT DEFAULT 'nl' CHECK (language IN ('nl', 'fr')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_url, language)
);

-- Index voor snelle lookups
CREATE INDEX IF NOT EXISTS idx_seo_data_page_url ON seo_data(page_url);
CREATE INDEX IF NOT EXISTS idx_seo_data_language ON seo_data(language);

-- RLS Policies
ALTER TABLE seo_data ENABLE ROW LEVEL SECURITY;

-- Iedereen kan lezen (voor SEO meta tags)
CREATE POLICY "SEO data is publicly readable" ON seo_data
  FOR SELECT USING (true);

-- Alleen authenticated users kunnen schrijven
CREATE POLICY "Authenticated users can insert SEO data" ON seo_data
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update SEO data" ON seo_data
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete SEO data" ON seo_data
  FOR DELETE USING (true);
