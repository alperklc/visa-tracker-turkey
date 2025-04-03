
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-block">{t('language.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('tr')}>
          <span className={language === 'tr' ? 'font-bold' : ''}>
            Türkçe
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <span className={language === 'en' ? 'font-bold' : ''}>
            English
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('de')}>
          <span className={language === 'de' ? 'font-bold' : ''}>
            Deutsch
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
