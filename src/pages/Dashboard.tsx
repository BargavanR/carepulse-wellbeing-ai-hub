
import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import HealthStatusCard from '@/components/dashboard/HealthStatusCard';
import ActionCards from '@/components/dashboard/ActionCards';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { healthApi } from '@/services/apiService';

interface HealthPrediction {
  id: string;
  title: string;
  description: string;
  riskLevel: 'low' | 'moderate' | 'high';
}

const Dashboard: React.FC = () => {
  const [predictions, setPredictions] = useState<HealthPrediction[]>([]);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
  
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoadingPredictions(true);
        // Replace with actual user ID when authentication is implemented
        const data = await healthApi.getHealthPredictions('current-user-id');
        setPredictions(data.predictions || []);
      } catch (error) {
        console.error('Failed to fetch health predictions:', error);
        // Silently handle error on dashboard - don't want to overwhelm with errors
      } finally {
        setIsLoadingPredictions(false);
      }
    };
    
    fetchPredictions();
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'border-carepulse-red';
      case 'moderate': return 'border-carepulse-orange';
      case 'low': return 'border-green-500';
      default: return 'border-carepulse-teal';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
        <p className="text-muted-foreground">
          Here's an overview of your health today
        </p>
      </div>
      
      <HealthStatusCard />
      
      {predictions.length > 0 && (
        <div className="my-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-carepulse-teal" />
            AI Health Insights
          </h2>
          
          <div className="space-y-3">
            {predictions.map((prediction) => (
              <Alert key={prediction.id} className={`border-l-4 ${getRiskColor(prediction.riskLevel)}`}>
                <AlertTitle>{prediction.title}</AlertTitle>
                <AlertDescription>{prediction.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}
      
      <ActionCards />
    </AppLayout>
  );
};

export default Dashboard;
