
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useApplications } from '@/hooks/useApplications';
import { useLanguage } from '@/lib/LanguageContext';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { formSchema, FormValues } from './schema';
import ApplicationDetails from './ApplicationDetails';
import AppointmentDetails from './AppointmentDetails';
import ResultDetails from './ResultDetails';

const ApplicationForm: React.FC = () => {
  const { addApplication } = useApplications();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Use either the specific appointment date or the submission date if they're the same
      const appointmentDate = data.sameAppointmentDate ? data.applicationSubmitDate : data.appointmentDate;
      
      // Prepare result based on status
      const result = {
        status: data.resultStatus,
        validity: data.resultStatus === 'Approved' ? data.validity || undefined : undefined,
        entryType: data.resultStatus === 'Approved' ? data.entryType || undefined : undefined,
        rejectionReason: data.resultStatus === 'Rejected' ? data.rejectionReason || undefined : undefined,
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

          <ApplicationDetails form={form} />
          <AppointmentDetails form={form} />
          <ResultDetails form={form} />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t('form.submitting') : t('form.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
