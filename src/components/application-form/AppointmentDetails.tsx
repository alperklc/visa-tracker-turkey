
import React from 'react';
import { format } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { FormValues } from './schema';

interface AppointmentDetailsProps {
  form: UseFormReturn<FormValues>;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ form }) => {
  const { t } = useLanguage();
  const watchSameAppointmentDate = form.watch('sameAppointmentDate');
  
  // Disable dates before today or before submission date for appointment
  const getDisabledDates = (field: 'appointment') => {
    if (field === 'appointment') {
      const submissionDate = form.getValues('applicationSubmitDate');
      if (!submissionDate) return (date: Date) => false;
      
      return (date: Date) => {
        return date < submissionDate;
      };
    }
    return (date: Date) => date > new Date();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="applicationSubmitDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('form.submitDate')}</FormLabel>
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
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('form.submitDateDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="sameAppointmentDate"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {t('form.sameAppointmentDate')}
              </FormLabel>
              <FormDescription>
                {t('form.sameAppointmentDateDescription')}
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {!watchSameAppointmentDate && (
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('form.appointmentDate')}</FormLabel>
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
                    disabled={getDisabledDates('appointment')}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('form.appointmentDateDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default AppointmentDetails;
