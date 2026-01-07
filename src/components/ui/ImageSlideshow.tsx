import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSlideshowProps {
    images: string[];
    title?: string;
    autoPlayInterval?: number;
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({
    images,
    title,
    autoPlayInterval = 5000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentIndex, autoPlayInterval]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="relative group w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl">
            {/* Title Overlay */}
            {title && (
                <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 to-transparent z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center shadow-sm">{title}</h2>
                </div>
            )}

            {/* Images */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt={title ? `${title} - Afbeelding ${index + 1} van ${images.length}` : `Yannova project afbeelding ${index + 1} van ${images.length}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-brand-accent/90 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-4"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-brand-accent/90 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-4"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                            ? 'bg-brand-accent w-8'
                            : 'bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlideshow;
