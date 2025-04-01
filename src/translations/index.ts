
import { tr } from './tr';
import { en } from './en';
import { de } from './de';
import { Language } from '@/lib/types';

// Export all translations
export const translations: Record<Language, typeof en> = {
  tr,
  en,
  de
};

export default translations;
