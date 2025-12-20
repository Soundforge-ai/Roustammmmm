import React, { useState } from 'react';
import { Project } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { X, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onImageClick: (index: number) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onImageClick }) => {
  const { t } = useI18n();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-brand-dark">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Sluiten"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <div 
            className="aspect-video bg-gray-100 cursor-pointer"
            onClick={() => onImageClick(currentImageIndex)}
          >
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Afbeelding ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Vorige afbeelding"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Volgende afbeelding"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Thumbnails */}
              <div className="flex gap-2 p-4 justify-center">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-brand-accent' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-medium">
              {t(`portfolio.filter.${project.type === 'ramen-deuren' ? 'ramenDeuren' : project.type}`)}
            </span>
            <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <MapPin size={16} />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={16} />
              {formatDate(project.completedDate)}
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            {project.description}
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {t('services.cta')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
