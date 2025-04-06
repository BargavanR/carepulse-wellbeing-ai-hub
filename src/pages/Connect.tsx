
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { 
  RefreshCcw, 
  Check, 
  Activity, 
  Watch, 
  Smartphone, 
  Clock 
} from 'lucide-react';

interface DeviceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSync?: string;
}

const Connect: React.FC = () => {
  const [devices, setDevices] = useState<DeviceOption[]>([
    {
      id: 'googlefit',
      name: 'Google Fit',
      icon: <Activity className="h-5 w-5 text-carepulse-darkblue" />,
      connected: false
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      icon: <Watch className="h-5 w-5 text-carepulse-teal" />,
      connected: true,
      lastSync: '3 hours ago'
    },
    {
      id: 'applehealth',
      name: 'Apple Health',
      icon: <Smartphone className="h-5 w-5 text-carepulse-red" />,
      connected: false
    }
  ]);
  
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleToggleDevice = (id: string, connected: boolean) => {
    setDevices(devices.map(device => 
      device.id === id 
        ? { 
            ...device, 
            connected, 
            lastSync: connected ? 'Just now' : undefined 
          } 
        : device
    ));

    toast({
      title: connected ? 'Device connected' : 'Device disconnected',
      description: `${devices.find(d => d.id === id)?.name} has been ${connected ? 'connected' : 'disconnected'}.`,
    });
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    
    // Simulate syncing
    setTimeout(() => {
      setIsSyncing(false);
      setDevices(devices.map(device => 
        device.connected
          ? { ...device, lastSync: 'Just now' }
          : device
      ));
      
      toast({
        title: 'Sync completed',
        description: 'All connected devices have been synchronized.',
      });
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Connect Devices</h1>
        <p className="text-muted-foreground">
          Link your wearables for enhanced health tracking
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Your Devices</CardTitle>
              <CardDescription>Manage your connected health devices</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              disabled={isSyncing || !devices.some(d => d.connected)}
              onClick={handleSyncAll}
              className="flex items-center"
            >
              {isSyncing ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Sync All
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-muted rounded-md">
                    {device.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{device.name}</h3>
                    {device.connected && device.lastSync && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Last synced: {device.lastSync}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  {device.connected && (
                    <span className="flex items-center text-xs text-green-500 mr-3">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </span>
                  )}
                  <Switch
                    checked={device.connected}
                    onCheckedChange={(checked) => handleToggleDevice(device.id, checked)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">About Device Connection</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connecting your wearable devices allows CarePulse to access your health data for more accurate monitoring and personalized insights.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Data is securely transmitted and stored</li>
              <li>Only sync the data you want to share</li>
              <li>Disconnect devices at any time</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Connect;
