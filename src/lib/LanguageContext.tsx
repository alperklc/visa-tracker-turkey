
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
    
    // Handle different translation categories
    try {
      // If this is a nested path with multiple segments
      if (nestedKeys.length > 1) {
        const [category, ...restKeys] = nestedKeys;
        const restKey = restKeys.join('.');
        
        // Get the category object
        const categoryObj = translations[language][category as keyof typeof translations[typeof language]];
        
        // Handle nested objects for specific categories
        if (typeof categoryObj === 'object' && categoryObj !== null) {
          // Navigate through nested properties if needed
          let value: any = categoryObj;
          
          for (const k of restKeys) {
            if (value && typeof value === 'object' && k in value) {
              value = value[k];
            } else {
              // If key not found in the current language, try English as fallback
              if (language !== 'en') {
                const englishValue = t.call({ language: 'en' as Language }, key);
                if (englishValue !== key) return englishValue;
              }
              return key; // Key not found
            }
          }
          
          if (typeof value === 'string') {
            return value;
          }
        }
      } else {
        // Direct access for top-level keys
        const value = translations[language][key as keyof typeof translations[typeof language]];
        if (typeof value === 'string') {
          return value;
        }
      }
      
      // If not found in the current language, try English as fallback
      if (language !== 'en') {
        const englishValue = t.call({ language: 'en' as Language }, key);
        if (englishValue !== key) return englishValue;
      }
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
    }
    
    return key; // Return the key itself if no translation found
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
