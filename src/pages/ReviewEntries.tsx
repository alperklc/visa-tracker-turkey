
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ApplicationTable from '@/components/ApplicationTable';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useApplicationsData } from '@/hooks/useApplicationsData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ReviewEntries: React.FC = () => {
  const { t } = useLanguage();
  const { refresh, error } = useApplicationsData();
  
  return (
    <Layout className="py-12">
      <div className="container">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">{t('review.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('review.subtitle')}
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || 'An error occurred while loading applications'}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" className="gap-2" onClick={refresh}>
            <RefreshCw className="h-4 w-4" />
            {t('review.common.refresh')}
          </Button>
        </div>
        
        <div className="animate-fade-in">
          <ApplicationTable />
        </div>
      </div>
    </Layout>
  );
};

export default ReviewEntries;
