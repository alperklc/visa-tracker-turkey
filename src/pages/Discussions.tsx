
import React from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const Discussions: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Layout className="py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">{t('discussions.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('discussions.subtitle')}
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {t('discussions.comingSoon')}
            </CardTitle>
            <CardDescription>
              {t('discussions.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {t('discussions.placeholder')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Discussions;
