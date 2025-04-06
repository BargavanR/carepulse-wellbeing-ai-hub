
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const UserProfile: React.FC = () => {
  // In a real app, this would be fetched from API/context
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    profileImage: '',
    preferences: {
      notifications: true,
      dailyReminders: true,
      dataSharing: false,
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
  };

  const handleSubmit = () => {
    // In real app, you'd save to API here
    setUser(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved.",
    });
  };

  const handleSignOut = () => {
    // Sign out logic
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </div>
            <Avatar className="h-16 w-16 border-2 border-carepulse-teal">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback className="bg-carepulse-teal text-white text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="font-medium mb-3">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Notifications</span>
                  <p className="text-sm text-muted-foreground">Receive health alerts and updates</p>
                </div>
                <Switch
                  checked={formData.preferences.notifications}
                  onCheckedChange={(checked) => handleToggleChange('notifications', checked)}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Daily Reminders</span>
                  <p className="text-sm text-muted-foreground">Reminders to log symptoms</p>
                </div>
                <Switch
                  checked={formData.preferences.dailyReminders}
                  onCheckedChange={(checked) => handleToggleChange('dailyReminders', checked)}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Data Sharing</span>
                  <p className="text-sm text-muted-foreground">Allow sharing data with healthcare providers</p>
                </div>
                <Switch
                  checked={formData.preferences.dataSharing}
                  onCheckedChange={(checked) => handleToggleChange('dataSharing', checked)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button 
                variant="outline"
                onClick={() => {
                  setFormData({ ...user });
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-carepulse-teal hover:bg-carepulse-teal/90"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
          <Button 
            variant="outline" 
            className="w-full border-carepulse-red text-carepulse-red hover:bg-carepulse-red/10"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
