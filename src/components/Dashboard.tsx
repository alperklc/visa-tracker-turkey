import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApplications } from '@/hooks/useApplications';
import { Country } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

import StatsOverview from './dashboard/StatsOverview';
import ProcessingTimeChart from './dashboard/ProcessingTimeChart';
import ResultsPieChart from './dashboard/ResultsPieChart';
import ProcessingTrends from './ProcessingTrends';
import FinancialImpact from './FinancialImpact';

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const { applications, stats, loading } = useApplications();
  const [selectedCountry, setSelectedCountry] = useState<Country | 'All'>('All');
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className={cn("w-full flex justify-center items-center py-12", className)}>
        <div className="glass-card p-8 rounded-lg animate-pulse flex flex-col items-center">
          <div className="h-6 w-32 bg-muted rounded-md mb-4"></div>
          <div className="h-64 w-full bg-muted rounded-md"></div>
        </div>
      </div>
    );
  }

  const filteredApplications = selectedCountry === 'All' 
    ? applications 
    : applications.filter(app => app.country === selectedCountry);

  // Prepare data for the processing time chart
  const processingTimeData = filteredApplications
    .filter(app => app.passportReturnDate && app.applicationSubmitDate)
    .map(app => {
      const processingDays = Math.floor(
        ((app.passportReturnDate as Date).getTime() - app.applicationSubmitDate.getTime()) / 
        (1000 * 60 * 60 * 24)
      );
      return {
        id: app.id,
        country: app.country,
        city: app.city,
        days: processingDays
      };
    })
    .sort((a, b) => a.days - b.days);

  // Prepare data for the pie chart
  const resultData = [
    {
      name: t('dashboard.approved'),
      value: filteredApplications.filter(app => app.result?.status === 'Approved').length
    },
    {
      name: t('dashboard.rejected'),
      value: filteredApplications.filter(app => app.result?.status === 'Rejected').length
    },
    {
      name: t('dashboard.pending'),
      value: filteredApplications.filter(app => !app.result || app.result.status === 'Pending').length
    }
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-[400px] mx-auto mb-8">
            <TabsTrigger value="all" onClick={() => setSelectedCountry('All')}>
              {t('dashboard.allCountries')}
            </TabsTrigger>
            <TabsTrigger value="germany" onClick={() => setSelectedCountry('Germany')}>
              Germany
            </TabsTrigger>
            <TabsTrigger value="italy" onClick={() => setSelectedCountry('Italy')}>
              Italy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-slide-up">
            <StatsOverview stats={stats} applications={applications} />
            
            {/* Financial Impact Section - Show at the top */}
            <div className="mb-8">
              <FinancialImpact 
                totalAnnualApplications={stats.totalAnnualApplications}
                totalAnnualCost={stats.totalAnnualCost}
              />
            </div>
            
            {/* Processing Trends Section - Show under financial impact */}
            <div className="mb-8">
              <ProcessingTrends 
                trendsData={stats.trendsLastThreeMonths}
                worstCities={stats.worstCities}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="germany" className="animate-slide-up">
            {/* Content for Germany tab */}
          </TabsContent>
          
          <TabsContent value="italy" className="animate-slide-up">
            {/* Content for Italy tab */}
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProcessingTimeChart processingTimeData={processingTimeData} />
        <ResultsPieChart resultData={resultData} />
      </div>
    </div>
  );
};

export default Dashboard;
