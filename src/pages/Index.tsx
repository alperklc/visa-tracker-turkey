
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import ApplicationTable from '@/components/ApplicationTable';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { useApplications } from '@/hooks/useApplications';
import { Card } from '@/components/ui/card';

const Index: React.FC = () => {
  const { applications, loading } = useApplications();
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Hero />
      
      <section className="container py-16 animate-fade-in">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('dashboard.title')}</h2>
        <Dashboard />
      </section>
      
      <section className="container py-16 animate-fade-in">
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
        ) : applications.length > 0 ? (
          <Card className="overflow-hidden">
            <ApplicationTable />
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
