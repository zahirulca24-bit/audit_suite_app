import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendSub?: string;
  trendType?: 'positive' | 'negative' | 'neutral' | 'urgent';
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  className?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendSub,
  trendType = 'positive',
  icon: Icon,
  iconBg = 'bg-[#E8F5F1]',
  iconColor = 'text-[#0D7A6F]',
  className = '',
  onClick,
}) => {
  const getTrendColor = () => {
    if (trendType === 'positive') return 'text-emerald-700 font-semibold';
    if (trendType === 'negative') return 'text-rose-700 font-semibold';
    if (trendType === 'urgent') return 'text-rose-700 font-semibold';
    return 'text-neutral-500 font-medium';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider truncate">
          {label}
        </span>
        {Icon && (
          <div
            className={`w-7 h-7 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl sm:text-[28px] font-serif font-bold text-neutral-900 tabular-nums leading-tight">
          {value}
        </div>
        {(trend || trendSub) && (
          <div className="flex items-center gap-1.5 text-[11px] mt-1 font-medium truncate">
            {trend && <span className={getTrendColor()}>{trend}</span>}
            {trendSub && (
              <span className="text-neutral-400 font-normal truncate">
                {trendSub}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
