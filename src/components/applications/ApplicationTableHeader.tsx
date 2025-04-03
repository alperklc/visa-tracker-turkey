
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from '@/lib/LanguageContext';
import { ApplicationsFilter } from '@/hooks/useApplicationsData';

interface ApplicationTableHeaderProps {
  filter: ApplicationsFilter;
  onSortChange: (column: string) => void;
}

const ApplicationTableHeader: React.FC<ApplicationTableHeaderProps> = ({ 
  filter, 
  onSortChange 
}) => {
  const { t } = useLanguage();

  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t('table.country')}</TableHead>
        <TableHead>{t('table.city')}</TableHead>
        <TableHead>{t('table.purpose')}</TableHead>
        <TableHead onClick={() => onSortChange('submission_date')} className="cursor-pointer hover:bg-accent">
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
  );
};

export default ApplicationTableHeader;
