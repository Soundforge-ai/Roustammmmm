/**
 * Google Cloud Storage integratie voor media opslag
 * Gebruikt OAuth 2.0 credentials voor authenticatie
 */

import { Storage } from '@google-cloud/storage';
import { GoogleAuth } from 'google-auth-library';

export interface GCSConfig {
  projectId: string;
  clientId: string;
  clientSecret: string;
  bucketName: string;
}

export interface UploadResult {
  url: string;
  publicUrl: string;
  name: string;
  size: number;
}

class GoogleCloudStorageService {
  private storage: Storage | null = null;
  private config: GCSConfig | null = null;
  private bucketName: string = '';

  /**
   * Initialiseer Google Cloud Storage met OAuth credentials
   */
  async initialize(config: GCSConfig): Promise<void> {
    this.config = config;
    this.bucketName = config.bucketName;

    try {
      // Gebruik OAuth 2.0 credentials
      const auth = new GoogleAuth({
        credentials: {
          client_id: config.clientId,
          client_secret: config.clientSecret,
          project_id: config.projectId,
        },
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });

      this.storage = new Storage({
        auth,
        projectId: config.projectId,
      });

      // Test of bucket bestaat
      const bucket = this.storage.bucket(config.bucketName);
      const [exists] = await bucket.exists();
      
      if (!exists) {
        console.warn(`Bucket ${config.bucketName} bestaat niet. Maak deze aan in Google Cloud Console.`);
      }
    } catch (error) {
      console.error('Error initializing Google Cloud Storage:', error);
      throw error;
    }
  }

  /**
   * Upload een bestand naar Google Cloud Storage
   */
  async uploadFile(
    file: File | Buffer,
    fileName: string,
    folder: string = 'images'
  ): Promise<UploadResult> {
    if (!this.storage || !this.config) {
      throw new Error('Google Cloud Storage is niet geïnitialiseerd');
    }

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const filePath = `${folder}/${Date.now()}-${fileName}`;
      const fileRef = bucket.file(filePath);

      // Upload opties
      const options: any = {
        metadata: {
          contentType: this.getContentType(fileName),
          cacheControl: 'public, max-age=31536000', // 1 jaar cache
        },
        public: true, // Maak bestand publiek toegankelijk
      };

      // Upload het bestand
      let fileBuffer: Buffer;
      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      } else {
        fileBuffer = file;
      }

      await fileRef.save(fileBuffer, options);

      // Maak publiek toegankelijk
      await fileRef.makePublic();

      // Genereer URLs
      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
      const gsUrl = `gs://${this.bucketName}/${filePath}`;

      return {
        url: gsUrl,
        publicUrl,
        name: fileName,
        size: fileBuffer.length,
      };
    } catch (error) {
      console.error('Error uploading file to Google Cloud Storage:', error);
      throw error;
    }
  }

  /**
   * Upload meerdere bestanden
   */
  async uploadFiles(
    files: (File | Buffer)[],
    fileNames: string[],
    folder: string = 'images'
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.uploadFile(files[i], fileNames[i], folder);
        results.push(result);
      } catch (error) {
        console.error(`Error uploading file ${fileNames[i]}:`, error);
        // Continue met volgende bestand
      }
    }

    return results;
  }

  /**
   * Verwijder een bestand
   */
  async deleteFile(filePath: string): Promise<void> {
    if (!this.storage) {
      throw new Error('Google Cloud Storage is niet geïnitialiseerd');
    }

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const fileRef = bucket.file(filePath);
      await fileRef.delete();
    } catch (error) {
      console.error('Error deleting file from Google Cloud Storage:', error);
      throw error;
    }
  }

  /**
   * Lijst alle bestanden in een folder
   */
  async listFiles(folder: string = 'images'): Promise<string[]> {
    if (!this.storage) {
      throw new Error('Google Cloud Storage is niet geïnitialiseerd');
    }

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const [files] = await bucket.getFiles({ prefix: folder });
      return files.map(file => file.name);
    } catch (error) {
      console.error('Error listing files from Google Cloud Storage:', error);
      throw error;
    }
  }

  /**
   * Bepaal content type op basis van bestandsnaam
   */
  private getContentType(fileName: string): string {
    const ext = fileName.toLowerCase().split('.').pop();
    const contentTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      heic: 'image/heic',
      pdf: 'application/pdf',
    };
    return contentTypes[ext || ''] || 'application/octet-stream';
  }
}

export const gcsStorage = new GoogleCloudStorageService();

