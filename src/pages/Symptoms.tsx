
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SymptomLogger from '@/components/symptoms/SymptomLogger';

const Symptoms: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Symptom Tracker</h1>
        <p className="text-muted-foreground">
          Log how you're feeling today for better health insights
        </p>
      </div>
      
      <SymptomLogger />
    </AppLayout>
  );
};

export default Symptoms;
