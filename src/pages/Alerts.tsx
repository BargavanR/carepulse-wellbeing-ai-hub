
import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AlertsList from '@/components/alerts/AlertsList';
import { healthApi } from '@/services/apiService';
import { useToast } from '@/components/ui/use-toast';

const Alerts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        // Assuming you'll have user authentication set up later
        // For now using a placeholder userId
        await healthApi.getHealthAlerts('current-user-id');
        // The AlertsList component will receive the data through props or context
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
        toast({
          title: "Connection error",
          description: "Could not connect to the health AI service. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlerts();
  }, [toast]);

  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Health Alerts</h1>
        <p className="text-muted-foreground">
          Personalized insights and recommendations from our AI
        </p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Analyzing your health data...</p>
        </div>
      ) : (
        <AlertsList />
      )}
    </AppLayout>
  );
};

export default Alerts;
