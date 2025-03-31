
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '@/hooks/useApplications';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  Country, 
  ApplicationCenterCity, 
  PurposeOfVisit, 
  VisaResultStatus, 
  EntryType 
} from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from './CountryFlag';
import { Checkbox } from "@/components/ui/checkbox";

// City to available countries mapping
const cityToCountriesMap: Record<ApplicationCenterCity, Country[]> = {
  [ApplicationCenterCity.Istanbul]: Object.values(Country),
  [ApplicationCenterCity.Ankara]: [Country.Germany, Country.France, Country.Italy, Country.Spain, Country.UnitedKingdom, Country.Netherlands, Country.Belgium],
  [ApplicationCenterCity.Izmir]: [Country.Germany, Country.Italy, Country.Netherlands, Country.Greece],
  [ApplicationCenterCity.Antalya]: [Country.Germany, Country.Russia, Country.Netherlands],
  [ApplicationCenterCity.Bodrum]: [Country.UnitedKingdom, Country.Germany],
  [ApplicationCenterCity.Gaziantep]: [Country.Germany, Country.France],
};

const formSchema = z.object({
  city: z.nativeEnum(ApplicationCenterCity, {
    required_error: 'Please select a city.',
  }),
  country: z.nativeEnum(Country, {
    required_error: 'Please select a country.',
  }),
  durationOfVisit: z.string().min(1, {
    message: 'Please enter the duration of your visit.',
  }),
  purposeOfVisit: z.nativeEnum(PurposeOfVisit, {
    required_error: 'Please select the purpose of your visit.',
  }),
  applicationSubmitDate: z.date({
    required_error: 'Please select the application submission date.',
  }),
  sameAppointmentDate: z.boolean().default(false),
  appointmentDate: z.date().nullable().optional(),
  resultStatus: z.nativeEnum(VisaResultStatus, {
    required_error: 'Please select the result status.',
  }),
  validity: z.string().nullable().optional(),
  entryType: z.nativeEnum(EntryType).nullable().optional(),
  rejectionReason: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationForm: React.FC = () => {
  const { addApplication } = useApplications();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: undefined,
      country: undefined,
      durationOfVisit: '',
      purposeOfVisit: undefined,
      applicationSubmitDate: undefined,
      sameAppointmentDate: false,
      appointmentDate: null,
      resultStatus: undefined,
      validity: null,
      entryType: null,
      rejectionReason: null,
    },
  });

  const watchResultStatus = form.watch('resultStatus');
  const watchPurposeOfVisit = form.watch('purposeOfVisit');
  const watchSameAppointmentDate = form.watch('sameAppointmentDate');
  const watchApplicationSubmitDate = form.watch('applicationSubmitDate');
  const watchCity = form.watch('city');
  
  const isLongTermPurpose = [PurposeOfVisit.FamilyReunification, PurposeOfVisit.Study, PurposeOfVisit.Work].includes(watchPurposeOfVisit);
  
  // Update available countries when city changes
  useEffect(() => {
    if (watchCity) {
      const countries = cityToCountriesMap[watchCity] || [];
      setAvailableCountries(countries);
      
      // Reset country selection if current selection is not available in the new city
      const currentCountry = form.getValues('country');
      if (currentCountry && !countries.includes(currentCountry)) {
        form.setValue('country', undefined);
      }
    }
  }, [watchCity, form]);
  
  // Set appointment date same as submission date if checkbox is checked
  useEffect(() => {
    if (watchSameAppointmentDate && watchApplicationSubmitDate) {
      form.setValue('appointmentDate', watchApplicationSubmitDate);
    } else if (watchSameAppointmentDate === false) {
      form.setValue('appointmentDate', null);
    }
  }, [watchSameAppointmentDate, watchApplicationSubmitDate, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Use either the specific appointment date or the submission date if they're the same
      const appointmentDate = data.sameAppointmentDate ? data.applicationSubmitDate : data.appointmentDate;
      
      // Prepare result based on status
      const result = {
        status: data.resultStatus,
        validity: data.resultStatus === VisaResultStatus.Approved ? data.validity || undefined : undefined,
        entryType: data.resultStatus === VisaResultStatus.Approved ? data.entryType || undefined : undefined,
        rejectionReason: data.resultStatus === VisaResultStatus.Rejected ? data.rejectionReason || undefined : undefined,
      };

      // Calculate a reasonable passport return date (7-14 days after appointment)
      const appointmentTime = appointmentDate.getTime();
      const randomDays = Math.floor(Math.random() * 7) + 7; // 7-14 days
      const passportReturnDate = new Date(appointmentTime + randomDays * 24 * 60 * 60 * 1000);

      addApplication({
        country: data.country,
        city: data.city,
        durationOfVisit: data.durationOfVisit,
        purposeOfVisit: data.purposeOfVisit,
        applicationSubmitDate: data.applicationSubmitDate,
        idataReplyDate: new Date(data.applicationSubmitDate.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days after submission
        appointmentDate,
        passportReturnDate,
        result,
      });

      toast.success(t('form.successMessage'), {
        description: t('form.successDescription')
      });

      // Redirect to home page after submission
      navigate('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(t('form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="glass-card rounded-lg p-6 md:p-8 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t('form.detailsTitle')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('form.detailsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.city')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.selectCity')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ApplicationCenterCity).map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t('form.cityDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.country')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!watchCity}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={watchCity ? t('form.selectCountry') : t('form.selectCityFirst')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          <div className="flex items-center gap-2">
                            <CountryFlag country={country} size={16} />
                            {country}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t('form.countryDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purposeOfVisit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.purpose')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.selectPurpose')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(PurposeOfVisit).map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t('form.purposeDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLongTermPurpose && (
              <FormField
                control={form.control}
                name="durationOfVisit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.duration')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        placeholder={t('form.durationPlaceholder')} 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {t('form.durationDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

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
                  {t('form.resultStatusDescription')}
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
                        placeholder={t('form.validityDaysPlaceholder')} 
                        {...field} 
                        value={field.value || ''} 
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
                    {t('form.rejectionReasonDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t('form.submitting') : t('form.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
