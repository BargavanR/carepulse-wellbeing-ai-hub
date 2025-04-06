
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import UserProfile from '@/components/profile/UserProfile';

const Profile: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <UserProfile />
    </AppLayout>
  );
};

export default Profile;
