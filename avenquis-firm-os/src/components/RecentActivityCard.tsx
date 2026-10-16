import React from 'react';
import { ArrowRight, FileCheck, FileText, MessageSquare, Receipt, Wrench } from 'lucide-react';
import { ActivityItem } from '../types';

interface RecentActivityCardProps {
  activities: ActivityItem[];
  onViewAllClick?: () => void;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities,
  onViewAllClick,
}) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'upload':
        return {
          icon: FileText,
          bg: 'bg-[#DCFCE7]',
          color: 'text-[#16A34A]',
        };
      case 'assignment':
        return {
          icon: Wrench,
          bg: 'bg-[#FFEDD5]',
          color: 'text-[#EA580C]',
        };
      case 'response':
        return {
          icon: MessageSquare,
          bg: 'bg-[#E0F2FE]',
          color: 'text-[#0284C7]',
        };
      case 'invoice':
        return {
          icon: Receipt,
          bg: 'bg-[#FEF3C7]',
          color: 'text-[#D97706]',
        };
      default:
        return {
          icon: FileCheck,
          bg: 'bg-neutral-100',
          color: 'text-neutral-600',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Recent activity
        </h3>
        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#0B332A] hover:text-[#061F18] flex items-center gap-1 group cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3 pt-1">
        {activities.map((item) => {
          const { icon: Icon, bg, color } = getActivityIcon(item.type);
          return (
            <div
              key={item.id}
              className="flex items-start justify-between gap-2.5 p-1 rounded-xl hover:bg-neutral-50/80 transition-colors"
            >
              {/* Left icon & text */}
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-neutral-900 leading-tight truncate">
                    {item.user} {item.action && <span className="font-normal text-neutral-600">{item.action}</span>}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium truncate mt-0.5">
                    {item.target}
                  </div>
                </div>
              </div>

              {/* Time ago */}
              <div className="text-[10px] text-neutral-400 font-normal whitespace-nowrap shrink-0 pt-0.5">
                {item.timeAgo}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
