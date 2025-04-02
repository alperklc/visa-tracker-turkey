
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ComparisonTableProps {
  countryComparisonData: Array<{
    country: string;
    flag: string;
    schengenVisa: string;
    schengenVisaClass: string;
    schengenFee: string;
    visaFreeCountries: string;
    gdpPerCapita: string;
    population: string;
  }>;
  t: (key: string) => string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ countryComparisonData, t }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">{t('facts.aspect')}</TableHead>
            {countryComparisonData.map((country) => (
              <TableHead key={country.country}>
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span> {t(`facts.${country.country}`)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{t('facts.schengenVisa')}</TableCell>
            {countryComparisonData.map((country) => (
              <TableCell key={country.country} className={country.schengenVisaClass}>
                {country.schengenVisa}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">{t('facts.schengenFee')}</TableCell>
            {countryComparisonData.map((country) => (
              <TableCell key={country.country}>{country.schengenFee}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">{t('facts.visaFreeCountries')}</TableCell>
            {countryComparisonData.map((country) => (
              <TableCell key={country.country}>{country.visaFreeCountries}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">{t('review.gdpPerCapita')}</TableCell>
            {countryComparisonData.map((country) => (
              <TableCell key={country.country}>{country.gdpPerCapita}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">{t('review.population')}</TableCell>
            {countryComparisonData.map((country) => (
              <TableCell key={country.country}>{country.population}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
