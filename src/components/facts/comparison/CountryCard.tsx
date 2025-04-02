
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryCardProps {
  country: {
    country: string;
    flag: string;
    schengenVisa: string;
    schengenVisaClass: string;
    schengenFee: string;
    visaFreeCountries: string;
    gdpPerCapita: string;
    population: string;
  };
  t: (key: string) => string;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, t }) => {
  return (
    <Card key={country.country} className="overflow-hidden">
      <CardHeader className="p-4 bg-muted/30">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>{country.flag}</span>
          {t(`countries.${country.country}`)}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid gap-2 text-sm">
        <div className="grid grid-cols-2">
          <div className="font-medium">{t('facts.schengenVisa')}</div>
          <div className={`${country.schengenVisaClass} px-2 py-1 rounded`}>{country.schengenVisa}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-medium">{t('facts.schengenFee')}</div>
          <div>{country.schengenFee}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-medium">{t('facts.visaFreeCountries')}</div>
          <div>{country.visaFreeCountries}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-medium">{t('review.gdpPerCapita')}</div>
          <div>{country.gdpPerCapita}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-medium">{t('review.population')}</div>
          <div>{country.population}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
