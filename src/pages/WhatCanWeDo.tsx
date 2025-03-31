
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Users, Megaphone, Scale, Plane, Globe, Mail } from 'lucide-react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WhatCanWeDo = () => {
  const { t } = useLanguage();

  const actionCards = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t('actions.diaspora.title'),
      description: t('actions.diaspora.description'),
      points: [
        t('actions.diaspora.point1'),
        t('actions.diaspora.point2'),
        t('actions.diaspora.point3'),
      ]
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: t('actions.tourism.title'),
      description: t('actions.tourism.description'),
      points: [
        t('actions.tourism.point1'),
        t('actions.tourism.point2'),
        t('actions.tourism.point3'),
      ]
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: t('actions.awareness.title'),
      description: t('actions.awareness.description'),
      points: [
        t('actions.awareness.point1'),
        t('actions.awareness.point2'),
        t('actions.awareness.point3'),
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: t('actions.legal.title'),
      description: t('actions.legal.description'),
      points: [
        t('actions.legal.point1'),
        t('actions.legal.point2'),
        t('actions.legal.point3'),
      ]
    }
  ];

  return (
    <Layout>
      <div className="container py-12 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('actions.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('actions.subtitle')}
          </p>
        </div>
        
        <Tabs defaultValue="actions" className="space-y-8">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="actions">{t('actions.mainActions')}</TabsTrigger>
            <TabsTrigger value="alternatives">{t('actions.alternatives.title')}</TabsTrigger>
            <TabsTrigger value="contact">{t('actions.contact.title')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="actions" className="space-y-8">
            <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-800">{t('actions.disclaimer.title')}</h3>
                <p className="text-yellow-700 text-sm">{t('actions.disclaimer.text')}</p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {actionCards.map((card, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">{card.icon}</div>
                      <CardTitle>{card.title}</CardTitle>
                    </div>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {card.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </section>
          </TabsContent>
          
          <TabsContent value="alternatives" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Globe className="w-6 h-6" />
                  </div>
                  <CardTitle>{t('actions.alternatives.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>{t('actions.alternatives.description')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      'Thailand', 'Malaysia', 'Singapore',
                      'South Korea', 'Japan', 'UAE',
                      'Mexico', 'Georgia', 'Serbia'
                    ].map((country) => (
                      <div key={country} className="flex items-center gap-2 p-3 bg-accent rounded-lg transition-all hover:bg-accent/70">
                        <Plane className="w-4 h-4" />
                        <span>{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <CardTitle>{t('actions.contact.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{t('actions.contact.description')}</p>
                <div className="mt-4 flex flex-col md:flex-row gap-4">
                  <a 
                    href="mailto:feedback@example.com" 
                    className="inline-flex items-center gap-2 text-primary hover:underline bg-primary/5 p-3 rounded-lg transition-colors hover:bg-primary/10"
                  >
                    <Mail className="w-4 h-4" />
                    {t('actions.contact.email')}
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WhatCanWeDo;
