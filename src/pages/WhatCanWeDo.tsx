
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatsGridCard from '@/components/dashboard/StatsGridCard';
import { ArrowRight, Bookmark, BookOpen, ClipboardList, FileText, Globe, Megaphone, MessageSquare, Plane, Scale, Share, Share2, Users } from 'lucide-react';

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('appName'),
        text: t('actions.shareText'),
        url: window.location.origin,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.origin)
        .then(() => alert(t('actions.copied')))
        .catch((error) => console.log('Error copying', error));
    }
  };

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
            <CardTitle className="text-xl">{t('actions.shareTitle')}</CardTitle>
            <CardDescription>{t('actions.shareDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>{t('actions.shareButton')}</span>
              </Button>
              <Link to="/discussions">
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{t('actions.joinDiscussion')}</span>
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.origin), '_blank')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
                <span>X</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.origin), '_blank')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span>Facebook</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => window.open('https://wa.me/?text=' + encodeURIComponent(t('actions.shareText') + ' ' + window.location.origin), '_blank')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>WhatsApp</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => navigator.clipboard.writeText(window.location.origin).then(() => alert(t('actions.copied')))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>{t('actions.copyLink')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Get Started button removed as requested */}
      </div>
    </Layout>
  );
};

export default WhatCanWeDo;
