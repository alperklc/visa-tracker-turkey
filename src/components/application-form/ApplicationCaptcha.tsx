
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/lib/LanguageContext';
import ReCAPTCHA from 'react-google-recaptcha';

interface ApplicationCaptchaProps {
  form: any;
}

// Örnek reCAPTCHA site key (gerçek site key ile değiştirilmeli)
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key

const ApplicationCaptcha: React.FC<ApplicationCaptchaProps> = ({ form }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t('form.captchaTitle')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('form.captchaDescription')}
        </p>
      </div>

      <FormField
        control={form.control}
        name="captcha"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">CAPTCHA</FormLabel>
            <FormControl>
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage className="text-center" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ApplicationCaptcha;
