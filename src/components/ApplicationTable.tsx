
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Flag } from 'lucide-react';
import { VisaApplication } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { useApplications } from '@/hooks/useApplications';

export const ApplicationTable = () => {
  const { applications, loading } = useApplications();
  const { t } = useLanguage();

  // Sort applications by submission date (newest first)
  const sortedApplications = [...applications].sort((a, b) => 
    b.applicationSubmitDate.getTime() - a.applicationSubmitDate.getTime()
  );

  const getProcessingDays = (app: VisaApplication) => {
    if (!app.passportReturnDate) {
      const today = new Date();
      return Math.floor((today.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((app.passportReturnDate.getTime() - app.applicationSubmitDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getRowColorClass = (processingDays: number) => {
    if (processingDays < 30) return "bg-[#F2FCE2]"; // Light green for less than a month
    if (processingDays <= 90) return "bg-[#FEF7CD]"; // Light yellow for up to three months
    return "bg-red-100"; // Light red for more than three months
  };

  const formatDate = (date: Date | null) => {
    if (!date) return t('table.pending');
    return date.toLocaleDateString();
  };

  const getCountryFlag = (country: string) => {
    if (country === "Germany") return "🇩🇪";
    if (country === "Italy") return "🇮🇹";
    return "";
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

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded-md w-full"></div>
      <div className="h-64 bg-muted rounded-md w-full"></div>
    </div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableCaption>{t('table.caption')}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.country')}</TableHead>
            <TableHead>{t('table.city')}</TableHead>
            <TableHead>{t('table.purpose')}</TableHead>
            <TableHead>{t('table.submissionDate')}</TableHead>
            <TableHead>{t('table.appointmentDate')}</TableHead>
            <TableHead>{t('table.returnDate')}</TableHead>
            <TableHead>{t('table.processingTime')}</TableHead>
            <TableHead>{t('table.result')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedApplications.map((app) => {
            const processingDays = getProcessingDays(app);
            return (
              <TableRow key={app.id} className={getRowColorClass(processingDays)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCountryFlag(app.country)}</span>
                    {app.country}
                  </div>
                </TableCell>
                <TableCell>{app.city}</TableCell>
                <TableCell>{app.purposeOfVisit}</TableCell>
                <TableCell>{formatDate(app.applicationSubmitDate)}</TableCell>
                <TableCell>{formatDate(app.appointmentDate)}</TableCell>
                <TableCell>{formatDate(app.passportReturnDate)}</TableCell>
                <TableCell>
                  <Badge variant={processingDays > 90 ? "destructive" : "outline"}>
                    {processingDays} {t('table.days')}
                  </Badge>
                </TableCell>
                <TableCell>{getResultBadge(app)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
