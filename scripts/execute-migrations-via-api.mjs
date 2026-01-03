#!/usr/bin/env node
/**
 * Voer Supabase migraties uit via REST API
 * Gebruikt Service Role Key voor directe database toegang
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase credentials uit MCP
const SUPABASE_URL = 'https://fwfkrbfozjlxmpfmagrt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZmtyYmZvempseG1wZm1hZ3J0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjYxMTMxNSwiZXhwIjoyMDgyMTg3MzE1fQ.8X2y5ioYnEjBMRTixb_5cW4cJnmDnAeIA47j9Brkq_0';

console.log('🚀 Supabase Migraties Uitvoeren via REST API');
console.log(`📦 Project: fwfkrbfozjlxmpfmagrt`);
console.log(`🔗 URL: ${SUPABASE_URL}\n`);

/**
 * Voer SQL query uit via Supabase REST API (PostgREST)
 * Let op: Dit werkt alleen voor SELECT queries, niet voor DDL (CREATE TABLE, etc.)
 */
async function executeSQLViaRPC(sql) {
  // Supabase REST API ondersteunt geen directe SQL execution voor security
  // We moeten gebruik maken van een RPC functie of directe database connectie
  
  console.log('⚠️  Supabase REST API ondersteunt geen directe SQL execution');
  console.log('📝 Migraties moeten worden uitgevoerd via:');
  console.log('   1. Supabase Dashboard SQL Editor (aanbevolen)');
  console.log('   2. Supabase CLI (vereist juiste access token)');
  console.log('   3. Directe PostgreSQL connectie\n');
  
  return false;
}

/**
 * Probeer migraties uit te voeren via Supabase Management API
 */
async function executeViaManagementAPI() {
  console.log('🔍 Probeer via Management API...\n');
  
  // Supabase Management API vereist een specifiek access token formaat
  // Het token in MCP is niet het juiste formaat voor Management API
  
  console.log('⚠️  Management API vereist een `sbp_` access token');
  console.log('   Het huidige token is niet in het juiste formaat\n');
  
  return false;
}

/**
 * Main functie
 */
async function main() {
  const migrationFile = join(__dirname, '..', 'supabase', 'migrations', 'ALL_MIGRATIONS_COMBINED.sql');
  
  try {
    // Check of gecombineerd bestand bestaat, anders gebruik individuele migraties
    let sql;
    try {
      sql = readFileSync(join(__dirname, '..', 'scripts', 'ALL_MIGRATIONS_COMBINED.sql'), 'utf-8');
      console.log('✅ Gecombineerd migratie bestand geladen\n');
    } catch (e) {
      console.log('📋 Laad individuele migratie bestanden...\n');
      
      const migrations = [
        '000_shared_functions.sql',
        '003_create_chats_table.sql',
        '004_create_pages_table.sql',
        '005_create_settings_table.sql',
      ];
      
      sql = migrations.map(file => {
        const content = readFileSync(
          join(__dirname, '..', 'supabase', 'migrations', file),
          'utf-8'
        );
        return `-- ${file}\n${content}\n`;
      }).join('\n');
    }
    
    console.log(`📊 SQL lengte: ${sql.length} karakters`);
    console.log(`📄 Aantal regels: ${sql.split('\n').length}\n`);
    
    // Probeer via verschillende methoden
    console.log('🔄 Probeer migraties uit te voeren...\n');
    
    const viaRPC = await executeSQLViaRPC(sql);
    if (viaRPC) {
      console.log('✅ Migraties uitgevoerd via REST API!');
      return;
    }
    
    const viaManagement = await executeViaManagementAPI();
    if (viaManagement) {
      console.log('✅ Migraties uitgevoerd via Management API!');
      return;
    }
    
    // Fallback: Toon instructies
    console.log('📋 HANDMATIGE UITVOERING NODIG\n');
    console.log('Supabase API ondersteunt geen directe SQL execution voor security redenen.');
    console.log('Je moet de migraties handmatig uitvoeren:\n');
    console.log('1. Ga naar: https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt');
    console.log('2. Klik op "SQL Editor"');
    console.log('3. Open: scripts/ALL_MIGRATIONS_COMBINED.sql');
    console.log('4. Kopieer ALLE inhoud en plak in SQL Editor');
    console.log('5. Klik op "Run"\n');
    console.log('💡 Of gebruik Supabase CLI met juiste access token\n');
    
  } catch (error) {
    console.error('❌ Fout:', error.message);
    process.exit(1);
  }
}

main();

