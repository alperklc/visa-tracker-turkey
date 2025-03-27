
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/LanguageContext';
import { Euro, Users } from 'lucide-react';

interface FinancialImpactProps {
  totalAnnualApplications: number;
  totalAnnualCost: number;
}

const FinancialImpact: React.FC<FinancialImpactProps> = ({ 
  totalAnnualApplications, 
  totalAnnualCost 
}) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-background">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Euro className="h-5 w-5" />
          {t('dashboard.financialImpact')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {t('dashboard.totalAnnualApplications')}
              </span>
            </div>
            <div className="text-3xl font-bold">
              {totalAnnualApplications.toLocaleString()}
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {t('dashboard.totalAnnualCost')}
              </span>
            </div>
            <div className="text-3xl font-bold">
              €{totalAnnualCost.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialImpact;
