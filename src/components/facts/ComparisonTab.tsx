
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useComparisonData } from './comparison/ComparisonData';
import CountryCard from './comparison/CountryCard';
import ComparisonTable from './comparison/ComparisonTable';
import KeyDifferences from './comparison/KeyDifferences';

const ComparisonTab: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { countryComparisonData } = useComparisonData();
  
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
                <CountryCard key={country.country} country={country} t={t} />
              ))}
            </div>
          ) : (
            <ComparisonTable countryComparisonData={countryComparisonData} t={t} />
          )}
        </CardContent>
      </Card>
      
      <KeyDifferences t={t} />
    </div>
  );
};

export default ComparisonTab;
