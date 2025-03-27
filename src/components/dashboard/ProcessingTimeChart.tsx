
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useLanguage } from '@/lib/LanguageContext';

interface ProcessingChartProps {
  processingTimeData: Array<{
    id: string;
    country: string;
    city: string;
    days: number;
  }>;
}

const ProcessingTimeChart: React.FC<ProcessingChartProps> = ({ processingTimeData }) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{t('dashboard.processingTime')}</CardTitle>
        <CardDescription>
          {t('dashboard.processingTimeDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processingTimeData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis label={{ value: t('dashboard.days'), angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="days" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingTimeChart;
