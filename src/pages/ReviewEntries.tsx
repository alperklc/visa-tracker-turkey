
import React from 'react';
import Layout from '@/components/Layout';
import ApplicationTable from '@/components/ApplicationTable';
import { useApplications } from '@/hooks/useApplications';
import { useLanguage } from '@/lib/LanguageContext';

const ReviewEntries: React.FC = () => {
  const { applications, loading } = useApplications();
  const { t } = useLanguage();
  
  return (
    <Layout className="py-12">
      <div className="container">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">{t('review.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('review.subtitle')}
          </p>
        </div>
        
        {loading ? (
          <div className="animate-pulse bg-muted rounded-lg h-96"></div>
        ) : (
          <div className="animate-fade-in">
            <ApplicationTable />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReviewEntries;
