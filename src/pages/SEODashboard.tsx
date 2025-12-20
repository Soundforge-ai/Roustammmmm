import React, { Suspense } from 'react';

const SEODashboard = React.lazy(() => import('@/components/admin/SEODashboard'));

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
