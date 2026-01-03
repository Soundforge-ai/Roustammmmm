#!/usr/bin/env node

/**
 * Script om Google Business Profile te updaten via API
 * 
 * Vereisten:
 * 1. Google Business Profile API moet geactiveerd zijn
 * 2. OAuth 2.0 credentials nodig
 * 3. Service account of OAuth flow setup
 * 
 * Gebruik:
 *   node scripts/update-google-business-profile.mjs
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuratie
const CONFIG = {
  // Nieuwe website URL
  websiteUrl: 'https://www.yannova.be',
  
  // Nieuw adres in Keerbergen
  address: {
    streetAddress: 'Keerbergen', // Vervang met exact adres indien beschikbaar
    addressLocality: 'Keerbergen',
    addressRegion: 'Vlaams-Brabant',
    postalCode: '3140',
    addressCountry: 'BE'
  },
  
  // Coördinaten Keerbergen
  coordinates: {
    lat: 51.0031,
    lng: 4.6314
  }
};

/**
 * Laad OAuth credentials uit environment variables of credentials file
 */
function loadCredentials() {
  // Optie 1: Environment variables
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_BUSINESS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_BUSINESS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_BUSINESS_REFRESH_TOKEN;
  
  if (clientId && clientSecret && refreshToken) {
    return {
      clientId,
      clientSecret,
      refreshToken
    };
  }
  
  // Optie 2: Credentials file
  try {
    const credentialsPath = join(__dirname, '../google-business-credentials.json');
    const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
    return credentials;
  } catch (error) {
    console.error('❌ Geen credentials gevonden!');
    console.error('');
    console.error('📋 Setup instructies:');
    console.error('   1. Maak een OAuth 2.0 Client ID in Google Cloud Console');
    console.error('   2. Activeer Google Business Profile API');
    console.error('   3. Zet credentials in environment variables:');
    console.error('      export GOOGLE_BUSINESS_CLIENT_ID="your-client-id"');
    console.error('      export GOOGLE_BUSINESS_CLIENT_SECRET="your-client-secret"');
    console.error('      export GOOGLE_BUSINESS_REFRESH_TOKEN="your-refresh-token"');
    console.error('');
    console.error('   Of maak een google-business-credentials.json bestand met:');
    console.error('   {');
    console.error('     "clientId": "your-client-id",');
    console.error('     "clientSecret": "your-client-secret",');
    console.error('     "refreshToken": "your-refresh-token"');
    console.error('   }');
    process.exit(1);
  }
}

/**
 * Update Google Business Profile via API
 */
async function updateBusinessProfile() {
  console.log('🚀 Google Business Profile Updater');
  console.log('===================================\n');
  
  // Laad credentials
  const credentials = loadCredentials();
  console.log('✅ Credentials geladen\n');
  
  // Setup OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    credentials.clientId,
    credentials.clientSecret,
    'urn:ietf:wg:oauth:2.0:oob' // Redirect URI voor CLI
  );
  
  oauth2Client.setCredentials({
    refresh_token: credentials.refreshToken
  });
  
  // Google Business Profile API client
  // Note: De exacte API naam kan variëren - check Google's documentatie
  const businessProfile = google.mybusinessaccountmanagement({
    version: 'v1',
    auth: oauth2Client
  });
  
  try {
    console.log('📋 Nieuwe configuratie:');
    console.log(`   Website: ${CONFIG.websiteUrl}`);
    console.log(`   Adres: ${CONFIG.address.streetAddress}, ${CONFIG.address.postalCode} ${CONFIG.address.addressLocality}`);
    console.log(`   Coördinaten: ${CONFIG.coordinates.lat}, ${CONFIG.coordinates.lng}\n`);
    
    // Note: De Google Business Profile API vereist specifieke setup
    // Dit is een template - pas aan op basis van de actuele API documentatie
    console.log('⚠️  BELANGRIJK:');
    console.log('   De Google Business Profile API vereist:');
    console.log('   1. Actieve Google Business Profile');
    console.log('   2. OAuth 2.0 met juiste scopes');
    console.log('   3. Account verificatie');
    console.log('');
    console.log('   Voor handmatige update:');
    console.log('   1. Ga naar https://www.google.com/business/');
    console.log('   2. Selecteer je bedrijf');
    console.log('   3. Klik op "Informatie"');
    console.log('   4. Update adres en website URL');
    console.log('');
    
    // Als je de API wilt gebruiken, uncomment en pas aan:
    /*
    const accounts = await businessProfile.accounts.list();
    console.log('Accounts:', accounts.data);
    
    // Update business profile
    // Pas dit aan op basis van de actuele API structuur
    */
    
    console.log('✅ Script voltooid');
    console.log('');
    console.log('📝 Volgende stappen:');
    console.log('   1. Test de redirects: ./scripts/test-301-redirects.sh');
    console.log('   2. Update Google Business Profile handmatig via web interface');
    console.log('   3. Verifieer dat het adres correct is in Google Maps');
    
  } catch (error) {
    console.error('❌ Fout bij updaten:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    process.exit(1);
  }
}

// Run script
updateBusinessProfile().catch(console.error);

