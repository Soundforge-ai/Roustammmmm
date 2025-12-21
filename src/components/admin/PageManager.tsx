import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Edit2, 
  Eye, 
  EyeOff,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  ExternalLink,
  RotateCcw,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PageItem {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
  isSystem?: boolean; // System pages cannot be deleted
}

const PAGES_STORAGE_KEY = 'yannova_nav_pages';

// Default pages
const DEFAULT_PAGES: PageItem[] = [
  { id: 'home', label: 'Home', href: '/', order: 0, visible: true, isSystem: true },
  { id: 'gevel', label: 'Gevel', href: '/gevel', order: 1, visible: true, isSystem: true },
  { id: 'over-ons', label: 'Over Ons', href: '/over-ons', order: 2, visible: true },
  { id: 'diensten', label: 'Diensten', href: '/diensten', order: 3, visible: true },
  { id: 'aanpak', label: 'Aanpak', href: '/aanpak', order: 4, visible: true },
  { id: 'partners', label: 'Partners', href: '/partners', order: 5, visible: true },
  { id: 'contact', label: 'Contact', href: '/contact', order: 6, visible: true, isSystem: true },
];

export const getStoredPages = (): PageItem[] => {
  try {
    const stored = localStorage.getItem(PAGES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading pages:', e);
  }
  return DEFAULT_PAGES;
};

export const saveStoredPages = (pages: PageItem[]): void => {
  localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
  window.dispatchEvent(new Event('nav-pages-updated'));
};

const PageManager: React.FC = () => {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [originalPages, setOriginalPages] = useState<PageItem[]>([]);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPage, setNewPage] = useState({ label: '', href: '' });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedPages = getStoredPages();
    setPages(storedPages);
    setOriginalPages(JSON.parse(JSON.stringify(storedPages)));
  }, []);

  // Check if there are unsaved changes
  useEffect(() => {
    const changed = JSON.stringify(pages) !== JSON.stringify(originalPages);
    setHasChanges(changed);
  }, [pages, originalPages]);

  const handleSaveAll = () => {
    const sorted = [...pages].sort((a, b) => a.order - b.order);
    setPages(sorted);
    setOriginalPages(JSON.parse(JSON.stringify(sorted)));
    saveStoredPages(sorted);
    setHasChanges(false);
    setSaveMessage('Wijzigingen opgeslagen!');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleReset = () => {
    setPages(JSON.parse(JSON.stringify(originalPages)));
    setHasChanges(false);
  };

  const updatePages = (updatedPages: PageItem[]) => {
    const sorted = updatedPages.sort((a, b) => a.order - b.order);
    setPages(sorted);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newPages = [...pages];
    const temp = newPages[index].order;
    newPages[index].order = newPages[index - 1].order;
    newPages[index - 1].order = temp;
    updatePages(newPages);
  };

  const handleMoveDown = (index: number) => {
    if (index === pages.length - 1) return;
    const newPages = [...pages];
    const temp = newPages[index].order;
    newPages[index].order = newPages[index + 1].order;
    newPages[index + 1].order = temp;
    updatePages(newPages);
  };

  const handleToggleVisibility = (id: string) => {
    const newPages = pages.map(p => 
      p.id === id ? { ...p, visible: !p.visible } : p
    );
    updatePages(newPages);
  };

  const handleDelete = (id: string) => {
    const page = pages.find(p => p.id === id);
    if (page?.isSystem) {
      alert('Systeempagina\'s kunnen niet worden verwijderd');
      return;
    }
    if (confirm(`Weet je zeker dat je "${page?.label}" wilt verwijderen?`)) {
      const newPages = pages.filter(p => p.id !== id);
      // Re-order remaining pages
      newPages.forEach((p, i) => p.order = i);
      updatePages(newPages);
    }
  };

  const handleEditSave = () => {
    if (!editingPage) return;
    const newPages = pages.map(p => 
      p.id === editingPage.id ? editingPage : p
    );
    updatePages(newPages);
    setEditingPage(null);
  };

  const handleAddNew = () => {
    if (!newPage.label || !newPage.href) {
      alert('Vul zowel naam als URL in');
      return;
    }
    
    const href = newPage.href.startsWith('/') ? newPage.href : `/${newPage.href}`;
    const id = href.replace(/\//g, '-').replace(/^-/, '') || 'new-page';
    
    const newPageItem: PageItem = {
      id: `custom-${id}-${Date.now()}`,
      label: newPage.label,
      href: href,
      order: pages.length,
      visible: true,
      isSystem: false
    };
    
    updatePages([...pages, newPageItem]);
    setNewPage({ label: '', href: '' });
    setIsAddingNew(false);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newPages = [...pages];
    const draggedPage = newPages[draggedIndex];
    newPages.splice(draggedIndex, 1);
    newPages.splice(index, 0, draggedPage);
    
    // Update order values
    newPages.forEach((p, i) => p.order = i);
    
    setPages(newPages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with title and buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pagina Beheer</h2>
          {hasChanges && (
            <p className="text-sm text-orange-600 mt-1">
              Je hebt onopgeslagen wijzigingen
            </p>
          )}
          {saveMessage && (
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <Check size={16} />
              {saveMessage}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          )}
          <button
            onClick={handleSaveAll}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasChanges 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={18} />
            Opslaan
          </button>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus size={20} />
            Nieuwe Pagina
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Sleep om de volgorde te wijzigen, of gebruik de pijltjes. Klik op het oog-icoon om pagina's te verbergen/tonen.
      </p>

      {/* Add new page form */}
      {isAddingNew && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-brand-accent">
          <h3 className="font-semibold mb-3">Nieuwe Pagina Toevoegen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pagina Naam
              </label>
              <input
                type="text"
                value={newPage.label}
                onChange={(e) => setNewPage({ ...newPage, label: e.target.value })}
                placeholder="bijv. Blog"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Pad
              </label>
              <input
                type="text"
                value={newPage.href}
                onChange={(e) => setNewPage({ ...newPage, href: e.target.value })}
                placeholder="bijv. /blog"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={18} />
              Opslaan
            </button>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setNewPage({ label: '', href: '' });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={18} />
              Annuleren
            </button>
          </div>
        </div>
      )}

      {/* Pages list */}
      <div className="space-y-2">
        {pages.map((page, index) => (
          <div
            key={page.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg border transition-all ${
              draggedIndex === index ? 'opacity-50 border-brand-accent' : 'border-transparent hover:border-gray-300'
            } ${!page.visible ? 'opacity-60' : ''}`}
          >
            {/* Drag handle */}
            <div className="cursor-grab text-gray-400 hover:text-gray-600">
              <GripVertical size={20} />
            </div>

            {/* Order buttons */}
            <div className="flex flex-col">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === pages.length - 1}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Page info */}
            {editingPage?.id === page.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editingPage.label}
                  onChange={(e) => setEditingPage({ ...editingPage, label: e.target.value })}
                  className="flex-1 px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  value={editingPage.href}
                  onChange={(e) => setEditingPage({ ...editingPage, href: e.target.value })}
                  className="flex-1 px-2 py-1 border rounded"
                  disabled={page.isSystem}
                />
              </div>
            ) : (
              <div className="flex-1">
                <span className="font-medium text-gray-800">{page.label}</span>
                <span className="ml-2 text-sm text-gray-500">{page.href}</span>
                {page.isSystem && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Systeem
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {editingPage?.id === page.id ? (
                <>
                  <button
                    onClick={handleEditSave}
                    className="p-2 text-green-600 hover:bg-green-100 rounded"
                    title="Opslaan"
                  >
                    <Save size={18} />
                  </button>
                  <button
                    onClick={() => setEditingPage(null)}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                    title="Annuleren"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={page.href}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    title="Bekijk pagina"
                    target="_blank"
                  >
                    <ExternalLink size={18} />
                  </Link>
                  <button
                    onClick={() => handleToggleVisibility(page.id)}
                    className={`p-2 rounded ${page.visible ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-200'}`}
                    title={page.visible ? 'Verbergen' : 'Tonen'}
                  >
                    {page.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingPage(page)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    title="Bewerken"
                  >
                    <Edit2 size={18} />
                  </button>
                  {!page.isSystem && (
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded"
                      title="Verwijderen"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {pages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Geen pagina's gevonden. Voeg een nieuwe pagina toe.
        </div>
      )}
    </div>
  );
};

export default PageManager;
