import React from 'react';
import { Avatar } from '../ui/Avatar';
import { MessageSquare, CheckCircle, UserPlus, AlertTriangle } from 'lucide-react';
import { Notification } from '../../types/common.types';

interface ActivityFeedProps {
  activities: Notification[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'mention':
        return <MessageSquare className="w-3.5 h-3.5 text-brand-400" />;
      case 'project':
        return <CheckCircle className="w-3.5 h-3.5 text-accent-teal" />;
      case 'team':
        return <UserPlus className="w-3.5 h-3.5 text-accent-indigo" />;
      case 'system':
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-accent-amber" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-3 text-xs">
          <div className="relative shrink-0 mt-0.5">
            <Avatar name={activity.boldActor || 'System'} size="sm" />
            <div className="absolute -bottom-1 -right-1 rounded-full p-0.5 bg-surface-card border border-surface-border">
              {getIcon(activity.type)}
            </div>
          </div>
          <div className="flex-grow space-y-1 select-text">
            <p className="text-gray-300 leading-normal">
              {activity.boldActor && (
                <span className="font-bold text-white mr-1">{activity.boldActor}</span>
              )}
              <span className="text-gray-400">{activity.description}</span>
              {activity.boldObject && (
                <span className="font-semibold text-white ml-1">{activity.boldObject}</span>
              )}
            </p>
            <span className="block text-[10px] text-gray-500 font-medium">
              {activity.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
