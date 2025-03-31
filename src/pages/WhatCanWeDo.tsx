
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatsGridCard from '@/components/dashboard/StatsGridCard';
import { ArrowRight, BookOpen, ClipboardList, FileText, Globe, MessageSquare, PenSquare } from 'lucide-react';

const WhatCanWeDo: React.FC = () => {
  const { t } = useLanguage();
  
  const actionLinks = [
    {
      title: t('actions.submitApplication'),
      description: t('actions.submitApplicationDescription'),
      icon: <PenSquare className="h-6 w-6" />,
      link: '/submit',
      iconClassName: 'bg-blue-100 text-blue-700',
      stat: '5 min'
    },
    {
      title: t('actions.viewApplications'),
      description: t('actions.viewApplicationsDescription'),
      icon: <ClipboardList className="h-6 w-6" />,
      link: '/review',
      iconClassName: 'bg-green-100 text-green-700',
      stat: '100+'
    },
    {
      title: t('actions.joinDiscussion'),
      description: t('actions.joinDiscussionDescription'),
      icon: <MessageSquare className="h-6 w-6" />,
      link: '/discussions',
      iconClassName: 'bg-purple-100 text-purple-700',
      stat: '24/7'
    },
    {
      title: t('actions.learnFacts'),
      description: t('actions.learnFactsDescription'),
      icon: <BookOpen className="h-6 w-6" />,
      link: '/facts',
      iconClassName: 'bg-amber-100 text-amber-700',
      stat: '10+'
    },
    {
      title: t('actions.followNews'),
      description: t('actions.followNewsDescription'),
      icon: <Globe className="h-6 w-6" />,
      link: '/news',
      iconClassName: 'bg-red-100 text-red-700',
      stat: 'Daily'
    },
    {
      title: t('actions.readGuides'),
      description: t('actions.readGuidesDescription'),
      icon: <FileText className="h-6 w-6" />,
      link: '/guides',
      iconClassName: 'bg-teal-100 text-teal-700',
      stat: '15+'
    }
  ];

  return (
    <Layout className="py-12">
      <div className="container max-w-5xl">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">{t('whatCanWeDo.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('whatCanWeDo.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {actionLinks.map((action, index) => (
            <StatsGridCard
              key={index}
              title={action.title}
              stat={action.stat}
              icon={action.icon}
              description={action.description}
              iconClassName={action.iconClassName}
              className="animate-fade-in h-full"
            />
          ))}
        </div>
        
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">{t('whatCanWeDo.communityTitle')}</CardTitle>
            <CardDescription>{t('whatCanWeDo.communityDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t('whatCanWeDo.communityContent1')}</p>
            <p>{t('whatCanWeDo.communityContent2')}</p>
          </CardContent>
          <CardFooter>
            <Link to="/discussions" className="w-full">
              <Button variant="outline" className="w-full group">
                <span>{t('whatCanWeDo.joinCommunity')}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">{t('whatCanWeDo.readyTitle')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('whatCanWeDo.readyDescription')}
          </p>
          <Link to="/submit">
            <Button size="lg" className="px-8">
              {t('whatCanWeDo.getStarted')}
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default WhatCanWeDo;
