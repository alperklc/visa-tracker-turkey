
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsGridCardProps {
  title: string;
  stat: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const StatsGridCard: React.FC<StatsGridCardProps> = ({ 
  title, 
  stat, 
  description, 
  icon, 
  className = "",
  iconClassName = ""
}) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className={`${iconClassName}`}>{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default StatsGridCard;
