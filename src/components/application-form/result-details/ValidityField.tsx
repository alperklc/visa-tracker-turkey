
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
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/LanguageContext';
import { FormValues } from '../schema';

interface ValidityFieldProps {
  form: UseFormReturn<FormValues>;
}

const ValidityField: React.FC<ValidityFieldProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="validity"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.validity')}</FormLabel>
          <FormControl>
            <Input 
              {...field} 
              placeholder={t('form.validityDaysPlaceholder')} 
            />
          </FormControl>
          <FormDescription>
            {t('form.validityDaysDescription')}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ValidityField;
