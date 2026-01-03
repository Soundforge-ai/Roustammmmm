
export interface KnowledgeDocument {
    id: string;
    name: string;
    content: string;
    type: string;
    uploadDate: Date;
}

export type AIProvider = 'naga' | 'huggingface' | 'cloudflare' | 'gemini' | 'siliconflow' | 'custom';

export interface ProviderConfig {
    apiKey: string;
    model: string;
    baseUrl?: string;
    accountId?: string; // For Cloudflare
}

export interface AppSettings {
    activeProvider: AIProvider;
    providers: Record<AIProvider, ProviderConfig>;
    botName: string;
    systemPrompt: string;
    knowledgeBase: KnowledgeDocument[];
    threeDApiUrl?: string; // URL for the external 3D generator (e.g., ngrok from Colab)
}

const SETTINGS_KEY = 'yannova_app_settings';

export const defaultSettings: AppSettings = {
    activeProvider: 'naga',
    providers: {
        naga: {
            apiKey: '',
            model: 'glm-4.5', // Default model for Naga
            baseUrl: 'https://api.naga.ac/v1'
        },
        huggingface: {
            apiKey: '',
            model: 'meta-llama/Meta-Llama-3-8B-Instruct',
            baseUrl: 'https://api-inference.huggingface.co/models'
        },
        cloudflare: {
            apiKey: '',
            accountId: '',
            model: '@cf/meta/llama-3-8b-instruct',
            baseUrl: 'https://api.cloudflare.com/client/v4/accounts'
        },
        gemini: {
            apiKey: '',
            model: 'gemini-1.5-flash',
            baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai'
        },
        siliconflow: {
            apiKey: '',
            model: 'nex-agi/DeepSeek-V3.1-Nex-N1',
            baseUrl: 'https://api.siliconflow.com/v1'
        },
        custom: {
            apiKey: '',
            model: '',
            baseUrl: ''
        }
    },
    botName: 'Yannova Assistent',
    systemPrompt: `Je bent een vriendelijke en behulpzame assistent voor Yannova, een Belgisch bouw- en renovatiebedrijf.

Over Yannova:
- Gespecialiseerd in: ramen en deuren, renovaties, isolatiewerken, gevelwerken en crepi
- Contact: +32 489 96 00 01, info@yannova.be

Instructies:
- Antwoord altijd in het Nederlands
- Wees vriendelijk en professioneel
- Houd antwoorden kort en bondig
- Beantwoord vragen direct met behulpzame informatie
- Verwijs alleen naar WhatsApp of telefoon als de gebruiker daar expliciet om vraagt, of als je echt niet verder kunt helpen
- Probeer eerst zelf de vraag te beantwoorden voordat je naar contactgegevens verwijst`,
    knowledgeBase: [],
    threeDApiUrl: ''
};

// Helper for deep merging defaults
export const mergeDefaults = (saved: any): AppSettings => {
    // If old format (no providers object), migrate
    const base = { ...defaultSettings };

    // Check if it's the old format with top-level apiKey
    if (saved.apiKey && !saved.providers) {
        base.providers.naga.apiKey = saved.apiKey;
    }

    if (saved.botName) base.botName = saved.botName;
    if (saved.systemPrompt) base.systemPrompt = saved.systemPrompt;
    if (saved.knowledgeBase) base.knowledgeBase = saved.knowledgeBase.map((d: any) => ({
        ...d,
        uploadDate: new Date(d.uploadDate)
    }));
    if (saved.activeProvider) base.activeProvider = saved.activeProvider;
    if (saved.threeDApiUrl) base.threeDApiUrl = saved.threeDApiUrl;

    // Merge providers
    if (saved.providers) {
        (Object.keys(defaultSettings.providers) as AIProvider[]).forEach(key => {
            if (saved.providers[key]) {
                base.providers[key] = {
                    ...defaultSettings.providers[key],
                    ...saved.providers[key]
                };
            }
        });
    }

    return base;
};

import * as supabaseSettings from './supabase/settings';

let useSupabase = true; // Try Supabase first

// Fallback naar localStorage
const localStorageFallback = {
    getSettings: (): AppSettings => {
        try {
            const stored = localStorage.getItem(SETTINGS_KEY);
            console.log('localStorageFallback.getSettings - Raw stored value:', stored ? 'exists' : 'empty');
            
            if (!stored) {
                console.log('localStorageFallback.getSettings - No stored value, returning defaults');
                return defaultSettings;
            }
            
            const parsed = JSON.parse(stored);
            console.log('localStorageFallback.getSettings - Parsed data:', {
                activeProvider: parsed.activeProvider,
                hasProviders: !!parsed.providers,
                providersKeys: parsed.providers ? Object.keys(parsed.providers) : [],
                nagaApiKey: parsed.providers?.naga?.apiKey ? `${parsed.providers.naga.apiKey.substring(0, 10)}...${parsed.providers.naga.apiKey.substring(parsed.providers.naga.apiKey.length - 5)}` : 'empty',
                nagaApiKeyLength: parsed.providers?.naga?.apiKey?.length || 0
            });
            
            const merged = mergeDefaults(parsed);
            console.log('localStorageFallback.getSettings - Merged result:', {
                activeProvider: merged.activeProvider,
                hasNagaApiKey: !!merged.providers.naga?.apiKey,
                nagaApiKeyLength: merged.providers.naga?.apiKey?.length || 0,
                nagaApiKeyPreview: merged.providers.naga?.apiKey ? `${merged.providers.naga.apiKey.substring(0, 10)}...${merged.providers.naga.apiKey.substring(merged.providers.naga.apiKey.length - 5)}` : 'empty'
            });
            
            return merged;
        } catch (e) {
            console.error('localStorageFallback.getSettings - Error reading from localStorage', e);
            return defaultSettings;
        }
    },
    saveSettings: (settings: AppSettings) => {
        try {
            console.log('localStorageFallback.saveSettings - Saving:', {
                activeProvider: settings.activeProvider,
                hasNagaApiKey: !!settings.providers.naga?.apiKey,
                nagaApiKeyLength: settings.providers.naga?.apiKey?.length || 0,
                nagaApiKeyPreview: settings.providers.naga?.apiKey ? `${settings.providers.naga.apiKey.substring(0, 10)}...${settings.providers.naga.apiKey.substring(settings.providers.naga.apiKey.length - 5)}` : 'empty'
            });
            
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
            console.log('localStorageFallback.saveSettings - Successfully saved to localStorage');
            
            // Verify it was saved correctly
            const verify = localStorage.getItem(SETTINGS_KEY);
            if (verify) {
                const parsed = JSON.parse(verify);
                console.log('localStorageFallback.saveSettings - Verification - saved naga API key:', {
                    hasApiKey: !!parsed.providers?.naga?.apiKey,
                    apiKeyLength: parsed.providers?.naga?.apiKey?.length || 0,
                    apiKeyPreview: parsed.providers?.naga?.apiKey ? `${parsed.providers.naga.apiKey.substring(0, 10)}...${parsed.providers.naga.apiKey.substring(parsed.providers.naga.apiKey.length - 5)}` : 'empty'
                });
            }
            
            window.dispatchEvent(new Event('settings-updated'));
        } catch (e) {
            console.error('localStorageFallback.saveSettings - Error saving to localStorage', e);
        }
    }
};

export const settingsStorage = {
    getSettings: async (): Promise<AppSettings> => {
        console.log('settingsStorage.getSettings - Starting...', { useSupabase });
        
        if (useSupabase) {
            try {
                const settings = await supabaseSettings.getSettings();
                console.log('settingsStorage.getSettings - Supabase settings loaded:', {
                    activeProvider: settings.activeProvider,
                    hasNagaApiKey: !!settings.providers.naga?.apiKey,
                    nagaApiKeyLength: settings.providers.naga?.apiKey?.length || 0,
                    nagaApiKeyPreview: settings.providers.naga?.apiKey ? `${settings.providers.naga.apiKey.substring(0, 10)}...${settings.providers.naga.apiKey.substring(settings.providers.naga.apiKey.length - 5)}` : 'empty'
                });
                return settings;
            } catch (e) {
                console.warn('Supabase not available, falling back to localStorage', e);
                useSupabase = false;
                const localSettings = localStorageFallback.getSettings();
                console.log('settingsStorage.getSettings - LocalStorage settings loaded:', {
                    activeProvider: localSettings.activeProvider,
                    hasNagaApiKey: !!localSettings.providers.naga?.apiKey,
                    nagaApiKeyLength: localSettings.providers.naga?.apiKey?.length || 0
                });
                return localSettings;
            }
        }
        
        const localSettings = localStorageFallback.getSettings();
        console.log('settingsStorage.getSettings - LocalStorage settings loaded:', {
            activeProvider: localSettings.activeProvider,
            hasNagaApiKey: !!localSettings.providers.naga?.apiKey,
            nagaApiKeyLength: localSettings.providers.naga?.apiKey?.length || 0
        });
        return localSettings;
    },

    saveSettings: async (settings: AppSettings): Promise<void> => {
        console.log('settingsStorage.saveSettings - Starting save...', {
            useSupabase,
            activeProvider: settings.activeProvider,
            hasApiKey: !!settings.providers[settings.activeProvider]?.apiKey
        });

        if (useSupabase) {
            try {
                console.log('settingsStorage.saveSettings - Attempting Supabase save...');
                await supabaseSettings.saveSettings(settings);
                console.log('settingsStorage.saveSettings - Supabase save successful!');
                window.dispatchEvent(new Event('settings-updated'));
                return;
            } catch (e: any) {
                console.error('settingsStorage.saveSettings - Supabase save failed:', {
                    message: e.message,
                    code: e.code,
                    details: e.details,
                    hint: e.hint,
                    fullError: e
                });
                console.warn('Supabase not available, falling back to localStorage', e);
                useSupabase = false;
            }
        }
        
        console.log('settingsStorage.saveSettings - Using localStorage fallback...');
        try {
            localStorageFallback.saveSettings(settings);
            console.log('settingsStorage.saveSettings - localStorage save successful!');
        } catch (e) {
            console.error('settingsStorage.saveSettings - localStorage save also failed:', e);
            throw new Error(`Kon instellingen niet opslaan: ${e instanceof Error ? e.message : 'Onbekende fout'}`);
        }
    },

    getFullSystemPrompt: async (): Promise<string> => {
        const settings = await settingsStorage.getSettings();
        let prompt = settings.systemPrompt;

        if (settings.knowledgeBase.length > 0) {
            prompt += '\n\nExtra Kennisbasis (gebruik deze informatie om vragen te beantwoorden):\n\n';
            settings.knowledgeBase.forEach(doc => {
                prompt += `--- Bestand: ${doc.name} ---\n${doc.content}\n\n`;
            });
        }

        prompt += `\n\nJouw naam is ${settings.botName}.`;

        return prompt;
    }
};
