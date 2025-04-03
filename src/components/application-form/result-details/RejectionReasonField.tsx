
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/LanguageContext';
import { FormValues } from '../schema';

interface RejectionReasonFieldProps {
  form: UseFormReturn<FormValues>;
}

const RejectionReasonField: React.FC<RejectionReasonFieldProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="rejectionReason"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.rejectionReason')}</FormLabel>
          <FormControl>
            <Textarea 
              placeholder={t('form.rejectionReasonPlaceholder')} 
              className="resize-none"
              {...field} 
            />
          </FormControl>
          <FormDescription>
            {t('form.rejectionDescription')}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RejectionReasonField;
