import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsGridCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  source?: {
    name: string;
    url: string;
  };
  points?: string[];
}

const StatsGridCard: React.FC<StatsGridCardProps> = ({ 
  title, 
  description, 
  icon, 
  className = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  trend,
  source,
  points
}) => {
  return (
    <Card className={`overflow-hidden hover:shadow-md text-left transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className={`text-md font-bold ${titleClassName}`}>{title}</CardTitle>
          {icon && <div className={`${iconClassName}`}>{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        {description && <p className={`text-xs text-muted-foreground mt-1 ${descriptionClassName}`}>{description}</p>}
        {source && (
          <div className="mt-3 text-[10px] text-muted-foreground">
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline flex gap-1"
            >
              Source: {source.name}
            </a>
          </div>
        )}
        <ul className="space-y-2 pl-0">
          {points?.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default StatsGridCard;
