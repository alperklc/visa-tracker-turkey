import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Users, Megaphone, Scale, Plane, Globe, Mail } from 'lucide-react';
import Layout from '@/components/Layout';

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
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">{t('actions.title')}</h1>
          <p className="text-xl text-muted-foreground">{t('actions.subtitle')}</p>
        </header>

        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">{t('actions.disclaimer.title')}</h3>
            <p className="text-yellow-700 text-sm">{t('actions.disclaimer.text')}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actionCards.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {card.icon}
                  <CardTitle>{card.title}</CardTitle>
                </div>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {card.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6" />
                <CardTitle>{t('actions.alternatives.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>{t('actions.alternatives.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Thailand', 'Malaysia', 'Singapore',
                    'South Korea', 'Japan', 'UAE',
                    'Mexico', 'Georgia', 'Serbia'
                  ].map((country) => (
                    <div key={country} className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                      <Plane className="w-4 h-4" />
                      <span>{country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6" />
                <CardTitle>{t('actions.contact.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{t('actions.contact.description')}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="mailto:feedback@example.com" 
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  {t('actions.contact.email')}
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default WhatCanWeDo; 