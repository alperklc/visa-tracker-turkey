
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApplications } from '@/hooks/useApplications';
import { ApplicationStats, VisaApplication, Country } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
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

  const COLORS = ['#4ade80', '#f87171', '#93c5fd'];

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard 
                title={t('dashboard.totalApplications')} 
                value={stats.totalApplications.toString()} 
                description={t('dashboard.description')} 
              />
              <StatsCard 
                title={t('dashboard.avgProcessingTime')} 
                value={`${stats.averageProcessingDays} ${t('dashboard.days')}`} 
                description={t('dashboard.description')} 
              />
              <StatsCard 
                title={t('dashboard.approvalRate')} 
                value={`${stats.approvalRate}%`} 
                description={t('dashboard.description')} 
              />
              <StatsCard 
                title={t('dashboard.latestApplication')} 
                value={formatDate(applications.length > 0 
                  ? applications.sort((a, b) => 
                      b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt 
                  : null)} 
                description={t('dashboard.description')} 
              />
            </div>
            
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
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>{t('dashboard.processingTime')}</CardTitle>
            <CardDescription>
              {t('dashboard.processingTimeDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={processingTimeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis label={{ value: t('dashboard.days'), angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="days" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>{t('dashboard.applicationResults')}</CardTitle>
            <CardDescription>
              {t('dashboard.applicationResultsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resultData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {resultData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {resultData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
