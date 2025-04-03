
import React from 'react';
import { useApplicationsData } from '@/hooks/useApplicationsData';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ApplicationTableDesktop from './applications/ApplicationTable';
import ApplicationTableMobile from './applications/ApplicationTableMobile';

const ApplicationTable: React.FC = () => {
  const { t } = useLanguage();
  const { refresh, error } = useApplicationsData();
  const isMobile = useIsMobile();
  
  return (
    <div className="container">
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || 'An error occurred while loading applications'}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="animate-fade-in">
        {isMobile ? <ApplicationTableMobile /> : <ApplicationTableDesktop />}
      </div>
    </div>
  );
};

export default ApplicationTable;
