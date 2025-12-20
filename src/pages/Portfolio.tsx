import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import ProjectDetail from '../components/portfolio/ProjectDetail';
import Lightbox from '../components/portfolio/Lightbox';

const Portfolio: React.FC = () => {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  const handleImageClick = (index: number) => {
    if (selectedProject) {
      setLightboxImages(selectedProject.images);
      setLightboxIndex(index);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxImages(null);
  };

  const handleLightboxNavigate = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('portfolio.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {t('portfolio.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <PortfolioGrid 
            projects={PROJECTS} 
            onProjectClick={handleProjectClick} 
          />
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleCloseDetail}
          onImageClick={handleImageClick}
        />
      )}

      {/* Lightbox */}
      {lightboxImages && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleLightboxNavigate}
        />
      )}
    </div>
  );
};

export default Portfolio;
