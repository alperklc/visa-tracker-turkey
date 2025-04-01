
import React from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/lib/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/useIsMobile';
import GeneralTab from './facts/GeneralTab';
import SchengenTab from './facts/SchengenTab';
import ComparisonTab from './facts/ComparisonTab';
import FeesTab from './facts/FeesTab';

const Facts: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="container py-12 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('facts.title')}</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('facts.subtitle')}
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className={`${isMobile ? 'flex flex-col space-y-1 w-full h-auto' : 'flex justify-center'} mb-8`}>
            <TabsTrigger value="general">{t('facts.general')}</TabsTrigger>
            <TabsTrigger value="schengen">{t('facts.schengen')}</TabsTrigger>
            <TabsTrigger value="comparison">{t('facts.comparison')}</TabsTrigger>
            <TabsTrigger value="fees">{t('facts.fees')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>
          
          <TabsContent value="schengen">
            <SchengenTab />
          </TabsContent>
          
          <TabsContent value="comparison">
            <ComparisonTab />
          </TabsContent>
          
          <TabsContent value="fees">
            <FeesTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Facts;
