
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  Flame,
  Droplets,
  Heart,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'critical' | 'warning' | 'info';
  icon: string;
}

interface AlertsListProps {
  alerts?: Alert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts = [] }) => {
  // If no alerts are passed as props, use these mock alerts
  const displayAlerts = alerts.length > 0 ? alerts : [
    {
      id: '1',
      title: 'High Stress Detected',
      description: 'Your heart rate variability suggests elevated stress levels. Consider taking a break.',
      timestamp: '2 hours ago',
      type: 'warning' as const,
      icon: 'heart'
    },
    {
      id: '2',
      title: 'Low Hydration',
      description: 'You may be dehydrated based on your activity levels and water tracking.',
      timestamp: '5 hours ago',
      type: 'warning' as const,
      icon: 'droplets'
    },
    {
      id: '3',
      title: 'Elevated Body Temperature',
      description: 'Your temperature readings are slightly above your normal baseline.',
      timestamp: '1 day ago',
      type: 'info' as const,
      icon: 'flame'
    },
    {
      id: '4',
      title: 'UV Exposure',
      description: 'High UV index in your area. Remember to use sunscreen if going outside.',
      timestamp: '1 day ago',
      type: 'info' as const,
      icon: 'sun'
    }
  ];

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return {
          badge: 'bg-carepulse-red text-white',
          icon: 'text-carepulse-red',
          bgColor: 'bg-red-50'
        };
      case 'warning':
        return {
          badge: 'bg-carepulse-orange text-white',
          icon: 'text-carepulse-orange',
          bgColor: 'bg-orange-50'
        };
      case 'info':
        return {
          badge: 'bg-carepulse-teal text-white',
          icon: 'text-carepulse-teal',
          bgColor: 'bg-teal-50'
        };
      default:
        return {
          badge: '',
          icon: '',
          bgColor: ''
        };
    }
  };

  const getAlertTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return <Heart className="h-5 w-5" />;
      case 'droplets':
        return <Droplets className="h-5 w-5" />;
      case 'flame':
        return <Flame className="h-5 w-5" />;
      case 'sun':
        return <Sun className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Alerts</CardTitle>
        <CardDescription>Recent notifications about your health</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayAlerts.map((alert) => {
          const styles = getAlertStyles(alert.type as Alert['type']);
          return (
            <div 
              key={alert.id} 
              className={cn("p-4 rounded-lg flex items-start", styles.bgColor)}
            >
              <div className={cn("rounded-full p-2 mr-3", styles.bgColor)}>
                <div className={styles.icon}>{getIconComponent(alert.icon)}</div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{alert.title}</h3>
                  <Badge className={styles.badge} variant="secondary">
                    <span className="mr-1">{getAlertTypeIcon(alert.type as Alert['type'])}</span>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  <button className="flex items-center text-carepulse-teal text-sm">
                    <span className="mr-1">Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AlertsList;
