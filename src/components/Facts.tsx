
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GeneralTab from './facts/GeneralTab';
import SchengenTab from './facts/SchengenTab';
import ComparisonTab from './facts/ComparisonTab';
import FeesTab from './facts/FeesTab';

const Facts: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="container py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('facts.title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('facts.subtitle')}
        </p>
      </div>
      
      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">{t('facts.general')}</TabsTrigger>
          <TabsTrigger value="schengen">{t('facts.schengen')}</TabsTrigger>
          <TabsTrigger value="comparison">{t('facts.comparison')}</TabsTrigger>
          <TabsTrigger value="fees">{t('facts.fees')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-8">
          <GeneralTab />
        </TabsContent>
        
        <TabsContent value="schengen" className="space-y-8">
          <SchengenTab />
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-8">
          <ComparisonTab />
        </TabsContent>
        
        <TabsContent value="fees" className="space-y-8">
          <FeesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Facts;
