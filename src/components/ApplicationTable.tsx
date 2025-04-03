
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PurposeOfVisit } from '@/types/enums';
import { Country } from '@/types/countries';
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from './CountryFlag';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDown, ChevronUp, RefreshCw, Search } from 'lucide-react';
import { useApplicationsData, ApplicationsFilter } from '@/hooks/useApplicationsData';

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
  
  const getProcessingDays = (app: any) => {
    if (!app || !app.applicationSubmitDate) {
      return 0; // Default if no valid dates
    }
    
    if (!app.passportReturnDate) {
      const today = new Date();
      return Math.floor((today.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((app.passportReturnDate.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getRowColorClass = (app: any) => {
    if (!app) return "";
    
    // First check if the application is completed and has a result
    if (app.result) {
      if (app.result.status === "Approved") return "bg-green-100"; // Light green for approved
      if (app.result.status === "Rejected") return "bg-red-100"; // Light red for rejected
      return "bg-yellow-100"; // Light yellow for pending
    }
    
    // If no result yet, color based on processing time
    const processingDays = getProcessingDays(app);
    if (processingDays < 30) return "bg-green-100"; // Light green for less than a month
    if (processingDays <= 90) return "bg-yellow-100"; // Light yellow for up to three months
    return "bg-red-100"; // Light red for more than three months
  };

  const formatDate = (date: Date | null) => {
    if (!date) return t('table.pending');
    return date.toLocaleDateString();
  };
  
  const getResultBadge = (app: any) => {
    if (!app || !app.result) return <Badge variant="outline">{t('table.pending')}</Badge>;
    
    if (app.result.status === "Approved") {
      return <Badge className="bg-green-500">{t('table.approved')}</Badge>;
    } else if (app.result.status === "Rejected") {
      return <Badge className="bg-red-500">{t('table.rejected')}</Badge>;
    } else {
      return <Badge variant="outline">{t('table.pending')}</Badge>;
    }
  };

  const toggleSort = (column: string) => {
    if (filter.sortBy === column) {
      updateFilter({ sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      updateFilter({ sortBy: column, sortOrder: 'desc' });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter({ search: e.target.value });
  };

  const handleCountryChange = (value: string) => {
    updateFilter({ country: value === 'All' ? undefined : value });
  };

  const handlePurposeChange = (value: string) => {
    updateFilter({ purpose: value === 'All' ? undefined : value });
  };

  const handlePageSizeChange = (value: string) => {
    updateFilter({ pageSize: parseInt(value) });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;
    
    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Always show first page
    if (startPage > 1) {
      pages.push(
        <PaginationItem key="1">
          <PaginationLink isActive={currentPage === 1} onClick={() => updateFilter({ page: 1 })}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Add pages in the calculated range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => updateFilter({ page: i })}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Always show last page
    if (endPage < totalPages) {
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => updateFilter({ page: totalPages })}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refresh}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            {t('common.refresh')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">{t('review.search')}</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('review.searchPlaceholder')}
                value={filter.search || ''}
                onChange={handleSearchChange}
                className="pl-8"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">{t('review.filterCountry')}</label>
            <Select 
              value={filter.country || 'All'}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('review.selectCountry')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t('review.allCountries')}</SelectItem>
                {Object.values(Country).map((country) => (
                  <SelectItem key={country as string} value={country as string}>
                    <div className="flex items-center gap-2">
                      <CountryFlag country={country as Country} size={16} />
                      {t(`countries.${(country as string).replace(/\s+/g, '').toLowerCase()}`)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">{t('table.purpose')}</label>
            <Select 
              value={filter.purpose || 'All'}
              onValueChange={handlePurposeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('table.purpose')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t('review.allPurposes')}</SelectItem>
                {Object.values(PurposeOfVisit).map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {t(`purpose.${purpose.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table with data */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption>{t('table.caption')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.country')}</TableHead>
              <TableHead>{t('table.city')}</TableHead>
              <TableHead>{t('table.purpose')}</TableHead>
              <TableHead onClick={() => toggleSort('submission_date')} className="cursor-pointer hover:bg-accent">
                <div className="flex items-center gap-1">
                  {t('table.submissionDate')}
                  {filter.sortBy === 'submission_date' && (
                    filter.sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>{t('table.appointmentDate')}</TableHead>
              <TableHead>{t('table.returnDate')}</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  {t('table.processingTime')}
                </div>
              </TableHead>
              <TableHead>{t('table.result')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  {t('review.noApplicationsFound')}
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app?.id || 'unknown'} className={getRowColorClass(app)}>
                  <TableCell>
                    {app?.country ? (
                      <div className="flex items-center gap-2">
                        <CountryFlag country={app.country} size={20} />
                        {t(`countries.${app.country.replace(/\s+/g, '').toLowerCase()}`)}
                      </div>
                    ) : (
                      'Unknown'
                    )}
                  </TableCell>
                  <TableCell>{app?.city || 'Unknown'}</TableCell>
                  <TableCell>
                    {app?.purpose ? t(`purpose.${app.purpose.toLowerCase()}`) : 'Unknown'}
                  </TableCell>
                  <TableCell>{formatDate(app?.applicationSubmitDate || null)}</TableCell>
                  <TableCell>{formatDate(app?.appointmentDate || null)}</TableCell>
                  <TableCell>{formatDate(app?.passportReturnDate || null)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={getProcessingDays(app) > 90 ? "destructive" : "outline"}
                      className={getProcessingDays(app) < 30 ? "bg-green-500 text-white" : ""}
                    >
                      {getProcessingDays(app)} {t('table.days')}
                    </Badge>
                  </TableCell>
                  <TableCell>{getResultBadge(app)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t('pagination.rowsPerPage')}:
          </span>
          <Select 
            value={String(pagination.pageSize)} 
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => updateFilter({ page: Math.max(1, pagination.page - 1) })}
                aria-disabled={pagination.page === 1}
                className={pagination.page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPageNumbers()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => updateFilter({ page: Math.min(pagination.totalPages, pagination.page + 1) })}
                aria-disabled={pagination.page === pagination.totalPages}
                className={pagination.page === pagination.totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <div className="text-sm text-muted-foreground">
          {t('pagination.showing')} {(pagination.page - 1) * pagination.pageSize + 1}-
          {Math.min(pagination.page * pagination.pageSize, pagination.total)} {t('pagination.of')} {pagination.total}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTable;
