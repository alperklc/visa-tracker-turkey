
import React from 'react';
import { useApplicationsData } from '@/hooks/useApplicationsData';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import ApplicationTableDesktop from './applications/ApplicationTable';
import ApplicationTableMobile from './applications/ApplicationTableMobile';

const ApplicationTable: React.FC = () => {
  const { t } = useLanguage();
  const { refresh, error } = useApplicationsData();
  const isMobile = useIsMobile();
  
  return (
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
        {isMobile ? <ApplicationTableMobile /> : <ApplicationTableDesktop />}
      </div>
    </div>
  );
};

export default ApplicationTable;
