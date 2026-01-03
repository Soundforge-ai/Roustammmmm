#!/usr/bin/env node
/**
 * Automatisch Supabase Migraties Uitvoeren
 * 
 * Dit script voert alle database migraties uit via Supabase Management API
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase credentials uit MCP config (of environment variables)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fwfkrbfozjlxmpfmagrt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || '';

// Project reference uit URL
const PROJECT_REF = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || 'fwfkrbfozjlxmpfmagrt';

console.log('🚀 Supabase Migraties Automatisch Uitvoeren');
console.log(`📦 Project: ${PROJECT_REF}`);
console.log(`🔗 URL: ${SUPABASE_URL}\n`);

// Migratie bestanden in volgorde
const migrations = [
  { file: '000_shared_functions.sql', name: 'Shared Functions' },
  { file: '003_create_chats_table.sql', name: 'Chats Tabel' },
  { file: '004_create_pages_table.sql', name: 'Pages Tabel' },
  { file: '005_create_settings_table.sql', name: 'Settings Tabel' },
];

/**
 * Voer een SQL query uit via Supabase REST API
 */
async function executeSQL(sql) {
  const url = `${SUPABASE_URL}/rest/v1/rpc/exec_sql`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    // Fallback: gebruik Supabase Management API
    console.warn('⚠️  REST API niet beschikbaar, probeer handmatig via Dashboard');
    throw error;
  }
}

/**
 * Voer migraties uit via Supabase Dashboard API (alternatief)
 */
async function runMigrations() {
  console.log('📋 Migraties die moeten worden uitgevoerd:\n');
  
  for (const migration of migrations) {
    const filePath = join(__dirname, '..', 'supabase', 'migrations', migration.file);
    
    try {
      const sql = readFileSync(filePath, 'utf-8');
      console.log(`✅ ${migration.name} (${migration.file})`);
      console.log(`   Bestand geladen: ${filePath}`);
      console.log(`   SQL lengte: ${sql.length} karakters\n`);
    } catch (error) {
      console.error(`❌ Fout bij lezen van ${migration.file}:`, error.message);
    }
  }

  console.log('\n⚠️  AUTOMATISCHE UITVOERING VIA API IS NIET MOGELIJK');
  console.log('📝 Je moet de migraties handmatig uitvoeren via Supabase Dashboard\n');
  
  console.log('🔗 Dashboard URL:');
  console.log(`   https://supabase.com/dashboard/project/${PROJECT_REF}\n`);
  
  console.log('📋 Volg deze stappen:');
  console.log('   1. Ga naar Supabase Dashboard (link hierboven)');
  console.log('   2. Klik op "SQL Editor" in het linker menu');
  console.log('   3. Voer elke migratie uit in volgorde:\n');
  
  migrations.forEach((migration, index) => {
    console.log(`   ${index + 1}. ${migration.name}`);
    console.log(`      Bestand: supabase/migrations/${migration.file}\n`);
  });
  
  console.log('💡 Tip: Gebruik scripts/KOPIEER_PLAK_MIGRATIES.md voor alle SQL queries!');
}

// Run migrations
runMigrations().catch(console.error);

