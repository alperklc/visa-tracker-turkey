
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsGridCardProps {
  title: string;
  stat: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  statClassName?: string;
  descriptionClassName?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  source?: {
    name: string;
    url: string;
  };
}

const StatsGridCard: React.FC<StatsGridCardProps> = ({ 
  title, 
  stat, 
  description, 
  icon, 
  className = "",
  iconClassName = "",
  titleClassName = "",
  statClassName = "",
  descriptionClassName = "",
  trend,
  source
}) => {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-sm font-medium text-muted-foreground ${titleClassName}`}>{title}</CardTitle>
          {icon && <div className={`${iconClassName}`}>{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className={`text-2xl font-bold ${statClassName}`}>{stat}</div>
          {trend && (
            <span className={`text-xs px-2 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        {description && <p className={`text-xs text-muted-foreground mt-1 ${descriptionClassName}`}>{description}</p>}
        {source && (
          <div className="mt-3 text-[10px] text-muted-foreground">
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              Source: {source.name}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsGridCard;
