import React from 'react';
import { MapPin, Phone, Clock, Star, ExternalLink } from 'lucide-react';

interface GoogleBusinessCardProps {
    cityName: string;
    className?: string;
}

/**
 * Google Business Card Component
 * 
 * Toont NAP-informatie (Name, Address, Phone) consistent met Google Business Profile.
 * Dit versterkt de lokale SEO en helpt met de "Local Pack" ranking.
 * 
 * Belangrijk: Deze gegevens MOETEN identiek zijn aan het Google Business Profile!
 */
const GoogleBusinessCard: React.FC<GoogleBusinessCardProps> = ({ cityName, className = '' }) => {
    const businessInfo = {
        name: 'Yannova Bouw',
        address: 'Zoersel, België', // Aanpassen naar exact adres
        phone: '+32 489 96 00 01',
        phoneFormatted: '0489 96 00 01',
        hours: {
            weekdays: 'Ma - Vr: 08:00 - 18:00',
            saturday: 'Za: 09:00 - 13:00',
            sunday: 'Zo: Gesloten'
        },
        googleMapsUrl: 'https://maps.google.com/?q=Yannova+Bouw+Zoersel',
        googleBusinessUrl: 'https://g.page/yannova-bouw',
        reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJo-X_Z-_Aw0cRMLZNmZxNbZ0', // Gebruik de unieke place_id van Yannova
        rating: 4.9,
        reviewCount: 47
    };

    return (
        <div className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden ${className}`}>
            {/* Header met bedrijfsnaam */}
            <div className="bg-brand-dark text-white p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold">{businessInfo.name}</h3>
                        <p className="text-gray-300 text-sm mt-1">
                            Renovatie & schrijnwerk in {cityName}
                        </p>
                    </div>
                    {/* Google Rating */}
                    <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg">
                        <Star className="text-yellow-400 fill-yellow-400" size={16} />
                        <span className="font-bold text-sm">{businessInfo.rating}</span>
                        <span className="text-gray-400 text-xs">({businessInfo.reviewCount})</span>
                    </div>
                </div>
            </div>

            {/* NAP Informatie */}
            <div className="p-6 space-y-4">
                {/* Adres */}
                <div className="flex items-start gap-3">
                    <MapPin className="text-brand-accent flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <p className="text-sm text-gray-500">Adres</p>
                        <p className="text-gray-900 font-medium">{businessInfo.address}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Actief in {cityName} en omgeving
                        </p>
                    </div>
                </div>

                {/* Telefoon */}
                <div className="flex items-start gap-3">
                    <Phone className="text-brand-accent flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <p className="text-sm text-gray-500">Telefoon</p>
                        <a
                            href={`tel:${businessInfo.phone}`}
                            className="text-gray-900 font-medium hover:text-brand-accent transition-colors"
                        >
                            {businessInfo.phoneFormatted}
                        </a>
                    </div>
                </div>

                {/* Openingsuren */}
                <div className="flex items-start gap-3">
                    <Clock className="text-brand-accent flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <p className="text-sm text-gray-500">Openingsuren</p>
                        <p className="text-gray-900 font-medium text-sm">{businessInfo.hours.weekdays}</p>
                        <p className="text-gray-700 text-sm">{businessInfo.hours.saturday}</p>
                        <p className="text-gray-500 text-sm">{businessInfo.hours.sunday}</p>
                    </div>
                </div>
            </div>

            {/* CTA's */}
            <div className="px-6 pb-6 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={businessInfo.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium text-sm transition-colors"
                    >
                        <MapPin size={16} />
                        Route
                    </a>
                    <a
                        href={businessInfo.googleBusinessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium text-sm transition-colors"
                    >
                        <Star size={16} />
                        Reviews
                    </a>
                </div>
                <a
                    href={businessInfo.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-accent hover:bg-orange-700 rounded-lg text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
                >
                    <Star size={16} className="fill-white" />
                    Schrijf een review op Google
                </a>
            </div>

            {/* Footer met Google link */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <a
                    href={businessInfo.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-brand-accent transition-colors"
                >
                    <ExternalLink size={14} />
                    Bekijk op Google
                </a>
            </div>
        </div>
    );
};

export default GoogleBusinessCard;
