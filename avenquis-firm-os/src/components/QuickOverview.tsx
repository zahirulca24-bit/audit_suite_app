import React, { useState } from 'react';
import {
  AlertCircle,
  BarChart2,
  Calendar,
  ChevronDown,
  Clock,
  Coins,
  FileCheck2,
} from 'lucide-react';

interface QuickOverviewProps {
  onCardClick?: (metric: string) => void;
}

export const QuickOverview: React.FC<QuickOverviewProps> = ({ onCardClick }) => {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ranges = ['Last 7 days', 'Last 30 days', 'This Quarter', 'This Year'];

  // Metrics based on range (default 30 days matches screenshot)
  const metrics = [
    {
      id: 'pending-approvals',
      label: 'Pending approvals',
      value: timeRange === 'Last 7 days' ? '03' : '08',
      icon: Clock,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
    },
    {
      id: 'open-tasks',
      label: 'Open tasks',
      value: timeRange === 'Last 7 days' ? '18' : '24',
      icon: FileCheck2,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0284C7]',
    },
    {
      id: 'overdue-tasks',
      label: 'Overdue tasks',
      value: timeRange === 'Last 7 days' ? '02' : '06',
      icon: AlertCircle,
      iconBg: 'bg-[#FEE2E2]',
      iconColor: 'text-[#DC2626]',
    },
    {
      id: 'upcoming-deadlines',
      label: 'Upcoming deadlines',
      value: timeRange === 'Last 7 days' ? '05' : '12',
      icon: Calendar,
      iconBg: 'bg-[#EDE9FE]',
      iconColor: 'text-[#7C3AED]',
    },
    {
      id: 'monthly-revenue',
      label: 'Monthly revenue',
      value: timeRange === 'Last 7 days' ? '৳ 14.2L' : '৳ 42.8L',
      icon: BarChart2,
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#16A34A]',
    },
    {
      id: 'outstanding-receivable',
      label: 'Outstanding receivable',
      value: timeRange === 'Last 7 days' ? '৳ 118.4L' : '৳ 125.6L',
      icon: Coins,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
    },
  ];

  return (
    <section className="space-y-3.5">
      {/* Header with Title and Range Picker */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-neutral-900 tracking-tight">
          Quick overview
        </h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <span>{timeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-20 text-xs">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors cursor-pointer ${
                    timeRange === range
                      ? 'bg-neutral-100 text-[#0D7A6F] font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 6 Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onCardClick?.(card.label)}
              className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs hover:border-neutral-300 hover:shadow-sm transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div
                className={`w-9 h-9 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-neutral-500 line-clamp-1">
                  {card.label}
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 mt-0.5 tabular-nums">
                  {card.value}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
