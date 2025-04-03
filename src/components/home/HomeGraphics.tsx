
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList
} from 'recharts';

const HomeGraphics: React.FC = () => {
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

  // Data for rejection rates by country
  const rejectionRateData = [
    { country: "Estonya", rejectionRate: 42.5 },
    { country: "Danimarka", rejectionRate: 39.4 },
    { country: "Finlandiya", rejectionRate: 31.3 },
    { country: "Belçika", rejectionRate: 27.5 },
    { country: "Almanya", rejectionRate: 22.0 },
    { country: "Hırvatistan", rejectionRate: 21.0 },
    { country: "İspanya", rejectionRate: 20.8 },
    { country: "Çekya", rejectionRate: 20.6 },
    { country: "İsveç", rejectionRate: 19.22 },
    { country: "Macaristan", rejectionRate: 14.9 },
    { country: "Fransa", rejectionRate: 14.6 },
    { country: "Yunanistan", rejectionRate: 14.6 },
    { country: "Portekiz", rejectionRate: 11.94 },
    { country: "Slovenya", rejectionRate: 10.92 },
    { country: "İtalya", rejectionRate: 8.7 },
    { country: "Slovakya", rejectionRate: 6.6 }
  ].sort((a, b) => b.rejectionRate - a.rejectionRate);

  // Top 5 countries with highest rejection rates
  const topRejectionCountries = rejectionRateData.slice(0, 5);
  
  // Bottom 5 countries with lowest rejection rates (highest approval rates)
  const topApprovalCountries = [...rejectionRateData]
    .slice(-5)
    .reverse()
    .map(country => ({
      country: country.country,
      approvalRate: (100 - country.rejectionRate).toFixed(1)
    }));

  // Custom formatter for large numbers
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num;
  };

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

        {/* Financial Impact card (moved from bottom to be in the first row) */}
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

      {/* Second row with 2 charts: Top rejection and approval countries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 5 countries with highest rejection rates */}
        <Card>
          <CardHeader>
            <CardTitle>En Çok Red Veren Ülkeler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ChartContainer 
                config={{
                  rejection: {
                    theme: {
                      light: "hsl(var(--destructive))",
                      dark: "hsl(var(--destructive))",
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topRejectionCountries}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 50]} tickFormatter={(value) => `${value}%`} />
                    <YAxis 
                      type="category" 
                      dataKey="country" 
                      width={70}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="font-medium">{payload[0].payload.country}</div>
                              <div className="text-muted-foreground">
                                {t('facts.rejectionRate')}: {payload[0].value}%
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="rejectionRate" 
                      fill="hsl(var(--destructive))" 
                      radius={[0, 4, 4, 0]}
                    >
                      <LabelList dataKey="rejectionRate" position="right" formatter={(value: number) => `${value}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 countries with highest approval rates */}
        <Card>
          <CardHeader>
            <CardTitle>En Çok Kabul Veren 5 Ülke</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ChartContainer 
                config={{
                  approval: {
                    theme: {
                      light: "hsl(var(--success))",
                      dark: "hsl(var(--success))",
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topApprovalCountries}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis 
                      type="category" 
                      dataKey="country" 
                      width={70}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="font-medium">{payload[0].payload.country}</div>
                              <div className="text-muted-foreground">
                                {t('facts.approvalRate')}: {payload[0].value}%
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="approvalRate" 
                      fill="#4ade80" 
                      radius={[0, 4, 4, 0]}
                    >
                      <LabelList dataKey="approvalRate" position="right" formatter={(value: string) => `${value}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeGraphics;
