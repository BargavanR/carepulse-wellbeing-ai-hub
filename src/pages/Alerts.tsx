
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AlertsList from '@/components/alerts/AlertsList';

const Alerts: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Health Alerts</h1>
        <p className="text-muted-foreground">
          Personalized insights and recommendations
        </p>
      </div>
      
      <AlertsList />
    </AppLayout>
  );
};

export default Alerts;
