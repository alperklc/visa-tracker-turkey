
import React from 'react';
import StatsCard from './StatsCard';
import { useLanguage } from '@/lib/LanguageContext';
import { ApplicationStats, VisaApplication } from '@/lib/types';

interface StatsOverviewProps {
  stats: ApplicationStats;
  applications: VisaApplication[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, applications }) => {
  const { t } = useLanguage();
  
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard 
        title={t('dashboard.totalApplications')} 
        value={stats.totalApplications.toString()}
      />
      <StatsCard 
        title={t('dashboard.avgProcessingTime')} 
        value={`${stats.averageProcessingDays} ${t('dashboard.days')}`} 
      />
      <StatsCard 
        title={t('dashboard.approvalRate')} 
        value={`${stats.approvalRate}%`} 
      />
      <StatsCard 
        title={t('dashboard.latestApplication')} 
        value={formatDate(applications.length > 0 
          ? applications.sort((a, b) => 
              b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt 
          : null)} 
      />
    </div>
  );
};

export default StatsOverview;
