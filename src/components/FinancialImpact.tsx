
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/LanguageContext';
import { DollarSign, Wallet, CalendarDays } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FinancialImpactProps {
  totalAnnualApplications: number;
  totalAnnualCost: number;
}

const FinancialImpact: React.FC<FinancialImpactProps> = ({ 
  totalAnnualApplications,
  totalAnnualCost 
}) => {
  const { t } = useLanguage();
  
  // Real data for the impact
  const visaFee = 80; // EUR for Schengen visa
  const serviceFee = 30; // EUR average service fee
  const additionalCosts = 150; // EUR for travel, insurance, etc.
  const totalPerApplication = visaFee + serviceFee + additionalCosts;
  
  // More realistic annual visa application numbers
  const realAnnualApplications = 275600; // Based on 2023 data
  const realAnnualCost = realAnnualApplications * totalPerApplication;
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{t('financial.title')}</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
        </div>
        <CardDescription>{t('financial.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">{t('financial.applications')}</span>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat().format(realAnnualApplications)}
              </div>
            </div>
            <div className="p-2 bg-primary/5 rounded-full">
              <CalendarDays className="w-4 h-4 text-primary" />
            </div>
          </div>
          <Progress value={85} className="h-2" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">{t('financial.cost')}</span>
              <div className="text-2xl font-bold">
                €{new Intl.NumberFormat().format(realAnnualCost)}
              </div>
            </div>
            <div className="p-2 bg-primary/5 rounded-full">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
          </div>
          <Progress value={70} className="h-2" />
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="bg-accent/30 rounded-lg p-3">
            <div className="text-sm font-medium mb-1">{t('financial.breakdown')}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>{t('financial.visaFee')}:</div>
              <div className="text-right font-medium">€{visaFee}</div>
              <div>{t('financial.serviceFee')}:</div>
              <div className="text-right font-medium">€{serviceFee}</div>
              <div>{t('financial.otherCosts')}:</div>
              <div className="text-right font-medium">€{additionalCosts}</div>
              <div className="font-medium">{t('financial.perVisit')}:</div>
              <div className="text-right font-medium">€{totalPerApplication}</div>
            </div>
          </div>
        </div>
        
        <div className="text-[10px] text-muted-foreground mt-4">
          <a 
            href="https://statistics.schengenvisainfo.com/schengen-visa-statistics-applications/"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Source: Schengen Visa Statistics 2023
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialImpact;
