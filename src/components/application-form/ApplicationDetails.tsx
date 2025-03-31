
import React, { useState, useEffect } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Country, ApplicationCenterCity, PurposeOfVisit } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from '@/components/CountryFlag';
import { FormValues, cityToCountriesMap } from './schema';

interface ApplicationDetailsProps {
  form: UseFormReturn<FormValues>;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({ form }) => {
  const { t } = useLanguage();
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  const watchCity = form.watch('city');
  const watchPurposeOfVisit = form.watch('purposeOfVisit');
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

  return (
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
  );
};

export default ApplicationDetails;
