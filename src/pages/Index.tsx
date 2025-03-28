
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { useApplications } from '@/hooks/useApplications';
import { Card } from '@/components/ui/card';
import ApplicationTable from '@/components/ApplicationTable';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ProcessingTrends from '@/components/ProcessingTrends';
import FinancialImpact from '@/components/FinancialImpact';

const Index: React.FC = () => {
  const { applications, stats, loading } = useApplications();
  const { t } = useLanguage();
  
  // Display only the most recent 10 applications
  const recentApplications = [...applications]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);
  
  return (
    <Layout>
      {/* 1. Banner on top */}
      <Hero />
      
      {/* 2. Tiles with application numbers */}
      <section className="container py-10 animate-fade-in">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('dashboard.title')}</h2>
        <StatsOverview stats={stats} applications={applications} />
      </section>
      
      {/* 3. Waiting times for worst cities and economic effects */}
      <section className="container py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ProcessingTrends 
              trendsData={stats.trendsLastThreeMonths}
              worstCities={stats.worstCities}
            />
          </div>
          <div className="lg:col-span-1">
            <FinancialImpact 
              totalAnnualApplications={stats.totalAnnualApplications}
              totalAnnualCost={stats.totalAnnualCost}
            />
          </div>
        </div>
      </section>
      
      {/* 4. Last 10 entries in the table */}
      <section className="container py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{t('recentApplications.title')}</h2>
          <Link to="/submit">
            <Button variant="outline">
              {t('recentApplications.submit')}
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded-md w-full"></div>
            <div className="h-64 bg-muted rounded-md w-full"></div>
          </div>
        ) : recentApplications.length > 0 ? (
          <Card className="overflow-hidden">
            <ApplicationTable applications={recentApplications} />
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
