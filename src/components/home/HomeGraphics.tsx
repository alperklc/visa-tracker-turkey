
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface HomeGraphicsProps {
  showOnlyFirst?: boolean;
  showOnlySecond?: boolean;
}

const HomeGraphics: React.FC<HomeGraphicsProps> = ({ 
  showOnlyFirst = false,
  showOnlySecond = false,
}) => {
  const { t } = useLanguage();

  // Data for the first graphic - Schengen visa applications for Turkish residents (2014-2023)
  const schengenVisaData = [
    { year: "2014", applications: 813339, approved: 775532, denied: 35971 },
    { year: "2015", applications: 900789, approved: 863336, denied: 34956 },
    { year: "2016", applications: 937487, approved: 892639, denied: 41353 },
    { year: "2017", applications: 971710, approved: 905021, denied: 63122 },
    { year: "2018", applications: 879240, approved: 800706, denied: 74321 },
    { year: "2019", applications: 906862, approved: 813498, denied: 87651 },
    { year: "2020", applications: 229282, approved: 198312, denied: 28826 },
    { year: "2021", applications: 271977, approved: 221125, denied: 45016 },
    { year: "2022", applications: 778409, approved: 647691, denied: 120876 },
    { year: "2023", applications: 1055885, approved: 881257, denied: 169514 },
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
          <CardTitle>{t('facts.schengenVisaTrends')}</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={schengenVisaData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="applications" 
                name={t('facts.applications')}
                stroke="rgb(54,162,235)" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="approved" 
                name={t('dashboard.approved')}
                stroke="rgb(105,216,65)" 
              />
              <Line 
                type="monotone" 
                dataKey="denied" 
                name={t('dashboard.rejected')}
                stroke="rgb(255,99,132)" 
              />
            </LineChart>
          </ResponsiveContainer>
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
        {/* Schengen visa trends for Turkish residents */}
        <Card>
          <CardHeader>
            <CardTitle>{t('facts.schengenVisaTrends')}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={schengenVisaData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  name={t('facts.applications')}
                  stroke="rgb(54,162,235)" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="approved" 
                  name={t('dashboard.approved')}
                  stroke="rgb(105,216,65)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="denied" 
                  name={t('dashboard.rejected')}
                  stroke="rgb(255,99,132)" 
                />
              </LineChart>
            </ResponsiveContainer>
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
