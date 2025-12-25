import React, { Suspense } from 'react';

// Update import to point to the correct file and handle named export for lazy loading
const SEODashboard = React.lazy(() => import('@/components/admin/SEOManager').then(module => ({ default: module.SEOManager })));

const SEODashboardPage: React.FC = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<div className="text-center py-8">Laden...</div>}>
          <SEODashboard />
        </Suspense>
      </div>
    </div>
  );
};

export default SEODashboardPage;
