
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/lib/LanguageContext';
import { EntryType } from '@/types/enums';
import { FormValues } from '../schema';

interface EntryTypeFieldProps {
  form: UseFormReturn<FormValues>;
}

const EntryTypeField: React.FC<EntryTypeFieldProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="entryType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.entryType')}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('form.selectEntryType')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={EntryType.Single}>{t('form.singleEntry')}</SelectItem>
              <SelectItem value={EntryType.Multiple}>{t('form.multipleEntry')}</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            {t('form.entryTypeDescription')}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EntryTypeField;
