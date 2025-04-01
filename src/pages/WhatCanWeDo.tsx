
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatsGridCard from '@/components/dashboard/StatsGridCard';
import { ArrowRight, BookOpen, ClipboardList, FileText, Globe, Megaphone, MessageSquare, Plane, Scale, Users } from 'lucide-react';
import { Description } from '@radix-ui/react-dialog';

const WhatCanWeDo: React.FC = () => {
  const { t } = useLanguage();
  
  const actionLinks = [
    {
      icon: <Megaphone className="w-6 h-6" />,
      description: '\n',
      title: t('actions.awareness.title'),
      link: '/discussions',
      iconClassName: 'text-purple-700',
      points: [
        t('actions.awareness.point1'),
        t('actions.awareness.point2'),
        t('actions.awareness.point3'),
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: t('actions.legal.title'),
      description: '\n',
      link: '/facts',
      iconClassName: 'text-amber-700',
      points: [
        t('actions.legal.point1'),
        t('actions.legal.point2'),
        t('actions.legal.point3'),
      ]
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: t('actions.tourism.title'),
      description: '\n',
      link: '/review',
      iconClassName: 'text-green-700',
      points: [
        t('actions.tourism.point1'),
        t('actions.tourism.point2'),
        t('actions.tourism.point3'),
      ]
    },
    {
      title: t('actions.diaspora.title'),
      description: '\n',
      icon: <Users className="h-6 w-6" />,
      link: '/submit',
      iconClassName: 'text-blue-700',
      points: [
        t('actions.diaspora.point1'),
        t('actions.diaspora.point2'),
        t('actions.diaspora.point3'),
      ]
    },
  ];

  return (
    <Layout className="py-12">
      <div className="container max-w-5xl">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">{t('actions.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('actions.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {actionLinks.map((action, index) => (
            <StatsGridCard
              key={index}
              title={action.title}
              icon={action.icon}
              points={action.points}
              description={action.description}
              iconClassName={action.iconClassName}
              className="animate-fade-in h-full"
            />
          ))}
        </div>
        
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">{t('actions.communityTitle')}</CardTitle>
            <CardDescription>{t('actions.alternatives.title')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t('actions.communityContent1')}</p>
            <p>{t('actions.alternatives.description')}</p>
          </CardContent>
          <CardFooter>
            <Link to="/discussions" className="w-full">
              <Button variant="outline" className="w-full group">
                <span>{t('actions.joinCommunity')}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">{t('actions.readyTitle')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('actions.readyDescription')}
          </p>
          <Link to="/submit">
            <Button size="lg" className="px-8">
              {t('actions.getStarted')}
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default WhatCanWeDo;
