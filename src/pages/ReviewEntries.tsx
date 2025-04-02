
import React from 'react';
import Layout from '@/components/Layout';
import ApplicationTable from '@/components/ApplicationTable';
import { useLanguage } from '@/lib/LanguageContext';

const ReviewEntries: React.FC = () => {
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
        
        <div className="animate-fade-in">
          <ApplicationTable />
        </div>
      </div>
    </Layout>
  );
};

export default ReviewEntries;
