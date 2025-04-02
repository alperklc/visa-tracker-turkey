
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/LanguageContext';
import { ArrowUpRight, Clock, PieChart as PieChartIcon } from 'lucide-react';

interface ProcessingTrendsProps {
  trendsData: Array<{month: string, averageDays: number}>;
  worstCities: Array<{city: string, days: number, country?: string}>;
}

const ProcessingTrends: React.FC<ProcessingTrendsProps> = ({ trendsData, worstCities }) => {
  const { t } = useLanguage();
  
  // Map cities to countries for sample data
  const cityCountryMapping = {
    'Istanbul': 'Germany',
    'Ankara': 'France',
    'Izmir': 'Netherlands',
    'Antalya': 'Italy',
    'Gaziantep': 'Spain',
    'Bodrum': 'United Kingdom',
  };
  
  // Add country information to worst cities if not present
  const worstCitiesWithCountry = worstCities.map(city => ({
    ...city,
    country: city.country || cityCountryMapping[city.city as keyof typeof cityCountryMapping] || 'Unknown'
  }));
  
  // Vize onay ve ret oranları (kaynak: patronlardunyasi.com)
  const approvalRateData = [
    { name: t('dashboard.approved'), value: 71.8 },
    { name: t('dashboard.rejected'), value: 28.2 }
  ];
  
  // Pie chart renkler
  const COLORS = ['#4ade80', '#f87171'];
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{t('trends.title')}</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </div>
        </div>
        <CardDescription>
          {t('trends.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {/* Approval Rate Pie Chart */}
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-3">
              <PieChartIcon className="w-4 h-4 text-primary" />
              <div className="text-sm font-medium">{t('trends.approvalRate')}</div>
            </div>
            <div className="h-[180px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={approvalRateData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {approvalRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {approvalRateData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Processing Times */}
          <div className="h-[220px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendsData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`${value} ${t('table.days')}`, '']} 
                  labelFormatter={(label) => `${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="averageDays"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorDays)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-5">
          <h3 className="text-sm font-medium mb-3">{t('trends.worstCities')}</h3>
          <div className="space-y-2">
            {worstCitiesWithCountry.map((city, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  index === 0 ? 'bg-red-50' : index === 1 ? 'bg-orange-50' : 'bg-yellow-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${
                    index === 0 ? 'text-red-500' : index === 1 ? 'text-orange-500' : 'text-yellow-500'
                  }`} />
                  <span className="font-medium">
                    {city.city}/{t(`countries.${city.country?.toLowerCase().replace(/\s+/g, '')}`)}
                  </span>
                </div>
                <Badge variant={index === 0 ? "destructive" : "outline"} className="ml-auto">
                  {city.days} {t('table.days')}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-[10px] text-muted-foreground mt-4">
          <a 
            href="https://www.patronlardunyasi.com/turkler-schengene-619-milyon-euro-harcadi"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Kaynak: PatronlarDunyasi.com - Türkler Schengen'e 619 milyon euro harcadı
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingTrends;
