import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface HomeGraphicsProps {
  showOnlyFirst?: boolean;
  showOnlySecond?: boolean;
}

const HomeGraphics: React.FC<HomeGraphicsProps> = ({ 
  showOnlyFirst = false,
  showOnlySecond = false,
}) => {
  const { t } = useLanguage();

  // Data for the first graphic - Application counts by country
  const applicationCountData = [
    { country: "Çin", count: 1117365 },
    { country: "Türkiye", count: 1055885 },
    { country: "Hindistan", count: 966687 },
    { country: "Fas", count: 591401 },
    { country: "Rusya", count: 520387 }
  ];

  // Data for the second graphic - Rejection rates by German consulate city
  const germanConsulateData = [
    { city: "Ankara", rejectionRate: 27.1 },
    { city: "İstanbul", rejectionRate: 21.5 },
    { city: "İzmir", rejectionRate: 13.1 }
  ];

  // Only render the first card if requested
  if (showOnlyFirst) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.totalApplications')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.country')}</TableHead>
                <TableHead className="text-right">2023 {t('dashboard.applications')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicationCountData.map((item) => (
                <TableRow key={item.country}>
                  <TableCell>{item.country}</TableCell>
                  <TableCell className="text-right font-medium">
                    {item.count.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // Only render the second card if requested
  if (showOnlySecond) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('countries.germany')} {t('table.city')} / {t('facts.rejectionRate')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.city')}</TableHead>
                <TableHead className="text-right">{t('facts.rejectionRate')} (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {germanConsulateData.map((item) => (
                <TableRow key={item.city}>
                  <TableCell>{item.city}</TableCell>
                  <TableCell className="text-right font-medium">
                    {item.rejectionRate}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // Return the full component (not used in this updated design, but kept for compatibility)
  return (
    <div className="space-y-8 mb-10">
      {/* First row with 3 cards in a row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Application counts by country */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.totalApplications')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.country')}</TableHead>
                  <TableHead className="text-right">2023 {t('dashboard.applications')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationCountData.map((item) => (
                  <TableRow key={item.country}>
                    <TableCell>{item.country}</TableCell>
                    <TableCell className="text-right font-medium">
                      {item.count.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* German consulate rejection rates */}
        <Card>
          <CardHeader>
            <CardTitle>{t('countries.germany')} {t('table.city')} / {t('facts.rejectionRate')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.city')}</TableHead>
                  <TableHead className="text-right">{t('facts.rejectionRate')} (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {germanConsulateData.map((item) => (
                  <TableRow key={item.city}>
                    <TableCell>{item.city}</TableCell>
                    <TableCell className="text-right font-medium">
                      {item.rejectionRate}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Financial Impact card (this will be rendered separately in the new layout) */}
        <Card className="h-full hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{t('financial.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">{t('financial.applications')}</span>
                <div className="text-2xl font-bold">1,054,000</div>
              </div>
              
              <div className="space-y-1 mt-4">
                <span className="text-sm text-muted-foreground">{t('financial.cost')}</span>
                <div className="text-2xl font-bold">€619,000,000</div>
              </div>
              
              <div className="bg-accent/30 rounded-lg p-3 mt-4">
                <div className="text-sm font-medium mb-1">{t('financial.breakdown')}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>{t('financial.visaFee')}:</div>
                  <div className="text-right font-medium">€80</div>
                  <div>{t('financial.serviceFee')}:</div>
                  <div className="text-right font-medium">€35</div>
                  <div>{t('financial.otherCosts')}:</div>
                  <div className="text-right font-medium">€185</div>
                  <div className="font-medium">{t('financial.perVisit')}:</div>
                  <div className="text-right font-medium">€300</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeGraphics;
