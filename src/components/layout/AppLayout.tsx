
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  Bell, 
  FileText, 
  User,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/symptoms', label: 'Log', icon: PlusCircle },
    { path: '/alerts', label: 'Alerts', icon: Bell },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex justify-between items-center py-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-carepulse-teal" />
            <span className="font-bold text-lg">CarePulse</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 container py-6">{children}</main>
      
      <nav className="sticky bottom-0 border-t border-border bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-md transition-colors",
                currentPath === item.path 
                  ? "text-carepulse-teal" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
