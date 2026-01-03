#!/usr/bin/env node
/**
 * Script om foto's van de bureaublad map te uploaden naar Google Cloud Storage
 * 
 * Gebruik: node scripts/upload-photos-to-gcs.mjs
 */

import { Storage } from '@google-cloud/storage';
import { GoogleAuth } from 'google-auth-library';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuratie
const PHOTOS_DIR = '/Users/innovarslabo/Desktop/foto\'s';
const PUBLIC_IMAGES_DIR = join(__dirname, '..', 'public', 'images');
const BUCKET_NAME = 'yannova-media'; // Pas aan naar jouw bucket naam
const PROJECT_ID = 'gen-lang-client-0141118397';

async function uploadPhotos() {
  try {
    console.log('🔐 Initialiseren Google Cloud Storage...');
    
    // Initialiseer authenticatie
    // Gebruik Application Default Credentials (ADC) of environment variables
    // Voor lokale ontwikkeling: gcloud auth application-default login
    // Voor productie: gebruik service account via environment variable GOOGLE_APPLICATION_CREDENTIALS
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      // Als GOOGLE_APPLICATION_CREDENTIALS is ingesteld, wordt dit automatisch gebruikt
      // Anders gebruikt het Application Default Credentials
    });

    const storage = new Storage({
      auth,
      projectId: PROJECT_ID,
    });

    // Controleer of bucket bestaat
    const bucket = storage.bucket(BUCKET_NAME);
    const [exists] = await bucket.exists();
    
    if (!exists) {
      console.error(`\n❌ Bucket ${BUCKET_NAME} bestaat niet!`);
      console.error(`\n📋 Volg deze stappen om de bucket aan te maken:`);
      console.error(`   1. Ga naar: https://console.cloud.google.com/storage/browser?project=${PROJECT_ID}`);
      console.error(`   2. Klik op "CREATE BUCKET"`);
      console.error(`   3. Bucket naam: ${BUCKET_NAME}`);
      console.error(`   4. Location: europe-west1 (Belgium)`);
      console.error(`   5. Storage class: Standard`);
      console.error(`   6. Access control: Uniform`);
      console.error(`   7. Klik "CREATE"`);
      console.error(`\n   Na het aanmaken, run dit script opnieuw.\n`);
      process.exit(1);
    }
    
    console.log(`✅ Bucket ${BUCKET_NAME} gevonden`);
    
    // Controleer of bucket uniform bucket-level access heeft
    const [metadata] = await bucket.getMetadata();
    const uniformBucketLevelAccess = metadata.iamConfiguration?.uniformBucketLevelAccess?.enabled;
    
    if (uniformBucketLevelAccess) {
      console.log(`ℹ️  Bucket heeft uniform bucket-level access ingeschakeld`);
      console.log(`   Bestanden worden geüpload zonder legacy ACLs`);
      console.log(`   Voor publieke toegang: gebruik IAM policies op bucket niveau`);
      console.log(`   Zie: https://console.cloud.google.com/storage/browser/${BUCKET_NAME}?project=${PROJECT_ID}`);
    }

    // Lees alle foto's uit beide mappen
    const allFiles = [];
    
    // Lees uit Desktop/foto's map (als deze bestaat)
    try {
      const desktopFiles = readdirSync(PHOTOS_DIR).filter(file => {
        const ext = extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'].includes(ext);
      });
      desktopFiles.forEach(file => {
        allFiles.push({ file, dir: PHOTOS_DIR });
      });
      console.log(`📂 ${desktopFiles.length} foto's gevonden in Desktop/fotos`);
    } catch (error) {
      console.log(`⚠️  Desktop/fotos map niet gevonden, overslaan...`);
    }
    
    // Lees uit public/images map
    try {
      const publicFiles = readdirSync(PUBLIC_IMAGES_DIR).filter(file => {
        const ext = extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'].includes(ext);
      });
      publicFiles.forEach(file => {
        allFiles.push({ file, dir: PUBLIC_IMAGES_DIR });
      });
      console.log(`📂 ${publicFiles.length} foto's gevonden in public/images`);
    } catch (error) {
      console.log(`⚠️  public/images map niet gevonden, overslaan...`);
    }

    const files = allFiles;
    console.log(`📸 Totaal ${files.length} foto's gevonden om te uploaden`);

    if (files.length === 0) {
      console.log('⚠️  Geen fotos gevonden om te uploaden');
      return;
    }

    // Upload elke foto
    const results = [];
    for (const { file: fileName, dir: sourceDir } of files) {
      const filePath = join(sourceDir, fileName);
      const stats = statSync(filePath);
      
      console.log(`\n📤 Uploaden: ${fileName} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      
      try {
        const fileContent = readFileSync(filePath);
        const gcsFileName = `images/${basename(fileName)}`;
        const file = bucket.file(gcsFileName);

        // Upload bestand (zonder legacy ACL - bucket heeft uniform bucket-level access)
        await file.save(fileContent, {
          metadata: {
            contentType: getContentType(fileName),
            cacheControl: 'public, max-age=31536000',
          },
          // Geen 'public: true' - gebruik IAM policies in plaats van ACLs
        });

        // Met uniform bucket-level access hoef je geen makePublic() te gebruiken
        // De bucket IAM policy bepaalt de toegang (zie instructies hieronder)

        const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${gcsFileName}`;
        results.push({
          fileName,
          url: publicUrl,
          size: stats.size,
          success: true,
        });

        console.log(`✅ Geüpload: ${publicUrl}`);
      } catch (error) {
        console.error(`❌ Fout bij uploaden van ${fileName}:`, error.message);
        results.push({
          fileName,
          success: false,
          error: error.message,
        });
      }
    }

    // Samenvatting
    console.log('\n📊 Samenvatting:');
    console.log(`✅ Succesvol: ${results.filter(r => r.success).length}`);
    console.log(`❌ Gefaald: ${results.filter(r => !r.success).length}`);
    
    if (results.filter(r => r.success).length > 0) {
      console.log('\n🔗 URLs:');
      results
        .filter(r => r.success)
        .forEach(r => console.log(`  - ${r.fileName}: ${r.url}`));
      
      // Check if bucket is public
      const [metadata] = await bucket.getMetadata();
      const uniformBucketLevelAccess = metadata.iamConfiguration?.uniformBucketLevelAccess?.enabled;
      
      if (uniformBucketLevelAccess) {
        console.log('\n⚠️  Let op: Bucket heeft uniform bucket-level access');
        console.log('   Om bestanden publiek te maken, voeg IAM policy toe aan bucket:');
        console.log(`   gcloud storage buckets add-iam-policy-binding gs://${BUCKET_NAME} \\`);
        console.log(`     --member=allUsers --role=roles/storage.objectViewer`);
        console.log('\n   Of via Google Cloud Console:');
        console.log(`   https://console.cloud.google.com/storage/browser/${BUCKET_NAME}?project=${PROJECT_ID}`);
        console.log('   → Permissions tab → GRANT ACCESS → allUsers → Storage Object Viewer');
      }
    }

    // Sla resultaten op in JSON (zowel root als public folder)
    const resultsPath = join(__dirname, '..', 'upload-results.json');
    const publicResultsPath = join(__dirname, '..', 'public', 'upload-results.json');
    const fs = await import('fs/promises');
    const resultsJson = JSON.stringify(results, null, 2);
    
    await fs.writeFile(resultsPath, resultsJson);
    await fs.writeFile(publicResultsPath, resultsJson);
    console.log(`\n💾 Resultaten opgeslagen in:`);
    console.log(`   - upload-results.json (root)`);
    console.log(`   - public/upload-results.json (voor browser)`);

  } catch (error) {
    console.error('❌ Fout:', error);
    process.exit(1);
  }
}

function getContentType(fileName) {
  const ext = extname(fileName).toLowerCase().slice(1);
  const types = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    heic: 'image/heic',
  };
  return types[ext] || 'application/octet-stream';
}

// Run script
uploadPhotos().catch(console.error);

