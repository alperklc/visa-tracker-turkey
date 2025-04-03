
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useApplicationsData } from '@/hooks/useApplicationsData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CountryFlag from '@/components/CountryFlag';
import ApplicationFilters from './ApplicationFilters';
import ApplicationPagination from './ApplicationPagination';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { exportToCSV, exportToExcel } from '@/utils/exportData';

const ApplicationTableMobile: React.FC = () => {
  const { t } = useLanguage();
  const { 
    applications, 
    pagination, 
    loading, 
    filter, 
    updateFilter, 
    refresh 
  } = useApplicationsData();

  const handlePageChange = (page: number) => {
    updateFilter({ page });
  };

  const handlePageSizeChange = (pageSize: number) => {
    updateFilter({ pageSize });
  };

  const handleExportCSV = () => {
    exportToCSV(applications);
  };

  const handleExportExcel = () => {
    exportToExcel(applications);
  };

  const getResultBadge = (app: any) => {
    if (!app || !app.result) return <Badge variant="outline">{t('table.pending')}</Badge>;
    
    if (app.result.status === "Approved") {
      return <Badge className="bg-green-500 text-white">{t('table.approved')}</Badge>;
    } else if (app.result.status === "Rejected") {
      return <Badge className="bg-red-500 text-white">{t('table.rejected')}</Badge>;
    } else {
      return <Badge variant="outline">{t('table.pending')}</Badge>;
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return t('table.pending');
    return date.toLocaleDateString();
  };
  
  const getProcessingDays = (app: any) => {
    if (!app || !app.applicationSubmitDate) {
      return 0;
    }
    
    if (!app.passportReturnDate) {
      const today = new Date();
      return Math.floor((today.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((app.passportReturnDate.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getCountryKey = (countryName: string) => {
    if (!countryName) return 'unknown';
    return countryName.replace(/\s+/g, '').toLowerCase();
  };

  if (loading && applications.length === 0) {
    return <div className="animate-pulse space-y-4">
      <div className="h-20 bg-muted rounded-md w-full"></div>
      <div className="h-20 bg-muted rounded-md w-full"></div>
      <div className="h-20 bg-muted rounded-md w-full"></div>
    </div>;
  }

  return (
    <div className="space-y-4">
      {/* Filter and search controls */}
      <div className="bg-accent/50 rounded-lg p-4 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <h2 className="text-xl font-bold">{t('review.applications')}</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportCSV}
              className="flex items-center gap-1"
              title={t('review.exportCSV')}
            >
              <Download className="h-4 w-4" />
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportExcel}
              className="flex items-center gap-1"
              title={t('review.exportExcel')}
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel
            </Button>
          </div>
        </div>
        
        <ApplicationFilters 
          filter={filter} 
          onFilterChange={updateFilter} 
        />
      </div>

      {/* Card view for mobile */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-center text-muted-foreground">
                {t('review.noApplicationsFound')}
              </p>
            </CardContent>
          </Card>
        ) : (
          applications.map((app) => (
            <Card key={app?.id || 'unknown'} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {app.country && <CountryFlag country={app.country} size={20} />}
                      <span className="font-medium">
                        {app.country ? t(`countries.${getCountryKey(app.country)}`) : t('general.unknown')}
                      </span>
                    </div>
                    {getResultBadge(app)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('table.city')}</p>
                      <p>{app.city || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('table.purpose')}</p>
                      <p>{app.purpose ? t(`purpose.${app.purpose.toLowerCase()}`) : '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('table.submissionDate')}</p>
                      <p>{formatDate(app.applicationSubmitDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('table.appointmentDate')}</p>
                      <p>{formatDate(app.appointmentDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('table.returnDate')}</p>
                      <p>{formatDate(app.passportReturnDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('table.processingTime')}</p>
                      <Badge 
                        variant={getProcessingDays(app) > 90 ? "destructive" : "outline"}
                        className={getProcessingDays(app) < 30 ? "bg-green-500 text-white" : ""}
                      >
                        {getProcessingDays(app)} {t('table.days')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Pagination controls */}
      <ApplicationPagination 
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ApplicationTableMobile;
