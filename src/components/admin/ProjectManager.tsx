import React, { useState, useEffect } from 'react';
import { Project, ProjectType } from '../../types';
import { projectStorage } from '../../lib/projectStorage';
import { mediaStorage, MediaItem } from '../../lib/mediaStorage';
import {
    Plus,
    Trash2,
    Edit,
    Save,
    X,
    Image as ImageIcon,
    Ruler,
    CheckCircle2,
    Loader2,
    Calendar,
    MapPin
} from 'lucide-react';

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
    { value: 'gevelwerken', label: 'Gevelwerken' },
    { value: 'renovatie', label: 'Renovatie' },
    { value: 'isolatie', label: 'Isolatie' },
    { value: 'ramen-deuren', label: 'Ramen & Deuren' },
    { value: 'tuinaanleg', label: 'Tuinaanleg' },
];

const ProjectManager: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProject, setEditingProject] = useState<Partial<Project>>({});

    // Image selection modal state
    const [showImageSelector, setShowImageSelector] = useState(false);

    useEffect(() => {
        loadData();
        window.addEventListener('media-updated', loadData);
        return () => window.removeEventListener('media-updated', loadData);
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [projData, mediaData] = await Promise.all([
                projectStorage.getProjects(),
                mediaStorage.getMedia()
            ]);
            setProjects(projData);
            setMediaItems(mediaData);
        } catch (error) {
            console.error('Error loading project data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        setEditingProject({
            id: Date.now().toString(),
            title: '',
            description: '',
            type: 'renovatie',
            images: [],
            completedDate: new Date().toISOString().slice(0, 7), // YYYY-MM
            location: ''
        });
        setIsEditing(true);
    };

    const handleEdit = (project: Project) => {
        setEditingProject({ ...project });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Weet je zeker dat je dit project wilt verwijderen?')) {
            await projectStorage.deleteProject(id);
            loadData();
        }
    };

    const handleSave = async () => {
        if (!editingProject.title || !editingProject.description) {
            alert('Vul minstens een titel en omschrijving in.');
            return;
        }

        const projectToSave: Project = {
            id: editingProject.id || Date.now().toString(),
            title: editingProject.title,
            description: editingProject.description,
            type: (editingProject.type as ProjectType) || 'renovatie',
            images: editingProject.images || [],
            completedDate: editingProject.completedDate || '',
            location: editingProject.location || ''
        };

        await projectStorage.saveProject(projectToSave);
        setIsEditing(false);
        setEditingProject({});
        loadData();
    };

    const toggleImageSelection = (url: string) => {
        const currentImages = editingProject.images || [];
        if (currentImages.includes(url)) {
            setEditingProject({
                ...editingProject,
                images: currentImages.filter(img => img !== url)
            });
        } else {
            setEditingProject({
                ...editingProject,
                images: [...currentImages, url]
            });
        }
    };

    if (isLoading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

    if (isEditing) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        {editingProject.id ? 'Project Bewerken' : 'Nieuw Project'}
                    </h3>
                    <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Titel</label>
                            <input
                                type="text"
                                value={editingProject.title || ''}
                                onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                                placeholder="bv. Renovatie Villa Zoersel"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type Werk</label>
                            <select
                                value={editingProject.type}
                                onChange={e => setEditingProject({ ...editingProject, type: e.target.value as ProjectType })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none bg-white"
                            >
                                {PROJECT_TYPES.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
                                <input
                                    type="month"
                                    value={editingProject.completedDate || ''}
                                    onChange={e => setEditingProject({ ...editingProject, completedDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Locatie</label>
                                <input
                                    type="text"
                                    value={editingProject.location || ''}
                                    onChange={e => setEditingProject({ ...editingProject, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                                    placeholder="bv. Zoersel"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                            <textarea
                                value={editingProject.description || ''}
                                onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                                placeholder="Wat is er precies gedaan?"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Project Foto's</label>
                            <button
                                type="button"
                                onClick={() => setShowImageSelector(true)}
                                className="text-sm text-brand-accent hover:text-orange-700 font-medium flex items-center gap-1"
                            >
                                <Plus size={16} /> Foto's kiezen
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-2 border-dashed border-gray-200 rounded-lg p-4 min-h-[200px] bg-gray-50">
                            {editingProject.images && editingProject.images.length > 0 ? (
                                editingProject.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                                        <img src={img} alt={`Project ${idx}`} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setEditingProject({
                                                ...editingProject,
                                                images: editingProject.images?.filter((_, i) => i !== idx)
                                            })}
                                            className="absolute top-1 right-1 p-1 bg-white/90 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 flex flex-col items-center justify-center text-gray-400 h-full">
                                    <ImageIcon size={32} className="mb-2" />
                                    <span className="text-sm">Nog geen foto's geselecteerd</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Annuleren
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-brand-accent text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                    >
                        <Save size={18} /> Opslaan
                    </button>
                </div>

                {/* Image Picker Modal */}
                {showImageSelector && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Selecteer Foto's</h3>
                                <button onClick={() => setShowImageSelector(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                {mediaItems.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        Geen foto's gevonden in de Media Bibliotheek. Upload eerst foto's via het "Media" tabblad.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {mediaItems.filter(m => m.type === 'image').map(item => {
                                            const isSelected = editingProject.images?.includes(item.url);
                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => toggleImageSelection(item.url)}
                                                    className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all ${isSelected ? 'border-brand-accent ring-2 ring-brand-accent/30' : 'border-transparent hover:border-gray-200'}`}
                                                >
                                                    <div className="aspect-square">
                                                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 bg-brand-accent text-white rounded-full p-1 shadow-sm">
                                                            <CheckCircle2 size={16} />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setShowImageSelector(false)}
                                    className="px-6 py-2 bg-brand-dark text-white rounded-lg hover:bg-slate-800"
                                >
                                    Klaar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Projecten Portfolio</h3>
                    <p className="text-gray-500 text-sm">Beheer de projecten die op de website getoond worden</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-accent hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                    <Plus size={18} /> Nieuw Project
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                        <p className="text-gray-400">Nog geen projecten aangemaakt.</p>
                    </div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                {project.images && project.images.length > 0 ? (
                                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="inline-block px-2 py-0.5 bg-orange-50 text-brand-accent text-xs font-bold rounded uppercase tracking-wider mb-1">
                                            {PROJECT_TYPES.find(t => t.value === project.type)?.label || project.type}
                                        </span>
                                        <h4 className="font-bold text-gray-800 text-lg leading-tight">{project.title}</h4>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                    {project.location && (
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
                                    )}
                                    {project.completedDate && (
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {project.completedDate}</span>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-gray-50">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors"
                                    >
                                        <Edit size={16} /> Bewerken
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectManager;
