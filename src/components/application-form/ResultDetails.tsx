
import React from 'react';
import { format } from 'date-fns';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { VisaResultStatus, EntryType } from '@/types/enums';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { FormValues } from './schema';

interface ResultDetailsProps {
  form: UseFormReturn<FormValues>;
}

const ResultDetails: React.FC<ResultDetailsProps> = ({ form }) => {
  const { t } = useLanguage();
  
  // Watch for result status changes
  const resultStatus = useWatch({
    control: form.control,
    name: 'resultStatus',
  });
  
  const isApproved = resultStatus === VisaResultStatus.Approved;
  const isRejected = resultStatus === VisaResultStatus.Rejected;
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Return Date Field - Moved to top */}
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
                        "pl-3 text-left font-normal",
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
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
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
                      {t(`resultStatus.${status.toLowerCase()}`)}
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

        {isApproved && (
          <>
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

            <FormField
              control={form.control}
              name="daysAllowed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.daysAllowed')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      {...field} 
                      placeholder={t('form.daysAllowedPlaceholder')} 
                    />
                  </FormControl>
                  <FormDescription>
                    {t('form.daysAllowedDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visaEndDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('form.visaEndDate')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
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
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {t('form.visaEndDateDescription')}
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
          </>
        )}

        {isRejected && (
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
        )}
      </div>
    </div>
  );
};

export default ResultDetails;
