import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { VisaApplication } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from './CountryFlag';

interface LiteApplicationTableProps {
  applications: VisaApplication[];
  className?: string;
}

export const LiteApplicationTable: React.FC<LiteApplicationTableProps> = ({ 
  applications,
  className 
}) => {
  const { t } = useLanguage();

  const formatDate = (date: Date | null) => {
    if (!date) return t('table.pending');
    return date.toLocaleDateString();
  };

  const getProcessingDays = (app: VisaApplication) => {
    if (!app.passportReturnDate) {
      const today = new Date();
      return Math.floor((today.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((app.passportReturnDate.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
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

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.country')}</TableHead>
            <TableHead>{t('table.city')}</TableHead>
            <TableHead>{t('table.purpose')}</TableHead>
            <TableHead>{t('table.submissionDate')}</TableHead>
            <TableHead>{t('table.processingTime')}</TableHead>
            <TableHead>{t('table.result')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.slice(0, 5).map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CountryFlag country={app.country} size={20} />
                  {app.country}
                </div>
              </TableCell>
              <TableCell>{app.city}</TableCell>
              <TableCell>{t(`purpose.${app.purposeOfVisit.toLowerCase()}`)}</TableCell>
              <TableCell>{formatDate(app.applicationSubmitDate)}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getProcessingDays(app)} {t('table.days')}
                </Badge>
              </TableCell>
              <TableCell>{getResultBadge(app)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LiteApplicationTable; 