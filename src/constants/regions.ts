import { CityData } from './types';

export const CITIES: Record<string, CityData> = {
    zoersel: {
        name: 'Zoersel',
        zip: '2980',
        description: 'Specialist in ramen, deuren en renovaties in Zoersel en deelgemeenten. Lokale vakmannen, snelle service.',
        longDescription: 'Yannova Bouw is uw betrouwbare partner voor alle bouw- en renovatiewerken in Zoersel. Met ons kantoor in de regio kennen wij de lokale bouwstijlen en voorschriften als geen ander. Of u nu woont in het centrum van Zoersel, in Halle of Sint-Antonius, wij staan voor u klaar met vakkundige service.',
        coordinates: { lat: 51.2667, lng: 4.6167 },
        deelgemeenten: ['Halle', 'Sint-Antonius'],
        landmarks: ['Kasteel van Zoersel', 'Zoerselbos', 'Gemeentehuis Zoersel'],
        population: '22.000',
        // UNIEKE CONTENT ZOERSEL
        content: {
            localIntro: "Zoersel combineert landelijk wonen met moderne villawijken. Veel woningen uit de jaren '60-'80 zijn toe aan een grondige renovatie. Wij kennen de typische Kempense bouwstijl en helpen u graag met ramen, gevels of een complete verbouwing.",
            localUSPs: [
                "Bekend met de bouwstijlen van Zoersel, Halle en Sint-Antonius",
                "Korte aanrijtijden vanuit ons kantoor in de regio",
                "Ervaring met renovaties nabij natuurgebied Zoerselbos",
                "Persoonlijk contact met de zaakvoerder"
            ],
            serviceHighlights: {
                ramen: "In Zoersel zien we veel vrijstaande woningen met grote raampartijen. Driedubbel glas en aluminium profielen zijn hier populair voor optimale isolatie én een strakke look.",
                gevel: "De typische baksteengevels in Halle en Sint-Antonius vragen om een grondige reiniging voordat we crepi aanbrengen. Wij adviseren u over de beste aanpak.",
                renovatie: "Veel woningen uit de jaren '70 in Zoersel komen in aanmerking voor de Mijn VerbouwPremie. Wij helpen u met de aanvraag en zorgen voor alle nodige attesten."
            },
            ctaText: "Woont u in Zoersel, Halle of Sint-Antonius?",
            ctaSubtext: "Gratis plaatsbezoek binnen 48 uur",
            localProject: {
                title: "Volledige gevelrenovatie vrijstaande woning",
                description: "EPS-isolatie (12 cm) met siliconen crepi in RAL 7035. Energielabel van E naar B."
            },
            localFAQs: [
                {
                    question: "Hebben jullie ervaring met oudere woningen in Zoersel?",
                    answer: "Ja, wij hebben al tientallen woningen uit de jaren '60-'80 in Zoersel gerenoveerd. Van dakisolatie tot nieuwe ramen en volledige gevelrenovatie — we kennen de typische uitdagingen en oplossingen."
                }
            ],
            richContent: `
                <div class="prose prose-lg max-w-none text-gray-600">
                    <h2 class="text-3xl font-bold text-brand-dark mb-6">Expert in Renovatie in Zoersel en Omgeving</h2>
                    <p class="mb-4">
                        Bent u op zoek naar een betrouwbare partner voor uw <strong>renovatie in Zoersel</strong>? Yannova Bouw is uw lokale specialist. 
                        Met ons kantoor aan <em>De Beemdekens</em> - midden in het groene hart van Zoersel - kennen wij de gemeente als onze broekzak. 
                        Of u nu een klassieke villa in de bosrijke omgeving van <strong>Sint-Antonius</strong> wilt moderniseren, of een rijwoning in <strong>Halle-Dorp</strong> 
                        energiezuinig wilt maken: wij leveren maatwerk dat past bij de Kempense bouwstijl.
                    </p>

                    <h3 class="text-2xl font-semibold text-brand-dark mt-8 mb-4">Waarom kiezen voor renovatie in Zoersel met Yannova?</h3>
                    <p class="mb-4">
                        Zoersel is een unieke gemeente met een diverse mix van woningen. Van de statige huizen langs de <strong>Handelslei</strong> tot de gezellige gezinswoningen 
                        in de nieuwe verkavelingen. Een renovatie hier vraagt om kennis van zaken. Wij begrijpen dat u het karakter van uw woning wilt behouden, 
                        maar wél wilt genieten van modern comfort en lagere energiekosten.
                    </p>
                    <p class="mb-4">
                        Onze diensten voor <strong>renovatie in Zoersel</strong> omvatten:
                    </p>
                    <ul class="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Totaalrenovatie:</strong> Van sloop tot afwerking, wij coördineren uw volledige verbouwing.</li>
                        <li><strong>Gevelwerken:</strong> Geef uw woning in <em>Malle</em> of <em>Sint-Antonius</em> een nieuwe look met crepi of steenstrips.</li>
                        <li><strong>Ramen en Deuren:</strong> Hoogwaardige profielen die passen bij zowel moderne als landelijke woningen.</li>
                        <li><strong>Isolatiewerken:</strong> Profiteer van premies door uw dak of muren te isoleren.</li>
                    </ul>

                    <h3 class="text-2xl font-semibold text-brand-dark mt-8 mb-4">Actief in alle wijken: Van Halle tot Sint-Antonius</h3>
                    <p class="mb-4">
                        Wij zijn niet zomaar een aannemer; wij zijn uw buren. We rijden dagelijks over de <strong>Rodendijk</strong> en de <strong>Antwerpsedreef</strong> naar onze klanten. 
                        Doordat we lokaal verankerd zijn, kunnen we snel schakelen. Een offertegesprek in de avonduren of op zaterdag? Voor klanten in Zoersel is dat geen enkel probleem.
                    </p>
                    <p class="mb-4">
                        Veel woningen in wijken zoals <em>De Gagel</em> of rondom het <em>Zoerselbos</em> zijn gebouwd in de jaren '70 en '80. Deze huizen hebben een solide basis, 
                        maar voldoen vaak niet meer aan de huidige energienormen (EPC). Met een gerichte <strong>renovatie in Zoersel</strong> kunnen we uw woning 
                        opwaarderen van label E of F naar label B of zelfs A. Dit verhoogt niet alleen uw wooncomfort, maar ook de verkoopwaarde van uw pand aanzienlijk.
                    </p>

                    <h3 class="text-2xl font-semibold text-brand-dark mt-8 mb-4">Uw Renovatie, Onze Zorg</h3>
                    <p class="mb-4">
                        Een verbouwing brengt vaak stress met zich mee. Bij Yannova Bouw nemen we die zorgen weg. Wij regelen alles: van de stedenbouwkundige vergunning 
                        (indien nodig bij de gemeente Zoersel) tot de premie-aanvragen via <em>Mijn VerbouwPremie</em>. Omdat we de lokale regels kennen, 
                        vermijdt u vertragingen en onnodig papierwerk.
                    </p>
                    <p>
                        Klaar om uw woondroom in Zoersel te realiseren? Neem contact op voor een vrijblijvend adviesgesprek. Wij komen graag langs om de mogelijkheden van uw 
                        <strong>renovatie in Zoersel</strong> te bespreken.
                    </p>
                </div>
            `
        }
    },
    antwerpen: {
        name: 'Antwerpen',
        zip: '2000',
        description: 'Uw partner voor bouw- en renovatiewerken in regio Antwerpen. Van stadscentrum tot havengebied.',
        longDescription: 'In de bruisende stad Antwerpen verzorgt Yannova Bouw renovaties en ramen- en deurenplaatsing voor zowel historische panden als moderne appartementen. Wij kennen de specifieke uitdagingen van bouwen in de stad en werken nauw samen met de stedelijke diensten.',
        coordinates: { lat: 51.2194, lng: 4.4025 },
        deelgemeenten: ['Berchem', 'Borgerhout', 'Deurne', 'Ekeren', 'Hoboken', 'Merksem', 'Wilrijk'],
        landmarks: ['Centraal Station', 'Grote Markt', 'MAS Museum'],
        population: '530.000',
        // UNIEKE CONTENT ANTWERPEN
        content: {
            localIntro: "Antwerpen vraagt om aannemers die de stad kennen: smalle straatjes, historische gevels en strakke parkeerregels. Wij coördineren alles en zorgen dat uw project vlot verloopt — zonder overlast voor de buurt.",
            localUSPs: [
                "Ervaring met historische panden en erfgoed in Antwerpen",
                "Kennis van stedenbouwkundige voorschriften en vergunningen",
                "Discrete uitvoering in drukke stadswijken",
                "Eigen materiaalstock: geen wachttijden door leveringsproblemen"
            ],
            serviceHighlights: {
                ramen: "In Antwerpse appartementen plaatsen we vaak slankere aluminium profielen die maximaal licht binnenlaten. Ook geluidisolatie is hier cruciaal — wij adviseren u over de beste oplossing.",
                gevel: "Veel vooroorlogse panden in Berchem en Borgerhout hebben beschermde gevels. Wij weten wat wél en niet mag en zorgen voor de juiste aanpak in samenspraak met de stad.",
                renovatie: "Stadspanden hebben vaak verrassingen: leidingen, asbest, instabiele vloeren. Onze ervaring in Antwerpen zorgt dat we hier snel en correct mee omgaan."
            },
            ctaText: "Renovatie in Antwerpen of een district?",
            ctaSubtext: "Wij kennen de stad en haar regels",
            localProject: {
                title: "Appartementsrenovatie Berchem",
                description: "Volledige vernieuwing van een jaren '30 appartement: nieuwe ramen, stucwerk en badkamer binnen 6 weken."
            },
            localFAQs: [
                {
                    question: "Werken jullie ook in het historisch centrum van Antwerpen?",
                    answer: "Absoluut. We hebben ervaring met panden in de binnenstad, inclusief beschermde gebouwen. We weten welke vergunningen nodig zijn en werken discreet om overlast voor buren te beperken."
                },
                {
                    question: "Hoe pakken jullie parkeren en materiaallevering aan in de stad?",
                    answer: "We plannen leveringen vroeg in de ochtend en gebruiken compacte voertuigen waar nodig. Voor grotere projecten regelen we tijdelijke parkeervergunningen."
                }
            ]
        }
    },
    mechelen: {
        name: 'Mechelen',
        zip: '2800',
        description: 'Renovatie en schrijnwerk in Mechelen. Kwalitatieve ramen en deuren voor elke woningstijl.',
        longDescription: 'Mechelen, de stad tussen Brussel en Antwerpen, kent een mix van historische architectuur en moderne nieuwbouw. Yannova Bouw heeft ruime ervaring met renovaties in de Mechelse binnenstad en de omliggende wijken. Van Sint-Romboutstoren tot Nekkerspoel, wij zijn uw lokale specialist.',
        coordinates: { lat: 51.0259, lng: 4.4776 },
        deelgemeenten: ['Battel', 'Heffen', 'Hombeek', 'Leest', 'Muizen', 'Walem'],
        landmarks: ['Sint-Romboutskathedraal', 'Grote Markt Mechelen', 'Technopolis'],
        population: '87.000',
        // UNIEKE CONTENT MECHELEN
        content: {
            localIntro: "Mechelen groeit en dat merken we: veel jonge gezinnen kopen een woning en willen die naar hun hand zetten. Van een nieuwe keuken tot een volledige renovatie — wij denken mee vanaf het eerste idee tot de sleuteloverdracht.",
            localUSPs: [
                "Actief in alle Mechelse deelgemeenten: Battel, Heffen, Muizen, Walem",
                "Ervaring met zowel stadspanden als landelijke woningen",
                "Goede bereikbaarheid via E19 en A1",
                "Nederlandstalig team voor heldere communicatie"
            ],
            serviceHighlights: {
                ramen: "In Mechelen zien we veel rijwoningen met smalle gevels. Wij plaatsen ramen die maximaal licht binnenlaten en toch voldoen aan de strengste isolatienormen.",
                gevel: "De deelgemeenten Heffen en Hombeek hebben veel woningen met een klassieke baksteengevel. Crepi of steenstrips geven hier een moderne uitstraling én betere isolatie.",
                renovatie: "Mechelen heeft een actief woonbeleid met premies voor renovatie. Wij kennen de lokale regelgeving en helpen u bij de aanvraag."
            },
            ctaText: "Plannen om te verbouwen in Mechelen?",
            ctaSubtext: "Gratis adviesgesprek aan huis",
            localProject: {
                title: "Totaalrenovatie rijwoning Nekkerspoel",
                description: "Van bouwval naar moderne gezinswoning in 4 maanden. Nieuwe ramen, vloerverwarming en open keuken."
            },
            localFAQs: [
                {
                    question: "Zijn er specifieke premies voor renovatie in Mechelen?",
                    answer: "Ja, naast de Vlaamse Mijn VerbouwPremie biedt de stad Mechelen soms aanvullende premies voor gevelrenovatie of energiebesparing. Wij houden dit voor u in de gaten en helpen met de aanvraag."
                }
            ]
        }
    },

    putte: {
        name: 'Putte',
        zip: '2580',
        description: 'Bouwbedrijf actief in Putte. Wij verzorgen uw gevelwerken en totaalrenovaties tot in de puntjes.',
        longDescription: 'In de landelijke gemeente Putte, gelegen tussen Mechelen en Lier, biedt Yannova Bouw een volledig gamma aan bouw- en renovatiediensten. De typische Kempense woningen in Putte en Beerzel vragen om vakmanschap dat wij met trots leveren.',
        coordinates: { lat: 51.0556, lng: 4.6307 },
        deelgemeenten: ['Beerzel', 'Grasheide', 'Peulis'],
        landmarks: ['Sint-Niklaaskerk Putte', 'Putte Kapellen'],
        population: '17.000',
        // UNIEKE CONTENT PUTTE
        content: {
            localIntro: "Putte, Beerzel, Grasheide en Peulis — we kennen deze landelijke gemeente goed. Hier werken we aan veel vrijstaande woningen en halfopen bebouwing die toe zijn aan een update.",
            localUSPs: [
                "Actief in alle deelgemeenten: Putte, Beerzel, Grasheide, Peulis",
                "Ervaring met typische Kempense woningen",
                "Strategisch gelegen tussen Mechelen en Lier",
                "Snelle opvolging en persoonlijk contact"
            ],
            serviceHighlights: {
                ramen: "In Putte zien we veel halfopen bebouwing met standaard raamformaten. Nieuwe PVC of aluminium ramen maken hier direct een groot verschil.",
                gevel: "De klassieke baksteengevels in Beerzel en Peulis zijn ideaal voor crepi of steenstrips. Wij adviseren over de beste afwerking.",
                renovatie: "Veel woningen uit de jaren '60-'80 in Putte zijn klaar voor een grondige renovatie. Wij helpen u bij planning en premie-aanvraag."
            },
            ctaText: "Woont u in Putte, Beerzel of omgeving?",
            ctaSubtext: "Gratis offerte binnen 48 uur"
        }
    },
    'heist-op-den-berg': {
        name: 'Heist-op-den-Berg',
        zip: '2220',
        description: 'Ramen, deuren en renovatie in Heist-op-den-Berg. Vraag uw gratis offerte aan bij uw lokale specialist.',
        longDescription: 'Heist-op-den-Berg, de grootste gemeente van de provincie Antwerpen qua oppervlakte, kent diverse deelgemeenten waar Yannova Bouw actief is. Van Hallaar tot Itegem, van Booischot tot Wiekevorst - overal leveren wij kwaliteitswerk.',
        coordinates: { lat: 51.0762, lng: 4.7226 },
        deelgemeenten: ['Hallaar', 'Itegem', 'Booischot', 'Wiekevorst', 'Schriek'],
        landmarks: ['Bergom', 'Heistse Berg'],
        population: '43.000',
        // UNIEKE CONTENT HEIST-OP-DEN-BERG
        content: {
            localIntro: "Heist-op-den-Berg is de grootste gemeente van de provincie Antwerpen en kent veel diverse woningtypes: van landelijke hoeves tot moderne nieuwbouw. Wij werken in alle deelgemeenten en kennen de lokale bouwstijlen.",
            localUSPs: [
                "Actief in alle 5 deelgemeenten: Hallaar, Itegem, Booischot, Wiekevorst, Schriek",
                "Ervaring met zowel landelijke als moderne woningen",
                "Korte afstand tot onze thuisbasis",
                "Persoonlijke opvolging door de zaakvoerder"
            ],
            serviceHighlights: {
                ramen: "In Heist zien we veel halfopen bebouwing uit de jaren '80. Nieuwe ramen maken hier een groot verschil in comfort en energieverbruik.",
                gevel: "Veel woningen in Booischot en Wiekevorst hebben nog originele baksteengevels. Crepi of steenstrips geven een frisse, moderne look.",
                renovatie: "Door de grootte van de gemeente zien we veel vraag naar totaalrenovaties. Wij coördineren alles van A tot Z."
            },
            ctaText: "Woont u in Heist-op-den-Berg of een deelgemeente?",
            ctaSubtext: "Gratis plaatsbezoek in heel de gemeente"
        }
    },
    // Nieuwe gemeenten rond Zoersel
    malle: {
        name: 'Malle',
        zip: '2390',
        description: 'Ramen en deuren specialist in Malle. Vakkundige plaatsing en renovatie in Oostmalle en Westmalle.',
        longDescription: 'De gemeente Malle, bestaande uit Oostmalle en Westmalle, is bekend om zijn landelijke karakter en de beroemde Trappistenabdij. Yannova Bouw verzorgt hier renovaties en ramen- en deurenplaatsing met oog voor de lokale bouwstijl.',
        coordinates: { lat: 51.2944, lng: 4.6944 },
        deelgemeenten: ['Oostmalle', 'Westmalle'],
        landmarks: ['Abdij van Westmalle', 'Kasteel de Renesse'],
        population: '15.000',
        // UNIEKE CONTENT MALLE
        content: {
            localIntro: "Malle — bestaande uit Oostmalle en Westmalle — is een landelijke gemeente met veel karaktervolle woningen. Van fermettes tot moderne gezinswoningen: wij kennen de typische bouwstijlen en zorgen voor renovaties die bij het karakter van de streek passen.",
            localUSPs: [
                "Actief in zowel Oostmalle als Westmalle",
                "Ervaring met landelijke woningen en fermettes",
                "Korte afstand vanuit onze thuisbasis",
                "Persoonlijke opvolging door de zaakvoerder"
            ],
            serviceHighlights: {
                ramen: "In Malle zien we veel vrijstaande woningen met grote raampartijen. Driedubbel glas en PVC of aluminium profielen zorgen voor comfort én lagere energiekosten.",
                gevel: "De typische baksteengevels in Oostmalle en Westmalle zijn ideaal voor crepi of steenstrips. Wij adviseren over de beste afwerking voor uw woning.",
                renovatie: "Veel woningen uit de jaren '70-'90 in Malle zijn klaar voor een grondige update. Wij helpen u met planning, uitvoering en premie-aanvraag."
            },
            ctaText: "Woont u in Oostmalle of Westmalle?",
            ctaSubtext: "Gratis plaatsbezoek en offerte"
        }
    },
    schilde: {
        name: 'Schilde',
        zip: '2970',
        description: 'Hoogwaardige renovaties en ramen in Schilde. Specialist voor villa\'s en karakterwoningen.',
        longDescription: 'Schilde staat bekend als een welvarende residentiële gemeente met prachtige villa\'s en karaktervolle woningen. Yannova Bouw heeft ruime ervaring met renovaties die het karakter van deze woningen respecteren en versterken.',
        coordinates: { lat: 51.2500, lng: 4.5833 },
        deelgemeenten: ['\'s-Gravenwezel'],
        landmarks: ['Kasteel van Schilde', 'Gemeentepark'],
        population: '20.000',
        // UNIEKE CONTENT SCHILDE
        content: {
            localIntro: "Schilde staat bekend om zijn prachtige villa's en residentiële karakter. Hier werken we met extra aandacht voor esthetiek en kwaliteit — uw woning verdient niets minder.",
            localUSPs: [
                "Specialist in villa-renovaties en karakterwoningen",
                "Hoogwaardige materialen die passen bij de uitstraling van Schilde",
                "Discrete uitvoering met respect voor uw privacy",
                "Ervaring met 's-Gravenwezel en omgeving"
            ],
            serviceHighlights: {
                ramen: "In Schilde kiezen veel eigenaren voor aluminium ramen met slanke profielen — ze passen perfect bij de moderne villa-architectuur.",
                gevel: "De grotere woningen in Schilde vragen om een doordachte gevelaanpak. Wij adviseren over isolatie, structuur en kleur.",
                renovatie: "Een villa renoveren vraagt om vakmanschap. Wij respecteren het karakter van uw woning en voegen modern comfort toe."
            },
            ctaText: "Villa of woning in Schilde?",
            ctaSubtext: "Vrijblijvend advies op niveau",
            localProject: {
                title: "Totaalrenovatie villa 's-Gravenwezel",
                description: "Nieuwe aluminium ramen, gevelisolatie en moderne badkamer met behoud van originele charme."
            }
        }
    },
    wijnegem: {
        name: 'Wijnegem',
        zip: '2110',
        description: 'Bouwbedrijf actief in Wijnegem. Ramen, deuren en gevelwerken voor woningen en appartementen.',
        longDescription: 'Wijnegem, gelegen aan de rand van Antwerpen, combineert stedelijke voorzieningen met een dorps karakter. Yannova Bouw is hier actief voor zowel renovaties van bestaande woningen als afwerking van nieuwbouwprojecten.',
        coordinates: { lat: 51.2333, lng: 4.5167 },
        landmarks: ['Wijnegem Shopping Center', 'Fort van Wijnegem'],
        population: '9.500',
        // UNIEKE CONTENT WIJNEGEM
        content: {
            localIntro: "Wijnegem ligt aan de rand van Antwerpen en biedt het beste van twee werelden: stedelijke voorzieningen met een dorps karakter. Wij renoveren hier zowel bestaande woningen als moderne appartementen.",
            localUSPs: [
                "Ervaring met zowel huizen als appartementen",
                "Kennis van stedenbouwkundige regels nabij Antwerpen",
                "Snelle bereikbaarheid via de Ring",
                "Discrete uitvoering in woonwijken"
            ],
            serviceHighlights: {
                ramen: "In Wijnegem plaatsen we vaak ramen in appartementsgebouwen. Geluidisolatie en slanke profielen zijn hier belangrijk.",
                gevel: "De mix van woningen en appartementen in Wijnegem vraagt om een gevarieerde aanpak. Wij adviseren per project over de beste oplossing.",
                renovatie: "Van kleine aanpassingen tot volledige renovaties in Wijnegem — wij zijn uw lokale partner voor al uw bouwprojecten."
            },
            ctaText: "Woning of appartement in Wijnegem?",
            ctaSubtext: "Snel ter plaatse voor advies"
        }
    },
    ranst: {
        name: 'Ranst',
        zip: '2520',
        description: 'Renovatie en ramen specialist in Ranst. Actief in Broechem, Emblem en Oelegem.',
        longDescription: 'De gemeente Ranst omvat de deelgemeenten Broechem, Emblem en Oelegem. Yannova Bouw kent deze regio goed en levert er kwaliteitsvolle renovaties en ramen- en deurenplaatsing.',
        coordinates: { lat: 51.1833, lng: 4.5500 },
        deelgemeenten: ['Broechem', 'Emblem', 'Oelegem'],
        landmarks: ['Kasteel van Ranst', 'Zevenbergenbos'],
        population: '19.000',
        // UNIEKE CONTENT RANST
        content: {
            localIntro: "Ranst is een gemeente met drie unieke dorpen: Broechem, Emblem en Oelegem. Elk dorp heeft zijn eigen karakter en bouwstijl. Wij kennen deze verschillen en passen onze aanpak aan elke situatie aan.",
            localUSPs: [
                "Actief in alle drie de deelgemeenten: Broechem, Emblem, Oelegem",
                "Ervaring met zowel klassieke als moderne woningen",
                "Goede bereikbaarheid via E313",
                "Lokale vakmannen met oog voor detail"
            ],
            serviceHighlights: {
                ramen: "In Ranst zien we veel halfopen bebouwing uit de jaren '80. Nieuwe ramen maken hier direct een groot verschil in comfort en energiefactuur.",
                gevel: "De woningen in Broechem en Oelegem hebben vaak originele baksteengevels. Crepi of steenstrips geven een moderne uitstraling.",
                renovatie: "Een complete renovatie in Ranst? Wij coördineren alle werken van A tot Z en zorgen voor een vlotte oplevering."
            },
            ctaText: "Woont u in Broechem, Emblem of Oelegem?",
            ctaSubtext: "Gratis offerte binnen 48 uur"
        }
    },
    brecht: {
        name: 'Brecht',
        zip: '2960',
        description: 'Ramen en deuren in Brecht en Sint-Job-in-\'t-Goor. Lokale vakmannen voor uw renovatie.',
        longDescription: 'Brecht is een uitgestrekte gemeente in de Noorderkempen met diverse deelgemeenten. Yannova Bouw is hier actief voor renovaties, gevelwerken en ramen- en deurenplaatsing.',
        coordinates: { lat: 51.3500, lng: 4.6333 },
        deelgemeenten: ['Sint-Job-in-\'t-Goor', 'Sint-Lenaarts', 'Overbroek'],
        landmarks: ['Gemeentehuis Brecht', 'Brechtse Heide'],
        population: '29.000',
        // UNIEKE CONTENT BRECHT
        content: {
            localIntro: "Brecht is een uitgestrekte gemeente in de Noorderkempen met veel verscheidenheid: van landelijke hoeves in Overbroek tot moderne villawijken in Sint-Job-in-'t-Goor. Wij passen onze aanpak aan de specifieke situatie aan.",
            localUSPs: [
                "Actief in Brecht, Sint-Job-in-'t-Goor, Sint-Lenaarts en Overbroek",
                "Ervaring met grote kavels en vrijstaande woningen",
                "Korte afstanden in de Noorderkempen",
                "Vakmanschap met aandacht voor landelijke charme"
            ],
            serviceHighlights: {
                ramen: "In Sint-Job-in-'t-Goor zien we veel villa's met grote glaspartijen. Aluminium schuiframen zijn hier populair voor een naadloze overgang naar de tuin.",
                gevel: "De Kempense woningen in Brecht en Sint-Lenaarts zijn ideaal voor een gevelrenovatie met crepi. Wij adviseren over kleur en structuur.",
                renovatie: "Een boerderij of hoeve renoveren in Overbroek? Wij hebben ervaring met dit soort projecten en respecteren het authentieke karakter."
            },
            ctaText: "Woont u in Brecht of omgeving?",
            ctaSubtext: "Gratis plaatsbezoek in heel de gemeente"
        }
    },
    zandhoven: {
        name: 'Zandhoven',
        zip: '2240',
        description: 'Bouwbedrijf in Zandhoven. Specialist in ramen, deuren en totaalrenovaties.',
        longDescription: 'Zandhoven, gelegen tussen Antwerpen en de Kempen, is een groene gemeente waar Yannova Bouw graag werkt. Wij verzorgen hier renovaties en nieuwbouwafwerking met aandacht voor kwaliteit.',
        coordinates: { lat: 51.2167, lng: 4.6667 },
        deelgemeenten: ['Pulderbos', 'Pulle', 'Massenhoven', 'Viersel'],
        landmarks: ['Kasteel van Zandhoven'],
        population: '13.000',
        // UNIEKE CONTENT ZANDHOVEN
        content: {
            localIntro: "Zandhoven is een groene gemeente met vier karaktervolle dorpen: Pulderbos, Pulle, Massenhoven en Viersel. Wij werken hier graag aan woningen die de combinatie maken tussen landelijk wonen en moderne voorzieningen.",
            localUSPs: [
                "Actief in Zandhoven, Pulderbos, Pulle, Massenhoven en Viersel",
                "Ervaring met landelijke woningen in bosrijke omgeving",
                "Strategisch gelegen tussen Antwerpen en de Kempen",
                "Persoonlijke service en snelle opvolging"
            ],
            serviceHighlights: {
                ramen: "In Zandhoven zien we veel vraag naar ramen die de groene omgeving naar binnen halen. Grote glaspartijen met goede isolatie zijn hier populair.",
                gevel: "De landelijke ligging vraagt om duurzame gevelafwerking. Onze siliconenpleister is bestand tegen vocht en geeft een mooie, egale afwerking.",
                renovatie: "Woningen in Zandhoven combineren vaak landelijke charme met modern comfort. Wij helpen u om het beste van beide werelden te bereiken."
            },
            ctaText: "Woont u in Zandhoven of een deelgemeente?",
            ctaSubtext: "Gratis adviesgesprek aan huis"
        }
    },
    wommelgem: {
        name: 'Wommelgem',
        zip: '2160',
        description: 'Renovatie en ramen plaatsen in Wommelgem. Snelle service, lokale vakmannen.',
        longDescription: 'Wommelgem ligt strategisch tussen Antwerpen en de Kempen. Yannova Bouw is hier actief voor renovaties van zowel oudere woningen als moderne nieuwbouw.',
        coordinates: { lat: 51.2000, lng: 4.5167 },
        landmarks: ['Fort van Wommelgem', 'Gemeentehuis'],
        population: '13.500',
        // UNIEKE CONTENT WOMMELGEM
        content: {
            localIntro: "Wommelgem combineert een uitstekende ligging nabij Antwerpen met een aangename woonomgeving. Wij renoveren hier al jaren woningen — van klassieke gezinswoningen tot moderne appartementen.",
            localUSPs: [
                "Jarenlange ervaring in Wommelgem en directe omgeving",
                "Kennis van zowel oudere woningen als nieuwbouw",
                "Snel ter plaatse via de Antwerpse Ring",
                "Persoonlijk contact en heldere communicatie"
            ],
            serviceHighlights: {
                ramen: "In Wommelgem zien we veel jaren '70 woningen die toe zijn aan nieuwe ramen. Moderne PVC of aluminium ramen maken direct een merkbaar verschil.",
                gevel: "De gevels in Wommelgem variëren van baksteen tot betonpanelen. Wij adviseren per situatie over de beste renovatie-aanpak.",
                renovatie: "Een volledige renovatie in Wommelgem? Wij coördineren alles en zorgen voor een vlotte, propere uitvoering."
            },
            ctaText: "Woning in Wommelgem?",
            ctaSubtext: "Vraag vandaag nog uw gratis offerte aan"
        }
    },
    bonheiden: {
        name: 'Bonheiden',
        zip: '2820',
        description: 'Ramen en deuren in Bonheiden en Rijmenam. Vakkundige renovatie door lokale specialisten.',
        longDescription: 'Bonheiden, gelegen tussen Mechelen en Keerbergen, is een aangename woongemeente waar Yannova Bouw graag projecten uitvoert. Van klassieke renovaties tot moderne nieuwbouw.',
        coordinates: { lat: 51.0333, lng: 4.5333 },
        deelgemeenten: ['Rijmenam'],
        landmarks: ['Bonheiden centrum', 'Rijmenamse Vijvers'],
        population: '15.500',
        // UNIEKE CONTENT BONHEIDEN
        content: {
            localIntro: "Bonheiden en Rijmenam liggen in een groene omgeving tussen Mechelen en Keerbergen. Hier werken we aan zowel klassieke renovaties als moderne nieuwbouwprojecten met aandacht voor de natuurlijke omgeving.",
            localUSPs: [
                "Actief in Bonheiden centrum en Rijmenam",
                "Ervaring met woningen in bosrijke omgeving",
                "Goede bereikbaarheid vanuit Mechelen",
                "Persoonlijke service en korte lijnen"
            ],
            serviceHighlights: {
                ramen: "In Bonheiden zien we veel vraag naar grote glaspartijen die de buitenruimte naar binnen halen. Wij adviseren over de beste oplossingen.",
                gevel: "De landelijke ligging vraagt om duurzame materialen die bestand zijn tegen vocht. Onze siliconenpleister is hier ideaal.",
                renovatie: "Veel woningen uit de jaren '70-'80 in Bonheiden zijn klaar voor een grondige update. Wij helpen u met planning en premies."
            },
            ctaText: "Woont u in Bonheiden of Rijmenam?",
            ctaSubtext: "Gratis adviesgesprek aan huis"
        }
    },
    lier: {
        name: 'Lier',
        zip: '2500',
        description: 'Bouwbedrijf actief in Lier. Renovatie, ramen en gevelwerken in de Pallieterstad.',
        longDescription: 'Lier, de historische Pallieterstad, kent een prachtig stadscentrum met veel karaktervolle woningen. Yannova Bouw heeft ervaring met renovaties die het historische karakter respecteren.',
        coordinates: { lat: 51.1333, lng: 4.5667 },
        deelgemeenten: ['Koningshooikt'],
        landmarks: ['Zimmertoren', 'Grote Markt Lier', 'Begijnhof'],
        population: '36.000',
        // UNIEKE CONTENT LIER
        content: {
            localIntro: "Lier, de Pallieterstad, heeft een rijk historisch centrum met karaktervolle woningen. Wij renoveren hier met respect voor het erfgoed en voegen modern comfort toe zonder het karakter aan te tasten.",
            localUSPs: [
                "Ervaring met historische panden in het Lierse centrum",
                "Kennis van lokale bouwstijlen en voorschriften",
                "Ook actief in Koningshooikt",
                "Discrete uitvoering in de binnenstad"
            ],
            serviceHighlights: {
                ramen: "In Lier zien we veel smalle gevels met hoge ramen. Wij plaatsen ramen die het historische karakter behouden én modern isoleren.",
                gevel: "De typische Lierse stadswoningen vragen om een aangepaste aanpak. Wij adviseren over kleuren en structuren die bij het straatbeeld passen.",
                renovatie: "Een stadswoning renoveren in Lier vraagt om vakmanschap. Wij kennen de uitdagingen en zorgen voor een vlotte uitvoering."
            },
            ctaText: "Woning in Lier of Koningshooikt?",
            ctaSubtext: "Gratis plaatsbezoek en advies",
            localProject: {
                title: "Renovatie rijwoning centrum Lier",
                description: "Nieuwe isolerende ramen met authentieke profilering, behoud van de gevel en volledige badkamerrenovatie."
            }
        }
    },
    keerbergen: {
        name: 'Keerbergen',
        zip: '3140',
        description: 'Uw lokale bouwpartner in Keerbergen. Ramen, deuren, renovatie en gevelwerken.',
        longDescription: 'Keerbergen, bekend om zijn vijvers en villawijken, is een van onze thuisregio\'s. Yannova Bouw kent hier elke straat en levert al jaren kwaliteitswerk voor de inwoners van Keerbergen.',
        coordinates: { lat: 51.0031, lng: 4.6314 },
        landmarks: ['Keerbergse vijvers', 'Gemeentehuis Keerbergen'],
        population: '13.500',
        // UNIEKE CONTENT KEERBERGEN
        content: {
            localIntro: "Keerbergen is onze thuisbasis. We kennen hier elke straat, elke villawijk en elke uitdaging. Van de woningen rond de vijvers tot de nieuwbouwprojecten — wij zijn uw lokale partner.",
            localUSPs: [
                "Keerbergen is onze thuisregio — we zijn er in minder dan 10 minuten",
                "Jarenlange ervaring met de typische Keerbergse villa's",
                "Veel referenties in de buurt beschikbaar",
                "Persoonlijk contact met de zaakvoerder"
            ],
            serviceHighlights: {
                ramen: "De villa's rond de Keerbergse vijvers hebben vaak grote raampartijen. Wij plaatsen aluminium schuiframen die het uitzicht maximaliseren.",
                gevel: "Veel jaren '70 woningen in Keerbergen zijn toe aan een gevelupdate. Isolatie met crepi verlaagt uw energiefactuur én verfraait de woning.",
                renovatie: "Een Keerbergse villa renoveren vraagt om een totaalaanpak. Wij coördineren alle werken en zorgen voor een vlotte oplevering."
            },
            ctaText: "Woont u in Keerbergen?",
            ctaSubtext: "Uw buren kozen ook voor Yannova",
            localProject: {
                title: "Totaalrenovatie vrijstaande villa Keerbergen",
                description: "Volledige make-over: nieuwe ramen, gevelisolatie, moderne keuken en badkamer. Oplevering in 4 maanden."
            },
            localFAQs: [
                {
                    question: "Hebben jullie al veel projecten gedaan in Keerbergen?",
                    answer: "Ja, Keerbergen is onze thuisbasis. We hebben hier al tientallen woningen voorzien van nieuwe ramen, gevels en volledige renovaties. Vraag gerust naar referenties in uw buurt."
                }
            ]
        }
    },
};
