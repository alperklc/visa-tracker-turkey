
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountriesOnForm, Country } from '@/types/countries';
import { PurposeOfVisit } from '@/types/enums';
import { useLanguage } from '@/lib/LanguageContext';
import CountryFlag from '../CountryFlag';
import { Search } from 'lucide-react';
import { ApplicationsFilter } from '@/hooks/useApplicationsData';

interface ApplicationFiltersProps {
  filter: ApplicationsFilter;
  onFilterChange: (newFilter: Partial<ApplicationsFilter>) => void;
}

const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({ 
  filter, 
  onFilterChange 
}) => {
  const { t } = useLanguage();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleCountryChange = (value: string) => {
    onFilterChange({ country: value === 'All' ? undefined : value });
  };

  const handlePurposeChange = (value: string) => {
    onFilterChange({ purpose: value === 'All' ? undefined : value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium mb-1 block">{t('review.search')}</label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('review.searchPlaceholder')}
            value={filter.search || ''}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">{t('review.filterCountry')}</label>
        <Select 
          value={filter.country || 'All'}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('review.selectCountry')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">{t('review.allCountries')}</SelectItem>
            {Object.values(CountriesOnForm).map((country) => (
              <SelectItem key={country as string} value={country as string}>
                <div className="flex items-center gap-2">
                  <CountryFlag country={country as CountriesOnForm} size={16} />
                  {t(`countries.${(country as string).replace(/\s+/g, '').toLowerCase()}`)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">{t('table.purpose')}</label>
        <Select 
          value={filter.purpose || 'All'}
          onValueChange={handlePurposeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('table.purpose')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">{t('review.allPurposes')}</SelectItem>
            {Object.values(PurposeOfVisit).map((purpose) => (
              <SelectItem key={purpose} value={purpose}>
                {t(`purposes.${purpose.toLowerCase()}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ApplicationFilters;
