/**
 * Google Cloud Storage configuratie
 */

export interface GCSConfig {
  projectId: string;
  clientId: string;
  clientSecret: string;
  bucketName: string;
  baseUrl: string;
}

/**
 * Laad Google Cloud credentials uit environment variables
 * Gebruik .env.local voor lokale development
 */
export async function loadGCSConfig(): Promise<GCSConfig> {
  // Gebruik environment variables (Vite prefix VITE_ is vereist voor client-side)
  const config: GCSConfig = {
    projectId: import.meta.env.VITE_GCS_PROJECT_ID || 'gen-lang-client-0141118397',
    clientId: import.meta.env.VITE_GCS_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_GCS_CLIENT_SECRET || '',
    bucketName: import.meta.env.VITE_GCS_BUCKET_NAME || 'yannova-media',
    baseUrl: import.meta.env.VITE_GCS_BASE_URL || 'https://storage.googleapis.com/yannova-media',
  };

  // Valideer dat credentials aanwezig zijn
  if (!config.clientId || !config.clientSecret) {
    console.warn('Google Cloud credentials niet gevonden in environment variables. Configureer .env.local met VITE_GCS_* variabelen.');
  }

  return config;
}