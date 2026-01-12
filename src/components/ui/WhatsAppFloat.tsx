import React, { useState } from 'react';

interface WhatsAppFloatProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  phoneNumber = '+32489960001',
  message = 'Hallo! Ik heb een vraag over jullie diensten.',
  position = 'bottom-right'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  const createWhatsAppUrl = (customMessage?: string) => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(customMessage || message);
    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
  };

  const handleQuickMessage = (quickMessage: string) => {
    window.open(createWhatsAppUrl(quickMessage), '_blank');
    setIsExpanded(false);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  const quickMessages = [
    {
      icon: '🏠',
      text: 'Offerte aanvragen',
      message: 'Hallo! Ik zou graag een offerte aanvragen voor mijn project.'
    },
    {
      icon: '📸',
      text: 'Foto versturen',
      message: 'Hallo! Ik stuur jullie een foto van mijn huidige situatie voor advies.',
      action: () => setShowImageUpload(true)
    },
    {
      icon: '❓',
      text: 'Vraag stellen',
      message: 'Hallo! Ik heb een vraag over jullie diensten.'
    },
    {
      icon: '📞',
      text: 'Afspraak maken',
      message: 'Hallo! Ik zou graag een afspraak maken voor een vrijblijvende plaatsbezoek.'
    }
  ];

  return (
    <>
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-green-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">Y</span>
                </div>
                <div>
                  <div className="font-semibold">Yannova Bouw</div>
                  <div className="text-xs text-green-100">Meestal reageert binnen een uur</div>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => msg.action ? msg.action() : handleQuickMessage(msg.message)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <span className="text-xl">{msg.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{msg.text}</span>
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-100 p-3">
              <button
                onClick={() => window.open(createWhatsAppUrl(), '_blank')}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                Open WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="WhatsApp contact"
        >
          {isExpanded ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.287"/>
            </svg>
          )}
        </button>

        {/* Pulse Animation */}
        {!isExpanded && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        )}
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Foto versturen via WhatsApp
              </h3>
              <p className="text-gray-600 text-sm">
                Open WhatsApp om een foto van uw situatie te versturen voor snel advies.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">💡</span>
                  <div className="text-sm text-green-800">
                    <div className="font-semibold mb-1">Tips voor goede foto's:</div>
                    <ul className="space-y-1 text-xs">
                      <li>• Maak foto's bij daglicht</li>
                      <li>• Toon de volledige gevel of raam</li>
                      <li>• Voeg een foto van details toe</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuleren
                </button>
                <button
                  onClick={() => {
                    handleQuickMessage('Hallo! Ik stuur jullie een foto van mijn huidige situatie voor advies.');
                    setShowImageUpload(false);
                  }}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Open WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;