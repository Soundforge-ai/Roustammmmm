import { settingsStorage, AIProvider, AppSettings } from './settingsStorage';

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const chatService = {
    async sendMessage(messages: ChatMessage[], signal?: AbortSignal): Promise<string> {
        try {
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

            // Probeer het echte AI verzoek
            let result;
            try {
                switch (provider) {
                    case 'naga':
                    case 'siliconflow':
                    case 'gemini':
                    case 'custom':
                        result = await chatService.sendOpenAICompatible(messages, config, settings.activeProvider, signal);
                        break;
                    case 'huggingface':
                        result = await chatService.sendHuggingFace(messages, config, signal);
                        break;
                    case 'cloudflare':
                        result = await chatService.sendCloudflare(messages, config, signal);
                        break;
                    default:
                        throw new Error('Onbekende provider');
                }
                console.log('ChatService - AI response successful');
                return result;
            } catch (aiError) {
                console.error('ChatService - AI request failed:', aiError);
                // Vang AI errors op en val terug op mock response
                console.warn('ChatService - Falling back to mock response due to AI error');
                return chatService.getMockResponse(messages);
            }

        } catch (error) {
            console.error('ChatService - General error:', error);
            // Als alles faalt, gebruik mock response
            console.warn('ChatService - Final fallback to mock response');
            return chatService.getMockResponse(messages);
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
        } else if (provider === 'cloudflare') {
            apiKey = (import.meta as any).env?.VITE_CLOUDFLARE_API_KEY?.trim() || '';
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
        if (!apiKey && (provider === 'naga' || provider === 'cloudflare')) {
            console.warn(`ChatService - No API key found for ${provider}. Requests might fail or fallback to mock.`);
        }

        // Log basic info (redacted)
        console.log(`ChatService - Sending request to ${provider} (Key set: ${!!apiKey})`);

        // For naga and cloudflare, warn if no valid key is set
        if ((provider === 'naga' || provider === 'cloudflare') && !apiKey) {
            console.error(`ChatService - ⚠️ No valid API key found for ${provider}. Please configure your API key in Admin Dashboard > Instellingen`);
        }

        // Cloudflare specifieke URL constructie
        let finalUrl;
        let headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (provider === 'cloudflare') {
            // Cloudflare Workers AI formaat: /accounts/{account_id}/ai/run/{model}
            const accountId = config.accountId || '7e8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d';
            const model = config.model.trim();
            finalUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
            headers['Authorization'] = `Bearer ${apiKey}`;
        } else {
            // Standaard OpenAI compatible formaat
            finalUrl = config.baseUrl;
            if (!finalUrl.endsWith('/chat/completions')) {
                finalUrl = finalUrl.replace(/\/+$/, '') + '/chat/completions';
            }
            headers['Authorization'] = `Bearer ${apiKey}`;
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
            headers: headers,
            body: JSON.stringify(body),
            signal
        });

        if (!response.ok) {
            const txt = await response.text();

            // Provide helpful error message for invalid API key
            if (response.status === 401) {
                // Retry with environment variable if we weren't already using it
                if (provider === 'naga' || provider === 'cloudflare') {
                    const envKey = provider === 'naga'
                        ? (import.meta as any).env?.VITE_GLM_API_KEY?.trim() || ''
                        : (import.meta as any).env?.VITE_CLOUDFLARE_API_KEY?.trim() || '';

                    if (envKey && envKey !== apiKey) {
                        console.log(`ChatService - Saved API key failed (401), retrying with environment variable for ${provider}...`);

                        // Maak nieuwe headers voor retry
                        let retryHeaders = { ...headers };
                        retryHeaders['Authorization'] = `Bearer ${envKey}`;

                        // Retry with environment variable
                        const retryResponse = await fetch(finalUrl, {
                            method: 'POST',
                            headers: retryHeaders,
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

        // Cloudflare specifieke response verwerking
        if (provider === 'cloudflare') {
            // Cloudflare Workers AI retourneert direct het resultaat
            if (data.result) {
                return data.result.response || data.result || 'Geen antwoord ontvangen.';
            } else {
                return data.response || 'Geen antwoord ontvangen.';
            }
        }

        // Standaard OpenAI compatible response
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
        console.log('ChatService - sendCloudflare called:', {
            hasAccountId: !!config.accountId,
            hasApiKey: !!config.apiKey,
            model: config.model,
            baseUrl: config.baseUrl
        });

        if (!config.accountId) {
            console.error('ChatService - Cloudflare Account ID ontbreekt');
            throw new Error('Cloudflare Account ID ontbreekt. Configureer dit in Admin Dashboard > Instellingen.');
        }

        if (!config.apiKey) {
            console.warn('ChatService - Cloudflare API key ontbreekt, val terug op mock response');
            return chatService.getMockResponse(messages);
        }

        const url = `${config.baseUrl}/${config.accountId}/ai/run/${config.model}`;
        console.log('ChatService - Cloudflare URL:', url);

        try {
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

            console.log('ChatService - Cloudflare response status:', response.status);

            if (!response.ok) {
                const txt = await response.text();
                console.error('ChatService - Cloudflare API error:', response.status, txt);

                // Bij 401 of andere auth errors, val terug op mock
                if (response.status === 401) {
                    console.warn('ChatService - Cloudflare auth failed, falling back to mock');
                    return chatService.getMockResponse(messages);
                }

                throw new Error(`Cloudflare API error: ${response.status} - ${txt}`);
            }

            const data = await response.json();
            console.log('ChatService - Cloudflare response data:', data);
            return data.result?.response || data.result || 'Geen antwoord ontvangen.';

        } catch (error) {
            console.error('ChatService - Cloudflare fetch error:', error);
            // Bij netwerk errors, val terug op mock response
            return chatService.getMockResponse(messages);
        }
    },

    // Intelligent Mock Response fallback system met menselijke antwoorden
    getMockResponse: (messages: ChatMessage[]): string => {
        const lastMessage = messages[messages.length - 1].content;
        const text = lastMessage.toLowerCase().trim();

        // Bepaal context van eerdere berichten
        const conversationContext = messages.slice(-5).map(m => m.content.toLowerCase()).join(' ');

        // Helper voor variatie in antwoorden
        const randomChoice = <T>(options: T[]): T => options[Math.floor(Math.random() * options.length)];

        // Helper om te detecteren of het een vraag is
        const isQuestion = text.includes('?') ||
            text.startsWith('wat') || text.startsWith('hoe') || text.startsWith('waar') ||
            text.startsWith('wanneer') || text.startsWith('waarom') || text.startsWith('kan') ||
            text.startsWith('kun') || text.startsWith('zou') || text.startsWith('is') ||
            text.startsWith('zijn') || text.startsWith('hebben') || text.startsWith('heeft');

        // === BEGROETINGEN ===
        if (/^(hallo|hey|hi|hoi|goeie|dag|goedemiddag|goedemorgen|goedenavond|hé|yo)[\s!.,]*$/i.test(text) ||
            text.includes('hallo') || text.includes('goeiedag')) {
            return randomChoice([
                "Hallo, leuk dat u contact opneemt. Waarmee kan ik u vandaag helpen?",
                "Welkom bij Yannova. Heeft u een vraag over renovatie of bouwwerken?",
                "Goedendag. Fijn dat u langskomt. Waar kan ik u mee van dienst zijn?",
                "Hallo, goed u te spreken. Wat kan ik voor u betekenen?"
            ]);
        }

        // === BEDANKJES & POSITIEF ===
        if (/^(bedankt|dank|thanks|merci|super|top|geweldig|perfect|fijn|mooi)[\s!.,]*$/i.test(text) ||
            text.includes('bedankt') || text.includes('dankjewel') || text.includes('dankuwel')) {
            return randomChoice([
                "Graag gedaan. Als u nog iets wilt weten, vraag gerust.",
                "Geen dank, daar ben ik voor. Nog vragen?",
                "Fijn dat ik kon helpen. Laat maar weten als er nog iets is.",
                "Met plezier. Mocht u later nog vragen hebben, ik sta voor u klaar."
            ]);
        }

        // === WIE/WAT BEN JIJ ===
        if (text.includes('wie ben jij') || text.includes('wat ben jij') || text.includes('wie is dit') ||
            text.includes('ben jij een robot') || text.includes('praat ik met een robot') || text.includes('ben jij echt')) {
            return randomChoice([
                "Ik ben de virtuele assistent van Yannova Bouw. Ik kan u helpen met eerste vragen over onze diensten, prijzen en planning. Voor een persoonlijk gesprek schakel ik u graag door naar mijn collega Yannick.",
                "Ik ben een slimme assistent die 24/7 klaar staat om uw vragen te beantwoorden. Ik weet veel over renovaties, ramen en gevels. Voor een persoonlijk gesprek schakel ik u graag door naar ons team.",
                "Ik ben een digitale helper van Yannova. Ik kan u wegwijs maken in onze diensten en antwoord geven op veelgestelde vragen. Complexere zaken bespreekt u best even telefonisch met ons."
            ]);
        }

        // === RAMEN & DEUREN ===
        if (text.includes('raam') || text.includes('ramen') || text.includes('deur') || text.includes('deuren') ||
            text.includes('aluplast') || text.includes('schuco') || text.includes('schüco') ||
            text.includes('pvc') || text.includes('aluminium') || text.includes('kozijn')) {

            if (text.includes('prijs') || text.includes('kost') || text.includes('euro') || text.includes('budget')) {
                return "Ah, u wilt graag weten wat nieuwe ramen kosten! Dat snap ik helemaal - het is een investering waar je goed over na moet denken.\n\n" +
                    "Om u een eerlijk beeld te geven: voor PVC-ramen rekent u gemiddeld €300-500 per m², afhankelijk van het type glas en afwerking. Aluminium is wat duurder, maar geeft wel die strakke, moderne look.\n\n" +
                    "Wat voor type woning heeft u? En heeft u al een idee hoeveel ramen u wilt vervangen? Dan kan ik u wat beter op weg helpen.";
            }

            if (text.includes('beste') || text.includes('aanrad') || text.includes('advies') || text.includes('welk')) {
                return "Goede vraag! De keuze tussen PVC en aluminium hangt echt af van wat voor u belangrijk is:\n\n" +
                    "**PVC (zoals Aluplast):**\n• Beste prijs-kwaliteit\n• Uitstekende isolatie\n• Onderhoudsarm\n• Ideaal voor klassieke woningen\n\n" +
                    "**Aluminium (zoals Schüco):**\n• Strakke, moderne uitstraling\n• Supersterk en duurzaam\n• Slankere profielen mogelijk\n• Perfect voor grote glasoppervlaktes\n\n" +
                    "Wat voor stijl heeft uw woning? Dan kan ik gerichter adviseren.";
            }

            return randomChoice([
                "Ramen en deuren zijn onze specialiteit. We werken met topmerken zoals Aluplast voor PVC en Schüco voor aluminium.\n\nWat is uw situatie precies? Wilt u bestaande ramen vervangen, of is het voor een nieuwbouw of aanbouw?",
                "Fijn dat u aan uw ramen denkt. Dat kan een wereld van verschil maken voor comfort én energiekosten.\n\nWe hebben mooie opties in zowel PVC als aluminium. Heeft u al een voorkeur, of mag ik wat vragen stellen om u te helpen kiezen?",
                "Nieuwe ramen, een goede keuze. Of het nu gaat om betere isolatie of een frissere uitstraling, we kunnen u daarbij helpen.\n\nVertel eens, gaat het om een specifieke ruimte of wilt u de hele woning aanpakken?"
            ]);
        }

        // === GEVEL & ISOLATIE ===
        if (text.includes('gevel') || text.includes('crepi') || text.includes('steenstrip') ||
            text.includes('isolatie') || text.includes('buitenmuur') || text.includes('buitengevel') ||
            text.includes('eps') || text.includes('isoleren')) {

            if (text.includes('prijs') || text.includes('kost') || text.includes('euro') || text.includes('budget') ||
                text.includes('hoeveel')) {
                return "Een eerlijk antwoord over gevelisolatie kosten:\n\n" +
                    "Een complete gevelisolatie met crepi-afwerking kost gemiddeld **€100-160 per m²**. Dat klinkt misschien veel, maar bedenk:\n\n" +
                    "• U bespaart flink op stookkosten (tot 30%)\n• Uw huis krijgt direct een nieuwe look\n• De investering verdient zichzelf terug\n• En vergeet de premies niet\n\n" +
                    "Wilt u dat wij langs komen om uw gevel te bekijken? Dan kunnen we u een concrete prijs geven. Volledig vrijblijvend.";
            }

            if (text.includes('premie') || text.includes('subsidie')) {
                return "Zeker, voor gevelisolatie kunt u de Mijn VerbouwPremie aanvragen.\n\n" +
                    "**Premies voor gevelisolatie:**\n" +
                    "• Tot €5.000 premie voor gevelisolatie\n" +
                    "• 35% van de factuur voor laagste inkomen, 25% voor middelste\n" +
                    "• Extra €8/m² als u tegelijk asbest laat verwijderen\n\n" +
                    "Wij helpen u met de aanvraag en zorgen voor alle nodige attesten.\n\n" +
                    "Heeft u al een idee van de grootte van uw gevel?";
            }

            return randomChoice([
                "Gevelwerken zijn een van de meest impactvolle verbeteringen die u aan uw woning kunt doen.\n\n" +
                "We kunnen uw gevel isoleren, nieuw bepleisteren met crepi, of een moderne steenstrip-look geven. Wat spreekt u het meeste aan?",
                "Een frisse gevel maakt een groot verschil, zowel voor het uitzicht van uw huis als voor de energierekening.\n\n" +
                "Mag ik vragen wat de reden is dat u aan uw gevel wilt werken? Isolatie, esthetiek, of beide?",
                "Goed dat u aan uw gevel denkt. Een goed geïsoleerde gevel houdt de warmte binnen én geeft uw woning een upgrade.\n\n" +
                "Wilt u weten wat de mogelijkheden zijn voor uw situatie?"
            ]);
        }

        // === RENOVATIE ALGEMEEN ===
        if (text.includes('renovatie') || text.includes('renoveren') || text.includes('verbouwen') ||
            text.includes('verbouwing') || text.includes('totaal') || text.includes('volledig') ||
            text.includes('badkamer') || text.includes('keuken') || text.includes('zolder') || text.includes('gyproc')) {

            if (text.includes('badkamer')) {
                return "Een badkamerrenovatie - dat is echt een project waar u elke dag van gaat genieten!\n\n" +
                    "We pakken alles aan: van tegels en sanitair tot elektriciteit en leidingwerk. Het fijne is dat u één aanspreekpunt heeft voor het hele project.\n\n" +
                    "Heeft u al een idee van wat u wilt? Een moderne inloopdouche, een ligbad, of beide? En hoe groot is de badkamer ongeveer?";
            }

            if (text.includes('zolder')) {
                return "Een zolder verbouwen tot leefruimte is een slimme zet! U creëert extra ruimte zonder aan te bouwen.\n\n" +
                    "We regelen de volledige uitwerking: isolatie, ramen (dakramen eventueel), elektriciteit, afwerking met Gyproc... het complete plaatje.\n\n" +
                    "Heeft u al nagedacht over wat het moet worden? Een extra slaapkamer, bureau, of speelruimte?";
            }

            return randomChoice([
                "Renoveren is een belangrijke beslissing. Bij Yannova kunt u terecht voor complete renovaties.\n\n" +
                "Wij coördineren alles, van de eerste opmeting tot de laatste afwerking. Geen gedoe met meerdere aannemers.\n\n" +
                "Wat voor project heeft u in gedachten? En in welke fase zit u: nog aan het oriënteren of al concrete plannen?",
                "Een renovatieproject, daar kunnen we u zeker bij helpen.\n\n" +
                "Of het nu gaat om een complete verbouwing of een specifieke ruimte zoals de badkamer, we denken graag met u mee.\n\n" +
                "Vertel eens, wat wilt u precies aanpakken?",
                "Renoveren doet u niet elke dag, dus ik begrijp dat u daar goed over wilt nadenken.\n\n" +
                "Wij bieden totaalrenovaties aan waarbij wij alles uit handen nemen. U heeft één vast contactpersoon, en wij zorgen voor de rest.\n\n" +
                "Zullen we vrijblijvend langskomen om de mogelijkheden te bespreken?"
            ]);
        }

        // === PRIJS / OFFERTE ALGEMEEN ===
        if (text.includes('prijs') || text.includes('kost') || text.includes('offerte') ||
            text.includes('budget') || text.includes('euro') || text.includes('duur') ||
            text.includes('hoeveel')) {

            if (text.includes('offerte')) {
                return "Natuurlijk, een offerte kunnen we voor u maken! En die is helemaal vrijblijvend.\n\n" +
                    "Zo werkt het bij ons:\n1. We komen langs voor een gratis opmeting\n2. We bespreken uw wensen en mogelijkheden\n3. Binnen een week heeft u een gedetailleerde offerte\n\n" +
                    "Wanneer zou het u schikken voor een afspraak? Of zal ik u terugbellen om dat even te plannen?";
            }

            return randomChoice([
                "Ik begrijp dat u duidelijkheid wilt over prijzen.\n\n" +
                "Bij ons krijgt u altijd eerst een vrijblijvende offerte na een opmeting. Zo weet u precies waar u aan toe bent, zonder verrassingen achteraf.\n\n" +
                "Om welk type werk gaat het precies? Dan kan ik u alvast een indicatie geven.",
                "Prijzen hangen af van wat u precies wilt, maar ik kan wel richtprijzen geven:\n\n" +
                "• Ramen: €300-600/m²\n• Gevelisolatie + crepi: €100-160/m²\n• Badkamerrenovatie: vanaf €8.000\n\n" +
                "Dit zijn indicaties. Voor een exacte prijs komen we graag langs voor een gratis en vrijblijvende opmeting.",
                "Wij werken niet met trucs of kleine lettertjes. U krijgt een duidelijke offerte met een vaste prijs.\n\n" +
                "Waar gaat uw interesse naar uit? Dan kan ik u concreter helpen."
            ]);
        }

        // === CONTACT & AFSPRAAK ===
        if (text.includes('afspraak') || text.includes('contact') || text.includes('bel') ||
            text.includes('mail') || text.includes('telefoon') || text.includes('bereik') ||
            text.includes('nummer') || text.includes('email') || text.includes('langskomen')) {
            return "U kunt ons op verschillende manieren bereiken:\n\n" +
                "**Telefonisch:** +32 489 96 00 01 (Yannick)\n" +
                "**Per e-mail:** info@yannova.be\n\n" +
                "We zijn bereikbaar van maandag tot zaterdag, van 8:00 tot 20:00.\n\n" +
                "Wilt u dat ik vraag of Yannick u terugbelt? Dan noteer ik graag uw gegevens.";
        }

        // === LOCATIE & WERKGEBIED ===
        if (text.includes('waar') && (text.includes('jullie') || text.includes('actief') || text.includes('werk')) ||
            text.includes('regio') || text.includes('werkgebied') || text.includes('buurt') ||
            text.includes('antwerpen') || text.includes('mechelen') || text.includes('zoersel') ||
            text.includes('lier') || text.includes('heist')) {
            return "We zijn gevestigd in de regio Antwerpen en werken in een ruim gebied daaromheen:\n\n" +
                "• Mechelen en omgeving\n• Zoersel, Schilde, Malle\n• Lier, Heist-op-den-Berg\n• Keerbergen, Bonheiden, Putte\n\n" +
                "Woont u iets verder weg? Neem gerust contact op. Voor grotere projecten rijden we graag wat verder.";
        }

        // === TIJDLIJN & PLANNING ===
        if (text.includes('lang duurt') || text.includes('hoe lang') || text.includes('wanneer') ||
            text.includes('wachttijd') || text.includes('planning') || text.includes('beschikbaar') ||
            text.includes('starten') || text.includes('beginnen')) {
            return "Goede vraag over de timing! Hier een realistisch beeld:\n\n" +
                "**Ramen**: Na bestelling rekenen we 6-8 weken levertijd. De plaatsing zelf gaat dan meestal in 1-2 dagen per raam.\n\n" +
                "**Gevelwerken**: Afhankelijk van de grootte, meestal 1-3 weken werk.\n\n" +
                "**Renovaties**: Dit varieert sterk - een badkamer kan in 2-3 weken, een complete renovatie duurt langer.\n\n" +
                "De actuele planning bespreekt u best even telefonisch. Momenteel kunnen we meestal binnen een paar weken starten.";
        }

        // === VENTILATIEROOSTERS ===
        if (text.includes('ventilatie') || text.includes('ventilatieroosters') || text.includes('rooster') ||
            text.includes('luchttoevoer') || text.includes('droge kamer') || text.includes('verse lucht')) {
            return "Goede vraag over ventilatie. Dit is tegenwoordig erg belangrijk voor uw premie.\n\n" +
                "**Vanaf 1 juli 2025** geldt: geen ventilatie = geen premie voor ramen en deuren. Dit geldt voor iedereen.\n\n" +
                "In droge kamers (slaapkamers, living, bureau) moeten ventilatieroosters aanwezig zijn:\n" +
                "• In het raamkozijn zelf\n• In de muur\n• Of via een mechanisch ventilatiesysteem (type B of D)\n\n" +
                "Onze ramen kunnen standaard met geïntegreerde ventilatieroosters geleverd worden, zodat u automatisch aan de premievoorwaarden voldoet.\n\n" +
                "Wilt u weten hoe dit er precies uitziet voor uw situatie?";
        }

        // === PREMIES & SUBSIDIES ===
        if (text.includes('premie') || text.includes('subsidie') || text.includes('terugbetaling') ||
            text.includes('mijn verbouw') || text.includes('steun') || text.includes('ondersteuning')) {
            return "De premies, daar helpen we graag mee.\n\n" +
                "**Mijn VerbouwPremie 2025 - Overzicht:**\n\n" +
                "• **Gevelisolatie:** tot €5.000 (35% voor laagste inkomen)\n" +
                "• **Dakisolatie:** €8-12/m², plus €8/m² extra bij asbestverwijdering\n" +
                "• **Hoogrendementsglas:** €30-50/m² (maximum €1.280)\n" +
                "• **Warmtepompen:** tot €6.000\n" +
                "• **Ramen en deuren:** premie mits ventilatieroosters aanwezig\n\n" +
                "**Let op:** Vanaf 1 juli 2025 is ventilatie verplicht voor premie op ramen en deuren.\n\n" +
                "Wij regelen alle attesten en helpen u met de aanvraag. Waar bent u in geïnteresseerd?";
        }

        // === DIENSTEN OVERZICHT ===
        if (text.includes('dienst') || text.includes('wat doen jullie') || text.includes('wat bieden') ||
            text.includes('activiteit') || text.includes('specialiteit') || text.includes('mogelijkheden')) {
            return "Bij Yannova kunt u terecht voor:\n\n" +
                "• **Ramen en Deuren** - PVC en aluminium, topmerken\n" +
                "• **Gevelwerken** - Isolatie, crepi, steenstrips\n" +
                "• **Renovaties** - Van badkamer tot volledige verbouwing\n" +
                "• **Afwerking** - Gyproc, pleisterwerk, vloeren\n\n" +
                "Kortom, alles om van uw huis een thuis te maken. Waar gaat uw interesse naar uit?";
        }

        // === JA/NEE ANTWOORDEN ===
        if (/^(ja|yes|oke|ok|oké|goed|prima|zeker|absoluut|graag|zeker weten|jawel)[\s!.,]*$/i.test(text) ||
            (text.length < 20 && (text.includes('ja') || text.includes('graag') || text.includes('prima')))) {
            return randomChoice([
                "Uitstekend. Ik geef dit door aan Yannick. Hij neemt zo snel mogelijk contact met u op.\n\nNog andere vragen in de tussentijd?",
                "Dat is genoteerd. Yannick belt u terug om alles door te spreken.\n\nKan ik u ondertussen nog ergens mee helpen?",
                "Komt voor elkaar. We nemen contact met u op.\n\nIs er nog iets anders dat ik voor u kan doen?"
            ]);
        }

        if (/^(nee|neen|no|liever niet|hoeft niet|niet nodig|laat maar)[\s!.,]*$/i.test(text) ||
            (text.length < 25 && text.includes('nee'))) {
            return randomChoice([
                "Geen probleem. U weet ons te vinden als u ons nodig heeft. Nog een fijne dag.",
                "Helemaal goed. Mocht u later toch nog vragen hebben, we staan voor u klaar.",
                "Dat is prima. Vergeet niet: we zijn bereikbaar via +32 489 96 00 01 als u ons nodig heeft."
            ]);
        }

        // === PROBLEMEN / DRINGEND ===
        if (text.includes('kapot') || text.includes('lek') || text.includes('dringend') ||
            text.includes('spoed') || text.includes('schade') || text.includes('probleem') ||
            text.includes('defect') || text.includes('stuk')) {
            return "Dat is vervelend. Voor dringende situaties belt u het beste direct naar **+32 489 96 00 01**.\n\n" +
                "Dan kunnen we meteen kijken wat er aan de hand is en hoe snel we kunnen helpen.\n\n" +
                "Kunt u in de tussentijd kort beschrijven wat er precies aan de hand is?";
        }

        // === VACATURES / WERK ===
        if (text.includes('job') || text.includes('werk') || text.includes('vacature') ||
            text.includes('sollicit') || text.includes('medewerker') || text.includes('aannemen')) {
            return "Goed dat u interesse heeft om bij ons te werken.\n\n" +
                "We zijn altijd op zoek naar gemotiveerde vakmensen. Of u nu ervaring heeft of wilt leren, stuur gerust uw CV en motivatie naar info@yannova.be.\n\n" +
                "Welke richting zou u interesseren? Ramen, gevels, of algemene renovatie?";
        }

        // === INTELLIGENTE CATCH-ALL ===
        // Analyseer de vraag beter
        if (isQuestion) {
            // Het is een vraag die we niet specifiek herkennen
            const topics = [];
            if (text.includes('kwaliteit')) topics.push('kwaliteit van ons werk');
            if (text.includes('garantie')) topics.push('garantievoorwaarden');
            if (text.includes('ervaring')) topics.push('onze ervaring');
            if (text.includes('referent')) topics.push('referenties');

            if (topics.length > 0) {
                return `Goede vraag over ${topics.join(' en ')}! Dit is iets waar Yannick u veel beter over kan vertellen.\n\n` +
                    "Zal ik vragen of hij u terugbelt? Of u kunt hem direct bereiken op +32 489 96 00 01.";
            }

            return randomChoice([
                "Hmm, dat is een specifieke vraag waar ik niet direct het antwoord op heb. Maar geen zorgen!\n\n" +
                "Yannick, onze expert, kan u hier veel beter mee helpen. Zal ik vragen of hij u terugbelt?",
                "Goede vraag! Ik wil u geen onzin vertellen, dus voor dit specifieke antwoord schakel ik u liever door naar mijn menselijke collega.\n\n" +
                "Belt u gerust naar +32 489 96 00 01, of zal ik een terugbelverzoek noteren?",
                "Daar durf ik niet zomaar antwoord op te geven - dit vraagt echt om een persoonlijk gesprek.\n\n" +
                "Kan ik uw telefoonnummer noteren zodat Yannick u kan terugbellen?"
            ]);
        }

        // Standaard response voor niet-vragen
        return randomChoice([
            "Ik begrijp dat u informatie zoekt. Om u goed te kunnen helpen, kunt u me iets meer vertellen over wat u precies wilt weten?\n\n" +
            "Of als u liever direct met iemand spreekt, bel gerust naar +32 489 96 00 01.",
            "Bedankt voor uw bericht. Om u beter van dienst te zijn, heb ik even wat meer context nodig.\n\n" +
            "Gaat het om ramen, gevels, renovatie, of iets anders? Dan kan ik gerichter helpen.",
            "Ik sta voor u klaar. Vertel me gerust meer over wat u zoekt of welke vraag u heeft.\n\n" +
            "Zo kan ik u de juiste informatie geven of u doorverwijzen naar de juiste persoon."
        ]);
    }
};
