#!/usr/bin/env node
/**
 * Voer Supabase migraties direct uit via PostgreSQL connection
 * Gebruikt Service Role Key voor database toegang
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase credentials
const SUPABASE_URL = 'https://fwfkrbfozjlxmpfmagrt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZmtyYmZvempseG1wZm1hZ3J0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjYxMTMxNSwiZXhwIjoyMDgyMTg3MzE1fQ.8X2y5ioYnEjBMRTixb_5cW4cJnmDnAeIA47j9Brkq_0';
const DB_PASSWORD = 'Privet007.@.@.';

// PostgreSQL connection string
// Supabase gebruikt een pooler URL
const DB_URL = `postgresql://postgres.fwfkrbfozjlxmpfmagrt:${encodeURIComponent(DB_PASSWORD)}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`;

console.log('🚀 Supabase Migraties Uitvoeren via Directe PostgreSQL Connectie');
console.log(`📦 Project: fwfkrbfozjlxmpfmagrt\n`);

async function executeMigrations() {
  const client = new pg.Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🔌 Verbinden met database...');
    await client.connect();
    console.log('✅ Verbonden!\n');

    // Laad gecombineerd migratie bestand
    const sqlFile = join(__dirname, '..', 'scripts', 'ALL_MIGRATIONS_COMBINED.sql');
    const sql = readFileSync(sqlFile, 'utf-8');

    console.log(`📄 SQL geladen: ${sql.length} karakters`);
    console.log(`📊 Aantal regels: ${sql.split('\n').length}\n`);

    // Split SQL in individuele statements (simplified)
    // PostgreSQL kan meerdere statements uitvoeren als ze gescheiden zijn door ;
    console.log('🔄 Migraties uitvoeren...\n');

    // Voer SQL uit
    await client.query(sql);

    console.log('✅ Migraties succesvol uitgevoerd!\n');

    // Verificatie: Check of tabellen bestaan
    console.log('🔍 Verificatie...');
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('chat_sessions', 'pages', 'app_settings')
      ORDER BY table_name;
    `);

    console.log('\n✅ Gevonden tabellen:');
    tables.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    // Check functie
    const functions = await client.query(`
      SELECT routine_name 
      FROM information_schema.routines 
      WHERE routine_schema = 'public' 
      AND routine_name = 'handle_updated_at';
    `);

    if (functions.rows.length > 0) {
      console.log(`   - handle_updated_at() functie ✅`);
    }

    console.log('\n🎉 Alle migraties voltooid!');

  } catch (error) {
    console.error('\n❌ Fout bij uitvoeren migraties:');
    console.error(error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.error('\n💡 Database wachtwoord is mogelijk incorrect');
      console.error('   Check MCP config voor juiste POSTGRES_PASSWORD');
    }
    
    if (error.message.includes('does not exist')) {
      console.error('\n💡 Database bestaat mogelijk niet of is gepauzeerd');
      console.error('   Check Supabase Dashboard: https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt');
    }
    
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Check of pg package is geïnstalleerd
try {
  executeMigrations();
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error('❌ pg package niet gevonden');
    console.error('\n📦 Installeer met:');
    console.error('   npm install pg');
    console.error('\nOf voer migraties handmatig uit via Supabase Dashboard');
    process.exit(1);
  }
  throw error;
}

