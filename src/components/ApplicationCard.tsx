
import React from 'react';
import { VisaApplication } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import CountryFlag from './CountryFlag';

interface ApplicationCardProps {
  application: VisaApplication;
  className?: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, className }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Calculate processing time in days
  const calculateProcessingDays = () => {
    if (!application.passportReturnDate) return 'In progress';
    
    const start = application.applicationSubmitDate;
    const end = application.passportReturnDate;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} days`;
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-3 flex flex-row justify-between items-start">
        <div>
          <div className="text-xs text-muted-foreground mb-1">
            Application for
          </div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <CountryFlag country={application.country} size={20} />
            {application.country}
          </h3>
          <div className="text-sm text-muted-foreground">{application.city}</div>
        </div>
        <Badge 
          className={cn(
            "border", 
            getStatusColor(application.result?.status)
          )}
        >
          {application.result?.status || 'Pending'}
        </Badge>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Purpose</div>
            <div className="text-sm">{application.purposeOfVisit}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Duration</div>
            <div className="text-sm">{application.durationOfVisit}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Submitted</div>
            <div className="text-sm">{formatDate(application.applicationSubmitDate)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Appointment</div>
            <div className="text-sm">{formatDate(application.appointmentDate)}</div>
          </div>
          {application.result?.status === 'Approved' && (
            <>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Validity</div>
                <div className="text-sm">{application.result.validity || 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Entry Type</div>
                <div className="text-sm">{application.result.entryType || 'N/A'}</div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/30 py-3">
        <div className="flex justify-between w-full text-xs">
          <span className="text-muted-foreground">Processing time: {calculateProcessingDays()}</span>
          <span className="text-muted-foreground">Added on {formatDate(application.createdAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
