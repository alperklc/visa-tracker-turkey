
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from '../CountryFlag';
import { Country } from '@/types/countries';

interface ApplicationTableRowProps {
  application: any;
}

const ApplicationTableRow: React.FC<ApplicationTableRowProps> = ({ application }) => {
  const { t } = useLanguage();
  
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

  return (
    <TableRow className={getRowColorClass(application)}>
      <TableCell>
        {application?.country ? (
          <div className="flex items-center gap-2">
            <CountryFlag country={application.country as Country} size={20} />
            {t(`countries.${application.country.replace(/\s+/g, '').toLowerCase()}`)}
          </div>
        ) : (
          'Unknown'
        )}
      </TableCell>
      <TableCell>{application?.city || 'Unknown'}</TableCell>
      <TableCell>
        {application?.purpose ? t(`purposes.${application.purpose.toLowerCase()}`) : 'Unknown'}
      </TableCell>
      <TableCell>{formatDate(application?.applicationSubmitDate || null)}</TableCell>
      <TableCell>{formatDate(application?.appointmentDate || null)}</TableCell>
      <TableCell>{formatDate(application?.passportReturnDate || null)}</TableCell>
      <TableCell>
        <Badge 
          variant={getProcessingDays(application) > 90 ? "destructive" : "outline"}
          className={getProcessingDays(application) < 30 ? "bg-green-500 text-white" : ""}
        >
          {getProcessingDays(application)} {t('table.days')}
        </Badge>
      </TableCell>
      <TableCell>{getResultBadge(application)}</TableCell>
    </TableRow>
  );
};

export default ApplicationTableRow;
