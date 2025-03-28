
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

const formSchema = z.object({
  country: z.nativeEnum(Country, {
    required_error: 'Please select a country.',
  }),
  city: z.nativeEnum(ApplicationCenterCity, {
    required_error: 'Please select a city.',
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
  idataReplyDate: z.date().nullable().optional(),
  appointmentDate: z.date().nullable().optional(),
  passportReturned: z.enum(['yes', 'no']),
  passportReturnDate: z.date().nullable().optional(),
  resultStatus: z.nativeEnum(VisaResultStatus).nullable().optional(),
  validity: z.string().nullable().optional(),
  entryType: z.nativeEnum(EntryType).nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationForm: React.FC = () => {
  const { addApplication } = useApplications();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const [showResultFields, setShowResultFields] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: undefined,
      city: undefined,
      durationOfVisit: '',
      purposeOfVisit: undefined,
      applicationSubmitDate: undefined,
      idataReplyDate: null,
      appointmentDate: null,
      passportReturned: 'no',
      passportReturnDate: null,
      resultStatus: VisaResultStatus.Pending,
      validity: null,
      entryType: null,
    },
  });

  const watchPassportReturned = form.watch('passportReturned');
  const watchResultStatus = form.watch('resultStatus');
  
  useEffect(() => {
    if (watchPassportReturned === 'yes') {
      setShowResultFields(true);
      // Set today as the default passport return date if not set yet
      if (!form.getValues('passportReturnDate')) {
        form.setValue('passportReturnDate', new Date());
      }
    } else {
      setShowResultFields(false);
      form.setValue('passportReturnDate', null);
      form.setValue('resultStatus', VisaResultStatus.Pending);
    }
  }, [watchPassportReturned, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Prepare passport return date based on the radio selection
      const passportReturnDate = data.passportReturned === 'yes' ? data.passportReturnDate : null;
      
      // Prepare result based on returned passport
      const result = data.passportReturned === 'yes' && data.resultStatus 
        ? {
            status: data.resultStatus,
            validity: data.validity || undefined,
            entryType: data.entryType || undefined,
          }
        : null;

      addApplication({
        country: data.country,
        city: data.city,
        durationOfVisit: data.durationOfVisit,
        purposeOfVisit: data.purposeOfVisit,
        applicationSubmitDate: data.applicationSubmitDate,
        idataReplyDate: data.idataReplyDate,
        appointmentDate: data.appointmentDate,
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.country')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.selectCountry')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Country).map((country) => (
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
              name="durationOfVisit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.duration')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form.durationPlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('form.durationDescription')}
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

            <FormField
              control={form.control}
              name="idataReplyDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('form.replyReceived')}</FormLabel>
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
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {t('form.replyDateDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        disabled={(date) => date > new Date()}
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
          </div>

          <FormField
            control={form.control}
            name="passportReturned"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t('form.passportReturned')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('form.yes')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('form.no')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  {t('form.passportReturnedDescription')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {showResultFields && (
            <>
              <FormField
                control={form.control}
                name="passportReturnDate"
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
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
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

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">{t('form.resultTitle')}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="resultStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.resultStatus')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.selectResult')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(VisaResultStatus).map(status => (
                            <SelectItem key={status} value={status}>{t(`table.${status.toLowerCase()}`)}</SelectItem>
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

                {watchResultStatus === VisaResultStatus.Approved && (
                  <>
                    <FormField
                      control={form.control}
                      name="validity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.validity')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.validityPlaceholder')} {...field} value={field.value || ''} />
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
                  </>
                )}
              </div>
            </>
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
