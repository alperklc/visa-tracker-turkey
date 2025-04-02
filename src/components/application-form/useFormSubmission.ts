
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/LanguageContext';
import { FormValues } from './schema';
import { supabase } from '@/integrations/supabase/client';

// This is the hook that will handle the form submission to Supabase
export const useFormSubmission = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const submitForm = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Call our Supabase edge function to submit the application
      const { data: responseData, error } = await supabase.functions.invoke('submit-application', {
        body: data
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to submit form');
      }
      
      toast.success(t('form.successMessage'), {
        description: t('form.successDescription'),
      });
      
      return { success: true, data: responseData };
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
