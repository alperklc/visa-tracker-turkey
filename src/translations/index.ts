
import { en } from './en';
import { tr } from './tr';
import { de } from './de';
import { Language } from '@/lib/types';

// Define the common translation type
export type TranslationType = typeof en;

// Create a utility function to merge partial translations with the English defaults
// to ensure full compatibility while we're migrating
function createFullTranslation(partialTranslation: Partial<TranslationType>): TranslationType {
  return {
    ...en, // Use English as fallback for missing translations
    ...partialTranslation // Override with the available translations for this language
  };
}

// Export all translations with proper type compatibility
export const translations: Record<Language, TranslationType> = {
  en, // English is already complete
  tr: createFullTranslation(tr as Partial<TranslationType>),
  de: createFullTranslation(de as Partial<TranslationType>)
};

export default translations;
