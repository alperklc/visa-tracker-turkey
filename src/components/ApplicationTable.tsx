
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { VisaApplication, Country, PurposeOfVisit } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { useApplications } from '@/hooks/useApplications';
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
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface ApplicationTableProps {
  applications?: VisaApplication[];
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ applications }) => {
  const { t } = useLanguage();
  const { applications: allApplications } = useApplications();
  
  // Use provided applications or all applications if not provided
  const displayApplications = applications || allApplications;
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Filtering and sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState<Country | 'All'>('All');
  const [filterPurpose, setFilterPurpose] = useState<PurposeOfVisit | 'All'>('All');
  const [sortBy, setSortBy] = useState<'submissionDate' | 'processingTime'>('submissionDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter and sort applications
  const filteredAndSortedApplications = React.useMemo(() => {
    // First filter the applications
    const filtered = displayApplications.filter(app => {
      // Filter by country
      if (filterCountry !== 'All' && app.country !== filterCountry) {
        return false;
      }
      
      // Filter by purpose
      if (filterPurpose !== 'All' && app.purposeOfVisit !== filterPurpose) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          app.country.toLowerCase().includes(searchLower) ||
          app.city.toLowerCase().includes(searchLower) ||
          app.purposeOfVisit.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
    
    // Then sort the filtered applications
    return [...filtered].sort((a, b) => {
      if (sortBy === 'submissionDate') {
        const aTime = a.applicationSubmitDate.getTime();
        const bTime = b.applicationSubmitDate.getTime();
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      } else {
        const aTime = getProcessingDays(a);
        const bTime = getProcessingDays(b);
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
    });
  }, [displayApplications, filterCountry, filterPurpose, searchTerm, sortBy, sortDirection]);

  // Paginate the results
  const paginatedApplications = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedApplications.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedApplications, currentPage, pageSize]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedApplications.length / pageSize);

  const getProcessingDays = (app: VisaApplication) => {
    if (!app.passportReturnDate) {
      const today = new Date();
      return Math.floor((today.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((app.passportReturnDate.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getRowColorClass = (app: VisaApplication) => {
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
  
  const getResultBadge = (app: VisaApplication) => {
    if (!app.result) return <Badge variant="outline">{t('table.pending')}</Badge>;
    
    if (app.result.status === "Approved") {
      return <Badge className="bg-green-500">{t('table.approved')}</Badge>;
    } else if (app.result.status === "Rejected") {
      return <Badge className="bg-red-500">{t('table.rejected')}</Badge>;
    } else {
      return <Badge variant="outline">{t('table.pending')}</Badge>;
    }
  };

  const toggleSort = (column: 'submissionDate' | 'processingTime') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  if (displayApplications.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">{t('recentApplications.noApplications')}</div>;
  }

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
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
          <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
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
          <PaginationLink isActive={currentPage === i} onClick={() => setCurrentPage(i)}>
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
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Filter and search controls */}
      <div className="bg-accent/50 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">{t('review.search')}</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('review.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">{t('review.filterCountry')}</label>
            <Select 
              value={filterCountry} 
              onValueChange={(value) => setFilterCountry(value as Country | 'All')}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('review.selectCountry')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t('review.allCountries')}</SelectItem>
                {Object.values(Country).map((country) => (
                  <SelectItem key={country} value={country}>
                    <div className="flex items-center gap-2">
                      <CountryFlag country={country} size={16} />
                      {t(`countries.${country.replace(/\s+/g, '').toLowerCase()}`)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">{t('table.purpose')}</label>
            <Select 
              value={filterPurpose} 
              onValueChange={(value) => setFilterPurpose(value as PurposeOfVisit | 'All')}
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
              <TableHead onClick={() => toggleSort('submissionDate')} className="cursor-pointer hover:bg-accent">
                <div className="flex items-center gap-1">
                  {t('table.submissionDate')}
                  {sortBy === 'submissionDate' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>{t('table.appointmentDate')}</TableHead>
              <TableHead>{t('table.returnDate')}</TableHead>
              <TableHead onClick={() => toggleSort('processingTime')} className="cursor-pointer hover:bg-accent">
                <div className="flex items-center gap-1">
                  {t('table.processingTime')}
                  {sortBy === 'processingTime' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>{t('table.result')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedApplications.map((app) => (
              <TableRow key={app.id} className={getRowColorClass(app)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CountryFlag country={app.country} size={20} />
                    {t(`countries.${app.country.replace(/\s+/g, '').toLowerCase()}`)}
                  </div>
                </TableCell>
                <TableCell>{app.city}</TableCell>
                <TableCell>{t(`purpose.${app.purposeOfVisit.toLowerCase()}`)}</TableCell>
                <TableCell>{formatDate(app.applicationSubmitDate)}</TableCell>
                <TableCell>{formatDate(app.appointmentDate)}</TableCell>
                <TableCell>{formatDate(app.passportReturnDate)}</TableCell>
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
            ))}
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
            value={String(pageSize)} 
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1); // Reset to first page when changing page size
            }}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={pageSize} />
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
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPageNumbers()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <div className="text-sm text-muted-foreground">
          {t('pagination.showing')} {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, filteredAndSortedApplications.length)} {t('pagination.of')} {filteredAndSortedApplications.length}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTable;
