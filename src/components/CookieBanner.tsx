
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/lib/LanguageContext';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieBannerProps {
  onAccept: (preferences: CookiePreferences) => void;
  onDecline: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Her zaman gerekli
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made cookie choices
    const cookieChoices = localStorage.getItem('cookiePreferences');
    if (!cookieChoices) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = { ...preferences, analytics: true, marketing: true };
    setPreferences(allPreferences);
    localStorage.setItem('cookiePreferences', JSON.stringify(allPreferences));
    onAccept(allPreferences);
    setIsOpen(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    onAccept(preferences);
    setPreferencesOpen(false);
    setIsOpen(false);
  };

  const handleDecline = () => {
    const declinedPreferences = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('cookiePreferences', JSON.stringify(declinedPreferences));
    onDecline();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm z-50 border-t shadow-lg animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('cookies.title')}</CardTitle>
            <CardDescription>
              {t('cookies.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm">
              <p>{t('cookies.necessary')}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
            <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">{t('cookies.preferences')}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('cookies.preferences')}</DialogTitle>
                  <DialogDescription>
                    {t('cookies.description')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="necessary" checked disabled />
                    <label
                      htmlFor="necessary"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('cookies.necessary')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="analytics" 
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => 
                        setPreferences({...preferences, analytics: checked === true})
                      }
                    />
                    <label
                      htmlFor="analytics"
                      className="text-sm font-medium leading-none"
                    >
                      {t('cookies.analytics')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="marketing" 
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => 
                        setPreferences({...preferences, marketing: checked === true})
                      }
                    />
                    <label
                      htmlFor="marketing"
                      className="text-sm font-medium leading-none"
                    >
                      {t('cookies.marketing')}
                    </label>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAcceptSelected}>{t('cookies.acceptSelected')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleDecline}>{t('cookies.decline')}</Button>
            <Button onClick={handleAcceptAll}>{t('cookies.acceptAll')}</Button>
            <a 
              href="/privacy-policy" 
              className="text-xs text-muted-foreground hover:underline self-center"
            >
              {t('cookies.privacy')}
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CookieBanner;
