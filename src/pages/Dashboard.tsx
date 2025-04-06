
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import HealthStatusCard from '@/components/dashboard/HealthStatusCard';
import ActionCards from '@/components/dashboard/ActionCards';

const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
        <p className="text-muted-foreground">
          Here's an overview of your health today
        </p>
      </div>
      
      <HealthStatusCard />
      <ActionCards />
    </AppLayout>
  );
};

export default Dashboard;
