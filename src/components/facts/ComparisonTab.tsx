
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from '@/hooks/useIsMobile';

const ComparisonTab: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  // Countries comparison data for mobile cards
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
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('facts.comparisonTitle')}</CardTitle>
          <CardDescription>{t('facts.comparisonDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile card view for comparison */}
          {isMobile ? (
            <div className="space-y-4">
              {countryComparisonData.map((country) => (
                <Card key={country.country} className="overflow-hidden">
                  <CardHeader className="p-4 bg-muted/30">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span>{country.flag}</span>
                      {t(`facts.${country.country}`)}
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
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">{t('facts.aspect')}</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <span>🇹🇷</span> {t('facts.turkey')}
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <span>🇻🇪</span> {t('facts.venezuela')}
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <span>🇷🇺</span> {t('facts.russia')}
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <span>🇬🇪</span> {t('facts.georgia')}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{t('facts.schengenVisa')}</TableCell>
                    <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                    <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                    <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                    <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t('facts.schengenFee')}</TableCell>
                    <TableCell>€90</TableCell>
                    <TableCell>€0</TableCell>
                    <TableCell>€90</TableCell>
                    <TableCell>€0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t('facts.visaFreeCountries')}</TableCell>
                    <TableCell>110+</TableCell>
                    <TableCell>130+</TableCell>
                    <TableCell>80+</TableCell>
                    <TableCell>115+</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t('review.gdpPerCapita')}</TableCell>
                    <TableCell>$9,600</TableCell>
                    <TableCell>$3,800</TableCell>
                    <TableCell>$12,200</TableCell>
                    <TableCell>$5,700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t('review.population')}</TableCell>
                    <TableCell>85M</TableCell>
                    <TableCell>28M</TableCell>
                    <TableCell>144M</TableCell>
                    <TableCell>3.7M</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('facts.keyDifferences')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="font-semibold mb-2">{t('facts.venezuelaFact')}</p>
            <p>{t('facts.venezuelaFactDesc')}</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold mb-2">{t('facts.russiaFact')}</p>
            <p>{t('facts.russiaFactDesc')}</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="font-semibold mb-2">{t('facts.turkeyFact')}</p>
            <p>{t('facts.turkeyFactDesc')}</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-semibold mb-2">{t('facts.georgiaFact')}</p>
            <p>{t('facts.georgiaFactDesc')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonTab;
