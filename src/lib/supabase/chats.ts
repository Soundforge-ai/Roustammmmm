import { supabase } from './client';
import { ChatSession } from '../chatStorage';

// Converteer database chat naar ChatSession type
function dbChatToChatSession(dbChat: any): ChatSession {
  return {
    id: dbChat.id,
    startTime: new Date(dbChat.start_time),
    lastMessageTime: new Date(dbChat.last_message_time),
    messages: dbChat.messages.map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp)
    })),
    preview: dbChat.preview || 'Nieuw gesprek gestart',
    status: dbChat.status as 'active' | 'closed',
    tags: dbChat.tags || []
  };
}

// Haal alle chat sessies op
export async function getChatSessions(): Promise<ChatSession[]> {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .order('last_message_time', { ascending: false });

  if (error) {
    console.error('Error fetching chat sessions:', error);
    throw error;
  }

  return data ? data.map(dbChatToChatSession) : [];
}

// Haal een specifieke chat sessie op
export async function getChatSession(id: string): Promise<ChatSession | null> {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching chat session:', error);
    throw error;
  }

  return data ? dbChatToChatSession(data) : null;
}

// Sla een chat sessie op of update
export async function saveChatSession(session: ChatSession): Promise<ChatSession> {
  const { data, error } = await supabase
    .from('chat_sessions')
    .upsert({
      id: session.id,
      start_time: session.startTime.toISOString(),
      last_message_time: session.lastMessageTime.toISOString(),
      messages: session.messages.map(m => ({
        ...m,
        timestamp: m.timestamp.toISOString()
      })),
      preview: session.preview,
      status: session.status,
      tags: session.tags
    }, {
      onConflict: 'id'
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving chat session:', error);
    throw error;
  }

  return dbChatToChatSession(data);
}

// Maak een nieuwe chat sessie aan
export async function createChatSession(): Promise<ChatSession> {
  const id = Date.now().toString();
  const now = new Date();
  
  const newSession: ChatSession = {
    id,
    startTime: now,
    lastMessageTime: now,
    messages: [],
    preview: 'Nieuw gesprek gestart',
    status: 'active',
    tags: []
  };

  return await saveChatSession(newSession);
}

// Verwijder een chat sessie
export async function deleteChatSession(id: string): Promise<void> {
  const { error } = await supabase
    .from('chat_sessions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting chat session:', error);
    throw error;
  }
}

// Verwijder alle chat sessies
export async function clearAllChatSessions(): Promise<void> {
  const { error } = await supabase
    .from('chat_sessions')
    .delete()
    .neq('id', '0'); // Delete all (id can never be '0')

  if (error) {
    console.error('Error clearing chat sessions:', error);
    throw error;
  }
}

