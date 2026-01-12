import React, { useState, useEffect } from 'react';

interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  profileImage?: string;
}

// Mock data - in real implementation, this would come from Google My Business API
const MOCK_REVIEWS: GoogleReview[] = [
  {
    id: '1',
    author: 'Sarah V.',
    rating: 5,
    text: 'Uitstekende service van Yannova! Onze nieuwe ramen zijn perfect geplaatst en het team was zeer professioneel. Zeker een aanrader!',
    date: '2024-01-15',
    profileImage: '/images/avatars/sarah.jpg'
  },
  {
    id: '2',
    author: 'Marc D.',
    rating: 5,
    text: 'Zeer tevreden over de gevelrenovatie. Kwaliteit is top en de prijs was eerlijk. Communicatie verliep vlot van begin tot eind.',
    date: '2024-01-10',
    profileImage: '/images/avatars/marc.jpg'
  },
  {
    id: '3',
    author: 'Linda K.',
    rating: 5,
    text: 'Yannova heeft onze voordeur vervangen. Vakkundig werk, netjes afgewerkt en binnen de afgesproken tijd. Heel blij met het resultaat!',
    date: '2024-01-08',
    profileImage: '/images/avatars/linda.jpg'
  },
  {
    id: '4',
    author: 'Peter M.',
    rating: 5,
    text: 'Professionele aanpak voor onze totaalrenovatie. Goede begeleiding en advies. Het eindresultaat overtreft onze verwachtingen!',
    date: '2024-01-05',
    profileImage: '/images/avatars/peter.jpg'
  },
  {
    id: '5',
    author: 'Anna T.',
    rating: 5,
    text: 'Snelle en vakkundige plaatsing van onze nieuwe ramen. Team was vriendelijk en heeft alles netjes achtergelaten. Top service!',
    date: '2024-01-03',
    profileImage: '/images/avatars/anna.jpg'
  }
];

interface GoogleReviewsWidgetProps {
  maxReviews?: number;
  showHeader?: boolean;
  compact?: boolean;
  className?: string;
}

const GoogleReviewsWidget: React.FC<GoogleReviewsWidgetProps> = ({
  maxReviews = 3,
  showHeader = true,
  compact = false,
  className = ''
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadReviews = async () => {
      setIsLoading(true);
      // In real implementation, fetch from Google My Business API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReviews(MOCK_REVIEWS.slice(0, maxReviews));
      setIsLoading(false);
    };

    loadReviews();
  }, [maxReviews]);

  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-BE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        {showHeader && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-semibold text-gray-900">Google Reviews</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStars(5)}
              <span className="text-sm text-gray-600 ml-1">5.0</span>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {reviews.slice(0, 2).map((review) => (
            <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {review.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">{review.author}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{review.text}</p>
                  <span className="text-xs text-gray-500 mt-1">{formatDate(review.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a 
            href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-brand-accent hover:text-orange-700 font-medium"
          >
            Bekijk alle reviews →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Google Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(5)}</div>
                <span className="text-sm text-gray-600">5.0 • {reviews.length} reviews</span>
              </div>
            </div>
          </div>
          
          <a 
            href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Review schrijven
          </a>
        </div>
      )}

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white font-semibold">
                      {review.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{review.author}</span>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic">
                    "{review.text}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-brand-accent' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Tevreden over onze service? Laat het anderen weten!
        </p>
        <a 
          href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-accent hover:text-orange-700 font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          Schrijf een review
        </a>
      </div>
    </div>
  );
};

export default GoogleReviewsWidget;