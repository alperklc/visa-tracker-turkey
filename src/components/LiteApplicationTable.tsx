
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { VisaApplication } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from './CountryFlag';
import { Card, CardContent } from './ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface LiteApplicationTableProps {
  applications: VisaApplication[];
}

const LiteApplicationTable: React.FC<LiteApplicationTableProps> = ({ applications }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  const getProcessingDays = (app: VisaApplication) => {
    if (!app.passportReturnDate) {
      const today = new Date();
      return Math.floor((today.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((app.passportReturnDate.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
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

  // Safe country key conversion for translation
  const getCountryKey = (countryName: string) => {
    if (!countryName) return 'unknown';
    return countryName.replace(/\s+/g, '').toLowerCase();
  };

  // Render as cards on mobile
  if (isMobile) {
    return (
      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {app.country && <CountryFlag country={app.country} size={20} />}
                    <span className="font-medium">
                      {app.country ? t(`countries.${getCountryKey(app.country)}`) : t('general.unknown')}
                    </span>
                  </div>
                  {getResultBadge(app)}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('table.city')}</p>
                    <p>{app.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('table.purpose')}</p>
                    <p>{app.purposeOfVisit ? t(`purpose.${app.purposeOfVisit.toLowerCase()}`) : '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('table.submissionDate')}</p>
                    <p>{formatDate(app.applicationSubmitDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('table.processingTime')}</p>
                    <Badge variant="outline">
                      {getProcessingDays(app)} {t('table.days')}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Render as table on desktop
  return (
    <div className="overflow-x-auto">
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
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {app.country && <CountryFlag country={app.country} size={20} />}
                  {app.country ? t(`countries.${getCountryKey(app.country)}`) : '-'}
                </div>
              </TableCell>
              <TableCell>{app.city || '-'}</TableCell>
              <TableCell>{app.purposeOfVisit ? t(`purpose.${app.purposeOfVisit.toLowerCase()}`) : '-'}</TableCell>
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
