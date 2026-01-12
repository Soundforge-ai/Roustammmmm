import { Message } from '../components/chat/Chatbot';

export interface ChatSession {
    id: string;
    startTime: Date;
    lastMessageTime: Date;
    messages: Message[];
    preview: string; // First few chars of the last user message or distinct interaction
    status: 'active' | 'closed';
    tags: string[]; // e.g., 'Lead', 'Inquiry'
}

const STORAGE_KEY = 'yannova_chat_sessions';

// localStorage opslag
const localStorageFallback = {
    getSessions: (): ChatSession[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return [];
            const parsed = JSON.parse(stored);
            return parsed.map((session: any) => ({
                ...session,
                startTime: new Date(session.startTime),
                lastMessageTime: new Date(session.lastMessageTime),
                messages: session.messages.map((m: any) => ({
                    ...m,
                    timestamp: new Date(m.timestamp)
                }))
            })).sort((a: ChatSession, b: ChatSession) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime());
        } catch (e) {
            console.error('Error reading chat sessions from localStorage', e);
            return [];
        }
    },
    saveSession: (session: ChatSession) => {
        try {
            const sessions = localStorageFallback.getSessions();
            const index = sessions.findIndex(s => s.id === session.id);
            if (index >= 0) {
                sessions[index] = session;
            } else {
                sessions.push(session);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
            window.dispatchEvent(new Event('chat-storage-updated'));
        } catch (e) {
            console.error('Error saving chat session to localStorage', e);
        }
    },
    clearAll: () => {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event('chat-storage-updated'));
    }
};

export const chatStorage = {
    // Get all sessions
    getSessions: async (): Promise<ChatSession[]> => {
        return localStorageFallback.getSessions();
    },

    // Save or update a session
    saveSession: async (session: ChatSession): Promise<void> => {
        localStorageFallback.saveSession(session);
    },

    // Helper to create a new session
    createSession: async (): Promise<ChatSession> => {
        const id = Date.now().toString();
        const session: ChatSession = {
            id,
            startTime: new Date(),
            lastMessageTime: new Date(),
            messages: [],
            preview: 'Nieuw gesprek gestart',
            status: 'active',
            tags: []
        };
        localStorageFallback.saveSession(session);
        return session;
    },

    // Clear all sessions (for debug/admin)
    clearAll: async (): Promise<void> => {
        localStorageFallback.clearAll();
    }
};
