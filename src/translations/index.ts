
import { en } from './en';
import { tr } from './tr';
import { de } from './de';
import { Language } from '@/lib/types';

// Define the common translation type
export type TranslationType = typeof en;

// Create a utility function to merge partial translations with the English defaults
function createFullTranslation<T extends Partial<TranslationType>>(partialTranslation: T): TranslationType {
  return {
    ...en, // Use English as fallback for missing translations
    ...partialTranslation as any // Override with available translations
  };
}

// Export all translations with proper type compatibility
export const translations: Record<Language, TranslationType> = {
  en, // English is already complete
  tr: createFullTranslation(tr as any), // Use type assertion to bypass structural check
  de: createFullTranslation(de as any)  // Use type assertion to bypass structural check
};

export default translations;
