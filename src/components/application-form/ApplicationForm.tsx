
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { applicationSchema, type ApplicationForm } from './schema';
import { ApplicationDetails, AppointmentDetails, ResultDetails, ApplicationCaptcha } from '.';
import { useLanguage } from '@/lib/LanguageContext';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useFormSubmission } from './useFormSubmission';

const ApplicationFormComponent = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('details');
  const isMobile = useIsMobile();
  const { submitForm, isSubmitting } = useFormSubmission();
  
  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      sameAppointmentDate: false,
      passportReturned: false,
    },
    mode: 'onChange',
  });
  
  const validateAndGoToNextTab = (nextTab: string, currentTab: string) => {
    let fieldsToValidate: (keyof ApplicationForm)[] = [];
    
    if (currentTab === 'details') {
      fieldsToValidate = ['country', 'city', 'duration', 'purpose'];
    } else if (currentTab === 'appointment') {
      fieldsToValidate = ['submissionDate', 'sameAppointmentDate'];
      if (!form.getValues('sameAppointmentDate')) {
        fieldsToValidate.push('appointmentDate');
      }
    }
    
    form.trigger(fieldsToValidate as any)
      .then(isValid => {
        if (isValid) {
          setActiveTab(nextTab);
        } else {
          toast.error(t('form.pleaseCompleteAllFields'));
        }
      });
  };
  
  async function onSubmit(data: ApplicationForm) {
    // Validate captcha first
    if (!data.captcha) {
      toast.error(t('form.captchaRequired'));
      return;
    }
    
    const result = await submitForm(data);
    
    if (result.success) {
      // Reset form and go back to first tab
      form.reset();
      setActiveTab('details');
    }
  }
  
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className={`${isMobile ? 'flex flex-col space-y-1 w-full h-auto' : 'grid grid-cols-3'} mb-6`}>
                <TabsTrigger value="details">{t('form.detailsTitle')}</TabsTrigger>
                <TabsTrigger value="appointment">{t('form.appointmentDate')}</TabsTrigger>
                <TabsTrigger value="result">{t('form.resultTitle')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <ApplicationDetails form={form} />
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => validateAndGoToNextTab('appointment', 'details')}
                  >
                    {t('form.next')}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="appointment" className="space-y-6">
                <AppointmentDetails form={form} />
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('details')}
                  >
                    {t('form.back')}
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => validateAndGoToNextTab('result', 'appointment')}
                  >
                    {t('form.next')}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="result" className="space-y-6">
                <ResultDetails form={form} />
                
                <div className="w-full overflow-hidden">
                  <ApplicationCaptcha form={form} />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('appointment')}
                  >
                    {t('form.back')}
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('form.submitting') : t('form.submit')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ApplicationFormComponent;
