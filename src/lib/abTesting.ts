/**
 * A/B Testing Utility
 * 
 * Eenvoudige client-side A/B testing voor CTA's en andere elementen.
 * Gebruikt localStorage om de gebruiker consistent dezelfde variant te tonen.
 * 
 * GEBRUIK:
 * const variant = useABTest('cta_button_text', ['Offerte Aanvragen', 'Gratis Offerte']);
 * 
 * TRACKING:
 * Integreer met Google Analytics 4 events voor conversie-tracking.
 */

interface ABTestConfig {
    testId: string;
    variants: string[];
    weights?: number[]; // Optioneel: gewichten per variant (bijv. [0.5, 0.5])
}

interface ABTestResult {
    variant: string;
    variantIndex: number;
}

/**
 * Genereert een consistente variant voor een gebruiker
 */
export function getABVariant(config: ABTestConfig): ABTestResult {
    const { testId, variants, weights } = config;
    const storageKey = `ab_test_${testId}`;

    // Check of de gebruiker al een variant heeft
    if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const index = parseInt(stored, 10);
            if (!isNaN(index) && index < variants.length) {
                return {
                    variant: variants[index],
                    variantIndex: index
                };
            }
        }
    }

    // Genereer nieuwe variant
    let variantIndex: number;

    if (weights && weights.length === variants.length) {
        // Gewogen random selectie
        const random = Math.random();
        let cumulative = 0;
        variantIndex = 0;
        for (let i = 0; i < weights.length; i++) {
            cumulative += weights[i];
            if (random < cumulative) {
                variantIndex = i;
                break;
            }
        }
    } else {
        // Gelijke kansen
        variantIndex = Math.floor(Math.random() * variants.length);
    }

    // Opslaan in localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(storageKey, variantIndex.toString());
    }

    return {
        variant: variants[variantIndex],
        variantIndex
    };
}

/**
 * Track A/B test event naar Google Analytics 4
 */
export function trackABEvent(testId: string, variantIndex: number, action: 'view' | 'click' | 'convert'): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ab_test', {
            test_id: testId,
            variant_index: variantIndex,
            action: action
        });
    }
}

// ============================================
// PRE-CONFIGURED TESTS
// ============================================

/**
 * CTA Button Tekst Test
 * Test welke CTA tekst beter converteert
 */
export const CTA_TEXT_TEST: ABTestConfig = {
    testId: 'cta_button_text_v1',
    variants: [
        'Gratis Offerte Aanvragen',
        'Vraag Nu Uw Offerte Aan',
        'Start Uw Project'
    ],
    weights: [0.4, 0.4, 0.2] // Meer gewicht op de eerste twee
};

/**
 * CTA Kleur Test
 * Test of een groene CTA beter werkt dan oranje
 */
export const CTA_COLOR_TEST: ABTestConfig = {
    testId: 'cta_button_color_v1',
    variants: [
        'brand-accent', // Oranje (huidige)
        'green-600'     // Groen (test)
    ],
    weights: [0.5, 0.5]
};

/**
 * Hero Subtitle Test
 * Test welke waardepropositie beter aanslaat
 */
export const HERO_SUBTITLE_TEST: ABTestConfig = {
    testId: 'hero_subtitle_v1',
    variants: [
        'Gratis offerte in 48 uur',
        '15+ jaar ervaring in de regio',
        'Lokale vakmannen, eerlijke prijzen'
    ],
    weights: [0.34, 0.33, 0.33]
};

/**
 * Sticky Bar CTA Test
 */
export const STICKY_BAR_CTA_TEST: ABTestConfig = {
    testId: 'sticky_bar_cta_v1',
    variants: [
        'Gratis Offerte',
        'Offerte in 2 min',
        'Plan Afspraak'
    ],
    weights: [0.34, 0.33, 0.33]
};

// ============================================
// REACT HOOK
// ============================================

import { useState, useEffect } from 'react';

/**
 * React Hook voor A/B testing
 * 
 * @example
 * const { variant, variantIndex, trackEvent } = useABTest(CTA_TEXT_TEST);
 */
export function useABTest(config: ABTestConfig) {
    const [result, setResult] = useState<ABTestResult>({ variant: config.variants[0], variantIndex: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const abResult = getABVariant(config);
        setResult(abResult);

        // Track view event
        trackABEvent(config.testId, abResult.variantIndex, 'view');
    }, [config.testId]);

    const trackClick = () => {
        trackABEvent(config.testId, result.variantIndex, 'click');
    };

    const trackConversion = () => {
        trackABEvent(config.testId, result.variantIndex, 'convert');
    };

    return {
        ...result,
        isClient,
        trackClick,
        trackConversion
    };
}
