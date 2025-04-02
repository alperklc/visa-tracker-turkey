
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
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from '@/lib/LanguageContext';
import { VisaResultStatus, EntryType } from '@/types/enums';
import { FormValues } from './schema';

interface ResultDetailsProps {
  form: UseFormReturn<FormValues>;
}

const ResultDetails: React.FC<ResultDetailsProps> = ({ form }) => {
  const { t } = useLanguage();
  const watchResultStatus = form.watch('resultStatus');

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('form.resultTitle')}</h2>
      </div>

      <FormField
        control={form.control}
        name="resultStatus"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t('form.resultStatus')}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={VisaResultStatus.Approved} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t('table.approved')}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={VisaResultStatus.Rejected} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t('table.rejected')}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              {t('form.resultDescription')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {watchResultStatus === VisaResultStatus.Approved && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="validity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.validity')}</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder={t('form.validityPlaceholder')} 
                    {...field} 
                    value={field.value || ''} 
                  />
                </FormControl>
                <FormDescription>
                  {t('form.validityDescription')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.entryType')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.selectEntryType')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(EntryType).map(type => (
                      <SelectItem key={type} value={type}>{t(`form.${type.toLowerCase()}Entry`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t('form.entryTypeDescription')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {watchResultStatus === VisaResultStatus.Rejected && (
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
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                {t('form.rejectionDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default ResultDetails;
