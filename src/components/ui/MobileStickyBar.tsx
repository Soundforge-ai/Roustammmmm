import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, FileText } from 'lucide-react';

/**
 * Mobile Sticky Bar Component
 * 
 * Een zwevende balk onderaan het scherm op mobiele apparaten met:
 * - Directe bel-knop
 * - WhatsApp contact
 * - Offerte aanvragen
 * 
 * Verbergt zichzelf wanneer de gebruiker naar beneden scrollt en toont
 * weer wanneer ze naar boven scrollen (betere UX).
 */
const MobileStickyBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Verberg bij scrollen naar beneden, toon bij scrollen naar boven
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Niet tonen op desktop (> 768px)
    // Dit wordt ook via CSS geregeld, maar dit voorkomt onnodige renders
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isMobile) return null;

    return (
        <>
            {/* Overlay voor expanded state */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 z-[90] md:hidden"
                    onClick={() => setIsExpanded(false)}
                />
            )}

            {/* Expanded Menu */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[95] md:hidden transform transition-transform duration-300 ${isExpanded ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Neem contact op</h3>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="p-2 text-gray-500 hover:text-gray-700"
                            aria-label="Sluiten"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Bel Direct */}
                        <a
                            href="tel:+32489960001"
                            className="flex items-center gap-4 p-4 bg-brand-accent text-white rounded-xl hover:bg-orange-700 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <Phone size={24} />
                            </div>
                            <div>
                                <div className="font-bold">Bel direct</div>
                                <div className="text-sm opacity-90">+32 489 96 00 01</div>
                            </div>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/32489960001?text=Hallo%2C%20ik%20heb%20interesse%20in%20jullie%20diensten."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <div className="font-bold">WhatsApp</div>
                                <div className="text-sm opacity-90">Stuur een bericht</div>
                            </div>
                        </a>

                        {/* Offerte Aanvragen */}
                        <a
                            href="/contact"
                            className="flex items-center gap-4 p-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent">
                                <FileText size={24} />
                            </div>
                            <div>
                                <div className="font-bold">Gratis offerte</div>
                                <div className="text-sm text-gray-600">Vul het formulier in</div>
                            </div>
                        </a>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        Reactie binnen 24 uur • Vrijblijvend advies
                    </p>
                </div>
            </div>

            {/* Sticky Bar */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-[80] md:hidden transform transition-transform duration-300 ${isVisible && !isExpanded ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Gradient fade effect */}
                <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />

                <div className="bg-white border-t border-gray-200 shadow-lg">
                    <div className="flex items-stretch">
                        {/* Bel Knop */}
                        <a
                            href="tel:+32489960001"
                            className="flex-1 flex items-center justify-center gap-2 py-4 text-brand-accent hover:bg-gray-50 transition-colors border-r border-gray-200"
                            aria-label="Bel ons"
                        >
                            <Phone size={20} />
                            <span className="font-semibold text-sm">Bellen</span>
                        </a>

                        {/* Offerte Knop (Primair) */}
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="flex-[2] flex items-center justify-center gap-2 py-4 bg-brand-accent text-white font-bold hover:bg-orange-700 transition-colors"
                            aria-label="Offerte aanvragen"
                        >
                            <FileText size={20} />
                            <span>Gratis Offerte</span>
                        </button>

                        {/* WhatsApp Knop */}
                        <a
                            href="https://wa.me/32489960001?text=Hallo%2C%20ik%20heb%20interesse%20in%20jullie%20diensten."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-4 text-green-600 hover:bg-gray-50 transition-colors border-l border-gray-200"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle size={20} />
                            <span className="font-semibold text-sm">Chat</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Spacer om content niet te verbergen achter de sticky bar */}
            <div className="h-16 md:hidden" aria-hidden="true" />
        </>
    );
};

export default MobileStickyBar;
