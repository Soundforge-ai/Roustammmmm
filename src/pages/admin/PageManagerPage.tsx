import React from 'react';
import PageManager from '../../components/admin/PageManager';
import Layout from '../../components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageManagerPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              to="/admin" 
              className="inline-flex items-center text-gray-600 hover:text-brand-accent transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Terug naar Admin
            </Link>
          </div>
          <PageManager />
        </div>
      </div>
    </Layout>
  );
};

export default PageManagerPage;
