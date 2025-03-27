
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useLanguage } from '@/lib/LanguageContext';

interface ResultsPieChartProps {
  resultData: Array<{
    name: string;
    value: number;
  }>;
}

const ResultsPieChart: React.FC<ResultsPieChartProps> = ({ resultData }) => {
  const { t } = useLanguage();
  const COLORS = ['#4ade80', '#f87171', '#93c5fd'];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{t('dashboard.applicationResults')}</CardTitle>
        <CardDescription>
          {t('dashboard.applicationResultsDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resultData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {resultData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {resultData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-sm">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPieChart;
