/**
 * Migratie script om bestaande localStorage data naar Supabase te verplaatsen
 * 
 * Gebruik: Roep migrateAll() aan vanuit de browser console of bij app startup
 */

import * as supabaseChats from './supabase/chats';
import * as supabasePages from './supabase/pages';
import * as supabaseSettings from './supabase/settings';
import { ChatSession } from './chatStorage';
import { PageData } from './pageStorage';
import { AppSettings } from './settingsStorage';

const STORAGE_KEYS = {
  chats: 'yannova_chat_sessions',
  pages: 'yannova_pages',
  settings: 'yannova_app_settings',
  media: 'yannova_media'
};

export async function migrateChats(): Promise<number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.chats);
    if (!stored) return 0;

    const sessions: ChatSession[] = JSON.parse(stored).map((s: any) => ({
      ...s,
      startTime: new Date(s.startTime),
      lastMessageTime: new Date(s.lastMessageTime),
      messages: s.messages.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }))
    }));

    let migrated = 0;
    for (const session of sessions) {
      try {
        await supabaseChats.saveChatSession(session);
        migrated++;
      } catch (error) {
        console.error(`Error migrating chat session ${session.id}:`, error);
      }
    }

    return migrated;
  } catch (error) {
    console.error('Error migrating chats:', error);
    return 0;
  }
}

export async function migratePages(): Promise<number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.pages);
    if (!stored) return 0;

    const pages: PageData[] = JSON.parse(stored).map((p: any) => ({
      ...p,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt)
    }));

    let migrated = 0;
    for (const page of pages) {
      try {
        await supabasePages.savePage(page);
        migrated++;
      } catch (error) {
        console.error(`Error migrating page ${page.id}:`, error);
      }
    }

    return migrated;
  } catch (error) {
    console.error('Error migrating pages:', error);
    return 0;
  }
}

export async function migrateSettings(): Promise<boolean> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.settings);
    if (!stored) return false;

    const settings: AppSettings = JSON.parse(stored);
    await supabaseSettings.saveSettings(settings);
    return true;
  } catch (error) {
    console.error('Error migrating settings:', error);
    return false;
  }
}

export async function migrateAll(): Promise<{
  chats: number;
  pages: number;
  settings: boolean;
}> {
  console.log('Starting migration to Supabase...');
  
  const results = {
    chats: await migrateChats(),
    pages: await migratePages(),
    settings: await migrateSettings()
  };

  console.log('Migration complete:', results);
  return results;
}

// Auto-migrate on import (optional - can be disabled)
// migrateAll().catch(console.error);

