
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
import { CountriesOnForm, Country } from '@/types/countries';
import { ApplicationCenterCity, PurposeOfVisit } from '@/types/enums';
import { FormValues, cityToCountriesMap } from './schema';
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from '../CountryFlag';

interface ApplicationDetailsProps {
  form: UseFormReturn<FormValues>;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({ form }) => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [availableCities, setAvailableCities] = useState<ApplicationCenterCity[]>([]);
  
  // Watch for country changes
  const watchCountry = form.watch('country');
  
  // Generate the reverse mapping: country to available cities
  const countryToCitiesMap = React.useMemo(() => {
    const mapping: Record<Country, ApplicationCenterCity[]> = {} as Record<Country, ApplicationCenterCity[]>;
    
    Object.entries(cityToCountriesMap).forEach(([city, countries]) => {
      countries.forEach(country => {
        if (!mapping[country]) {
          mapping[country] = [];
        }
        mapping[country].push(city as ApplicationCenterCity);
      });
    });
    
    return mapping;
  }, []);
  
  // Update available cities when country changes
  useEffect(() => {
    if (watchCountry) {
      setSelectedCountry(watchCountry as Country);
      setAvailableCities(countryToCitiesMap[watchCountry as Country] || []);
      
      // If the currently selected city is not available for this country, reset it
      const currentCity = form.getValues('city');
      if (currentCity && !countryToCitiesMap[watchCountry as Country]?.includes(currentCity as ApplicationCenterCity)) {
        form.setValue('city', undefined as any);
      }
    }
  }, [watchCountry, countryToCitiesMap, form]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('form.country')}</FormLabel>
            <Select 
              onValueChange={(value: string) => field.onChange(value)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('form.selectCountry')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(CountriesOnForm).map((country) => (
                  <SelectItem key={country} value={country}>
                    <div className="flex items-center gap-2">
                      <CountryFlag country={country} size={16} />
                      {t(`countries.${country.toLowerCase().replace(/\s+/g, '')}`)}
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
              onValueChange={(value: string) => field.onChange(value)}
              value={field.value}
              disabled={!selectedCountry || availableCities.length === 0}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('form.selectCity')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
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
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('form.duration')}</FormLabel>
            <FormControl>
              <Input type="number" min="1" max="365" placeholder={t('form.durationPlaceholder')} {...field} />
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
        name="purpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('form.purpose')}</FormLabel>
            <Select 
              onValueChange={(value: string) => field.onChange(value)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('form.selectPurpose')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(PurposeOfVisit).map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {t(`purposes.${purpose.toLowerCase()}`)}
                  </SelectItem>
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
  );
};

export default ApplicationDetails;
