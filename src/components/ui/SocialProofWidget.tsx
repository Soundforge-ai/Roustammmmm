import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

const SocialProofWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the widget
    const dismissed = localStorage.getItem('socialProofDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('socialProofDismissed', 'true');
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">4.8/5</span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-700 font-medium">127+ tevreden klanten</p>
          <p className="text-xs text-gray-500">Google Reviews</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <p className="text-xs text-gray-600 italic">
            "Uitstekende service van begin tot eind. Het team van Yannova heeft onze gevel volledig getransformeerd."
          </p>
          <p className="text-xs text-gray-500 mt-1">- Jan P., Zoersel</p>
        </div>

        <a
          href="/portfolio"
          className="block w-full bg-brand-accent hover:bg-orange-700 text-white text-center py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
        >
          Bekijk onze projecten
        </a>
      </div>
    </div>
  );
};

export default SocialProofWidget;