
import { tr } from './tr';
import { en } from './en';
import { de } from './de';
import { Language } from '@/lib/types';

// Define a common type for all translation objects
type TranslationType = typeof en;

// Export all translations
export const translations: Record<Language, TranslationType> = {
  tr,
  en,
  de
};

export default translations;
