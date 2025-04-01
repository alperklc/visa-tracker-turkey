
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: any;
    disqus_config?: any;
  }
}

const Discussions: React.FC = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    // Setup Disqus with current page URL and language
    const loadDisqus = () => {
      const disqusShortname = 'visa-tracker-turkey'; // Replace with your Disqus shortname
      
      if (window.DISQUS) {
        // If Disqus exists, call reset
        window.DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = window.location.pathname;
            this.page.url = window.location.href;
            this.language = language;
          }
        });
      } else {
        // First load
        window.disqus_config = function() {
          this.page.identifier = window.location.pathname;
          this.page.url = window.location.href;
          this.language = language;
        };
        
        // Load Disqus script
        const script = document.createElement('script');
        script.src = `https://${disqusShortname}.disqus.com/embed.js`;
        script.setAttribute('data-timestamp', String(new Date().getTime()));
        script.async = true;
        
        document.body.appendChild(script);
      }
    };
    
    loadDisqus();
    
    return () => {
      // Clean up Disqus if needed
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        while (disqusThread.firstChild) {
          disqusThread.removeChild(disqusThread.firstChild);
        }
      }
    };
  }, [language]);
  
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
              {t('discussions.community')}
            </CardTitle>
            <CardDescription>
              {t('discussions.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <div id="disqus_thread"></div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Discussions;
