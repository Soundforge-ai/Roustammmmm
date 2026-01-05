import { settingsStorage, AIProvider, AppSettings } from './settingsStorage';

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const chatService = {
    async sendMessage(messages: ChatMessage[], signal?: AbortSignal): Promise<string> {
        const settings = await settingsStorage.getSettings();
        const provider = settings.activeProvider;
        const config = settings.providers[provider];

        // Debug logging
        console.log('ChatService - Provider:', provider);
        console.log('ChatService - Config:', {
            model: config.model,
            hasApiKey: !!config.apiKey,
            baseUrl: config.baseUrl,
            apiKeyLength: config.apiKey?.length || 0,
            apiKeyPreview: config.apiKey ? `${config.apiKey.substring(0, 10)}...${config.apiKey.substring(config.apiKey.length - 5)}` : 'empty',
            fullConfig: config // Full config for debugging (be careful with sensitive data in production)
        });

        // Validate model is set
        if (!config.model || config.model.trim() === '') {
            console.error('ChatService - Model validation failed:', { provider, model: config.model });
            throw new Error(`Geen model ingesteld voor ${provider}. Ga naar Admin Dashboard > Instellingen om een model te selecteren.`);
        }

        if (!config.apiKey && provider !== 'naga') {
            // Fallback for naga if hardcoded key exists in env
            // But for others, throw error
            console.error('ChatService - API key validation failed:', { provider, hasApiKey: !!config.apiKey });
            throw new Error(`Geen API key ingesteld voor ${provider}. Ga naar Admin Dashboard > Instellingen om een API key in te voeren.`);
        }

        switch (provider) {
            case 'naga':
            case 'siliconflow':
            case 'gemini':
            case 'custom':
                return chatService.sendOpenAICompatible(messages, config, settings.activeProvider, signal);
            case 'huggingface':
                return chatService.sendHuggingFace(messages, config, signal);
            case 'cloudflare':
                return chatService.sendCloudflare(messages, config, signal);
            default:
                throw new Error('Onbekende provider');
        }
    },

    sendOpenAICompatible: async (messages: ChatMessage[], config: any, provider: string, signal?: AbortSignal) => {
        // Get API key - Prioritize environment variable, then saved config
        let apiKey = '';

        if (provider === 'naga') {
            apiKey = (import.meta as any).env?.VITE_GLM_API_KEY?.trim() || '';
        } else if (provider === 'gemini') {
            apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY?.trim() ||
                (import.meta as any).env?.GEMINI_API_KEY?.trim() || '';
        }

        // If no environment variable, try saved key
        if (!apiKey) {
            const savedKey = config.apiKey?.trim() || '';
            // Filter out old known invalid fallback key if present in legacy settings
            if (savedKey && savedKey !== '811527f3930042a1bbb640cb781698ed.8vd45senzrMRJmhd') {
                apiKey = savedKey;
            }
        }

        // Warning if no key found for providers that require it
        if (!apiKey && provider === 'naga') {
            console.warn('ChatService - No API key found for Naga. Requests might fail or fallback to mock.');
        }

        // Log basic info (redacted)
        console.log(`ChatService - Sending request to ${provider} (Key set: ${!!apiKey})`);



        // For naga, warn if no valid key is set
        if (provider === 'naga' && !apiKey) {
            console.error('ChatService - ⚠️ No valid API key found. Please configure your API key in Admin Dashboard > Instellingen');
        }

        const url = provider === 'gemini'
            ? `${config.baseUrl}/chat/completions`
            : `${config.baseUrl}/chat/completions`;

        // Normalize base URL if it already contains chat/completions or not
        let finalUrl = config.baseUrl;
        if (!finalUrl.endsWith('/chat/completions')) {
            finalUrl = finalUrl.replace(/\/+$/, '') + '/chat/completions';
        }

        // Ensure model is set
        if (!config.model || config.model.trim() === '') {
            throw new Error(`Model ID ontbreekt voor ${provider}. Ga naar Admin Dashboard > Instellingen om een model in te stellen.`);
        }

        const body: any = {
            model: config.model.trim(),
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
            stream: false
        };

        const response = await fetch(finalUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(body),
            signal
        });

        if (!response.ok) {
            const txt = await response.text();

            // Provide helpful error message for invalid API key
            if (response.status === 401) {
                // Retry with environment variable if we weren't already using it
                if (provider === 'naga') {
                    const envKey = (import.meta as any).env?.VITE_GLM_API_KEY?.trim() || '';
                    if (envKey && envKey !== apiKey) {
                        console.log('ChatService - Saved API key failed (401), retrying with environment variable...');
                        // Retry with environment variable
                        const retryResponse = await fetch(finalUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${envKey}`,
                            },
                            body: JSON.stringify(body),
                            signal
                        });

                        if (retryResponse.ok) {
                            const retryData = await retryResponse.json();
                            return retryData.choices?.[0]?.message?.content || 'Geen antwoord ontvangen.';
                        }
                    }
                }

                // FALLBACK TO MOCK RESPONSE
                console.warn('ChatService - 401 Unauthorized. Falling back to Mock/Demo mode.');
                return chatService.getMockResponse(messages);
            }

            throw new Error(`API error (${provider}): ${response.status} - ${txt}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'Geen antwoord ontvangen.';
    },

    sendHuggingFace: async (messages: ChatMessage[], config: any, signal?: AbortSignal) => {
        // HF Inference API usually takes a single string input for casual models, 
        // OR a list of messages for "conversational" pipeline models.
        // Let's try the conversational format for standard models like Llama-3-Instruct

        // However, many HF endpoints just want inputs.
        // We will construct a prompt.
        const prompt = messages.map(m =>
            m.role === 'user' ? `User: ${m.content}` :
                m.role === 'assistant' ? `Assistant: ${m.content}` :
                    `System: ${m.content}`
        ).join('\n') + '\nAssistant:';

        const response = await fetch(`${config.baseUrl}/${config.model}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 500,
                    return_full_text: false
                }
            }),
            signal
        });

        if (!response.ok) {
            const txt = await response.text();
            throw new Error(`HF API error: ${response.status} - ${txt}`);
        }

        const data = await response.json();
        // HF returns array [{ generated_text: "..." }]
        if (Array.isArray(data)) {
            return data[0].generated_text || 'Geen tekst gegenereerd.';
        }
        return data.generated_text || JSON.stringify(data);
    },

    sendCloudflare: async (messages: ChatMessage[], config: any, signal?: AbortSignal) => {
        if (!config.accountId) throw new Error('Cloudflare Account ID ontbreekt');

        const url = `${config.baseUrl}/${config.accountId}/ai/run/${config.model}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
                messages: messages
            }),
            signal
        });

        if (!response.ok) {
            const txt = await response.text();
            throw new Error(`Cloudflare API error: ${response.status} - ${txt}`);
        }

        const data = await response.json();
        return data.result?.response || 'Geen antwoord ontvangen.';
    },

    // Mock Response fallback system
    getMockResponse: (messages: ChatMessage[]): string => {
        const text = messages[messages.length - 1].content.toLowerCase();

        // --- SOCIAL & CHIT-CHAT ---
        if (text.includes('hallo') || text.includes('hi ') || text.includes('goeie') || text.includes('dag')) {
            return "Hallo! 👋 Welkom bij Yannova. Ik ben uw virtuele assistent. Hoe kan ik u helpen met uw renovatieplannen?";
        }
        if (text.includes('bedankt') || text.includes('dank') || text.includes('super') || text.includes('top')) {
            return "Graag gedaan! Als u nog andere vragen heeft, ben ik hier om te helpen. Een fijne dag nog!";
        }
        if (text.includes('wie ben jij') || text.includes('wat ben jij')) {
            return "Ik ben de slimme assistent van Yannova Bouw. Ik help u graag met eerste vragen, maar voor het echte vakwerk verwijs ik u door naar mijn menselijke collega's!";
        }

        // --- PRODUCTEN & DIENSTEN ---

        // Ramen & Deuren (Merken & Materialen)
        if (text.includes('raam') || text.includes('ramen') || text.includes('deur') || text.includes('aluplast') || text.includes('schuco') || text.includes('pvc') || text.includes('aluminium')) {
            return "Voor ramen en deuren zijn wij specialist! We werken met topmerken zoals Aluplast en Schüco.\n\nOf u nu kiest voor isolerend PVC of strak Aluminium, wij zorgen voor een perfecte plaatsing.\n\nVraag gerust een vrijblijvende opmeting aan via +32 489 96 00 01.";
        }

        // Gevel & Isolatie
        if (text.includes('gevel') || text.includes('crepi') || text.includes('steenstrip') || text.includes('isolatie') || text.includes('buitenmuur')) {
            return "Een nieuwe gevel geeft uw woning direct een frisse look én bespaart energie! Wij doen:\n- Gevelisolatie met crepi\n- Steenstrips\n- Gevelbepleistering\n- Gevelreiniging\n\nWilt u weten wat mogelijk is voor uw gevel?";
        }

        // Totaalrenovatie & Interieur
        if (text.includes('renovatie') || text.includes('verbouwen') || text.includes('totaal') || text.includes('badkamer') || text.includes('zolder') || text.includes('gyproc')) {
            return "Van zolder tot kelder, wij pakken het aan! Onze diensten omvatten:\n- Totaalrenovaties (A-Z)\n- Badkamerrenovaties\n- Zolderinrichting\n- Gyproc- en pleisterwerken\n\nWij coördineren alles zodat u maar één aanspreekpunt heeft.";
        }

        // Vloer & Tegels
        if (text.includes('vloer') || text.includes('tegel') || text.includes('parket') || text.includes('laminaat') || text.includes('chape')) {
            return "Ook voor vloerwerken kan u bij ons terecht. We plaatsen keramische tegels, natuursteen, en verzorgen ook de chapewerken en vloerisolatie.";
        }

        // Buitenomgeving
        if (text.includes('tuin') || text.includes('oprit') || text.includes('terras') || text.includes('klinker') || text.includes('omheining')) {
            return "Wij verzorgen ook uw buitenomgeving! Van het aanleggen van opritten en terrassen tot complete tuinaanleg en omheiningen.";
        }

        // --- PRAKTISCH ---

        // Prijzen & Offertes
        if (text.includes('prijs') || text.includes('kost') || text.includes('offerte') || text.includes('budget')) {
            return "Elk project is maatwerk, daarom komen we graag langs voor een correcte prijsbepaling. \n\nRichtprijzen (excl. BTW):\n- Ramen: €300 - €600 /m²\n- Gevelisolatie + crepi: €120 - €160 /m²\n\nZullen we een gratis afspraak inplannen voor een offerte op maat?";
        }

        // Contact & Afspraak
        if (text.includes('afspraak') || text.includes('contact') || text.includes('bel') || text.includes('mail') || text.includes('telefoon')) {
            return "U kan direct een afspraak maken:\n📞 Bel ons: +32 489 96 00 01\n📧 Mail ons: info@yannova.be\n\nWij zijn bereikbaar van ma-za, 08:00 - 20:00.";
        }

        // Locatie & Werkgebied
        if (text.includes('waar') || text.includes('adres') || text.includes('regio') || text.includes('antwerpen') || text.includes('mechelen') || text.includes('active')) {
            return "Onze uitvalsbasis is de regio Antwerpen. We werken voornamelijk in Keerbergen, Mechelen, Zoersel, Putte, Heist-op-den-Berg, Lier, Bonheiden en omliggende gemeenten.";
        }

        // Tijdlijn & Planning
        if (text.includes('lang') || text.includes('duur') || text.includes('wanneer') || text.includes('start') || text.includes('wachttijd')) {
            return "We proberen altijd zo snel mogelijk te schakelen. Voor ramen rekenen we gemiddeld 6-8 weken levertijd. Renovatieprojecten plannen we in overleg. Bel ons even voor de actuele beschikbaarheid!";
        }

        // Premies
        if (text.includes('premie') || text.includes('subsidie') || text.includes('terugbetaling')) {
            return "Zeker! Voor veel energiebesparende werken (glas, isolatie) heeft u recht op de 'Mijn VerbouwPremie'. Wij helpen u graag met het invullen van de nodige documenten.";
        }

        // Vacatures
        if (text.includes('job') || text.includes('werk') || text.includes('vacature') || text.includes('sollicit')) {
            return "We zijn altijd op zoek naar gemotiveerde vakmannen! Stuur gerust je CV en motivatie naar info@yannova.be.";
        }

        // Problemen & Dringend
        if (text.includes('kapot') || text.includes('lek') || text.includes('dringend') || text.includes('schade') || text.includes('probleem')) {
            return "Oei, dat is vervelend! Voor dringende interventies belt u best direct naar +32 489 96 00 01 zodat we snel kunnen schakelen.";
        }

        // --- BEVESTIGING & ACTIE (Voorkomt loops) ---
        // Vangt antwoorden op als "Ja graag", "Ok", "Prima" na een vraag van de bot
        if (text === 'ja' || text === 'ja graag' || text.includes('graag') || text.includes('is goed') || text.includes('ok ') || text === 'ok' || text.includes('zeker') || text.includes('prima') || text.includes('doe maar') || text.includes('graag')) {
            return "Dat is genoteerd! ✅ \n\nIk geef het door aan Yannick. Hij neemt zo snel mogelijk contact met u op om dit verder te bespreken. \n\nHeeft u intussen nog andere vragen?";
        }

        if (text === 'nee' || text.includes('nee bedankt') || text.includes('hoeft niet') || text.includes('niet nodig') || text.includes('laat maar')) {
            return "Geen probleem! U weet ons te vinden als u ons later nodig heeft. \n\nKan ik u nog ergens anders mee helpen?";
        }

        // --- CATCH-ALL ---
        // Soms vragen mensen gewoon "wat doen jullie?"
        if (text.includes('dienst') || text.includes('activiteit')) {
            return "Bij Yannova kan u terecht voor:\n- Ramen en deuren\n- Gevelwerken\n- Totaalrenovaties\n- Vloerwerken\n- Tuinaanleg\n\nKortom: alles voor uw woning!";
        }

        // Als we het echt niet weten:
        return "Dat is een specifieke vraag waar ik als virtuele assistent even het antwoord op schuldig moet blijven. \n\nMaar geen zorgen! Mijn collega Yannick weet hier alles van. \n\nZal ik vragen of hij u opbelt? Of bel ons even op +32 489 96 00 01.";
    }
};
