
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { ArrowDown, ArrowUp, ChartLine } from 'lucide-react';

interface ProcessingTrendsProps {
  trendsData: Array<{month: string, averageDays: number}>;
  worstCities: Array<{city: string, days: number}>;
}

const ProcessingTrends: React.FC<ProcessingTrendsProps> = ({ 
  trendsData, 
  worstCities 
}) => {
  const { t } = useLanguage();
  
  // Calculate if trend is improving or worsening
  const isImproving = trendsData.length >= 2 && 
    trendsData[trendsData.length - 1].averageDays < trendsData[0].averageDays;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5" />
            {t('dashboard.trends')}
          </CardTitle>
          <CardDescription>
            {t('dashboard.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: t('dashboard.days'), angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="averageDays" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isImproving ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {isImproving ? (
                <ArrowDown className="h-4 w-4" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {isImproving ? 'Improving' : 'Worsening'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5" />
            {t('dashboard.worstCities')}
          </CardTitle>
          <CardDescription>
            {t('dashboard.processingTimeDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={worstCities}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: t('dashboard.days'), position: 'insideBottom', offset: -5 }} />
                <YAxis type="category" dataKey="city" width={80} />
                <Tooltip />
                <Bar dataKey="days" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessingTrends;
