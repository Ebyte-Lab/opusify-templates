import React from 'react';
import { TeamMember } from '../../types/team.types';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';
import { MoreVertical, Shield, UserMinus, Mail } from 'lucide-react';

interface UserCardProps {
  member: TeamMember;
  onEditRole?: (member: TeamMember) => void;
  onRemove?: (member: TeamMember) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  member,
  onEditRole,
  onRemove
}) => {
  const dropdownItems = [
    ...(onEditRole ? [{
      label: 'Change Role',
      icon: <Shield className="w-3.5 h-3.5" />,
      onClick: () => onEditRole(member)
    }] : []),
    ...(onRemove ? [{
      label: 'Remove Member',
      icon: <UserMinus className="w-3.5 h-3.5 text-accent-rose" />,
      onClick: () => onRemove(member),
      variant: 'danger' as const
    }] : [])
  ];

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'editor':
        return 'purple';
      case 'viewer':
      default:
        return 'gray';
    }
  };

  return (
    <Card className="p-5 flex flex-col justify-between h-48 hover:border-brand-500/20">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Avatar
            name={member.name}
            src={member.avatarUrl}
            isOnline={member.lastActive.includes('Active now') || member.lastActive.includes('m ago')}
            size="lg"
          />
          <div>
            <h4 className="font-heading font-bold text-xs text-white leading-tight mt-0.5">
              {member.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 font-medium">
              <Mail className="w-3 h-3 text-gray-600" />
              <span className="truncate max-w-[120px]">{member.email}</span>
            </div>
          </div>
        </div>

        {dropdownItems.length > 0 && (
          <Dropdown
            trigger={
              <button className="p-1 rounded-lg hover:bg-surface-elevated text-gray-500 hover:text-white transition-colors focus-ring">
                <MoreVertical className="w-4 h-4" />
              </button>
            }
            items={dropdownItems}
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Badge variant={getRoleVariant(member.role)} size="sm">
          {member.role}
        </Badge>
        <span className="text-[10px] text-gray-500 font-semibold uppercase">
          {member.projectCount} Projects
        </span>
      </div>

      <div className="border-t border-surface-border/50 pt-3 mt-3 flex justify-between items-center text-[10px] text-gray-500 font-medium">
        <span>Last Active</span>
        <span className="font-semibold text-gray-400">{member.lastActive}</span>
      </div>
    </Card>
  );
};
