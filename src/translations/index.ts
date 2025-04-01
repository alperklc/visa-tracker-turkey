
import { tr } from './tr';
import { en } from './en';
import { de } from './de';
import { Language } from '@/lib/types';

// Use the same type as defined in the translation files
type TranslationType = typeof en;

// Export all translations
export const translations: Record<Language, TranslationType> = {
  tr,
  en,
  de
};

export default translations;
