
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CountryFlag from '@/components/CountryFlag';
import { Country } from '@/lib/types';

const SchengenTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('facts.schengenFacts')}</CardTitle>
          <CardDescription>{t('facts.schengenFactsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t('facts.schengenMembers')}</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  Country.Germany, Country.France, Country.Italy, Country.Spain, 
                  Country.Austria, Country.Belgium, Country.Denmark, Country.Finland,
                  Country.Greece, Country.Netherlands, Country.Portugal, Country.Sweden
                ].map((country) => (
                  <div key={country} className="flex items-center gap-2">
                    <CountryFlag country={country} size={18} />
                    <span className="text-sm">{t(`countries.${country.toLowerCase().replace(/\s+/g, '')}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t('facts.schengenRules')}</h3>
              <ul className="space-y-2 text-sm">
                <li>• {t('facts.schengenRule1')}</li>
                <li>• {t('facts.schengenRule2')}</li>
                <li>• {t('facts.schengenRule3')}</li>
                <li>• {t('facts.schengenRule4')}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">{t('facts.schengenVisaFree')}</h3>
            <p className="mb-4">{t('facts.schengenVisaFreeDesc')}</p>
            
            <div className="flex flex-wrap gap-2">
              {["Arnavutluk", "Andorra", "Arjantin", "Avustralya", "Bosna Hersek", "Brezilya", "Brunei", "Kanada", "Şili", "Kolombiya", "Kosta Rika", "El Salvador", "Gürcistan", "Guatemala", "Honduras", "Hong Kong", "İsrail", "Japonya", "Malezya", "Meksika", "Moldova", "Monako", "Karadağ", "Yeni Zelanda", "Nikaragua", "Kuzey Makedonya", "Panama", "Paraguay", "Peru", "San Marino", "Sırbistan", "Singapur", "Güney Kore", "Tayvan", "Ukrayna", "Birleşik Arap Emirlikleri", "Birleşik Krallık", "Amerika Birleşik Devletleri", "Uruguay", "Vatikan", "Venezuela"].map((country, index) => (
                <div key={country} className="flex items-center gap-2 bg-green-50 rounded-lg px-2 py-1 text-sm border border-green-100">
                  {country}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchengenTab;
