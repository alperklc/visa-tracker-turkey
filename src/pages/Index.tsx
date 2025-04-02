
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ProcessingTrends from '@/components/ProcessingTrends';
import FinancialImpact from '@/components/FinancialImpact';
import LiteApplicationTable from '@/components/LiteApplicationTable';
import { useStaticStats } from '@/hooks/useStaticStats';

const Index: React.FC = () => {
  const { stats, loading } = useStaticStats();
  const { t } = useLanguage();
  
  // Format applications from static file
  const formatApplications = (apps: any[] = []) => {
    return apps.map(app => ({
      id: app.id,
      country: app.country,
      city: app.city,
      purposeOfVisit: app.purpose,
      applicationSubmitDate: new Date(app.submission_date),
      appointmentDate: app.appointment_date ? new Date(app.appointment_date) : null,
      passportReturnDate: app.return_date ? new Date(app.return_date) : null,
      result: app.result_status ? {
        status: app.result_status,
        validity: app.validity,
        entryType: app.entry_type,
        rejectionReason: app.rejection_reason
      } : null,
      createdAt: new Date(app.created_at)
    }));
  };
  
  // Format statistics for StatsOverview
  const formatStats = () => {
    if (!stats) return {
      totalApplications: 0,
      averageProcessingDays: 0,
      approvalRate: 0,
      trendsLastThreeMonths: [],
      totalAnnualApplications: 85000,
      totalAnnualCost: 25500000,
      worstCities: [],
      citiesProcessingTime: []
    };
    
    return {
      totalApplications: stats.totalApplications,
      averageProcessingDays: stats.averageWaitingDays,
      approvalRate: stats.approvalRate,
      trendsLastThreeMonths: [
        { month: 'Current', averageDays: stats.averageWaitingDays }
      ],
      totalAnnualApplications: 85000, // Estimated
      totalAnnualCost: 25500000, // Estimated
      worstCities: [],
      citiesProcessingTime: []
    };
  };
  
  const recentApplications = stats ? formatApplications(stats.latestApplications) : [];
  
  return (
    <Layout>
      {/* 1. Banner on top */}
      <Hero />
      
      {/* 2. Tiles with application numbers */}
      <section className="container py-10 animate-fade-in">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('dashboard.title')}</h2>
        {loading ? (
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
        ) : (
          <StatsOverview stats={formatStats()} applications={recentApplications} />
        )}
        
        {stats && (
          <div className="text-center text-sm text-muted-foreground mt-2">
            {t('dashboard.lastUpdated')}: {new Date(stats.lastUpdated).toLocaleString()}
          </div>
        )}
      </section>
      
      {/* 3. Waiting times for worst cities and economic effects */}
      <section className="container py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ProcessingTrends 
              trendsData={formatStats().trendsLastThreeMonths}
              worstCities={formatStats().worstCities}
            />
          </div>
          <div className="lg:col-span-1">
            <FinancialImpact 
              totalAnnualApplications={formatStats().totalAnnualApplications}
              totalAnnualCost={formatStats().totalAnnualCost}
            />
          </div>
        </div>
      </section>
      
      {/* 4. Last 5 entries in the table */}
      <section className="container py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{t('recentApplications.community')}</h2>
          <div className="space-x-4">
            <Link to="/submit">
              <Button variant="outline">
                {t('recentApplications.submit')}
              </Button>
            </Link>
            <Link to="/review">
              <Button>
                {t('review.seeAll')}
              </Button>
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded-md w-full"></div>
            <div className="h-64 bg-muted rounded-md w-full"></div>
          </div>
        ) : recentApplications.length > 0 ? (
          <Card className="overflow-hidden">
            <LiteApplicationTable applications={recentApplications} />
          </Card>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">{t('recentApplications.noApplications')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('recentApplications.beFirst')}
            </p>
            <Link to="/submit">
              <Button>{t('recentApplications.submitApplication')}</Button>
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
