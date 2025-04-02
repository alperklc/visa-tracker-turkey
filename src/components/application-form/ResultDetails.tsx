
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface ResultDetailsProps {
  form: UseFormReturn<FormValues>;
}

const ResultDetails: React.FC<ResultDetailsProps> = ({ form }) => {
  const { t } = useLanguage();
  const watchResultStatus = form.watch('resultStatus');
  const watchPassportReturned = form.watch('passportReturned');

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
                    <SelectItem key={EntryType.Single} value={EntryType.Single}>
                      {t('form.singleEntry')}
                    </SelectItem>
                    <SelectItem key={EntryType.Multiple} value={EntryType.Multiple}>
                      {t('form.multipleEntry')}
                    </SelectItem>
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

      {/* Add Passport Return fields */}
      <div className="border-t pt-6 mt-6">
        <FormField
          control={form.control}
          name="passportReturned"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t('form.passportReturned')}</FormLabel>
                <FormDescription>
                  {t('form.passportReturnedDescription')}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {watchPassportReturned && (
          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('form.returnDate')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t('form.pickDate')}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as Date}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  {t('form.returnDateDescription')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </>
  );
};

export default ResultDetails;
