
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-carepulse-lightblue/30 to-carepulse-beige p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-carepulse-teal p-3">
              <ActivityIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-carepulse-darkblue mb-2">
            CarePulse
          </h1>
          <p className="text-lg text-muted-foreground">
            AI-powered preventive health monitoring
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-2">
            Don't have an account yet?
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
