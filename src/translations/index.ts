
import { en } from './en';
import { tr } from './tr';
import { de } from './de';
import { Language } from '@/lib/types';

// Define the common translation type
export type TranslationType = typeof en;

// Export all translations
export const translations: Record<Language, TranslationType> = {
  tr,
  en,
  de
};

export default translations;
