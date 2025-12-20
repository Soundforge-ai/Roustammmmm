/**
 * Media Storage - Ondersteunt zowel localStorage als Google Cloud Storage
 */

export interface MediaItem {
    id: string;
    name: string;
    url: string; // Base64, external URL, of Google Cloud Storage URL
    type: 'image' | 'document';
    uploadDate: Date;
    size: number;
    source?: 'local' | 'gcs'; // Bron van de media
    gcsPath?: string; // Google Cloud Storage pad (voor verwijderen)
}

const MEDIA_KEY = 'yannova_media';

// Google Cloud Storage configuratie
const GCS_CONFIG = {
    bucketName: 'yannova-media',
    projectId: 'gen-lang-client-0141118397',
    baseUrl: 'https://storage.googleapis.com/yannova-media',
};

export const mediaStorage = {
    /**
     * Haal alle media items op
     */
    getMedia: (): MediaItem[] => {
        try {
            const stored = localStorage.getItem(MEDIA_KEY);
            if (!stored) return [];

            const parsed = JSON.parse(stored);
            return parsed.map((m: any) => ({
                ...m,
                uploadDate: new Date(m.uploadDate)
            }));
        } catch (e) {
            console.error('Error reading media', e);
            return [];
        }
    },

    /**
     * Sla een media item op (lokaal of Google Cloud)
     */
    saveMedia: (item: MediaItem) => {
        try {
            const current = mediaStorage.getMedia();
            const updated = [item, ...current];

            // Check for quota exceed risk (alleen voor lokale Base64 opslag)
            if (item.source === 'local' || !item.source) {
            const stringified = JSON.stringify(updated);
            if (stringified.length > 4000000) { // ~4MB safeguard
                throw new Error('Opslag vol! Verwijder oude afbeeldingen of gebruik externe URL\'s.');
                }
            }

            localStorage.setItem(MEDIA_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event('media-updated'));
        } catch (e) {
            console.error('Error saving media', e);
            throw e;
        }
    },

    /**
     * Verwijder een media item
     */
    deleteMedia: async (id: string) => {
        const current = mediaStorage.getMedia();
        const item = current.find(m => m.id === id);
        
        if (item?.source === 'gcs' && item.gcsPath) {
            // Verwijder ook van Google Cloud Storage (optioneel)
            try {
                // Dit zou een API call naar je backend moeten zijn
                // Voor nu verwijderen we alleen de metadata
                console.log(`Verwijderen van GCS: ${item.gcsPath}`);
            } catch (e) {
                console.error('Error deleting from GCS:', e);
            }
        }

        const updated = current.filter(m => m.id !== id);
        localStorage.setItem(MEDIA_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('media-updated'));
    },

    /**
     * Upload naar Google Cloud Storage via browser
     * Let op: Dit vereist een backend API endpoint voor veilige upload
     */
    uploadToGCS: async (file: File): Promise<MediaItem> => {
        try {
            // Voor nu: gebruik een backend endpoint
            // In productie zou je een API endpoint moeten maken die de upload afhandelt
            
            // Tijdelijke oplossing: sla op als externe URL referentie
            // De daadwerkelijke upload gebeurt via het upload script
            
            const formData = new FormData();
            formData.append('file', file);

            // Dit zou naar je backend moeten gaan
            // const response = await fetch('/api/upload-to-gcs', {
            //     method: 'POST',
            //     body: formData,
            // });
            // const result = await response.json();

            // Voor nu: return een placeholder
            throw new Error('GCS upload via browser vereist een backend API endpoint. Gebruik het upload script voor bulk uploads.');
        } catch (e) {
            console.error('Error uploading to GCS:', e);
            throw e;
        }
    },

    /**
     * Voeg een Google Cloud Storage URL toe aan de media library
     */
    addGCSMedia: (url: string, name: string, size: number = 0): MediaItem => {
        const item: MediaItem = {
            id: Date.now().toString(),
            name,
            url,
            type: 'image',
            uploadDate: new Date(),
            size,
            source: 'gcs',
            gcsPath: url.replace(GCS_CONFIG.baseUrl + '/', ''),
        };

        mediaStorage.saveMedia(item);
        return item;
    },

    /**
     * Haal Google Cloud Storage configuratie op
     */
    getGCSConfig: () => GCS_CONFIG,
};
