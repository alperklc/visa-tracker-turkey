
import React from 'react';
import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useApplicationsData } from '@/hooks/useApplicationsData';
import ApplicationFilters from './ApplicationFilters';
import ApplicationTableHeader from './ApplicationTableHeader';
import ApplicationTableRow from './ApplicationTableRow';
import ApplicationPagination from './ApplicationPagination';
import { exportToCSV, exportToExcel } from '@/utils/exportData';

const ApplicationTable: React.FC = () => {
  const { t } = useLanguage();
  const { 
    applications, 
    pagination, 
    loading, 
    filter, 
    updateFilter, 
    refresh 
  } = useApplicationsData();

  const toggleSort = (column: string) => {
    if (filter.sortBy === column) {
      updateFilter({ sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      updateFilter({ sortBy: column, sortOrder: 'desc' });
    }
  };

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

  if (loading && applications.length === 0) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded-md w-full"></div>
      <div className="h-64 bg-muted rounded-md w-full"></div>
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refresh}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              {t('review.common.refresh')}
            </Button>
          </div>
        </div>
        
        <ApplicationFilters 
          filter={filter} 
          onFilterChange={updateFilter} 
        />
      </div>

      {/* Table with data */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption>{t('table.caption')}</TableCaption>
          <ApplicationTableHeader 
            filter={filter} 
            onSortChange={toggleSort} 
          />
          <TableBody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  {t('review.noApplicationsFound')}
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <ApplicationTableRow 
                  key={app?.id || 'unknown'} 
                  application={app} 
                />
              ))
            )}
          </TableBody>
        </Table>
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

export default ApplicationTable;
