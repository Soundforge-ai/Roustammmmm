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
 * In productie: gebruik environment variables
 */
export async function loadGCSConfig(): Promise<GCSConfig> {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
  
  if (!clientId) {
    console.error('VITE_GOOGLE_CLIENT_ID not configured');
  }

  return {
    projectId: import.meta.env.VITE_GCS_PROJECT_ID || 'gen-lang-client-0141118397',
    clientId: clientId || '',
    clientSecret: clientSecret || '',
    bucketName: 'yannova-media',
    baseUrl: 'https://storage.googleapis.com/yannova-media',
  };
}

