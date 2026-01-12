import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import PortfolioGrid from '../components/features/portfolio/PortfolioGrid';
import ProjectDetail from '../components/features/portfolio/ProjectDetail';
import Lightbox from '../components/features/portfolio/Lightbox';
import ImageSlideshow from '../components/ui/ImageSlideshow';
import ReviewSection from '../components/sections/ReviewSection';
import { projectStorage } from '../lib/projectStorage';

const Portfolio: React.FC = () => {
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Get the separate slideshow images from the "Recente Realisaties" project
  const slideshowImages = projects.find(p => p.id === 'project-recent-auto')?.images || [];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const storedProjects = await projectStorage.getProjects();
        if (storedProjects.length > 0) {
          // Combine hardcoded projects with dynamic ones
          setProjects([...PROJECTS, ...storedProjects]);
        }
      } catch (error) {
        console.error('Failed to load dynamic projects', error);
      }
    };
    loadProjects();
  }, []);

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

      {/* Featured Slideshow Section (Only if images exist) */}
      {slideshowImages.length > 0 && (
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-brand-dark">Recente realisaties om inspiratie uit te halen</h2>
              <p className="text-gray-500">Een greep uit projecten die we recent met zorg hebben opgeleverd</p>
            </div>
            <ImageSlideshow images={slideshowImages} title="Recente Realisaties" />
          </div>
        </section>
      )}

      {/* Portfolio Grid Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <PortfolioGrid
            projects={projects}
            onProjectClick={handleProjectClick}
          />
        </div>
      </section>

      <ReviewSection />

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
