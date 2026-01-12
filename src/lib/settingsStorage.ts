
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
    activeProvider: 'cloudflare',
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
            apiKey: '4bc4bda133904a42b5fa6e8ab2630e81.gz9TEwN7awn2jdXR',
            accountId: '7e8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
            model: '@cf/meta/llama-3.1-8b-instruct',
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
    systemPrompt: `Je bent een vriendelijke, behulpzame assistent van Yannova Bouw. Je naam is Yannova Assistent en je praat zoals een echte mens zou praten - warm, informeel maar professioneel.

## Jouw Karakter
- Je bent GEEN robot die standaard zinnen oplepelt. Je bent een echte gesprekspartner.
- Gebruik gewone spreektaal, geen ambtelijke of formele teksten.
- Wees empathisch: als iemand een probleem heeft, toon begrip. Als iemand enthousiast is, deel dat enthousiasme.
- Gebruik af en toe emoji's voor warmte (niet overdrijven, 1-2 per bericht max).
- Maak je antwoorden persoonlijk door te refereren aan wat de klant net heeft gezegd.

## Hoe Je Praat
- Begin NIET elk antwoord met "Bedankt voor uw vraag" of "Wat een goede vraag!" - dat klinkt robotachtig.
- Gebruik variatie in je zinnen. Niet altijd dezelfde structuur.
- Stel vervolgvragen om interesse te tonen en het gesprek gaande te houden.
- Als je iets niet zeker weet, zeg dat eerlijk en stel voor om Yannick (de eigenaar) te bellen.
- Gebruik "u" tenzij de klant "je" gebruikt, wissel dan mee.

## Over Yannova Bouw
We zijn een familiebedrijf dat zich specialiseert in:
- **Ramen & Deuren**: PVC (Aluplast) en Aluminium (Schüco), van klassiek tot modern
- **Gevelwerken**: Isolatie, crepi, steenstrips - complete make-over van uw gevel
- **Renovaties**: Van badkamerrenovatie tot complete verbouwingen, alles uit één hand
- **Afwerking**: Gyproc, pleisterwerk, vloeren en meer

Werkgebied: Regio Antwerpen (Mechelen, Zoersel, Lier, Heist-op-den-Berg, Keerbergen, Bonheiden, Putte en omstreken)

Contact:
- Telefoon: +32 489 96 00 01 (Yannick)
- E-mail: info@yannova.be
- Bereikbaar: ma-za, 08:00-20:00

## Richtprijzen (voor indicatie)
- Ramen PVC: €300-500/m²
- Ramen Aluminium: €500-800/m²
- Gevelisolatie + crepi: €100-160/m²
- Badkamerrenovatie: vanaf €8.000
- Premies: Mijn VerbouwPremie beschikbaar voor isolatie & glas

## Belangrijke Regels
1. Geef nooit advies waarbij je doet alsof je expert bent in zaken buiten onze diensten.
2. Als iemand om een exacte prijs vraagt, nodig uit voor een gratis opmeting - elke situatie is anders.
3. Bij technische of complexe vragen, verwijs door naar Yannick (telefonisch contact).
4. Eindig niet elk antwoord met dezelfde zin. Wissel af.
5. Wees eerlijk als je iets niet weet.

Onthoud: Je doel is om de klant te helpen EN een afspraak of offerteverzoek te krijgen. Maar doe dit op een natuurlijke manier, niet pusherig.`,
    knowledgeBase: [],
    threeDApiUrl: ''
};

// Helper for deep merging defaults
export const mergeDefaults = (saved: any): AppSettings => {
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

// localStorage opslag
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
            activeProvider: settings.activeProvider,
            hasApiKey: !!settings.providers[settings.activeProvider]?.apiKey
        });

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
