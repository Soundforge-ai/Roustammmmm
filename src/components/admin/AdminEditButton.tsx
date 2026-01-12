import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit, LayoutDashboard, LogOut } from 'lucide-react';
import { pageStorage } from '../../lib/pageStorage';

const AdminEditButton: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [pageId, setPageId] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check admin session
        const checkSession = () => {
            const session = localStorage.getItem('yannova_admin_session');
            if (session) {
                try {
                    const { expires } = JSON.parse(session);
                    if (new Date(expires) > new Date()) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } catch (e) {
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        };

        checkSession();
        window.addEventListener('storage', checkSession); // Listen for cross-tab changes
        return () => window.removeEventListener('storage', checkSession);
    }, []);

    useEffect(() => {
        // Determine if current page is editable (dynamic)
        const checkPage = async () => {
            if (!isAdmin) return;

            const path = location.pathname;
            if (path.startsWith('/p/')) {
                const slug = path.replace('/p/', '');
                const page = await pageStorage.getPage(slug);
                if (page) {
                    setPageId(page.id);
                } else {
                    setPageId(null);
                }
            } else {
                setPageId(null);
            }
        };

        checkPage();
    }, [isAdmin, location]);

    if (!isAdmin) return null;

    // Don't show on admin dashboard itself
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard')) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3">
            {pageId ? (
                <button
                    onClick={() => window.location.href = `/dashboard/editor/${pageId}`}
                    className="flex items-center gap-2 bg-brand-accent text-white px-4 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all font-medium"
                >
                    <Edit size={20} />
                    Pagina Bewerken
                </button>
            ) : (
                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs shadow-lg opacity-75 backdrop-blur-sm">
                    Statische pagina
                </div>
            )}

            <button
                onClick={() => window.location.href = '/admin'}
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-all font-medium"
            >
                <LayoutDashboard size={20} />
                Dashboard
            </button>
        </div>
    );
};

export default AdminEditButton;
