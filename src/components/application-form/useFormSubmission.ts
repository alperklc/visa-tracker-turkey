
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/LanguageContext';
import { FormValues } from './schema';

// This is the hook that will handle the form submission to Supabase
export const useFormSubmission = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // The URL should be replaced with your actual Supabase edge function URL once deployed
  const SUPABASE_FUNCTION_URL = 'https://YOUR_SUPABASE_PROJECT_REF.supabase.co/functions/v1/submit-application';
  
  const submitForm = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      toast.success(t('form.successMessage'), {
        description: t('form.successDescription'),
      });
      
      return { success: true, data: result.data };
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('form.errorMessage'), {
        description: (error as Error).message,
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { submitForm, isSubmitting };
};

export default useFormSubmission;
