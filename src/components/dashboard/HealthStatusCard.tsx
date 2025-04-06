
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  Activity, 
  Droplets, 
  Scale, 
  LucideIcon 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface HealthMetric {
  name: string;
  value: string;
  status: 'normal' | 'warning' | 'alert';
  icon: LucideIcon;
  change?: string;
}

const HealthStatusCard: React.FC = () => {
  // Mock health data - would be fetched from API in real app
  const healthMetrics: HealthMetric[] = [
    { 
      name: 'Heart Rate', 
      value: '72 bpm', 
      status: 'normal', 
      icon: Heart,
      change: '-3 from yesterday' 
    },
    { 
      name: 'Blood Pressure', 
      value: '118/78', 
      status: 'normal', 
      icon: Activity 
    },
    { 
      name: 'Hydration', 
      value: '65%', 
      status: 'warning', 
      icon: Droplets,
      change: '-10% from target' 
    },
    { 
      name: 'Weight', 
      value: '165 lbs', 
      status: 'normal', 
      icon: Scale,
      change: 'No change' 
    },
  ];

  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'normal':
        return 'text-green-500';
      case 'warning':
        return 'text-carepulse-orange';
      case 'alert':
        return 'text-carepulse-red';
      default:
        return '';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Health Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {healthMetrics.map((metric) => (
            <div 
              key={metric.name} 
              className="flex flex-col p-3 rounded-lg bg-muted"
            >
              <div className="flex items-center mb-2">
                <metric.icon 
                  className={cn("h-5 w-5 mr-2", getStatusColor(metric.status))} 
                />
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className={cn("text-xl font-bold", getStatusColor(metric.status))}>
                  {metric.value}
                </span>
                {metric.change && (
                  <span className="text-xs text-muted-foreground">
                    {metric.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-center border-t pt-4">
        <span className="text-sm text-muted-foreground">
          Last updated: Today, 9:45 AM
        </span>
      </CardFooter>
    </Card>
  );
};

export default HealthStatusCard;
