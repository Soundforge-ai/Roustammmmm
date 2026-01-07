import { LucideIcon } from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    image: string;
    icon: LucideIcon;
}

export interface StepItem {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface BenefitItem {
    id: string;
    text: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    type: 'gevelwerken' | 'renovatie' | 'isolatie' | 'ramen-deuren' | 'tuinaanleg';
    images: string[];
    completedDate: string;
    location: string;
}

export interface Testimonial {
    id: string;
    customerName: string;
    projectType: string;
    reviewText: string;
    rating: number;
    date: string;
}

// ===== CITY & REGION CONTENT TYPES =====

/**
 * Dienst-specifieke content voor een stad
 * Elk veld beschrijft wat uniek is aan deze dienst in deze stad
 */
export interface CityServiceHighlights {
    ramen?: string;      // Unieke aspecten voor ramen/deuren in deze stad
    gevel?: string;      // Specifieke gevelkenmerken of uitdagingen
    renovatie?: string;  // Wat speelt er qua renovatie (oude woningen, premies, etc.)
    tuinaanleg?: string; // Optioneel: tuinaanleg specifiek
}

/**
 * Lokaal referentieproject voor social proof
 */
export interface CityLocalProject {
    title: string;
    description: string;
    image?: string;      // Pad naar afbeelding (optioneel)
}

/**
 * Unieke FAQ voor een stad (aanvulling op de standaard FAQ's)
 */
export interface CityFAQ {
    question: string;
    answer: string;
}

/**
 * Complete content structuur per stad
 * Alle velden zijn optioneel - fallback naar generieke content indien leeg
 */
export interface CityContent {
    // Lokale introductietekst (vervangt longDescription in hero)
    localIntro?: string;

    // Unieke selling points voor deze stad (3-5 bullets)
    localUSPs?: string[];

    // Dienst-specifieke accenten
    serviceHighlights?: CityServiceHighlights;

    // Aangepaste CTA tekst
    ctaText?: string;
    ctaSubtext?: string;

    // Lokaal referentieproject
    localProject?: CityLocalProject;

    // Aanvullende lokale FAQ's (bovenop de standaard FAQ's)
    localFAQs?: CityFAQ[];

    // Specifieke SEO description (indien afwijkend van standaard)
    seoDescription?: string;

    // Uitgebreide SEO tekst (HTML)
    richContent?: string;
}

/**
 * Volledige stad-definitie voor regiopagina's
 */
export interface CityData {
    name: string;
    zip: string;
    description: string;           // Korte beschrijving (1 zin)
    longDescription: string;       // Uitgebreide beschrijving (2-3 zinnen)
    coordinates: { lat: number; lng: number };
    deelgemeenten?: string[];
    landmarks?: string[];
    population?: string;

    // NIEUW: Unieke content per stad
    content?: CityContent;
}
