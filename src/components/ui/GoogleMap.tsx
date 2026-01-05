import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface GoogleMapProps {
  address: string;
  coordinates: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  address,
  coordinates,
  zoom = 15,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // Create Google Maps embed URL
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=${zoom}`;
  
  // Create Google Maps link for external navigation
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;

  // Fallback component when map fails to load
  const FallbackMap = () => (
    <div className={`bg-gray-100 rounded-xl flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
        <MapPin className="text-brand-accent" size={32} />
      </div>
      <p className="text-gray-700 font-medium text-center mb-2">{address}</p>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-brand-accent hover:text-orange-700 font-medium mt-2"
      >
        Bekijk op Google Maps
        <ExternalLink size={16} />
      </a>
    </div>
  );

  if (hasError) {
    return <FallbackMap />;
  }

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '300px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Locatie: ${address}`}
        onError={() => setHasError(true)}
        className="w-full h-full"
      />
      
      {/* Overlay link for mobile */}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-accent transition-colors"
      >
        <ExternalLink size={16} />
        Open in Maps
      </a>
    </div>
  );
};

export default GoogleMap;
