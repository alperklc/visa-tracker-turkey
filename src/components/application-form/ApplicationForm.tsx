
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { applicationSchema, type ApplicationForm as ApplicationFormType } from './schema';
import { ApplicationDetails, AppointmentDetails, ResultDetails, ApplicationCaptcha } from '.';
import { useLanguage } from '@/lib/LanguageContext';
import { toast } from 'sonner';

const ApplicationForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  const form = useForm<ApplicationFormType>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      duration: 0,
      passportReturned: false,
    },
  });
  
  async function onSubmit(data: ApplicationFormType) {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      
      // Show success toast
      toast.success(t('form.successMessage'), {
        description: t('form.successDescription'),
      });
      
      // Reset form and go back to first tab
      form.reset();
      setActiveTab('details');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(t('form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="details">{t('form.detailsTitle')}</TabsTrigger>
                <TabsTrigger value="appointment">{t('form.appointmentDate')}</TabsTrigger>
                <TabsTrigger value="result">{t('form.resultTitle')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <ApplicationDetails form={form} />
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('appointment')}
                  >
                    {t('form.submit')}
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
                    {t('form.detailsTitle')}
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('result')}
                  >
                    {t('form.submit')}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="result" className="space-y-6">
                <ResultDetails form={form} />
                
                <ApplicationCaptcha form={form} />
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('appointment')}
                  >
                    {t('form.appointmentDate')}
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

export default ApplicationForm;
