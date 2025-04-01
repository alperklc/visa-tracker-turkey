
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './types';
import translations from '@/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage or use 'tr' as default
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'tr';
  });

  useEffect(() => {
    // Save the language preference to localStorage
    localStorage.setItem('language', language);
    // Set the html lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const nestedKeys = key.split('.');
    
    // Handle typed nested objects like table, review, etc.
    if (nestedKeys.length > 1 && ['table', 'review', 'pagination', 'purposes', 'countries', 'form'].includes(nestedKeys[0])) {
      const [objectKey, propKey] = nestedKeys;
      // Need to typecast here to access the nested objects with string keys
      return translations[language][objectKey][propKey] || key;
    }
    
    // Handle regular string translations
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
