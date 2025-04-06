
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import UserProfile from '@/components/profile/UserProfile';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Smartphone, Watch, Activity } from 'lucide-react';
import { healthApi } from '@/services/apiService';

interface WearableDevice {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
}

const Profile: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const [wearables, setWearables] = useState<WearableDevice[]>([
    { id: 'googlefit', name: 'Google Fit', icon: <Smartphone className="h-5 w-5" />, connected: false },
    { id: 'fitbit', name: 'Fitbit', icon: <Watch className="h-5 w-5" />, connected: false },
    { id: 'applehealth', name: 'Apple Health', icon: <Activity className="h-5 w-5" />, connected: false },
  ]);

  const connectWearable = async (deviceId: string) => {
    setIsConnecting(true);
    try {
      // In a real implementation, this would open OAuth flow
      // For now, just simulate API call to Flask backend
      await healthApi.submitWearableData({ 
        deviceId,
        action: 'connect',
        timestamp: new Date().toISOString()
      });
      
      // Update local state
      setWearables(wearables.map(device => 
        device.id === deviceId ? { ...device, connected: true } : device
      ));
      
      toast({
        title: "Device connected",
        description: `Your ${wearables.find(d => d.id === deviceId)?.name} has been successfully connected.`,
      });
    } catch (error) {
      console.error('Failed to connect device:', error);
      toast({
        title: "Connection failed",
        description: "Unable to connect device. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWearable = async (deviceId: string) => {
    try {
      await healthApi.submitWearableData({
        deviceId,
        action: 'disconnect',
        timestamp: new Date().toISOString()
      });
      
      // Update local state
      setWearables(wearables.map(device => 
        device.id === deviceId ? { ...device, connected: false } : device
      ));
      
      toast({
        title: "Device disconnected",
        description: `Your ${wearables.find(d => d.id === deviceId)?.name} has been disconnected.`,
      });
    } catch (error) {
      console.error('Failed to disconnect device:', error);
      toast({
        title: "Disconnection failed",
        description: "Unable to disconnect device. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <UserProfile />
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Connect Health Devices</CardTitle>
          <CardDescription>
            Sync your wearable devices to enhance health monitoring and AI insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wearables.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-carepulse-teal/10 p-2 rounded-full">
                    {device.icon}
                  </div>
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {device.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                <Button 
                  variant={device.connected ? "outline" : "default"}
                  onClick={() => device.connected 
                    ? disconnectWearable(device.id) 
                    : connectWearable(device.id)
                  }
                  disabled={isConnecting}
                  className={device.connected ? "" : "bg-carepulse-teal hover:bg-carepulse-teal/90"}
                >
                  {device.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Profile;
