
import React from 'react';
import { 
  PlusCircle, 
  Link as LinkIcon, 
  Bell, 
  FileText, 
  ArrowRight,
  LucideIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  path,
  color 
}) => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(path)}
      className="health-card flex items-start text-left w-full"
    >
      <div 
        className={`rounded-full p-3 mr-4 ${color}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center text-carepulse-teal text-sm">
          <span className="mr-1">View</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </button>
  );
};

const ActionCards: React.FC = () => {
  const actions = [
    {
      title: 'Log Symptoms',
      description: 'Record your daily symptoms and health data',
      icon: PlusCircle,
      path: '/symptoms',
      color: 'bg-carepulse-teal'
    },
    {
      title: 'Connect Device',
      description: 'Sync your wearable device for better insights',
      icon: LinkIcon,
      path: '/connect',
      color: 'bg-carepulse-darkblue'
    },
    {
      title: 'View Alerts',
      description: 'Check health alerts and recommendations',
      icon: Bell,
      path: '/alerts',
      color: 'bg-carepulse-orange'
    },
    {
      title: 'Generate Report',
      description: 'Create and share health reports with providers',
      icon: FileText,
      path: '/reports',
      color: 'bg-carepulse-red'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {actions.map((action) => (
        <ActionCard key={action.title} {...action} />
      ))}
    </div>
  );
};

export default ActionCards;
