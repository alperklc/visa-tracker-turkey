
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const formSchema = z.object({
  country: z.enum(['Germany', 'Italy'], {
    required_error: 'Please select a country.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  durationOfVisit: z.string().min(1, {
    message: 'Please enter the duration of your visit.',
  }),
  purposeOfVisit: z.string().min(2, {
    message: 'Please enter the purpose of your visit.',
  }),
  applicationSubmitDate: z.date({
    required_error: 'Please select the application submission date.',
  }),
  idataReplyDate: z.date().nullable().optional(),
  appointmentDate: z.date().nullable().optional(),
  passportReturnDate: z.date().nullable().optional(),
  resultStatus: z.enum(['Approved', 'Rejected', 'Pending']).nullable().optional(),
  validity: z.string().nullable().optional(),
  entryType: z.enum(['Single', 'Multiple']).nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationForm: React.FC = () => {
  const { addApplication } = useApplications();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: undefined,
      city: '',
      durationOfVisit: '',
      purposeOfVisit: '',
      applicationSubmitDate: undefined,
      idataReplyDate: null,
      appointmentDate: null,
      passportReturnDate: null,
      resultStatus: 'Pending',
      validity: null,
      entryType: null,
    },
  });

  const watchResultStatus = form.watch('resultStatus');

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const result = data.resultStatus 
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
        passportReturnDate: data.passportReturnDate,
        result,
      });

      toast.success('Application submitted successfully', {
        description: 'Thank you for sharing your visa experience.'
      });

      // Redirect to home page after submission
      navigate('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-lg p-6 md:p-8 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Visa Application Details</h2>
            <p className="text-sm text-muted-foreground">
              Please provide details about your visa application process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Country you applied for a visa to
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
                  <FormLabel>City of Embassy/Consulate</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Istanbul" {...field} />
                  </FormControl>
                  <FormDescription>
                    Location of the embassy or consulate
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
                  <FormLabel>Duration of Visit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 90 days" {...field} />
                  </FormControl>
                  <FormDescription>
                    How long you plan to stay
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
                  <FormLabel>Purpose of Visit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Tourism, Business" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your reason for visiting
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
                  <FormLabel>Application Submit Date</FormLabel>
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
                            <span>Pick a date</span>
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
                    Date you submitted your application
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
                  <FormLabel>iData Reply Date</FormLabel>
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
                            <span>Pick a date</span>
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
                    Date iData replied to your application
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
                  <FormLabel>Appointment Date</FormLabel>
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
                            <span>Pick a date</span>
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
                    Date of your visa appointment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passportReturnDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Passport Return Date</FormLabel>
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
                            <span>Pick a date</span>
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
                    Date they returned your passport
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Visa Result</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="resultStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The result of your visa application
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchResultStatus === 'Approved' && (
              <>
                <FormField
                  control={form.control}
                  name="validity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Validity Period</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 90 days, 1 year" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormDescription>
                        How long the visa is valid for
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
                      <FormLabel>Entry Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select entry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Single">Single Entry</SelectItem>
                          <SelectItem value="Multiple">Multiple Entry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Type of entry allowed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
