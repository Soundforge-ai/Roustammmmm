import { Data } from '@measured/puck';

export interface PageData {
    id: string;
    slug: string;
    title: string;
    content: Data;
    createdAt: Date;
    updatedAt: Date;
    status: 'published' | 'draft';
    parentId?: string; // For subpages
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
}

const PAGES_KEY = 'yannova_pages';

// localStorage opslag
const localStorageFallback = {
    getPages: (): PageData[] => {
        try {
            const stored = localStorage.getItem(PAGES_KEY);
            if (!stored) return [];
            const parsed = JSON.parse(stored);
            return parsed.map((p: any) => ({
                ...p,
                createdAt: new Date(p.createdAt),
                updatedAt: new Date(p.updatedAt),
            }));
        } catch (e) {
            console.error('Error loading pages from localStorage', e);
            return [];
        }
    },
    getPage: (idOrSlug: string): PageData | null => {
        const pages = localStorageFallback.getPages();
        return pages.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
    },
    savePage: (page: PageData) => {
        const pages = localStorageFallback.getPages();
        const index = pages.findIndex(p => p.id === page.id);
        if (index >= 0) {
            pages[index] = { ...page, updatedAt: new Date() };
        } else {
            pages.push({ ...page, createdAt: new Date(), updatedAt: new Date() });
        }
        localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
        window.dispatchEvent(new Event('pages-updated'));
    },
    deletePage: (id: string) => {
        let pages = localStorageFallback.getPages();
        pages = pages.filter(p => p.id !== id);
        localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
        window.dispatchEvent(new Event('pages-updated'));
    }
};

export const pageStorage = {
    getPages: async (): Promise<PageData[]> => {
        return localStorageFallback.getPages();
    },

    getPage: async (idOrSlug: string): Promise<PageData | null> => {
        return localStorageFallback.getPage(idOrSlug);
    },

    savePage: async (page: PageData): Promise<void> => {
        localStorageFallback.savePage(page);
    },

    deletePage: async (id: string): Promise<void> => {
        localStorageFallback.deletePage(id);
    }
};
