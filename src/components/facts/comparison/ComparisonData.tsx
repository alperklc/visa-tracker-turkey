
import { useLanguage } from '@/lib/LanguageContext';

export const useComparisonData = () => {
  const { t } = useLanguage();
  
  // Countries comparison data
  // Using lowercase keys for consistent lookup
  const countryComparisonData = [
    {
      country: "turkey",
      flag: "🇹🇷",
      schengenVisa: t('facts.required'),
      schengenVisaClass: "bg-red-50",
      schengenFee: "€90",
      visaFreeCountries: "110+",
      gdpPerCapita: "$9,600",
      population: "85M"
    },
    {
      country: "venezuela",
      flag: "🇻🇪",
      schengenVisa: t('facts.notRequired'),
      schengenVisaClass: "bg-green-50",
      schengenFee: "€0",
      visaFreeCountries: "130+",
      gdpPerCapita: "$3,800",
      population: "28M"
    },
    {
      country: "russia",
      flag: "🇷🇺",
      schengenVisa: t('facts.required'),
      schengenVisaClass: "bg-red-50",
      schengenFee: "€90",
      visaFreeCountries: "80+",
      gdpPerCapita: "$12,200",
      population: "144M"
    },
    {
      country: "georgia",
      flag: "🇬🇪",
      schengenVisa: t('facts.notRequired'),
      schengenVisaClass: "bg-green-50",
      schengenFee: "€0",
      visaFreeCountries: "115+",
      gdpPerCapita: "$5,700",
      population: "3.7M"
    }
  ];

  return { countryComparisonData };
};
