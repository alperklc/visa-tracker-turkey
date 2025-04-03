
import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/lib/LanguageContext';
import { VisaResultStatus } from '@/types/enums';
import { FormValues } from '../schema';

interface ResultStatusFieldProps {
  form: UseFormReturn<FormValues>;
}

const ResultStatusField: React.FC<ResultStatusFieldProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="resultStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.resultStatus')}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('form.selectResultStatus')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(VisaResultStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {t(`dashboard.${status.toLowerCase()}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            {t('form.resultStatusDescription')}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ResultStatusField;
