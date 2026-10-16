import React from 'react';
import { UserCheck, UserMinus, UserPlus, Users } from 'lucide-react';

interface TeamStatusCardProps {
  onStatusClick?: (status: string) => void;
}

export const TeamStatusCard: React.FC<TeamStatusCardProps> = ({ onStatusClick }) => {
  const statuses = [
    {
      id: 'present',
      label: 'Present Today',
      value: '106',
      icon: Users,
      iconColor: 'text-[#16A34A]',
      iconBg: 'bg-[#DCFCE7]',
      valueColor: 'text-neutral-900',
    },
    {
      id: 'onleave',
      label: 'On Leave',
      value: '8',
      icon: UserMinus,
      iconColor: 'text-[#EF4444]',
      iconBg: 'bg-[#FEE2E2]',
      valueColor: 'text-[#EF4444]',
    },
    {
      id: 'available',
      label: 'Available',
      value: '14',
      icon: UserCheck,
      iconColor: 'text-[#0284C7]',
      iconBg: 'bg-[#E0F2FE]',
      valueColor: 'text-neutral-900',
    },
    {
      id: 'new',
      label: 'New This Month',
      value: '5',
      icon: UserPlus,
      iconColor: 'text-[#D97706]',
      iconBg: 'bg-[#FEF3C7]',
      valueColor: 'text-[#D97706]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between h-full min-h-[220px]">
      <div className="space-y-3">
        {statuses.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onStatusClick?.(item.label)}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-neutral-600">
                  {item.label}
                </span>
              </div>
              <span
                className={`text-sm font-bold tabular-nums ${item.valueColor}`}
              >
                {item.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
