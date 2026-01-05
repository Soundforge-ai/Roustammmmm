import React, { useState } from 'react';
import { Project, ProjectType } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { MapPin, Calendar } from 'lucide-react';

interface PortfolioGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

type FilterType = ProjectType | 'all';

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects, onProjectClick }) => {
  const { t } = useI18n();
  const [filter, setFilter] = useState<FilterType>('all');

  const filters: { value: FilterType; labelKey: string }[] = [
    { value: 'all', labelKey: 'portfolio.filter.all' },
    { value: 'gevelwerken', labelKey: 'portfolio.filter.gevelwerken' },
    { value: 'renovatie', labelKey: 'portfolio.filter.renovatie' },
    { value: 'isolatie', labelKey: 'portfolio.filter.isolatie' },
    { value: 'ramen-deuren', labelKey: 'portfolio.filter.ramenDeuren' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {filters.map(({ value, labelKey }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === value
                ? 'bg-brand-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => onProjectClick(project)}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block px-3 py-1 bg-brand-accent text-white text-xs font-medium rounded-full">
                  {t(`portfolio.filter.${project.type === 'ramen-deuren' ? 'ramenDeuren' : project.type}`)}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-brand-dark mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(project.completedDate)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Geen projecten gevonden voor dit filter.
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;
