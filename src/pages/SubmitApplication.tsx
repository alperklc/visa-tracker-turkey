
import React from 'react';
import Layout from '@/components/Layout';
import ApplicationForm from '@/components/application-form';
import { useLanguage } from '@/lib/LanguageContext';

const SubmitApplication: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Layout className="py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">{t('form.detailsTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('form.detailsDescription')}
          </p>
        </div>
        
        <ApplicationForm />
      </div>
    </Layout>
  );
};

export default SubmitApplication;
