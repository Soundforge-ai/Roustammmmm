import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
}) => {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [testimonials.length, isAnimating]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [testimonials.length, isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext, testimonials.length]);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-brand-dark">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative px-8 sm:px-4">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center">
            <Quote className="text-white" size={24} />
          </div>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div
              className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
            >
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Review Text */}
              <blockquote className="text-base sm:text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-6 sm:mb-8">
                "{currentTestimonial.reviewText}"
              </blockquote>

              {/* Customer Info */}
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-accent">
                    {currentTestimonial.customerName.charAt(0)}
                  </span>
                </div>
                <p className="font-bold text-brand-dark text-lg">
                  {currentTestimonial.customerName}
                </p>
                <p className="text-gray-500 text-sm">
                  {currentTestimonial.projectType}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-12 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Vorige review"
              >
                <ChevronLeft size={20} className="text-brand-dark sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-12 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Volgende review"
              >
                <ChevronRight size={20} className="text-brand-dark sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-brand-accent w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Ga naar review ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
