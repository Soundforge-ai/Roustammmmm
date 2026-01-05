import { Project } from '../types';

const PROJECTS_KEY = 'yannova_projects';

export const projectStorage = {
    getProjects: async (): Promise<Project[]> => {
        // For now, simple localStorage. Later we can add Supabase sync if needed.
        const stored = localStorage.getItem(PROJECTS_KEY);
        if (!stored) return [];
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse projects', e);
            return [];
        }
    },

    saveProject: async (project: Project): Promise<void> => {
        const projects = await projectStorage.getProjects();
        const index = projects.findIndex(p => p.id === project.id);

        if (index >= 0) {
            projects[index] = project;
        } else {
            projects.push(project);
        }

        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        window.dispatchEvent(new Event('projects-updated'));
    },

    deleteProject: async (id: string): Promise<void> => {
        let projects = await projectStorage.getProjects();
        projects = projects.filter(p => p.id !== id);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        window.dispatchEvent(new Event('projects-updated'));
    }
};
